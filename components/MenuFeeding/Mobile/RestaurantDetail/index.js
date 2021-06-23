import Layout from '../../../layout'
import utilStyles from '../../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Breadcrumb, Modal } from 'react-bootstrap'
import { Card as Cardantd, Select, Button, Spin, message } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Carousel from 'react-bootstrap/Carousel'
import React, { useEffect, useRef } from 'react'
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import PhoneIcon from '@material-ui/icons/Phone';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import OrderMenuModal from '../../../Modal/OrderMenuModal'
import changeFormatLatLong from '../../../../services/chaneformatLatLong'
import PointInMaps from '../../../PointInMaps'
import shoppingCartService from '../../../../services/shoppingCart'
import moment from 'moment'

export default function RestaurantDetailMobile(props) {
    const { loading, shopping_cart, is_initial_cart, restaurant_detail, restaurant_id, is_user_signin } = props
    const { set_shopping_cart } = props
    const router = useRouter()
    //// Set State
    const showBasketButton = ""
    const [modalShow, setModalShow] = React.useState(false);
    const [categoryList, setCategoryList] = React.useState([]);
    const [menuEachCategory, setMenuEachCategory] = React.useState("");
    const [categorySelected, setCategorySelected] = React.useState("");
    const [lat, setLat] = React.useState(13.8537968);
    const [lng, setLng] = React.useState(100.3764991);
    const [locationName, setLocationName] = React.useState()
    const [locationId, setLocationId] = React.useState()
    const [restaurantBannerPicture, setRestaurantBannerPicture] = React.useState()
    const [menuSelected, setMenuSelected] = React.useState()
    const [haveShoppingCart, setHaveShoppingCart] = React.useState(false)
    const [basket, setBasket] = React.useState({ 'order': [], 'total': 0 })
    const [isViewRestaurantFromPromotionPage, setIsViewRestaurantFromPromotionPage] = React.useState(false);
    const [numberOfCartItem, setNumberOfCartItem] = React.useState(0)
    const [totalOfCartItem, setTotalOfCartItem] = React.useState(0)
    const [notificationModalVisible, setNotificationModalVisible] = React.useState(false);
    const [notificationRestaurantClosingModalVisible, setNotificationRestaurantClosingModalVisible] = React.useState(false);
    const [restaurantOpenNow, setRestaurantOpenNow] = React.useState(false);
    const [restaurantDetail, setRestaurantDetail] = React.useState({
        name: "",
        description: "",
        phone: "",
        website: "",
        facebook: "",
        business_hour: [],
        restaurant_pictures: [],
        price_from: "",
        price_to: "",
        current_business_hour: { opening_time: null, closing_time: null }
    })
    ////

    ////Set Ref
    const refsCategory = useRef([]);
    ////

    const categoryDropdownMobile = categoryList.map((category, index) => <Option value={category.categoryName} key={category.categoryName + index}>{category.categoryName}</Option>)
    const scrollindToCategorySectionMobile = (category) => {
        if (refsCategory.current[category] !== undefined) {
            refsCategory.current[category].scrollIntoView({ behavior: 'smooth' })
        }
        setCategorySelected(category)
    }


    useEffect(() => {
        if (restaurant_detail) {
            let { restaurant_detail, location_id, location_name } = props
            let categoryList = []
            restaurant_detail.menu_categories.sort((a, b) => a.sequence_number - b.sequence_number).map((category, index) => {
                if (category.is_active === true && category.menus.length > 0) {
                    console.log('category', category)
                    if (index === 0) {
                        categoryList.push({ categoryName: category.name, isActive: true })
                    } else {
                        categoryList.push({ categoryName: category.name, isActive: false })
                    }
                }
            })

            let { lat, lng } = changeFormatLatLong(restaurant_detail.location)
            setLat(parseFloat(lat))
            setLng(parseFloat(lng))
            setCategoryList(categoryList)
            setCategorySelected(categoryList[0].categoryName)
            let menuCategory = restaurant_detail.menu_categories.filter((menuCategory) => menuCategory.is_active === true && menuCategory.menus.length > 0)
            renderMenuList(menuCategory)
            setRestaurantDetail(restaurant_detail)

            console.log(restaurant_detail)
            console.log(moment().format('HH.mm'))
            console.log(moment(restaurant_detail.current_business_hour.opening_time, 'HH.mm').format('HH.mm'))
            console.log(moment(restaurant_detail.current_business_hour.closing_time, 'HH.mm').format('HH.mm'))
            if (restaurant_detail.current_business_hour && moment(restaurant_detail.current_business_hour.opening_time, 'HH.mm').format('HH.mm') < moment().format('HH.mm') && moment(restaurant_detail.current_business_hour.closing_time, 'HH.mm').format('HH.mm') > moment().format('HH.mm')) {
                console.log('Open')
                setRestaurantOpenNow(true)
            }

            setRestaurantBanner(restaurant_detail)

            if (location_id === undefined && location_name === undefined) {
                setIsViewRestaurantFromPromotionPage(true)
            } else {
                setLocationName(location_name)
                setLocationId(location_id)
            }
            console.log('shopping_cart', shopping_cart)
            if (Object.keys(shopping_cart).length > 0) {
                setInitialShoppingCart(shopping_cart)
            } else {
                setNumberOfCartItem(0)
                setTotalOfCartItem(0)
            }
        }
    }, [restaurant_detail, shopping_cart, restaurantOpenNow])

    const setInitialShoppingCart = (shoppingCart, update = false) => {
        console.log('shoppingCart', shoppingCart)
        let cartItems = shoppingCart.shopping_cart_items
        let numberOfCartItem = 0
        let total = 0
        cartItems.forEach((cartItem) => {
            numberOfCartItem += cartItem.quantity
            total += cartItem.total
        })

        setNumberOfCartItem(numberOfCartItem)
        setHaveShoppingCart(true)
        setTotalOfCartItem(total)
        if (update) {
            console.log('update')
            set_shopping_cart(shoppingCart)
        }
    }

    const checkMenuFromBasket = () => {
        let existingBasket = window.localStorage.getItem('basket');
        if (existingBasket) {
            existingBasket = JSON.parse(existingBasket)
            setBasket(existingBasket)
            setHaveShoppingCart(true)
        }

        setModalShow(false)
    }

    const onAddMenu = (menu) => {
        console.log('shopping_cart', shopping_cart)
        console.log('restaurantOpenNow', restaurantOpenNow)
        setMenuSelected(menu)
        if (is_user_signin) {
            if (restaurantOpenNow) {
                if (shopping_cart !== "") {
                    let restaurantIdOfCart = shopping_cart.restaurant
                    if (restaurant_id !== restaurantIdOfCart) {
                        console.log('have order in shopping cart and not the same restaurant.')
                        setNotificationModalVisible(true)
                    } else {
                        setModalShow(true)
                    }
                } else {
                    setModalShow(true)
                }
            } else {
                setNotificationRestaurantClosingModalVisible(true)
            }
        } else {
            message.warning('Please login before placing order.')
        }
    }

    const onTakeNewCart = () => {
        setModalShow(true)
        setHaveShoppingCart(false)
        setNotificationModalVisible(false)
        set_shopping_cart("")
    }

    const setRestaurantBanner = (restaurant_detail) => {
        let restaurantBanner = restaurant_detail.restaurant_pictures.map((picture) => (
            <Carousel.Item interval={1000}>
                <Image
                    className="d-block w-100"
                    src={picture.image_url}
                    style={{ height: "300px", objectFit: "cover" }}
                />
            </Carousel.Item>
        ))
        setRestaurantBannerPicture(restaurantBanner)
    }



    const linkToCheckOutOrder = () => [
        router.push({
            pathname: "/checkout"
        })
    ]

    const renderMenuList = (categoryList) => {
        let categorySection = categoryList.map((category, categoryIndex) => {
            let styleCard = styles.menu_card

            let menucard = category.menus.map((menu, menuIndex) => {
                if (menuIndex > 0) {
                    styleCard = styleCard + " " + styles.borderTop
                }
                if (menu.is_active === true) {
                    return (
                        <Col xs={12} className={styleCard} key={menu.name + menuIndex} onClick={() => onAddMenu(menu)}>
                            <Row style={{ height: "100%" }}>
                                <Col xs={9}>
                                    <Row>
                                        <Col style={{ fontSize: "14px", fontWeight: "bold" }}>
                                            {menu.name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ fontSize: "12px" }} xs={8}>
                                            {menu.description}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "10px", fontWeight: "bold" }}>
                                        <Col>
                                            {menu.price + " Baht"}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={3} style={{ paddingRight: "0px", height: "100%" }}>
                                    <Image src={menu.image_url} rounded style={{ height: "100%" }} />
                                </Col>
                            </Row>
                        </Col>
                    )
                }
            })

            return (
                <div key={category.name + categoryIndex}>
                    <div ref={(categoryRef) => (refsCategory.current[category.name] = categoryRef)} style={{ position: "relative", top: '-65px' }}>
                    </div>
                    <Row className={styles.category_section} >
                        <Col xs={12}>
                            <div className={utilStyles.fontTitleMobile + " " + styles.categoryHeader}>
                                {category.name}
                            </div>
                        </Col>
                        <Col xs={12}>
                            <Row className={styles.menu_section}>
                                {menucard}
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        })
        // console.log(categorySection)

        setMenuEachCategory(categorySection)
    }

    const business_hourHTML = restaurantDetail && restaurantDetail.business_hour.map((business_hour) => (
        <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
            <Row>
                <Col>
                    <div>
                        <b>{business_hour.day}</b>
                    </div>
                </Col>
                <Col>
                    <div style={{ textAlign: "right" }}>
                        {business_hour.opening_time} - {business_hour.closing_time}
                    </div>
                </Col>
            </Row>
        </div>
    ))

    return (
        <Layout containerType="mobile" searchFunc={() => console.log('none')} page="restaurantDetails" menuInBasket={basket}>
            <Container className={utilStyles.container_sm}>
                <Breadcrumb>
                    {
                        isViewRestaurantFromPromotionPage ?
                            (
                                <>
                                    <Link href="/" passHref>
                                        <Breadcrumb.Item>All Promotions</Breadcrumb.Item>
                                    </Link>
                                </>
                            ) :
                            (
                                <>
                                    <Link href="/menuFeeding" passHref>
                                        <Breadcrumb.Item>{locationName}</Breadcrumb.Item>
                                    </Link>
                                    <Link
                                        href={{
                                            pathname: '/menuFeeding/restaurantList',
                                            query: { locationId: locationId, locationName: locationName },
                                        }}
                                        passHref
                                    >
                                        <Breadcrumb.Item>Restaurant List</Breadcrumb.Item>
                                    </Link>
                                </>
                            )
                    }

                    <Breadcrumb.Item active>{restaurantDetail.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Carousel>
                    {restaurantBannerPicture}
                </Carousel>
                <Spin spinning={loading} tip="Loading...">
                    <Card>
                        <Card.Body>
                            <Card.Title>{restaurantDetail.name}</Card.Title>
                            <Card.Text className={styles.card_text}>
                                <div className={styles.restaurant_details}>
                                    <Row>
                                        <Col style={{ borderRight: "1px solid #dee2e6" }}>
                                            Price <span style={{ color: "#74b100" }}><b>{restaurantDetail.price_from}-{restaurantDetail.price_to}</b></span> baht
                                        </Col>
                                        {
                                            restaurantOpenNow ? (
                                                <Col style={{ color: "#74b100" }}>
                                                    Open now!
                                                </Col>
                                            ) : (
                                                <Col style={{ color: "red" }}>
                                                    Close now!
                                                </Col>
                                            )
                                        }
                                    </Row>
                                    <Row style={{ marginTop: "10px" }}>
                                        <Col style={{ paddingBottom: "15px" }}>
                                            {restaurantDetail.description}
                                        </Col>
                                    </Row>
                                </div>

                                <div className={styles.categoryDropdown}>
                                    <Select defaultValue="restaurantManagement" value={categorySelected} style={{ width: '100%' }} onChange={(category) => scrollindToCategorySectionMobile(category)}>
                                        {categoryDropdownMobile}
                                    </Select>
                                </div>

                                <Row>
                                    <Col>
                                        {menuEachCategory}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} className={utilStyles.font_size_sm} style={{ marginTop: "20px" }}>
                                        <div style={{ backgroundColor: "#f0f2f3", marginBottom: "30px" }}>
                                            <div style={{ width: "100%", height: "240px" }}>
                                                <GoogleMapReact
                                                    bootstrapURLKeys={{ key: 'AIzaSyAqDX2CqFjdgUBY2QqPfUMlMDGS1gjttPw' }}
                                                    center={{
                                                        lat: lat,
                                                        lng: lng,
                                                    }}
                                                    defaultZoom={11}
                                                >
                                                    <PointInMaps
                                                        lat={lat}
                                                        lng={lng}
                                                        name={restaurantDetail.name}
                                                    />
                                                </GoogleMapReact>
                                            </div>
                                            <div style={{ padding: "1.25rem" }}>
                                                <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
                                                    <LocationOnIcon /> &nbsp; {restaurantDetail.address}
                                                </div>
                                                <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
                                                    <PhoneIcon /> &nbsp; {restaurantDetail.phone}
                                                </div>
                                                <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
                                                    <LanguageIcon /> &nbsp; <a href="#">{restaurantDetail.website}</a>
                                                </div>
                                                <div style={{ padding: "10px 0" }}>
                                                    <FacebookIcon style={{ color: "#3b5998", fontSize: "40px", marginRight: "5px" }} /> <TwitterIcon style={{ color: "#1da1f2", fontSize: "40px" }} />
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ backgroundColor: "#f0f2f3" }}>
                                            <div style={{ padding: "1.25rem" }}>
                                                <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }} >
                                                    <QueryBuilderIcon /> &nbsp; <b>OPENING HOURS</b>
                                                </div>
                                                <div style={{ padding: "15px 0" }}>
                                                    <Row>
                                                        <Col>
                                                            <div>
                                                                <b>Today</b>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            {
                                                                restaurantOpenNow ? (
                                                                    <div style={{ textAlign: "right", color: "#74b100 " }}>
                                                                        Open now!
                                                                    </div>
                                                                ) : (
                                                                    <div style={{ textAlign: "right", color: "red" }}>
                                                                        Close now!
                                                                    </div>
                                                                )
                                                            }
                                                        </Col>
                                                    </Row>
                                                </div>
                                                {business_hourHTML}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Spin>
            </Container>
            <OrderMenuModal
                show={modalShow}
                onHide={() => checkMenuFromBasket()}
                menu_detail={menuSelected}
                restaurant_id={restaurant_id}
                shopping_cart={shopping_cart}
                is_initial_cart={is_initial_cart}
                set_initial_shopping_cart={setInitialShoppingCart}
            />
            <NotificationShoppingCartModal
                show={notificationModalVisible}
                onHide={() => setNotificationModalVisible(false)}
                take_new_cart={onTakeNewCart}
            />
            <NotificationRestaurantClosingModalVisible
                show={notificationRestaurantClosingModalVisible}
                onHide={() => setNotificationRestaurantClosingModalVisible(false)}
            />
            <div className={haveShoppingCart ? showBasketButton : utilStyles.hide} onClick={() => linkToCheckOutOrder()} style={{ position: "fixed", bottom: "0", left: "0", width: "100vw", zIndex: "10", height: "70px", backgroundColor: "white" }}>
                <div style={{ textAlign: "center" }}>
                    <Button style={{ width: "90vw", height: "50px", marginTop: "10px", padding: "5px", backgroundColor: "#ff4a4f", borderRadius: "5px", color: "white" }}>
                        <Row>
                            <Col>
                                <div stlye={{ textAlign: "left", paddingLeft: "10px" }}>
                                    Basket : {numberOfCartItem} Item
                                </div>
                            </Col>
                            <Col>
                                <div style={{ textAlign: "right", paddingRight: "10px" }}>
                                    {totalOfCartItem} Baht
                                </div>
                            </Col>
                        </Row>
                    </Button>
                </div>
            </div>
        </Layout>
    )
}

function NotificationShoppingCartModal(props) {
    const [loading, setLoading] = React.useState(false)

    const onDeleteShopping = () => {
        setLoading(true)
        shoppingCartService.deleteShoppingCart().then((response) => {
            if (response && response.is_success) {
                props.take_new_cart()
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
                                <Button style={{ width: "90%", backgroundColor: "#c0cacc", border: "1px solid #c0cacf", color: "white" }} onClick={props.onHide} className={utilStyles.fontContent}>ยกเลิก</Button>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ textAlign: "center" }}>
                                <Button style={{ width: "90%", backgroundColor: "#FF4A4F", border: "#FF4A4F", color: "white" }} onClick={() => onDeleteShopping()} className={utilStyles.fontContent}>ยืนยัน</Button>
                            </div>
                        </Col>
                    </Row>
                </Spin>
            </Modal.Body>
        </Modal >
    );
}

function NotificationRestaurantClosingModalVisible(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ padding: "1.3rem" }}
        >

            <Modal.Body>
                <Row>
                    <Col>
                        <div style={{ textAlign: "center", fontWeight: "bold" }} className={utilStyles.fontContent}>
                            ร้านค้าปิดแล้ว กรุณาสั่งใหม่ในเวลาเปิดร้าน
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <div style={{ textAlign: "center" }}>
                            <Button type="primary" style={{ width: "90%" }} onClick={props.onHide} className={utilStyles.fontContent}>ตกลง</Button>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    );
}
