import Layout from '../../../layout'
import utilStyles from '../../../../styles/utils.module.css'
import { Row, Col, Card, Button, Form, Breadcrumb } from 'react-bootstrap'
import styles from './index.module.css'
import Link from 'next/link'
import { Slider, Select, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import GoogleMapReact from 'google-map-react';
import React, { useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Geocode from "react-geocode";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const { Option } = Select;
Geocode.setApiKey("AIzaSyAqDX2CqFjdgUBY2QqPfUMlMDGS1gjttPw");
Geocode.setLanguage("th");
// Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();


export default function RestaurantListWeb(props) {

    const [priceMinSearch, setPriceMinSearch] = React.useState(0);
    const [priceMaxSearch, setPriceMaxSearch] = React.useState(2000);
    const [restaurantList, setRestaurantList] = React.useState([]);
    const [locationName, setLocationName] = React.useState("");
    const [locationId, setLocationId] = React.useState("");
    const [totalResult, setTotalResult] = React.useState(0);
    const [restaurantCard, setRestaurantCard] = React.useState();

    useEffect(() => {
        if (props && props !== undefined) {
            // setRestaurantList(props.restaurant_list)
            console.log(props.restaurant_list)
            setLocationName(props.location_name)
            setLocationId(props.location_id)
            setTotalResult(props.restaurant_list.length)
            setRestaurantList(props.restaurant_list)
            renderRestaurantCard(props.restaurant_list)
        }
    }, [props, restaurantList])

    const renderRestaurantCard = (restaurant_list) => {
        let restaurantCard = restaurant_list && restaurant_list.map((restaurantDetails) => {
            return (
                <Col md={6}>
                    <Link
                        href={{
                            pathname: '/menuFeeding/restaurantList/' + restaurantDetails.name,
                            query: { locationId: locationId, locationName: locationName, restaurantId: restaurantDetails.id },
                        }}
                    >
                        <Card>
                            <Card.Img variant="top" src={restaurantDetails.image_url} className={styles.image} />
                            <Card.Body className={styles.content}>
                                <Card.Title className={styles.title}><b>{restaurantDetails.name}</b></Card.Title>
                                <Card.Text className={styles.card_text} >
                                    <Row >
                                        <Col style={{ borderRight: "1px solid #dee2e6" }}>
                                            Price <span style={{ color: "#74b100" }}><b>{restaurantDetails.price_from}-{restaurantDetails.price_to}</b></span> baht
                                    </Col>
                                        <Col style={{ color: "#74b100" }}>
                                            Open now!
                                    </Col>
                                    </Row>
                                    <Row style={{ marginTop: "10px" }}>
                                        <Col style={{ paddingBottom: "15px", borderBottom: "1px solid #dee2e6" }}>
                                            {restaurantDetails.description}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "15px" }}>
                                        <Col>
                                            <LocationOnIcon /> {restaurantDetails.googleMapsAddress}
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            )
        })

        setRestaurantCard(restaurantCard)
    }

    function onChangePriceFilter(value) {
        setPriceMinSearch(value[0])
        setPriceMaxSearch(value[1])
    }



    return (
        <Layout containerType="center">
            <Breadcrumb>
                <Link href="/menuFeeding" passHref>
                    <Breadcrumb.Item>{locationName}</Breadcrumb.Item>
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
                                        <Form.Group controlId="whareSearch" style={{ marginBottom: "0" }}>
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
                                <b>{totalResult} Results found</b>
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
                        {restaurantCard}
                    </Row>
                </Col>
            </Row>
        </Layout >
    )
}