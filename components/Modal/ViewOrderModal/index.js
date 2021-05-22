import utilStyles from '../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Image, Button, Tab, Tabs, Modal } from 'react-bootstrap'
import { Popconfirm, message, Spin } from 'antd';
import 'antd/dist/antd.css';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import partnerService from '../../../services/partner'
import moment from 'moment'
import EmptyComponent from '../../Empty'


export default function ViewOrderModal(props) {

    const { table_selected, restaurant_id } = props
    const [loading, setLoading] = React.useState(false);
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

    useEffect(() => {
        if (restaurant_id && table_selected) {
            getOrder()
        }
    }, [table_selected])

    const getOrder = async () => {
        setLoading(true)
        let zoneIdArray = []
        zoneIdArray.push(table_selected.zoneId)
        let data = {
            "restaurant": restaurant_id,
            "restaurant_table": null,
            "zone": zoneIdArray
        }
        console.log(data)
        let orders = await partnerService.getOrderByfilter(data)
        if (orders) {
            console.log('order', orders)
            setInitailNewOrder(orders)
            setInitailInOrder(orders)
            setInitailCompletedOrder(orders)

            setOrders(orders)
            setLoading(false)
        } else {
            message.error('An error has occurred.Please try again.')
        }
    }

    const setInitailNewOrder = (orders) => {
        let haveNewOrder = false
        orders.map((order) => {
            if (order.new_orders.length > 0) {
                haveNewOrder = true
            }
        })

        if (!haveNewOrder) {
            setNewOrderSelected({})
            setTableNewOrderSelectedNumber(undefined)
        }
        setHaveNewOrder(haveNewOrder)
    }

    const setInitailInOrder = (orders) => {
        let haveOrderInProcess = false
        orders.map((order) => {
            if (order.in_orders.length > 0) {
                haveOrderInProcess = true
            }
        })

        if (!haveOrderInProcess) {
            setInOrderSelected({})
            setTableInOrderSelectedNumber(undefined)
        }
        setHaveOrderInProcess(haveOrderInProcess)
    }

    const setInitailCompletedOrder = (orders) => {
        let haveOrderCompleted = false
        orders.map((order) => {
            if (order.completed_orders.length > 0) {
                haveOrderCompleted = true
            }
        })

        if (!haveOrderCompleted) {
            setCompletedOrderSelected({})
            setTableCompletedOrderSelectedNumber(undefined)
        }
        setHaveOrderCompleted(haveOrderCompleted)
    }

    let newOrderTableListComponent = orders && orders.map((order) => {
        let tableList = order.new_orders.map((newOrder) => {
            if (newOrder.order_items.length > 0) {
                // if (tableNewOrderSelectedNumber === undefined) {
                //     setTableNewOrderSelectedNumber(newOrder.id)
                //     setNewOrderSelected(newOrder)
                //     setHaveNewOrder(true)
                // }
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
                                                {moment(newOrder.order_date).format('hh:mm:ss - DD/MMM/YYYY')}
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

    const confirmTakeOrder = async (order_items, index) => {
        console.log('order_items', order_items)
        let orderId = order_items.id
        let response = await partnerService.takeOrder(orderId)
        console.log('response', response)
        if (response) {
            if (response.is_success === true) {
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
            if (response.is_success === true) {
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
            if (response.is_success === true) {
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
            if (response.is_success === true) {
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
        } else {
            message.error('Cannot cancel order.Please try again.')
        }
    }

    const renderNewOrderList = () => {
        if (newOrderSelected.order_items) {
            let menuList = newOrderSelected.order_items.map((order_items, index) => {
                return (
                    <Row style={{ paddingBottom: "10px" }}>
                        <Col>
                            <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                <Row >
                                    <Col xs={4}>
                                        <Image src={order_items.menu.image_url} rounded style={{ height: "130px" }} />
                                    </Col>
                                    <Col xs={8}>
                                        <div>
                                            <Row>
                                                <Col xs={8}>
                                                    <div>
                                                        <b>{order_items.menu.name}</b>
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
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
                                        <div>
                                            <b>x {order_items.quantity}</b>
                                        </div>
                                        <div>
                                            <b>x {order_items.special_instruction}</b>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
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
                    <div style={{ position: "absolute", bottom: "0", right: "10px" }}>
                        <b>Total is {newOrderSelected.total} THB</b>
                    </div>
                </>

            )
            return orderList
        }

        return null
    }

    let newOrderList = renderNewOrderList()
    let NewOrderListComponent = (
        <>
            <Col xs={4} style={{ borderRight: "1px solid #DEDEDE" }}>
                {newOrderTableListComponent}
            </Col>
            <Col xs={8}>
                {newOrderList}
            </Col>
        </>
    )

    let inOrderTableList = orders && orders.map((order) => {
        let tableList = order.in_orders.map((inOrder) => {
            if (inOrder.order_items.length > 0) {
                // if (tableInOrderSelectedNumber === undefined) {
                //     setTableInOrderSelectedNumber(inOrder.id)
                //     setInOrderSelected(inOrder)
                //     setHaveOrderInProcess(true)
                // }
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
                                                {moment(inOrder.order_date).add(7, 'hours').format('HH:MM:SS - DD/MMM/YYYY')}
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
                                        <Image src={order_items.menu.image_url} rounded style={{ height: "130px" }} />
                                    </Col>
                                    <Col xs={8}>
                                        <div>
                                            <Row>
                                                <Col xs={8}>
                                                    <div>
                                                        <b>{order_items.menu.name}</b>
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
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
                                        <div>
                                            <b>x {order_items.quantity}</b>
                                        </div>
                                        <div>
                                            <b>x {order_items.special_instruction}</b>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
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
                    <div style={{ position: "absolute", bottom: "0", right: "10px" }}>
                        <b>Total is {inOrderSelected.total} THB</b>
                    </div>
                </>

            )
            return orderList
        }

        return null
    }

    let inOrderList = renderInOrderList()

    let InOrderListComponent = (
        <>
            <Col xs={4} style={{ borderRight: "1px solid #DEDEDE" }}>
                {inOrderTableList}
            </Col>
            <Col xs={8}>
                {inOrderList}
            </Col>
        </>
    )

    let completedOrderTableList = orders && orders.map((order) => {
        let tableList = order.completed_orders.map((completedOrder) => {
            if (completedOrder.order_items.length > 0) {
                // if (tableCompletedOrderSelectedNumber === undefined) {
                //     setTableCompletedOrderSelectedNumber(completedOrder.id)
                //     setCompletedOrderSelected(completedOrder)
                //     setHaveOrderCompleted(true)
                // }
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
                                                {moment(completedOrder.order_date).format('HH:MM:SS - DD/MMM/YYYY')}
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
                                        <Image src={order_items.menu.image_url} rounded style={{ height: "130px" }} />
                                    </Col>
                                    <Col xs={8}>
                                        <div>
                                            <Row>
                                                <Col>
                                                    <div>
                                                        <b>{order_items.menu.name}</b>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div>
                                            <b>x {order_items.quantity}</b>
                                        </div>
                                        <div>
                                            <b>x {order_items.special_instruction}</b>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
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
                    <div style={{ position: "absolute", bottom: "0", right: "10px" }}>
                        <b>Total is {completedOrderSelected.total} THB</b>
                    </div>
                </>

            )
            return orderList
        }

        return null
    }

    let completedOrderList = renderCompletedOrderList()

    let CompletedOrderListComponent = (
        <>
            <Col xs={4} style={{ borderRight: "1px solid #DEDEDE" }}>
                {completedOrderTableList}
            </Col>
            <Col xs={8}>
                {completedOrderList}
            </Col>
        </>
    )

    return (

        <Modal
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    All Orders
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Spin spinning={loading} tip="Loading...">
                    <Tabs defaultActiveKey="newOrder" id="orderStatus-tabs">
                        <Tab eventKey="newOrder" title="New order">
                            <Row style={{ height: "80vh", marginTop: "20px" }}>
                                {
                                    haveNewOrder ? NewOrderListComponent : <EmptyComponent />
                                }
                            </Row>
                        </Tab>
                        <Tab eventKey="inOrder" title="In Order">
                            <Row style={{ height: "80vh", marginTop: "20px" }}>
                                {
                                    haveOrderInProcess ? InOrderListComponent : <EmptyComponent />
                                }
                            </Row>
                        </Tab>
                        <Tab eventKey="completed" title="Completed">
                            <Row style={{ height: "80vh", marginTop: "20px" }}>
                                {
                                    haveOrderCompleted ? CompletedOrderListComponent : <EmptyComponent />
                                }
                            </Row>
                        </Tab>
                    </Tabs>
                </Spin>
            </Modal.Body >
        </Modal >
    );
}