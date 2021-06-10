import styles from './index.module.css'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { message, Popover } from 'antd'
import React, { useEffect } from 'react'
import Draggable from "react-draggable";
import AddTableModal from '../../../Modal/AddTable'
import ViewOrderModal from '../../../Modal/ViewOrderModal'
import partnerSerivce from '../../../../services/partner'
import { mappingTableImage } from '../../../../masterData/mappingTableImage'
import utilStyles from '../../../../styles/utils.module.css'
import Link from 'next/link'

export default function WebComponent(props) {
    const { zone, restaurant_id, restaurant_name, zone_number_selected } = props
    const { get_zone } = props
    const refTableManagement = React.createRef()
    const [containerWidth, setContainerWidth] = React.useState();
    const [containerHeight, setContainerHeight] = React.useState();
    const [table, setTable] = React.useState([]);
    const [addTableModalShow, setAddTableModalShow] = React.useState(false);
    const [tableSelected, setTableSelected] = React.useState();
    const [viewOrderModalShow, setViewOrderModalShow] = React.useState(false);
    const [dragging, setDragging] = React.useState(false);
    const [zoneNumberSelected, setZoneNumberSelected] = React.useState(zone_number_selected);
    const [zoneSelected, setZoneSelected] = React.useState()
    const [disable, setDisable] = React.useState(true)
    useEffect(() => {
        let containerWidth = refTableManagement.current.offsetWidth
        // 50 is padding left and right
        setContainerWidth(containerWidth - 50)
        let containerHeight = refTableManagement.current.offsetHeight
        // 50 is padding top and bottom
        setContainerHeight(containerHeight - 50)
        if (Array.isArray(zone)) {
            if (zone.length > 0) {
                console.log('zone', zone[zone_number_selected])
                setZoneSelected(zone[zone_number_selected])
                ratioTableImages(zone[zone_number_selected]);
                message.success('Loading zone successful.')
            } else {
                console.log('zone not found')
                setZoneSelected(undefined)
                setTable([])
            }
        }
        if (restaurant_id) {
            setDisable(false)
        }
    }, [zone])

    const ratioTableImages = (zone) => {

        let tablesInZone = zone.restaurant_tables
        let tableImage
        if (Array.isArray(tablesInZone)) {
            tablesInZone.forEach((table, index) => {
                tableImage = mappingTableImage.find((mappingData) => mappingData.size === table.size && mappingData.type === table.type)
                table.image = tableImage.image
                table.tableNumber = index + 1
                table.position_x = parseFloat(table.position_x)
                table.position_y = parseFloat(table.position_y)
                table.real_position_x = calulateRealPositionX(table.position_x)
                table.real_position_y = calulateRealPositionY(table.position_y)
                table.zoneId = zone.id
            })
        }

        setTable(tablesInZone)
    }

    let zoneDropdown = zone && zone.map((zone) => {
        return (
            <option value={zone.id}>{zone.name}</option>
        )
    }
    )

    const onClickTable = (tableData) => {
        // your code
        setTableSelected(tableData)
        setViewOrderModalShow(true)
    }

    const calulateRealPositionX = (position_x) => {

        if (position_x <= 0) {
            return 0
        } else {
            let realPosition_x = ((containerWidth * position_x) / 100) - ((containerWidth / 10) / 2)
            return realPosition_x
        }

    }
    const calulateRealPositionY = (position_y) => {
        if (position_y <= 0) {
            return 0
        } else {
            let realPosition_y = ((containerHeight * position_y) / 100) - ((containerHeight / 5) / 2)
            return realPosition_y
        }
    }

    const onStop = (event, data, tableData, tableIndex) => {

        let position_x = data.x
        let position_y = data.y
        // if (!dragging) {
        //     onClickTable(tableData)
        // }
        setDragging(false)

        let tables = [...table]
        let tempTable = {
            ...tables[tableIndex],
            position_x: position_x,
            position_y: position_y
        };
        tables[tableIndex] = tempTable;
        setTable(tables)

    }

    const addTable = async (tableData) => {
        if (restaurant_id) {
            if (zoneSelected !== undefined) {
                let data = {
                    "zone": zoneSelected.id,
                    "name": tableData.name,
                    "type": tableData.type,
                    "size": tableData.size,
                    "position_x": tableData.position_x,
                    "position_y": tableData.position_y,
                    "is_active": true
                }
                let response = await partnerSerivce.addTable(data)
                if (response) {
                    get_zone(zoneNumberSelected)
                    message.success('Add new table successful.')
                } else {
                    message.error('Cannot new table.')
                }
            } else {
                message.error('Please select zone before adding new table.')
            }
        } else {
            message.warning('Please select restaurant.')
        }
    }

    const contentTablePopover = (tableData) => {
        return (
            <div>
                <a className={utilStyles.font_size_sm} style={{ lineHeight: 2 }} onClick={() => onClickTable(tableData)}>View All Order</a>
                <br />
                <Link
                    href={{
                        pathname: '/menuFeeding/restaurantList/' + restaurant_name,
                        query: { restaurantId: restaurant_id, tableId: tableData.id },
                    }}
                >
                    <a className={utilStyles.font_size_sm} style={{ lineHeight: 2 }}>Take new order</a>
                </Link>
            </div>
        )
    }



    let tableManagement = table.map((table, tableIndex) =>
        <Draggable
            bounds="parent"
            defaultPosition={{ x: 0, y: 0 }}
            position={{ x: table.position_x, y: table.position_y }}
            onDrag={() => setDragging(true)}
            onStop={(event, data) => onStop(event, data, table, tableIndex)}
        >
            <div style={{ position: "absolute", width: containerWidth / 10, height: containerHeight / 5, cursor: "pointer", backgroundImage: `url(${table.image})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: 'contain' }}  >
                <Popover placement="topLeft" title={table.name} content={contentTablePopover(table)} trigger="click">
                    <div className={styles.tableNumber} >
                        {table.name}
                    </div>
                </Popover>
            </div>

        </Draggable >
    )

    const updatePositionTable = async () => {

        if (restaurant_id) {
            let tables = table
            let tablesOnChangeData = []
            let data
            tables.map((table) => {
                if (calulateRealPositionX(table.position_x) !== table.real_position_x || calulateRealPositionY(table.position_y) !== table.real_position_y) {
                    tablesOnChangeData.push(table)
                }
            })

            if (tablesOnChangeData.length > 0) {
                await Promise.all(tablesOnChangeData.map(async (table) => {
                    data = {
                        "zone": table.zoneId,
                        "name": table.name,
                        "type": table.type,
                        "size": table.size,
                        "position_x": (table.position_x).toString(),
                        "position_y": (table.position_y).toString(),
                        "is_active": true
                    }
                    console.log(data)
                    await partnerSerivce.editTable(data, table.id)
                }))

                get_zone(zoneNumberSelected)
                message.success('Save table position successful.')
            }
        } else {
            message.warning('Please select restaurant.')
        }

    }

    const onChangeZone = (e) => {
        let zoneId = e.target.value
        let zoneDetails = zone.find(zone => zone.id === zoneId)
        let zoneIndex = zone.findIndex(zone => zone.id === zoneId)
        setZoneNumberSelected(zoneIndex)
        setZoneSelected(zoneDetails)
        ratioTableImages(zoneDetails)
    }

    return (
        <div className={styles.tab}>
            <Row>
                <Col xs={8}>
                    <Form>
                        <Form.Group controlId="zoneName">
                            <Form.Control
                                as="select"
                                custom
                                onChange={(e) => onChangeZone(e)}
                            >
                                {zoneDropdown}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={4}>
                    <div style={{ textAlign: "right" }}>
                        <Button disabled={disable} onClick={() => setAddTableModalShow(true)} style={{ marginRight: "10px" }}>
                            New table
                        </Button>
                        <Button disabled={disable} onClick={() => updatePositionTable()}>
                            Save
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col style={{ height: "35rem" }} ref={refTableManagement}>
                    <div className={styles.container}>
                        {tableManagement}
                    </div>
                </Col>
            </Row>
            <AddTableModal
                show={addTableModalShow}
                onHide={() => setAddTableModalShow(false)}
                add_table={addTable}
            />
            <ViewOrderModal
                show={viewOrderModalShow}
                onHide={() => setViewOrderModalShow(false)}
                table_selected={tableSelected}
                restaurant_id={restaurant_id}
                zone_details={zoneSelected}
            />
        </div >
    )
}