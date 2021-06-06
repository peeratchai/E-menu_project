import Layout from '../../../layout'
import utilStyles from '../../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Breadcrumb } from 'react-bootstrap'
import { Card as Cardantd, Select, Button, Spin } from 'antd';
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
import moment from 'moment'

const { Meta } = Cardantd;


export default function RestaurantDetailMobile(props) {
    const { loading } = props
    const router = useRouter()
    const { restaurant } = router.query;
    //// Set State
    const showBasketButton = ""
    const [modalShow, setModalShow] = React.useState(false);
    const [categoryList, setCategoryList] = React.useState([{ categoryName: 'เมนูยำ', isActive: true }, { categoryName: 'เมนูข้าว', isActive: false }, { categoryName: 'เมนูลูกชิ้น', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน7', isActive: false }, { categoryName: 'เมนูแซลม่อน8', isActive: false }, { categoryName: 'เมนูแซลม่อน9', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }]);
    const [menuEachCategory, setMenuEachCategory] = React.useState("");
    const [categorySelected, setCategorySelected] = React.useState("");
    const [lat, setLat] = React.useState(13.8537968);
    const [lng, setLng] = React.useState(100.3764991);
    const [locationName, setLocationName] = React.useState()
    const [locationId, setLocationId] = React.useState()
    const [restaurantBannerPicture, setRestaurantBannerPicture] = React.useState()
    const [menuSelected, setMenuSelected] = React.useState()
    const [have_menu_in_basket, setHave_menu_in_basket] = React.useState(false)
    const [basket, setBasket] = React.useState({ 'order': [], 'total': 0 })
    const [isViewRestaurantFromPromotionPage, setIsViewRestaurantFromPromotionPage] = React.useState(false);
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
        if (props && props.restaurant_detail !== undefined) {
            let { restaurant_detail, location_id, location_name } = props
            let categoryList = []
            restaurant_detail.menu_categories.map((category, index) => {
                if (index === 0) {
                    categoryList.push({ categoryName: category.name, isActive: true })
                } else {
                    categoryList.push({ categoryName: category.name, isActive: false })
                }
            })

            let { lat, lng } = changeFormatLatLong(restaurant_detail.location)
            setLat(parseFloat(lat))
            setLng(parseFloat(lng))
            setCategoryList(categoryList)
            setCategorySelected(categoryList[0].categoryName)
            renderMenuList(restaurant_detail)
            setRestaurantDetail(restaurant_detail)
            setRestaurantBanner(restaurant_detail)

            if (location_id === undefined && location_name === undefined) {
                setIsViewRestaurantFromPromotionPage(true)
            } else {
                setLocationName(location_name)
                setLocationId(location_id)
            }
            checkMenuFromBasket()
        }

    }, [props])

    const checkMenuFromBasket = () => {
        let existingBasket = window.localStorage.getItem('basket');
        if (existingBasket) {
            existingBasket = JSON.parse(existingBasket)
            setBasket(existingBasket)
            setHave_menu_in_basket(true)
        }

        setModalShow(false)
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

    const renderMenuList = (restaurantDetail) => {
        let categorySection = restaurantDetail.menu_categories.map((category, categoryIndex) => {
            let styleCard = styles.menu_card

            let menucard = category.menus.map((menu, menuIndex) => {
                if (menuIndex > 0) {
                    styleCard = styleCard + " " + styles.borderTop
                }
                return (
                    <Col xs={12} className={styleCard} key={menu.name + menuIndex} onClick={() => (setMenuSelected(menu), setModalShow(true))}>
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
            )

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
                                    <Breadcrumb.Item>{restaurantDetail.name}</Breadcrumb.Item>
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
                                            Price <span style={{ color: "#74b100" }}><b>30-400</b></span> baht
                                                    </Col>
                                        <Col style={{ color: "#74b100" }}>
                                            Open now!
                                            </Col>
                                    </Row>
                                    <Row style={{ marginTop: "10px" }}>
                                        <Col style={{ paddingBottom: "15px" }}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
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
                                                    <LocationOnIcon /> &nbsp; {restaurantDetail.googleMapsAddress}
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
                                                            <div style={{ textAlign: "right", color: "#74b100 " }}>
                                                                {
                                                                    moment(restaurantDetail.current_business_hour.opening_time, 'HH.mm').format('HH.mm') < moment().format('HH.mm') &&
                                                                        moment(restaurantDetail.current_business_hour.closing_time, 'HH.mm').format('HH.mm') > moment().format('HH.mm') ? (
                                                                        'Open now!'
                                                                    ) : (
                                                                        'Close now!'
                                                                    )
                                                                }
                                                            </div>
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
                restaurant_id={props.restaurant_id}
            />
            <div className={have_menu_in_basket ? showBasketButton : utilStyles.hide} onClick={() => linkToCheckOutOrder()} style={{ position: "fixed", bottom: "0", left: "0", width: "100vw", zIndex: "10", height: "70px", backgroundColor: "white" }}>
                <div style={{ textAlign: "center" }}>
                    <Button style={{ width: "90vw", height: "50px", marginTop: "10px", padding: "5px", backgroundColor: "#ff4a4f", borderRadius: "5px", color: "white" }}>
                        <Row>
                            <Col>
                                <div stlye={{ textAlign: "left", paddingLeft: "10px" }}>
                                    Basket : {basket.order.length} Item
                                </div>
                            </Col>
                            <Col>
                                <div style={{ textAlign: "right", paddingRight: "10px" }}>
                                    {basket.total} Baht
                            </div>
                            </Col>
                        </Row>
                    </Button>
                </div>
            </div>
        </Layout>
    )
}