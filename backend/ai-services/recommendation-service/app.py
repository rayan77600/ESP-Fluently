from fastapi import FastAPI

app = FastAPI(title="Recommendation Service", version="1.0")

@app.get("/")
def root():
    return {"service": "recommendation", "status": "running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "recommendation"}