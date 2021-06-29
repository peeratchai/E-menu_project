import Layout from '../../../layout'
import utilStyles from '../../../../styles/utils.module.css'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from './index.module.css'
import { message, Select, Spin } from 'antd';
import 'antd/dist/antd.css';
import restaurantService from '../../../../services/restaurant'
import checkLogin from '../../../../services/checkLogin'
import Filter from '../Filter'
import changeFormatFilter from '../../../../services/changeFormatFilter'
import EmptyComponent from '../../../Empty'
import masterDataService from '../../../../services/masterData'

const { Option } = Select;

export default function LocationListWeb(props) {
    const { user_location } = props
    const [locationList, setLocationList] = React.useState([]);
    const [totalResult, setTotalResult] = React.useState(0);
    const [locationInMaps, setLocationInMaps] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const [sortValue, setSortValue] = React.useState()
    const [currentFilterForm, setCurrentFilterForm] = React.useState({
        what: null,
        where: null,
        food_type: null,
        payment_option: null,
        distance: 0,
        price_to_price_from: '0 0',
        is_open_now: false,
        have_parking: false,
        sort_by: null,
    })

    const [masterDataList, setMasterDataList] = React.useState({
        foodTypeMasterData: [],
        distanceMasterData: [],
        peymentOptionsMasterData: []
    })

    useEffect(async () => {
        getInitialData()
    }, [])

    const getInitialData = async () => {
        setLoading(true)
        await getLocationList()
        await getFilterMasterData()
    }

    const getLocationList = async () => {
        restaurantService.getLocationList().then((LocationList) => {
            setLocationList(LocationList)
            setMaps(LocationList)
            let totalResult = 0
            LocationList.forEach((locationDetails) => {
                if (locationDetails.total > 0) {
                    totalResult++
                }
            })
            setTotalResult(totalResult)
            setLoading(false)
        }).catch(error => {
            console.log(error)
            message.error('Cannot connect server.')
        })
    }

    const getFilterMasterData = async () => {
        let awaitFoodTypeMasterData = masterDataService.getFoodType()
        let awaitDistanceMasterData = masterDataService.getDistance()
        let awaitPeymentOptionsMasterData = masterDataService.getPaymentOptions()

        let foodTypeMasterData = await awaitFoodTypeMasterData
        let distanceMasterData = await awaitDistanceMasterData
        let peymentOptionsMasterData = await awaitPeymentOptionsMasterData

        let masterData = {
            foodTypeMasterData: foodTypeMasterData,
            distanceMasterData: distanceMasterData,
            peymentOptionsMasterData: peymentOptionsMasterData
        }
        setMasterDataList(masterData)

    }

    const setMaps = (LocationList) => {
        let LocationInMaps = []
        let point, substringPotion, splitPotion, latLong, lat, lng
        LocationList.map((LocationDetail) => {
            point = LocationDetail.location;
            substringPotion = point.substring(5)
            splitPotion = substringPotion.split('(').join('').split(')');
            latLong = splitPotion[0].split(' ')
            lat = latLong[0]
            lng = latLong[1]
            LocationInMaps.push({ lat: lat, lng: lng, name: LocationDetail.name })
        })

        setLocationInMaps(LocationInMaps)
    }

    const onSort = (sortValue, newLocationList = locationList) => {
        setSortValue(sortValue)
        if (sortValue === 'A-Z') {
            const sortResult = [].concat(newLocationList)
                .sort((a, b) => a.name > b.name ? 1 : -1)
            setLocationList(sortResult)
        }
        if (sortValue === 'Z-A') {
            const sortResult = [].concat(newLocationList)
                .sort((a, b) => a.name < b.name ? 1 : -1)
            setLocationList(sortResult)
        }
    }

    const onSearch = async (filterForm) => {
        setLoading(true)
        console.log('filterForm', filterForm)
        setCurrentFilterForm(filterForm)
        let filter = changeFormatFilter(filterForm)
        if (filter.distance !== null) {
            let splitDistanceArray = filter.distance.split(" ")
            filter.distance = parseFloat(splitDistanceArray[0]) * 1000
            filter.current_location = user_location
        } else {
            filter.current_location = null
        }

        console.log('filter', filter)
        let accessToken = await checkLogin()
        restaurantService.getLocationSearchByFilter(accessToken, filter).then((locationListByFilter) => {
            let totalResult = 0
            console.log('locationListByFilter', locationListByFilter)
            if (locationListByFilter) {
                locationListByFilter.forEach((locationDetails) => {
                    if (locationDetails.total > 0) {
                        totalResult++
                    }
                })
                setTotalResult(totalResult)
                if (sortValue) {
                    onSort(sortValue, locationListByFilter)
                } else {
                    setLocationList(locationListByFilter)
                }
            }
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            console.log('error', error)
        })

    }


    const locationCard = locationList && locationList.map((locationDetails) => {
        if (locationDetails.total > 0) {
            return (
                <Col md={6} className={styles.colCard}>
                    <Link
                        href={{
                            pathname: '/menuFeeding/restaurantList',
                            query: { locationId: locationDetails.id, locationName: locationDetails.title, currentFilterForm: JSON.stringify(currentFilterForm) },
                        }}
                    >
                        <Card style={{ height: "100%", border: "none", backgroundColor: "#eaeff3" }}>
                            <div className={utilStyles.img_hover_zoom} style={{ height: "70%" }}>
                                <Card.Img variant="top" src={locationDetails.image_url} style={{ height: "100%" }} />
                            </div>
                            <Card.Body className={utilStyles.cardBody}>
                                <Card.Text>
                                    <div className={utilStyles.cardTitle}>{locationDetails.title}</div>
                                    <div className={utilStyles.cardText}>{locationDetails.total} Listing</div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            )
        }
    })

    return (
        <Layout containerType="center">
            <div className={utilStyles.container_xl}>
                <Row style={{ marginTop: "15px" }}>
                    <Col xs={6} md={4}>
                        <Filter
                            onSearch={(filterForm) => onSearch(filterForm)}
                            location_restaurant_in_maps={locationInMaps}
                            filter_master_data_list={masterDataList}
                            user_location={user_location}
                            initial_filter_form={currentFilterForm}
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
                                    <b>sort by</b> &nbsp;
                                    <Select
                                        showSearch
                                        style={{ width: "150px" }}
                                        placeholder="Search to Select"
                                        defaultValue="-"
                                        onChange={(value) => onSort(value)}
                                    >
                                        {/* <Option value="-">-</Option> */}
                                        <Option value="A-Z">A-Z</Option>
                                        <Option value="Z-A">Z-A</Option>
                                    </Select>
                                </div>
                            </Col>
                        </Row>
                        <div style={{ width: "100%" }}>
                            <Spin spinning={loading} tip="Loading...">
                                <Row>
                                    {
                                        locationList.length > 0 ? (
                                            locationCard
                                        ) : (
                                            <EmptyComponent />
                                        )
                                    }
                                </Row>
                            </Spin>
                        </div>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}