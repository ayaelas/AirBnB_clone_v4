#!/usr/bin/python3
""" Starts Flash Web Application """

from os import environ
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place

from flask import Flask, render_template
import uuid
app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.route('/0-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(ameniti
   cache_id = uuid.uuid4()
    return render_template('0-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)

@app.teardown_appcontext
def close_db(error):
    """ delete the current SQLAlchemy Session """
    storage.close()

if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
