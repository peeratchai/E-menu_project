import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Button, Modal } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import menu from '../../utils/menu.json'
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { Select, Checkbox } from 'antd';
import React from 'react'

const { Option } = Select;
import 'antd/dist/antd.css';

export default function Newspaper() {
    const isBreakpoint = useMediaQuery(768)
    const [modalShow, setModalShow] = React.useState(false);

    const searchFunc = () => {
        setModalShow(true)
        console.log("test")
    }

    let listMenu
    if (!isBreakpoint) {
        listMenu = menu && menu.map((menu, Index) => (
            <Row key={menu.title + Index} xs={12} md={4} xl={6}>
                <Col>
                    <Image src={menu.image} rounded />
                </Col>
                <Col>
                    <Image src={menu.image} rounded />
                </Col>
                <Col>
                    <Image src={menu.image} rounded />
                </Col>
                <Col>
                    <Image src={menu.image} rounded />
                </Col>
                <Col>
                    <Image src={menu.image} rounded />
                </Col>
                <Col>
                    <Image src={menu.image} rounded />
                </Col>
            </Row >));
    } else {
        //for Mobile
        listMenu = menu && menu.map((menu, Index) => (
            <Card key={menu.title + Index}>
                <Card.Img variant="top" src={menu.image} />
                <Card.Body className={styles.cardBodyMobile}>
                    <Card.Title className={utilStyles.fontTitleMobile}>{menu.title}</Card.Title>
                    <Card.Text className={utilStyles.fontMobile}>
                        {menu.detail}
                    </Card.Text>
                </Card.Body>
                <Card.Body className={styles.cardBodyMobile} style={{ borderTop: '1px solid rgb(223,223,223)' }}>
                    <StarIcon className={utilStyles.fontMobile} /><StarIcon className={utilStyles.fontMobile} /><StarIcon className={utilStyles.fontMobile} /><StarHalfIcon className={utilStyles.fontMobile} /><StarOutlineIcon className={utilStyles.fontMobile} />
                </Card.Body>
            </Card>
        ));
    }

    return (
        <>
            {
                !isBreakpoint ? (
                    //PC Version
                    <Layout util>
                        <div className={utilStyles.container_xl}>
                            {/* {listMenu} */}
                            {/* Search Filter */}
                            <Row>
                                <Col>
                                    <div style={{ padding: "1.25rem", backgroundColor: "white", borderRadius: "2px" }}>
                                        <div>

                                            <b>Foot Type</b>

                                        </div>
                                        <div>
                                            <Select
                                                showSearch
                                                style={{ width: '100%' }}
                                                placeholder="Search to Select"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                filterSort={(optionA, optionB) =>
                                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                }
                                                className={'myfilter'}
                                            >
                                                <Option value="0">-</Option>
                                                <Option value="1">Breads</Option>
                                                <Option value="2">Rice</Option>
                                                <Option value="3">Meat</Option>
                                                <Option value="4">Pasta</Option>
                                                <Option value="5">Noodles</Option>
                                                <Option value="6">Vegetables</Option>
                                                <Option value="7">Fruit</Option>
                                            </Select>
                                        </div>

                                    </div>

                                </Col>
                                <Col>
                                    <div style={{ padding: "1.25rem", backgroundColor: "white", borderRadius: "2px" }}>
                                        <Row>
                                            <Col>
                                                <b>Payment option </b>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col>
                                                <Select
                                                    showSearch
                                                    mode="multiple"
                                                    showArrow={true}
                                                    style={{ width: '100%' }}
                                                    placeholder="Search to Select"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    filterSort={(optionA, optionB) =>
                                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                    }
                                                    className={'myfilter'}

                                                >
                                                    <Option value="0">-</Option>
                                                    <Option value="1">Cash</Option>
                                                    <Option value="2">Credit Cards</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col>
                                    <div style={{ padding: "1.25rem", backgroundColor: "white", borderRadius: "2px" }}>
                                        <Row>
                                            <Col>
                                                <b>Distance</b>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col>
                                                <Select
                                                    showSearch
                                                    style={{ width: '100%' }}
                                                    placeholder="Search to Select"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    filterSort={(optionA, optionB) =>
                                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                    }
                                                    className={'myfilter'}
                                                >
                                                    <Option value="0">-</Option>
                                                    <Option value="1">1 กิโลเมตร</Option>
                                                    <Option value="2">2 กิโลเมตร</Option>
                                                    <Option value="3">5 กิโลเมตร</Option>
                                                    <Option value="4">10 กิโลเมตร</Option>
                                                    <Option value="5">20 กิโลเมตร</Option>
                                                    <Option value="6">40 กิโลเมตร</Option>
                                                    <Option value="7">60 กิโลเมตร</Option>
                                                    <Option value="8">80 กิโลเมตร</Option>
                                                    <Option value="9">100 กิโลเมตร</Option>
                                                    <Option value="10">250 กิโลเมตร</Option>
                                                    <Option value="11">500 กิโลเมตร</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col>
                                    <div style={{ padding: "1.25rem", backgroundColor: "white", borderRadius: "2px" }}>
                                        <Row>
                                            <Col>
                                                <b>Filter</b>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col>
                                                <Checkbox onChange={(e) => console.log(e)}>Parking</Checkbox>
                                            </Col>
                                        </Row>
                                    </div>

                                </Col>
                            </Row>
                            <br />
                            {/* {listMenu} */}
                            <Row xs={12} md={4} xl={5}>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCard} >
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news1.jpg" style={{ height: "25rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news2.jpg" style={{ height: "15rem" }} />

                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Dinner in the Sky</b> - Over 45 countries worldwide
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 10.00 am - 20.00 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news9.jpg" style={{ height: "16rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Parallax Restaurant</b> - Mammoth Lakes, California
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 9.00 am - 19.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news2.jpg" style={{ height: "15rem" }} />

                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>El Diablo “The Devil”</b> - Las Palmas, Spain
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 9.00 am - 15.30 pm
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news3.jpg" style={{ height: "17rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Sur un Arbre Perché</b> - Paris, France
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news4.jpg" style={{ height: "25rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Signs</b> - Toronto, Canada
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 10.00 am - 22.00 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news7.jpg" style={{ height: "20rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Norma’s</b> - New York City, New York
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news8.jpg" style={{ height: "16rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Eternity</b> - Truskavets, Ukraine
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 9.00 am - 20.30 pm
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news5.jpg" style={{ height: "21rem" }} />

                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Parallax Restaurant</b> - Mammoth Lakes, California
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 9.00 am - 19.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news6.jpg" style={{ height: "19rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>El Diablo “The Devil”</b> - Las Palmas, Spain
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 9.00 am - 15.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news5.jpg" style={{ height: "19rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news6.jpg" style={{ height: "21rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news7.jpg" style={{ height: "20rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Norma’s</b> - New York City, New York
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news8.jpg" style={{ height: "16rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Eternity</b> - Truskavets, Ukraine
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 9.00 am - 20.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news3.jpg" style={{ height: "17rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news4.jpg" style={{ height: "25rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news9.jpg" style={{ height: "16rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>The Disaster Café</b> - Loloret de Mar, Spain
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news10.jpg" style={{ height: "19rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Devil Island Prison Restaurant </b> - Devil Island, China
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 10.00 am - 20.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news1.jpg" style={{ height: "25rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news2.jpg" style={{ height: "15rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                </Col>
                            </Row >
                        </div >
                    </Layout >
                ) : (
                    //Mobile Version
                    <Layout mobile search searchFunc={searchFunc}>
                        <Container className={utilStyles.container_sm}>
                            {/* {listMenu} */}
                            <Row xs={2}>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCardMobile} >
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news1.jpg" style={{ height: "10rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news2.jpg" style={{ height: "9rem" }} />

                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Dinner in the Sky</b> - Over 45 countries worldwide
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 10.00 am - 20.00 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news3.jpg" style={{ height: "10rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>The Disaster Café</b> - Loloret de Mar, Spain
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news9.jpg" style={{ height: "12rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Parallax Restaurant</b> - Mammoth Lakes, California
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 9.00 am - 19.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news5.jpg" style={{ height: "13rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>El Diablo “The Devil”</b> - Las Palmas, Spain
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 9.00 am - 15.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news6.jpg" style={{ height: "10rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Eternity</b> - Truskavets, Ukraine
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 9.00 am - 20.30 pm
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news9.jpg" style={{ height: "12rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Parallax Restaurant</b> - Mammoth Lakes, California
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 9.00 am - 19.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news5.jpg" style={{ height: "13rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>El Diablo “The Devil”</b> - Las Palmas, Spain
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 9.00 am - 15.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news6.jpg" style={{ height: "10rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Eternity</b> - Truskavets, Ukraine
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 9.00 am - 20.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile} >
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news1.jpg" style={{ height: "10rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news2.jpg" style={{ height: "9rem" }} />

                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Dinner in the Sky</b> - Over 45 countries worldwide
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 10.00 am - 20.00 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news3.jpg" style={{ height: "10rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>The Disaster Café</b> - Loloret de Mar, Spain
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <SearchLocationModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Layout>
                )
            }
        </>
    )
}

//Modal Add Menu
function SearchLocationModal(props) {
    const isBreakpoint = useMediaQuery(768)

    const [restaurantName, setRestaurantName] = React.useState();
    const [location, setLocation] = React.useState();
    const [restaurantType, setRestaurantType] = React.useState();
    const [foodType, setFoodType] = React.useState();

    const onSearch = () => {
        console.log(restaurantName, location, restaurantType, foodType)
        props.onHide()
    }

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}><b>Filter</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <div style={{ padding: "0.5rem", backgroundColor: "white", borderRadius: "2px" }}>
                                <div className={utilStyles.fontTitleMobileSM}>
                                    Foot Type
                                </div>
                                <div>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Search to Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }

                                    >
                                        <Option value="0">-</Option>
                                        <Option value="1">Breads</Option>
                                        <Option value="2">Rice</Option>
                                        <Option value="3">Meat</Option>
                                        <Option value="4">Pasta</Option>
                                        <Option value="5">Noodles</Option>
                                        <Option value="6">Vegetables</Option>
                                        <Option value="7">Fruit</Option>
                                    </Select>
                                </div>

                            </div>

                        </Col>
                        <Col xs={12}>
                            <div style={{ padding: "0.5rem", backgroundColor: "white", borderRadius: "2px" }}>
                                <Row>
                                    <Col>
                                        <div className={utilStyles.fontTitleMobileSM}>
                                            Payment option
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Select
                                            showSearch
                                            mode="multiple"
                                            showArrow={true}
                                            style={{ width: '100%' }}
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }


                                        >
                                            <Option value="0">-</Option>
                                            <Option value="1">Cash</Option>
                                            <Option value="2">Credit Cards</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div style={{ padding: "0.5rem", backgroundColor: "white", borderRadius: "2px" }}>
                                <Row>
                                    <Col>
                                        <div className={utilStyles.fontTitleMobileSM}>
                                            Distance
                                        </div>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }

                                        >
                                            <Option value="0">-</Option>
                                            <Option value="1">1 กิโลเมตร</Option>
                                            <Option value="2">2 กิโลเมตร</Option>
                                            <Option value="3">5 กิโลเมตร</Option>
                                            <Option value="4">10 กิโลเมตร</Option>
                                            <Option value="5">20 กิโลเมตร</Option>
                                            <Option value="6">40 กิโลเมตร</Option>
                                            <Option value="7">60 กิโลเมตร</Option>
                                            <Option value="8">80 กิโลเมตร</Option>
                                            <Option value="9">100 กิโลเมตร</Option>
                                            <Option value="10">250 กิโลเมตร</Option>
                                            <Option value="11">500 กิโลเมตร</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div style={{ padding: "0.5rem", backgroundColor: "white", borderRadius: "2px" }}>
                                <Row>
                                    <Col>
                                        <Checkbox onChange={(e) => console.log(e)}>Parking</Checkbox>
                                    </Col>
                                </Row>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { onSearch() }}>
                    Search
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}