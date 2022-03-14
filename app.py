
from datetime import datetime
import os
from flask import Flask, request, json
from flask_cors import CORS
import flask_sqlalchemy
import flask_migrate
from sqlalchemy.ext.declarative import DeclarativeMeta
import sys

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
print(basedir)
# Database Settings
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'sql.db')

# Database Representation
db = flask_sqlalchemy.SQLAlchemy(app)
migrate = flask_migrate.Migrate(app, db)


class Sensor(db.Model):
    entry_id = db.Column(db.Integer, primary_key=True)
    sensor_id = db.Column(db.String(32))
    data = db.Column(db.String(255))
    timestamp = db.Column(db.DateTime(), default=datetime.now())
    #email = db.Column(db.String(64), unique=True)

    def __repr__(Sensor):
        return f'<Sensor Data:{self.sensor_id} {self.data} {self.timestamp}>'

db.create_all()

def add_data(sensor_id,data,timestamp=datetime.now()):
    sensor = Sensor(sensor_id=sensor_id,
                    data=data,
                    timestamp=timestamp)
    status = None
    try:
        db.session.add(sensor)
        db.session.commit()
        status = 'OK'
    except Exception as err:
        print(err)
        status = 'Error'
    finally:
        return status

def get_sensor_data(sensor_id):
    data_collection=[]
    try:
        for entry in Sensor.query.filter_by(sensor_id=sensor_id):
            data_collection.append([entry.sensor_id, entry.data, entry.timestamp])
    except Exception as err:
        print(err)

    return data_collection

class AlchemyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data) # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)


@app.route("/")
def home():
    status=add_data("test", "data1", timestamp=datetime.now())
    print(status)
    collection = get_sensor_data("test")
    print(collection)
    return str(collection)

@app.route("/api/add_new_data", methods=['POST'])
def add_new_data():
    print("New Data has been received")

    response = '{"Status":"Error"}'
    try:
        data_str = request.data.decode()
        # Display JSON String
        print(data_str)
        data_dict = json.loads(data_str)
        # Display Data Dictionary
        for key in data_dict:
            print(f'{key}: {data_dict[key]}')

        status = add_data(data_dict['sensor_id'],
                          data_dict['data'],
                          data_dict['timestamp'])

        if status == 'OK':
            response = app.response_class(
                response=json.dumps(f'{data_dict["sensor_id"]} {data_dict["data"]} has been added'),
                status=200,
                mimetype='application/json')
        elif status == 'Error':
            response = app.response_class(
                response=json.dumps('An unexpected error occurred'),
                status=500,
                mimetype='application/json')

    except Exception as err:
        print(err)

    return response


@app.route("/api/get_data", methods=['GET'])
def get_all_data():
    print("Data Request has been received")

    data_obj = Sensor.query.all()

    response = json.dumps(data_obj, cls=AlchemyEncoder)
    print(response)
    return response, 200

if __name__ == '__main__':
   app.run(debug=True)
