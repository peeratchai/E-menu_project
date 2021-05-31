
import 'antd/dist/antd.css';
import { Table, Space, Tag, Button, message, Spin } from 'antd';
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
    const [masterfoodCategory, setMasterFoodCategory] = React.useState([]);
    const [masterNational, setMasterNational] = React.useState([]);
    const [masterFoodKind, setMasterFoodKind] = React.useState([]);
    const [masterSubKind, setMasterSubKind] = React.useState([]);
    const [masterCookMethod, setMasterCookMethod] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
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
            render: (foodData) => (
                <Space size="middle">
                    <Tag color="green" key={foodData.id} style={{ cursor: "pointer" }} onClick={() => (setFoodDataModalShow(true), setFoodItemSelectedForEdit(foodData))}>
                        Edit
                    </Tag>
                    <DeleteConfirmModal onOK={() => deleteFoodItem(foodData.id)} />
                </Space>
            ),
        }
    ]
    const [foodDataList, setFoodDataList] = React.useState([]);

    useEffect(() => {
        if (current_tab === 'foodData') {
            getAllMenu()
            getMasterData()
        }
    }, [props])

    const getAllMenu = async () => {
        let foodDataList = []
        setLoading(true)
        adminService.getAllMenu().then((allMenu) => {
            setLoading(false)
            console.log(allMenu)
            allMenu.forEach((menu, menuIndex) => {
                foodDataList.push({
                    key: menu.id,
                    id: menu.id,
                    No: menuIndex + 1,
                    nameThai: menu.name,
                    nameEnglish: menu.name,
                    price: menu.price,
                    category: menu.category,
                    national: menu.national,
                    foodKind: menu.food_kind,
                    subKind: menu.sub_kind,
                    cookMethod: menu.cook_method
                })
            })

            setFoodDataList(foodDataList)
        }).catch((error) => {
            console.log('error', error)
        })
    }

    const getMasterData = async () => {
        let awaitMasterFoodCategory = adminService.getMasterFoodCategory()
        let awaitMasterNational = adminService.getMasterNational()
        let awaitMasterFoodKind = adminService.getMasterFoodKind()
        let awaitMasterSubKind = adminService.getMasterSubKind()
        let awaitMasterCookMethod = adminService.getMasterCookMethod()

        let masterFoodCategory = await awaitMasterFoodCategory
        let masterNational = await awaitMasterNational
        let masterFoodKind = await awaitMasterFoodKind
        let masterSubKind = await awaitMasterSubKind
        let masterCookMethod = await awaitMasterCookMethod

        setMasterFoodCategory(masterFoodCategory.filter((foodCategory) => foodCategory.is_active === true))
        setMasterNational(masterNational.filter((national) => national.is_active === true))
        setMasterFoodKind(masterFoodKind.filter((foodKind) => foodKind.is_active === true))
        setMasterSubKind(masterSubKind.filter((subKind) => subKind.is_active === true))
        setMasterCookMethod(masterCookMethod.filter((cookMethod) => cookMethod.is_active === true))
    }

    const deleteFoodItem = (foodDataId) => {
        console.log('Deleted food item.', foodDataId)

        adminService.deleteMenu(foodDataId).then((response) => {
            console.log('response', response)
            getAllMenu()
            message.success('Delete food item successful.')
        }).catch((error) => {
            console.log('error', error)
            message.error('Cannot delete food item! Please try again.')
        })
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
            <Spin spinning={loading} tip="Loading...">
                <Table columns={columnsFoodData} dataSource={foodDataList} scroll={{ x: 'max-content' }} />
            </Spin>
            <EditMasterDataModal
                show={editMasterDataModalShow}
                onHide={() => setEditMasterDataModalShow(false)}
                title='Edit master data'
                get_master_data={getMasterData}
            />
            <EditFoodDataModal
                show={foodDataModalShow}
                onHide={() => setFoodDataModalShow(false)}
                title='Edit food data'
                food_item_selected={foodItemSelectedForEdit}
                master_food_category={masterfoodCategory}
                master_national={masterNational}
                master_food_kind={masterFoodKind}
                master_sub_kind={masterSubKind}
                master_cook_method={masterCookMethod}
                get_all_menu={getAllMenu}
            />
        </>
    )
}