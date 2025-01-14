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
    <CourseForm router={router} />
  );
}