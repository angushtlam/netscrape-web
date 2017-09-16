import json

from celery import Celery
from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy

from utils.parser import parse_pages


app = Flask(__name__)
app.config["CELERY_BROKER_URL"] = "redis://localhost:6379/0"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
celery = Celery(app.name, broker=app.config["CELERY_BROKER_URL"])


class Scrape(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    completed = db.Column(db.Boolean(), default=False)
    url_pattern = db.Column(db.String())
    schema = db.Column(db.String())
    result = db.Column(db.String())


@celery.task
def _do_scrape_request(scrape_id):
    scrape = Scrape.query.filter_by(id=scrape_id).first()
    if scrape is None:
        return

    schema = json.loads(scrape.schema)
    schema_keys = list(schema.keys())
    schema_values = list(schema.values())

    result = []
    for page_selections in parse_pages(scrape.url_pattern, schema_values):
        for i, selection in enumerate(page_selections):
            result.append({schema_keys[i]: selection})

    scrape.result = json.dumps(result)
    scrape.completed = True
    db.session.commit()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/scrape", methods=["POST"])
def scrape_request():
    data = request.get_json()

    if data is None:
        return jsonify(error="No data provided"), 400

    url_pattern = data["url_pattern"]
    schema = data["schema"]

    if not isinstance(url_pattern, str):
        return jsonify(error="Invalid 'url_pattern'"), 400
    if not isinstance(schema, dict) or not schema:
        return jsonify(error="Invalid 'schema'"), 400

    scrape = Scrape(url_pattern=url_pattern, schema=json.dumps(schema))
    db.session.add(scrape)
    db.session.commit()

    # Add the request to the task queue
    _do_scrape_request.delay(scrape.id)

    return jsonify(id=scrape.id), 201


@app.route("/scrape/<scrape_id>")
def schema_result(scrape_id):
    scrape = Scrape.query.filter_by(id=scrape_id).first_or_404()

    if not scrape.completed:
        return jsonify(completed=False)

    return jsonify(completed=True, result=-scrape.result), 200


if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
