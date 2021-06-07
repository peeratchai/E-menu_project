import { Row, Col, Modal, Container } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Space, Button, Popconfirm, Select, Switch, message, Spin } from 'antd';
import React, { useEffect } from 'react'
import { EditableTable } from '../../TableAntdesign/tableAntdesign';
import adminService from '../../../services/admin'
const { Option } = Select;

export default function EditMasterDataModal(props) {

    const { get_master_data } = props

    const [categoryName, setCategoryName] = React.useState();
    const [masterData, setMasterData] = React.useState([]);
    const [dataSelected, setDataSelected] = React.useState("Category");
    const [loading, setLoading] = React.useState(false)
    useEffect(() => {
        setInitialMasterData()
    }, [])

    const setInitialMasterData = async () => {
        setLoading(true)
        adminService.getMasterFoodCategory().then((masterData) => {
            setLoading(false)
            setMasterData(masterData)
        }).catch((error) => {
            setLoading(false)
            console.log('error', error)
            message.error('An error has occurs.')
        })
    }

    const handleDeleteItem = async (masterDataId) => {
        console.log('masterDataId2', masterDataId)
        console.log('dataSelected', dataSelected)

        if (dataSelected === 'Category') {
            console.log(dataSelected)
            setLoading(true)
            await adminService.deleteMasterFoodCategory(masterDataId);
            adminService.getMasterFoodCategory().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
                get_master_data()
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot delete data.')
            })
        }

        if (dataSelected === 'National') {
            setLoading(true)
            await adminService.deleteNational(masterDataId);
            adminService.getMasterNational().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
                get_master_data()
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot delete data.')
            })
        }

        if (dataSelected === 'Food Kind') {
            setLoading(true)
            await adminService.deleteFoodKind(masterDataId);
            adminService.getMasterFoodKind().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
                get_master_data()
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot delete data.')
            })
        }

        if (dataSelected === 'Sub Kind') {
            setLoading(true)
            await adminService.deleteSubKind(masterDataId);
            adminService.getMasterSubKind().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
                get_master_data()
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot delete data.')
            })
        }

        if (dataSelected === 'Cook Method') {
            setLoading(true)
            await adminService.deleteCookMethod(masterDataId);
            adminService.getMasterCookMethod().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
                get_master_data()
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot delete data.')
            })
        }


    };

    const onChangeMasterDataStatus = async (checked, masterData) => {
        console.log('checked', checked)
        console.log('masterData', masterData)

        let masterDataId = masterData.id
        let data = {
            "name": masterData.name,
            "is_active": checked
        }

        if (dataSelected === 'Category') {
            setLoading(true)
            await adminService.updateMasterFoodCategory(masterDataId, data);
            adminService.getMasterFoodCategory().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
                get_master_data()
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        if (dataSelected === 'National') {
            setLoading(true)
            await adminService.updateMasterNational(masterDataId, data);
            adminService.getMasterNational().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
                get_master_data()
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        if (dataSelected === 'Food Kind') {
            setLoading(true)
            await adminService.updateMasterFoodKind(masterDataId, data);
            adminService.getMasterFoodKind().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
                get_master_data()
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        if (dataSelected === 'Sub Kind') {
            setLoading(true)
            await adminService.updateMasterSubKind(masterDataId, data);
            adminService.getMasterSubKind().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
                get_master_data()
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        if (dataSelected === 'Cook Method') {
            setLoading(true)
            await adminService.updateMasterCookMethod(masterDataId, data);
            adminService.getMasterCookMethod().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
                get_master_data()
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '60%',
            editable: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (masterData) => (
                <Space size="middle">
                    <Switch checked={masterData.is_active} onChange={(checked) => onChangeMasterDataStatus(checked, masterData)} />
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteItem(masterData.id)}>
                        <a style={{ color: "#1890ff" }}>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        }
    ];

    const EditDataTable = async (newData, newItem) => {
        console.log('newData', newData)
        console.log('newItem', newItem)

        let masterDataId = newItem.id
        let data = {
            "name": newItem.name,
            "is_active": newItem.is_active
        }

        if (dataSelected === 'Category') {
            setLoading(true)
            await adminService.updateMasterFoodCategory(masterDataId, data);
            adminService.getMasterFoodCategory().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        if (dataSelected === 'National') {
            setLoading(true)
            await adminService.updateMasterNational(masterDataId, data);
            adminService.getMasterNational().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        if (dataSelected === 'Food Kind') {
            setLoading(true)
            await adminService.updateMasterFoodKind(masterDataId, data);
            adminService.getMasterFoodKind().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        if (dataSelected === 'Sub Kind') {
            setLoading(true)
            await adminService.updateMasterSubKind(masterDataId, data);
            adminService.getMasterSubKind().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        if (dataSelected === 'Cook Method') {
            setLoading(true)
            await adminService.updateMasterCookMethod(masterDataId, data);
            adminService.getMasterCookMethod().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }
    };

    const onChangeDataType = async (dataSelected) => {
        console.log('search:', dataSelected);

        if (dataSelected === 'Category') {
            setLoading(true)
            adminService.getMasterFoodCategory().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        if (dataSelected === 'National') {
            setLoading(true)
            adminService.getMasterNational().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        if (dataSelected === 'Food Kind') {
            setLoading(true)
            adminService.getMasterFoodKind().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        if (dataSelected === 'Sub Kind') {
            setLoading(true)
            adminService.getMasterSubKind().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        if (dataSelected === 'Cook Method') {
            setLoading(true)
            adminService.getMasterCookMethod().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot update status.')
            })
        }

        setDataSelected(dataSelected)
    }

    const addNewItem = async () => {
        let data = {
            "name": 'New ' + dataSelected,
            "is_active": true
        }

        if (dataSelected === 'Category') {
            setLoading(true)
            await adminService.addMasterFoodCategory(data);
            adminService.getMasterFoodCategory().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot add status.')
            })
        }

        if (dataSelected === 'National') {
            setLoading(true)
            await adminService.addMasterNational(data);
            adminService.getMasterNational().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot add status.')
            })
        }

        if (dataSelected === 'Food Kind') {
            setLoading(true)
            await adminService.addMasterFoodKind(data);
            adminService.getMasterFoodKind().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot add status.')
            })
        }

        if (dataSelected === 'Sub Kind') {
            setLoading(true)
            await adminService.addMasterSubKind(data);
            adminService.getMasterSubKind().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot add status.')
            })
        }

        if (dataSelected === 'Cook Method') {
            setLoading(true)
            await adminService.addMasterCookMethod(data);
            adminService.getMasterCookMethod().then((masterData) => {
                setLoading(false)
                setMasterData(masterData)
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                message.error('Cannot add status.')
            })
        }
    };

    return (

        <Modal
            {...props}
            dialogClassName="menuModal-60w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    <b>{props.title}</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <Select
                                showSearch
                                style={{ width: 200, marginRight: "10px" }}
                                placeholder="Select a data type to handle"
                                optionFilterProp="children"
                                value={dataSelected}
                                onChange={(value) => onChangeDataType(value)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Category">Category</Option>
                                <Option value="National">National</Option>
                                <Option value="Food Kind">Food Kind</Option>
                                <Option value="Sub Kind">Sub Kind</Option>
                                <Option value="Cook Method">Cook Method</Option>
                            </Select>
                        </Col>
                        <Col>
                            <div style={{ textAlign: "right" }}>
                                <Button onClick={() => addNewItem()} type="primary">
                                    Add new item
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "15px" }}>
                        <Col>
                            <Spin spinning={loading} tip='Loading...'>
                                <EditableTable
                                    columns={columns}
                                    dataSource={masterData}
                                    edit={(newData, newItem) => EditDataTable(newData, newItem)}
                                />
                            </Spin>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}