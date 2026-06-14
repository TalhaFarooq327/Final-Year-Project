from fastapi.testclient import TestClient
import app as a
from PIL import Image
import io

client = TestClient(a.app)
img = Image.new('RGB', (224, 224), color=(255, 0, 0))
buf = io.BytesIO()
img.save(buf, format='JPEG')
content = buf.getvalue()

resp = client.post('/predict', files={'file': ('test.jpg', content, 'image/jpeg')})
print('STATUS', resp.status_code)
print('TEXT', resp.text)
print('JSON', resp.json())
