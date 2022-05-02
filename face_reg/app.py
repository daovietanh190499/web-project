import os
from deepface import DeepFace
from deepface.commons import functions
import nmslib
from flask import Flask, request, jsonify, render_template
import tensorflow as tf
import numpy as np

tf_version = int(tf.__version__.split(".")[0])

app = Flask(__name__)
if tf_version == 1:
	graph = tf.get_default_graph()
facenet = DeepFace.build_model('Facenet')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "GET":
        return render_template('index.html')
    else:
        req = request.get_json()
        img = ""
        if "img" in list(req.keys()):
            img = req["img"] #list

        validate_img = False
        if len(img) > 11 and img[0:11] == "data:image/":
            validate_img = True

        if validate_img != True:
            print("invalid image passed!")
            return jsonify({'success': False, 'error': 'you must pass img as base64 encoded string'}), 205
        img = functions.preprocess_face(img=img, target_size=(160, 160), enforce_detection=False)
        result = facenet.predict(img)[0,:]
        target_representation = np.expand_dims(result, axis = 0)
        index = nmslib.init(space='cosinesimil')
        index.loadIndex('index.bin')
        neighbors, distances = index.knnQueryBatch(target_representation, k = 3, num_threads = 4)[0]
        return jsonify({'result': neighbors[0]}), 200

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "GET":
        return render_template('register.html')
    else:
        req = request.get_json()
        img = ""
        if "img" in list(req.keys()):
            img = req["img"] #list

        validate_img = False
        if len(img) > 11 and img[0:11] == "data:image/":
            validate_img = True

        if validate_img != True:
            print("invalid image passed!")
            return jsonify({'success': False, 'error': 'you must pass img as base64 encoded string'}), 205
        
        img = functions.preprocess_face(img=img, target_size=(160, 160), enforce_detection=False)
        result = facenet.predict(img)[0,:]
        target_representation = np.expand_dims(result, axis = 0)
        index = nmslib.init(space='cosinesimil')
        if os.path.isfile('index.bin'):
            index.loadIndex('index.bin')
        index.addDataPointBatch(target_representation)
        index_time_params = {'M': 15, 'indexThreadQty': 4, 'efConstruction': 100}
        index.createIndex(index_time_params)
        index.saveIndex('index.bin', save_data=True)
        return jsonify({'result': result.tolist()}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
