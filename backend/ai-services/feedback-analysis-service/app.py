from fastapi import FastAPI

app = FastAPI(title="Feedback Analysis Service", version="1.0")

@app.get("/")
def root():
    return {"service": "feedback-analysis", "status": "running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "feedback-analysis"}