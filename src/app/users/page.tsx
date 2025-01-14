'use client';

import { useEffect } from 'react';
import UsersHeaderList from './partial/UsersHeaderList';
import useUsers from '../hooks/useUsers';

export default function ManageUsers() {
  const { fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);


  return (
     <UsersHeaderList />
  );
}
