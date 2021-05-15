import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import useMediaQuery from '../../../utils/utils';
import WebComponent from './Web'
import MobileComponent from './Mobile'
import AddCategoryModal from '../../Modal/AddCategoryModal'
import EditCategoryModal from '../../Modal/EditCategoryModal'
import AddMenuModal from '../../Modal/AddMenuModal'
import EditMenuModal from '../../Modal/EditMenuModal'
import { Space, Switch, message, Popconfirm } from 'antd';
import { Button } from 'react-bootstrap'
import partnerService from '../../../services/partner'
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Menu({ restaurant_id }) {
    const isMobileResolution = useMediaQuery(768)

    const [category, setCategory] = React.useState([]);
    const [addCategoryModal, setAddCategoryModal] = React.useState(false);
    const [editCategoryModal, setEditCategoryModal] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState({ name: "" });
    const [selectedMenu, setSelectedMenu] = React.useState({ name: "" });
    const [spinLoading, setSpinLoading] = React.useState(true);
    const defaultImage = "data:image/png;base64,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"
    const [menuImage, setMenuImage] = React.useState(defaultImage);
    const [menuForm, setMenuForm] = React.useState({
        menuName: '',
        description: '',
        price: ''
    })

    const [addMenuModalShow, setAddMenuModalShow] = React.useState(false);
    const [editMenuModalShow, setEditMenuModalShow] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    useEffect(() => {
        if (restaurant_id !== undefined) {
            getAllMenu()
        }
    }, [restaurant_id])

    const getAllMenu = async () => {
        let category = await partnerService.getCategoryByRestaurantId(restaurant_id);
        setCategory(category)
        setSpinLoading(false)
    }

    const onChangeStatusCategory = (checked, category) => {
        let editCategory = category
        editCategory.is_active = checked
        let categoryId = category.id
        let data = {
            "restaurant": restaurant_id,
            "name": category.name,
            "is_active": category.is_active
        }
        setSpinLoading(true)
        partnerService.editCategory(categoryId, data).then(() => {
            getAllMenu()
        })
    }

    const onChangeMenuStatus = (checked, menu) => {
        // console.log('checked', checked)
        // console.log('menu', menu)
        let menuId = menu.id
        let data = {
            //// remark : restaurant === restaurant id
            restaurant: restaurant_id,
            menu_category: menu.categoryId,
            //// remark : name === Menu name
            name: menu.name,
            description: menu.description,
            price: menu.price,
            image: null,
            is_active: checked
        }
        console.log(data)
        setSpinLoading(true)
        partnerService.editMenu(data, menuId).then(() => {
            getAllMenu()
        })
    }

    const showEditCategoryModal = (category) => {
        setSelectedCategory(category)
        setEditCategoryModal(true)
    }

    const confirmDeleteCategory = (category) => {
        setSpinLoading(true)
        partnerService.deleteCategory(category.id).then(() => {
            getAllMenu()
        })

    }

    const deleteMenu = (menu) => {
        setSpinLoading(true)
        partnerService.deletedMenu(menu.id).then(() => {
            getAllMenu()
        })
    }

    const categoryColumns = [
        {
            title: 'Category',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'webAction',
            responsive: ['sm'],
            render: (category) => {
                // console.log('category', category)
                return (
                    <Space size="middle">
                        <Switch checked={category.is_active} onChange={(checked) => onChangeStatusCategory(checked, category)} />
                        <Button style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }} onClick={() => (setSelectedCategory(category), setAddMenuModalShow(true))}>Add Menu</Button>
                        <Button variant="success" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }} onClick={() => showEditCategoryModal(category)} >Edit</Button>
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => confirmDeleteCategory(category)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button variant="danger" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Delete</Button>
                        </Popconfirm>
                    </Space >
                )
            },
        },
        {
            title: 'Action',
            key: 'mobileAction',
            responsive: ['xs'],
            render: (category) => {
                // console.log('category', category)
                return (
                    <Space size="middle">
                        <Switch checked={category.is_active} onChange={(checked) => onChangeStatusCategory(checked, category)} />
                        <Button style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }} onClick={() => (setSelectedCategory(category), setAddMenuModalShow(true))}><PlusOutlined /></Button>
                        <Button variant="success" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }} onClick={() => showEditCategoryModal(category)} ><EditOutlined /></Button>
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => confirmDeleteCategory(category)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button variant="danger" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}><DeleteOutlined /></Button>
                        </Popconfirm>
                    </Space >
                )
            },
        },
    ]

    const categoryColumnsTable = categoryColumns.map((col) => {
        return {
            ...col
        };
    });

    const handleEditCategory = async (category) => {

        let categoryId = category.id
        let data = {
            "restaurant": restaurant_id,
            "name": category.name,
            "is_active": category.is_active
        }
        setSpinLoading(true)
        partnerService.editCategory(categoryId, data).then(() => {
            getAllMenu()
        })
    }

    const handleAddCategory = async (categoryName) => {
        let data = {
            "restaurant": restaurant_id,
            "name": categoryName
        }
        partnerService.addCategory(data).then(() => {
            message.success('Add category successful.')
            getAllMenu()
        })
    };



    let menuComponent

    if (isMobileResolution) {
        menuComponent = (
            <MobileComponent
                category={category}
                columns_table={categoryColumnsTable}
                // expanded_row_render={expandedRowRender}
                show_add_Category_Modal={() => setAddCategoryModal(true)}
                spin_loading={spinLoading}
                on_change_menu_status={onChangeMenuStatus}
                set_selected_menu={(menu) => setSelectedMenu(menu)}
                show_edit_menu_modal={() => setEditMenuModalShow(true)}
                delete_menu={(menu) => deleteMenu(menu)}
            />)
    } else {
        menuComponent = (
            <WebComponent
                category={category}
                columns_table={categoryColumnsTable}
                // expanded_row_render={expandedRowRender}
                show_add_Category_Modal={() => setAddCategoryModal(true)}
                spin_loading={spinLoading}
                on_change_menu_status={onChangeMenuStatus}
                set_selected_menu={(menu) => setSelectedMenu(menu)}
                show_edit_menu_modal={() => setEditMenuModalShow(true)}
                delete_menu={(menu) => deleteMenu(menu)}
            />)
    }

    const hideAddCategoryModal = () => {
        setAddCategoryModal(false)
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleUpload = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setMenuform('promotedImage', info.file.originFileObj)
                setMenuImage(imageUrl)
            })
        }
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const setMenuform = (fieldName, value) => {
        // console.log
        setMenuForm({
            ...menuForm,
            [fieldName]: value
        })

        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[fieldName]) setErrors({
            ...errors,
            [fieldName]: null
        })
    }

    const addMenu = async () => {
        const { menuName, description, price, promotedImage } = menuForm
        let data = {
            //restaurant === restaurant id
            restaurant: restaurant_id,
            menu_category: selectedCategory.id,
            //name === Menu name
            name: menuName,
            description: description,
            price: price,
            image: promotedImage,
            is_active: true
        }
        setSpinLoading(true)
        partnerService.addMenu(data).then(() => {
            setMenuForm({
                menuName: '',
                description: '',
                price: ''
            })
            setMenuImage(defaultImage)
            getAllMenu()
        })
    }

    const editMenu = async (menuForm) => {
        const { menuName, description, price, menuImage, categoryId, menuId } = menuForm
        let menuImageFormData
        if (menuImage === undefined) {
            menuImageFormData = null
        } else {
            menuImageFormData = menuImage
        }
        let data = {
            //// remark : restaurant === restaurant id
            restaurant: restaurant_id,
            menu_category: categoryId,
            //// remark : name === Menu name
            name: menuName,
            description: description,
            price: price,
            image: menuImageFormData,
            is_active: true
        }
        console.log(data)
        setSpinLoading(true)
        partnerService.editMenu(data, menuId).then(() => {
            getAllMenu()
        })
    }

    return (
        <>
            {menuComponent}
            <AddCategoryModal
                show={addCategoryModal}
                onHide={hideAddCategoryModal}
                add_category={handleAddCategory}
            />
            <EditCategoryModal
                show={editCategoryModal}
                onHide={() => setEditCategoryModal(false)}
                edit_category={handleEditCategory}
                category={selectedCategory}
            />
            <AddMenuModal
                show={addMenuModalShow}
                onHide={() => setAddMenuModalShow(false)}
                title={selectedCategory}
                category={selectedCategory}
                menu_image={menuImage}
                default_image={defaultImage}
                check_before_upload={beforeUpload}
                handle_upload={handleUpload}
                menu_form={menuForm}
                errors={errors}
                set_errors={setErrors}
                add_menu={addMenu}
                set_form={setMenuform}
            />
            <EditMenuModal
                show={editMenuModalShow}
                onHide={() => setEditMenuModalShow(false)}
                menu={selectedMenu}
                edit_menu={editMenu}
            />
        </>

    )
}