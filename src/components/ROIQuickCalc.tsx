"use client";
import { useMemo, useState } from 'react';
import { ROI_DEFAULTS } from '@/lib/constants';

export default function ROIQuickCalc() {
  const [leads, setLeads] = useState<number>(ROI_DEFAULTS.leadsPerMonth);
  const [baseline, setBaseline] = useState<number>(ROI_DEFAULTS.baselineConv);
  const [improved, setImproved] = useState<number>(ROI_DEFAULTS.improvedConv);
  const [aov, setAov] = useState<number>(ROI_DEFAULTS.avgOrderValue);
  const [cost, setCost] = useState<number>(ROI_DEFAULTS.monthlyCost);

  const results = useMemo(() => {
    const baseRev = leads * baseline * aov;
    const newRev = leads * improved * aov;
    const uplift = newRev - baseRev;
    const roi = cost > 0 ? (newRev - baseRev - cost) / cost : 0;
    const payback = uplift > 0 ? Math.max(0, Math.ceil(cost / uplift)) : Infinity;
    return { baseRev, newRev, uplift, roi, payback };
  }, [leads, baseline, improved, aov, cost]);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold">Quick ROI</h3>
      <div className="mt-4 grid md:grid-cols-5 gap-3 text-sm">
        <label className="flex flex-col">Leads/mo<input className="mt-1 bg-white/10 rounded px-2 py-1" type="number" value={leads} onChange={e => setLeads(Number(e.target.value))} /></label>
        <label className="flex flex-col">Baseline conv<input className="mt-1 bg-white/10 rounded px-2 py-1" type="number" step="0.001" value={baseline} onChange={e => setBaseline(Number(e.target.value))} /></label>
        <label className="flex flex-col">Improved conv<input className="mt-1 bg-white/10 rounded px-2 py-1" type="number" step="0.001" value={improved} onChange={e => setImproved(Number(e.target.value))} /></label>
        <label className="flex flex-col">Avg order<input className="mt-1 bg-white/10 rounded px-2 py-1" type="number" value={aov} onChange={e => setAov(Number(e.target.value))} /></label>
        <label className="flex flex-col">Monthly cost<input className="mt-1 bg-white/10 rounded px-2 py-1" type="number" value={cost} onChange={e => setCost(Number(e.target.value))} /></label>
      </div>
      <div className="mt-4 grid md:grid-cols-3 gap-3">
        <div className="card"><div className="text-white/60 text-xs">Baseline monthly revenue</div><div className="text-xl font-bold">${results.baseRev.toFixed(0)}</div></div>
        <div className="card"><div className="text-white/60 text-xs">With AI monthly revenue</div><div className="text-xl font-bold">${results.newRev.toFixed(0)}</div></div>
        <div className="card"><div className="text-white/60 text-xs">Monthly uplift</div><div className="text-xl font-bold">${results.uplift.toFixed(0)}</div></div>
      </div>
      <div className="mt-3 text-white/80 text-sm">ROI: {(results.roi * 100).toFixed(0)}% · Payback: {Number.isFinite(results.payback) ? `${results.payback} mo` : 'N/A'}</div>
    </div>
  );
}

