import styles from './index.module.css'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { message } from 'antd'
import React, { useEffect } from 'react'
import Draggable from "react-draggable";
import AddTableModal from '../../../Modal/AddTable'
import ViewOrderModal from '../../../Modal/ViewOrderModal'
import partnerSerivce from '../../../../services/partner'

export default function WebComponent(props) {
    const { zone } = props
    const refTableManagement = React.createRef()
    const [containerWidth, setContainerWidth] = React.useState();
    const [table, setTable] = React.useState();
    const [addTableModalShow, setAddTableModalShow] = React.useState(false);
    const [tableSelected, setTableSelected] = React.useState();
    const [viewOrderModalShow, setViewOrderModalShow] = React.useState(false);
    const [dragging, setDragging] = React.useState(false);
    const [zoneSelected, setZoneSelected] = React.useState();
    const [initialTable, setInitialTable] = React.useState(3);

    useEffect(() => {
        let containerWidth = refTableManagement.current.offsetWidth
        setContainerWidth(containerWidth)
        let containerHeight = refTableManagement.current.offsetHeight
        if (zone && zone.length > 0) {
            setZoneSelected(zone[0])
        }
        ratioTableImages(containerWidth, containerHeight);
    }, [props])

    const ratioTableImages = (width, height) => {
        let realWidth = width / 10
        // let realHeight = height / 10
        setTable(
            [
                {
                    tableNumber: 1,
                    tableImage: '/images/table-triangle-M.png',
                    x: 0,
                    y: 0
                },
                {
                    tableNumber: 2,
                    tableImage: '/images/tab    le-square-M.png',
                    x: realWidth + 15,
                    y: -realWidth
                },
                {
                    tableNumber: 3,
                    tableImage: '/images/table-square-L.png',
                    x: (realWidth * 2) + 15,
                    y: -(realWidth * 2)
                }
            ]
        )
    }

    let zoneDropdown = zone && zone.map((zone) => (
        <option value={zone}>{zone.name}</option>
    ))

    const onClick = (data) => {
        // your code
        setTableSelected(data.tableNumber)
        setViewOrderModalShow(true)
    }

    const onDrop = (event) => {
        // your code
    }

    const onDrag = () => {
        setDragging(true)
    }

    const onStop = (data) => {
        setDragging(false)
        if (dragging) {
            onDrop()
        } else {
            onClick(data)
        }
    }


    let tableManagement = table && table.map((data) =>
        <Draggable
            bounds="parent"
            defaultPosition={{ x: data.x, y: data.y }}
            onDrag={() => onDrag()}
            onStop={() => onStop(data)}
        >
            <div style={{ width: containerWidth / 10, height: containerWidth / 10, cursor: "pointer", backgroundImage: `url(${data.tableImage})`, backgroundSize: 'contain' }}  >
                <div className={styles.tableNumber} >
                    {data.tableNumber}
                </div>
            </div>
        </Draggable>
    )

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
            message.success('Add new table successful.')
        } else {
            message.error('Cannot new table.')
        }

    }

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
                    <Button onClick={() => setAddTableModalShow(true)}>
                        Add table
                    </Button>
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