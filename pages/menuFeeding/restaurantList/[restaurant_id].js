import Layout from '../../../components/layout'
import utilStyles from '../../../styles/utils.module.css'
import { Row, Col, Card, Image, Button, Breadcrumb } from 'react-bootstrap'
import { Card as Cardantd } from 'antd';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router'
import styles from './index.module.css'
import Link from 'next/link'
import Carousel from 'react-bootstrap/Carousel'
import React, { useEffect, useRef } from 'react'
import useMediaQuery from "../../../utils/utils";
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import PhoneIcon from '@material-ui/icons/Phone';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import RestaurantDetailsMobile from '../../../components/RestaurantDetails/Mobile'
import AddMenuModal from '../../../components/Modal/AddMenuModal'

const { Meta } = Cardantd;
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Restaurant({ props }) {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { area, restaurant } = router.query;

    ////Set State
    const [modalShow, setModalShow] = React.useState(false);
    const [categoryNav, setCategoryNav] = React.useState();
    const [slidingPxCategoryNav, setslidingPxCategoryNav] = React.useState(0);
    const [styleButtonRight, setStyleButtonRight] = React.useState(styles.nav_scroller_button_right);
    const [styleButtonLeft, setStyleButtonLeft] = React.useState(styles.nav_scroller_button_left + " " + styles.hide);
    const [menuEachCategory, setMenuEachCategory] = React.useState("");
    const [widthCategoryNav, setWidthCategoryNav] = React.useState();
    const [widthCategoryList, setWidthCategoryList] = React.useState();
    const [categoryList, setCategoryList] = React.useState([{ categoryName: 'เมนูยำ', isActive: true }, { categoryName: 'เมนูข้าว', isActive: false }, { categoryName: 'เมนูลูกชิ้น', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน7', isActive: false }, { categoryName: 'เมนูแซลม่อน8', isActive: false }, { categoryName: 'เมนูแซลม่อน9', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }]);
    const [menuList, setMenuList] = React.useState(
        {
            'เมนูยำ': [
                { name: 'ยำรวมมิตร', price: 100, image: "/images/food4.jpg" },
                { name: 'ยำหมึกกระดอง', price: 150, image: "/images/food5.jpg" },
                { name: 'ยำหมึกสาย', price: 120, image: "/images/food6.jpg" }
            ],
            'เมนูข้าว': [
                { name: 'ข้าวผัดทะเลรวมมิตร', price: 80, image: "/images/food7.jpg" },
            ],
            'เมนูลูกชิ้น': [
                { name: 'Meatball', price: 60, image: "/images/food8.jpg" },

            ],
            'เมนูแซลม่อน': [
                { name: 'แซนมอน', price: 299, image: "/images/food9.jpg" },
            ],
            'เมนูแซลม่อน7': [
                { name: 'แซนมอน', price: 299, image: "/images/food9.jpg" },
            ],
            'เมนูแซลม่อน8': [
                { name: 'แซนมอน', price: 299, image: "/images/food9.jpg" },
            ],
            'เมนูแซลม่อน9': [
                { name: 'แซนมอน', price: 299, image: "/images/food9.jpg" },
            ]
        }
    );
    // const [categoryList, setCategoryList] = React.useState([{ categoryName: 'ยำ', isActive: true }, { categoryName: 'ข้าว', isActive: false }, { categoryName: 'เมนูลูกชิ้น', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'foodType', isActive: false }, { categoryName: 'foodType', isActive: false }, { categoryName: 'foodType', isActive: false }, , { categoryName: 'foodType', isActive: false }, , { categoryName: 'foodType', isActive: false }, , { categoryName: 'foodType', isActive: false }, , { categoryName: 'foodType', isActive: false }, , { categoryName: 'foodType', isActive: false }, , { categoryName: 'foodTypeFinal', isActive: false }]);
    ////

    ////Set Ref
    const refCategoryNav = React.useRef();
    const refCategoryList = React.useRef();
    const refEachCategory = React.useRef({});
    const refsCategory = useRef([]);
    ////



    const toggleClassSelectedCategory = (index) => {
        let currentCategoryList = categoryList
        currentCategoryList.filter((category) => category.isActive == true).forEach(category => category.isActive = false)
        currentCategoryList[index].isActive = !currentCategoryList[index].isActive
        console.log(currentCategoryList)
        setCategoryList(currentCategoryList)
        activeCategory()
    }

    useEffect(() => {
        if (isMobileResolution === false) {
            renderMenuList()
            activeCategory()
        }

    }, [widthCategoryList, widthCategoryNav])

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

    const activeCategory = () => {

        let widthCategoryNav = refCategoryNav.current.offsetWidth
        let widthCategoryList = refCategoryList.current.offsetWidth
        // console.log('widthCategoryNav', widthCategoryNav)
        // console.log('widthCategoryList', widthCategoryList)
        if (widthCategoryList <= widthCategoryNav) {
            setStyleButtonRight(styles.nav_scroller_button_right + " " + styles.hide)
        } else {
            setStyleButtonRight(styles.nav_scroller_button_right)
        }

        let tempCategoryNav = categoryList.map((category, index) =>
        (
            <div ref={(elementRef) => refEachCategory.current[index] = elementRef} className={setClassNameCategoryNav(category, index) + " " + utilStyles.font_size_md + " " + styles.category_nav} key={category.categoryName + index} onClick={() => { toggleClassSelectedCategory(index), scrollToCategorySection(index) }}>
                {category.categoryName}
            </div>
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
            refsCategory.current[index].scrollIntoView({ behavior: 'smooth' })
        }
    }

    const scrollCategoryNav = (direction) => {
        let differentWidthBetweenNavAndCategoryList = (widthCategoryList - widthCategoryNav)
        let currentslidingPxCategoryNav = slidingPxCategoryNav
        let slidingPx = 0


        if (direction === 'right') {
            if ((currentslidingPxCategoryNav - (widthCategoryNav / 2)) > (-differentWidthBetweenNavAndCategoryList)) {
                slidingPx = currentslidingPxCategoryNav - (widthCategoryNav / 2)
                setslidingPxCategoryNav(slidingPx)
            }
            if ((currentslidingPxCategoryNav - (widthCategoryNav / 2)) <= (-differentWidthBetweenNavAndCategoryList)) {
                slidingPx = -(differentWidthBetweenNavAndCategoryList)
                setslidingPxCategoryNav(slidingPx)
            }
        }

        if (direction === 'left') {
            if ((currentslidingPxCategoryNav + (widthCategoryNav / 2)) < 0) {
                slidingPx = currentslidingPxCategoryNav + (widthCategoryNav / 2)
                setslidingPxCategoryNav(slidingPx)
            }
            if ((currentslidingPxCategoryNav + (widthCategoryNav / 2)) >= 0) {
                setslidingPxCategoryNav(slidingPx)
            }
        }

        // console.log('slidingPx', slidingPx)
        // console.log('differentWidthBetweenNavAndCategoryList', differentWidthBetweenNavAndCategoryList)

        if (slidingPx < 0) {
            setStyleButtonLeft(styles.nav_scroller_button_left)
        } else {
            setStyleButtonLeft(styles.nav_scroller_button_left + " " + styles.hide)
        }

        if (slidingPx === -(differentWidthBetweenNavAndCategoryList)) {
            setStyleButtonRight(styles.nav_scroller_button_right + " " + styles.hide)
        } else {
            setStyleButtonRight(styles.nav_scroller_button_right)
        }
    }

    const renderMenuList = () => {
        // console.log(menuList)
        let categorySection = categoryList.map((category, index) => {
            // console.log(menuList[category.categoryName])
            let menucard = menuList[category.categoryName].map((menu) =>
                <Col xs={6} className={styles.menu_card} onClick={() => setModalShow(true)}>
                    <Cardantd
                        cover={
                            <img
                                alt="example"
                                src={menu.image}
                                style={{ height: '200px' }}
                            />
                        }
                        actions={[
                            <b>{menu.price + "Baht"}</b>
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
                <div>
                    <div ref={(categoryRef) => (refsCategory.current[index] = categoryRef)} style={{ position: "relative", top: '-65px' }}>

                    </div>
                    <Row className={styles.category_section} >
                        <Col xs={12}>
                            <div className={utilStyles.font_size_xl + " " + styles.categoryHeader}>
                                {category.categoryName}
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



    return (
        <>
            {
                !isMobileResolution ? (
                    // PC Version
                    <Layout>
                        <div className={styles.container}>
                            <Breadcrumb>
                                <Link href="/menuFeeding" passHref>
                                    <Breadcrumb.Item>{area}</Breadcrumb.Item>
                                </Link>
                                <Link href="/menuFeeding/restaurantList" passHref>
                                    <Breadcrumb.Item>Restaurant List</Breadcrumb.Item>
                                </Link>
                                <Breadcrumb.Item active>{restaurant}</Breadcrumb.Item>
                            </Breadcrumb>
                            <Carousel>
                                <Carousel.Item interval={1000}>
                                    <Image
                                        className="d-block w-100"
                                        src="/images/restaurant1.jpg"
                                        alt="First slide"
                                        style={{ height: "300px", objectFit: "cover" }}
                                    />
                                </Carousel.Item>
                                <Carousel.Item interval={500}>
                                    <Image
                                        className="d-block w-100"
                                        src="/images/restaurant1_1.jpg"
                                        alt="Second slide"
                                        style={{ height: "300px", objectFit: "cover" }}
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <Image
                                        className="d-block w-100"
                                        src="/images/restaurant1_2.jpg"
                                        alt="Third slide"
                                        style={{ height: "300px", objectFit: "cover" }}
                                    />
                                </Carousel.Item>
                            </Carousel>
                            <Card style={{ cursor: "auto" }}>
                                <Card.Body>
                                    <Card.Title>Park Hyatt Bangkok</Card.Title>
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
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col md={8}>
                                                <div className={styles.nav_category_layout} >
                                                    <div className={styles.nav_category} ref={refCategoryNav}>
                                                        <div className={styles.categoryList} ref={refCategoryList} style={{ transform: `translateX(${slidingPxCategoryNav}px)` }}>
                                                            {categoryNav}
                                                        </div>
                                                        <Button className={styleButtonLeft} onClick={() => scrollCategoryNav('left')}>
                                                            <LeftOutlined className={styles.nav_scroller_icon} />
                                                        </Button>
                                                        <Button className={styleButtonRight} onClick={() => scrollCategoryNav('right')}>
                                                            <RightOutlined className={styles.nav_scroller_icon} />
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Menu list */}
                                                <div calssName={styles.menu_list}>
                                                    {menuEachCategory}
                                                </div>

                                            </Col>

                                            <Col md={4} className={utilStyles.font_size_md} style={{ marginTop: "20px" }}>
                                                <div style={{ backgroundColor: "#f0f2f3", marginBottom: "30px" }}>
                                                    <div style={{ width: "100%", height: "240px" }}>
                                                        <GoogleMapReact
                                                            // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                                                            defaultCenter={{
                                                                lat: 13.7587154,
                                                                lng: 100.5663139,
                                                            }}
                                                            defaultZoom={11}
                                                        >
                                                            <AnyReactComponent
                                                                lat={59.955413}
                                                                lng={30.337844}
                                                                text="My Marker"
                                                            />
                                                        </GoogleMapReact>
                                                    </div>
                                                    <div style={{ padding: "1.25rem" }}>
                                                        <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
                                                            <LocationOnIcon /> &nbsp; 125 Mountain St, Brooklyn, NY
                                                        </div>
                                                        <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
                                                            <PhoneIcon /> &nbsp; (301) 453-8688
                                                        </div>
                                                        <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
                                                            <LanguageIcon /> &nbsp; <a href="#">www.thaistaste.com</a>
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

                                                        <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
                                                            <Row>
                                                                <Col>
                                                                    <div>
                                                                        <b>Monday</b>
                                                                    </div>
                                                                </Col>
                                                                <Col>
                                                                    <div style={{ textAlign: "right" }}>
                                                                        08:00AM - 09:00PM
                                                                </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
                                                            <Row>
                                                                <Col>
                                                                    <div>
                                                                        <b>Tuesday</b>
                                                                    </div>
                                                                </Col>
                                                                <Col>
                                                                    <div style={{ textAlign: "right" }}>
                                                                        08:00AM - 09:00PM
                                                                </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
                                                            <Row>
                                                                <Col>
                                                                    <div>
                                                                        <b>Wednesday</b>
                                                                    </div>
                                                                </Col>
                                                                <Col>
                                                                    <div style={{ textAlign: "right" }}>
                                                                        08:00AM - 09:00PM
                                                                </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
                                                            <Row>
                                                                <Col>
                                                                    <div>
                                                                        <b>Thursday</b>
                                                                    </div>
                                                                </Col>
                                                                <Col>
                                                                    <div style={{ textAlign: "right" }}>
                                                                        08:00AM - 09:00PM
                                                                </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
                                                            <Row>
                                                                <Col>
                                                                    <div>
                                                                        <b>Friday</b>
                                                                    </div>
                                                                </Col>
                                                                <Col>
                                                                    <div style={{ textAlign: "right" }}>
                                                                        08:00AM - 09:00PM
                                                                </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div style={{ padding: "10px 0", borderBottom: "1px solid #dee2e6" }}>
                                                            <Row>
                                                                <Col>
                                                                    <div>
                                                                        <b>Saturday</b>
                                                                    </div>
                                                                </Col>
                                                                <Col>
                                                                    <div style={{ textAlign: "right" }}>
                                                                        08:00AM - 09:00PM
                                                                </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div style={{ padding: "10px 0" }}>
                                                            <Row>
                                                                <Col>
                                                                    <div>
                                                                        <b>Sunday</b>
                                                                    </div>
                                                                </Col>
                                                                <Col>
                                                                    <div style={{ textAlign: "right" }}>
                                                                        08:00AM - 09:00PM
                                                                </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div >
                        <AddMenuModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Layout>

                ) : (
                    // Mobile Version
                    <RestaurantDetailsMobile />
                )
            }
        </>
    )
}