import torch
from torch.utils.model_zoo import load_url
from PIL import Image
from scipy.special import expit
import os
import sys
import numpy as np
from datetime import datetime
import cv2

sys.path.append('..')

from blazeface import FaceExtractor, BlazeFace
from architectures import fornet, weights
from isplutils import utils

def get_image_metadata(image_path):
    """
    Retrieve basic metadata of the image file.
    """
    image = Image.open(image_path)
    width, height = image.size
    return {
        "width": width,
        "height": height,
        "mode": image.mode,
        "format": image.format
    }

def save_image_with_text(image, text, output_path):
    """
    Save an image with overlaid text.
    """
    image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 1
    font_color = (0, 255, 0)
    font_thickness = 2
    x, y = 50, 50

   ## image_with_text = cv2.putText(image_cv.copy(), text, (x, y), font, font_scale, font_color, font_thickness)
    ## cv2.imwrite(output_path, image_with_text)

def image_pred(image_path, threshold=0.5, model='EfficientNetB4', dataset='DFDC'):
    """
    Predict whether an image is real or fake using a specified model and dataset.
    """
    net_model = model
    train_db = dataset

    device = torch.device('cuda:0') if torch.cuda.is_available() else torch.device('cpu')
    face_policy = 'scale'
    face_size = 224

    model_url = weights.weight_url['{:s}_{:s}'.format(net_model, train_db)]
    net = getattr(fornet, net_model)().eval().to(device)
    net.load_state_dict(load_url(model_url, map_location=device, check_hash=True))

    transf = utils.get_transformer(face_policy, face_size, net.get_normalizer(), train=False)

    facedet = BlazeFace().to(device)
    facedet.load_weights("D:/SAVANA_API/AI/setup/deepfake/deep/blazeface/blazeface.pth")
    facedet.load_anchors("D:/SAVANA_API/AI/setup/deepfake/deep/blazeface/anchors.npy")
    face_extractor = FaceExtractor(facedet=facedet)

    im_real = Image.open(image_path).convert("RGB")
    im_real_faces = face_extractor.process_image(img=im_real)
    im_real_face = im_real_faces['faces'][0]  # take the face with the highest confidence score found by BlazeFace

    faces_t = torch.stack([transf(image=im)['image'] for im in [im_real_face]])

    with torch.no_grad():
        faces_pred = torch.sigmoid(net(faces_t.to(device))).cpu().numpy().flatten()

    prediction = 'fake' if faces_pred.mean() > threshold else 'real'
    probability = expit(faces_pred.mean())

    output_image_path = os.path.join(os.path.dirname(image_path), 'image_with_prediction_img.jpg')
    save_image_with_text(im_real_face, prediction, output_image_path)

    return prediction, probability, faces_pred

def generate_summary_report(image_path, prediction, probability, faces_pred, report_path="summary_report_img.txt"):
    """
    Generate a detailed summary report of the prediction.
    """
    metadata = get_image_metadata(image_path)
    prediction_consistency = sum(1 for score in faces_pred if (score > 0.5 and prediction == 'fake') or (score <= 0.5 and prediction == 'real'))
    confidence_stats = {
        "mean": np.mean(faces_pred),
        "median": np.median(faces_pred),
        "min": np.min(faces_pred),
        "max": np.max(faces_pred)
    }

    report = []
    report.append(f"Image Path: {image_path}")
    report.append(f"Image Width: {metadata['width']}")
    report.append(f"Image Height: {metadata['height']}")
    report.append(f"Image Mode: {metadata['mode']}")
    report.append(f"Image Format: {metadata['format']}")
    report.append(f"Prediction: {prediction}")
    report.append(f"Prediction Consistency: {prediction_consistency} faces agree with the overall prediction")
    report.append(f"Probability: {probability:.2f}")
    report.append("Confidence Scores:")
    for i, score in enumerate(faces_pred):
        report.append(f"Face {i + 1}: {'fake' if score > 0.5 else 'real'}, Confidence: {score:.4f}")
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
    image_path = r"D:/SAVANA_API/AI/setup/deepfake/images/img.png"
    if not os.path.exists(image_path):
        print("Error: Provided image path does not exist.")
        sys.exit(1)

    # Perform the prediction
    prediction, probability, faces_pred = image_pred(image_path, model='EfficientNetB4')

    # Print the prediction result
    print(f"The given image is {prediction} ")

    # Generate and save the summary report
    generate_summary_report(image_path, prediction, probability, faces_pred)

    # Save the image with the prediction text
    print("Image with the prediction text has been saved.")
