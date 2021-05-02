import Layout from '../../../components/layout'
import utilStyles from '../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Breadcrumb } from 'react-bootstrap'
import { useRouter } from 'next/router'
import styles from './index.module.css'
import Link from 'next/link'
import useMediaQuery from "../../../utils/utils";
import { Select } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import MobileFilterRestaurant from '../../../components/MenuFeeding/Mobile/Filter'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ShowFiilterSelected from '../../../components/ShowFiilterSelected'
import restaurantService from '../../../services/restaurant'
import checkLogin from '../../../services/checkLogin'
import RestaurantListWeb from '../../../components/MenuFeeding/Web/RestaurantList'
import Geocode from "react-geocode";


Geocode.setApiKey("AIzaSyAqDX2CqFjdgUBY2QqPfUMlMDGS1gjttPw");
Geocode.setLanguage("th");
// Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();


const { Option } = Select;

export default function RestaurantList() {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { locationId, locationName, locationLatLong } = router.query;
    const [modalShow, setModalShow] = React.useState(false);
    const [restaurantList, setRestaurantList] = React.useState([]);

    useEffect(async () => {
        if (!router.isReady) {
            // console.log('not ready')
        } else {
            if (locationId === undefined || locationName === undefined || locationLatLong === undefined) {
                router.push({
                    pathname: "/menuFeeding"
                })
            } else {
                console.log('restaurantList')
                let accessToken = await checkLogin()
                let restaurantList = await getRestaurant(accessToken);
                console.log('restaurantList', restaurantList)
                await getAddressOnGoogleMaps(restaurantList)
            }
        }
    }, [router.isReady])

    const getAddressOnGoogleMaps = async (restaurantList) => {
        let point, substringPotion, splitPotion, latLong, lat, lng
        Promise.all(restaurantList.map(async (restaurantDetails) => {
            point = restaurantDetails.location;
            substringPotion = point.substring(5)
            splitPotion = substringPotion.split('(').join('').split(')');
            latLong = splitPotion[0].split(' ')
            lat = latLong[0]
            lng = latLong[1]
            let address = await Geocode.fromLatLng(lat, lng).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    return address
                },
                (error) => {
                    console.error(error);
                }
            );
            restaurantDetails.googleMapsAddress = address
            console.log(address)
            return address
        })).then(() => {
            console.log(restaurantList)
            setRestaurantList(restaurantList)
        })

    }

    const getRestaurant = async (accessToken) => {
        let response = await restaurantService.getRestaurantSearchByLocation(accessToken, locationId);
        return response.data
    }

    const searchFunc = () => {
        setModalShow(true)
    }

    return (
        <>
            {
                !isMobileResolution ? (
                    //PC Version
                    <RestaurantListWeb
                        restaurant_list={restaurantList}
                        location_name={locationName}
                        location_id={locationId}
                        location_lat_long={locationLatLong}
                    />
                ) : (
                    //Mobile Version
                    <Layout containerType="mobile" search searchFunc={searchFunc}>
                        <Container className={utilStyles.container_sm} >

                            <ShowFiilterSelected />

                            <Breadcrumb>
                                <Link href="/menuFeeding" passHref>
                                    <Breadcrumb.Item>Ari</Breadcrumb.Item>
                                </Link>
                                <Breadcrumb.Item active>Restaurant List</Breadcrumb.Item>
                            </Breadcrumb>

                            {/* Results found */}
                            <Row style={{ padding: "0 10px 10px 10px" }} className={utilStyles.font_size_sm}>
                                <Col xs={5} style={{ margin: "auto" }}>
                                    <div>
                                        <b>130 Results found</b>
                                    </div>
                                </Col>
                                <Col xs={7}>
                                    <div style={{ textAlign: "right" }}>
                                        <b>sort by</b> &nbsp;
                                        <Select
                                            showSearch
                                            style={{ width: "25vw", textAlign: "left" }}
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
                                                <Card.Title className={styles.title}><b>Park Hyatt Bangkok</b></Card.Title>
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
                        <MobileFilterRestaurant
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Layout >
                )
            }
        </>
    )
}