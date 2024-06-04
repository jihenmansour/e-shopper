
import UsersTable from '@/components/users/UsersTable'
import { getAllusers } from '@/lib/actions/user.actions'
import { useLoader } from '@/lib/hooks/LoaderProvider';
import React, { Suspense } from 'react'

const  page = async({ searchParams: { page } }: SearchParamProps) =>  {
  
  const currentPage = Number(page as string) || 1;
  const users = await getAllusers(currentPage)

  

  return (
    <div>
      <Suspense fallback={<p>Fetching blog posts...</p>}>
      <UsersTable users={users} />
</Suspense>

    </div>
  )
}

export default page