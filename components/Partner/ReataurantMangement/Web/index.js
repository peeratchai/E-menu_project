import styles from './index.module.css'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { message } from 'antd'
import React, { useEffect } from 'react'
import Draggable from "react-draggable";
import AddTableModal from '../../../Modal/AddTable'
import ViewOrderModal from '../../../Modal/ViewOrderModal'
import partnerSerivce from '../../../../services/partner'
import { mappingTableImage } from '../../../../masterData/mappingTableImage'

export default function WebComponent(props) {
    const { zone, restaurant_id } = props
    const { get_zone } = props
    const refTableManagement = React.createRef()
    const [containerWidth, setContainerWidth] = React.useState();
    const [containerHeight, setContainerHeight] = React.useState();
    const [table, setTable] = React.useState([]);
    const [addTableModalShow, setAddTableModalShow] = React.useState(false);
    const [tableSelected, setTableSelected] = React.useState();
    const [viewOrderModalShow, setViewOrderModalShow] = React.useState(false);
    const [dragging, setDragging] = React.useState(false);
    const [zoneSelected, setZoneSelected] = React.useState();
    const [initialTable, setInitialTable] = React.useState(3);
    const [TableManagementComponent, setTableManagementComponent] = React.useState();

    useEffect(() => {
        let containerWidth = refTableManagement.current.offsetWidth
        // 50 is padding left and right
        setContainerWidth(containerWidth - 50)
        let containerHeight = refTableManagement.current.offsetHeight
        // 50 is padding top and bottom
        setContainerHeight(containerHeight - 50)
        if (Array.isArray(zone)) {
            if (zone.length > 0) {
                setZoneSelected(zone[0])
                ratioTableImages(containerWidth, containerHeight, zone[0]);
            } else {
                message.warning('Zone not found.')
            }

        }
    }, [props])

    const ratioTableImages = (width, height, zone) => {

        let tablesInZone = zone.restaurant_tables
        let tableImage
        console.log('before', tablesInZone)
        if (Array.isArray(tablesInZone)) {
            tablesInZone.map((table, index) => {
                tableImage = mappingTableImage.filter((mappingData) => mappingData.size === table.size && mappingData.type === table.type)
                table.image = tableImage[0].image
                table.tableNumber = index + 1
                table.position_x = parseFloat(table.position_x)
                table.position_y = parseFloat(table.position_y)
                table.real_position_x = calulateRealPositionX(table.position_x)
                table.real_position_y = calulateRealPositionY(table.position_y)
                table.zoneId = zone.id
            })
        }
        console.log('after', tablesInZone)

        setTable(tablesInZone)
    }

    let zoneDropdown = zone && zone.map((zone) => (
        <option value={zone}>{zone.name}</option>
    ))

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
    const calulatePercentagePositionX = (position_x) => {
        if (position_x <= 0) {
            return 0
        } else {
            return ((position_x + ((containerWidth / 10) / 2)) * 100) / containerWidth
        }
    }
    const calulatePercentagePositionY = (position_y) => {
        if (position_y <= 0) {
            return 0
        } else {
            return ((position_y + ((containerHeight / 10) / 2)) * 100) / containerHeight
        }
    }

    const onStop = (event, data, tableData, tableIndex) => {

        let position_x = data.x
        let position_y = data.y
        console.log(position_x)
        console.log(position_y)
        if (!dragging) {
            onClickTable(tableData)
        }
        setDragging(false)

        let tables = [...table]
        // let tempTable = {
        //     ...tables[tableIndex],
        //     position_x: calulatePercentagePositionX(position_x),
        //     position_y: calulatePercentagePositionY(position_y)
        // };
        let tempTable = {
            ...tables[tableIndex],
            position_x: position_x,
            position_y: position_y
        };
        tables[tableIndex] = tempTable;
        console.log('new tables', tables)
        setTable(tables)

    }

    const addTable = async (tableData) => {
        let data = {
            "zone": zoneSelected.id,
            "name": tableData.name,
            "type": tableData.type,
            "size": tableData.size,
            "position_x": tableData.position_x,
            "position_y": tableData.position_y,
            "is_active": true
        }
        console.log(data)
        let response = await partnerSerivce.addTable(data)
        console.log(response)
        if (response) {
            get_zone()
            message.success('Add new table successful.')
        } else {
            message.error('Cannot new table.')
        }

    }


    let tableManagement = table.map((table, tableIndex) =>
        <Draggable
            bounds="parent"
            defaultPosition={{ x: 0, y: 0 }}
            position={{ x: table.position_x, y: table.position_y }}
            onDrag={() => setDragging(true)}
            onStop={(event, data) => onStop(event, data, table, tableIndex)}
        >
            <div style={{ width: containerWidth / 10, height: containerHeight / 5, cursor: "pointer", backgroundImage: `url(${table.image})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: 'contain' }}  >
                <div className={styles.tableNumber} >
                    {table.name}
                </div>
            </div>
        </Draggable >
    )

    const updatePositionTable = async () => {

        let tables = table
        let tablesOnChangeData = []
        let data
        tables.map((table) => {
            if (calulateRealPositionX(table.position_x) !== table.real_position_x || calulateRealPositionY(table.position_y) !== table.real_position_y) {
                tablesOnChangeData.push(table)
            }
        })
        console.log('tablesOnChangeData', tablesOnChangeData)

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

            get_zone()
            message.success('Save table position successful.')
        }
    }

    const onChangeZone = (e) => {
        setZoneSelected(e.target.value)
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
                        <Button onClick={() => setAddTableModalShow(true)} style={{ marginRight: "10px" }}>
                            New table
                        </Button>
                        <Button onClick={() => updatePositionTable()}>
                            Save
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col style={{ height: "30rem" }} ref={refTableManagement}>
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
            />
        </div >
    )
}