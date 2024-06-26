from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS  # Import CORS module

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/python', methods=['POST'])
def run_python_video_script():
    try:
        # Assuming the Python script to be executed is named 'Video_detection.py'
        process = subprocess.Popen(['python', 'Video_detection.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = process.communicate()
        
        if process.returncode == 0:
            return jsonify({'status': 'success', 'output': output.decode('utf-8')})
        else:
            return jsonify({'status': 'error', 'message': error.decode('utf-8')})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/pythonword', methods=['POST'])
def run_python_word_script():
    try:
        # Assuming the Python script to be executed is named 'try.py'
        process = subprocess.Popen(['python', 'try.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = process.communicate()
        
        if process.returncode == 0:
            return jsonify({'status': 'success', 'output': output.decode('utf-8')})
        else:
            return jsonify({'status': 'error', 'message': error.decode('utf-8')})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})
    


@app.route('/pythonimg', methods=['POST'])
def run_python_img_script():
    try:
        # Assuming the Python script to be executed is named 'try.py'
        process = subprocess.Popen(['python', 'Image_detection.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = process.communicate()
        
        if process.returncode == 0:
            return jsonify({'status': 'success', 'output': output.decode('utf-8')})
        else:
            return jsonify({'status': 'error', 'message': error.decode('utf-8')})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5009)



