import json
from flask import Flask, request
# from flask_api import status
import os
from reset_data import reset
from datetime import datetime as dt
import time
import uuid

####################
### This block initializes the arrays "Users" and "Pleets" from the json file storage system
### To edit any data, just edit these arrays, and call the update() method
####################

Users = []
Pleets = []

here = os.path.dirname(os.path.abspath(__file__))
data = os.path.join(here, "data.json")

with open(data,"r", encoding='utf-8') as datafile:
    rawdata = json.load(datafile)
    Users = rawdata["users"]
    Pleets = rawdata["pleets"]

def update():
    with open(data,"w", encoding='utf-8') as datafile:
        json.dump({
            "users": Users,
            "pleets": Pleets
        }, datafile)

####################
### Flask work starts here
### A Hello World method has been provided as starter, and can be replaced
####################

app = Flask(__name__)

# Testing purposes
@app.route("/reset", methods=["POST"])
def reset_data():
    global Users, Pleets
    reset()
    with open(data,"r", encoding='utf-8') as datafile:
        rawdata = json.load(datafile)
        Users = rawdata["users"]
        Pleets = rawdata["pleets"]
    return {"success": True}

@app.route("/", methods=["GET"])
def hello_world():
    return {"data": "Hello World"}






def replace_userid(pleet):
    user_id = pleet["user_id"]
    userDict = list(filter(lambda user: user['_id'] == user_id, Users))[0]
    user = userDict.copy()
    user['user_id'] = user.pop('_id')
    new_pleet = pleet.copy()
    new_pleet['user'] = user
    new_pleet['pleet_id'] = new_pleet.pop('_id')
    new_pleet.pop('user_id')
    return new_pleet

@app.route("/pleets/<pleet_id>", methods=["GET"])
def get_pleet(pleet_id):
    tweet = list(filter(lambda pleet: pleet['_id'] == pleet_id, Pleets))
    if tweet:
        tweet = tweet[0]
        new_tweet = replace_userid(tweet)
        return new_tweet, 200
    return { "message": "Pleet not found!" }, 404

@app.route("/pleets", methods=["GET"])
def get_recent_pleets():
    sorted_pleets = Pleets[:]
    sorted_pleets.sort(key=lambda p1: p1['datetime'])
    end_index = min(10, len(sorted_pleets))
    pleet_list = [replace_userid(pleet) for pleet in sorted_pleets[:end_index]]
    ret = {'pleets': pleet_list}
    return ret, 200

@app.route("/pleets", methods=["POST"])
def add_pleet():
    addData = request.form
    # request.form handles all non-json encoded data
    # request.json handles all json format data
    # request.data does nothing
    user_dict = list(filter(lambda user: user["username"] == addData['username'], Users))
    if user_dict:
        new_pleet = {}
        new_pleet["_id"] = str(uuid.uuid4())
        new_pleet["user_id"] = user_dict[0]['_id']
        new_pleet["text"] = addData['text']
        new_pleet["datetime"] = int(time.mktime(dt.now().timetuple()))
        Pleets.append(new_pleet)
        update()
        return { "message": "Pleet successfully added!", "pleet_id": new_pleet["_id"] }, 200
    return { "message": "User not found!"}, 404

@app.route("/pleets/<pleet_id>", methods=["DELETE"])
def delete_pleet(pleet_id):
    old_pleet = list(filter(lambda pleet: pleet['_id'] == pleet_id, Pleets))
    if old_pleet:
        old_pleet = old_pleet[0]
        Pleets.pop(Pleets.index(old_pleet))
        update()
        return { "message": "Pleet successfully deleted!" }, 200
    return { "message": "Pleet not found!" }, 404

@app.route("/users/<user_id>", methods=["PUT"])
def edit_username(user_id):
    new_name = request.form["display name"]
    for user in Users:
        if user['_id'] == user_id:
            user['display name'] = new_name
            update()
            return { "message": "User Profile Successfully edited!" }, 200
    return { "message": "User not found!" }, 404

@app.route("/users/<user_id>/pleets", methods=["GET"])
def get_user_pleets(user_id):
    userDict = list(filter(lambda user: user['_id'] == user_id, Users))
    if userDict:
        userPleets = list(filter(lambda pleet: pleet['user_id'] == user_id, Pleets))
        pleet_list = [replace_userid(pleet) for pleet in userPleets]
        ret = {"pleets": pleet_list}
        return ret, 200
    return { "message": "User not found!" }, 404


app.run(port=5001)
