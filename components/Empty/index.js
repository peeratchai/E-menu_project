import { Empty } from 'antd'
import React from 'react'

export default function EmptyComponent({description = "No Data"}) {
    return (
        <Empty style={{ width: '100%', margin: "auto" }}
            description={
                <span>
                    {description}
                </span>
            }
        />
    )
}