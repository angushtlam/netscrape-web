import json

from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


class Scrape(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    completed = db.Column(db.Boolean(), default=False)
    url_pattern = db.Column(db.String())
    schema = db.Column(db.String())


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
    # TODO: start the parsing as a background task
    return jsonify(id=scrape.id), 201


@app.route("/scrape/<scrape_id>")
def schema_result(scrape_id):
    scrape = Scrape.query.filter_by(id=scrape_id).first_or_404()

    if not scrape.completed:
        return jsonify(completed=False)

    return jsonify(completed=True), 501


if __name__ == "__main__":
    db.create_all()
    app.run(host="0.0.0.0", debug=True)
