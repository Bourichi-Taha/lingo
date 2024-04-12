import { cn } from '@/lib/utils';
import React from 'react'

interface SidebarProps {
    className?:string;
}
const Sidebar = (props:SidebarProps) => {
    const {className} = props;
  return (
    <div className={cn('bg-blue-500 h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col',className)}>
        
    </div>
  )
}

export default Sidebar