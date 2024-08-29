
from flask import Flask, Blueprint, jsonify, request, current_app, g
from flask_cors import CORS
from dotenv import load_dotenv
import os
from bson.objectid import ObjectId
from pymongo import MongoClient
from datetime import datetime


app = Flask(__name__)

CORS(app)
load_dotenv()


# client = MongoClient(os.getenv("MONGODB_URL"))
client = MongoClient(os.getenv("MONGODB_URL"), 
                     tls=True, tlsAllowInvalidCertificates=True
                     )

print("client",client)
# app.config["MONGO_URI"] = os.getenv("MONGODB_URL")
# print("MONGO_URI:", app.config["MONGO_URI"])






db = client.goal
print('mongo.db',db)
goalCollection=db.goals


def serialize_goal(goal):
    if '_id' in goal:
        goal['_id'] = str(goal['_id'])
    return goal

# Get a single goal
@app.route('/api/goals/<string:id>', methods=['GET'])
def get_goal(id):
    try:
        goal = goalCollection.find_one({'_id': ObjectId(id)})
    except Exception as e:
        return jsonify({'error': 'Invalid ID format'}), 400

    if not goal:
        return jsonify({'error': 'Goal not found'}), 404

    return jsonify(serialize_goal(goal))

# Get all goals
@app.route('/', methods=['GET'])
def get_all_goals():
    goals = list(goalCollection.find())
    print('goals',goals )
    return jsonify([serialize_goal(goal) for goal in goals])

# Create a goal
@app.route('/new', methods=['POST'])
def create_goal():
    data = request.get_json()
    if not data or 'title' not in data:
        return jsonify({'error': 'Invalid data'}), 400
    
    now = datetime.now()
    new_goal = {
        'title': data['title'],
        'content': data.get('content', ''),
        'status': data.get('status', 'Not Started'),
        'due_date':data.get('due_date','No due date'),
        'created_at': now,
        'updated_at': now
    }
    print("new",new_goal)
    new_record = goalCollection.insert_one(new_goal)
    new_goal['_id'] = str(new_record.inserted_id)
    return jsonify(new_goal), 201

# Update a goal
@app.route('/<string:id>', methods=['PUT'])
def edit_goal(id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    try:
        res = goalCollection.update_one(
            {'_id': ObjectId(id)},
            {'$set': {
                'title': data.get('title', ''),
                'content': data.get('content', ''),
                'status': data.get('status', 'Not Started'),
                'due_date':data.get('due_date','No due date'),
                'updated_at':datetime.now()
            }}
        )
        if res.matched_count==0:
            return jsonify({'error': 'Goal not found'}), 404
        updated_goal=goalCollection.find_one({'_id':ObjectId(id)})
        return jsonify(serialize_goal(updated_goal))
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Delete a goal
@app.route('/<string:id>', methods=['DELETE'])
def delete_goal(id):
    try:
        result = goalCollection.find_one_and_delete({'_id': ObjectId(id)})
        if not result:
            return jsonify({'error': 'Goal not found'}), 404
        result['_id'] = str(result['_id'])
        return jsonify({'message': 'Goal deleted successfully', 'deleted_goal': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400



if __name__ == '__main__':
    app.run(debug=True)
