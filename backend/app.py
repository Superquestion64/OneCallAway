
from flask import Flask, render_template, session, redirect
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import pymongo
import uuid
from datetime import timedelta
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.secret_key = uuid.uuid4().hex
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["JWT_SECRET_KEY"] = uuid.uuid4().hex
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=1)
jtw = JWTManager(app)

#Database
client = pymongo.MongoClient('mongodb://localhost:27017')
db = client.Profiles

from user import routes

if __name__ == "__main__":
    app.run(debug=True)
