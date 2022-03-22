import random

from paho.mqtt import client as mqtt_client
import json 
from datetime import datetime
import os
from flask import Flask, request, json
from flask_cors import CORS
import flask_sqlalchemy
import flask_migrate
from sqlalchemy.ext.declarative import DeclarativeMeta
import sys

broker = 'test.mosquitto.org'
port = 1883
topic = "arduino/rttweb"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 100)}'


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

def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    #client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        msg = msg.payload.decode('utf-8').replace("'",'"')
        #x="'"
        #msg = (x +(msg)+ x)
        print (msg)
        status=add_data("test", msg, timestamp=datetime.now())
        print(status)
        collection = get_sensor_data("test")
        print(collection)
        data_json = json.loads(msg)
    client.subscribe(topic)
    client.on_message = on_message


def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()


if __name__ == '__main__':
    run()
