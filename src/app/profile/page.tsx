'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface UserProfileProps {
  user?: {
    name: string;
    email: string;
    profilePicture: string;
    enrolledCourses: Array<{ courseName: string; progress: number }>;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // Default user data if no user is passed
  const defaultUser = {
    name: 'Guest User',
    email: 'guest@example.com',
    profilePicture: '/path/to/default-profile-picture.jpg',
    enrolledCourses: [],
  };

  // Use the passed user data or fallback to defaultUser
  const currentUser = user || defaultUser;

  const [editing, setEditing] = useState<boolean>(false);
  const [updatedName, setUpdatedName] = useState<string>(currentUser.name);
  const [updatedEmail, setUpdatedEmail] = useState<string>(currentUser.email);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSaveChanges = () => {
    setEditing(false);
  };

  return (
    <div className="bg-gray-100 py-4 px-4">
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">User Profile</h2>

        <div className="flex items-center space-x-6 mb-6">
          <div className="relative w-32 h-32">
            <Image
              src={currentUser.profilePicture}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full border-4 border-blue-500"
            />
          </div>
          <div className="flex-1">
            {editing ? (
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 focus:outline-none"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
            )}
            {editing ? (
              <input
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                className="text-gray-700 mt-2 border-b-2 border-gray-300 focus:outline-none"
              />
            ) : (
              <p className="text-gray-600">{currentUser.email}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleEditToggle}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
          {editing && (
            <button
              onClick={handleSaveChanges}
              className="ml-4 bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Enrolled Courses</h2>
          <ul className="mt-4 space-y-4">
            {currentUser.enrolledCourses.length > 0 ? (
              currentUser.enrolledCourses.map((course, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-800">{course.courseName}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No courses enrolled</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
