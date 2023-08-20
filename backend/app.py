from os import strerror 
import yaml
from flask import Flask,request,jsonify,make_response
from flask_restful import Resource,Api
from flask_cors import CORS
import jwt
import time
import uuid
from controllers.auth import Auth
from controllers.pingtest import PingTest
from controllers.user import User

app = Flask(__name__)
api = Api(app)

app.config['SECRET_KEY'] = "ksjbgkjskdj121"

CORS(app)

api.add_resource(User,"/api/user")
api.add_resource(Auth,"/api/user/login")
api.add_resource(PingTest,"/api/ping")

if __name__ == '__main__':
    app.run(debug=True)