import Layout from '../../layout'
import utilStyles from '../../../styles/utils.module.css'
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
import AddMenuModal from '../../../components/Modal/AddMenuModal'

const { Meta } = Cardantd;
const AnyReactComponent = ({ text }) => <div>{text}</div>;


export default function RestaurantDetails() {
    const router = useRouter()
    const { area, restaurant } = router.query;

    //// Set State
    const [modalShow, setModalShow] = React.useState(false);
    const [categoryList, setCategoryList] = React.useState([{ categoryName: 'เมนูยำ', isActive: true }, { categoryName: 'เมนูข้าว', isActive: false }, { categoryName: 'เมนูลูกชิ้น', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน7', isActive: false }, { categoryName: 'เมนูแซลม่อน8', isActive: false }, { categoryName: 'เมนูแซลม่อน9', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }, { categoryName: 'เมนูแซลม่อน', isActive: false }]);
    const [menuEachCategory, setMenuEachCategory] = React.useState("");
    const [categorySelected, setCategorySelected] = React.useState("");
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
        renderMenuList()
        setCategorySelected(categoryList[0].categoryName)
    }, [])

    const renderMenuList = () => {
        // console.log(menuList)
        let categorySection = categoryList.map((category, categoryIndex) => {
            // console.log(menuList[category.categoryName])
            let menucard = menuList[category.categoryName].map((menu, menuIndex) =>
                <Col xs={6} className={styles.menu_card} key={menu.name + menuIndex} onClick={() => setModalShow(true)}>
                    <Cardantd
                        bodyStyle={{ padding: "5px" }}
                        cover={
                            <img
                                alt="example"
                                src={menu.image}
                                style={{ height: '120px' }}
                            />
                        }
                        actions={[
                            menu.price + " Baht"
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
                <div key={category.categoryName + categoryIndex}>
                    <div ref={(categoryRef) => (refsCategory.current[category.categoryName] = categoryRef)} style={{ position: "relative", top: '-65px' }}>

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
        <Layout containerType="mobile">
            <Container className={utilStyles.container_sm}>
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
                            style={{ height: "300px" }}
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <Image
                            className="d-block w-100"
                            src="/images/restaurant1_1.jpg"
                            alt="Second slide"
                            style={{ height: "300px" }}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image
                            className="d-block w-100"
                            src="/images/restaurant1_2.jpg"
                            alt="Third slide"
                            style={{ height: "300px" }}
                        />
                    </Carousel.Item>
                </Carousel>
                <Card>
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
                            <Select
                                showSearch
                                className={styles.category_dropdown}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                onChange={(category) => scrollindToCategorySectionMobile(category)}
                                value={categorySelected}
                            >
                                {categoryDropdownMobile}
                            </Select>

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
            </Container>
            <AddMenuModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <div style={{ position: "fixed", bottom: "0", left: "0", width: "100vw", zIndex: "1", height: "70px", backgroundColor: "white" }}>
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