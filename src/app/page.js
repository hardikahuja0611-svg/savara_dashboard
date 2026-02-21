"use client";
import React, { useState, useMemo } from 'react';

// Using the @ alias which points to the 'src' directory
import { processInsights } from '@/lib/insightsEngine';
import rawData from '@/data/teacher_data.json';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const [selectedTeacher, setSelectedTeacher] = useState('all');
  
  // Use the engine to process deduplication and stats
  const { stats, chartData, uniqueTeachers } = useMemo(() => 
    processInsights(rawData, selectedTeacher), [selectedTeacher]
  );

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-indigo-600 mb-8 tracking-tight">SAVRA</h2>
        <nav>
          <div className="bg-indigo-50 text-indigo-700 p-3 rounded-xl font-semibold shadow-sm">
            Admin Dashboard
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Principal's Overview</h1>
            <p className="text-slate-500 mt-1">Real-time teacher activity monitoring</p>
          </div>
          
          <div className="flex flex-col items-end">
            <label className="text-xs font-bold text-slate-400 uppercase mb-1 mr-2">Filter by Teacher</label>
            <select 
              className="p-2 border rounded-xl bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer min-w-[200px]"
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="all">All Teachers</option>
              {uniqueTeachers.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard label="Lessons Created" value={stats.lessons} color="bg-emerald-50" text="text-emerald-700" border="border-emerald-200" />
          <StatCard label="Quizzes Assigned" value={stats.quizzes} color="bg-blue-50" text="text-blue-700" border="border-blue-200" />
          <StatCard label="Assessments" value={stats.assessments} color="bg-orange-50" text="text-orange-700" border="border-orange-200" />
        </div>

        {/* Activity Chart */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-6 text-slate-700">Daily Activity Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="activities" 
                  stroke="#4f46e5" 
                  strokeWidth={4} 
                  dot={{r: 6, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff'}} 
                  activeDot={{r: 8}}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Bonus */}
        <div className="mt-8 p-5 bg-indigo-600 rounded-2xl text-white shadow-lg flex items-center">
          <div className="mr-4 text-2xl">💡</div>
          <div>
            <p className="font-bold">Automated Insight</p>
            <p className="text-indigo-100 text-sm">
              {stats.lessons > stats.quizzes 
                ? "Content creation is high this week. You might want to schedule more quizzes to assess student retention." 
                : "Engagement is high! Ensure teachers have enough lesson resources to support the current volume of assessments."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, color, text, border }) {
  return (
    <div className={`${color} ${border} p-8 rounded-2xl shadow-sm border`}>
      <p className={`${text} text-xs font-bold uppercase tracking-widest mb-2`}>{label}</p>
      <p className="text-4xl font-black text-slate-800">{value}</p>
    </div>
  );
}