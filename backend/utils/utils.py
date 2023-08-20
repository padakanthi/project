from os import strerror
import yaml
from flask import make_response,jsonify
import time
import jwt

secret = "ksjbgkjskdj121"
def get_userdata():
    try:
        st = open("./data/users.yaml","r");
        user_data = yaml.load(st,Loader=yaml.FullLoader)
        st.close()
        return user_data
    except IOError as e:
        print("I/O error occured while reading data: ",strerror(e.errno))
        return make_response(jsonify({'message':"Failed to read user from DB","status":"error"}),500)


def generate_token(id,expires_in=600):
    return jwt.encode({'id':id,expires_in:time.time()+expires_in}, secret,algorithm='HS256')

def validate_token(headers):
    print("Token validation")
    # validating the jwt token
    if 'Authorization' not in headers:
        return (False,{"message":"Access denied!!!, Auth Token is missing!",'status':'error'})
    if not headers['Authorization']:
        return (False,{"message":"Access denied!!!, Auth Token is required!",'status':'error'})
        
    token = headers['Authorization'].split(' ')[1]
    try:
        data = jwt.decode(token,secret,algorithms="HS256")
        print("Token validation successful")
        return (True,data)
    except Exception as e:
        print("Error while decoding token: ",e)
        return (False,{"message":"Access denied!!!, Auth Token is invalid!",'status':'error'})