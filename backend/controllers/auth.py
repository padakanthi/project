from flask import request,make_response,jsonify
from flask_restful import Resource
from utils.utils import get_userdata,generate_token

class Auth(Resource):
    def post(self):
        data = request.json
        if not data['email'] or not data['password']:
            return make_response(jsonify({'message':'All Fields are required - email and password','status':'error'}),400)
        
        user_data = get_userdata()
        for user in user_data['users']:
            if user['email'] == data['email']:
                if(user['password'] == data['password']):
                    return make_response(jsonify({'message':"User authenticated successfully",'status':'success','user':{'name':user['name'],'email':user['email'],'id':user['id']},'token':generate_token(user['id'])}),200)
                else:
                    return make_response(jsonify({'message':"Invalid username/password",'status':'error'}),400)
        else:
            return make_response(jsonify({'message':f"Invalid username, {data['email']} is not registered",'status':'error'}),400)

