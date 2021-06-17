import Layout from '../../../layout'
import { Row, Col, Card, Button, Form, Breadcrumb } from 'react-bootstrap'
import styles from './index.module.css'
import Link from 'next/link'
import { Slider, Select, Checkbox, Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Filter from '../Filter'
import restaurantService from '../../../../services/restaurant'
import checkLogin from '../../../../services/checkLogin'
import Geocode from "react-geocode";
import changeFormatFilter from '../../../../services/changeFormatFilter'
import EmptyComponent from '../../../Empty'

// Geocode.setApiKey("AIzaSyAqDX2CqFjdgUBY2QqPfUMlMDGS1gjttPw");
// Geocode.setLanguage("th");
// // Geocode.setRegion("es");
// Geocode.setLocationType("ROOFTOP");
// Geocode.enableDebug();

const { Option } = Select;

export default function RestaurantListWeb(props) {

    const { location_name, location_id, master_data_list, user_location, current_filter_form } = props
    const [restaurantList, setRestaurantList] = React.useState([]);
    const [totalResult, setTotalResult] = React.useState(0);
    const [restaurantCard, setRestaurantCard] = React.useState();
    const [locationInMaps, setLocationInMaps] = React.useState([]);
    const [spinLoading, setSpinLoading] = React.useState()
    const [currentFilterForm, setCurrentFilterForm] = React.useState({})
    const [currentPage, setCurrentPage] = React.useState(1)
    const [nextPage, setNextPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState(0)
    const [sortValue, setSortValue] = React.useState()
    // limit is number of reataurant list each page 
    const limit = 10

    useEffect(() => {

        if (location_name) {
            if (JSON.parse(current_filter_form)) {
                onSearch(JSON.parse(current_filter_form))
            }
        }
    }, [location_name])

    const setMaps = (restaurant_list) => {
        let LocationInMaps = []
        let point, substringPotion, splitPotion, latLong, lat, lng

        restaurant_list.map((restaurantDetails) => {
            try {
                point = restaurantDetails.location;
                substringPotion = point.substring(5)
                splitPotion = substringPotion.split('(').join('').split(')');
                latLong = splitPotion[0].split(' ')
                lat = latLong[0]
                lng = latLong[1]
                LocationInMaps.push({ lat: lat, lng: lng, name: restaurantDetails.name })
            } catch (error) {
                console.log('')
            }

        })

        setLocationInMaps(LocationInMaps)
    }

    const renderRestaurantCard = (restaurantList) => {
        let restaurantCard = restaurantList && restaurantList.map((restaurantDetails) => {
            return (
                <Col md={6}>
                    <Link
                        href={{
                            pathname: '/menuFeeding/restaurantList/' + restaurantDetails.name,
                            query: { locationId: location_id, locationName: location_name, restaurantId: restaurantDetails.id },
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
                                            <LocationOnIcon /> {restaurantDetails.address}
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

    const onSearch = async (filterForm, isLoadMore = false) => {
        setCurrentFilterForm(filterForm)
        setSpinLoading(true)
        let filter = { ...filterForm }
        filter = changeFormatFilter(filter)
        console.log('filter', filter)
        if (filter.distance !== null) {
            let splitDistanceArray = filter.distance.split(" ")
            filter.distance = parseFloat(splitDistanceArray[0]) * 1000
            filter.current_location = user_location
        } else {
            filter.current_location = null
        }
        filter.business_district = location_id
        console.log('filter', filter)
        console.log('nextPage', nextPage)

        let response = await restaurantService.getRestaurantSearchWithPaging(nextPage, limit, filter)
        console.log('response', response)
        let next_page = response.next_page
        let current_page = response.current_page
        let totalPage = response.total_page
        const results = response.results
        let newRestaurantList = []
        if (results.length > 0) {
            if (isLoadMore) {
                newRestaurantList = [...restaurantList, ...results]
            } else {
                newRestaurantList = [...results]
            }
            console.log(newRestaurantList)
            if (sortValue) {
                onSort(sortValue, newRestaurantList)
            } else {
                setRestaurantList(newRestaurantList)
                renderRestaurantCard(newRestaurantList)
            }
            setCurrentPage(current_page)
            if (next_page !== null) {
                setNextPage(next_page)
            }
            setTotalPage(totalPage)
            setTotalResult(newRestaurantList.length)
        } else {
            setRestaurantList(newRestaurantList)
            renderRestaurantCard(newRestaurantList)
            setTotalResult(0)
            setNextPage(1)
        }
        setMaps(newRestaurantList)
        setSpinLoading(false)

    }

    const onSort = (sortValue, newRestaurantList = restaurantList) => {
        setSortValue(sortValue)
        if (sortValue === 'A-Z') {
            const sortResult = [].concat(newRestaurantList)
                .sort((a, b) => a.name > b.name ? 1 : -1)
            setRestaurantList(sortResult)
            renderRestaurantCard(sortResult)
        }
        if (sortValue === 'Z-A') {
            const sortResult = [].concat(newRestaurantList)
                .sort((a, b) => a.name < b.name ? 1 : -1)
            setRestaurantList(sortResult)
            renderRestaurantCard(sortResult)
        }
    }

    return (
        <Layout containerType="center">
            <Breadcrumb>
                <Link href="/menuFeeding" passHref>
                    <Breadcrumb.Item>{location_name}</Breadcrumb.Item>
                </Link>
                <Breadcrumb.Item active>Restaurant List</Breadcrumb.Item>
            </Breadcrumb>
            {/* List of Restaurant */}
            <Row style={{ marginTop: "15px" }}>
                <Col xs={6} md={4}>
                    {/* Filter */}
                    <Filter
                        onSearch={(form) => onSearch(form)}
                        initial_filter_form={currentFilterForm}
                        location_restaurant_in_maps={locationInMaps}
                        filter_master_data_list={master_data_list}
                        user_location={user_location}
                    />
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
                                    defaultValue="-"
                                    onChange={(value) => onSort(value)}
                                >
                                    <Option value="-">-</Option>
                                    <Option value="A-Z">A-Z</Option>
                                    <Option value="Z-A">Z-A</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                    <div style={{ width: "100%" }}>
                        <Spin spinning={spinLoading} tip="Loading...">
                            <Row>
                                {
                                    restaurantList.length > 0 ? (
                                        <>
                                            {restaurantCard}
                                            {
                                                currentPage < totalPage && (
                                                    <div style={{ width: "100%", textAlign: "center" }}>
                                                        <Button onClick={() => onSearch(currentFilterForm, true)}>Load more</Button>
                                                    </div>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <EmptyComponent />
                                    )
                                }
                            </Row>
                        </Spin>
                    </div>
                </Col>
            </Row>
        </Layout >
    )
}