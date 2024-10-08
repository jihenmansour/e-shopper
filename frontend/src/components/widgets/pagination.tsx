'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { createQueryString } from "@/lib/utils";

  import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationProps } from "../../../types";

  
 const CustomPagination = ({page, totalPages, nextPage, previousPage}: PaginationProps) => {
  const router = useRouter()
  const path = usePathname()
  const searchParams = useSearchParams();


  const handleNavigation = (pageIndex: number) => {
    
    router.push(path + '?' + createQueryString('page', pageIndex.toString(), searchParams));
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
            <PaginationItem key={index}>
            <PaginationLink 
            onClick={()=>{handleNavigation(index+1)}} 
            isActive={page===index+1?true:false}
            >{index+1}
            </PaginationLink>
          </PaginationItem>
          ))}
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