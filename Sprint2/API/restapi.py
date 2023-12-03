import flask
from flask import jsonify, request
from sql import create_connection, execute_read_query, execute_query
import creds

app = flask.Flask(__name__)
app.config["DEBUG"] = True

# Database connection
myCreds = creds.Creds()
conn = create_connection(myCreds.hostname, myCreds.uname, myCreds.pwd, myCreds.dbname)

# CRUD operations for floor
@app.route('/api/floor/all', methods=['GET'])
def api_all_floor():
    query = "SELECT * FROM floor"
    floor = execute_read_query(conn, query)
    return jsonify(floor)

@app.route('/api/floor', methods=['GET'])
def api_floor_by_id():
    if 'id' in request.args:
        floor_id = int(request.args['id'])
    else:
        return 'Error: No ID provided!'
    
    query = f"SELECT * FROM floor WHERE id = {floor_id}"
    results = execute_read_query(conn, query)
    return jsonify(results)

@app.route('/api/floor', methods=['POST'])
def api_add_floor():
    request_data = request.get_json()
    new_id = request_data['id']
    new_level = request_data['level']
    new_name = request_data['name']
    
    query = f"INSERT INTO floor (id, level, name) VALUES ({new_id}, '{new_level}', '{new_name}')"
    execute_query(conn, query)
    return 'Add floor request successful!'

@app.route('/api/floor', methods=['DELETE'])
def api_delete_floor():
    request_data = request.get_json()
    floor_id_to_delete = request_data['id']
    
    query = f"DELETE FROM floor WHERE id = {floor_id_to_delete}"
    execute_query(conn, query)
    return "Delete floor request successful!"

# CRUD operations for room
@app.route('/api/room/all', methods=['GET'])
def api_all_room():
    query = "SELECT * FROM room"
    room = execute_read_query(conn, query)
    return jsonify(room)

@app.route('/api/room', methods=['GET'])
def api_room_by_id():
    if 'id' in request.args:
        room_id = int(request.args['id'])
    else:
        return 'Error: No ID provided!'
    
    query = f"SELECT * FROM room WHERE id = {room_id}"
    results = execute_read_query(conn, query)
    return jsonify(results)

@app.route('/api/room', methods=['POST'])
def api_add_room():
    request_data = request.get_json()
    new_id = request_data['id']
    new_capacity = request_data['capacity']
    new_number = request_data['number']
    new_floor = request_data['floor']
    
    query = f"INSERT INTO room (id, capacity, number, floor) VALUES ({new_id}, {new_capacity}, '{new_number}', '{new_floor}')"
    execute_query(conn, query)
    return 'Add room request successful!'

@app.route('/api/room', methods=['DELETE'])
def api_delete_room():
    request_data = request.get_json()
    room_id_to_delete = request_data['id']
    
    query = f"DELETE FROM room WHERE id = {room_id_to_delete}"
    execute_query(conn, query)
    return "Delete room request successful!"

# CRUD operations for resident
@app.route('/api/resident/all', methods=['GET'])
def api_all_resident():
    query = "SELECT * FROM resident"
    resident = execute_read_query(conn, query)
    return jsonify(resident)

@app.route('/api/resident', methods=['GET'])
def api_resident_by_id():
    if 'id' in request.args:
        resident_id = int(request.args['id'])
    else:
        return 'Error: No ID provided!'
    
    query = f"SELECT * FROM resident WHERE id = {resident_id}"
    results = execute_read_query(conn, query)
    return jsonify(results)

@app.route('/api/resident', methods=['POST'])
def api_add_resident():
    request_data = request.get_json()
    new_id = request_data['id']
    new_firstname = request_data['firstname']
    new_lastname = request_data['lastname']
    new_age = request_data['age']
    new_room = request_data['room']
    
    query = f"INSERT INTO resident (id, firstname, lastname, age, room) VALUES ({new_id}, '{new_firstname}', '{new_lastname}', {new_age}, {new_room})"
    execute_query(conn, query)
    return 'Add resident request successful!'

@app.route('/api/resident', methods=['DELETE'])
def api_delete_resident():
    request_data = request.get_json()
    resident_id_to_delete = request_data['id']
    
    query = f"DELETE FROM resident WHERE id = {resident_id_to_delete}"
    execute_query(conn, query)
    return "Delete resident request successful!"

if __name__ == '__main__':
    app.run()
    