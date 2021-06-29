import Layout from '../../../layout'
import utilStyles from '../../../../styles/utils.module.css'
import { Row, Col, Card, Image, Button, Breadcrumb, Modal } from 'react-bootstrap'
import { Card as Cardantd, message, Spin } from 'antd';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router'
import styles from './index.module.css'
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
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import OrderMenuModal from '../../../Modal/OrderMenuModal'
import changeFormatLatLong from '../../../../services/chaneformatLatLong'
import PointInMaps from '../../../PointInMaps'
import moment from 'moment'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import shoppingCartService from '../../../../services/shoppingCart';
import InfiniteScroll from "react-infinite-scroll-component";

const { Meta } = Cardantd;
const MenuItem = ({ text, selected }) => {
    return <div
        className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};
export const Menu = (categoryList, selected) =>
    categoryList.map((el, index) => {
        const { categoryName } = el;

        return <MenuItem text={categoryName} key={categoryName} selected={selected} />;
    });

const ArrowLeft = <LeftOutlined className='arrow-prev' />
const ArrowRight = <RightOutlined className='arrow-next' />

const getDimensions = ele => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;

    return {
        height,
        offsetTop,
        offsetBottom,
    };
};

export default function RestaurantDetailWeb(props) {

    const { loading, shopping_cart, is_initial_cart, restaurant_id, is_user_signin } = props
    const { set_shopping_cart } = props
    ////Set State
    const [selected, setSelected] = React.useState('')
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
    const [modalShow, setModalShow] = React.useState(false);
    const [menuEachCategory, setMenuEachCategory] = React.useState("");
    const [widthCategoryNav, setWidthCategoryNav] = React.useState();
    const [widthCategoryList, setWidthCategoryList] = React.useState();
    const [categoryList, setCategoryList] = React.useState([]);
    const [restaurantBannerPicture, setRestaurantBannerPicture] = React.useState()
    const [locationName, setLocationName] = React.useState()
    const [locationId, setLocationId] = React.useState()
    const [menuSelected, setMenuSelected] = React.useState()
    const [lat, setLat] = React.useState(13.8537968);
    const [lng, setLng] = React.useState(100.3764991);
    const [notificationModalVisible, setNotificationModalVisible] = React.useState(false);
    const [notificationRestaurantClosingModalVisible, setNotificationRestaurantClosingModalVisible] = React.useState(false);
    const [isViewRestaurantFromPromotionPage, setIsViewRestaurantFromPromotionPage] = React.useState(false);
    const [visibleSection, setVisibleSection] = React.useState();
    const [restaurantOpenNow, setRestaurantOpenNow] = React.useState(false);
    ////Set Ref
    const refCategoryNav = React.useRef();
    const refCategoryList = React.useRef();
    const refEachCategory = React.useRef({});
    const refsCategory = React.useRef([]);
    const headerRef = React.useRef(null);
    ////

    useEffect(() => {
        if (props && props.restaurant_detail !== undefined) {
            let { restaurant_detail, location_id, location_name } = props
            let categoryList = []
            restaurant_detail.menu_categories.sort((a, b) => a.sequence_number - b.sequence_number).forEach((category, index) => {
                //// set initial isActive for button category 
                if (category.is_active === true && category.menus.length > 0) {
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
            setSelected(categoryList[0] && categoryList[0].categoryName)
            let menuCategory = restaurant_detail.menu_categories.filter((menuCategory) => menuCategory.is_active === true && menuCategory.menus.length > 0)
            renderMenuList(menuCategory)
            // activeCategory()
            setRestaurantDetail(restaurant_detail)

            if (restaurant_detail.current_business_hour && moment(restaurant_detail.current_business_hour.opening_time, 'HH.mm').format('HH.mm') < moment().format('HH.mm') && moment(restaurant_detail.current_business_hour.closing_time, 'HH.mm').format('HH.mm') > moment().format('HH.mm')) {
                setRestaurantOpenNow(true)
            }

            setRestaurantBanner(restaurant_detail)

            if (location_id === undefined && location_name === undefined) {
                setIsViewRestaurantFromPromotionPage(true)
            } else {
                setLocationName(location_name)
                setLocationId(location_id)
            }

        }

        const handleScroll = () => {
            const { height: headerHeight } = getDimensions(headerRef.current);
            const scrollPosition = window.scrollY - headerHeight - 120;
            let indexOfCategory = null
            const selected = refsCategory.current.find((ref, index) => {
                const ele = ref;
                if (ele) {
                    const { offsetBottom, offsetTop } = getDimensions(ele);
                    if (scrollPosition > offsetTop && scrollPosition < offsetBottom) {
                        indexOfCategory = index
                    }
                    return scrollPosition > offsetTop && scrollPosition < offsetBottom;
                }
            });

            if (selected && categoryList[indexOfCategory].categoryName !== visibleSection) {
                setVisibleSection(categoryList[indexOfCategory].categoryName);
                setSelected(categoryList[indexOfCategory].categoryName)
            } else if (!selected && visibleSection) {
                setVisibleSection(undefined);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, [props, widthCategoryList, widthCategoryNav, visibleSection, restaurantOpenNow])

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


    const toggleClassSelectedCategory = (index) => {
        let currentCategoryList = categoryList
        currentCategoryList.filter((category) => category.isActive == true).forEach(category => category.isActive = false)
        currentCategoryList[index].isActive = !currentCategoryList[index].isActive
        setCategoryList(currentCategoryList)
        activeCategory()
    }



    const setClassNameCategoryNav = (category, index) => {
        if (category.isActive) {
            if (index == 0) {
                return styles.category_first_child_active
            } else {
                return styles.category_active
            }
        } else {
            if (index == 0) {
                return styles.category_first_child
            } else {
                return styles.category
            }
        }
    }

    const onClickCategory = (index) => {
        toggleClassSelectedCategory(index)
        scrollToCategorySection(index)
    }

    const activeCategory = () => {

        let widthCategoryNav = refCategoryNav.current.offsetWidth
        let widthCategoryList = refCategoryList.current.offsetWidth
        if (widthCategoryList <= widthCategoryNav) {
            setStyleButtonRight(styles.nav_scroller_button_right + " " + styles.hide)
        } else {
            setStyleButtonRight(styles.nav_scroller_button_right)
        }

        let tempCategoryNav = categoryList.map((category, index) =>
        (
            <div ref={(elementRef) => refEachCategory.current[index] = elementRef} className={setClassNameCategoryNav(category, index) + " " + utilStyles.font_size_md + " " + styles.category_nav} key={category.categoryName + index} onClick={() => onClickCategory(index)}>
                {category.categoryName}
            </div >
        ))

        setWidthCategoryList(widthCategoryList)
        setWidthCategoryNav(widthCategoryNav)
        setCategoryNav(tempCategoryNav)
        setWidthOfEechCategoryButton()
    }

    const setWidthOfEechCategoryButton = () => {
        let currentCategoryList = categoryList
        currentCategoryList.map((category, index) => {
            try {
                category.width = refEachCategory.current[index].offsetWidth
                category.offsetTop = refsCategory.current[index].offsetTop
            } catch (error) {
                // console.log(refEachCategory)
            }
        })
        // console.log(currentCategoryList)
    }

    const scrollToCategorySection = (index) => {

        if (refsCategory.current[index] !== undefined) {
            const element = document.getElementById(categoryList[index].categoryName);
            const yOffset = -90;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

    const onAddMenu = (menu) => {
        console.log('shopping_cart', shopping_cart)
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
        setNotificationModalVisible(false)
        set_shopping_cart("")
    }
    const updateShoppingCart = (shoppingCart) => {
        console.log('update_shopping_cart', shoppingCart)
        set_shopping_cart(shoppingCart)
    }

    const renderMenuList = (categoryList) => {
        let categorySection = categoryList.map((category, categoryIndex) => {
            let menuCard = category.menus.map((menu, menuIndex) => {
                if (menu.is_active === true) {
                    return (
                        <Col xs={6} className={styles.menu_card} key={menu + menuIndex} onClick={() => onAddMenu(menu)}>
                            <Cardantd
                                cover={
                                    <img
                                        alt="example"
                                        src={menu.image_url}
                                        style={{ height: '200px' }}
                                    />
                                }
                                actions={[
                                    <b style={{ color: "black" }}>{menu.price + " Baht"}</b>
                                ]}
                            >
                                <Meta
                                    title={menu.name}
                                    description={menu.description}
                                />
                            </Cardantd>
                        </Col>
                    )

                }
            })
            return (
                <div id={category.name} ref={(categoryRef) => (refsCategory.current[categoryIndex] = categoryRef)} style={{ position: "relative" }} key={category.categoryName + categoryIndex}>
                    <Row className={styles.category_section} >
                        <Col xs={12}>
                            <div className={utilStyles.font_size_xl + " " + styles.categoryHeader}>
                                {category.name}
                            </div>
                        </Col>
                        <Col xs={12}>
                            <Row className={styles.menu_section}>
                                {menuCard}
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        })
        setMenuEachCategory(categorySection)
    }

    const business_hourHTML = restaurantDetail && restaurantDetail.business_hour.map((business_hour) => {
        if (business_hour && business_hour.opening_time) {
            return (
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
            )
        }

    })

    const onSelect = (key) => {
        setSelected(key);
        let index = categoryList.findIndex((category) => category.categoryName === key)
        scrollToCategorySection(index);
    }

    return (
        <Layout>
            <div className={styles.container}>
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
                </Breadcrumb >
                <Carousel>
                    {restaurantBannerPicture}
                </Carousel>
                <Spin spinning={loading} tip="Loading...">
                    <Card style={{ cursor: "auto" }}>
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



                                <Row style={{ marginTop: "15px" }}>
                                    <Col md={8}>
                                        <div className={styles.nav_category_layout} ref={headerRef}>
                                            <ScrollMenu
                                                data={Menu(categoryList, selected)}
                                                arrowLeft={ArrowLeft}
                                                arrowRight={ArrowRight}
                                                selected={selected}
                                                scrollToSelected={true}
                                                onSelect={onSelect}
                                                wheel={false}
                                                hideSingleArrow={true}
                                                hideArrows={true}
                                                alignCenter={true}
                                            />
                                        </div>

                                        <div className={styles.menu_list}>
                                            {menuEachCategory}
                                        </div>
                                    </Col>


                                    <Col md={4} className={utilStyles.font_size_md} style={{ marginTop: "20px" }}>
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
            </div >
            <OrderMenuModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                menu_detail={menuSelected}
                restaurant_id={restaurant_id}
                shopping_cart={shopping_cart}
                is_initial_cart={is_initial_cart}
                update_shopping_cart={updateShoppingCart}
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
        </Layout >
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
                            <Button style={{ width: "90%" }} onClick={props.onHide} className={utilStyles.fontContent}>ตกลง</Button>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    );
}
