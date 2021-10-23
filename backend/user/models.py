from flask import Flask, jsonify, request, session, redirect
from app import db
from passlib.hash import pbkdf2_sha256
import uuid
import re
import json
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity

class User:
        
    @staticmethod
    def valid_password(password):
        regex = r"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()+=]).{8,25}$"
        if re.match(regex, password):
            return True
        return False
    
    @staticmethod
    def valid_email(email):
        regex = r"^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"
        if re.match(regex, email):
            return True
        return False

    def register(self):
        #print(request.form)
        user = {
            "_id": uuid.uuid4().hex,
            "username":request.json['username'],
            "email": request.json['email'],
            "password": request.json['password']
        }
        if request.json['password'] == request.json['passwordConfirm']:
            if self.valid_password(user['password']) == False:
                return jsonify({ "error" : "Please enter a passwod atleast 8 characters long, contains a captial case, lower case, a number and a special character"}), 400
            elif self.valid_email(user['email']) == False:
                return jsonify({"error": "Email is not a valid email"}), 400
            else:
                #Encrypt the password
                user['password'] = pbkdf2_sha256.encrypt(user['password'])
                # Check for existing email address
                if db.users.find_one({"email": user['email']}):
                    if db.users.find_one({"username": user['username']}):
                        return jsonify({"error": "Both email and username in use"}), 400
                    return jsonify({ "error": "Email address already in use"}), 400
                # Check for existing username
                elif db.users.find_one({"username": user['username']}):
                    return jsonify({ "error": "Username already in use"}), 400
                # Insert the user object into database
                if db.users.insert_one(user):
                    access_token = create_access_token(identity=user['email'])
                    return jsonify(access_token=access_token)
            return jsonify({ "error": "Signup failed"}), 400
        return jsonify({"error": "Password does not match"}), 400

    # Log out
    def signout(self):
        token = ""
        return jsonify(token)

    #Log in
    def login(self):
        user = db.users.find_one({
            "email": request.json['email']
        })
        # Compares the entered password and the encrypted password, 
        #starts session if the passwords are the same
        if user and pbkdf2_sha256.verify(request.json['password'], user['password']):
            access_token = create_access_token(identity=user['email'])
            return jsonify(access_token=access_token)
        
        return jsonify({ "error": "Invalid login credentials"}), 401

    #Update
    def update(self):
        current_user = get_jwt_identity()
        email = request.json['email']
        username = request.json['username']
        current = db.users.find_one({"email": current_user})
        if email == '':
            email = current['email']
        if username == '':
            username = current['username']
        update_user = {
            "email": email,
            "username": username,
            "password": request.json['password']
        }
        #Check to see if email is in use
        if db.users.find_one({"email": update_user['email']}):
            #Check whether the email is the current user's
            if (current['email'] != update_user['email']):
                return jsonify({'Email in use'}), 400
        #Check to see if username is in use
        if db.users.find_one({"username": update_user['username']}):
            #Check whether the username is the current user's
            if (current['username'] != update_user['username']):
                return jsonify({'Username in use'}), 400
        #Check to see if new password is a valid password, if it is encrypt it and update the user infor
        if self.valid_password(request.json['password']):
            update_user['password'] = pbkdf2_sha256.encrypt(update_user['password'])
            db.users.update_one({"email": current_user}, {"$set": update_user})
            access_token = create_access_token(identity=update_user['email'])
            return jsonify(access_token=access_token)
        else:
            return jsonify({"error": "Password is invalid"}),400