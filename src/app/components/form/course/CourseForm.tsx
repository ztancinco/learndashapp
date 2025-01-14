'use client';

import React, { useState, useEffect } from 'react';
import InputField from './fields/InputField';
import SelectField from './fields/SelectField';
import FileInputField from './fields/FileInputField';
import QuizSection from './QuizSection';
import useCourses from '@/app/hooks/useCourses';
import { Course } from '@/app/api/interfaces/Course';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

interface CourseFormProps {
  router: ReturnType<typeof useRouter>;
  course?: Course;
}

interface Quiz {
  title: string;
  description: string;
  options: string[];
  correctAnswer: number;
  isMultipleChoice: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({ router, course }) => {
  const { error, addCourse, updateCourse } = useCourses();
  const [formData, setFormData] = useState({
    title: course?.title || '',
    instructor: course?.instructor || '',
    status: course?.status || 'Active',
    video: course?.video ? new File([], course.video) : null,
    quizzes: [{ title: '', description: '', options: ['', '', '', ''], correctAnswer: 0, isMultipleChoice: false }],
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        instructor: course.instructor || '',
        status: course.status || 'Active',
        video: course.video ? new File([], course.video) : null,
        quizzes: [{ title: '', description: '', options: ['', '', '', ''], correctAnswer: 0, isMultipleChoice: false }],
      });
    }
  }, [course]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleQuizChange = <T extends keyof Quiz>(index: number, field: T, value: Quiz[T]) => {
      const updatedQuizzes = [...formData.quizzes];
      updatedQuizzes[index][field] = value;
      setFormData(prevState => ({ ...prevState, quizzes: updatedQuizzes }));
    };

  const handleAddQuiz = () => {
    setFormData(prevState => ({
      ...prevState,
      quizzes: [...prevState.quizzes, { title: '', description: '', options: ['', '', '', ''], correctAnswer: 0, isMultipleChoice: false }],
    }));
  };

  const handleDeleteQuiz = (index: number) => {
    const updatedQuizzes = formData.quizzes.filter((_, i) => i !== index);
    setFormData(prevState => ({ ...prevState, quizzes: updatedQuizzes }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCourseForm() || !validateQuizForms()) return;

    setIsSubmitting(true);

    const courseData = {
      id: course?.id || uuidv4(),
      title: formData.title,
      instructor: formData.instructor,
      status: formData.status,
      enrolled: 0,
      description: '',
      video: formData.video ? formData.video.name : '',
    };

    try {
      if (course) {
        await updateCourse(course.id, courseData);
      } else {
        await addCourse(courseData);
      }

      resetForm();
      router.push('/courses');
    } catch (err) {
      setFormError('Failed to save course. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      instructor: '',
      status: 'Active',
      video: null,
      quizzes: [{ title: '', description: '', options: ['', '', '', ''], correctAnswer: 0, isMultipleChoice: false }],
    });
  };

  const validateCourseForm = () => {
    if (!formData.title || !formData.instructor) {
      setFormError('Please fill in all fields.');
      return false;
    }
    setFormError(null);
    return true;
  };

  const validateQuizForms = () => {
    const errors = formData.quizzes.map((quiz, index) => {
      if (!quiz.title || !quiz.description) return `Quiz ${index + 1}: Please fill in all fields.`;
      if (quiz.options.some(option => option === '')) return `Quiz ${index + 1}: Please fill in all options.`;
      if (quiz.correctAnswer < 0 || quiz.correctAnswer >= quiz.options.length) return `Quiz ${index + 1}: Please select a valid correct answer.`;
      return '';
    });
    return errors.every(error => error === '');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-7xl w-full p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {course ? 'Edit Course' : 'Add New Course'}
        </h2>

        {formError && <p className="text-red-600 mb-4">{formError}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Course Form Fields */}
          <InputField label="Course Title" value={formData.title} onChange={(e) => handleInputChange(e, 'title')} />
          <InputField label="Instructor" value={formData.instructor} onChange={(e) => handleInputChange(e, 'instructor')} />
          <SelectField label="Status" value={formData.status} onChange={(e) => handleInputChange(e, 'status')} options={['Active', 'Inactive']} />
          <FileInputField label="Course Video" onChange={(e) => setFormData({ ...formData, video: e.target.files ? e.target.files[0] : null })} />

          <hr />
          {/* Quiz Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quizzes</h3>
            {formData.quizzes.map((quiz, index) => (
              <QuizSection
                key={index}
                quiz={quiz}
                index={index}
                onChange={handleQuizChange}
                onDelete={handleDeleteQuiz}
              />
            ))}
            <button type="button" onClick={handleAddQuiz} className="mt-4 text-blue-600 hover:text-blue-800 flex items-center">
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Add Quiz
            </button>
          </div>

          {/* Form Submit Button */}
          <div className="mt-6">
            <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
              {isSubmitting ? 'Submitting...' : course ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
