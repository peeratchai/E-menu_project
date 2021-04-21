import Layout, { siteTitle } from '../../../components/layout'
import utilStyles from '../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Button, Breadcrumb, Tabs, Tab, Modal, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import styles from './index.module.css'
import Link from 'next/link'
import Carousel from 'react-bootstrap/Carousel'
import React from 'react'
import useMediaQuery from "../../../utils/utils";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import GoogleMapReact from 'google-map-react';
import { Anchor } from "antd";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import PhoneIcon from '@material-ui/icons/Phone';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Restaurant({ props }) {
    const isBreakpoint = useMediaQuery(768)
    const router = useRouter()
    const [key, setKey] = React.useState("1");
    const { area, restaurant } = router.query;
    const [modalShow, setModalShow] = React.useState(false);
    const route = router.route
    const aspath = route.split('/')
    const path = '/' + aspath[1] + '/' + aspath[2] + '/' + router.query.restaurant + '?' + 'area=' + router.query.area + '&' + 'restaurant=' + router.query.restaurant

    return (
        <>
            {
                !isBreakpoint ? (
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
                            <Card>
                                <Card.Body>
                                    <Card.Title>Park Hyatt Bangkok</Card.Title>
                                    <Card.Text className={styles.card_text}>
                                        <div>
                                            <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.9</span>
                                    &nbsp;&nbsp;
                                    <span >120 rating</span>
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </div>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col md={8}>
                                                <Tabs
                                                    id="menu-tab"
                                                    activeKey={key}
                                                    onSelect={(k) => (setKey(k), router.push(path + "#" + k))}
                                                    style={{ marginTop: "20px" }}
                                                >

                                                    <Tab
                                                        eventKey="1"
                                                        title="Toppic"
                                                    >
                                                        <div style={{ marginTop: "30px" }}>
                                                            <Row>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }} onClick={() => setModalShow(true)} id="1">
                                                                        <Card.Img variant="top" src="/images/food4.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ยำรวมมิตร
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    100
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }} id="the-team">
                                                                        <Card.Img variant="top" src="/images/food5.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ยำหมึกกระดอง
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    150
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }}>
                                                                        <Card.Img variant="top" src="/images/food6.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ยำหมึกสาย
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    120
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }}>
                                                                        <Card.Img variant="top" src="/images/food7.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ข้าวผัดทะเลรวมมิตร
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    80
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }}>
                                                                        <Card.Img variant="top" src="/images/food8.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ลูกชิ้น
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    60
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }}>
                                                                        <Card.Img variant="top" src="/images/food9.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    แซนมอน
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    299
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Tab>
                                                    <Tab eventKey="2" title="แซลมอน">
                                                        <div style={{ marginTop: "30px" }}>
                                                            <Row>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }} onClick={() => setModalShow(true)}>
                                                                        <Card.Img variant="top" src="/images/food4.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ยำรวมมิตร
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    100
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }} id="the-team">
                                                                        <Card.Img variant="top" src="/images/food5.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ยำหมึกกระดอง
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    150
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }}>
                                                                        <Card.Img variant="top" src="/images/food6.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ยำหมึกสาย
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    120
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }}>
                                                                        <Card.Img variant="top" src="/images/food7.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ข้าวผัดทะเลรวมมิตร
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    80
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }} >
                                                                        <Card.Img variant="top" src="/images/food8.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ลูกชิ้น
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    60
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }} id="2">
                                                                        <Card.Img variant="top" src="/images/food9.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    แซนมอน
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    299
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Tab>
                                                    <Tab eventKey="3" title="ลูกชิ้น">
                                                        <div style={{ marginTop: "30px" }}>
                                                            <Row>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }} onClick={() => setModalShow(true)}>
                                                                        <Card.Img variant="top" src="/images/food4.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ยำรวมมิตร
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    100
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }}>
                                                                        <Card.Img variant="top" src="/images/food5.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ยำหมึกกระดอง
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    150
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }}>
                                                                        <Card.Img variant="top" src="/images/food6.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ยำหมึกสาย
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    120
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }}>
                                                                        <Card.Img variant="top" src="/images/food7.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ข้าวผัดทะเลรวมมิตร
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    80
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }} id="3">
                                                                        <Card.Img variant="top" src="/images/food8.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    ลูกชิ้น
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    60
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                                <Col xs={6} md={3}>
                                                                    <Card style={{ border: "none" }}>
                                                                        <Card.Img variant="top" src="/images/food9.jpg" style={{ height: "150px" }} />
                                                                        <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                            <Row>
                                                                                <Col xs={12} md={8}>
                                                                                    แซนมอน
                                                            </Col>
                                                                                <Col xs={12} md={4} style={{ textAlign: "right" }}>
                                                                                    299
                                                            </Col>
                                                                            </Row>
                                                                        </Card.Text>
                                                                    </Card>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Tab>
                                                </Tabs>
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
                                        <div>
                                            <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.9</span>
                                    &nbsp;&nbsp;
                                    <span >120 rating</span>
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </div>
                                        <Tabs
                                            id="controlled-tab-example"
                                            activeKey={key}
                                            onSelect={(k) => (setKey(k), router.push(path + "#" + k))}
                                            style={{ marginTop: "20px" }}
                                        >

                                            <Tab eventKey="1" title="Toppic">
                                                <div style={{ marginTop: "30px" }}>
                                                    <Row>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }} onClick={() => setModalShow(true)} id="1">
                                                                <Card.Img variant="top" src="/images/food4.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ยำรวมมิตร
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            100
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }} id="the-team">
                                                                <Card.Img variant="top" src="/images/food5.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ยำหมึกกระดอง
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            150
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food6.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ยำหมึกสาย
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            120
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food7.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ข้าวผัดทะเลรวมมิตร
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            80
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food8.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ลูกชิ้น
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            60
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }} id="the-team">
                                                                <Card.Img variant="top" src="/images/food9.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            แซนมอน
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            299
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food8.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ลูกชิ้น
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            60
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food9.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            แซนมอน
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            299
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food8.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ลูกชิ้น
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            60
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food9.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            แซนมอน
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            299
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="2" title="แซลมอน">
                                                <div style={{ marginTop: "30px" }}>
                                                    <Row>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }} onClick={() => setModalShow(true)}>
                                                                <Card.Img variant="top" src="/images/food4.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ยำรวมมิตร
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            100
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food5.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ยำหมึกกระดอง
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            150
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food6.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ยำหมึกสาย
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            120
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food7.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ข้าวผัดทะเลรวมมิตร
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            80
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }} id="2">
                                                                <Card.Img variant="top" src="/images/food8.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ลูกชิ้น2
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            60
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food9.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            แซนมอน
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            299
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }} >
                                                                <Card.Img variant="top" src="/images/food8.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ลูกชิ้น
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            60
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food9.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            แซนมอน
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            299
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food8.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ลูกชิ้น
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            60
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food9.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            แซนมอน
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            299
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="3" title="ลูกชิ้น">
                                                <div style={{ marginTop: "30px" }}>
                                                    <Row>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }} onClick={() => setModalShow(true)} >
                                                                <Card.Img variant="top" src="/images/food4.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ยำรวมมิตร
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            100
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }} >
                                                                <Card.Img variant="top" src="/images/food5.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ยำหมึกกระดอง
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            150
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food6.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ยำหมึกสาย
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            120
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food7.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ข้าวผัดทะเลรวมมิตร
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            80
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food8.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ลูกชิ้น
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            60
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food9.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            แซนมอน
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            299
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food8.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ลูกชิ้น
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            60
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food9.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            แซนมอน
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            299
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }}>
                                                                <Card.Img variant="top" src="/images/food8.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            ลูกชิ้น
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            60
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                        <Col xs={6} md={3}>
                                                            <Card style={{ border: "none" }} id="3">
                                                                <Card.Img variant="top" src="/images/food9.jpg" style={{ height: "100px" }} />
                                                                <Card.Text className={styles.card_text} style={{ padding: "10px", fontWeight: "bold" }}>
                                                                    <Row>
                                                                        <Col xs={12} md={8}>
                                                                            แซนมอน3
                                                            </Col>
                                                                        <Col xs={12} md={4}>
                                                                            299
                                                            </Col>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Tab>
                                        </Tabs>
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
                    </Layout>

                )
            }
        </>
    )
}

//Modal Add Menu
function AddMenuModal(props) {
    const isBreakpoint = useMediaQuery(768)

    const [specialInstruction, setSpecialInstruction] = React.useState(null);
    const [count, setCount] = React.useState(1);
    const [total, setTotal] = React.useState(120);
    const [price, setPrice] = React.useState(120);


    const saveMenu = () => {
        console.log('specialInstruction ->', specialInstruction)
        console.log('count ->', count)
        props.onHide()
    }

    return (

        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {
                !isBreakpoint ? (
                    //PC Version
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: "1.3rem" }}> ยำรวมมิตร</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col xs={12} md={3}>
                                        <Image src='/images/food4.jpg' />
                                    </Col>
                                    <Col xs={6} md={9}>
                                        <Row style={{ margin: "10px -15px" }}>
                                            <Col>
                                                Detail : ยำรวมมิตร
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>
                                                    จำนวน : &nbsp;
                                                </span>
                                                <Button className={utilStyles.btn} onClick={() => { count > 1 ? (setCount((count - 1)), setTotal((total - price))) : null }} >
                                                    <RemoveIcon />
                                                </Button>
                                                <span style={{ margin: "0 15px" }}>
                                                    {count}
                                                </span>
                                                <Button className={utilStyles.btn} onClick={() => { setCount(count + 1), setTotal((total + price)) }} >
                                                    <AddIcon />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                รวม : {total}
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                                <Form style={{ marginTop: "15px" }}>
                                    <Form.Group>
                                        <Form.Label>Special instruction</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={specialInstruction}
                                            onChange={e => setSpecialInstruction(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => { saveMenu() }}>
                                Submit
                </Button>
                            <Button onClick={props.onHide}>Close</Button>
                        </Modal.Footer>
                    </>
                ) : (
                    //Mobile Version
                    <>
                        <Modal.Header closeButton className={utilStyles.fontMobile}>
                            <Modal.Title style={{ fontSize: "1.3rem" }}> ยำรวมมิตร</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col xs={12} md={3}>
                                        <Image src='/images/food4.jpg' />
                                    </Col>
                                    <Col xs={12} md={9} style={{ marginTop: "15px" }}>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                Detail : ยำรวมมิตร
                                                </Col>
                                        </Row>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                <span>
                                                    จำนวน : &nbsp;
                                                </span>
                                                <Button className={utilStyles.btnMobile} onClick={() => { count > 1 ? (setCount((count - 1)), setTotal((total - price))) : null }} >
                                                    <RemoveIcon />
                                                </Button>
                                                <span style={{ margin: "0 15px" }}>
                                                    {count}
                                                </span>
                                                <Button className={utilStyles.btnMobile} onClick={() => { setCount(count + 1), setTotal((total + price)) }} >
                                                    <AddIcon />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                รวม : {total}
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                                <Form style={{ marginTop: "15px" }}>
                                    <Form.Group>
                                        <Form.Label>Special instruction</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={specialInstruction}
                                            onChange={e => setSpecialInstruction(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => { saveMenu() }}>
                                Submit
                                </Button>
                            <Button onClick={props.onHide}>Close</Button>
                        </Modal.Footer>
                    </>
                )
            }
        </Modal >
    );
}