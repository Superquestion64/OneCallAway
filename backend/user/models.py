from flask import Flask, jsonify, request, session, redirect, json, Response, abort
from app import db
from passlib.hash import pbkdf2_sha256
import uuid
import re
#mport json
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from email_validator import validate_email, EmailNotValidError

class User:
        
    @staticmethod
    def valid_password(password):
        regex = r"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()+=]).{8,25}$"
        if re.match(regex, password):
            return True
        return False
    
    @staticmethod
    def valid_email(email):
        try:
            # Validate.
            valid = validate_email(email)
            # Update with the normalized form.
            email = valid.email
            return True
        except:
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
                    return jsonify(token=access_token)
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
            return jsonify(token=access_token)
        #abort(401, error = "Invalid login credentials")
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
                return jsonify({"error":"Email in use"}), 400
        #Check to see if username is in use
        if db.users.find_one({"username": update_user['username']}):
            #Check whether the username is the current user's
            if (current['username'] != update_user['username']):
                return jsonify({'Username in use'}), 400
        #Check to see if new password is a valid password, if it is encrypt it and update the user infor
        if self.valid_password(request.json['password']) and self.valid_email(update_user['email']):
            update_user['password'] = pbkdf2_sha256.encrypt(update_user['password'])
            db.users.update_one({"email": current_user}, {"$set": update_user})
            access_token = create_access_token(identity=update_user['email'])
            return jsonify(access_token=access_token)
        elif self.valid_email(update_user['email']) == False:
            return jsonify({"error": "Email is invalid"}), 400
        else:
            return jsonify({"error": "Password is invalid"}),400