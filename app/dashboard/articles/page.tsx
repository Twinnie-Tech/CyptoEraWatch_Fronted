import React from 'react'
import { DataTable } from './data-table'
import { data } from '@app/Dummy/MOCK_DATA'
import { columns } from "./columns"
const Articles = () => {
    return (
        <div className='mx-10 pt-5'>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default Articles
