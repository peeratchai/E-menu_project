import Container from 'react-bootstrap/Container'
import { Button } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { Table, Spin, Space, Popconfirm, message, Switch } from 'antd';
import React, { useEffect } from 'react'
import partnerSerivce from '../../../services/partner'
import AddZoneModal from '../../../components/Modal/AddZoneModal'
import EditZoneModal from '../../../components/Modal/EditZoneModal'
import EditTableModal from '../../../components/Modal/EditTable'
import ViewTableQRCode from '../../Modal/ViewTableQRCode';

export default function ZoneManagement({ restaurant_id, current_tab }) {

    const [loading, setLoading] = React.useState(false);
    const [zone, setZone] = React.useState([])
    const [showAddZoneModal, setShowAddZoneModal] = React.useState(false)
    const [showEditZoneModal, setShowEditZoneModal] = React.useState(false)
    const [zoneSelected, setZoneSelected] = React.useState([])
    const [editTableModalShow, setEditTableModalShow] = React.useState(false);
    const [tableSelected, setTableSelected] = React.useState({ name: '', id: '', size: 'small', type: 'square' });
    const [viewTableQRCodeModalShow, setViewTableQRCodeModalShow] = React.useState(false);
    const [restaurantName, setRestaurantName] = React.useState();
    useEffect(() => {
        if (restaurant_id && current_tab === 'zone') {
            getZone()
        }
    }, [current_tab])

    const getZone = async () => {
        setLoading(true)
        partnerSerivce.getZoneByRestaurantId(restaurant_id).then((allZone) => {
            console.log('allZone', allZone)
            allZone.map((zone, zoneIndex) => {
                if (zoneIndex === 0) {
                    setRestaurantName(zone.restaurant.name)
                }

                zone.index = (zoneIndex + 1)
                zone.key = zone.name + zoneIndex
            })
            setZone(allZone)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            message.error('An error has occurred. Please try again.')
            setLoading(false)
        })
    }

    const confirmDeleteZone = async (zone) => {
        let response = await partnerSerivce.deleteZone(zone.id)
        console.log(response)
        if (response) {
            message.success('Deleted zone successful.')
            getZone()
        } else {
            message.error('Cannot delete zone.')
        }
    }

    const confirmDeleteTable = async (table) => {
        let response = await partnerSerivce.deleteTable(table.id)
        console.log(response)
        if (response) {
            message.success('Deleted table successful.')
            getZone()
        } else {
            message.error('Cannot delete table.')
        }
    }

    const zoneColumns = [
        { title: 'No', dataIndex: 'index', key: 'index' },
        { title: 'Zone', dataIndex: 'name', key: 'name' },
        {
            title: 'Action',
            key: 'action',
            render: (zone) => (
                <Space size="middle">
                    <Switch checked={zone.is_active} onChange={(checked) => onChangeZoneStatus(checked, zone)} />
                    <Button variant="success" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }} onClick={() => (setZoneSelected(zone), setShowEditZoneModal(true))}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this zone?"
                        onConfirm={() => confirmDeleteZone(zone)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button variant="danger" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const onEditTable = (table) => {
        setTableSelected(table)
        setEditTableModalShow(true)
    }

    const onViewQRCode = (table) => {
        console.log(process.env.URL + "/menuFeeding/restaurantList/" + restaurantName + "?restaurantId=" + restaurant_id + "&tableId=" + table.id)
        setTableSelected(table)
        setViewTableQRCodeModalShow(true)
    }

    const editTable = async (table) => {
        setEditTableModalShow(false)
        console.log('table', table)
        let data = {
            "zone": table.zone,
            "name": table.name,
            "type": table.type,
            "size": table.size,
            "position_x": table.position_x,
            "position_y": table.position_y,
            "is_active": table.is_active
        }

        let response = await partnerSerivce.editTable(data, table.id)
        console.log(response)
        if (response) {
            getZone()
            message.success('Edit table successful.')
        } else {
            message.error('Cannot edit table.')
        }
    }

    const expandedRowRender = (record) => {
        const columns = [
            { title: 'No', dataIndex: 'index', key: 'index' },
            { title: 'Table name', dataIndex: 'name', key: 'name' },
            {
                title: 'Action',
                key: 'action',
                render: (table) => (
                    <Space size="middle">
                        <Switch defaultChecked checked={zone.is_active} onChange={(checked) => onChangeTableStatus(checked, zone)} />
                        <Button variant="success" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }} onClick={() => onEditTable(table)}>Edit</Button>
                        <Popconfirm
                            title="Are you sure to delete this table?"
                            onConfirm={() => confirmDeleteTable(table)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button variant="danger" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }}>Delete</Button>
                        </Popconfirm>
                        <Button variant="success" style={{ fontSize: "12px", padding: "0.2rem 0.5rem" }} onClick={() => onViewQRCode(table)}>QR Code</Button>
                    </Space>
                ),
            },
        ];

        let tables = record.restaurant_tables;
        tables.map((table, index) => {
            table.zone = record.id
            table.index = (index + 1)
            table.key = table.name + index
        })
        return <Table columns={columns} dataSource={tables} pagination={false} />;
    };

    const addZone = async (zoneName) => {
        let data = {
            'restaurant': restaurant_id,
            'name': zoneName,
            'is_active': true
        }
        try {
            await partnerSerivce.addZone(data)
            message.success('Add new zone successful.')
            getZone()
        } catch (error) {
            console.log(error)
            message.error('Cannot new zone.')
        }
    }


    const onChangeZoneStatus = async (checked, zone) => {
        let data = {
            'restaurant': restaurant_id,
            'name': zone.name,
            'is_active': checked
        }
        let response = await partnerSerivce.editZone(data, zone.id)
        console.log(response)
        if (!response) {
            message.error('Cannot new zone.')
        } else {
            message.success('Edit zone successful.')
            getZone()
        }
    }

    const editZone = async (zone) => {
        let data = {
            'restaurant': restaurant_id,
            'name': zone.name,
            'is_active': zone.is_active
        }
        let response = await partnerSerivce.editZone(data, zone.id)
        console.log(response)
        if (!response) {
            message.error('Cannot new zone.')
        } else {
            message.success('Edit zone successful.')
            getZone()
        }
    }

    return (
        <>
            <div style={{ color: 'white', marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px", textAlign: "center" }}>
                Zone Management
            </div>
            <div style={{ textAlign: "right", padding: "15px" }}>
                <Button type="primary" onClick={() => setShowAddZoneModal(true)}>
                    New Zone
                </Button>
            </div>
            <Spin spinning={loading} tip="Loading...">
                <Table columns={zoneColumns} dataSource={zone} expandable={{ expandedRowRender }} scroll={{ x: 'max-content' }} />
            </Spin>
            <AddZoneModal
                show={showAddZoneModal}
                onHide={() => setShowAddZoneModal(false)}
                add_zone={addZone}
            />
            <EditZoneModal
                show={showEditZoneModal}
                onHide={() => setShowEditZoneModal(false)}
                edit_zone={editZone}
                zone={zoneSelected}
            />
            <EditTableModal
                show={editTableModalShow}
                onHide={() => setEditTableModalShow(false)}
                table_selected={tableSelected}
                edit_table={editTable}
            />
            <ViewTableQRCode
                show={viewTableQRCodeModalShow}
                onHide={() => setViewTableQRCodeModalShow(false)}
                table_selected={tableSelected}
                restaurant_name={restaurantName}
                restaurant_id={restaurant_id}
            />
        </>
    );
}