import utilStyles from '../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Image } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { DatePicker, Button, Spin } from 'antd';
import React from 'react'
import moment from 'moment'
import partnerSerivce from '../../../services/partner';
import EmptyComponent from '../../Empty'
import { CSVLink, CSVDownload } from "react-csv";

const { RangePicker } = DatePicker;

export default function Dashboard(props) {

    const { restaurant_id } = props
    const [allOrder, setAllOrder] = React.useState([])
    const [orderSelected, setOrderSelected] = React.useState({})
    const [haveOrder, setHaveOrder] = React.useState(false);
    const [tableSelectedNumber, setTableSelectedNumber] = React.useState()
    const [csvData, setCsvData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const onChangePeriod = (date, dateString) => {
        const startTime = "00:00:00";
        const endTime = "23:59:59";
        let startDate = moment(dateString[0] + ' ' + startTime).format()
        let endDate = moment(dateString[1] + ' ' + endTime).format()
        console.log('startDate', startDate);
        console.log('endDate', endDate);

        if (startDate !== 'Invalid date' || endDate !== 'Invalid date') {
            getOrderByPeriod(startDate, endDate)

        } else {
            console.log('Invalid date')
        }


    }

    const getOrderByPeriod = async (startDate, endDate) => {
        console.log('restaurant_id', restaurant_id)
        let data = {
            "restaurant": restaurant_id,
            "status": "completed",
            "start_date": startDate,
            "end_date": endDate
        }
        let allOrder = []
        setLoading(true)
        let orderList = await partnerSerivce.getOrderByPeriod(data)
        console.log('orderList', orderList)
        if (orderList) {
            let dateArray = Object.keys(orderList)
            console.log('dateArray', dateArray)

            if (dateArray.length > 0) {
                setHaveOrder(true)
                dateArray.forEach((date) => {
                    orderList[date].forEach((order) => {
                        allOrder.push(order)
                    })
                })

                setAllOrder(allOrder)
                setOrderSelected(allOrder[0])
                setTableSelectedNumber(allOrder[0].id)

                setExportData(allOrder)
                // await exportData()
            } else {
                setHaveOrder(false)
            }
        }
        setLoading(false)
    }

    const setExportData = (allOrder) => {
        let csvData = [["วันที่", "ช่วงเวลา", "เบอร์โต๊ะ", "รหัส User", "รายการอาหาร", "ราคา", "ยอดรวมทั้งโต๊ะ"]]
        let date, period, tableNo, userId, menuName, price, total
        allOrder.forEach((order) => {
            order.order_items.forEach((orderItem, index) => {

                if (order.order_items.length === 1) {
                    date = moment(order.created_date, 'YYYY-MM-DDHH:mm:ss').format('DD-MM-YYYY')
                    period = moment(order.created_date, 'YYYY-MM-DDHH:mm:ss').format('HH:mm:ss') + ' - ' + moment(order.complete_date, 'YYYY-MM-DDHH:mm:ss').format('HH:mm:ss')
                    tableNo = order.restaurant_table.name
                    userId = order.user.id
                    menuName = orderItem.menu.name
                    price = orderItem.total
                    total = order.total
                    csvData.push([date, period, tableNo, userId, menuName, price, total])
                } else {
                    if (index === 0) {
                        date = moment(order.created_date, 'YYYY-MM-DDHH:mm:ss').add(7, 'hours').format('DD-MM-YYYY')
                        period = moment(order.created_date, 'YYYY-MM-DDHH:mm:ss').add(7, 'hours').format('HH:mm:ss') + ' - ' + moment(order.complete_date).format('HH:mm:ss')
                        tableNo = order.restaurant_table.name
                        userId = order.user.id
                        menuName = orderItem.menu.name
                        price = orderItem.total
                        csvData.push([date, period, tableNo, userId, menuName, price, ''])
                    } else {
                        if (index === (order.order_items.length - 1)) {
                            userId = order.user.id
                            menuName = orderItem.menu.name
                            price = orderItem.total
                            total = order.total
                            csvData.push(['', '', '', userId, menuName, price, total])
                        } else {
                            userId = order.user.id
                            menuName = orderItem.menu.name
                            price = orderItem.total
                            csvData.push(['', '', '', userId, menuName, price, ''])
                        }
                    }
                }
            })
        })

        console.log('csvData', csvData)
        setCsvData(csvData)
    }

    // const csvData = [
    //     ["firstname", "lastname", "email"],
    //     ["Ahmed", "Tomi", "ah@smthing.co.com"],
    //     ["Raed", "Labes", "rl@smthing.co.com"],
    //     ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    // ];



    let orderTableListComponent = allOrder && allOrder.map((order) => {
        return (
            <>
                <Row className={tableSelectedNumber == order.id ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => (setOrderSelected(order), setTableSelectedNumber(order.id))}>
                    <Col>
                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                            <Row >
                                <Col>
                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                    &nbsp;&nbsp; {order.restaurant_table.name}
                                </Col>
                                <Col>
                                    <div style={{ textAlign: "right" }}>
                                        <b>{order.total} THB</b>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} style={{ fontSize: "14px" }}>
                                    <b>{order.status}</b>
                                </Col>
                                <Col xs={8}>
                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                        {moment(order.created_date, 'YYYY-MM-DDHH:mm:ss').format('DD/MMM/YYYY')}

                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} style={{ fontSize: "14px" }}>
                                    <b>Order No : {order.order_number}</b>
                                </Col>
                                <Col xs={6}>
                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                        {moment(order.created_date, 'YYYY-MM-DDHH:mm:ss').add(7, 'hours').format('HH:mm:ss')}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </>
        )
    })

    const renderOrderList = () => {
        if (orderSelected.order_items) {
            let menuList = orderSelected.order_items.map((order_items, index) => {
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
                                            <b>* {order_items.special_instruction}</b>
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
                    <div style={{ textAlign: "right" }}>
                        <b>Total is {orderSelected.total} THB</b>
                    </div>
                </>

            )
            return orderList
        }

        return null
    }

    let orderList = renderOrderList()
    let OrderListComponent = (
        <>
            <Col xs={5} style={{ borderRight: "1px solid #DEDEDE" }}>
                <div style={{ color: "white", marginBottom: "20px", backgroundColor: "#0069D9", padding: "15px" }}>
                    <div style={{ marginBottom: "10px" }}>
                        <Row>
                            <Col>
                                <b>Period</b>
                            </Col>
                            <Col>
                                <div style={{ textAlign: "right" }}>
                                    <CSVLink filename={"Restaurant report.csv"} data={csvData}><Button type="primary" disabled={!haveOrder}>Export data</Button></CSVLink>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <RangePicker onChange={onChangePeriod} style={{ width: "100%" }} />
                </div>
                <Spin spinning={loading} tip="Loading...">
                    {
                        haveOrder ? orderTableListComponent : <EmptyComponent />
                    }
                </Spin>
            </Col>
            <Col xs={7}>
                <Spin spinning={loading} tip="Loading...">
                    {
                        haveOrder ? orderList : <EmptyComponent />
                    }
                </Spin>
            </Col>
        </>
    )

    return (
        <div className={styles.tab}>
            <Row style={{ height: "80vh" }}>
                {OrderListComponent}
            </Row>
        </div>
    )
}