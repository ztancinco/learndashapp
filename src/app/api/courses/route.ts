import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Course from '../../../models/Course';

async function fetchCourseById(courseId: string) {
  return Course.find({ id: courseId });
}

async function fetchAllCourses() {
  return Course.find();
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const courseId = url.searchParams.get('course_id');

    if (courseId) {
      const course = await fetchCourseById(courseId);

      if (!course) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }

      return NextResponse.json(course, { status: 200 });
    }

    const courses = await fetchAllCourses();
    return NextResponse.json(courses, { status: 200 });
  } catch (err) {
    console.error('Error fetching courses:', err);
    return NextResponse.json({ error: 'Error fetching courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const courseData = await request.json();
    await connectToDatabase();
    const newCourse = new Course(courseData);
    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creating course' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const courseId = url.searchParams.get('course_id');

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const updates = await request.json();
    await connectToDatabase();

    const updatedCourse = await Course.findOneAndUpdate(
      { id: courseId },
      updates,
      { new: true }
    );

    if (!updatedCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(updatedCourse, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Error updating course' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const courseId = url.searchParams.get('course_id');

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    const deletedCourse = await Course.findOneAndDelete({ id: courseId });

    if (!deletedCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Error deleting course' }, { status: 500 });
  }
}
