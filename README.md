> Live at: https://eco-classify-delta.vercel.app


Eco-Classiffy--->

An AI-powered waste classification platform that helps people figure out how to properly dispose of and recycle their waste. Upload a photo or describe an item in text, and it tells you the category, how to dispose of it, and what its environmental impact looks like.

Built with React + Tailwind on the frontend, Flask on the backend, MongoDB for storage, and PyTorch for the image classification model.

## What it does

- Upload an image of waste and get it classified into one of 6 categories: plastic, paper, glass, metal, organic, or e-waste
- Type a description instead (e.g. "broken phone charger") and get the same classification
- **See the environmental impact** of everything you've classified — carbon saved, energy saved, waste diverted
- **Find nearby recycling centers** based on category and location
- **Learn page** with quick reference info on how to handle each waste category

## Tech stack

**Frontend**: 
React
Tailwind CSS
Vite
**Backend**:
Flask (Python)
REST APIs
**Database**:
MongoDB
**ML**:
PyTorch
MobileNetV2 (pretrained on ImageNet, used as a transfer-learning backbone for image classification)

## Project structure

''
eco-classify
├── frontend--->        React + Tailwind SPA
│   └── src/
│       ├── components/   Navbar, ResultCard
│       └── pages/        Classify, Impact, Learn
├── backend-->
│   ├── app.py            Flask entrypoint
│   ├── apis/              4 blueprint route files
│   ├── models/            4 ML/heuristic models
│   └── database/db.py    MongoDB connection layer
''

## API endpoints

| Method | Endpoint | What it does |
|---|---|---|
| POST | `/predict-image` | Classify a waste image |
| POST | `/predict-text` | Classify a text description |
| GET | `/impact` | Get aggregated environmental impact stats |


## What's next

- Fine-tune the image model on a real waste dataset
- Add user accounts so impact stats are personalized
- Deploy the backend and frontend properly (Render/Vercel/Atlas)
- Add tests
