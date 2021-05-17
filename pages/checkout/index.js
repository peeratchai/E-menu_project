import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import React, { useEffect } from 'react'
import { Row, Col, Form, Image, Button, Modal, Container, Tabs } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import { useRouter } from 'next/router'
import 'antd/dist/antd.css';
import { message } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import partnerSerivce from '../../services/partner'

export default function CheckoutPage() {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const [basketData, setBasketData] = React.useState({ 'order': [] })
    const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
    const [countMenuItems, setCountMenuItems] = React.useState(0);
    const [totalPrice, setTotalPrice] = React.useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let basket = window.localStorage.getItem('basket');
            basket = JSON.parse(basket)
            if (basket) {
                setBasketData(basket)
                let order = basket.order
                setCountMenuItems(order.length)
                let total_price = 0
                order.map((menu) => total_price += menu.total)
                setTotalPrice(total_price)
            }
        }
    }, [])

    const reduceOrderMenu = (menuIndex) => {
        let oldOrder = basketData.order
        let newOrder = [...oldOrder]
        let newBasket = { ...basketData }
        if (newOrder[menuIndex].count === 1) {
            newOrder.splice(menuIndex, 1)

        } else {
            newOrder[menuIndex].count = newOrder[menuIndex].count - 1
            newOrder[menuIndex].total = newOrder[menuIndex].total - newOrder[menuIndex].price
        }

        let newCountMenuItems = countMenuItems
        newCountMenuItems = newCountMenuItems - 1
        let newTotalPrice = totalPrice
        newTotalPrice = newTotalPrice - newOrder[menuIndex].price
        setTotalPrice(newTotalPrice)
        setCountMenuItems(newCountMenuItems)
        newBasket.order = newOrder
        setBasketData({ ...newBasket })
    }

    const AddOrderMenu = (menuIndex) => {
        let oldOrder = basketData.order
        let newOrder = [...oldOrder]
        let newBasket = { ...basketData }
        newOrder[menuIndex].count = newOrder[menuIndex].count + 1
        newOrder[menuIndex].total = newOrder[menuIndex].total + newOrder[menuIndex].price
        let newCountMenuItems = countMenuItems
        newCountMenuItems = newCountMenuItems + 1
        let newTotalPrice = totalPrice
        newTotalPrice = newTotalPrice + newOrder[menuIndex].price
        setTotalPrice(newTotalPrice)
        setCountMenuItems(newCountMenuItems)
        newBasket.order = newOrder
        console.log(newBasket)
        setBasketData({ ...newBasket })
    }

    const onCheckOutOrder = async () => {
        let profile = window.localStorage.getItem('profile');
        if (profile) {
            profile = JSON.parse(profile)
            let userId = profile.id
            console.log(userId)
            let restaurantId = basketData.restaurantId
            let order_items = []
            let orders = basketData.order
            orders.map((order) => {
                order_items.push({
                    "menu": order.id,
                    "quantity": order.count,
                    "price": order.price,
                    "total": order.total,
                    "special_instruction": order.specialInstruction
                })
            })

            let data = {
                "restaurant": restaurantId,
                "restaurant_table": "020a9d42-f055-4aef-8375-75af5f896d73",
                "user": userId,
                "order_items": order_items
            }
            console.log('data', data)
            let response = await partnerSerivce.addOrder(data)
            console.log('response', response)
            message.success('Check out order successful.')
            setConfirmModalVisible(false)
        } else {
            message.error('Please login before check out order and try agian.')
        }

    }

    let MenuListComponent = basketData.order && basketData.order.map((menu, index) => {
        return (
            <Row style={{ height: "6rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }} key={menu.id}>
                <Col xs={4} style={{ paddingRight: "0px", height: "100%" }}>
                    <Image src={menu.image_url} rounded style={{ height: "100%" }} />
                </Col>
                <Col xs={8}>
                    <Row>
                        <Col>
                            <b>{menu.name}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ color: "#D1D1D1", fontSize: "14px" }}>
                            * {menu.specialInstruction}
                        </Col>
                    </Row>
                    <Row >
                        <Col xs={4} style={{ margin: "auto" }}>
                            <b>{menu.total}</b>
                        </Col>
                        <Col xs={8} style={{ textAlign: "right" }}>
                            <Button style={{ padding: "1px 6px", border: "1px solid #DEDEDE", backgroundColor: "white" }}>
                                <Row>
                                    <Col >
                                        <MinusOutlined onClick={() => reduceOrderMenu(index)} style={{ fontSize: "12px", color: "#DEDEDE" }} />
                                    </Col>
                                    <Col style={{ fontSize: "0.7rem", margin: "auto", padding: "0px 5px", color: "black" }}>
                                        {menu.count}
                                    </Col>
                                    <Col>
                                        <PlusOutlined onClick={() => AddOrderMenu(index)} style={{ fontSize: "12px", color: "#DEDEDE" }} />
                                    </Col>
                                </Row>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    })


    return (
        <>
            {
                isMobileResolution ? (
                    <>
                        <Layout containerType="mobile">
                            <Container className={utilStyles.container_sm}>
                                {MenuListComponent}
                                {/* <br />
                                <Row style={{ height: "6rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                    <Col xs={4} style={{ paddingRight: "0px", height: "100%" }}>
                                        <Image src='/images/food4.jpg' rounded style={{ height: "100%" }} />
                                    </Col>
                                    <Col xs={8}>
                                        <Row>
                                            <Col>
                                                <b>ยำปลาหมึก</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ color: "#D1D1D1", fontSize: "14px" }}>
                                                * เผ็ดน้อย
                                        </Col>
                                        </Row>
                                        <Row >
                                            <Col xs={4} style={{ margin: "auto" }}>
                                                <b>฿ 80</b>
                                            </Col>
                                            <Col xs={8} style={{ textAlign: "right" }}>
                                                <Button style={{ padding: "1px 6px", border: "1px solid #DEDEDE", backgroundColor: "white" }}>
                                                    <Row>
                                                        <Col >
                                                            <MinusOutlined style={{ fontSize: "12px", color: "#DEDEDE" }} />
                                                        </Col>
                                                        <Col style={{ fontSize: "0.7rem", margin: "auto", padding: "0px 5px", color: "black" }}>
                                                            1
                                                    </Col>
                                                        <Col>
                                                            <PlusOutlined style={{ fontSize: "12px", color: "#DEDEDE" }} />
                                                        </Col>
                                                    </Row>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row> */}
                            </Container>
                        </Layout >
                        {
                            countMenuItems > 0 ? (
                                <div style={{ position: "absolute", bottom: 0, width: "100%", fontSize: "16px", marginBottom: "10px", borderTop: "1px solid #DEDEDE" }} className="bg-gray-100">
                                    <div className="bg-gray-100 container-sm " style={{ paddingTop: "10px" }}>
                                        <Row>
                                            <Col>
                                                {countMenuItems} รายการ
                                    </Col>
                                            <Col style={{ textAlign: "right" }}>
                                                <b>฿ {totalPrice}</b>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col>
                                                <Button className={styles.checkout_button} onClick={() => setConfirmModalVisible(true)}>
                                                    สั่ง {countMenuItems} รายการ
                                        </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ position: "absolute", bottom: 0, width: "100%", fontSize: "16px", marginBottom: "10px", borderTop: "1px solid #DEDEDE" }} className="bg-gray-100">
                                    <div className="bg-gray-100 container-sm " style={{ paddingTop: "10px" }}>
                                        <Row>
                                            <Col>
                                                <div className={styles.checkout_button} >
                                                    ไม่มีรายการอาหาร
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )
                        }

                        <ConfirmOrderModal
                            show={confirmModalVisible}
                            onHide={() => setConfirmModalVisible(false)}
                            check_out_order={onCheckOutOrder}
                        />
                    </>
                ) : null
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
                            <Button style={{ width: "90%", backgroundColor: "#19c7d7", border: "#19c7d9" }} onClick={props.check_out_order} className={utilStyles.fontContent}>ยืนยัน</Button>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    );
}
