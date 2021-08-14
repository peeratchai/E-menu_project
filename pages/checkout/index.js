import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import React, { useEffect } from 'react'
import { Row, Col, Image, Button, Modal, Container } from 'react-bootstrap'
import { Spin } from 'antd'
import useMediaQuery from "../../utils/utils";
import { useRouter } from 'next/router'
import 'antd/dist/antd.css';
import { message } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import partnerSerivce from '../../services/partner'
import EmptyComponent from '../../components/Empty'
import PropTypes from 'prop-types'
import withSession from '../../lib/session'
import shoppingCartService from '../../services/shoppingCart'
import fetchJson from '../../lib/fetchJson'

const axios = require('axios')

const CheckoutPage = ({ user, tableId = null, shoppingRestaurantId = null }) => {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const [shoppingCartData, setShoppingCartData] = React.useState({ 'order': [] })
    const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
    const [countMenuItems, setCountMenuItems] = React.useState(0);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [userProfile, setUserProfile] = React.useState(0);
    const [haveCheckOutPermission, setHaveCheckOutPermission] = React.useState(false)
    const [haveMenuInCart, setHaveMenuInCart] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [notificationModalVisible, setNotificationModalVisible] = React.useState(false);
    const [isShowLoginModal, setIsShowLoginModal] = React.useState(false);
    const [subHeaderLoginModal, setSubHeaderLoginModal] = React.useState(null)

    useEffect(() => {
        console.log('user', user)
        console.log('tableId', tableId)
        if (tableId && tableId !== null && tableId !== 'null') {
            setHaveCheckOutPermission(true)
        }
        if (user) {
            if (user.profile) {
                setUserProfile(user.profile)
            }
        }
        setInitialCart()

    }, [user])

    const setInitialCart = () => {
        shoppingCartService.getShoppingCart().then((response) => {
            console.log('response', response)
            let shoppingCart
            if (response === 'Not Login') {
                shoppingCart = window.localStorage.getItem('shoppingCart')
                shoppingCart = JSON.parse(shoppingCart)
            } else {
                shoppingCart = response
            }
            if (shoppingCart && shoppingCart !== "") {
                let shoppingCartItems = shoppingCart.shopping_cart_items
                setShoppingCartData(shoppingCart)
                let countCartItems = 0
                shoppingCartItems.forEach((cartItem) => countCartItems += cartItem.quantity)
                setCountMenuItems(countCartItems)
                if (countCartItems > 0) {
                    setHaveMenuInCart(true)
                }
                let total_price = 0
                shoppingCartItems.map((menu) => total_price += menu.total)
                setTotalPrice(total_price)
            } else {
                message.warning('Please select order before check out order.')
                setShoppingCartData({ 'order': [] })
                setCountMenuItems(0)
                setHaveMenuInCart(false)
                setTotalPrice(0)
            }
        })
    }

    const reduceOrderMenu = (menuIndex) => {
        let existingCartItem = shoppingCartData.shopping_cart_items
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
        setLoading(true)
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
            if (response === 'Not Login') {
                window.localStorage.setItem('shoppingCart', JSON.stringify(newCart))
            }
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            console.log('updateShoppingCart error', error)
        })
    }

    const onCheckOutOrder = async () => {
        if (!haveCheckOutPermission) {
            if (userProfile) {
                if (haveMenuInCart) {
                    setLoading(true)
                    let userId = userProfile.id
                    console.log(userId)
                    console.log(shoppingCartData)
                    let restaurantId = shoppingCartData.restaurant.id
                    if (shoppingRestaurantId === restaurantId) {
                        console.log('same restaurant')
                        let restaurantName = shoppingCartData.restaurant.name
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
                        let addOrderResponse = await partnerSerivce.addOrder(data)
                        console.log('addOrderResponse', addOrderResponse)
                        if (addOrderResponse) {
                            if (addOrderResponse.is_success) {
                                shoppingCartService.deleteShoppingCart().then(async (deleteShoppingCartResponse) => {
                                    if (deleteShoppingCartResponse) {
                                        if (deleteShoppingCartResponse.is_success) {
                                            message.success('Check out order successful.')
                                            setConfirmModalVisible(false)
                                            setLoading(false)
                                            router.push({
                                                pathname: '/menuFeeding/restaurantList/' + restaurantName,
                                                query: { restaurantId: restaurantId }
                                            })
                                        }
                                    }
                                }).catch(error => {
                                    console.log('error', error)
                                    setLoading(false)
                                })
                            }
                        }
                    } else {
                        console.log('dif restaurant')
                        setNotificationModalVisible(true)
                        setConfirmModalVisible(false)
                        setLoading(false)
                    }
                } else {
                    message.warning('Please select order before check out order.')
                }
            } else {
                message.warning('User not found. Please login and try again.')
                //// login show
                setSubHeaderLoginModal('(Food in basket will not be stored in system if not logged in.)')
                setIsShowLoginModal(true)
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
                                    <Col style={{ fontSize: "0.7rem", margin: "auto", padding: "0px 5px", color: "white" }}>
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
                                    <Col style={{ fontSize: "0.7rem", margin: "auto", padding: "0px 5px", color: "white" }}>
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

    const additionalOrder = () => {

        let restaurantName = shoppingCartData.restaurant.name
        let restaurantId = shoppingCartData.restaurant.id

        router.push({
            pathname: '/menuFeeding/restaurantList/' + restaurantName,
            query: { restaurantId: restaurantId }
        })
    }

    const redirectToRestaurant = async () => {
        setLoading(true)
        let restaurantName = shoppingCartData.restaurant.name
        let restaurantId = shoppingCartData.restaurant.id

        await fetchJson('/api/checkoutOrder', { method: 'POST' }).then((response) => {
            console.log('response', response)
            setLoading(false)
            router.push({
                pathname: '/menuFeeding/restaurantList/' + restaurantName,
                query: { restaurantId: restaurantId }
            })
        }).catch(error => {
            setLoading(false)
            console.log('api/checkoutOrder', error)
        })
    }

    const setDefaultShowLoginModal = () => {
        setIsShowLoginModal(false);
    };

    return (
        <>
            {
                isMobileResolution ? (
                    <>
                        <Layout
                            containerType="mobile"
                            is_show_login_modal={isShowLoginModal}
                            set_is_show_login_modal={setDefaultShowLoginModal}
                            sub_header={subHeaderLoginModal}
                        >
                            <Container className={utilStyles.container_sm} >
                                {
                                    haveMenuInCart && (
                                        <div style={{ width: "100%", textAlign: "right", marginBottom: "15px" }}>
                                            <Button onClick={() => additionalOrder()}>สั่งอาหารเพิ่ม</Button>
                                        </div>
                                    )
                                }
                                <Spin spinning={loading}>
                                    {
                                        countMenuItems > 0 ? (
                                            <div style={{ maxHeight: "calc(100vh - 300px)", overflowY: "scroll", overflowX: "hidden" }}>
                                                {MenuListComponentMobile}
                                            </div>
                                        ) : <EmptyComponent />
                                    }
                                </Spin>
                            </Container>
                        </Layout >
                        {
                            countMenuItems > 0 ? (
                                <div style={{ position: "absolute", bottom: 0, width: "100%", fontSize: "16px", borderTop: "1px solid #DEDEDE", backgroundColor: "#eaeff3" }} className="bg-gray-100">
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
                                        <Row style={{ marginBottom: "10px" }}>
                                            <Col>
                                                <Button className={styles.checkout_button} onClick={() => setConfirmModalVisible(true)}>
                                                    สั่ง {countMenuItems} รายการ
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ position: "absolute", bottom: 0, width: "100%", fontSize: "16px", borderTop: "1px solid #DEDEDE", backgroundColor: "#eaeff3" }} className="bg-gray-100">
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
                                        <Row style={{ marginBottom: "10px" }}>
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
                            loading={loading}
                        />
                    </>
                ) : (
                    <>
                        <Layout>
                            <Container className={utilStyles.container}>
                                {
                                    haveMenuInCart && (
                                        <div style={{ width: "100%", textAlign: "right", marginBottom: "15px" }}>
                                            <Button onClick={() => additionalOrder()}>สั่งอาหารเพิ่ม</Button>
                                        </div>
                                    )
                                }
                                <Spin spinning={loading}>
                                    {
                                        countMenuItems > 0 ? (
                                            <div style={{ maxHeight: "calc(100vh - 300px)", overflowY: "scroll", overflowX: "hidden" }}>
                                                {MenuListComponentWeb}
                                            </div>
                                        ) : <EmptyComponent />
                                    }
                                </Spin>

                            </Container>
                        </Layout >
                        {
                            countMenuItems > 0 ? (
                                <div style={{ position: "absolute", bottom: 0, width: "100%", fontSize: "16px", borderTop: "1px solid #DEDEDE", backgroundColor: "#eaeff3" }} className="bg-gray-100">
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
                                        <Row style={{ marginBottom: "10px" }}>
                                            <Col>
                                                <Button className={styles.checkout_button} disabled={loading} onClick={() => setConfirmModalVisible(true)}>
                                                    สั่ง {countMenuItems} รายการ
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ position: "absolute", bottom: 0, width: "100%", fontSize: "16px", borderTop: "1px solid #DEDEDE", backgroundColor: "#eaeff3" }} className="bg-gray-100">
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
                                        <Row style={{ marginBottom: "10px" }}>
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
                            loading={loading}
                        />
                        <NotificationShoppingCartModal
                            show={notificationModalVisible}
                            onHide={() => setNotificationModalVisible(false)}
                            redirect_to_restaurant={redirectToRestaurant}
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
                <Spin spinning={props.loading}>
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
                                <Button style={{ width: "90%", backgroundColor: "#78100E", border: "#78100E" }} onClick={props.check_out_order} className={utilStyles.fontContent}>ยืนยัน</Button>
                            </div>
                        </Col>
                    </Row>
                </Spin>
            </Modal.Body>
        </Modal >
    );
}

function NotificationShoppingCartModal(props) {
    const [loading, setLoading] = React.useState(false)

    const onDeleteShopping = () => {
        setLoading(true)
        shoppingCartService.deleteShoppingCart().then((response) => {

            message.success('Delete shopping cart successful.')
            if (response && response.is_success) {
                props.redirect_to_restaurant()
                props.onHide()
            }
            setLoading(false)
        }).catch(error => {
            console.log('error', error)
            setLoading(false)
        })
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ padding: "1.3rem" }}
        >

            <Modal.Body>
                <Spin spinning={loading} tip="Loading...">
                    <Row>
                        <Col>
                            <div style={{ textAlign: "center" }} className={utilStyles.fontContent}>
                                มีรายการสินค้าค้างอยู่ในตะกร้าจากร้านอื่น
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{ textAlign: "center", color: "#85878b" }} className={utilStyles.font_size_sm}>
                                ต้องการยกเลิกรายการในตะกร้าและสั่งใหม่หรือไม่
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
                                <Button style={{ width: "90%", backgroundColor: "#78100E", border: "#78100E" }} onClick={() => onDeleteShopping()} className={utilStyles.fontContent}>ยืนยัน</Button>
                            </div>
                        </Col>
                    </Row>
                </Spin>
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
    let user = req.session.get('user') ? req.session.get('user') : null
    let tableId = null
    let shoppingRestaurantId = null
    let tableIdSession = req.session.get('tableId')
    let restaurantIdSession = req.session.get('restaurantId')
    if (tableIdSession) {
        tableId = tableIdSession
    }
    if (restaurantIdSession) {
        shoppingRestaurantId = restaurantIdSession
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
                props: { user, tableId, shoppingRestaurantId },
            }
        }

    } else {
        return { props: { user, tableId, shoppingRestaurantId } }
    }
})