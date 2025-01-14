'use client';

import CourseForm from '@/app/components/form/course/CourseForm';
import useCourses from '../../hooks/useCourses';
import { useRouter } from 'next/navigation';

export default function CreateCoursesPage() {
  const { error } = useCourses();
  const router = useRouter();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CourseForm router={router} />
      </div>
    </div>
  );
}
