import styles from './index.module.css'
import { Row, Col, Image, Button, Tab, Tabs, Form } from 'react-bootstrap'
import { message, Popconfirm, Spin, Select } from 'antd'
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import partnerService from '../../../../services/partner'
import EmptyComponent from '../../../Empty'
import utilStyles from '../../../../styles/utils.module.css'
import moment from 'moment'
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Link from 'next/link'

const { Option } = Select

export default function MobileComponent(props) {
    const { zone, restaurant_id, restaurant_name } = props
    const [loading, setLoading] = React.useState(false);
    const [zoneSelected, setZoneSelected] = React.useState({ id: null })
    const [orders, setOrders] = React.useState([])
    const [newOrderSelected, setNewOrderSelected] = React.useState({})
    const [haveNewOrder, setHaveNewOrder] = React.useState(false)
    const [tableNewOrderSelectedNumber, setTableNewOrderSelectedNumber] = React.useState()
    const [inOrderSelected, setInOrderSelected] = React.useState({})
    const [haveOrderInProcess, setHaveOrderInProcess] = React.useState(false)
    const [tableInOrderSelectedNumber, setTableInOrderSelectedNumber] = React.useState()
    const [completedOrderSelected, setCompletedOrderSelected] = React.useState({})
    const [haveOrderCompleted, setHaveOrderCompleted] = React.useState(false)
    const [tableCompletedOrderSelectedNumber, setTableCompletedOrderSelectedNumber] = React.useState()
    const [restaurantTable, setRestaurantTable] = React.useState([])
    const [tableIdSelected, setTableIdSelected] = React.useState(null)

    useEffect(() => {
        if (Array.isArray(zone)) {
            if (zone.length > 0) {
                console.log('zone', zone)
                setZoneSelected(zone[0])
                getOrder(zone[0])
            }
        }
    }, [props])

    const getOrder = async (zone = zoneSelected) => {
        setLoading(true)
        let zoneIdArray = []
        zoneIdArray.push(zone.id)
        let data = {
            "restaurant": restaurant_id,
            "restaurant_table": null,
            "zone": zoneIdArray
        }
        console.log(data)

        setRestaurantTable(zone.restaurant_tables)
        setTableIdSelected(zone.restaurant_tables[0].id)

        partnerService.getOrderByfilter(data).then((orders) => {
            console.log('order', orders)
            setInitailNewOrder(orders)
            setInitailInOrder(orders)
            setInitailCompletedOrder(orders)
            setOrders(orders)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            message.error('An error has occurred.Please try again.')
        })
    }


    const setInitailNewOrder = (orders) => {
        let haveNewOrder = false
        let IndexOfFirstOrder = 0
        let firstOrder, checkOrder
        orders.map((order, index) => {
            if (order.new_orders.length > 0) {
                checkOrder = order.new_orders.find((order) => order.status === 'New Order')
                if (checkOrder) {
                    // if checkOrder has value so it has new order
                    haveNewOrder = true
                    if (IndexOfFirstOrder === 0) {
                        IndexOfFirstOrder = index
                    }
                }
            }
        })

        if (!haveNewOrder) {
            setNewOrderSelected({})
            setTableNewOrderSelectedNumber(undefined)
        } else {
            firstOrder = orders[IndexOfFirstOrder].new_orders.find((order) => order.status === 'New Order')
            setNewOrderSelected(firstOrder)
            setTableNewOrderSelectedNumber(firstOrder.id)
        }
        setHaveNewOrder(haveNewOrder)
    }

    const setInitailInOrder = (orders) => {
        let haveOrderInProcess = false
        let IndexOfFirstOrder = 0
        let firstOrder, checkOrder
        orders.map((order, index) => {
            if (order.in_orders.length > 0) {
                checkOrder = order.new_orders.find((order) => order.status === 'In Order')
                if (checkOrder) {
                    // if checkOrder has value so it has order in process
                    haveOrderInProcess = true
                    if (IndexOfFirstOrder === 0) {
                        IndexOfFirstOrder = index
                    }
                }
            }
        })

        if (!haveOrderInProcess) {
            setInOrderSelected({})
            setTableInOrderSelectedNumber(undefined)
        } else {
            firstOrder = orders[IndexOfFirstOrder].in_orders.find((order) => order.status === 'In Order')
            setInOrderSelected(firstOrder)
            setTableInOrderSelectedNumber(firstOrder.id)
        }
        setHaveOrderInProcess(haveOrderInProcess)
    }

    const setInitailCompletedOrder = (orders) => {
        let haveOrderCompleted = false
        let IndexOfFirstOrder = 0
        let firstOrder, checkOrder
        orders.map((order, index) => {
            if (order.completed_orders.length > 0) {
                checkOrder = order.new_orders.find((order) => order.status === 'Completed')
                if (checkOrder) {
                    // if checkOrder has value so it has completed order
                    haveOrderCompleted = true
                    if (IndexOfFirstOrder === 0) {
                        IndexOfFirstOrder = index
                    }
                }
            }
        })

        if (!haveOrderCompleted) {
            setCompletedOrderSelected({})
            setTableCompletedOrderSelectedNumber(undefined)
        } else {
            firstOrder = orders[IndexOfFirstOrder].completed_orders.find((order) => order.status === 'Completed')
            setCompletedOrderSelected(firstOrder)
            setTableCompletedOrderSelectedNumber(firstOrder.id)
        }
        setHaveOrderCompleted(haveOrderCompleted)
    }



    const confirmTakeOrder = async (order_items, index) => {
        console.log('order_items', order_items)
        let orderId = order_items.id
        let response = await partnerService.takeOrder(orderId)
        console.log('response', response)
        if (response) {
            let newOrder = { ...newOrderSelected }
            let orderItems = [...newOrderSelected.order_items]
            orderItems.splice(index, 1)
            newOrder.order_items = orderItems
            setNewOrderSelected(newOrder)
            getOrder()
            message.success('Take order successful.')
        } else {
            message.error('Cannot take order.Please try again.')
        }

    }

    const confirmCompleteOrder = async (order_items, index) => {
        console.log('order_items', order_items)
        let orderId = order_items.id
        let response = await partnerService.completeOrder(orderId)
        console.log('response', response)
        if (response) {
            let inOrder = { ...inOrderSelected }
            let orderItems = [...inOrder.order_items]
            orderItems.splice(index, 1)
            inOrder.order_items = orderItems
            setInOrderSelected(inOrder)
            getOrder()
            message.success('Complete order successful.')
        } else {
            message.error('Cannot complete order.Please try again.')
        }
    }

    const confirmCancelNewOrder = async (order_items, index) => {
        console.log('order_items', order_items)
        let orderId = order_items.id
        let response = await partnerService.cancelOrder(orderId)
        console.log('response', response)
        if (response) {
            let newOrder = { ...newOrderSelected }
            let orderItems = [...newOrderSelected.order_items]
            orderItems.splice(index, 1)
            newOrder.order_items = orderItems
            setNewOrderSelected(newOrder)
            getOrder()
            message.success('Cancel order successful.')
        } else {
            message.error('Cannot cancel order.Please try again.')
        }
    }

    const confirmCancelInOrder = async (order_items, index) => {
        console.log('order_items', order_items)
        let orderId = order_items.id
        let response = await partnerService.cancelOrder(orderId)
        console.log('response', response)
        if (response) {
            let inOrder = { ...inOrderSelected }
            let orderItems = [...inOrder.order_items]
            orderItems.splice(index, 1)
            inOrder.order_items = orderItems
            setInOrderSelected(inOrder)
            getOrder()
            message.success('Cancel order successful.')
        } else {
            message.error('Cannot cancel order.Please try again.')
        }
    }

    let newOrderTableListComponent = orders && orders.map((order) => {
        let tableList = order.new_orders.map((newOrder) => {
            if (newOrder.order_items.length > 0) {
                return (
                    <>
                        <Row className={tableNewOrderSelectedNumber == newOrder.id ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => (setNewOrderSelected(newOrder), setTableNewOrderSelectedNumber(newOrder.id))}>
                            <Col>
                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                    <Row >
                                        <Col>
                                            <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                        &nbsp;&nbsp; {order.name}
                                        </Col>
                                        <Col>
                                            <div style={{ textAlign: "right" }}>
                                                <b>{newOrder.total} THB</b>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                {moment(newOrder.order_date).add(7, 'hours').format('hh:mm:ss - DD/MMM/YYYY')}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </>
                )
            }

        })

        return tableList
    })

    const renderNewOrderList = () => {
        if (newOrderSelected.order_items) {
            let menuList = newOrderSelected.order_items.map((order_items, index) => {
                return (
                    <Row style={{ paddingBottom: "10px" }}>
                        <Col>
                            <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                <Row >
                                    <Col xs={4}>
                                        <Image src={order_items.menu.image_url} rounded style={{ height: "100%" }} />
                                    </Col>
                                    <Col xs={8}>
                                        <div>
                                            <Row>
                                                <Col xs={6}>
                                                    <div className={styles.overFlow}>
                                                        <b>{order_items.menu.name}</b>
                                                    </div>
                                                </Col>
                                                <Col xs={6}>
                                                    <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                        <Popconfirm
                                                            title="Are you sure to take order?"
                                                            onConfirm={() => confirmTakeOrder(order_items, index)}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button variant="primary" style={{ padding: ".1rem .5rem", marginRight: "10px" }}><CheckOutlined style={{ fontSize: "12px" }} /></Button>
                                                        </Popconfirm>
                                                        <Popconfirm
                                                            title="Are you sure to cancel this order?"
                                                            onConfirm={() => confirmCancelNewOrder(order_items, index)}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
                                                        </Popconfirm>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className={styles.overFlow}>
                                            <b>x {order_items.quantity}</b>
                                        </div >
                                        <div className={styles.overFlow}>
                                            <b>x {order_items.special_instruction}</b>
                                        </div>
                                        <div className={styles.overFlow} style={{ textAlign: "right" }}>
                                            Price : {order_items.total} THB
                                            </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                )
            })

            let orderList = (
                <>
                    {menuList}
                    {
                        menuList.length > 0 && (
                            <div style={{ textAlign: "right" }}>
                                <b>Total is {newOrderSelected.total} THB</b>
                            </div>
                        )
                    }
                </>

            )
            return orderList
        }

        return null
    }

    let newOrderList = renderNewOrderList()
    let NewOrderListComponent = (
        <>
            <Col xs={12} style={{ borderRight: "1px solid #DEDEDE" }}>
                {newOrderTableListComponent}
            </Col>
            <Col xs={12}>
                <Row>
                    <Col>
                        <div style={{ margin: "10px 10px 15px 10px", fontWeight: "600", textAlign: "center", borderRadius: "5px", backgroundColor: "gainsboro" }}>
                            Order Details of Table
                        </div>
                    </Col>
                </Row>
                {newOrderList}
            </Col>
        </>
    )

    let inOrderTableList = orders && orders.map((order) => {
        let tableList = order.in_orders.map((inOrder) => {
            if (inOrder.order_items.length > 0) {
                return (
                    <>
                        {/* Table list */}
                        <Row className={tableInOrderSelectedNumber == inOrder.id ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => (setInOrderSelected(inOrder), setTableInOrderSelectedNumber(inOrder.id))}>
                            <Col>
                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                    <Row >
                                        <Col>
                                            <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                        &nbsp;&nbsp; {order.name}
                                        </Col>
                                        <Col>
                                            <div style={{ textAlign: "right" }}>
                                                <b>{inOrder.total} THB</b>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                {moment(inOrder.order_date).add(7, 'hours').format('hh:mm:ss - DD/MMM/YYYY')}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </>
                )
            }
        })
        return tableList

    })


    const renderInOrderList = () => {
        if (inOrderSelected.order_items) {
            let menuList = inOrderSelected.order_items.map((order_items, index) => {
                return (
                    <Row style={{ paddingBottom: "10px" }}>
                        <Col>
                            <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                <Row >
                                    <Col xs={4}>
                                        <Image src={order_items.menu.image_url} rounded style={{ height: "100%" }} />
                                    </Col>
                                    <Col xs={8}>
                                        <div>
                                            <Row>
                                                <Col xs={6}>
                                                    <div className={utilStyles.font_size_sm + " " + styles.overFlow}>
                                                        <b>{order_items.menu.name}</b>
                                                    </div>
                                                </Col>
                                                <Col xs={6}>
                                                    <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                        <Popconfirm
                                                            title="Are you sure to take order?"
                                                            onConfirm={() => confirmCompleteOrder(order_items, index)}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button variant="primary" style={{ padding: ".1rem .5rem", marginRight: "10px" }}><CheckOutlined style={{ fontSize: "12px" }} /></Button>
                                                        </Popconfirm>
                                                        <Popconfirm
                                                            title="Are you sure to cancel this order?"
                                                            onConfirm={() => confirmCancelInOrder(order_items, index)}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
                                                        </Popconfirm>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className={styles.overFlow}>
                                            <b>x {order_items.quantity}</b>
                                        </div>
                                        <div className={styles.overFlow}>
                                            <b>x {order_items.special_instruction}</b>
                                        </div>
                                        <div className={styles.overFlow} style={{ textAlign: "right" }}>
                                            Price : {order_items.total} THB
                                            </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                )
            })

            let orderList = (
                <>
                    {menuList}
                    {
                        menuList.length > 0 && (
                            <div style={{ textAlign: "right" }}>
                                <b>Total is {inOrderSelected.total} THB</b>
                            </div>
                        )
                    }
                </>

            )
            return orderList
        }

        return null
    }

    let inOrderList = renderInOrderList()

    let InOrderListComponent = (
        <>
            <Col xs={12} style={{ borderRight: "1px solid #DEDEDE" }}>
                {inOrderTableList}
            </Col>
            <Col xs={12}>
                <Row>
                    <Col>
                        <div style={{ margin: "10px 10px 15px 10px", fontWeight: "600", textAlign: "center", borderRadius: "5px", backgroundColor: "gainsboro" }}>
                            Order Details of Table
                        </div>
                    </Col>
                </Row>
                {inOrderList}
            </Col>
        </>
    )

    let completedOrderTableList = orders && orders.map((order) => {
        let tableList = order.completed_orders.map((completedOrder) => {
            if (completedOrder.order_items.length > 0) {
                return (
                    <>
                        {/* Table list */}
                        <Row className={tableCompletedOrderSelectedNumber == completedOrder.id ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => (setCompletedOrderSelected(completedOrder), setTableCompletedOrderSelectedNumber(completedOrder.id))}>
                            <Col>
                                <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                    <Row >
                                        <Col>
                                            <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                        &nbsp;&nbsp; {order.name}
                                        </Col>
                                        <Col>
                                            <div style={{ textAlign: "right" }}>
                                                <b>{completedOrder.total} THB</b>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                {moment(completedOrder.order_date).add(7, 'hours').format('hh:mm:ss - DD/MMM/YYYY')}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </>
                )
            }
        })
        return tableList
    })


    const renderCompletedOrderList = () => {
        if (completedOrderSelected.order_items) {
            let menuList = completedOrderSelected.order_items.map((order_items) => {
                return (
                    <Row style={{ paddingBottom: "10px" }}>
                        <Col>
                            <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                <Row >
                                    <Col xs={4}>
                                        <Image src={order_items.menu.image_url} rounded style={{ height: "100%" }} />
                                    </Col>
                                    <Col xs={8}>
                                        <div>
                                            <Row>
                                                <Col>
                                                    <div className={styles.overFlow}>
                                                        <b>{order_items.menu.name}</b>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className={styles.overFlow}>
                                            <b>x {order_items.quantity}</b>
                                        </div>
                                        <div className={styles.overFlow}>
                                            <b>x {order_items.special_instruction}</b>
                                        </div>
                                        <div className={styles.overFlow} style={{ textAlign: "right" }}>
                                            Price : {order_items.total} THB
                                            </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                )
            })

            let orderList = (
                <>
                    {menuList}
                    {
                        menuList.length > 0 && (
                            <div style={{ textAlign: "right" }}>
                                <b>Total is {completedOrderSelected.total} THB</b>
                            </div>
                        )
                    }
                </>

            )
            return orderList
        }

        return null
    }

    let completedOrderList = renderCompletedOrderList()

    let CompletedOrderListComponent = (
        <>
            <Col xs={12} style={{ borderRight: "1px solid #DEDEDE" }}>
                {completedOrderTableList}
            </Col>
            <Col xs={12}>
                <Row>
                    <Col>
                        <div style={{ margin: "10px 10px 15px 10px", fontWeight: "600", textAlign: "center", borderRadius: "5px", backgroundColor: "gainsboro" }}>
                            Order Details of Table
                        </div>
                    </Col>
                </Row>
                {completedOrderList}
            </Col>
        </>
    )

    let zoneDropdown = zone && zone.map((zone) => (
        <Option value={zone.id}>{zone.name}</Option>
    ))

    let tableDropdown = restaurantTable && restaurantTable.map((table) => (
        <Option value={table.id}>{table.name}</Option>
    ))

    const onChangeZone = (zoneId) => {
        let zoneDetails = zone.find(zone => zone.id === zoneId)
        console.log(zoneDetails)
        setZoneSelected(zoneDetails)
        getOrder(zoneDetails)
    }

    const onChangeTable = (tableId) => {
        setTableIdSelected(tableId)
    }

    return (
        <div className={styles.tab}>
            <Row style={{ marginBottom: "20px" }}>
                <Col xs={12}>
                    <Form>
                        <Select
                            onChange={(zoneId) => onChangeZone(zoneId)}
                            value={zoneSelected.id}
                            style={{ width: "100%" }}
                        >
                            {zoneDropdown}
                        </Select>
                        {/* <Form.Control
                            as="select"
                            custom
                            onChange={(e) => onChangeZone(e)}
                        >
                            {zoneDropdown}
                        </Form.Control> */}
                        <Row style={{ marginTop: "15px" }}>
                            <Col xs={8}>
                                <Select
                                    onChange={(tableId) => onChangeTable(tableId)}
                                    value={tableIdSelected}
                                    style={{ width: "100%" }}
                                >
                                    {tableDropdown}
                                </Select>
                                {/* <Form.Control
                                    as="select"
                                    custom
                                    onChange={(e) => onChangeTable(e)}
                                >
                                    {tableDropdown}
                                </Form.Control> */}

                            </Col>
                            <Col xs={4}>
                                <Link
                                    href={{
                                        pathname: '/menuFeeding/restaurantList/' + restaurant_name,
                                        query: { restaurantId: restaurant_id, tableId: tableIdSelected },
                                    }}
                                >
                                    <a className={utilStyles.font_size_sm} style={{ lineHeight: 2 }}>Take new order</a>
                                </Link>
                                {/* <Button>Take order</Button> */}
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Spin spinning={loading} tip="Loading...">
                <Tabs defaultActiveKey="newOrder" id="orderStatus-tabs">
                    <Tab eventKey="newOrder" title="New order">
                        <Row style={{ marginTop: "20px", paddingBottom: "50px" }}>
                            {
                                haveNewOrder ? NewOrderListComponent : <EmptyComponent />
                            }
                        </Row>
                    </Tab>
                    <Tab eventKey="inOrder" title="In Order">
                        <Row style={{ marginTop: "20px" }}>
                            {
                                haveOrderInProcess ? InOrderListComponent : <EmptyComponent />
                            }
                        </Row>
                    </Tab>
                    <Tab eventKey="completed" title="Completed">
                        <Row style={{ marginTop: "20px" }}>
                            {
                                haveOrderCompleted ? CompletedOrderListComponent : <EmptyComponent />
                            }
                        </Row>
                    </Tab>
                </Tabs>
            </Spin>
        </div >
    )
}