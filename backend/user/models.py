from flask import Flask, jsonify, request, session, redirect
from app import db
from passlib.hash import pbkdf2_sha256
import uuid
import re

class User:

    @staticmethod
    def check_password(password_hash, password):
        return pbkdf2_sha256.verify(password_hash,password)
        
    @staticmethod
    def valid_password(password):
        regex = r"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()+=]).{8,25}$"
        if re.match(regex, password):
            return True
        return False

    def start_session(self, user):
        session['logged_in'] = True
        session['_id'] = user['_id']
        return jsonify(user), 200

    def register(self):
        # Create the user object
        user = {
            "_id": uuid.uuid4().hex,
            "username":request.form.get('username'),
            "email": request.form.get('email'),
            "password": request.form.get('password')
        }
        print(request.form)
        if request.form.get('password') == request.form.get('verifypassword'):
            if self.valid_password(user['password']):
                #Encrypt the password
                user['password'] = pbkdf2_sha256.encrypt(user['password'])
            else:
                return jsonify({ "error" : "Please enter a passwod atleast 8 characters long,\
                    contains a captial case, lower case, a number and a special character"}), 400
        
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
            "username": request.form.get('username')
        })
        # Compares the entered password and the encrypted password, 
        #starts session if the passwords are the same
        #pbkdf2_sha256.verify
        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
            return self.start_session(user)
        
        return jsonify({ "error": "Invalid login credentials"}), 401

    #Update
    def update(self):
        if 'logged_in' in session:
            email = request.form.get('email')
            username = request.form.get('username')
            current = db.users.find_one({"_id": session['_id']})
            if email == '':
                email = current['email']
            if username == '':
                username = current['username']
            update_user = {
               "email": email,
                "username": username,
                "password": request.form.get('password')
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
            if self.valid_password(request.form.get('password')):
                update_user['password'] = pbkdf2_sha256.encrypt(update_user['password'])
                db.users.update_one({"_id": session['_id']}, {"$set": update_user})
                session['_id'] = session['_id']
                return jsonify(update_user)
            else:
                return jsonify({"error": "Password is invalid"}),400
            return jsonify({"error":"Unable to update"}),400
        return jsonify({"error": "User not logged in"})
                    
        