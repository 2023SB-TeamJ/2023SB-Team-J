from datetime import datetime
from io import BytesIO
from .s3_utils import upload_image_to_s3
import torch
from PIL import Image
from django import db
class Models:
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model1 = torch.hub.load("bryandlee/animegan2-pytorch:main", "generator", device=device,
                            pretrained="face_paint_512_v2").eval()
    model2 = torch.hub.load("bryandlee/animegan2-pytorch:main", "generator", device=device, pretrained="paprika").eval()
    model3 = torch.hub.load("bryandlee/animegan2-pytorch:main", "generator", device=device,
                            pretrained="celeba_distill").eval()
    face2paint = torch.hub.load("bryandlee/animegan2-pytorch:main", "face2paint", device=device, side_by_side=False)

    def model1_face2paint(self, image: Image):
        width, height = image.size
        # 채널 수 확인
        channels = image.mode
        # 채널 수가 4라면 (RGBA 형식)
        if channels == "RGBA":
            # 알파 채널 제거하고 RGB 형식으로 변환
            image = image.convert("RGB")
        image = image.resize((512, 512))
        result = Models.face2paint(Models.model1, image, size=512).resize((width, height))
        with BytesIO() as file:
            result.save(file, format='JPEG')
            file.seek(0)
            key = str(datetime.now()).replace('.', '').replace(" ", "") + "." + "jpeg"
            img_url = upload_image_to_s3(file, key, ExtraArgs={'ContentType': 'image/jpeg'})
        db.connections.close_all()
        return img_url
    def model2_face2paint(self, image: Image):
        width, height = image.size
        # 채널 수 확인
        channels = image.mode
        # 채널 수가 4라면 (RGBA 형식)
        if channels == "RGBA":
            # 알파 채널 제거하고 RGB 형식으로 변환
            image = image.convert("RGB")
        image = image.resize((512, 512))
        result = Models.face2paint(Models.model2, image, size=512).resize((width, height))
        with BytesIO() as file:
            result.save(file, format='JPEG')
            file.seek(0)
            key = str(datetime.now()).replace('.', '').replace(" ", "") + "." + "jpeg"
            img_url = upload_image_to_s3(file, key, ExtraArgs={'ContentType': 'image/jpeg'})
        db.connections.close_all()
        return img_url

    def model3_face2paint(self, image: Image):
        width, height = image.size
        # 채널 수 확인
        channels = image.mode
        # 채널 수가 4라면 (RGBA 형식)
        if channels == "RGBA":
            # 알파 채널 제거하고 RGB 형식으로 변환
            image = image.convert("RGB")
        image = image.resize((512, 512))
        result = Models.face2paint(Models.model3, image, size=512).resize((width, height))
        with BytesIO() as file:
            result.save(file, format='JPEG')
            file.seek(0)
            key = str(datetime.now()).replace('.', '').replace(" ", "") + "." + "jpeg"
            img_url = upload_image_to_s3(file, key, ExtraArgs={'ContentType': 'image/jpeg'})
        db.connections.close_all()
        return img_url


model = Models()