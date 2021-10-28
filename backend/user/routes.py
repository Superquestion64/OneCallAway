from flask import Flask, jsonify, json, Response
from flask_cors import CORS, cross_origin
from app import app, jwt
from user.models import User
from flask_jwt_extended import jwt_required, get_jwt
from datetime import datetime
from datetime import timedelta
from datetime import timezone

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
def update():
    return User().update()

@app.route('/authorize', methods=['GET'])
@cross_origin()
@jwt_required()
def authorize():
    status_code = Response(status=200)
    return status_code

#Change default message for expire token
@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"error": "Session has expired"}), 401