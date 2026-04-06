from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"service": "event-generator", "status": "running"}