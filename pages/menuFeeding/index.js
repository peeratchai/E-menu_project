import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Button, Modal, Form } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import Link from 'next/link'
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react'
import styles from './index.module.css'
import GoogleMapReact from 'google-map-react';
import { Slider, Select, Checkbox } from 'antd';
import MobileFilterRestaurants from '../../components/MobileFilterRestaurants/index'

const { Option } = Select;
import 'antd/dist/antd.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MenuFeeding() {
    const isBreakpoint = useMediaQuery(768)

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
                    // PC Version
                    <Layout containerType="center">
                        <div className={utilStyles.container_xl}>

                            {/* <Row style={{ marginBottom: "20px" }}>
                                <Col>
                                    <span className={utilStyles.fontTitle}>
                                        Area Selection
                                </span>
                                &nbsp;&nbsp;
                                <span onClick={() => setModalShow(true)} style={{ cursor: "pointer", border: "1px solid #9c9c9c", borderRadius: "5px", backgroundColor: "#9c9c9c", padding: "0 10px", color: "white" }}><SearchIcon /> <span style={{ fontSize: "22px" }}>Search</span></span>
                                </Col>
                            </Row> */}

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
                                                <b>56 Results found</b>
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
                                        <Col xs={12} md={6} className={styles.colCard}>
                                            <Link
                                                href={{
                                                    pathname: '/menuFeeding/restaurantList',
                                                    query: { area: 'Ari' },
                                                }}
                                            >
                                                <Card style={{ height: "100%", border: "none", backgroundColor: "#eaeff3" }}>
                                                    <div className={utilStyles.img_hover_zoom} style={{ height: "70%" }}>
                                                        <Card.Img variant="top" src="/images/ari.jpg" style={{ height: "100%" }} />
                                                    </div>
                                                    <Card.Body className={utilStyles.cardBody}>
                                                        <Card.Text>
                                                            <div className={utilStyles.cardTitle}>Ari</div>
                                                            <div className={utilStyles.cardText}>20 Listing</div>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </Col>
                                        <Col xs={12} md={6} className={styles.colCard}>
                                            <Card style={{ height: "100%", border: "none", backgroundColor: "#eaeff3" }}>
                                                <div className={utilStyles.img_hover_zoom} style={{ height: "70%" }}>
                                                    <Card.Img variant="top" src="/images/thonglor.jpg" style={{ height: "100%" }} />
                                                </div>
                                                <Card.Body className={utilStyles.cardBody}>
                                                    <Card.Text>
                                                        <div className={utilStyles.cardTitle}>Thonglor</div>
                                                        <div className={utilStyles.cardText}>2150 Listing</div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col xs={12} md={6} className={styles.colCard}>
                                            <Card style={{ height: "100%", border: "none", backgroundColor: "#eaeff3" }}>
                                                <div className={utilStyles.img_hover_zoom} style={{ height: "70%" }}>
                                                    <Card.Img variant="top" src="/images/eakmai.jpg" style={{ height: "100%" }} />
                                                </div>
                                                <Card.Body className={utilStyles.cardBody}>
                                                    <Card.Text>
                                                        <div className={utilStyles.cardTitle}>Ekamai</div>
                                                        <div className={utilStyles.cardText}>7 Listing</div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col xs={12} md={6} className={styles.colCard}>
                                            <Link
                                                href={{
                                                    pathname: '/menuFeeding/restaurantList',
                                                    query: { area: 'Ari' },
                                                }}
                                            >
                                                <Card style={{ height: "100%", border: "none", backgroundColor: "#eaeff3" }}>
                                                    <div className={utilStyles.img_hover_zoom} style={{ height: "70%" }}>
                                                        <Card.Img variant="top" src="/images/ari.jpg" style={{ height: "100%" }} />
                                                    </div>
                                                    <Card.Body className={utilStyles.cardBody}>
                                                        <Card.Text>
                                                            <div className={utilStyles.cardTitle}>Ari</div>
                                                            <div className={utilStyles.cardText}>20 Listing</div>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </Col>
                                        <Col xs={12} md={6} className={styles.colCard}>
                                            <Card style={{ height: "100%", border: "none", backgroundColor: "#eaeff3" }}>
                                                <div className={utilStyles.img_hover_zoom} style={{ height: "70%" }}>
                                                    <Card.Img variant="top" src="/images/thonglor.jpg" style={{ height: "100%" }} />
                                                </div>
                                                <Card.Body className={utilStyles.cardBody}>
                                                    <Card.Text>
                                                        <div className={utilStyles.cardTitle}>Thonglor</div>
                                                        <div className={utilStyles.cardText}>2150 Listing</div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col xs={12} md={6} className={styles.colCard}>
                                            <Card style={{ height: "100%", border: "none", backgroundColor: "#eaeff3" }}>
                                                <div className={utilStyles.img_hover_zoom} style={{ height: "70%" }}>
                                                    <Card.Img variant="top" src="/images/eakmai.jpg" style={{ height: "100%" }} />
                                                </div>
                                                <Card.Body className={utilStyles.cardBody}>
                                                    <Card.Text>
                                                        <div className={utilStyles.cardTitle}>Ekamai</div>
                                                        <div className={utilStyles.cardText}>7 Listing</div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col xs={12} md={6} className={styles.colCard}>
                                            <Link
                                                href={{
                                                    pathname: '/menuFeeding/restaurantList',
                                                    query: { area: 'Ari' },
                                                }}
                                            >
                                                <Card style={{ height: "100%", border: "none", backgroundColor: "#eaeff3" }}>
                                                    <div className={utilStyles.img_hover_zoom} style={{ height: "70%" }}>
                                                        <Card.Img variant="top" src="/images/ari.jpg" style={{ height: "100%" }} />
                                                    </div>
                                                    <Card.Body className={utilStyles.cardBody}>
                                                        <Card.Text>
                                                            <div className={utilStyles.cardTitle}>Ari</div>
                                                            <div className={utilStyles.cardText}>20 Listing</div>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </Col>
                                        <Col xs={12} md={6} className={styles.colCard}>
                                            <Card style={{ height: "100%", border: "none", backgroundColor: "#eaeff3" }}>
                                                <div className={utilStyles.img_hover_zoom} style={{ height: "70%" }}>
                                                    <Card.Img variant="top" src="/images/thonglor.jpg" style={{ height: "100%" }} />
                                                </div>
                                                <Card.Body className={utilStyles.cardBody}>
                                                    <Card.Text>
                                                        <div className={utilStyles.cardTitle}>Thonglor</div>
                                                        <div className={utilStyles.cardText}>2150 Listing</div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col xs={12} md={6} className={styles.colCard}>
                                            <Card style={{ height: "100%", border: "none", backgroundColor: "#eaeff3" }}>
                                                <div className={utilStyles.img_hover_zoom} style={{ height: "70%" }}>
                                                    <Card.Img variant="top" src="/images/eakmai.jpg" style={{ height: "100%" }} />
                                                </div>
                                                <Card.Body className={utilStyles.cardBody}>
                                                    <Card.Text>
                                                        <div className={utilStyles.cardTitle}>Ekamai</div>
                                                        <div className={utilStyles.cardText}>7 Listing</div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col xs={12} md={6} className={styles.colCard}>
                                            <Card style={{ height: "100%", border: "none", backgroundColor: "#eaeff3" }}>
                                                <div className={utilStyles.img_hover_zoom} style={{ height: "70%" }}>
                                                    <Card.Img variant="top" src="/images/eakmai.jpg" style={{ height: "100%" }} />
                                                </div>
                                                <Card.Body className={utilStyles.cardBody}>
                                                    <Card.Text>
                                                        <div className={utilStyles.cardTitle}>Ekamai</div>
                                                        <div className={utilStyles.cardText}>7 Listing</div>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <MobileFilterRestaurants
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Layout>
                ) : (
                    // Mobile Version
                    <Layout containerType="mobile" search searchFunc={searchFunc}>
                        <Container className={utilStyles.container_sm}>
                            <Row style={{ marginBottom: "20px" }}>
                                <Col xs={12}>
                                    <span className={utilStyles.fontTitleMobile}>
                                        Area Selection
                                        </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className={styles.colCardMobile}>
                                    <Link
                                        href={{
                                            pathname: '/menuFeeding/restaurantList',
                                            query: { area: 'Ari' },
                                        }}
                                    >
                                        <Card style={{ height: "100%", border: "none" }}>
                                            <Card.Img variant="top" src="/images/ari.jpg" style={{ height: "70%" }} />
                                            <Card.Body className={utilStyles.cardBody}>
                                                <Card.Text>
                                                    <div className={utilStyles.cardTitle}>Ari</div>
                                                    <div className={utilStyles.cardText}>20 Listing</div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={12} className={styles.colCardMobile}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <Card.Img variant="top" src="/images/thonglor.jpg" style={{ height: "70%" }} />
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Thonglor</div>
                                                <div className={utilStyles.cardText}>2150 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} className={styles.colCardMobile}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <Card.Img variant="top" src="/images/eakmai.jpg" style={{ height: "70%" }} />
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Ekamai</div>
                                                <div className={utilStyles.cardText}>7 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} className={styles.colCardMobile}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <Card.Img variant="top" src="/images/rama4.jpg" style={{ height: "70%" }} />
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Rama 4</div>
                                                <div className={utilStyles.cardText}>13 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className={styles.colCardMobile}>
                                    <Link
                                        href={{
                                            pathname: '/menuFeeding/restaurantList',
                                            query: { area: 'Ari' },
                                        }}
                                    >
                                        <Card style={{ height: "100%", border: "none" }}>
                                            <Card.Img variant="top" src="/images/ari.jpg" style={{ height: "70%" }} />
                                            <Card.Body className={utilStyles.cardBody}>
                                                <Card.Text>
                                                    <div className={utilStyles.cardTitle}>Ari</div>
                                                    <div className={utilStyles.cardText}>20 Listing</div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={12} className={styles.colCardMobile}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <Card.Img variant="top" src="/images/thonglor.jpg" style={{ height: "70%" }} />
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Thonglor</div>
                                                <div className={utilStyles.cardText}>2150 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} className={styles.colCardMobile}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <Card.Img variant="top" src="/images/eakmai.jpg" style={{ height: "70%" }} />
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Ekamai</div>
                                                <div className={utilStyles.cardText}>7 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} className={styles.colCardMobile}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <Card.Img variant="top" src="/images/rama4.jpg" style={{ height: "70%" }} />
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Rama 4</div>
                                                <div className={utilStyles.cardText}>13 Listing</div>
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
                    </Layout>
                )
            }
        </>
    )
}

