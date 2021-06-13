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
import EmptyComponent from '../../components/Empty'
import PropTypes from 'prop-types'
import withSession from '../../lib/session'
import fetchJson from '../../lib/fetchJson'
import shoppingCartService from '../../services/shoppingCart'

const axios = require('axios')

const CheckoutPage = ({ user, tableId = null }) => {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const [shoppingCartData, setShoppingCartData] = React.useState({ 'order': [] })
    const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
    const [countMenuItems, setCountMenuItems] = React.useState(0);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [userProfile, setUserProfile] = React.useState(0);
    const [haveCheckOutPermission, setHaveCheckOutPermission] = React.useState(false)
    const [haveMenuInBasket, setHaveMenuInBasket] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        console.log('user', user)
        console.log('tableId', tableId)
        if (tableId && tableId !== null && tableId !== 'null') {
            setHaveCheckOutPermission(true)
        }
        if (user) {
            if (user.profile) {
                setUserProfile(user.profile)
                setInitialCart()
            }
        }


        // if (typeof window !== 'undefined') {
        //     let basket = window.localStorage.getItem('basket');
        //     basket = JSON.parse(basket)
        //     if (basket) {
        //         try {
        //             setShoppingCartData(basket)
        //             let order = basket.order
        //             setCountMenuItems(order.length)
        //             if (order.length > 0) {
        //                 setHaveMenuInBasket(true)
        //             }
        //             let total_price = 0
        //             order.map((menu) => total_price += menu.total)
        //             setTotalPrice(total_price)
        //         } catch (error) {
        //             message.warning('Please select order before check out order.')
        //         }
        //     }
        // }
    }, [user])

    const setInitialCart = () => {
        shoppingCartService.getShoppingCart().then((response) => {
            if (response === 'Not Login') {
                message.warning('Please login and scan qr code again.')
            } else {
                let shoppingCart = response
                if (shoppingCart === "") {
                    message.warning('Please select order before check out order.')
                } else {
                    let shoppingCartItems = shoppingCart.shopping_cart_items
                    setShoppingCartData(shoppingCart)
                    let countCartItems = 0
                    shoppingCartItems.forEach((cartItem) => countCartItems += cartItem.quantity)
                    setCountMenuItems(countCartItems)
                    if (countCartItems > 0) {
                        setHaveMenuInBasket(true)
                    }
                    let total_price = 0
                    shoppingCartItems.map((menu) => total_price += menu.total)
                    setTotalPrice(total_price)
                }
            }
        })
    }

    const reduceOrderMenu = (menuIndex) => {
        let existingCartItem = shoppingCartData.shopping_cart_items
        let newTotal = shoppingCartData.total
        let newCartItem = [...existingCartItem]
        let newCart = { ...shoppingCartData }
        let newTotalPrice = totalPrice

        if (newCartItem[menuIndex].quantity === 1) {
            newTotalPrice = newTotalPrice - newCartItem[menuIndex].price
            setTotalPrice(newTotalPrice)
            newCartItem.splice(menuIndex, 1)

        } else {
            newCartItem[menuIndex].quantity = newCartItem[menuIndex].quantity - 1
            newCartItem[menuIndex].total = newCartItem[menuIndex].total - newCartItem[menuIndex].price
            newTotalPrice = newTotalPrice - newCartItem[menuIndex].price
            setTotalPrice(newTotalPrice)
        }
        let newCountMenuItems = countMenuItems
        setCountMenuItems(newCountMenuItems - 1)

        newCart.shopping_cart_items = newCartItem
        newCart.total = newTotalPrice
        console.log('newCart', newCart)
        setShoppingCartData({ ...newCart })
        updateShoppingCart(newCart)
    }

    const AddOrderMenu = (menuIndex) => {
        let existingCartItem = shoppingCartData.shopping_cart_items
        let newCartItem = [...existingCartItem]
        let newCart = { ...shoppingCartData }
        newCartItem[menuIndex].quantity = newCartItem[menuIndex].quantity + 1
        newCartItem[menuIndex].total = newCartItem[menuIndex].total + newCartItem[menuIndex].price
        let newTotalPrice = totalPrice
        newTotalPrice = newTotalPrice + newCartItem[menuIndex].price
        newCart.shopping_cart_items = newCartItem
        newCart.total = newTotalPrice
        let newCountMenuItems = countMenuItems
        setCountMenuItems(newCountMenuItems + 1)
        setShoppingCartData({ ...newCart })
        setTotalPrice(newTotalPrice)
        updateShoppingCart(newCart)
    }

    const updateShoppingCart = (newCart) => {
        console.log('newCart', newCart)
        let shopping_cart_items = []
        newCart.shopping_cart_items.forEach((cartItem) => {
            shopping_cart_items.push({
                "menu": cartItem.menu.id,
                "quantity": cartItem.quantity,
                "price": cartItem.price,
                "total": cartItem.total,
                "special_instruction": cartItem.special_instruction
            })
        })
        console.log('shoppingCartData', shoppingCartData)
        let cartDataForm = {
            "restaurant": shoppingCartData.restaurant.id,
            "shopping_cart_items": shopping_cart_items
        }

        console.log('cartDataForm', cartDataForm)
        shoppingCartService.updateShoppingCart(cartDataForm).then((response) => {
            console.log('response', response)
        }).catch(error => {
            console.log('updateShoppingCart error', error)
        })
    }

    const onCheckOutOrder = async () => {

        if (haveCheckOutPermission) {
            if (userProfile) {
                if (haveMenuInBasket) {
                    setLoading(true)
                    let userId = userProfile.id
                    console.log(userId)
                    let restaurantId = shoppingCartData.restaurant.id

                    let order_items = []
                    let orders = shoppingCartData.shopping_cart_items
                    orders.map((order) => {
                        order_items.push({
                            "menu": order.menu.id,
                            "quantity": order.quantity,
                            "price": order.price,
                            "total": order.total,
                            "special_instruction": order.special_instruction
                        })
                    })

                    let data = {
                        "restaurant": restaurantId,
                        "restaurant_table": tableId,
                        "user": userId,
                        "order_items": order_items
                    }

                    console.log('order data', data)
                    let response = await partnerSerivce.addOrder(data)
                    console.log('response', response)
                    message.success('Check out order successful.')
                    localStorage.removeItem("basket")
                    setConfirmModalVisible(false)
                    await fetchJson('/api/checkoutOrder', { method: 'POST' }).then((response) => {
                        console.log('response', response)
                        setLoading(false)
                        router.push({
                            pathname: "/orderHistory"
                        })
                    }).catch(error => {
                        setLoading(false)
                        console.log('api/checkoutOrder', error)
                    })

                } else {
                    message.warning('Please select order before check out order.')
                }
            } else {
                message.warning('User not found. Please login and try again.')
            }
        } else {
            message.warning('Please scan qr code for check out menu.')
            setConfirmModalVisible(false)
        }

    }

    let MenuListComponentMobile = shoppingCartData.shopping_cart_items && shoppingCartData.shopping_cart_items.map((cartItem, index) => {
        return (
            <Row style={{ height: "6rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }} key={cartItem.id}>
                <Col xs={4} style={{ paddingRight: "0px", height: "100%" }}>
                    <Image src={cartItem.menu.image_url} rounded style={{ height: "100%" }} />
                </Col>
                <Col xs={8}>
                    <Row>
                        <Col>
                            <b>{cartItem.menu.name}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ color: "#D1D1D1", fontSize: "14px" }}>
                            * {cartItem.special_instruction}
                        </Col>
                    </Row>
                    <Row >
                        <Col xs={4} style={{ margin: "auto" }}>
                            <b>{cartItem.price}</b>
                        </Col>
                        <Col xs={8} style={{ textAlign: "right" }}>
                            <Button style={{ padding: "1px 6px", border: "1px solid #DEDEDE", backgroundColor: "white" }}>
                                <Row>
                                    <Col >
                                        <MinusOutlined onClick={() => reduceOrderMenu(index)} style={{ fontSize: "12px", color: "#DEDEDE" }} />
                                    </Col>
                                    <Col style={{ fontSize: "0.7rem", margin: "auto", padding: "0px 5px", color: "black" }}>
                                        {cartItem.quantity}
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

    let MenuListComponentWeb = shoppingCartData.shopping_cart_items && shoppingCartData.shopping_cart_items.map((cartItem, index) => {
        return (
            <Row style={{ height: "12rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }} key={cartItem.id}>
                <Col xs={4} style={{ paddingRight: "0px", height: "100%" }}>
                    <Image src={cartItem.menu.image_url} rounded style={{ height: "100%" }} />
                </Col>
                <Col xs={8}>
                    <Row>
                        <Col>
                            <b>{cartItem.menu.name}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ color: "#D1D1D1", fontSize: "14px" }}>
                            * {cartItem.special_instruction}
                        </Col>
                    </Row>
                    <Row >
                        <Col xs={4} style={{ margin: "auto" }}>
                            <b>{cartItem.price}</b>
                        </Col>
                        <Col xs={8} style={{ textAlign: "right" }}>
                            <Button style={{ padding: "1px 6px", border: "1px solid #DEDEDE", backgroundColor: "white" }}>
                                <Row>
                                    <Col >
                                        <MinusOutlined onClick={() => reduceOrderMenu(index)} style={{ fontSize: "12px", color: "#DEDEDE" }} />
                                    </Col>
                                    <Col style={{ fontSize: "0.7rem", margin: "auto", padding: "0px 5px", color: "black" }}>
                                        {cartItem.quantity}
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
                                {
                                    countMenuItems > 0 ? MenuListComponentMobile : <EmptyComponent />
                                }
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
                                                <b> {totalPrice} ฿</b>
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
                                                0 รายการ
                                            </Col>
                                            <Col style={{ textAlign: "right" }}>
                                                <b>฿ </b>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col>
                                                <Button className={styles.checkout_button} >
                                                    ไม่มีรายการอาหาร
                                                </Button>
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
                ) : (
                    <>
                        <Layout>
                            <Container className={utilStyles.container}>
                                {
                                    countMenuItems > 0 ? MenuListComponentWeb : <EmptyComponent />
                                }
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
                                                <b> {totalPrice} ฿</b>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col>
                                                <Button className={styles.checkout_button} disabled={loading} onClick={() => setConfirmModalVisible(true)}>
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
                                                0 รายการ
                                            </Col>
                                            <Col style={{ textAlign: "right" }}>
                                                <b>฿ </b>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col>
                                                <Button className={styles.checkout_button} >
                                                    ไม่มีรายการอาหาร
                                                </Button>
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
                        <div style={{ textAlign: "center" }} className={utilStyles.fontContent}>
                            ยืนยันการสั่งอาหาร
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ textAlign: "center", color: "#85878b" }} className={utilStyles.font_size_sm}>
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
                            <Button style={{ width: "90%", backgroundColor: "#FF4A4F", border: "#FF4A4F" }} onClick={props.check_out_order} className={utilStyles.fontContent}>ยืนยัน</Button>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    );
}


export default CheckoutPage

CheckoutPage.propTypes = {
    user: PropTypes.shape({
        isLoggedIn: PropTypes.bool,
    }),
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    let user = req.session.get('user')
    let tableId = null
    try {
        tableId = req.session.get('tableId')
    } catch (error) {
        console.log('error,', error)
    }
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
            return {
                props: { user, tableId },
            }
        }

    } else {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
})