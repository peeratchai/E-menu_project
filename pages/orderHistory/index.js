import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import React, { useEffect } from 'react'
import { Row, Col, Form, Image, Button, Modal, Container, Tabs } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import { useRouter } from 'next/router'
import 'antd/dist/antd.css';
import { Card, InputNumber, message, Skeleton } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import orderService from '../../services/orderHistory'
import EmptyComponent from '../../components/Empty'
import moment from 'moment'
import withSession from '../../lib/session'
import PropTypes from 'prop-types'

const axios = require('axios')

const OrderHistory = ({ user }) => {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()

    const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
    const [orderHistory, setOrderHistory] = React.useState([]);
    const [haveOrderHistory, setHaveOrderHistory] = React.useState(false);
    const viewOrder = (order) => {
        router.push({
            pathname: "/orderHistory/orderDetails",
            query: { order: JSON.stringify(order) }
        })
    }

    useEffect(() => {

        console.log('OrderHistory -> user', user)
        if (user) {
            let profile = user.profile
            getOrderHistory(profile)
        }

    }, [user])

    const getOrderHistory = async (profile) => {
        console.log('profile', profile)
        let userId = profile.id
        let orderHistory = await orderService.getOrderHistoryByUserId(userId)
        console.log('orderHistory', orderHistory)

        if (orderHistory) {
            if (orderHistory.length > 0) {
                setOrderHistory(orderHistory)
                setHaveOrderHistory(true)
            }
        } else {
            message.error('Cannot get order history.')
        }

    }
    let total

    let MobileOrderHistoryComponent = orderHistory.map((order) => {
        total = 0
        order.order_items.forEach((orderItem) => total += orderItem.total)

        return (
            <>
                <Row style={{ height: "4rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }} onClick={() => viewOrder(order)}>
                    <Col xs={3} style={{ paddingRight: "0px", height: "100%" }}>
                        <Image src={order.restaurant.image_url} rounded style={{ height: "100%" }} />
                    </Col>
                    <Col xs={9}>
                        <Row>
                            <Col style={{ fontSize: "14px" }} xs={6}>
                                <div style={{ textOverflow: "ellipsis", overflow: "hidden", width: "100%", height: "1.2em", whiteSpace: "nowrap" }}>
                                    <LocationOnIcon style={{ fontSize: "12px", margin: "auto" }} />{order.restaurant.name}
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div style={{ textAlign: "right", fontSize: "12px", margin: "auto" }}>
                                    {moment(order.order_date).format('DD MMM YYYY')}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ fontSize: "12px" }} xs={8}>
                                {order.status}
                            </Col>
                            <Col xs={4}>
                                <div style={{ textAlign: "right", fontSize: "12px" }}>
                                    {moment(order.order_date).format('hh:mm A')}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ fontSize: "14px" }}>
                                <div style={{ textAlign: "right" }}>
                                    <b>Total : {total} ฿</b>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
            </>
        )
    })

    let WebOrderHistoryComponent = orderHistory.map((order) => {
        total = 0
        order.order_items.forEach((orderItem) => total += orderItem.total)

        return (
            <>
                <Row style={{ height: "12rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px", cursor: "pointer" }} onClick={() => viewOrder(order)}>
                    <Col xs={3} style={{ paddingRight: "0px", height: "100%" }}>
                        <Image src={order.restaurant.image_url} rounded style={{ height: "100%" }} />
                    </Col>
                    <Col xs={9} className={utilStyles.font_size_md}>
                        <Row>
                            <Col xs={8}>
                                <div style={{ textOverflow: "ellipsis", overflow: "hidden", width: "100%", height: "1.2em", whiteSpace: "nowrap" }}>
                                    <LocationOnIcon className={utilStyles.font_size_sm} />{order.restaurant.name}
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div style={{ textAlign: "right", margin: "auto" }}>
                                    {moment(order.order_date).format('DD MMM YYYY')}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8}>
                                {order.status}
                            </Col>
                            <Col xs={4}>
                                <div style={{ textAlign: "right" }} >
                                    {moment(order.order_date).format('hh:mm A')}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <div style={{ textAlign: "right" }}>
                                    <b>Total : {total} ฿</b>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
            </>
        )
    })

    return (
        <>
            {
                isMobileResolution ? (
                    <>
                        <Layout containerType="mobile">
                            <Container className={utilStyles.container_sm}>
                                {
                                    haveOrderHistory ? MobileOrderHistoryComponent : <EmptyComponent />
                                }
                            </Container>
                        </Layout >

                        <ConfirmOrderModal
                            show={confirmModalVisible}
                            onHide={() => setConfirmModalVisible(false)}
                        />
                    </>
                ) : (
                    <>
                        <Layout >
                            <Container className={utilStyles.container}>
                                {
                                    haveOrderHistory ? WebOrderHistoryComponent : <EmptyComponent />
                                }
                            </Container>
                        </Layout >

                        <ConfirmOrderModal
                            show={confirmModalVisible}
                            onHide={() => setConfirmModalVisible(false)}
                        />
                    </>
                )
            }
        </>
    )
}

function ConfirmOrderModal(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ padding: "1.3rem" }}
        >

            <Modal.Body>
                <Row>
                    <Col>
                        <div>
                            <Image src="/images/checklist.png" style={{ objectFit: "contain", paddingLeft: "20px", height: "7rem", marginTop: "30px" }} />
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <div style={{ textAlign: "center", color: "#85878b" }} className={utilStyles.fontContent}>
                            ยืนยันการสั่งอาหาร
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ textAlign: "center", color: "#ced2dc" }} className={utilStyles.font_size_sm}>
                            คุณต้องการยืนยันการสั่งอาหารหรือไม่
                        </div>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col>
                        <div style={{ textAlign: "center" }}>
                            <Button style={{ width: "90%", backgroundColor: "#c0cacc", border: "1px solid #c0cacf" }} onClick={props.onHide} className={utilStyles.fontContent}>ยกเลิก</Button>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ textAlign: "center" }}>
                            <Button style={{ width: "90%", backgroundColor: "#19c7d7", border: "#19c7d9" }} onClick={props.onHide} className={utilStyles.fontContent}>ยืนยัน</Button>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    );
}


export default OrderHistory

OrderHistory.propTypes = {
    user: PropTypes.shape({
        isLoggedIn: PropTypes.bool,
    }),
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    let user = req.session.get('user')
    if (user) {

        let config = {
            headers: {
                'Authorization': 'Bearer ' + user.accessToken,
            }
        }
        let reponse = await axios.get(`${process.env.API_URL}/profile`, config)
        let profile = reponse.data

        if (profile) {
            user.profile = profile

        }
        return {
            props: { user }
        }
    } else {
        return {
            props: { user }
        }
    }

})