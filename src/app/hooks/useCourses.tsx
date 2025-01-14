import { useState, useCallback } from 'react';
import { Course } from '../api/interfaces/Course';

export default function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to handle errors
  const handleError = (errorMessage: string, error: unknown) => {
    setError(errorMessage);
    console.error(errorMessage, error);
  };

  // Fetch all courses
  const fetchCourses = useCallback(async () => {
    const errorMessage = 'Failed to fetch courses';
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/courses');
      if (!res.ok) throw new Error(errorMessage);
      const data: Course[] = await res.json();
      setCourses(data);
    } catch (err: unknown) {
      handleError(errorMessage, err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a single course by ID
  const fetchCourse = useCallback(async (id: string): Promise<Course | null> => {
    const errorMessage = 'Failed to fetch course';
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/courses/?course_id=${id}`);
      if (!res.ok) throw new Error(errorMessage);
      const data: Course[] = await res.json();
      return data.length > 0 ? data[0] : null;
    } catch (err: unknown) {
      handleError(errorMessage, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new course
  const addCourse = async (courseData: Course) => {
    const errorMessage = 'Failed to add course';
    setError(null);
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      if (!res.ok) throw new Error(errorMessage);
      const newCourse: Course = await res.json();
      setCourses((prevCourses) => [...prevCourses, newCourse]);
    } catch (err: unknown) {
      handleError(errorMessage, err);
    }
  };

  // Update an existing course
  const updateCourse = async (id: string, updatedCourseData: Partial<Course>) => {
    const errorMessage = 'Failed to update course';
    setError(null);
    try {
      const res = await fetch(`/api/courses/?course_id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCourseData),
      });

      if (!res.ok) throw new Error(errorMessage);
      const updatedCourse: Course = await res.json();
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === id ? { ...course, ...updatedCourse } : course
        )
      );
    } catch (err: unknown) {
      handleError(errorMessage, err);
    }
  };

  // Delete a course
  const deleteCourse = async (id: string) => {
    const errorMessage = 'Failed to delete course';
    setError(null);
    try {
      const res = await fetch(`/api/courses/?course_id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error(errorMessage);

      await fetchCourses();
      
    } catch (err: unknown) {
      handleError(errorMessage, err);
    }
  };

  return {
    courses,
    loading,
    error,
    fetchCourses,
    fetchCourse,
    addCourse,
    updateCourse,
    deleteCourse,
  };
}
