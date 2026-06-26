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
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Loading metrics...
        </div>
      </div>
    );
  }

  const precisionRecallData = Object.entries(metrics.per_category).map(([cat, v]) => ({
    category: cat,
    precision: Math.round((v.precision ?? 0) * 100),
    recall: Math.round((v.recall ?? 0) * 100),
  }));

  const radarData = Object.entries(metrics.per_category).map(([cat, v]) => ({
    category: cat,
    score: Math.round((v.recall ?? 0) * 100),
  }));

  return (
    <div className="text-white">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <div>
          <div className="text-xs text-accent uppercase tracking-widest mb-3">Analytics</div>
          <h1 className="text-3xl font-bold mb-2">Model performance</h1>
          <p className="text-white/50 text-sm">
            Real evaluation results from running the {metrics.model} against a {metrics.test_set_size}-item hand-labeled test set.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="border border-white/10 rounded-lg p-6 bg-surface col-span-1">
            <div className="text-4xl font-bold text-accent">{(metrics.accuracy * 100).toFixed(1)}%</div>
            <div className="text-sm text-white/50 mt-1">Overall accuracy</div>
            <div className="text-xs text-white/30 mt-1">{metrics.test_set_size} test examples</div>
          </div>
          <div className="border border-white/10 rounded-lg p-6 bg-surface">
            <div className="text-4xl font-bold text-cyan-400">6</div>
            <div className="text-sm text-white/50 mt-1">Waste categories</div>
            <div className="text-xs text-white/30 mt-1">plastic, paper, glass, metal, organic, e-waste</div>
          </div>
          <div className="border border-white/10 rounded-lg p-6 bg-surface">
            <div className="text-4xl font-bold text-amber-400">25</div>
            <div className="text-sm text-white/50 mt-1">Test examples</div>
            <div className="text-xs text-white/30 mt-1">hand-labeled ground truth</div>
          </div>
        </div>

        <div className="border border-white/10 rounded-lg p-6 bg-surface">
          <div className="text-sm font-semibold mb-1">Precision & recall by category</div>
          <div className="text-xs text-white/40 mb-6">Higher is better — precision measures accuracy of positive predictions, recall measures coverage</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={precisionRecallData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="category" stroke="#ffffff40" fontSize={11} />
              <YAxis stroke="#ffffff40" fontSize={11} domain={[0, 100]} unit="%" />
              <Tooltip
                contentStyle={{ background: "#101714", border: "1px solid #ffffff15", borderRadius: 8 }}
                formatter={(v) => `${v}%`}
              />
              <Legend />
              <Bar dataKey="precision" name="Precision" fill="#39e58c" radius={[4, 4, 0, 0]} />
              <Bar dataKey="recall" name="Recall" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-white/10 rounded-lg p-6 bg-surface">
          <div className="text-sm font-semibold mb-1">Recall profile</div>
          <div className="text-xs text-white/40 mb-6">How well the model covers each category — gaps show where it misses most</div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#ffffff15" />
              <PolarAngleAxis dataKey="category" stroke="#ffffff50" fontSize={11} />
              <PolarRadiusAxis domain={[0, 100]} stroke="#ffffff20" fontSize={10} unit="%" />
              <Radar dataKey="score" name="Recall" stroke="#39e58c" fill="#39e58c" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
