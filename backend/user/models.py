from flask import Flask, jsonify, request, session, redirect
from app import db
from passlib.hash import pbkdf2_sha256
import uuid
import re
import json

class User:
        
    @staticmethod
    def valid_password(password):
        regex = r"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()+=]).{8,25}$"
        if re.match(regex, password):
            return True
        return False

    def start_session(self, user):
        session['logged_in'] = True
        session['_id'] = user['_id']
        return jsonify(user['_id']), 200

    def register(self):
        print(request.form)
        # Create the user object
        user = {
            "_id": uuid.uuid4().hex,
            "username":request.json['username'],
            "email": request.json['email'],
            "password": request.json['password']
        }
        if request.json['password'] == request.json['passwordConfirm']:
            if self.valid_password(user['password']):
                #Encrypt the password
                user['password'] = pbkdf2_sha256.encrypt(user['password'])
            else:
                return jsonify({ "error" : "Please enter a passwod atleast 8 characters long, contains a captial case, lower case, a number and a special character"}), 400
        
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
                return self.start_session(user)
            return jsonify({ "error": "Signup failed"}), 400
        return jsonify({"error": "Password does not match"}), 400

    # Log out
    def signout(self):
        if 'logged_in' in session:
            session.clear()
            return 'Logged out successfully'
        return jsonify({"error": "User not logged in"}) 

    #Log in
    def login(self):
        user = db.users.find_one({
            "email": request.json['email']
        })
        # Compares the entered password and the encrypted password, 
        #starts session if the passwords are the same
        #pbkdf2_sha256.verify
        if user and pbkdf2_sha256.verify(request.json['password'], user['password']):
            return self.start_session(user)
        
        return jsonify({ "error": "Invalid login credentials"}), 401

    #Update
    def update(self):
        if 'logged_in' in session:
            email = request.json['email']
            username = request.json['username']
            current = db.users.find_one({"_id": session['_id']})
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
                    return 'Email in use'
            #Check to see if username is in use
            if db.users.find_one({"username": update_user['username']}):
                #Check whether the username is the current user's
                if (current['username'] != update_user['username']):
                    return 'Username in use'
            #Check to see if new password is a valid password, if it is encrypt it and update the user infor
            if self.valid_password(request.json['password']):
                update_user['password'] = pbkdf2_sha256.encrypt(update_user['password'])
                db.users.update_one({"_id": session['_id']}, {"$set": update_user})
                session['_id'] = session['_id']
                return jsonify(update_user['_id'])
            else:
                return jsonify({"error": "Password is invalid"}),400
        return jsonify({"error": "User not logged in"})
                    
        