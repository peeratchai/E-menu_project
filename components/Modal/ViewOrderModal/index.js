import utilStyles from '../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Image, Button, Tab, Tabs, Modal } from 'react-bootstrap'
import { Popconfirm, message, Spin, Modal as ModalAntd } from 'antd';
import 'antd/dist/antd.css';
import { DeleteOutlined, CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import partnerService from '../../../services/partner'
import moment from 'moment'
import EmptyComponent from '../../Empty'
import NormalButton from '../../Button/NormalButton'

const { confirm } = ModalAntd;

export default function ViewOrderModal(props) {

    const { table_selected, restaurant_id } = props
    const { get_zone } = props
    const [loading, setLoading] = React.useState(false);
    const [newOrders, setNewOrders] = React.useState([])
    const [inOrders, setInOrders] = React.useState([])
    const [completedOrders, setCompletedOrders] = React.useState([])
    const [newOrderSelected, setNewOrderSelected] = React.useState({})
    const [haveNewOrder, setHaveNewOrder] = React.useState(false)
    const [tableNewOrderSelectedNumber, setTableNewOrderSelectedNumber] = React.useState()
    const [inOrderSelected, setInOrderSelected] = React.useState({})
    const [haveOrderInProcess, setHaveOrderInProcess] = React.useState(false)
    const [tableInOrderSelectedNumber, setTableInOrderSelectedNumber] = React.useState()
    const [completedOrderSelected, setCompletedOrderSelected] = React.useState({})
    const [haveOrderCompleted, setHaveOrderCompleted] = React.useState(false)
    const [tableCompletedOrderSelectedNumber, setTableCompletedOrderSelectedNumber] = React.useState()
    const startTime = "00:00:00";
    const endTime = "23:59:59";
    const currentDate = moment().format('YYYY-MM-DD')
    const startDate = moment(currentDate + ' ' + startTime)
    const endDate = moment(currentDate + ' ' + endTime)

    useEffect(() => {
        if (restaurant_id && table_selected) {
            getNewOrder(null, true)
        }
    }, [table_selected])

    const getNewOrder = async (countOrderItmes = null, setinitialOrder = false) => {
        setLoading(true)
        let tableIdArray = []
        tableIdArray.push(table_selected.id)
        let data = {
            "restaurant": restaurant_id,
            "restaurant_table": tableIdArray,
            "zone": null,
            "status": "New Order",
            "start_date": startDate,
            "end_date": endDate
        }
        console.log('dataForm', data)
        try {
            let tableDetails = await partnerService.getOrderByfilter2(data)
            console.log('tableDetails', tableDetails)
            if (tableDetails.length > 0) {
                setInitailNewOrder(tableDetails, countOrderItmes)
                setNewOrders(tableDetails[0].orders)
                setTableNewOrderSelectedNumber(tableDetails[0].orders[0].id)
            } else {
                if (!setinitialOrder) {
                    get_zone()
                }
                setNewOrderSelected({})
                setNewOrders([])
                setTableNewOrderSelectedNumber(undefined)
            }
            setLoading(false)
        } catch (error) {
            console.log('error', error)
            setLoading(false)
            message.error('An error has occurred.Please try again.')
        }
    }

    const setInitailNewOrder = (tableDetails, countOrderItmes) => {
        let firstOrder
        tableDetails.map((tableDetail) => {
            tableDetail.orders.forEach((orderItem) => {
                orderItem.total = orderItem.order_items.reduce(sum, 0)
                console.log(orderItem.total)
            })
        })

        firstOrder = tableDetails[0].orders[0]
        if (countOrderItmes === null) {
            setTableNewOrderSelectedNumber(firstOrder.id)
            setNewOrderSelected(firstOrder)
        }
        setHaveNewOrder(true)
    }

    const getInOrder = async (countOrderItmes = null, setinitialOrder = false) => {
        setLoading(true)
        let tableIdArray = []
        tableIdArray.push(table_selected.id)
        let data = {
            "restaurant": restaurant_id,
            "restaurant_table": tableIdArray,
            "zone": null,
            "status": "In Order",
            "start_date": startDate,
            "end_date": endDate
        }
        console.log('dataForm', data)
        try {
            let tableDetails = await partnerService.getOrderByfilter2(data)
            console.log('tableDetails', tableDetails)
            if (tableDetails.length > 0) {
                setInitailInOrder(tableDetails, countOrderItmes)
                setInOrders(tableDetails[0].orders)
                setTableInOrderSelectedNumber(tableDetails[0].orders[0].id)
            } else {
                if (!setinitialOrder) {
                    get_zone()
                }
                setInOrders([])
                setInOrderSelected({})
                setTableInOrderSelectedNumber(undefined)
            }

            setLoading(false)
        } catch (error) {
            console.log('error', error)
            setLoading(false)
            message.error('An error has occurred.Please try again.')
        }
    }
    function sum(accumulator, a) {
        return accumulator + a.total;
    }

    const setInitailInOrder = (tableDetails, countOrderItmes) => {
        let IndexOfFirstOrder = 0
        let firstOrder
        tableDetails.map((tableDetail) => {
            tableDetail.orders.map((orderItem, index) => {
                orderItem.total = orderItem.order_items.reduce(sum, 0)
                console.log(orderItem.total)
                if (IndexOfFirstOrder === 0) {
                    IndexOfFirstOrder = index
                }
            })
        })

        firstOrder = tableDetails[0].orders[0]
        if (countOrderItmes === null) {
            setTableInOrderSelectedNumber(firstOrder.id)
            setInOrderSelected(firstOrder)
        }
        setHaveOrderInProcess(true)
    }

    const getCompletedOrder = async (countOrderItmes = null) => {
        setLoading(true)
        let tableIdArray = []
        tableIdArray.push(table_selected.id)
        let data = {
            "restaurant": restaurant_id,
            "restaurant_table": tableIdArray,
            "zone": null,
            "status": "Completed",
            "start_date": startDate,
            "end_date": endDate
        }
        console.log('dataForm', data)
        try {
            let tableDetails = await partnerService.getOrderByfilter2(data)
            console.log('tableDetails', tableDetails)
            if (tableDetails.length > 0) {
                setInitailCompletedOrder(tableDetails, countOrderItmes)
                setCompletedOrders(tableDetails[0].orders)
            } else {
                setCompletedOrders([])
                setCompletedOrderSelected({})
                setTableCompletedOrderSelectedNumber(undefined)
            }
            setLoading(false)
        } catch (error) {
            console.log('error', error)
            setLoading(false)
            message.error('An error has occurred.Please try again.')
        }
    }

    const setInitailCompletedOrder = (tableDetails, countOrderItmes) => {
        let firstOrder
        tableDetails.map((tableDetail) => {
            tableDetail.orders.forEach((orderItem) => {
                orderItem.total = orderItem.order_items.reduce(sum, 0)
                console.log(orderItem.total)
            })
        })

        firstOrder = tableDetails[0].orders[0]
        if (countOrderItmes === null) {
            setTableCompletedOrderSelectedNumber(firstOrder.id)
            setCompletedOrderSelected(firstOrder)
        }
        setHaveOrderCompleted(true)
    }

    const confirmTakeOrder = async (order_items, index) => {
        console.log('order_items', order_items)
        try {
            let orderId = order_items.id
            let response = await partnerService.takeOrder(orderId)
            console.log('response', response)
            if (response) {
                if (response.is_success === true) {
                    let newOrder = { ...newOrderSelected }
                    let orderItems = [...newOrderSelected.order_items]
                    orderItems.splice(index, 1)
                    newOrder.order_items = orderItems
                    if (orderItems.length === 0) {
                        getNewOrder()
                    } else {
                        getNewOrder(tableNewOrderSelectedNumber)
                    }
                    console.log('newOrder', newOrder)

                    setNewOrderSelected(newOrder)
                    message.success('Take order successful.')
                } else {
                    message.error('Cannot take order.Please try again.')
                }
            } else {
                message.error('Cannot take order.Please try again.')
            }
        } catch (error) {
            message.error('Cannot take order.Please try again.', error)
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
                if (orderItems.length === 0) {
                    getInOrder()
                } else {
                    getInOrder(tableInOrderSelectedNumber)
                }
                setInOrderSelected(inOrder)

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
                if (orderItems.length === 0) {
                    getNewOrder()
                } else {
                    getNewOrder(tableNewOrderSelectedNumber)
                }
                setNewOrderSelected(newOrder)
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
                if (orderItems.length === 0) {
                    getInOrder()
                } else {
                    getInOrder(tableInOrderSelectedNumber)
                }
                setInOrderSelected(inOrder)
                message.success('Cancel order successful.')
            } else {
                message.error('Cannot cancel order.Please try again.')
            }
        } else {
            message.error('Cannot cancel order.Please try again.')
        }
    }

    const checkBill = async () => {
        try {
            let response = await partnerService.checkbill(table_selected.id);
            if (response) {
                if (response.is_success === true) {
                    message.success('เช็คบิลสำเร็จ')
                } else {
                    message.warning('ไม่พบรายการอาหาร')
                }
            }
            console.log('response', response)
        } catch (error) {
            console.log('Check bill error', error)
            message.error('ไม่สามารถเช็คบิลได้')
        }
    }

    const confirmCheckBill = () => {
        confirm({
            title: 'ยืนยันการเช็คบิลหรือไม่?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'ยืนยัน',
            okType: 'danger',
            cancelText: 'ยกเลิก',
            centered: true,
            destroyOnClose: true,
            onOk() {
                console.log('OK');
                checkBill()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const acceptAlNewOrder = async () => {
        try {
            setLoading(true)
            if (newOrderSelected) {
                await Promise.all(newOrderSelected.order_items.map(async (orderItem) => {
                    console.log('order_item', orderItem)
                    let orderId = orderItem.id
                    let response = await partnerService.takeOrder(orderId)
                    console.log('response', response)
                    if (response) {
                        if (response.is_success === true) {
                            let newOrder = { ...newOrderSelected }
                            newOrder.order_items = []
                            getNewOrder()
                            setNewOrderSelected(newOrder)
                        }
                    }
                }));
            }
            console.log('done')
            message.success('Take order successful.')
            setLoading(false)
        } catch (error) {
            console.log('error', error)
            // message.error('Cannot take order.Please try again.', error)
            setLoading(false)
        }
    }

    const acceptAllInOrder = async () => {
        try {
            console.log('newOrderSelected', inOrderSelected)
            setLoading(true)
            if (inOrderSelected) {
                await Promise.all(inOrderSelected.order_items.map(async (orderItem) => {
                    let orderId = orderItem.id
                    let response = await partnerService.completeOrder(orderId)
                    console.log('response', response)
                    if (response) {
                        if (response.is_success === true) {
                            let inOrder = { ...inOrderSelected }
                            inOrder.order_items = []
                            getInOrder()
                            setInOrderSelected(inOrder)
                        } else {
                            message.error('Cannot complete order.Please try again.')
                        }
                    } else {
                        message.error('Cannot complete order.Please try again.')
                    }
                }));
            }
            message.success('Complete order successful.')
            setLoading(false)
        } catch (error) {
            console.log('error', error)
            setLoading(false)
        }
    }

    let newOrderTableListComponent = newOrders && newOrders.map((order) => {

        return (
            <>
                <Row className={tableNewOrderSelectedNumber == order.id ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => (setNewOrderSelected(order), setTableNewOrderSelectedNumber(order.id))}>
                    <Col>
                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                            <Row >
                                <Col>
                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                    &nbsp;&nbsp; {table_selected.name}
                                </Col>
                                <Col>
                                    <div style={{ textAlign: "right" }}>
                                        <b>{order.total} THB</b>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                        {moment(order.order_date, 'YYYY-MM-DDHH:mm:ss').format('HH:mm:ss - DD/MMM/YYYY')}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </>
        )
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
                                            <b>{order_items.special_instruction}</b>
                                        </div>
                                        <div className={utilStyles.overflowDot} style={{ fontSize: "12px", margin: "5px 0 10px 0" }}>
                                            <b>รหัสลูกค้า : {newOrderSelected.order_by}</b>
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
                    <div style={{ position: "relative", textAlign: "right" }}>
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
            <Col xs={4} style={{ borderRight: "1px solid #DEDEDE", overflowY: "scroll", height: "inherit" }}>
                {newOrderTableListComponent}
            </Col>
            <Col xs={8} style={{ overflowY: "scroll", height: "inherit" }}>
                <div style={{ textAlign: "right", marginBottom: "15px" }}>
                    <Popconfirm
                        title="คุณแน่ใจหรือไม่ที่จะรับออเดอร์ทั้งหมด"
                        onConfirm={() => acceptAlNewOrder()}
                        okText="ยืนยัน"
                        cancelText="ยกเลิก"
                    >
                        <Button >
                            รับออเดอร์ทั้งหมด
                        </Button>
                    </Popconfirm>
                </div>

                {newOrderList}
            </Col>
        </>
    )

    let inOrderTableList = inOrders && inOrders.map((order) => {
        return (
            <>
                {/* Table list */}
                <Row className={tableInOrderSelectedNumber == order.id ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => (setInOrderSelected(order), setTableInOrderSelectedNumber(order.id))}>
                    <Col>
                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                            <Row >
                                <Col>
                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                    &nbsp;&nbsp; {table_selected.name}
                                </Col>
                                <Col>
                                    <div style={{ textAlign: "right" }}>
                                        <b>{order.total} THB</b>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                        {moment(order.order_date, 'YYYY-MM-DDHH:mm:ss').format('HH:mm:ss - DD/MMM/YYYY')}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </>
        )
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
                                            <b>{order_items.special_instruction}</b>
                                        </div>
                                        <div className={utilStyles.overflowDot} style={{ fontSize: "12px", margin: "5px 0 10px 0" }}>
                                            <b>รหัสลูกค้า : {inOrderSelected.order_by}</b>
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
                    <div style={{ position: "relative", textAlign: "right" }}>
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
            <Col xs={4} style={{ borderRight: "1px solid #DEDEDE", overflowY: "scroll", height: "inherit" }}>
                {inOrderTableList}
            </Col>
            <Col xs={8} style={{ overflowY: "scroll", height: "inherit" }}>
                <div style={{ textAlign: "right", marginBottom: "15px" }}>
                    <Popconfirm
                        title="คุณแน่ใจหรือไม่ที่จะรับออเดอร์ทั้งหมด"
                        onConfirm={() => acceptAllInOrder()}
                        okText="ยืนยัน"
                        cancelText="ยกเลิก"
                    >
                        <Button >
                            รับออเดอร์ทั้งหมด
                        </Button>
                    </Popconfirm>
                </div>
                {inOrderList}
            </Col>
        </>
    )

    let completedOrderTableList = completedOrders && completedOrders.map((order) => {
        return (
            <>
                {/* Table list */}
                <Row className={tableCompletedOrderSelectedNumber == order.id ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => (setCompletedOrderSelected(order), setTableCompletedOrderSelectedNumber(order.id))}>
                    <Col>
                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                            <Row >
                                <Col>
                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                    &nbsp;&nbsp; {table_selected.name}
                                </Col>
                                <Col>
                                    <div style={{ textAlign: "right" }}>
                                        <b>{order.total} THB</b>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                        {moment(order.order_date, 'YYYY-MM-DDHH:mm:ss').format('HH:mm:ss - DD/MMM/YYYY')}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </>
        )
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
                                            <b>{order_items.special_instruction}</b>
                                        </div>
                                        <div className={utilStyles.overflowDot} style={{ fontSize: "12px", margin: "5px 0 10px 0" }}>
                                            <b>รหัสลูกค้า : {completedOrderSelected.order_by}</b>
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
                    <div style={{ marginBottom: "15px" }}>
                        <NormalButton button_name="เช็คบิล" function_on_click={() => confirmCheckBill()} />
                    </div>
                    <div style={{ position: "relative", textAlign: "right" }}>
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
            <Col xs={4} style={{ borderRight: "1px solid #DEDEDE", overflowY: "scroll", height: "inherit" }}>
                {completedOrderTableList}
            </Col>
            <Col xs={8} style={{ overflowY: "scroll", height: "inherit" }}>
                {completedOrderList}
            </Col>
        </>
    )

    const onChangeTab = (tabName) => {
        if (tabName === 'newOrder') {
            getNewOrder()
        } else {
            if (tabName === 'inOrder') {
                getInOrder()
            } else {
                if (tabName === 'completed') {
                    getCompletedOrder()
                }
            }
        }
    }

    return (

        <Modal
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    Table {table_selected.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Spin spinning={loading} tip="Loading...">
                    <Tabs defaultActiveKey="newOrder" id="orderStatus-tabs" onSelect={onChangeTab}>
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
