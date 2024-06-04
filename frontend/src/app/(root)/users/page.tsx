
import UsersTable from '@/components/users/UsersTable'
import { getAllusers } from '@/lib/actions/user.actions'

import React, { Suspense } from 'react'

const  page = async({ searchParams: { page } }: SearchParamProps) =>  {
  
  const currentPage = Number(page as string) || 1;
  const users = await getAllusers(currentPage)

  

  return (
    <div>
      <Suspense fallback={<p>Fetching data...</p>}>
      <UsersTable users={users} />
      </Suspense>

    </div>
  )
}

export default page