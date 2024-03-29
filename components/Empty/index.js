import { Empty } from 'antd'
import React from 'react'

export default function EmptyComponent({descriptionText = "No Data"}) {
    return (
        <Empty style={{ width: '100%', margin: "auto" }}
            description={
                <span>
                    {descriptionText}
                </span>
            }
        />
    )
}