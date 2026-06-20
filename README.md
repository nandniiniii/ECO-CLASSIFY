# Eco-Classify

AI-powered waste classification platform — React + Tailwind frontend, Flask
REST API backend, MongoDB persistence, ML-based image and text classification.

## What's real vs. what's a placeholder (read this first)

This is a fully working, runnable full-stack system — every API actually
works, the frontend actually calls them, the DB layer actually persists
data. Be upfront about this if you present it:

- **Real:** Flask REST API with 4 working endpoints, MongoDB integration,
  React SPA with routing, image classification using a real pretrained
  MobileNetV2 CNN doing real inference, rule-based text classifier,
  environmental impact aggregation pipeline.
- **Placeholder (documented in code):** the image model maps ImageNet's
  1000 general classes to our 6 waste categories via keyword lookup,
  instead of using a CNN *fine-tuned specifically on waste images*. A real
  fine-tuned model needs a labeled dataset (TrashNet is the standard
  one, ~5k images, 6 classes) and GPU training time. The architecture is
  built so swapping this in later is a single function change — see the
  docstring in `backend/models/image_classifier.py`.

This distinction is honestly your strongest interview/viva story:
"I built the full production architecture and used transfer learning as a
working baseline; here's exactly how I'd swap in a fine-tuned head."

## Project structure

```
eco-classify/
├── frontend/        React + Tailwind SPA
│   └── src/
│       ├── components/   Navbar, ResultCard
│       └── pages/        Classify, Impact, Learn
├── backend/
│   ├── app.py            Flask entrypoint
│   ├── apis/              4 blueprint route files
│   ├── models/            4 ML/heuristic models
│   └── database/db.py    MongoDB connection layer
```

## Running it

### Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
# requires a local MongoDB running on localhost:27017
# (or set MONGO_URI env var to a MongoDB Atlas connection string)
python app.py
```
Backend runs on `http://localhost:5000`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

## API reference

| Method | Endpoint | Body | Returns |
|---|---|---|---|
| POST | `/predict-image` | multipart `image` file | category, confidence, material_type, disposal_instructions, material_composition |
| POST | `/predict-text` | `{"description": "..."}` | category, recycling_method |
| GET | `/impact` | — | aggregated carbon/energy/waste totals |
| GET | `/centers` | `?lat=&lng=&category=` | nearby recycling centers, sorted by distance |

## Next steps to make this resume-gold

1. Fine-tune a real classifier on TrashNet and swap into `image_classifier.py`.
2. Add user auth so `/impact` is personalized rather than global.
3. Deploy: Render/Railway for Flask, Vercel for the frontend, MongoDB Atlas for the DB.
4. Add tests (`pytest` for backend routes, React Testing Library for frontend).
