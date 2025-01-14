import React from 'react';

export default function RecentActivities() {
  const activities = [
    { description: 'John Doe enrolled in "React for Beginners"', time: '5 minutes ago', status: 'Completed', statusColor: 'green' },
    { description: 'Jane Smith uploaded a new course: "Advanced Python"', time: '2 hours ago', status: 'Pending Approval', statusColor: 'blue' },
    { description: 'Michael Brown completed "Introduction to HTML"', time: '1 day ago', status: 'Certified', statusColor: 'green' },
  ];

  const statusColorClasses: { [key: string]: string } = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm mb-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
      <ul className="divide-y divide-gray-200">
        {activities.map((activity, index) => (
          <li key={index} className="py-4 flex justify-between">
            <div>
              <p className="text-gray-700 font-medium">{activity.description}</p>
              <p className="text-gray-500 text-sm">{activity.time}</p>
            </div>
            <span className={`${statusColorClasses[activity.statusColor]} text-sm font-semibold`}>
              {activity.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
