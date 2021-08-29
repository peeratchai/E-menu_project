import styles from './index.module.css'
import { Row, Col, Image, Button, Tab, Tabs, Form } from 'react-bootstrap'
import { message, Popconfirm, Spin, Select, Modal as ModalAntd } from 'antd'
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import partnerService from '../../../../services/partner'
import EmptyComponent from '../../../Empty'
import utilStyles from '../../../../styles/utils.module.css'
import moment from 'moment'
import { DeleteOutlined, CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Link from 'next/link'
import NormalButton from '../../../Button/NormalButton'

const { Option } = Select
const { confirm } = ModalAntd;

export default function MobileComponent(props) {
    const { zone, restaurant_id, restaurant_name } = props
    const [loading, setLoading] = React.useState(false);
    const [zoneSelected, setZoneSelected] = React.useState({ id: null })
    const [newOrders, setNewOrders] = React.useState([])
    const [inOrders, setInOrders] = React.useState([])
    const [currentTab, setCurrentTab] = React.useState('newOrder')
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
    const [restaurantTable, setRestaurantTable] = React.useState([])
    const [tableIdSelected, setTableIdSelected] = React.useState(null)
    const startTime = "00:00:00";
    const endTime = "23:59:59";
    const currentDate = moment().format('YYYY-MM-DD')
    const startDate = moment(currentDate + ' ' + startTime).format()
    const endDate = moment(currentDate + ' ' + endTime).format()

    useEffect(() => {
        if (Array.isArray(zone)) {
            if (zone.length > 0) {
                setZoneSelected(zone[0])
                let initialTableIdSelected = zone[0].restaurant_tables[0].id
                setTableIdSelected(initialTableIdSelected)
                setRestaurantTable(zone[0].restaurant_tables)
                getNewOrder(initialTableIdSelected)
            }
        }
    }, [props])

    const getNewOrder = async (initialTableIdSelected = tableIdSelected, countOrderItmes = null) => {
        setLoading(true)
        let tableIdArray = []
        tableIdArray.push(initialTableIdSelected)
        let data = {
            "restaurant": restaurant_id,
            "restaurant_table": tableIdArray,
            "zone": null,
            "status": "New Order",
            "start_date": startDate,
            "end_date": endDate
        }
        try {
            let tableDetails = await partnerService.getOrderByfilter2(data)
            console.log('tableDetails', tableDetails)
            if (tableDetails.length > 0) {
                setInitailNewOrder(tableDetails, countOrderItmes)
                setNewOrders(tableDetails[0].orders)
            } else {
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
            })
        })

        firstOrder = tableDetails[0].orders[0]
        if (countOrderItmes === null) {
            setTableNewOrderSelectedNumber(firstOrder.id)
            setNewOrderSelected(firstOrder)
        }
        setHaveNewOrder(true)
    }

    const getInOrder = async (initialTableIdSelected = tableIdSelected, countOrderItmes = null) => {
        setLoading(true)
        let tableIdArray = []
        tableIdArray.push(initialTableIdSelected)
        let data = {
            "restaurant": restaurant_id,
            "restaurant_table": tableIdArray,
            "zone": null,
            "status": "In Order",
            "start_date": startDate,
            "end_date": endDate
        }
        try {
            let tableDetails = await partnerService.getOrderByfilter2(data)
            if (tableDetails.length > 0) {
                setInitailInOrder(tableDetails, countOrderItmes)
                setInOrders(tableDetails[0].orders)
            } else {
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

    const getCompletedOrder = async (initialTableIdSelected = tableIdSelected, countOrderItmes = null) => {
        setLoading(true)
        let tableIdArray = []
        tableIdArray.push(initialTableIdSelected)
        let data = {
            "restaurant": restaurant_id,
            "restaurant_table": tableIdArray,
            "zone": null,
            "status": "Completed",
            "start_date": startDate,
            "end_date": endDate
        }
        try {
            let tableDetails = await partnerService.getOrderByfilter2(data)
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
        let orderId = order_items.id
        try {
            let response = await partnerService.takeOrder(orderId)
            if (response) {
                if (response.is_success === true) {
                    let newOrder = { ...newOrderSelected }
                    let orderItems = [...newOrderSelected.order_items]
                    orderItems.splice(index, 1)
                    newOrder.order_items = orderItems
                    if (orderItems.length === 0) {
                        getNewOrder(tableIdSelected)
                    } else {
                        getNewOrder(tableIdSelected, tableNewOrderSelectedNumber)
                    }
                    setNewOrderSelected(newOrder)
                    message.success('Take order successful.')
                } else {
                    message.error('Cannot take order.Please try again.')
                }
            } else {
                message.error('Cannot take order.Please try again.')
            }
        } catch (error) {
            console.log('takeOrder error', error)
        }


    }

    const confirmCompleteOrder = async (order_items, index) => {
        try {
            let orderId = order_items.id
            let response = await partnerService.completeOrder(orderId)
            if (response) {
                if (response.is_success === true) {
                    let inOrder = { ...inOrderSelected }
                    let orderItems = [...inOrder.order_items]
                    orderItems.splice(index, 1)
                    inOrder.order_items = orderItems
                    if (orderItems.length === 0) {
                        getInOrder(tableIdSelected)
                    } else {
                        getInOrder(tableIdSelected, tableInOrderSelectedNumber)
                    }
                    setInOrderSelected(inOrder)

                    message.success('Complete order successful.')
                } else {
                    message.error('Cannot complete order.Please try again.')
                }
            } else {
                message.error('Cannot complete order.Please try again.')
            }
        } catch (error) {
            console.log('completeOrder error', error)
        }

    }

    const confirmCancelNewOrder = async (order_items, index) => {
        try {
            let orderId = order_items.id
            let response = await partnerService.cancelOrder(orderId)
            if (response) {
                if (response.is_success === true) {
                    let newOrder = { ...newOrderSelected }
                    let orderItems = [...newOrderSelected.order_items]
                    orderItems.splice(index, 1)
                    newOrder.order_items = orderItems
                    if (orderItems.length === 0) {
                        getNewOrder(tableIdSelected)
                    } else {
                        getNewOrder(tableIdSelected, tableNewOrderSelectedNumber)
                    }
                    setNewOrderSelected(newOrder)
                    message.success('Cancel order successful.')
                } else {
                    message.error('Cannot cancel order.Please try again.')
                }
            } else {
                message.error('Cannot cancel order.Please try again.')
            }
        } catch (error) {
            console.log('cancelOrder error', error)
        }

    }

    const confirmCancelInOrder = async (order_items, index) => {
        try {
            let orderId = order_items.id
            let response = await partnerService.cancelOrder(orderId)
            if (response) {
                if (response.is_success === true) {
                    let inOrder = { ...inOrderSelected }
                    let orderItems = [...inOrder.order_items]
                    orderItems.splice(index, 1)
                    inOrder.order_items = orderItems
                    if (orderItems.length === 0) {
                        getInOrder(tableIdSelected)
                    } else {
                        getInOrder(tableIdSelected, tableInOrderSelectedNumber)
                    }
                    setInOrderSelected(inOrder)
                    message.success('Cancel order successful.')
                } else {
                    message.error('Cannot cancel order.Please try again.')
                }
            } else {
                message.error('Cannot cancel order.Please try again.')
            }
        } catch (error) {
            console.log('cancelOrder error', error)
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
                                    &nbsp;&nbsp; {restaurantTable.name}
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
                                        {moment(order.order_date, 'YYYY-MM-DDHH:mm:ss').add(7, 'hours').format('HH:mm:ss - DD/MMM/YYYY')}
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

    const renderNewOrderList = () => {
        if (newOrderSelected.order_items) {
            let menuList = newOrderSelected.order_items.map((order_items, index) => {
                return (
                    <Row style={{ paddingBottom: "10px" }}>
                        <Col>
                            <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                <Row >
                                    <Col xs={4}>
                                        <Image src={order_items.menu.image_url} rounded style={{ height: "100px" }} />
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
                                            <b>* {order_items.special_instruction}</b>
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
                                    &nbsp;&nbsp;  {restaurantTable.name}
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
                                        {moment(order.order_date, 'YYYY-MM-DDHH:mm:ss').add(7, 'hours').format('HH:mm:ss - DD/MMM/YYYY')}
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
                                        <Image src={order_items.menu.image_url} rounded style={{ height: "100px" }} />
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
                                            <b>* {order_items.special_instruction}</b>
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
                                    &nbsp;&nbsp;  {restaurantTable.name}
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
                                        {moment(order.order_date, 'YYYY-MM-DDHH:mm:ss').add(7, 'hours').format('HH:mm:ss - DD/MMM/YYYY')}
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
                                        <Image src={order_items.menu.image_url} rounded style={{ height: "100px" }} />
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
                                            <b>* {order_items.special_instruction}</b>
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
                    <div style={{ margin: "10px 0" }}>
                        <NormalButton button_name="เช็คบิล" function_on_click={() => confirmCheckBill()} />
                    </div>
                    {
                        menuList.length > 0 && (
                            <div style={{ textAlign: "right", marginBottom: "10px" }}>
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
        setZoneSelected(zoneDetails)
        setRestaurantTable(zoneDetails.restaurant_tables)
        let tableSelected = zoneDetails.restaurant_tables[0].id
        setTableIdSelected(tableSelected)
        if (currentTab === 'newOrder') {
            getNewOrder(tableSelected)
        } else {
            if (currentTab === 'inOrder') {
                getInOrder(tableSelected)
            } else {
                if (currentTab === 'completed') {
                    getCompletedOrder(tableSelected)
                }
            }
        }
    }

    const onChangeTable = (tableId) => {
        if (currentTab === 'newOrder') {
            getNewOrder(tableId)
            setCurrentTab('newOrder')
        } else {
            if (currentTab === 'inOrder') {
                getInOrder(tableId)
                setCurrentTab('inOrder')
            } else {
                if (currentTab === 'completed') {
                    getCompletedOrder(tableId)
                    setCurrentTab('completed')
                }
            }
        }
        setTableIdSelected(tableId)
    }

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

    const checkBill = async () => {
        try {
            let response = await partnerService.checkbill(tableIdSelected.id);
            if (response) {
                if (response.is_success === true) {
                    await getCompletedOrder()
                    message.success('เช็คบิลสำเร็จ')
                } else {
                    message.warning('ไม่พบรายการอาหาร')
                }
            }
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
                checkBill()
            },
        });
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
                        <Row style={{ marginTop: "15px" }}>
                            <Col xs={8}>
                                <Select
                                    onChange={(tableId) => onChangeTable(tableId)}
                                    value={tableIdSelected}
                                    style={{ width: "100%" }}
                                >
                                    {tableDropdown}
                                </Select>
                            </Col>
                            <Col xs={4}>
                                {
                                    restaurant_id && (
                                        <Link
                                            href={{
                                                pathname: '/menuFeeding/restaurantList/' + restaurant_name,
                                                query: { restaurantId: restaurant_id, tableId: tableIdSelected },
                                            }}
                                        >
                                            <a className={utilStyles.font_size_sm} style={{ lineHeight: 2 }}>Take order</a>
                                        </Link>
                                    )
                                }
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Spin spinning={loading} tip="Loading...">
                <Tabs defaultActiveKey="newOrder" id="orderStatus-tabs" onSelect={onChangeTab}>
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