import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import SidebarItem from './sidebar-item';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Loader } from 'lucide-react';

interface SidebarProps {
  className?: string;
}
const Sidebar = (props: SidebarProps) => {
  const { className } = props;
  return (
    <div className={cn('h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex flex-col justify-between', className)}>
      <div className="flex flex-col">
        <Link href={"/learn"}>
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <Image src={"/mascot.svg"} alt="Logo" height={40} width={40} />
            <h1 className="text-2xl font-extrabold  text-green-600 tracking-wide">Lingo</h1>
          </div>
        </Link>
        <div className="flex flex-col gap-y-2">
          <SidebarItem label='Learn' href='/learn' icon='/learn.svg' />
          <SidebarItem label='Leaderboard' href='/leaderboard' icon='/leaderboard.svg' />
          <SidebarItem label='Quests' href='/quests' icon='/quests.svg' />
          <SidebarItem label='Shop' href='/shop' icon='/shop.svg' />
        </div>
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl='/' />
        </ClerkLoaded>
      </div>
    </div>
  )
}

export default Sidebar