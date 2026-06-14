import os
import sys

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

import tensorflow as tf

MODEL_DIR = os.path.join("model", "resnet50_final.keras")
CONFIG_PATH = os.path.join(MODEL_DIR, "config.json")
WEIGHTS_PATH = os.path.join(MODEL_DIR, "model.weights.h5")

print(f"TensorFlow version: {tf.__version__}")
print(f"Model directory: {MODEL_DIR}")
print(f"  config.json exists: {os.path.isfile(CONFIG_PATH)}")
print(f"  model.weights.h5 exists: {os.path.isfile(WEIGHTS_PATH)}")

model = None

# Approach 1: Keras 3 native load (folder is extracted .keras archive)
print("\n--- Attempt 1: keras.models.load_model() on folder ---")
try:
    model = tf.keras.models.load_model(MODEL_DIR)
    print("SUCCESS: Model loaded via load_model()")
except Exception as e:
    print(f"FAILED: {e}")

# Approach 2: Rebuild from config.json + weights (Keras 3 format)
if model is None:
    print("\n--- Attempt 2: model_from_json(config.json) + load_weights() ---")
    try:
        import json

        with open(CONFIG_PATH, "r") as f:
            config = json.load(f)

        model = tf.keras.models.model_from_json(json.dumps(config))
        model.load_weights(WEIGHTS_PATH)
        print("SUCCESS: Model rebuilt from config.json + weights")
    except Exception as e:
        print(f"FAILED: {e}")

if model is None:
    print("\nModel could NOT be loaded.")
    sys.exit(1)

model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
print("\nModel loaded successfully!")
model.summary()
