import MobileHeader from '@/components/main/mobile-header'
import Sidebar from '@/components/main/sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <MobileHeader />
            <Sidebar className='hidden lg:flex' />
            <main className='lg:pl-[256px] h-full pt-[50px] lg:pt-0'>
                <div className="h-full max-w-[1056px] mx-auto pt-6">
                    {children}
                </div>
            </main>
        </>
    )
}

export default layout