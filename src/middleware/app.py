import json

from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


class ScrapeStatus:
    NEEDS_SCHEMA = 1
    IN_PROGRESS = 2
    COMPLETED = 3


class Scrape(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    status = db.Column(db.Integer())
    url_pattern = db.Column(db.String())
    selectors = db.Column(db.String())


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/scrape", methods=["POST"])
def scrape():
    data = request.get_json()

    url_pattern = data["url_pattern"]
    selectors = data["selectors"]

    if not isinstance(url_pattern, str):
        return jsonify(error="Invalid 'url_pattern'"), 400
    if not isinstance(selectors, list) or not selectors:
        return jsonify(error="Invalid 'selectors'"), 400

    scrape = Scrape(status=ScrapeStatus.NEEDS_SCHEMA, url_pattern=url_pattern, selectors=json.dumps(selectors))
    db.session.add(scrape)
    db.session.commit()
    return jsonify(id=scrape.id), 201


@app.route("/schema/<scrape_id>", methods=["POST"])
def schema(scrape_id):
    return jsonify(), 501


@app.route("/result/<scrape_id>", methods=["POST"])
def result(scrape_id):
    return jsonify(), 501


if __name__ == "__main__":
    db.create_all()
    app.run(host="0.0.0.0", debug=True)
