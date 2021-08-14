import utilStyles from '../../../../styles/utils.module.css'
import styles from './index.module.css'
import { Button } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Table, Spin, Space, Switch, Popconfirm } from 'antd';
import React, { useEffect } from 'react'


export default function WebComponent(props) {

    let { columns_table, category, spin_loading, restaurant_id, type } = props
    let { show_add_Category_Modal, on_change_menu_status, show_edit_menu_modal, set_selected_menu, delete_menu } = props
    const [disable, setDisable] = React.useState(true)
    const categoryData = category === undefined ? [] : category
    // add key to each category 
    categoryData.map((category, index) => {
        category.key = index
    })

    useEffect(() => {
        if (restaurant_id) {
            setDisable(false)
        }
    }, [props])

    const showEditmenuModal = (menu) => {
        set_selected_menu(menu)
        console.log('menu', menu)
        show_edit_menu_modal()
    }

    const confirmDeleteCategory = (menu) => {
        delete_menu(menu)
    }

    const expandedRowRender = (record) => {
        const columns = [
            { title: 'No', dataIndex: 'index', key: 'index' },
            { title: 'Image', dataIndex: 'image', key: 'image', width: 300 },
            { title: 'Menu', dataIndex: 'name', key: 'name' },
            { title: 'Description', dataIndex: 'description', key: 'description' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
            {
                title: 'Action',
                key: 'action',
                render: (menu) => (
                    <Space size="middle">
                        <Switch defaultChecked checked={menu.is_active} onChange={(checked) => on_change_menu_status(checked, menu)} />
                        <Button variant="success" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }} onClick={() => showEditmenuModal(menu)}>Edit</Button>
                        <Popconfirm
                            title="Are you sure to delete this menu?"
                            onConfirm={() => confirmDeleteCategory(menu)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button variant="danger" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Delete</Button>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];

        let menus = record.menus;
        menus.map((menu, index) => {
            menu.categoryId = record.id
            menu.index = index + 1
            menu.key = menu.name + index
            menu.image = (<img src={menu.image_url} />)
        })
        return <Table columns={columns} dataSource={menus} pagination={false} scroll={{ x: 'max-content' }} />;
    };

    return (
        <>
            {
                type === 'partner' && (
                    <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#78100E", padding: "15px", textAlign: "center" }}>
                        Menu Management
                    </div>
                )
            }
            <div className={styles.tab}>
                <div style={{ textAlign: "right", marginBottom: "10px" }}>
                    <Button disabled={disable} className={utilStyles.fontContent} onClick={() => show_add_Category_Modal(true)}>Add Category</Button>
                </div>
                <Spin spinning={spin_loading} tip="Loading...">
                    <Table columns={columns_table} dataSource={categoryData} expandable={{ expandedRowRender }} scroll={{ x: 'max-content' }} />
                </Spin>
            </div>
        </>
    )
}