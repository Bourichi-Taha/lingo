import MobileHeader from '@/components/main/mobile-header'
import Sidebar from '@/components/main/sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <MobileHeader />
            <Sidebar className='hidden lg:flex' />
            <main className='lg:pl-[256px] h-full pt-[50px] lg:pt-0'>
                <div className="bg-red-500 h-full">
                {children}
                </div>
            </main>
        </>
    )
}

export default layout