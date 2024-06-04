'use client'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useLoader } from "@/lib/hooks/LoaderProvider";
  import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

  
 const CustomPagination = ({page, totalPages, nextPage, previousPage}: PaginationProps) => {
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams()

  const [employees, setEmployees] = useState<UsersTableProps>()
  const loader = useLoader()

  


  const handleNavigation = (pageIndex: number) => {

  router.push(`${path}?page=${pageIndex}`);
  };
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
            onClick={()=>{handleNavigation(page-1)}}
             isDisable={previousPage?false:true}/>
          </PaginationItem>
          {[...Array(totalPages)].map((item,index)=> (
            <PaginationItem>
            <PaginationLink 
            onClick={()=>{handleNavigation(index+1)}} 
            isActive={page===index+1?true:false}
            >{index+1}
            </PaginationLink>
          </PaginationItem>
          ))}
          {/* {page<totalPages &&
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
 } */}
          <PaginationItem>
            <PaginationNext
            onClick={()=>{handleNavigation(page+1)}} 
             isDisable={nextPage?false:true} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
export default CustomPagination;