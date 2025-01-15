import { useState, useCallback } from 'react';
import axios from '@/lib/axiosConfig';
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

  // Helper to manage loading and error states
  const setLoadingState = (loadingState: boolean) => {
    setLoading(loadingState);
    if (!loadingState) {
      setError(null); // Clear error when loading ends
    }
  };

  // Fetch all courses
  const fetchCourses = useCallback(async () => {
    setLoadingState(true);
    try {
      const { data } = await axios.get<Course[]>('/courses/');
      setCourses(data);
    } catch (err: unknown) {
      handleError('Failed to fetch courses', err);
    } finally {
      setLoadingState(false);
    }
  }, []);

  // Fetch a single course by ID (optimized to check cache)
  const fetchCourse = useCallback(
    async (id: string): Promise<Course | null> => {
      const cachedCourse = courses.find((course) => course.id === id);
      if (cachedCourse) return cachedCourse; // Return cached course if available

      setLoadingState(true);
      try {
        const { data } = await axios.get<Course[]>(`/courses/`, {
          params: { course_id: id },
        });
        return data.length > 0 ? data[0] : null;
      } catch (err: unknown) {
        handleError('Failed to fetch course', err);
        return null;
      } finally {
        setLoadingState(false);
      }
    },
    [courses]
  );

  // Add a new course
  const addCourse = async (courseData: Course) => {
    setError(null);
    try {
      const { data: newCourse } = await axios.post<Course>('/courses', courseData);
      setCourses((prevCourses) => [...prevCourses, newCourse]);
    } catch (err: unknown) {
      handleError('Failed to add course', err);
    }
  };

  // Update an existing course
  const updateCourse = async (id: string, updatedCourseData: Partial<Course>) => {
    setError(null);
    try {
      const { data: updatedCourse } = await axios.put<Course>(`/courses`, updatedCourseData, {
        params: { course_id: id },
      });
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === id ? { ...course, ...updatedCourse } : course
        )
      );
    } catch (err: unknown) {
      handleError('Failed to update course', err);
    }
  };

  // Delete a course
  const deleteCourse = async (id: string) => {
    setError(null);
    try {
      await axios.delete(`/courses`, {
        params: { course_id: id },
      });
      await fetchCourses(); // Refresh the course list after deletion
    } catch (err: unknown) {
      handleError('Failed to delete course', err);
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
