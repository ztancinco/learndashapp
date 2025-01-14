import React from 'react';

export default function DashboardOverview() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <Card title="Total Students" value="1,234" color="blue" />
      <Card title="Total Courses" value="56" color="green" />
      <Card title="Active Instructors" value="12" color="purple" />
    </section>
  );
}

function Card({ title, value, color }: { title: string; value: string; color: string }) {
  const textColor = `text-${color}-600`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
      <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
      <p className={`mt-2 text-3xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
}
