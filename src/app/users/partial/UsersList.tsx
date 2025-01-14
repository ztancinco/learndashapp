import { Course } from '@/app/api/interfaces/Course';
import UserListRow from './UsersListRow';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import useCourses from '@/app/hooks/useCourses';

interface UsersListProps {
  courses: Course[];
}

export default function UsersList({ courses }: UsersListProps) {
  const router = useRouter();
  const { deleteCourse } = useCourses();

  return (
    <section className="mt-8 bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <button
          onClick={() => router.push('/users/')}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-500"
        >
          <PlusCircleIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Fullname
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                UserName
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course) => (
              <UserListRow
                key={course.id || course.title}
                course={course}
                onDelete={deleteCourse}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
