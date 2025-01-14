import connectToDatabase from './mongodb';
import Course from '../models/Course';

const seedCourses = async () => {
  try {
    await connectToDatabase();

    const courseCount = await Course.countDocuments();
    if (courseCount > 0) {
      console.log('Courses already exist, skipping seed.');
      return;
    }
    
    const defaultCourses = [
      {
        title: 'React for Beginners',
        instructor: 'John Doe',
        enrolled: 50,
        status: 'Active',
      },
      {
        title: 'Advanced Python',
        instructor: 'Jane Smith',
        enrolled: 80,
        status: 'Pending Approval',
      },
      {
        title: 'Introduction to HTML',
        instructor: 'Michael Brown',
        enrolled: 150,
        status: 'Active',
      },
    ];

    // Insert default courses into the database
    await Course.insertMany(defaultCourses);
    console.log('Default courses inserted!');
  } catch (error) {
    console.error('Error seeding courses:', error);
  }
};

export default seedCourses;
