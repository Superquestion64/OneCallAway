
from flask import Flask, render_template, session, redirect
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import pymongo
import uuid

app = Flask(__name__)
app.secret_key = uuid.uuid4().hex
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#Database
client = pymongo.MongoClient('mongodb://localhost:27017')
db = client.Profiles

@app.route('/')
def home():
    return render_template('home.html')
    
@app.route('/dashboard/')
def dashboard():
    return render_template('dashboard.html')
from user import routes

if __name__ == "__main__":
    app.run(debug=True)
