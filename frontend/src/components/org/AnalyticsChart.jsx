import { useState, useMemo } from "react";
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const allData = {
    week: [
        { label: "Mon", volunteers: 30, hours: 120, applications: 8 },
        { label: "Tue", volunteers: 42, hours: 168, applications: 12 },
        { label: "Wed", volunteers: 38, hours: 152, applications: 7 },
        { label: "Thu", volunteers: 55, hours: 220, applications: 15 },
        { label: "Fri", volunteers: 47, hours: 188, applications: 10 },
        { label: "Sat", volunteers: 61, hours: 244, applications: 18 },
        { label: "Sun", volunteers: 35, hours: 140, applications: 6 },
    ],
    month: [
        { label: "W1", volunteers: 120, hours: 480, applications: 34 },
        { label: "W2", volunteers: 145, hours: 580, applications: 41 },
        { label: "W3", volunteers: 180, hours: 720, applications: 52 },
        { label: "W4", volunteers: 210, hours: 840, applications: 63 },
    ],
    year: [
        { label: "Jan", volunteers: 120, hours: 480, applications: 34 },
        { label: "Feb", volunteers: 145, hours: 580, applications: 41 },
        { label: "Mar", volunteers: 180, hours: 720, applications: 52 },
        { label: "Apr", volunteers: 210, hours: 840, applications: 63 },
        { label: "May", volunteers: 195, hours: 780, applications: 55 },
        { label: "Jun", volunteers: 240, hours: 960, applications: 78 },
    ],
};

const metrics = [
    { key: "volunteers", label: "Volunteers", color: "#5B3DF5" },
    { key: "hours", label: "Hours", color: "#38BDF8" },
    { key: "applications", label: "Applications", color: "#FB923C" },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-lg text-xs">
                <p className="font-bold text-gray-700 mb-2">{label}</p>
                {payload.map((p) => (
                    <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">
                        {p.name}: {p.value.toLocaleString()}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function AnalyticsChart() {
    const [activeMetric, setActiveMetric] = useState("volunteers");
    const [timeRange, setTimeRange] = useState("month");

    const data = useMemo(() => allData[timeRange], [timeRange]);
    const metric = metrics.find((m) => m.key === activeMetric);

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-extrabold text-gray-900">Volunteer Engagement</h2>
                <div className="flex items-center gap-2 flex-wrap">
                    {/* Metric Toggles */}
                    <div className="flex bg-gray-100 rounded-xl p-1 gap-0.5">
                        {metrics.map((m) => (
                            <button
                                key={m.key}
                                onClick={() => setActiveMetric(m.key)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeMetric === m.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                    {/* Time Range */}
                    <div className="flex bg-gray-100 rounded-xl p-1 gap-0.5">
                        {["week", "month", "year"].map((r) => (
                            <button
                                key={r}
                                onClick={() => setTimeRange(r)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${timeRange === r ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id={`grad-${metric.key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={metric.color} stopOpacity={0.25} />
                            <stop offset="95%" stopColor={metric.color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                    <XAxis dataKey="label" stroke="#9ca3af" tick={{ fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey={activeMetric}
                        name={metric.label}
                        stroke={metric.color}
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill={`url(#grad-${metric.key})`}
                        dot={{ r: 4, fill: metric.color, strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: metric.color }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
