import React from 'react'
import SideMenu from '../../components/SideMenu';
const DashboardLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className='flex w-full'>
            <aside className='flex-[1]'>
                <SideMenu />
            </aside>
            <div className="bg-gray-100 flex-[10] p-4 rounded min-h-[300px]">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
