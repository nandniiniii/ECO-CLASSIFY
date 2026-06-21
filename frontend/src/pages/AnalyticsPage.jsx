import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
} from "recharts";
import { getMetrics } from "../api.js";

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getMetrics().then(setMetrics).catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <p className="text-red-400 text-sm">{error}</p>
        <p className="text-white/50 text-xs mt-2">
          Run <code className="text-accent">python evaluation/evaluate.py</code> in the backend folder to generate metrics.
        </p>
      </div>
    );
  }

  if (!metrics) {
    return <div className="max-w-3xl mx-auto px-6 py-10 text-white/50 text-sm">Loading metrics...</div>;
  }

  const precisionRecallData = Object.entries(metrics.per_category).map(([cat, v]) => ({
    category: cat,
    precision: v.precision ?? 0,
    recall: v.recall ?? 0,
  }));

  const radarData = Object.entries(metrics.per_category).map(([cat, v]) => ({
    category: cat,
    score: v.recall ?? 0,
  }));

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Model analytics</h1>
        <p className="text-white/50 text-sm mt-1">
          Real evaluation results from running {metrics.model} against a {metrics.test_set_size}-item hand-labeled test set.
        </p>
      </div>

      <div className="border border-white/10 rounded-lg p-6 bg-surface flex items-center gap-6">
        <div className="text-4xl font-bold text-accent">{(metrics.accuracy * 100).toFixed(1)}%</div>
        <div>
          <div className="text-sm text-white/70">Overall accuracy</div>
          <div className="text-xs text-white/40">{metrics.test_set_size} labeled test examples</div>
        </div>
      </div>

      <div className="border border-white/10 rounded-lg p-6 bg-surface">
        <div className="text-sm text-white/60 mb-4">Precision &amp; recall by category</div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={precisionRecallData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
            <XAxis dataKey="category" stroke="#ffffff60" fontSize={12} />
            <YAxis stroke="#ffffff60" fontSize={12} domain={[0, 1]} />
            <Tooltip contentStyle={{ background: "#101714", border: "1px solid #ffffff20" }} />
            <Legend />
            <Bar dataKey="precision" fill="#39e58c" radius={[4, 4, 0, 0]} />
            <Bar dataKey="recall" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-white/10 rounded-lg p-6 bg-surface">
        <div className="text-sm text-white/60 mb-4">Recall profile across categories</div>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#ffffff20" />
            <PolarAngleAxis dataKey="category" stroke="#ffffff60" fontSize={12} />
            <PolarRadiusAxis domain={[0, 1]} stroke="#ffffff30" />
            <Radar dataKey="score" stroke="#39e58c" fill="#39e58c" fillOpacity={0.35} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-white/40">
        Note: the text classifier is a rule-based keyword scorer, not a trained neural network -
        these metrics measure how well its keyword rules generalize to held-out test phrases.
      </p>
    </div>
  );
}
