
import torch
from torch.utils.model_zoo import load_url
from scipy.special import expit
import sys
import os
from datetime import datetime
import cv2
import numpy as np

sys.path.append('..')

from blazeface import FaceExtractor, BlazeFace, VideoReader
from architectures import fornet, weights
from isplutils import utils

def get_video_metadata(video_path):
    """
    Retrieve basic metadata of the video file.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise ValueError("Error opening video file.")
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    duration = frame_count / fps
    cap.release()
    return {
        "frame_count": frame_count,
        "fps": fps,
        "duration": duration
    }

def save_frame_with_text(image, text, output_path):
    """
    Save a frame with overlaid text.
    """
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 1
    font_color = (0, 255, 0)
    font_thickness = 2
    x, y = 50, 50

    image_with_text = cv2.putText(image.copy(), text, (x, y), font, font_scale, font_color, font_thickness)
    cv2.imwrite(output_path, image_with_text)

def video_pred(video_path, threshold=0.5, model='EfficientNetB4', dataset='DFDC', frames=100):
    """
    Predict whether a video is real or fake using a specified model and dataset.
    """
    net_model = model
    train_db = dataset

    # Setting the parameters
    device = torch.device('cuda:0') if torch.cuda.is_available() else torch.device('cpu')
    face_policy = 'scale'
    face_size = 224
    frames_per_video = frames

    # Loading the weights
    model_url = weights.weight_url['{:s}_{:s}'.format(net_model, train_db)]
    net = getattr(fornet, net_model)().eval().to(device)
    net.load_state_dict(load_url(model_url, map_location=device, check_hash=True))

    transf = utils.get_transformer(face_policy, face_size, net.get_normalizer(), train=False)

    # Loading the face detector
    facedet = BlazeFace().to(device)
    facedet.load_weights("D:/SAVANA_API/AI/setup/deepfake/deep/blazeface/blazeface.pth")
    facedet.load_anchors("D:/SAVANA_API/AI/setup/deepfake/deep/blazeface/anchors.npy")

    # Initializing the video reader and face extractor
    videoreader = VideoReader(verbose=False)
    video_read_fn = lambda x: videoreader.read_frames(x, num_frames=frames_per_video)
    face_extractor = FaceExtractor(video_read_fn=video_read_fn, facedet=facedet)

    # Extract faces from the video
    vid_fake_faces = face_extractor.process_video(video_path)

    # Process the extracted faces
    faces_fake_t = torch.stack([transf(image=frame['faces'][0])['image'] for frame in vid_fake_faces if len(frame['faces'])])
    with torch.no_grad():
        faces_fake_pred = net(faces_fake_t.to(device)).cpu().numpy().flatten()

    # Determine if the video is fake or real
    prediction = 'fake' if faces_fake_pred.mean() > threshold else 'real'
    probability = expit(faces_fake_pred.mean())

    # Save the middlemost frame with the result text
    if vid_fake_faces:
        middle_frame_index = len(vid_fake_faces) // 2
        middle_frame = vid_fake_faces[middle_frame_index]

        if len(middle_frame['faces']) > 0:
            frame_image = middle_frame['faces'][0]
            frame_image = cv2.cvtColor(np.array(frame_image), cv2.COLOR_RGB2BGR)
           ## output_image_path = os.path.join(os.path.dirname(video_path), 'video3.jpg')
            ##save_frame_with_text(frame_image, prediction, "D:/SAVANA_API/AI/setup/deepfake/images/video3.jpg")

    return prediction, probability, faces_fake_pred

def generate_summary_report(video_path, prediction, probability, faces_fake_pred, report_path="summary_report3.txt"):
    """
    Generate a detailed summary report of the prediction.
    """
    metadata = get_video_metadata(video_path)
    frame_predictions = ['fake' if score > 0.5 else 'real' for score in faces_fake_pred]
    prediction_consistency = sum(1 for pred in frame_predictions if pred == prediction)
    confidence_stats = {
        "mean": np.mean(faces_fake_pred),
        "median": np.median(faces_fake_pred),
        "min": np.min(faces_fake_pred),
        "max": np.max(faces_fake_pred)
    }

    report = []
    report.append(f"Video Path: {video_path}")
    report.append(f"Video Duration: {metadata['duration']:.2f} seconds")
    report.append(f"Total Frames: {metadata['frame_count']}")
    report.append(f"Frame Rate (FPS): {metadata['fps']:.2f}")
    report.append(f"Number of Processed Frames: {len(faces_fake_pred)}")
    report.append(f"Prediction: {prediction}")
    report.append(f"Prediction Consistency: {prediction_consistency} frames agree with the overall prediction")
    report.append(f"Probability: {probability:.2f}")
    report.append("Confidence Scores per Frame:")
    for i, score in enumerate(faces_fake_pred):
        report.append(f"Frame {i+1}: {frame_predictions[i]}, Confidence: {score:.4f}")
    report.append("Confidence Score Statistics:")
    report.append(f"Mean: {confidence_stats['mean']:.4f}")
    report.append(f"Median: {confidence_stats['median']:.4f}")
    report.append(f"Min: {confidence_stats['min']:.4f}")
    report.append(f"Max: {confidence_stats['max']:.4f}")
    report.append(f"Timestamp: {datetime.now().isoformat()}")

    with open(report_path, 'w') as f:
        for line in report:
            f.write(line + "\n")

if __name__ == "__main__":
    video_path = r"D:/SAVANA_API/AI/setup/deepfake/video/testv.mp4"
    if not os.path.exists(video_path):
        print("Error: Provided video path does not exist.")
        sys.exit(1)

    # Perform the prediction
    prediction, probability, faces_fake_pred = video_pred(video_path, model='EfficientNetB4')

    # Print the prediction result
    print(f"The given video is {prediction} with a probability of {probability:.2f}")

    # Generate and save the summary report
    generate_summary_report(video_path, prediction, probability, faces_fake_pred)

    # Save the middlemost frame with the prediction text
    print("Middlemost frame with the prediction text has been saved.")








