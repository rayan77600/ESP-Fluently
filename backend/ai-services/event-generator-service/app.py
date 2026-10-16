from fastapi import FastAPI

app = FastAPI(title="Event Generator Service", version="1.0")

@app.get("/")
def root():
    return {"service": "event-generator", "status": "running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "event-generator"}