import Layout from '../../../layout'
import utilStyles from '../../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Breadcrumb } from 'react-bootstrap'
import { Card as Cardantd, Select, Button } from 'antd';
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
import AddMenuModal from '../../../Modal/AddMenuModal'
import changeFormatLatLong from '../../../../services/chaneformatLatLong'
import PointInMaps from '../../../PointInMaps'

const { Meta } = Cardantd;


export default function RestaurantDetailMobile(props) {
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
    const [locationLatLong, setLocationLatLong] = React.useState("");
    const [menuSelected, setMenuSelected] = React.useState()
    const [have_menu_in_basket, setHave_menu_in_basket] = React.useState(false)
    const [menu_in_basket, setMenu_in_basket] = React.useState()
    const [restaurantDetail, setRestaurantDetail] = React.useState({
        name: "",
        description: "",
        phone: "",
        website: "",
        facebook: "",
        business_hour: [],
        restaurant_pictures: [],
        price_from: "",
        price_to: ""
    })
    ////

    ////Set Ref
    const refsCategory = useRef([]);
    ////

    const categoryDropdownMobile = categoryList.map((category, index) => <Option value={category.categoryName} key={category.categoryName + index}>{category.categoryName}</Option>)
    const scrollindToCategorySectionMobile = (category) => {
        console.log(refsCategory)
        console.log(category)
        if (refsCategory.current[category] !== undefined) {
            refsCategory.current[category].scrollIntoView({ behavior: 'smooth' })
        }
        setCategorySelected(category)
    }


    useEffect(() => {
        if (props && props.restaurant_detail !== undefined) {
            let { restaurant_detail, location_id, location_name, location_lat_long } = props
            let categoryList = []
            restaurant_detail.menu_categories.map((category, index) => {
                if (index === 0) {
                    categoryList.push({ categoryName: category.name, isActive: true })
                } else {
                    categoryList.push({ categoryName: category.name, isActive: false })
                }
            })

            let { lat, lng } = changeFormatLatLong(restaurant_detail.location)
            setLocationLatLong(location_lat_long)
            setLat(parseFloat(lat))
            setLng(parseFloat(lng))
            setCategoryList(categoryList)
            setCategorySelected(categoryList[0].categoryName)
            renderMenuList(restaurant_detail)
            setRestaurantDetail(restaurant_detail)
            setRestaurantBanner(restaurant_detail)
            setLocationName(location_name)
            setLocationId(location_id)
            checkMenuFromBasket()
        }

    }, [props])

    const checkMenuFromBasket = () => {
        let basket = window.localStorage.getItem('basket');
        console.log(basket)
        if (basket !== undefined && basket !== null) {
            console.log('have menu in basket')
            setMenu_in_basket(basket)
            setHave_menu_in_basket(true)
        }
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

    const renderMenuList = (restaurantDetail) => {
        let categorySection = restaurantDetail.menu_categories.map((category, categoryIndex) => {
            let menucard = category.menus.map((menu, menuIndex) =>
                <Col xs={6} className={styles.menu_card} key={menu.name + menuIndex} onClick={() => (setMenuSelected(menu), setModalShow(true))}>
                    <Cardantd
                        bodyStyle={{ padding: "5px" }}
                        cover={
                            <img
                                alt="example"
                                src={menu.image_url}
                                style={{ height: '120px' }}
                            />
                        }
                        actions={[
                            <b>{menu.price + " Baht"}</b>
                        ]}
                    >
                        <Meta
                            title={menu.name}
                            description="This is the description"
                        />
                    </Cardantd>
                </Col>
            )

            return (
                <div key={category.name + categoryIndex}>
                    <div ref={(categoryRef) => (refsCategory.current[category.name] = categoryRef)} style={{ position: "relative", top: '-65px' }}>
                    </div>
                    <Row className={styles.category_section} >
                        <Col xs={12}>
                            <div className={utilStyles.font_size_xl + " " + styles.categoryHeader}>
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
                        <b>Monday</b>
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
        <Layout containerType="mobile" searchFunc={() => console.log('none')} page="restaurantDetails" menuInBasket={menu_in_basket}>
            <Container className={utilStyles.container_sm}>
                <Breadcrumb>
                    <Link href="/menuFeeding" passHref>
                        <Breadcrumb.Item>{locationName}</Breadcrumb.Item>
                    </Link>
                    <Link
                        href={{
                            pathname: '/menuFeeding/restaurantList',
                            query: { locationId: locationId, locationName: locationName, locationLatLong: locationLatLong },
                        }}
                        passHref
                    >
                        <Breadcrumb.Item>Restaurant List</Breadcrumb.Item>
                    </Link>
                    <Breadcrumb.Item active>{restaurant}</Breadcrumb.Item>
                </Breadcrumb>
                <Carousel>
                    {restaurantBannerPicture}
                </Carousel>
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
                                                            Open Now!
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
            </Container>
            <AddMenuModal
                show={modalShow}
                onHide={() => (setModalShow(false), checkMenuFromBasket())}
                menu_detail={menuSelected}
            />
            <div className={have_menu_in_basket ? showBasketButton : utilStyles.hide} style={{ position: "fixed", bottom: "0", left: "0", width: "100vw", zIndex: "10", height: "70px", backgroundColor: "white" }}>
                <div style={{ textAlign: "center" }}>
                    <Button style={{ width: "90vw", height: "50px", marginTop: "10px", padding: "5px", backgroundColor: "#ff4a4f", borderRadius: "5px", color: "white" }}>
                        <Row>
                            <Col>
                                <div stlye={{ textAlign: "left", paddingLeft: "10px" }}>
                                    Basket : 1 Item
                                </div>
                            </Col>
                            <Col>
                                <div style={{ textAlign: "right", paddingRight: "10px" }}>
                                    189 Baht
                            </div>
                            </Col>
                        </Row>
                    </Button>
                </div>
            </div>
        </Layout>
    )
}