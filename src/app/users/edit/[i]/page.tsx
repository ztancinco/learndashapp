'use client';

import Loader from '@/app/components/Loader';
import CourseForm from '@/app/components/form/course/CourseForm';
import useCourses from '@/app/hooks/useCourses';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Course } from '@/app/api/interfaces/Course';

export default function EditCoursePage({ params }: { params: Promise<{ i: string }> }) {
  const [unwrappedParams, setUnwrappedParams] = useState<{ i: string } | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const unwrapped = await params;
      setUnwrappedParams(unwrapped);
    };
    fetchParams();
  }, [params]);

  const { i } = unwrappedParams || {};
  const { fetchCourse, loading, error } = useCourses();
  const [course, setCourse] = useState<Course | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!i) {
      return;
    }

    const getCourse = async () => {
      const fetchedCourse = await fetchCourse(i);
      if (fetchedCourse) {
        setCourse(fetchedCourse);
      }
    };

    getCourse();
  }, [i, fetchCourse]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {course ? (
        <CourseForm router={router} course={course} />
      ) : (
        <div>Course not found</div>
      )}
    </div>
  );
}
