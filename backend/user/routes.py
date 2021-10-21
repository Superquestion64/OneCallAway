from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from app import app
from user.models import User

@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    return User().register()

@app.route('/logout')
@cross_origin()
def signout():
    return User().signout()

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    return User().login()

@app.route('/update', methods=['POST'])
@cross_origin()
def update():
    return User().update()
