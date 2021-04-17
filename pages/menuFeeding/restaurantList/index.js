import Layout, { siteTitle } from '../../../components/layout'
import utilStyles from '../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Button, Form, Breadcrumb } from 'react-bootstrap'
import { useRouter } from 'next/router'
import styles from './index.module.css'
import Link from 'next/link'
import useMediaQuery from "../../../utils/utils";
import { Slider, Select, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import GoogleMapReact from 'google-map-react';
import React from 'react'
import MobileFilterRestaurants from '../../../components/MobileFilterRestaurants/index'
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const { Option } = Select;

export default function RestaurantList({ props }) {
    const isBreakpoint = useMediaQuery(768)
    const router = useRouter()
    const { area } = router.query;
    const [modalShow, setModalShow] = React.useState(false);
    const [priceMinSearch, setPriceMinSearch] = React.useState(0);
    const [priceMaxSearch, setPriceMaxSearch] = React.useState(2000);

    const searchFunc = () => {
        setModalShow(true)
    }


    function onChangePriceFilter(value) {
        console.log('value: ', value);
        setPriceMinSearch(value[0])
        setPriceMaxSearch(value[1])
    }

    return (
        <>
            {
                !isBreakpoint ? (
                    //PC Version
                    <Layout containerType="center">
                        <Breadcrumb>
                            <Link href="/menuFeeding" passHref>
                                <Breadcrumb.Item>Ari</Breadcrumb.Item>
                            </Link>
                            <Breadcrumb.Item active>Restaurant List</Breadcrumb.Item>
                        </Breadcrumb>
                        {/* List of Restaurant */}
                        <Row style={{ marginTop: "15px" }}>
                            <Col xs={6} md={4}>
                                {/* Filter */}
                                <div style={{ height: '10rem', width: '100%' }}>
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
                                <br />
                                <br />

                                <div style={{ width: '100%', padding: "1.875rem", backgroundColor: "white" }} className={utilStyles.font_size_sm}>
                                    <div className={utilStyles.headingMd}>
                                        <b>Search</b>
                                    </div>
                                    <br />
                                    <div style={{ marginTop: "10px" }}>
                                        <Form>
                                            <Row style={{ border: "1px solid #ced4da", margin: "0" }}>
                                                <Col xs={3} style={{ margin: "auto" }}>
                                                    <b>What</b>
                                                </Col>
                                                <Col xs={9} style={{ paddingLeft: "0" }}>
                                                    <Form.Group controlId="whatSearch" style={{ marginBottom: "0" }}>
                                                        <Form.Control type="text" placeholder="Any keywords.." className={styles.search_Box} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <br />
                                            <Row style={{ border: "1px solid #ced4da", margin: "0" }}>
                                                <Col xs={3} style={{ margin: "auto" }}>
                                                    <b>Where</b>
                                                </Col>
                                                <Col xs={9} style={{ paddingLeft: "0" }}>
                                                    <Form.Group controlId="whatSearch" style={{ marginBottom: "0" }}>
                                                        <Form.Control type="text" placeholder="City, postcode.." className={styles.search_Box} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <br />
                                            <Button style={{ textAlign: "center", width: "100%", backgroundColor: "#ff5a5f", border: "none" }} className={utilStyles.font_size_md}>
                                                <SearchIcon /> Search
                                                </Button>
                                        </Form>
                                    </div>
                                </div>

                                <br />
                                <br />

                                <div style={{ width: '100%', padding: "1.875rem", backgroundColor: "white" }} className={utilStyles.font_size_sm}>
                                    <div className={utilStyles.headingMd}>
                                        <b>Filter</b>
                                    </div>
                                    <br />
                                    <div>
                                        Food Type
                                        </div>
                                    <div style={{ marginTop: "10px" }}>
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
                                            defaultValue="Breads"
                                        >
                                            <Option value="0">-</Option>
                                            <Option value="Breads">Breads</Option>
                                            <Option value="2">Rice</Option>
                                            <Option value="3">Meat</Option>
                                            <Option value="4">Pasta</Option>
                                            <Option value="5">Noodles</Option>
                                            <Option value="6">Vegetables</Option>
                                            <Option value="7">Fruit</Option>
                                        </Select>
                                    </div>

                                    <div style={{ marginTop: "10px" }}>
                                        <Form>
                                            <Form.Group controlId="priceRange">
                                                <Form.Label>Price Range</Form.Label>
                                                <br />
                                                <Slider range defaultValue={[priceMinSearch, priceMaxSearch]} max={4000} onChange={onChangePriceFilter} />
                                                <div className={utilStyles.font_size_sm}>From {priceMinSearch} to {priceMaxSearch} baht</div>
                                            </Form.Group>
                                        </Form>
                                    </div>

                                    <div style={{ marginTop: "10px" }}>
                                        <div>
                                            Payment option
                                            </div>
                                        <div style={{ marginTop: "10px" }}>
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
                                                defaultValue="Cash"
                                            >
                                                <Option value="-">-</Option>
                                                <Option value="Cash">Cash</Option>
                                                <Option value="Credit">Credit Cards</Option>
                                            </Select>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: "10px" }}>
                                        <div>
                                            Distance
                                            </div>
                                        <div style={{ marginTop: "10px" }}>
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
                                                defaultValue="3"
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
                                        </div>
                                    </div>

                                    <div style={{ marginTop: "20px" }}>
                                        <Checkbox onChange={(e) => console.log(e)}>Open Now</Checkbox>
                                        <Checkbox onChange={(e) => console.log(e)}>Parking</Checkbox>
                                    </div>

                                </div>
                            </Col>
                            {/* List Restaurant */}
                            <Col xs={6} md={8}>
                                <Row style={{ padding: "20px 10px" }}>
                                    <Col>
                                        <div>
                                            <b>130 Results found</b>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div style={{ position: "absolute", right: "0" }}>
                                            <b>sort by</b> &nbsp; <Select
                                                showSearch
                                                style={{ width: "150px" }}
                                                placeholder="Search to Select"
                                                defaultValue="Lastet"
                                            >
                                                <Option value="-">-</Option>
                                                <Option value="Lastet">Lastet</Option>
                                                <Option value="Bangkok">Bangkok</Option>
                                                <Option value="Nonthaburi">Nonthaburi</Option>
                                            </Select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Link
                                            href={{
                                                pathname: '/menuFeeding/restaurantList/' + 'Park Hyatt Bangkok',
                                                query: { area: 'Ari', restaurant: 'Park Hyatt Bangkok' },
                                            }}
                                        >
                                            <Card>
                                                <Card.Img variant="top" src="/images/restaurant1.jpg" className={styles.image} />
                                                <Card.Body className={styles.content}>
                                                    <Card.Title className={styles.title}><b>Park Hyatt Bangkok</b></Card.Title>
                                                    <Card.Text className={styles.card_text} >
                                                        <Row >
                                                            <Col style={{ borderRight: "1px solid #dee2e6" }}>
                                                                {/* <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.9</span>
                                                                        &nbsp;&nbsp;
                                                                        <span >120 rating</span> */}

                                                                    Price <span style={{ color: "#74b100" }}><b>30-400</b></span> baht
                                                                </Col>
                                                            <Col style={{ color: "#74b100" }}>
                                                                Open now!
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginTop: "10px" }}>
                                                            <Col style={{ paddingBottom: "15px", borderBottom: "1px solid #dee2e6" }}>
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginTop: "15px" }}>
                                                            <Col>
                                                                <LocationOnIcon /> &nbsp; 92 Halsey St, Brooklyn, NY
                                                            </Col>
                                                        </Row>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col md={6}>
                                        <Card>
                                            <Card.Img variant="top" src="/images/restaurant3.jpg" className={styles.image} />
                                            <Card.Body className={styles.content}>
                                                <Card.Title className={styles.title}><b>TATE</b></Card.Title>
                                                <Card.Text className={styles.card_text}>
                                                    <Row>
                                                        <Col style={{ borderRight: "1px solid #dee2e6" }}>
                                                            Price <span style={{ color: "#74b100" }}><b>30-400</b></span> baht
                                                                </Col>
                                                        <Col style={{ color: "#74b100" }}>
                                                            Open now!
                                                            </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "10px" }}>
                                                        <Col style={{ paddingBottom: "15px", borderBottom: "1px solid #dee2e6" }}>
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                            </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "15px" }}>
                                                        <Col>
                                                            <LocationOnIcon /> &nbsp; 92 Halsey St, Brooklyn, NY
                                                            </Col>
                                                    </Row>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={6}>
                                        <Card>
                                            <Card.Img variant="top" src="/images/restaurant2.jpg" className={styles.image} />
                                            <Card.Body className={styles.content}>
                                                <Card.Title className={styles.title}><b>SEEN Restaurant</b></Card.Title>
                                                <Card.Text className={styles.card_text}>
                                                    <Row>
                                                        <Col style={{ borderRight: "1px solid #dee2e6" }}>
                                                            Price <span style={{ color: "#74b100" }}><b>30-400</b></span> baht
                                                                </Col>
                                                        <Col style={{ color: "#74b100" }}>
                                                            Open now!
                                                            </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "10px" }}>
                                                        <Col style={{ paddingBottom: "15px", borderBottom: "1px solid #dee2e6" }}>
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                            </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "15px" }}>
                                                        <Col>
                                                            <LocationOnIcon /> &nbsp; 92 Halsey St, Brooklyn, NY
                                                            </Col>
                                                    </Row>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={6}>
                                        <Link
                                            href={{
                                                pathname: '/menuFeeding/restaurantList/' + 'Park Hyatt Bangkok',
                                                query: { area: 'Ari', restaurant: 'Park Hyatt Bangkok' },
                                            }}
                                        >
                                            <Card>
                                                <Card.Img variant="top" src="/images/restaurant8.jpg" className={styles.image} />
                                                <Card.Body className={styles.content}>
                                                    <Card.Title className={styles.title}><b>Signs</b></Card.Title>
                                                    <Card.Text className={styles.card_text}>
                                                        <Row>
                                                            <Col style={{ borderRight: "1px solid #dee2e6" }}>
                                                                Price <span style={{ color: "#74b100" }}><b>30-400</b></span> baht
                                                                </Col>
                                                            <Col style={{ color: "#74b100" }}>
                                                                Open now!
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginTop: "10px" }}>
                                                            <Col style={{ paddingBottom: "15px", borderBottom: "1px solid #dee2e6" }}>
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginTop: "15px" }}>
                                                            <Col>
                                                                <LocationOnIcon /> &nbsp; 92 Halsey St, Brooklyn, NY
                                                            </Col>
                                                        </Row>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col md={6}>
                                        <Card>
                                            <Card.Img variant="top" src="/images/restaurant9.jpg" className={styles.image} />
                                            <Card.Body className={styles.content}>
                                                <Card.Title className={styles.title}><b>Norma’s</b></Card.Title>
                                                <Card.Text className={styles.card_text}>
                                                    <Row>
                                                        <Col style={{ borderRight: "1px solid #dee2e6" }}>
                                                            Price <span style={{ color: "#74b100" }}><b>30-400</b></span> baht
                                                                </Col>
                                                        <Col style={{ color: "#74b100" }}>
                                                            Open now!
                                                            </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "10px" }}>
                                                        <Col style={{ paddingBottom: "15px", borderBottom: "1px solid #dee2e6" }}>
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                            </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "15px" }}>
                                                        <Col>
                                                            <LocationOnIcon /> &nbsp; 92 Halsey St, Brooklyn, NY
                                                            </Col>
                                                    </Row>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={6}>
                                        <Card>
                                            <Card.Img variant="top" src="/images/restaurant10.jpg" className={styles.image} />
                                            <Card.Body className={styles.content}>
                                                <Card.Title className={styles.title}><b>Toby's</b></Card.Title>
                                                <Card.Text className={styles.card_text}>
                                                    <Row>
                                                        <Col style={{ borderRight: "1px solid #dee2e6" }}>
                                                            Price <span style={{ color: "#74b100" }}><b>30-400</b></span> baht
                                                                </Col>
                                                        <Col style={{ color: "#74b100" }}>
                                                            Open now!
                                                            </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "10px" }}>
                                                        <Col style={{ paddingBottom: "15px", borderBottom: "1px solid #dee2e6" }}>
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                            </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "15px" }}>
                                                        <Col>
                                                            <LocationOnIcon /> &nbsp; 92 Halsey St, Brooklyn, NY
                                                            </Col>
                                                    </Row>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={6}>
                                        <Link
                                            href={{
                                                pathname: '/menuFeeding/restaurantList/' + 'Park Hyatt Bangkok',
                                                query: { area: 'Ari', restaurant: 'Park Hyatt Bangkok' },
                                            }}
                                        >
                                            <Card>
                                                <Card.Img variant="top" src="/images/restaurant11.jpg" className={styles.image} />
                                                <Card.Body className={styles.content}>
                                                    <Card.Title className={styles.title}><b>Nang Gin Kui</b></Card.Title>
                                                    <Card.Text className={styles.card_text}>
                                                        <Row>
                                                            <Col style={{ borderRight: "1px solid #dee2e6" }}>
                                                                Price <span style={{ color: "#74b100" }}><b>30-400</b></span> baht
                                                                </Col>
                                                            <Col style={{ color: "#74b100" }}>
                                                                Open now!
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginTop: "10px" }}>
                                                            <Col style={{ paddingBottom: "15px", borderBottom: "1px solid #dee2e6" }}>
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginTop: "15px" }}>
                                                            <Col>
                                                                <LocationOnIcon /> &nbsp; 92 Halsey St, Brooklyn, NY
                                                            </Col>
                                                        </Row>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col md={6}>
                                        <Card>
                                            <Card.Img variant="top" src="/images/restaurant12.jpg" className={styles.image} />
                                            <Card.Body className={styles.content}>
                                                <Card.Title className={styles.title}><b>Rock Restaurant and Bar</b></Card.Title>
                                                <Card.Text className={styles.card_text}>
                                                    <Row>
                                                        <Col style={{ borderRight: "1px solid #dee2e6" }}>
                                                            Price <span style={{ color: "#74b100" }}><b>30-400</b></span> baht
                                                                </Col>
                                                        <Col style={{ color: "#74b100" }}>
                                                            Open now!
                                                            </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "10px" }}>
                                                        <Col style={{ paddingBottom: "15px", borderBottom: "1px solid #dee2e6" }}>
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                            </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "15px" }}>
                                                        <Col>
                                                            <LocationOnIcon /> &nbsp; 92 Halsey St, Brooklyn, NY
                                                            </Col>
                                                    </Row>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={6}>
                                        <Card>
                                            <Card.Img variant="top" src="/images/restaurant13.jpg" className={styles.image} />
                                            <Card.Body className={styles.content}>
                                                <Card.Title className={styles.title}><b>Le Normandie</b></Card.Title>
                                                <Card.Text className={styles.card_text}>
                                                    <Row>
                                                        <Col style={{ borderRight: "1px solid #dee2e6" }}>
                                                            Price <span style={{ color: "#74b100" }}><b>30-400</b></span> baht
                                                                </Col>
                                                        <Col style={{ color: "#74b100" }}>
                                                            Open now!
                                                            </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "10px" }}>
                                                        <Col style={{ paddingBottom: "15px", borderBottom: "1px solid #dee2e6" }}>
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                            </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "15px" }}>
                                                        <Col>
                                                            <LocationOnIcon /> &nbsp; 92 Halsey St, Brooklyn, NY
                                                            </Col>
                                                    </Row>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Layout >
                ) : (
                    //Mobile Version
                    <Layout containerType="mobile" search searchFunc={searchFunc}>
                        <Container className={utilStyles.container_sm} >
                            <Breadcrumb>
                                <Link href="/menuFeeding" passHref>
                                    <Breadcrumb.Item>Ari</Breadcrumb.Item>
                                </Link>
                                <Breadcrumb.Item active>Restaurant List</Breadcrumb.Item>
                            </Breadcrumb>
                            {/* List of Restaurant */}
                            <Row>
                                <Col xs={12} md={4}>
                                    <Link
                                        href={{
                                            pathname: '/menuFeeding/restaurantList/' + 'Park Hyatt Bangkok',
                                            query: { area: 'Ari', restaurant: 'Park Hyatt Bangkok' },
                                        }}
                                    >
                                        <Card>
                                            <Card.Img variant="top" src="/images/restaurant1.jpg" />
                                            <Card.Body className={styles.content}>
                                                <Card.Title className={styles.title}>Park Hyatt Bangkok</Card.Title>
                                                <Card.Text className={styles.card_text}>
                                                    <Row>
                                                        <Col>
                                                            <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.9</span>
                                    &nbsp;&nbsp;
                                    <span >120 rating</span>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "10px" }}>
                                                        <Col>
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                                    </Row>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Card>
                                        <Card.Img variant="top" src="/images/restaurant3.jpg" />
                                        <Card.Body className={styles.content}>
                                            <Card.Title className={styles.title}>TATE</Card.Title>
                                            <Card.Text className={styles.card_text}>
                                                <Row>
                                                    <Col>
                                                        <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.7</span>
                                    &nbsp;&nbsp;
                                    <span >45 rating</span>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: "10px" }}>
                                                    <Col>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Card>
                                        <Card.Img variant="top" src="/images/restaurant2.jpg" />
                                        <Card.Body className={styles.content}>
                                            <Card.Title className={styles.title}>SEEN Restaurant</Card.Title>
                                            <Card.Text className={styles.card_text}>
                                                <Row>
                                                    <Col>
                                                        <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.2</span>
                                    &nbsp;&nbsp;
                                    <span >6 rating</span>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: "10px" }}>
                                                    <Col>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={4}>
                                    <Link
                                        href={{
                                            pathname: '/menuFeeding/restaurantList/' + 'Park Hyatt Bangkok',
                                            query: { area: 'Ari', restaurant: 'Park Hyatt Bangkok' },
                                        }}
                                    >
                                        <Card>
                                            <Card.Img variant="top" src="/images/restaurant8.jpg" />
                                            <Card.Body className={styles.content}>
                                                <Card.Title className={styles.title}>Signs</Card.Title>
                                                <Card.Text className={styles.card_text}>
                                                    <Row>
                                                        <Col>
                                                            <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.6</span>
                                    &nbsp;&nbsp;
                                    <span >76 rating</span>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "10px" }}>
                                                        <Col>
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                                    </Row>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Card>
                                        <Card.Img variant="top" src="/images/restaurant9.jpg" />
                                        <Card.Body className={styles.content}>
                                            <Card.Title className={styles.title}>Norma’s</Card.Title>
                                            <Card.Text className={styles.card_text}>
                                                <Row>
                                                    <Col>
                                                        <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.7</span>
                                    &nbsp;&nbsp;
                                    <span >45 rating</span>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: "10px" }}>
                                                    <Col>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Card>
                                        <Card.Img variant="top" src="/images/restaurant10.jpg" />
                                        <Card.Body className={styles.content}>
                                            <Card.Title className={styles.title}>Toby's</Card.Title>
                                            <Card.Text className={styles.card_text}>
                                                <Row>
                                                    <Col>
                                                        <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.2</span>
                                    &nbsp;&nbsp;
                                    <span >6 rating</span>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: "10px" }}>
                                                    <Col>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={4}>
                                    <Link
                                        href={{
                                            pathname: '/menuFeeding/restaurantList/' + 'Park Hyatt Bangkok',
                                            query: { area: 'Ari', restaurant: 'Park Hyatt Bangkok' },
                                        }}
                                    >
                                        <Card>
                                            <Card.Img variant="top" src="/images/restaurant11.jpg" />
                                            <Card.Body className={styles.content}>
                                                <Card.Title className={styles.title}>Nang Gin Kui</Card.Title>
                                                <Card.Text className={styles.card_text}>
                                                    <Row>
                                                        <Col>
                                                            <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.9</span>
                                    &nbsp;&nbsp;
                                    <span >120 rating</span>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "10px" }}>
                                                        <Col>
                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                                    </Row>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Card>
                                        <Card.Img variant="top" src="/images/restaurant12.jpg" />
                                        <Card.Body className={styles.content}>
                                            <Card.Title className={styles.title}>Rock Restaurant and Bar</Card.Title>
                                            <Card.Text className={styles.card_text}>
                                                <Row>
                                                    <Col>
                                                        <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.7</span>
                                    &nbsp;&nbsp;
                                    <span >45 rating</span>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: "10px" }}>
                                                    <Col>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Card>
                                        <Card.Img variant="top" src="/images/restaurant13.jpg" />
                                        <Card.Body className={styles.content}>
                                            <Card.Title className={styles.title}>Le Normandie</Card.Title>
                                            <Card.Text className={styles.card_text}>
                                                <Row>
                                                    <Col>
                                                        <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.7</span>
                                    &nbsp;&nbsp;
                                    <span >28 rating</span>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: "10px" }}>
                                                    <Col>
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                        <MobileFilterRestaurants
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Layout >
                )
            }
        </>
    )
}