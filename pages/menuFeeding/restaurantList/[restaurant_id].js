
import 'antd/dist/antd.css';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import { message, Spin } from 'antd'
import useMediaQuery from "../../../utils/utils";
import RestaurantDetailMobile from '../../../components/MenuFeeding/Mobile/RestaurantDetail'
import RestaurantDetailWeb from '../../../components/MenuFeeding/Web/RestaurantDetail'
import restaurantService from '../../../services/restaurant'
import checkUserPermission from '../../../lib/checkUserPermission'
import fetchJson from '../../../lib/fetchJson'
import shoppingCartService from '../../../services/shoppingCart'
import utilStyles from '../../../styles/utils.module.css'


export default function Restaurant() {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { locationId, locationName, restaurantId, tableId, tableName } = router.query;
    ////Set State
    const [restaurantDetail, setRestaurantDetail] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const { mutateUser } = checkUserPermission()
    const [shoppingCart, setShoppingCart] = React.useState({})
    const [isInitialCart, setIsInitialCart] = React.useState(false)
    const [isUserSignin, setIsUserSignin] = React.useState(false);
    const [notificationModalVisible, setNotificationModalVisible] = React.useState(false);

    useEffect(() => {
        if (router.isReady) {
            if (restaurantId === undefined) {
                router.push({
                    pathname: "/menuFeeding"
                })
            } else {
                setLoading(true)
                setInitialData()
            }
        }
    }, [router.isReady])

    const setInitialData = async () => {
        getRestaurantDetail(restaurantId).then(async (restaurantDetail) => {
            console.log('restaurantDetail', restaurantDetail)
            shoppingCartService.getShoppingCart().then((response) => {
                console.log('shoppingCart response', response)
                if (response === 'Not Login') {
                    message.warning('Please login before take order.')
                } else {
                    setIsUserSignin(true)
                    let shoppingCart = response
                    if (shoppingCart === "") {
                        setShoppingCart(shoppingCart)
                    } else {
                        let cartItems = []
                        shoppingCart.shopping_cart_items.forEach((cartItem) => {
                            cartItems.push({
                                "menu": cartItem.menu.id,
                                "quantity": cartItem.quantity,
                                "price": cartItem.price,
                                "total": cartItem.total,
                                "special_instruction": cartItem.special_instruction
                            })
                        })
                        let newShoppingCart = {
                            "restaurant": shoppingCart.restaurant.id,
                            "shopping_cart_items": cartItems
                        }

                        setShoppingCart(newShoppingCart)
                        setIsInitialCart(true)
                        console.log('shoppingCart', shoppingCart)
                        if (tableId !== undefined) {
                            if (tableName) {
                                message.success(`You've checked in ${tableName} at ${restaurantDetail.name}. Let's start ordering!`, 4)
                            } else {
                                message.success(`You've checked at ${restaurantDetail.name}. Let's start ordering!`, 4)
                            }
                            if (restaurantId === shoppingCart.restaurant.id) {
                                console.log('Same restaurant')
                                saveTableOnScanQrCode().then((response) => {
                                    console.log('response', response)
                                }).catch(error => {
                                    console.log('error', error)
                                })
                            } else {
                                console.log('Dif restaurant')
                                setNotificationModalVisible(true)
                            }
                        }
                    }
                }

            }).catch(error => {
                console.log('error', error)
                message.warning('Please login before take order.')
            })
            setRestaurantDetail(restaurantDetail)
            setLoading(false)

        }).catch((error) => {
            setLoading(false)
            console.log('error', error)
        })
    }

    const saveTableOnScanQrCode = async () => {
        await mutateUser(
            fetchJson('/api/saveTable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tableId: tableId, restaurantId: restaurantId }),
            })
        )
    }

    const getRestaurantDetail = async (restaurantId) => {
        let response = await restaurantService.getRestaurantById(restaurantId)
        return response.data
    }

    const settingShoppintCart = (shoppingCart) => {
        console.log('setShoppingCart', shoppingCart)
        setShoppingCart(shoppingCart)
    }

    const resetShoppingCart = () => {
        setShoppingCart("")
        saveTableOnScanQrCode().then((response) => {
            console.log('response', response)
            if (tableName) {
                message.success(`You've checked in ${tableName} at ${restaurantDetail.name}. Let's start ordering!`, 4)
            } else {
                message.success(`You've checked at ${restaurantDetail.name}. Let's start ordering!`, 4)
            }
            setNotificationModalVisible(false)
        }).catch(error => {
            console.log('error', error)
            setNotificationModalVisible(false)
        })
    }

    return (
        <>
            {
                !isMobileResolution ? (
                    // PC Version
                    <RestaurantDetailWeb
                        restaurant_detail={restaurantDetail}
                        location_name={locationName}
                        location_id={locationId}
                        restaurant_id={restaurantId}
                        table_id={tableId}
                        loading={loading}
                        shopping_cart={shoppingCart}
                        set_shopping_cart={settingShoppintCart}
                        is_initial_cart={isInitialCart}
                        is_user_signin={isUserSignin}
                    />
                ) : (
                    // Mobile Version
                    <RestaurantDetailMobile
                        restaurant_detail={restaurantDetail}
                        location_name={locationName}
                        location_id={locationId}
                        restaurant_id={restaurantId}
                        table_id={tableId}
                        loading={loading}
                        shopping_cart={shoppingCart}
                        set_shopping_cart={settingShoppintCart}
                        is_initial_cart={isInitialCart}
                        is_user_signin={isUserSignin}
                    />
                )
            }
            <NotificationShoppingCartModal
                show={notificationModalVisible}
                onHide={() => setNotificationModalVisible(false)}
                set_shopping_cart={resetShoppingCart}
            />
        </>
    )
}


function NotificationShoppingCartModal(props) {
    const [loading, setLoading] = React.useState(false)

    const onDeleteShopping = () => {
        setLoading(true)
        shoppingCartService.deleteShoppingCart().then((response) => {
            if (response && response.is_success) {
                props.set_shopping_cart()
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
                                <Button style={{ width: "90%", backgroundColor: "#FF4A4F", border: "#FF4A4F" }} onClick={() => onDeleteShopping()} className={utilStyles.fontContent}>ยืนยัน</Button>
                            </div>
                        </Col>
                    </Row>
                </Spin>
            </Modal.Body>
        </Modal >
    );
}