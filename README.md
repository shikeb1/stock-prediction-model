Nsh Nin, [05-03-2026 16:02]
# 📈 Stock Prediction Portal

> A full-stack AI-powered stock prediction web application using LSTM deep learning, Django REST Framework, and React — complete with JWT authentication and interactive chart visualizations.

Built with ❤️ by Shikeb Malik

-----

## 🗂️ Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Local Development Setup](#-local-development-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [DevOps — Docker & Docker Compose](#-devops--docker--docker-compose)
- [CI/CD — GitHub Actions Pipeline](#-cicd--github-actions-pipeline)
- [DevSecOps — Security Tools & Scanning](#-devsecops--security-tools--scanning)
- [MLOps — Model Versioning & Serving](#-mlops--model-versioning--serving)
- [MLSecOps — Securing the ML Pipeline](#-mlsecops--securing-the-ml-pipeline)
- [Cloud Deployment — AWS / GCP / Azure](#-cloud-deployment--aws--gcp--azure)
- [Monitoring & Observability](#-monitoring--observability)
- [Contributing](#-contributing)

-----

## 🔍 Project Overview

This portal lets authenticated users enter any stock ticker (e.g. AAPL, GOOGL, `TSLA`) and get back:

- 📊 Historical closing price chart
- 📉 100-day & 200-day Moving Average charts
- 🤖 LSTM model price predictions vs actual prices
- 📐 Model evaluation metrics: MSE, RMSE, R² Score

The ML model is a pre-trained LSTM (Long Short-Term Memory) neural network trained on 10 years of stock data fetched from Yahoo Finance.

-----

## 🛠️ Tech Stack

|Layer   |Technology                                         |
|--------|---------------------------------------------------|
|Frontend|React 19, Vite, Bootstrap 5, Axios, React Router v7|
|Backend |Django 6, Django REST Framework, SimpleJWT         |
|ML / AI |Keras (TensorFlow), LSTM, scikit-learn, yfinance   |
|Database|SQLite (dev) / PostgreSQL (prod)                   |
|Auth    |JWT Access + Refresh Tokens                        |
|Plots   |Matplotlib                                         |

-----

## 📁 Project Structure
stock-prediction-model/
│
├── backend-drf/                    # Django backend
│   ├── accounts/                   # User registration & auth views
│   ├── api/                        # Stock prediction API
│   │   ├── views.py                # Core prediction logic
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── utils.py                # Plot saving helper
│   ├── stock_prediction_main/      # Django project settings
│   │   ├── settings.py
│   │   └── urls.py
│   ├── manage.py
│   └── .env                        # Environment variables (never commit!)
│
├── frontend-react/                 # React frontend
│   ├── src/
│   │   ├── components/             # Login, Register, Dashboard, Header
│   │   ├── AuthProvider.jsx        # JWT token context
│   │   ├── axiosinstance.js        # Axios with JWT interceptor
│   │   ├── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   └── package.json
│
└── resources/                      # ML model & data
    ├── stock_prediction_model.keras # Pre-trained LSTM model
    ├── stock_prediction_using_LSTM.ipynb
    └── call_activity.csv

-----

## 💻 Local Development Setup

### Prerequisites

Make sure you have these installed:

- Python 3.10+
- Node.js 18+
- npm or yarn
- Git

-----

### Step 1 — Clone the Repository
git clone https://github.com/your-username/stock-prediction-model.git
cd stock-prediction-model

-----

### Step 2 — Backend Setup (Django)
# Go into backend folder
cd backend-drf

# Create a virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install all dependencies
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers python-decouple yfinance pandas numpy matplotlib scikit-learn keras tensorflow

-----

### Step 3 — Create Your .env File

Inside backend-drf/, create a file named .env:
SECRET_KEY=your-very-secret-django-key-here
DEBUG=True

Nsh Nin, [05-03-2026 16:02]
To generate a Django secret key, run this in Python:
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())

-----

### Step 4 — Run Django Migrations & Start Server
# Still inside backend-drf/ with venv activated
python manage.py migrate
python manage.py runserver

Backend is now running at: http://localhost:8000

-----

### Step 5 — Frontend Setup (React)

Open a new terminal:
cd frontend-react
npm install
npm run dev

Frontend is now running at: http://localhost:5173

-----

### Step 6 — Test It

1. Open http://localhost:5173
1. Click Register and create an account
1. Log in
1. Enter a stock ticker like AAPL and click See Prediction
1. Charts and metrics will appear 🎉

-----

## 🔐 Environment Variables

|Variable    |Description                      |Example                    |
|------------|---------------------------------|---------------------------|
|`SECRET_KEY`|Django secret key                |`django-insecure-abc123...`|
|`DEBUG`     |Debug mode (False in production!)|`True` or False          |


> ⚠️ Never push your `.env` file to GitHub. It’s already in .gitignore.

-----

## 📡 API Reference

All API routes are prefixed with /api/v1/

|Method|Endpoint                 |Auth Required|Description                        |
|------|-------------------------|-------------|-----------------------------------|
|POST  |`/api/v1/register/`      |❌            |Register new user                  |
|POST  |`/api/v1/token/`         |❌            |Login — get access + refresh tokens|
|POST  |`/api/v1/token/refresh/` |❌            |Refresh access token               |
|GET   |`/api/v1/protected-view/`|✅ JWT        |Test protected route               |
|POST  |`/api/v1/predict/`       |✅ JWT        |Run stock prediction               |

### Example: Login
curl -X POST http://localhost:8000/api/v1/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "youruser", "password": "yourpass"}'

### Example: Predict
curl -X POST http://localhost:8000/api/v1/predict/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ticker": "AAPL"}'

-----

## 🐳 DevOps — Docker & Docker Compose

Containerizing the app makes it run the same on every machine and server.

### Step 1 — Create backend-drf/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir django djangorestframework djangorestframework-simplejwt \
    django-cors-headers python-decouple yfinance pandas numpy matplotlib \
    scikit-learn keras tensorflow gunicorn

RUN python manage.py collectstatic --noinput || true

EXPOSE 8000

CMD ["gunicorn", "stock_prediction_main.wsgi:application", "--bind", "0.0.0.0:8000"]

### Step 2 — Create frontend-react/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

### Step 3 — Create docker-compose.yml at project root
version: '3.9'

services:
  backend:
    build: ./backend-drf
    ports:
      - "8000:8000"
    env_file:
      - ./backend-drf/.env
    volumes:
      - ./resources:/app/../resources
      - media_data:/app/media
    depends_on:
      - db

  frontend:
    build: ./frontend-react
    ports:
      - "80:80"
    depends_on:
      - backend

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: stockdb
      POSTGRES_USER: stockuser
      POSTGRES_PASSWORD: stockpassword
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
  media_data:

### Step 4 — Run with Docker Compose
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop everything
docker-compose down

App is now at http://localhost (frontend) and http://localhost:8000 (backend).

-----

## 🔄 CI/CD — GitHub Actions Pipeline

This automates testing and deployment on every push to main.

Create .github/workflows/ci-cd.yml:
name: CI/CD Pipeline

on:
  push:

Nsh Nin, [05-03-2026 16:02]
branches: [main]
  pull_request:
    branches: [main]

jobs:
  # ─── 1. Backend Tests ───────────────────────────────────────────
  backend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          cd backend-drf
          pip install django djangorestframework djangorestframework-simplejwt \
            django-cors-headers python-decouple yfinance pandas numpy \
            matplotlib scikit-learn keras tensorflow

      - name: Run Django tests
        env:
          SECRET_KEY: test-secret-key-for-ci
          DEBUG: True
        run: |
          cd backend-drf
          python manage.py test

  # ─── 2. Frontend Tests & Build ──────────────────────────────────
  frontend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install & Build
        run: |
          cd frontend-react
          npm install
          npm run build

  # ─── 3. Build & Push Docker Images ─────────────────────────────
  docker-build:
    runs-on: ubuntu-latest
    needs: [backend-test, frontend-test]
    steps:
      - uses: actions/checkout@v4

      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build & Push Backend
        run: |
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/stock-backend:latest ./backend-drf
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/stock-backend:latest

      - name: Build & Push Frontend
        run: |
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/stock-frontend:latest ./frontend-react
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/stock-frontend:latest

  # ─── 4. Deploy to Server ────────────────────────────────────────
  deploy:
    runs-on: ubuntu-latest
    needs: docker-build
    steps:
      - name: SSH Deploy
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/stock-prediction
            docker-compose pull
            docker-compose up -d

### GitHub Secrets to Add

Go to your repo → Settings → Secrets → Actions → New secret:

|Secret Name         |Value                       |
|--------------------|----------------------------|
|`DOCKERHUB_USERNAME`|Your Docker Hub username    |
|`DOCKERHUB_TOKEN`   |Docker Hub access token     |
|`SERVER_IP`         |Your VPS/server IP          |
|`SERVER_USER`       |SSH username (e.g. `ubuntu`)|
|`SSH_PRIVATE_KEY`   |Your private SSH key content|

-----

## 🔒 DevSecOps — Security Tools & Scanning

Security must be baked into every stage of the pipeline, not added at the end.

### 1. Secret Scanning — TruffleHog / GitLeaks

Prevents you from accidentally pushing API keys or passwords.
# Install GitLeaks
brew install gitleaks   # Mac
# or download from https://github.com/gitleaks/gitleaks/releases

# Scan your repo for secrets
gitleaks detect --source . --verbose

Add to GitHub Actions:
- name: Secret Scanning with GitLeaks
  uses: gitleaks/gitleaks-action@v2
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

-----

### 2. Dependency Vulnerability Scanning — Safety & npm audit
# Python — check for known vulnerable packages
pip install safety
safety check

# Node — check frontend dependencies
cd frontend-react
npm audit
npm audit fix

Add to CI:
- name: Python Dependency Scan
  run: |
    pip install safety
    cd backend-drf
    safety check

- name: Node Dependency Audit
  run: |
    cd frontend-react
    npm audit --audit-level=high

-----

### 3. Static Application Security Testing (SAST) — Bandit

Nsh Nin, [05-03-2026 16:02]
Scans your Python code for security issues like SQL injection, hardcoded passwords, etc.
pip install bandit
bandit -r backend-drf/ -ll

-----

### 4. Docker Image Scanning — Trivy

Scans Docker images for known OS and package vulnerabilities.
# Install Trivy
brew install aquasecurity/trivy/trivy   # Mac
# or: https://github.com/aquasecurity/trivy

# Scan your image
trivy image your-dockerhub-username/stock-backend:latest

Add to CI after docker build:
- name: Scan Docker Image with Trivy
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'your-username/stock-backend:latest'
    severity: 'CRITICAL,HIGH'
    exit-code: '1'

-----

### 5. OWASP Dependency Check
# Run OWASP dependency check
docker run --rm \
  -v $(pwd):/src \
  owasp/dependency-check \
  --scan /src --format HTML --out /src/report

-----

### 6. Production Django Security Checklist

Update settings.py for production:
# settings.py (production)
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']

# HTTPS settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True

# Switch to PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': '5432',
    }
}

-----

## 🤖 MLOps — Model Versioning & Serving

MLOps ensures your ML model is versioned, tracked, and deployed reliably.

### 1. Track Experiments — MLflow

MLflow lets you log metrics, parameters, and model versions.
pip install mlflow

In your Jupyter notebook (`stock_prediction_using_LSTM.ipynb`), add:
import mlflow
import mlflow.keras

mlflow.set_experiment("stock-prediction-lstm")

with mlflow.start_run():
    # Log hyperparameters
    mlflow.log_param("epochs", 50)
    mlflow.log_param("batch_size", 32)
    mlflow.log_param("lstm_units", 50)
    mlflow.log_param("lookback_days", 100)

    # Train your model
    model.fit(x_train, y_train, epochs=50, batch_size=32)

    # Log metrics
    mlflow.log_metric("mse", mse)
    mlflow.log_metric("rmse", rmse)
    mlflow.log_metric("r2", r2)

    # Save model with MLflow
    mlflow.keras.log_model(model, "lstm-stock-model")

Start the MLflow UI:
mlflow ui
# Open http://localhost:5000 to see all experiment runs

-----

### 2. Data Versioning — DVC (Data Version Control)

DVC tracks your large model files and datasets with Git.
pip install dvc

# Initialize DVC in your repo
dvc init

# Track the model file
dvc add resources/stock_prediction_model.keras

# Push to remote storage (e.g. Google Drive or S3)
dvc remote add -d myremote gdrive://your-gdrive-folder-id
dvc push

# Commit the .dvc file (lightweight pointer) to Git
git add resources/stock_prediction_model.keras.dvc .gitignore
git commit -m "Track model with DVC"

Now the heavy .keras file lives in remote storage, but Git tracks what version it is.

-----

### 3. Automated Retraining Pipeline

Create retrain.py in your resources/ folder:
# resources/retrain.py
import yfinance as yf
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout
from datetime import datetime
import mlflow
import mlflow.keras

TICKERS = ['AAPL', 'GOOGL', 'MSFT', 'TSLA']

def retrain():
    mlflow.set_experiment("stock-lstm-retrain")
    with mlflow.start_run():
        all_data = []
        for ticker in TICKERS:
            now = datetime.now()
            start = datetime(now.year - 10, now.month, now.day)
            df = yf.download(ticker, start, now)
            all_data.append(df['Close'].values)

        # Combine all ticker data
        data = np.concatenate(all_data)
        scaler = MinMaxScaler()
        data_scaled = scaler.fit_transform(data.reshape(-1, 1))

        x, y = [], []

Nsh Nin, [05-03-2026 16:02]
for i in range(100, len(data_scaled)):
            x.append(data_scaled[i-100:i])
            y.append(data_scaled[i])
        x, y = np.array(x), np.array(y)

        # Build LSTM model
        model = Sequential([
            LSTM(50, return_sequences=True, input_shape=(100, 1)),
            Dropout(0.2),
            LSTM(50, return_sequences=False),
            Dropout(0.2),
            Dense(1)
        ])
        model.compile(optimizer='adam', loss='mean_squared_error')
        model.fit(x, y, epochs=50, batch_size=32)

        # Save model
        model.save('../resources/stock_prediction_model.keras')
        mlflow.keras.log_model(model, "lstm-retrained")
        print("Retraining complete!")

if __name__ == "__main__":
    retrain()

Schedule it monthly via cron (on your server):
# Open crontab
crontab -e

# Add this line to retrain every 1st of the month at 2am
0 2 1 * * /path/to/venv/bin/python /opt/stock-prediction/resources/retrain.py >> /var/log/retrain.log 2>&1

-----

### 4. Model Registry — MLflow Model Registry

After logging models with MLflow, register the best one:
# Register model programmatically
import mlflow

client = mlflow.MlflowClient()

# Register
result = mlflow.register_model(
    "runs:/YOUR_RUN_ID/lstm-stock-model",
    "StockPredictionLSTM"
)

# Promote to production stage
client.transition_model_version_stage(
    name="StockPredictionLSTM",
    version=result.version,
    stage="Production"
)

-----

### 5. Model Monitoring — Evidently AI

Track model drift — detect when predictions start getting worse over time.
pip install evidently
from evidently.report import Report
from evidently.metric_preset import RegressionPreset
import pandas as pd

# Reference = old predictions, current = new predictions
reference = pd.DataFrame({'target': y_test_old, 'prediction': y_pred_old})
current   = pd.DataFrame({'target': y_test_new, 'prediction': y_pred_new})

report = Report(metrics=[RegressionPreset()])
report.run(reference_data=reference, current_data=current)
report.save_html("model_drift_report.html")

-----

## 🛡️ MLSecOps — Securing the ML Pipeline

MLSecOps = applying security practices specifically to the machine learning lifecycle.

### 1. Input Validation — Never Trust User Ticker Input

In backend-drf/api/serializers.py, make sure validation is strict:
from rest_framework import serializers
import re

class StockPredictionSerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=10)

    def validate_ticker(self, value):
        # Only allow alphanumeric uppercase ticker symbols
        value = value.upper().strip()
        if not re.match(r'^[A-Z]{1,10}$', value):
            raise serializers.ValidationError("Invalid ticker symbol.")
        return value

-----

### 2. Protect the Model File

Never expose your .keras file through the API. Make sure media serving is restricted:
# settings.py — media files should not serve .keras files
# Serve media ONLY in development — use S3 or CDN in production

Store the model in an environment variable path in production:
# views.py
model_path = config('MODEL_PATH', default=os.path.join(settings.BASE_DIR.parent, 'resources', 'stock_prediction_model.keras'))
model = load_model(model_path)

-----

### 3. Adversarial Input Detection

Add a sanity check so attackers can’t send garbage ticker data to crash the model:
# In views.py, after yfinance download
if df.empty or len(df) < 150:
    return Response(
        {"error": "Not enough data to make a prediction for this ticker."},
        status=status.HTTP_400_BAD_REQUEST
    )

-----

### 4. Rate Limiting — Prevent Model Abuse

Install Django REST Framework throttling:
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'user': '10/hour',   # Max 10 predictions per user per hour
    }
}

-----

### 5. Model Integrity Check

Verify the model file hasn’t been tampered with before loading:
import hashlib

EXPECTED_MODEL_HASH = "paste_your_sha256_hash_here"

Nsh Nin, [05-03-2026 16:02]
def verify_model(path):
    sha256 = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(8192), b''):
            sha256.update(chunk)
    actual = sha256.hexdigest()
    if actual != EXPECTED_MODEL_HASH:
        raise RuntimeError("Model file integrity check failed! Possible tampering detected.")

# Generate your hash once:
# python -c "import hashlib; print(hashlib.sha256(open('resources/stock_prediction_model.keras','rb').read()).hexdigest())"

-----

## ☁️ Cloud Deployment — AWS / GCP / Azure

### Option A — Deploy on AWS EC2 (Easiest for Beginners)
# 1. Launch Ubuntu 22.04 EC2 instance (t2.medium recommended for ML)
# 2. SSH into it
ssh -i your-key.pem ubuntu@your-ec2-ip

# 3. Install Docker
sudo apt update
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker ubuntu

# 4. Clone your repo
git clone https://github.com/your-username/stock-prediction-model.git
cd stock-prediction-model

# 5. Create .env file
nano backend-drf/.env
# Paste your SECRET_KEY and DEBUG=False

# 6. Run
docker-compose up -d --build

# 7. App is now live at http://your-ec2-ip

-----

### Option B — Kubernetes (Advanced)

Create k8s/backend-deployment.yaml:
apiVersion: apps/v1
kind: Deployment
metadata:
  name: stock-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: stock-backend
  template:
    metadata:
      labels:
        app: stock-backend
    spec:
      containers:
      - name: backend
        image: your-username/stock-backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: SECRET_KEY
          valueFrom:
            secretKeyRef:
              name: stock-secrets
              key: SECRET_KEY
        - name: DEBUG
          value: "False"
---
apiVersion: v1
kind: Service
metadata:
  name: stock-backend-service
spec:
  selector:
    app: stock-backend
  ports:
  - port: 80
    targetPort: 8000
  type: LoadBalancer

Apply it:
kubectl apply -f k8s/
kubectl get pods
kubectl get services

-----

### Option C — Nginx Reverse Proxy (Production VPS)

Install and configure Nginx as a reverse proxy in front of Gunicorn:
# /etc/nginx/sites-available/stock-prediction
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /media/ {
        alias /opt/stock-prediction/backend-drf/media/;
    }

    location /static/ {
        alias /opt/stock-prediction/backend-drf/staticfiles/;
    }
}

Enable it:
sudo ln -s /etc/nginx/sites-available/stock-prediction /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Add HTTPS (free SSL with Let's Encrypt)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com

-----

## 📊 Monitoring & Observability

### 1. Application Monitoring — Sentry

Catch real-time errors from both frontend and backend.
pip install sentry-sdk
# settings.py
import sentry_sdk
sentry_sdk.init(
    dsn=config('SENTRY_DSN'),
    traces_sample_rate=1.0,
)

For React frontend:
npm install @sentry/react
// main.jsx
import * as Sentry from "@sentry/react";
Sentry.init({ dsn: "your-sentry-dsn" });

-----

### 2. Metrics & Dashboards — Prometheus + Grafana
# Add to docker-compose.yml
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"

-----

### 3. Log Management — ELK Stack
# Add to docker-compose.yml
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.10.0
    environment:
      - discovery.type=single-node

  kibana:
    image: docker.elastic.co/kibana/kibana:8.10.0
    ports:
      - "5601:5601"

-----

## 🤝 Contributing

1. Fork the repo
1. Create a feature branch: git checkout -b feature/amazing-feature
1. Commit your changes: git commit -m 'Add amazing feature'
1. Push: git push origin feature/amazing-feature
1. Open a Pull Request

-----

Nsh Nin, [05-03-2026 16:02]
## 📄 License

This project is open source and available under the [MIT License](LICENSE).

-----

> Built with ❤️ by Shikeb Malik — *From raat 2 baje to production! 🚀*
