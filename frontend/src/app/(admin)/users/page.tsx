
import UsersTable from '@/components/users/users-table';
import { getAllusers } from '@/lib/actions/user.actions'

import React, { Suspense } from 'react'
import { SearchParamProps } from '../../../../types';

const  page = async({ searchParams: { page } }: SearchParamProps) =>  {
  
  const currentPage = Number(page as string) || 1;
  const users = await getAllusers(currentPage)

  

  return (
    <div>
      <Suspense fallback={<p>Fetching data...</p>}>
      <header className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-ibm-plex-serif font-bold text-black-1 ">
          All users
        </h1>
      </header>
      <UsersTable users={users} />
      </Suspense>

    </div>
  )
}

export default page