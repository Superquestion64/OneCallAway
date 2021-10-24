from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from app import app
from user.models import User
from flask_jwt_extended import jwt_required

@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    return User().register()

@app.route('/logout', methods=['GET'])
@cross_origin()
@jwt_required()
def signout():
    return User().signout()

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    return User().login()

@app.route('/update', methods=['PATCH'])
@cross_origin()
@jwt_required()
def update():
    return User().update()
