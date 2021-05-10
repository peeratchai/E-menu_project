import utilStyles from '../../../../styles/utils.module.css'
import styles from './index.module.css'
import { Button } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Table, Spin } from 'antd';
import React, { useEffect } from 'react'


export default function WebComponent(props) {

    let { columns_table, category, spin_loading } = props
    let { show_add_Category_Modal, expanded_row_render } = props

    return (
        <div className={styles.tab}>
            <div style={{ textAlign: "right", marginBottom: "10px" }}>
                <Button className={utilStyles.fontContent} onClick={() => show_add_Category_Modal(true)}>Add Category</Button>
            </div>
            <Spin spinning={spin_loading} tip="Loading...">
                <Table columns={columns_table} dataSource={category} expandable={expanded_row_render} />
            </Spin>
        </div>
    )
}