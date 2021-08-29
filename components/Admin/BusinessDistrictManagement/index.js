
import 'antd/dist/antd.css';
import { Table, Space, Switch, Tag, message, Spin, Popconfirm } from 'antd';
import { Button } from 'react-bootstrap'
import React, { useEffect } from 'react'
import adminService from '../../../services/admin'
import AddBusinessDistrictModal from '../../Modal/AddBusinessDistrictModal'
import EditBusinessDistrictModal from '../../Modal/EditBusinessDistrictModal'
import uploadService from '../../../services/upload'

export default function BusinessDistrictManagement(props) {

    const { current_tab } = props
    const [businessDistrictData, setBusinessDistrictData] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [addBusienssDistrictModalShow, setAddBusienssDistrictModalShow] = React.useState(false)
    const [editBusienssDistrictModalShow, setEditBusienssDistrictModalShow] = React.useState(false)
    const [businessDistrictSelected, setBusinessDistrictSelected] = React.useState()

    useEffect(() => {
        if (current_tab === 'businessDistrict') {
            getAllLocation()
        }
    }, [current_tab])

    const getAllLocation = async () => {
        setLoading(true)
        let locationArray = await adminService.getAllLocation()
        locationArray.map((location, index) => {
            location.no = index + 1
        })
        setLoading(false)
        setBusinessDistrictData(locationArray)
    }

    const columnsAccount = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Action',
            key: 'action',
            render: (businessDistrict, record) => (
                <Space size="middle">
                    <Switch checked={businessDistrict.is_active} onChange={(checked) => onChangeBusinessDistrictStatus(checked, businessDistrict)} />
                    <Tag color="green" key={record.length} style={{ cursor: "pointer" }} onClick={() => (setBusinessDistrictSelected(businessDistrict), setEditBusienssDistrictModalShow(true))}>
                        Edit
                    </Tag>
                    <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteBusinessDistrict(businessDistrict.id)}>
                        <a style={{ color: "#1890ff" }}>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    const onChangeBusinessDistrictStatus = (checked, businessDistrict) => {
        const { name, title, description, location, image_url_formData } = businessDistrict
        let data = {
            name: name,
            title: title,
            description: description,
            location: location,
            image_url: image_url_formData,
            is_active: checked
        }

        adminService.editBusinessDistrict(data, businessDistrict.id).then(() => {
            getAllLocation()
            message.success('Update status successful.')
        }).catch(error => {
            console.log('onChangeBusinessDistrictStatus error', error)
            message.error('Cannot update status.')
        })
    }

    const onDeleteBusinessDistrict = (businessDistrictId) => {
        setLoading(true)
        adminService.deleteBusinessDistrict(businessDistrictId).then(() => {
            setLoading(false)
            getAllLocation()
            message.success('Delete business district successful.')
        }).catch(error => {
            setLoading(false)
            console.log('onChangeBusinessDistrictStatus error', error)
            message.error('Cannot update status.')
        })
    }

    const addBusinessDistrict = async (formData) => {
        setLoading(true)
        console.log('formData', formData)
        let image_url = await uploadService.uploadImage(formData.image_base64)
        console.log('image_url', image_url)
        const { name, title, description, location } = formData
        let data = {
            name: name,
            title: title,
            description: description,
            location: location,
            image_url: image_url,
            is_active: true
        }
        adminService.addBusinessDistrict(data).then(() => {
            setLoading(false)
            message.success('Add new business district successful.')
            getAllLocation()
        }).catch(error => {
            setLoading(false)
            console.log('error', error)
            message.error('Cannot add new business district. Please try again.')
        })
    }

    const editBusinessDistrict = async (formData) => {
        const { name, title, description, location, image_url, is_active } = formData
        console.log('formData', formData)
        let image_url_formData
        if (formData.image_base64) {
            image_url_formData = await uploadService.uploadImage(formData.image_base64)
        } else {
            image_url_formData = image_url
        }

        let data = {
            name: name,
            title: title,
            description: description,
            location: location,
            image_url: image_url_formData,
            is_active: is_active
        }
        try {
            let response = await adminService.editBusinessDistrict(data, businessDistrictSelected.id)
            console.log('response', response)
            if (response) {
                getAllLocation()
                message.success('Edit business district successful.')
            } else {
                message.error('Cannot edit business district. Please try again.')
            }
        } catch (error) {
            console.log('editBusinessDistrict error', error)
        }

    }




    return (
        <>
            <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#78100E", padding: "15px", textAlign: "center" }}>
                Business District Management
            </div>
            <div style={{ textAlign: "right", marginBottom: "20px" }}>
                <Button type='primary' onClick={() => setAddBusienssDistrictModalShow(true)}>
                    New Business District
                </Button>
            </div>
            <Spin spinning={loading} tip="Loading...">
                <Table columns={columnsAccount} dataSource={businessDistrictData} scroll={{ x: 'max-content' }} />
            </Spin>
            <AddBusinessDistrictModal
                show={addBusienssDistrictModalShow}
                onHide={() => setAddBusienssDistrictModalShow(false)}
                add_business_district={addBusinessDistrict}
            />
            <EditBusinessDistrictModal
                show={editBusienssDistrictModalShow}
                onHide={() => setEditBusienssDistrictModalShow(false)}
                edit_business_district={(formData) => editBusinessDistrict(formData)}
                businessDistrictSelected={businessDistrictSelected}
            />
        </>
    )
}