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
    const { zone } = props
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
            setZoneSelected(zone[0])
            ratioTableImages(containerWidth, containerHeight, zone[0]);
        }
    }, [props, table])

    const ratioTableImages = (width, height, defaultZone) => {
        console.log('width', width)
        console.log('height', height)
        console.log('defaultZone', defaultZone)

        let tablesInZone = defaultZone.restaurant_tables
        let tableImage
        if (Array.isArray(tablesInZone)) {
            tablesInZone.map((table, index) => {
                tableImage = mappingTableImage.filter((mappingData) => mappingData.size === table.size && mappingData.type === table.type)
                table.image = tableImage[0].image
                table.tableNumber = index + 1
                table.position_x = parseFloat(table.position_x)
                table.position_y = parseFloat(table.position_y)
            })


            // let tableManagement = tablesInZone.map((table) =>
            //     <Draggable
            //         bounds="parent"
            //         defaultPosition={{ x: table.position_x, y: table.position_y }}
            //         onDrag={() => setDragging(true)}
            //         onStop={() => {
            //             if (!dragging) {
            //                 // onClick stuff here
            //                 onClickTable(table)
            //             }
            //             setDragging(false)
            //         }}
            //     >
            //         <div style={{ width: containerWidth / 10, height: containerHeight / 5, cursor: "pointer", backgroundImage: `url(${table.image})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: 'contain' }}  >
            //             <div className={styles.tableNumber} >
            //                 {table.name}
            //             </div>
            //         </div>
            //     </Draggable>
            // )

            // setTableManagementComponent(tableManagement)
        }

        setTable(tablesInZone)
    }

    let zoneDropdown = zone && zone.map((zone) => (
        <option value={zone}>{zone.name}</option>
    ))

    const onClickTable = (tableData) => {
        // your code
        setTableSelected(tableData.tableNumber)
        setViewOrderModalShow(true)
    }

    // const onStop = (tableData) => {
    //     console.log('onStop', dragging)
    //     setDragging(false)

    //     if (dragging) {
    //         onDrop()
    //     } else {
    //         onClick(tableData)
    //     }
    // }

    const onStop = (event, data, tableData, tableIndex) => {

        if (!dragging) {
            onClickTable(tableData)
        }
        setDragging(false)

        console.log('data.x', data.x)
        console.log('data.y', data.y)
        let newTableData = [...table]
        newTableData[tableIndex].position_x = data.x
        newTableData[tableIndex].position_y = data.y

        setTable(newTableData)

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
            defaultPosition={{ x: table.position_x, y: table.position_y }}
            onDrag={() => setDragging(true)}
            onStop={(event, data) => onStop(event, data, table, tableIndex)}
        // onStop={() => {
        //     if (!dragging) {
        //         // onClick stuff here
        //         onClickTable(table)
        //     }
        //     setDragging(false)
        // }}

        >
            <div style={{ width: containerWidth / 10, height: containerHeight / 5, cursor: "pointer", backgroundImage: `url(${table.image})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: 'contain' }}  >
                <div className={styles.tableNumber} >
                    {table.name}
                </div>
            </div>
        </Draggable>
    )

    return (
        <div className={styles.tab}>
            <Row>
                <Col xs={10}>
                    <Form>
                        <Form.Group controlId="zoneName">
                            <Form.Control
                                as="select"
                                custom
                                onChange={(e) => setZoneSelected(e.target.value)}
                            >
                                {zoneDropdown}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={2}>
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={() => setAddTableModalShow(true)}>
                            New table
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
                tableNumber={tableSelected}
            />
        </div>
    )
}