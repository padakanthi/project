from flask import request,make_response,jsonify
from flask_restful import Resource
import subprocess
import shlex
from utils.utils import validate_token


class PingTest(Resource):
    def post(self):
        data = request.json

        if not data['ip']:
            res_msg = {'message':"ip address is required!",'status':'error'}
            return make_response(res_msg,400)
        
        # validating the jwt token
        result,message = validate_token(request.headers)

        if not result:
            return make_response(jsonify(message),401)

        command = f"ping -c 1 {data['ip']}"

        res = subprocess.run(shlex.split(command))
        if res.returncode == 0:
            res_msg = jsonify({'message':f"successfully connected to {data['ip']}",'status':'success'})
            return make_response(res_msg,200)
        else:
            res_msg = jsonify({'message':f"connectivity failed to {data['ip']}",'status':'error'})
            return make_response(res_msg,400)

