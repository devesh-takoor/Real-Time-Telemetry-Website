from paho.mqtt import client as mqtt_client
import json 
from datetime import datetime
import os
from flask import Flask, request, json, render_template
from flask_cors import CORS
import flask_sqlalchemy
import flask_migrate
from sqlalchemy.ext.declarative import DeclarativeMeta
import sys
#from mqtt_data import *


app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
   return render_template('rttweb.html')

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

@app.route("/dashboard", methods=['GET'])
def get_sensordata():
   print("Sensor data has been received")

   sensor_obj = Sensor.query.all()

   response = json.dumps(sensor_obj, cls=AlchemyEncoder)
   print(response)
   #return response, 200
   return render_template('dashboard.html', response=response )


@app.route('/account', methods=['GET'])
def navbar():
   return render_template('account.html')

if __name__ == '__main__':
   app.run(debug=True)
