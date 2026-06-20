const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function predictImage(file) {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${BASE_URL}/predict-image`, { method: "POST", body: form });
  if (!res.ok) throw new Error((await res.json()).error || "Image prediction failed");
  return res.json();
}

export async function predictText(description) {
  const res = await fetch(`${BASE_URL}/predict-text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Text prediction failed");
  return res.json();
}

export async function getImpact() {
  const res = await fetch(`${BASE_URL}/impact`);
  if (!res.ok) throw new Error("Failed to fetch impact data");
  return res.json();
}

export async function getCenters(lat, lng, category) {
  const params = new URLSearchParams();
  if (lat) params.set("lat", lat);
  if (lng) params.set("lng", lng);
  if (category) params.set("category", category);
  const res = await fetch(`${BASE_URL}/centers?${params.toString()}`);
  if (!res.ok) throw new Error((await res.json()).error || "Failed to fetch centers");
  return res.json();
}
