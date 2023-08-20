from flask import request,jsonify,make_response
from flask_restful import Resource
import uuid
import yaml
from utils.utils import generate_token,get_userdata,validate_token


class User(Resource):
    # method to get the user data
    def get(self):
        data = request.json

        # input data validation
        if not data["email"]:
            return make_response(jsonify({"message":"email address is required!"}),400)
        
        result,message = validate_token(request.headers)

        if not result:
            return make_response(jsonify(message),401)

        # fetching the user data
        user_data = get_userdata()

        if(user_data["users"] == None):
            return make_response(jsonify({"message":"No users were present in database","status":"error"}),400)
        for user in user_data["users"]:
            if(user["email"] == data["email"]):
                return make_response(jsonify({"message":"User data found in database","status":"success","user":{"name":user["name"],"email":user["email"],"id":user["id"]}}),200)
        else:
            return make_response(jsonify({"message":"User is not registered yet","status":"error"}),400)
            
    # method to create user
    def post(self):
        data = request.json

        # input data validation
        if not data['name'] or not data['email'] or not data['password']:
            return make_response(jsonify({'message':'All Fields are required - name,email and password'}),400)
        # reading userdata from file
        user_data = get_userdata()

        # generating userid
        data['id'] = str(uuid.uuid4())

        # validating the user
        if(user_data['users'] == None):
            user_data['users']=[data]
        else:
            for user in user_data['users']:
                if(user['email'] == data['email']):
                    return make_response(jsonify({'message':"User already exists","status":"error"}),400)
            else:    
                user_data['users'].append(data)
        
        # saving the user data
        try:
            st = open("./data/users.yaml","w+")
            yaml.dump(user_data,st)
            st.close()
            return make_response(jsonify({'message':"User registered successfully","user":data,"status":"success"}),201)
        except Exception as e:
            print("Error occured while saving user data: ",e)
            make_response(jsonify({'message':"Failed to save user to DB","status":"error"}),500)
            

