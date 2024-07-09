
import UsersTable from '@/components/users/users-table';
import { getAllusers } from '@/lib/actions/user.actions'

import React, { Suspense } from 'react'
import { SearchParamProps } from '../../../../types';

const  page = async({ searchParams: { page } }: SearchParamProps) =>  {
  
  const currentPage = Number(page as string) || 1;
  const users = await getAllusers(currentPage)

  

  return (
    <div>
        <h3>
          Users list
        </h3>
      <UsersTable users={users} />
    </div>
  )
}

export default page