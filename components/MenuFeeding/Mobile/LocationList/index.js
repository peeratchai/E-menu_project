import Layout from '../../../layout'
import utilStyles from '../../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card } from 'react-bootstrap'
import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from './index.module.css'
import { Select, message, Spin } from 'antd';
import MobileFilterRestaurantList from '../Filter'
import ShowFiilterSelected from '../../../ShowFiilterSelected'
import restaurantService from '../../../../services/restaurant'
import checkLogin from '../../../../services/checkLogin'
import 'antd/dist/antd.css';
import changeFormatFilter from '../../../../services/changeFormatFilter'
import EmptyComponent from '../../../Empty'
import masterDataService from '../../../../services/masterData'

const { Option } = Select;

export default function LocationListMobile(props) {
    const { user_location } = props
    const [locationList, setLocationList] = React.useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [totalResult, setTotalResult] = React.useState(0);
    const [filter, setFilter] = React.useState({});
    const [loading, setLoading] = React.useState(false)
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
        setLoading(false)
    }

    const getLocationList = async () => {
        setLoading(true)
        restaurantService.getLocationList().then((LocationList) => {
            setLocationList(LocationList)
            let totalResult = 0
            LocationList.forEach((locationDetails) => {
                if (locationDetails.total > 0) {
                    totalResult++
                }
            })
            setTotalResult(totalResult)
            setLoading(false)
        }).catch(error => {
            setLoading(false)
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


    const onSearch = async (filterForm) => {
        setLoading(true)
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
        let locationListByFilter = await restaurantService.getLocationSearchByFilter(accessToken, filter)
        let totalResult = 0
        locationListByFilter.forEach((locationDetails) => {
            if (locationDetails.total > 0) {
                totalResult++
            }
        })
        setFilter(filterForm)
        setTotalResult(totalResult)
        console.log(locationListByFilter)
        setLoading(false)
    }

    const searchFunc = () => {
        setModalShow(true)
    }

    const locationCard = locationList && locationList.map((locationDetails) => {
        if (locationDetails.total > 0) {
            return (
                <Col xs={12} className={styles.colCardMobile}>
                    <Link
                        href={{
                            pathname: '/menuFeeding/restaurantList',
                            query: { locationId: locationDetails.id, locationName: locationDetails.title, locationLatLong: locationDetails.location },
                        }}
                    >
                        <Card style={{ height: "100%", border: "none" }}>
                            <Card.Img variant="top" src={locationDetails.image_url} style={{ height: "70%" }} />
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
        <Layout containerType="mobile" search searchFunc={searchFunc}>
            <Container className={utilStyles.container_sm}>

                <ShowFiilterSelected filter={filter} />

                <Row style={{ marginBottom: "20px" }}>
                    <Col xs={12}>
                        <span className={utilStyles.fontTitleMobile}>
                            Area Selection
                    </span>
                    </Col>
                </Row>

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

            </Container>
            <MobileFilterRestaurantList
                show={modalShow}
                onHide={() => setModalShow(false)}
                on_search={(filterForm) => onSearch(filterForm)}
                filter_master_data_list={masterDataList}
                user_location={user_location}
            />
        </Layout >
    )
}

