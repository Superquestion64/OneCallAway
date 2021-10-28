from flask import Flask, jsonify, json
from flask_cors import CORS, cross_origin
from app import app
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
@jwt_required()
@cross_origin()
def signout():
    return User().signout()

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    return User().login()

@app.route('/update', methods=['PATCH'])
@jwt_required()
@cross_origin()
def update():
    return User().update()

@app.route('/authorize', methods=['GET'])
@jwt_required()
@cross_origin()
def authorize():
    exp_timestamp = get_jwt()["exp"]
    now = datetime.now(timezone.utc)
    target_timestamp = datetime.timestamp(now + timedelta(minutes=0))
    if target_timestamp > exp_timestamp:
        return jsonify({"error": "Token Expired"}), 401
    else:
        resp = jsonify(success=True)
        return resp
