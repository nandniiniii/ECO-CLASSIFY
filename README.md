#  Eco-Classify

I built this because I was tired of standing in front of my trash cans holding a broken phone charger, having zero idea which bin it belonged in. Eco-Classify is my attempt at fixing that — snap a photo or just type what the item is, and it tells you what category it falls under, how to actually get rid of it, and roughly what impact that has environmentally.

🔗 **Live:** [eco-classify-delta.vercel.app](https://eco-classify-delta.vercel.app)

---

## So what does it actually do?

- **Snap a pic** of whatever you're trying to throw away and it'll sort it into one of 6 buckets: plastic, paper, glass, metal, organic, or e-waste
- Don't feel like taking a photo? Just type it out — "broken phone charger," "banana peel," whatever — and it'll classify that too
- There's an **impact tracker** that adds up the carbon saved, energy saved, and waste diverted across everything you've classified so far
- It'll point you toward **recycling centers near you** depending on the category
- A **Learn page** if you just want the cheat-sheet version of how to deal with each type of waste

## Why these tools

Nothing fancy here, just stuff that made sense for the problem:

- **Frontend** — React + Tailwind, built with Vite because I didn't want to wait around for slow builds
- **Backend** — Flask, kept it simple with REST endpoints
- **Database** — MongoDB for storing classification history and impact stats
- **ML** — PyTorch, using MobileNetV2 pretrained on ImageNet as the backbone and fine-tuning on top of that for the actual waste categories

## How it's laid out

```
eco-classify
├── frontend/              React + Tailwind SPA
│   └── src/
│       ├── components/    Navbar, ResultCard
│       └── pages/         Classify, Impact, Learn
├── backend/
│   ├── app.py             Flask entrypoint
│   ├── apis/              4 blueprint route files
│   ├── models/            4 ML/heuristic models
│   └── database/
│       └── db.py          MongoDB connection layer
```

## API endpoints, if you're poking around

| Method | Endpoint | What it does |
|---|---|---|
| `POST` | `/predict-image` | Classify a waste image |
| `POST` | `/predict-text` | Classify a text description |
| `GET` | `/impact` | Pull aggregated environmental impact stats |


## What I still want to fix / add

Honestly this is more of a working prototype than a finished product. Things on my list:

- [ ] Fine-tune the model on an actual waste dataset instead of leaning entirely on ImageNet transfer learning
- [ ] Add real user accounts so the impact stats mean something over time instead of resetting per session
- [ ] Write actual tests (I know, I know)

If you find bugs or have ideas, feel free to open an issue — this is still very much a work in progress.

