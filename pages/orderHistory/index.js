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

export default function OrderHistory() {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()

    const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
    const [orderHistory, setOrderHistory] = React.useState([]);
    const [haveOrderHistory, setHaveOrderHistory] = React.useState(false);
    const [profile, setProfile] = React.useState();
    const viewOrder = (order) => {
        router.push({
            pathname: "/orderHistory/orderDetails",
            query: { order: JSON.stringify(order) }
        })
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let profile = window.localStorage.getItem('profile')
            if (profile) {
                profile = JSON.parse(profile)
                setProfile(profile)
                getOrderHistory(profile)
            }
        }
    }, [])

    const getOrderHistory = async (profile) => {
        console.log('profile', profile)
        let profileId = profile.id
        let orderHistory = await orderService.getOrderHistoryByUserId(profileId)
        if (orderHistory) {
            if (orderHistory.length > 0) {
                setOrderHistory(orderHistory)
                setHaveOrderHistory(true)
            }
        } else {
            message.error('Cannot get order history.')
        }

    }

    let OrderHistoryComponent = orderHistory.map((order) => {

        return (
            <>
                <Row style={{ height: "4rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }} onClick={() => viewOrder(order)}>
                    <Col xs={3} style={{ paddingRight: "0px", height: "100%" }}>
                        <Image src={order.restaurant.image_url} rounded style={{ height: "100%" }} />
                    </Col>
                    <Col xs={9}>
                        <Row>
                            <Col style={{ fontSize: "14px" }}>
                                <LocationOnIcon style={{ fontSize: "12px" }} /> {order.restaurant.name}
                            </Col>
                            <Col >
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
                                    <b>Total : 240 ฿</b>
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
                                    haveOrderHistory ? OrderHistoryComponent : <EmptyComponent />
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
                                    haveOrderHistory ? OrderHistoryComponent : <EmptyComponent />
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
