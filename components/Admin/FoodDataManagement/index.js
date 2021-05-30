
import 'antd/dist/antd.css';
import { Table, Space, Tag, Button } from 'antd';
import React, { useEffect } from 'react'
import EditMasterDataModal from '../../Modal/EditMasterDataModal'
import EditFoodDataModal from '../../Modal/EditFoodDataModal'
import { DeleteConfirmModal } from "../../AntdModal"
import adminService from '../../../services/admin';

export default function FoodDataManagement(props) {

    const { current_tab } = props
    const [editMasterDataModalShow, setEditMasterDataModalShow] = React.useState(false);
    const [foodDataModalShow, setFoodDataModalShow] = React.useState(false);
    const [foodItemSelectedForEdit, setFoodItemSelectedForEdit] = React.useState();
    const columnsFoodData = [
        {
            title: 'No',
            dataIndex: 'No',
            key: 'No',
        },
        {
            title: 'Name Thai',
            dataIndex: 'nameThai',
            key: 'nameThai',
        },
        {
            title: 'Name English',
            dataIndex: 'nameEnglish',
            key: 'nameEnglish',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'National',
            dataIndex: 'national',
            key: 'national',
        },
        {
            title: 'Food Kind',
            dataIndex: 'foodKind',
            key: 'foodKind',
        },
        {
            title: 'Sub Kind',
            dataIndex: 'subKind',
            key: 'subKind',
        },
        {
            title: 'Cook Method',
            dataIndex: 'cookMethod',
            key: 'cookMethod',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Tag color="green" key={record.length} style={{ cursor: "pointer" }} onClick={() => (setFoodDataModalShow(true), setFoodItemSelectedForEdit(record))}>
                        Edit
                    </Tag>
                    <DeleteConfirmModal onOK={deleteFoodItem} />
                </Space>
            ),
        }
    ]
    const [dataFood, setDataFood] = React.useState([
        {
            key: "1",
            No: "1",
            nameThai: 'พิซซ่าเกาหลีทะเล',
            nameEnglish: 'Haemul Pajeon',
            price: 180,
            category: null,
            national: null,
            foodKind: null,
            subKind: null,
            cookMethod: null
        },
        {
            key: "2",
            No: "2",
            nameThai: 'ผัดวุ้นเส้น',
            nameEnglish: 'Japchae',
            price: 150,
            category: null,
            national: null,
            foodKind: null,
            subKind: null,
            cookMethod: null
        },
        {
            key: "3",
            No: "3",
            nameThai: 'เกี๊ยวซ่าเกาหลี',
            nameEnglish: 'Mandu',
            price: 120,
            category: 'Appetizers',
            national: 'Korea',
            foodKind: 'Dumplings',
            subKind: 'Pork',
            cookMethod: 'Deep fried/Boiled'
        },
        {
            key: "4",
            No: "4",
            nameThai: 'ปลาหมึกทอด',
            nameEnglish: 'Calamari',
            price: 110,
            category: 'Appetizers',
            national: 'Korea',
            foodKind: 'Fried snack',
            subKind: 'Squid',
            cookMethod: 'Deep fried'
        },
        {
            key: "5",
            No: "5",
            nameThai: 'ไก่ทอดซอสกระเทียม',
            nameEnglish: 'Soy Garlic Chicken',
            price: 100,
            category: 'Appetizers',
            national: 'Korea',
            foodKind: 'Fried snack',
            subKind: 'Chicken',
            cookMethod: 'Deep fried'
        }
    ]);

    useEffect(() => {
        if (current_tab === 'foodData') {
            // getAllMenu()
        }
    }, [props])

    const getAllMenu = async () => {
        let allMenu = await adminService.getAllMenu()
        console.log('allMenu', allMenu)
    }

    const deleteFoodItem = () => {
        console.log('Deleted food item.')
    }

    return (
        <>
            <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                Food Data
                </div>
            <div style={{ textAlign: "right", padding: "15px" }}>
                <Button type="primary" onClick={() => setEditMasterDataModalShow(true)}>
                    Edit master data
                </Button>
            </div>
            <Table columns={columnsFoodData} dataSource={dataFood} scroll={{ x: 'max-content' }} />
            <EditMasterDataModal
                show={editMasterDataModalShow}
                onHide={() => setEditMasterDataModalShow(false)}
                title='Edit master data'
            />
            <EditFoodDataModal
                show={foodDataModalShow}
                onHide={() => setFoodDataModalShow(false)}
                title='Edit food data'
                food_item_selected={foodItemSelectedForEdit}
            />
        </>
    )
}