import Layout from '../../../layout'
import utilStyles from '../../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Breadcrumb } from 'react-bootstrap'
import Link from 'next/link'
import styles from './index.module.css'
import { Select, Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import MobileFilterRestaurant from '../Filter'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ShowFiilterSelected from '../../../ShowFiilterSelected'
import changeFormatFilter from '../../../../services/changeFormatFilter'
import checkLogin from '../../../../services/checkLogin'
import restaurantService from '../../../../services/restaurant'
import masterDataService from '../../../../services/masterData'
import EmptyComponent from '../../../Empty'


// Geocode.setApiKey("AIzaSyAqDX2CqFjdgUBY2QqPfUMlMDGS1gjttPw");
// Geocode.setLanguage("th");
// // Geocode.setRegion("es");
// Geocode.setLocationType("ROOFTOP");
// Geocode.enableDebug();

export default function RestaurantListMobile(props) {
    const { loading, restaurant_list, location_name, location_id , master_data_list } = props
    const [modalShow, setModalShow] = React.useState(false);
    const [restaurantCard, setRestaurantCard] = React.useState();
    const [totalResult, setTotalResult] = React.useState(0);
    const [restaurantList, setRestaurantList] = React.useState([]);
    const [locationName, setLocationName] = React.useState("");
    const [locationId, setLocationId] = React.useState("");
    const [filter, setFilter] = React.useState({});
 

    const searchFunc = () => {
        setModalShow(true)
    }



    useEffect(() => {
        if (restaurant_list.length !== 0) {
            // setRestaurantList(props.restaurant_list)
            if (restaurantList.length === 0) {
                setLocationName(location_name)
                setLocationId(location_id)
                setTotalResult(restaurant_list.length)
                setRestaurantList(restaurant_list)
                renderRestaurantCard(restaurant_list)
            } else {
                setTotalResult(restaurantList.length)
                setRestaurantList(restaurantList)
                renderRestaurantCard(restaurantList)
            }
        }
    }, [restaurant_list])

    const onSearch = async (filterForm) => {
        filterForm.business_location = locationId
        let filter = changeFormatFilter(filterForm)
        let accessToken = await checkLogin()
        let locationListByFilter = await restaurantService.getRestaurantSearchByFilter(accessToken, filter)
        setFilter(filterForm)
        console.log(locationListByFilter)
        setRestaurantList(locationListByFilter)
        setTotalResult(locationListByFilter.length)
    }

    const renderRestaurantCard = (restaurantList) => {
        let restaurantCard = restaurantList && restaurantList.map((restaurantDetails) => {
            return (
                <Col xs={12}>
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

    return (
        <Layout containerType="mobile" search searchFunc={searchFunc}>
            <Container className={utilStyles.container_sm} >

                <ShowFiilterSelected filter={filter} />

                <Breadcrumb>
                    <Link href="/menuFeeding" passHref>
                        <Breadcrumb.Item>{locationName}</Breadcrumb.Item>
                    </Link>
                    <Breadcrumb.Item active>Restaurant List</Breadcrumb.Item>
                </Breadcrumb>

                {/* Results found */}
                <Row style={{ padding: "0 10px 10px 10px" }} className={utilStyles.font_size_sm}>
                    <Col xs={5} style={{ margin: "auto" }}>
                        <div>
                            <b>{totalResult} Results found</b>
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
                <div style={{ width: "100%" }}>
                    <Spin spinning={loading} tip="Loading...">
                        <Row>
                            {
                                restaurantList.length > 0 ? (
                                    restaurantCard
                                ) : (
                                    <EmptyComponent />
                                )
                            }
                        </Row>
                    </Spin>
                </div>
            </Container>
            <MobileFilterRestaurant
                show={modalShow}
                onHide={() => setModalShow(false)}
                on_search={(filterForm) => onSearch(filterForm)}
                filter_master_data_list={master_data_list}
            />
        </Layout >
    )
}