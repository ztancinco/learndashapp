'use client';

import { useEffect } from 'react';
import Loader from '../components/Loader';
import CoursesHeaderList from './partial/CoursesHeaderList';
import CoursesList from './partial/CoursesList';
import useCourses from '../hooks/useCourses';

export default function Courses() {
  const { courses, loading, error, fetchCourses } = useCourses();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <CoursesHeaderList />
      <CoursesList courses={courses} />
    </>
  );
}
