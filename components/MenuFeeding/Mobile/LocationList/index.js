import Layout from '../../../layout'
import utilStyles from '../../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card } from 'react-bootstrap'
import Link from 'next/link'
import React, { useEffect,useLayoutEffect } from 'react'
import styles from './index.module.css'
import { Select, message } from 'antd';
import MobileFilterRestaurantList from '../Filter'
import ShowFiilterSelected from '../../../ShowFiilterSelected'
import restaurantService from '../../../../services/restaurant'
import checkLogin from '../../../../services/checkLogin'
import 'antd/dist/antd.css';
import changeFormatFilter from '../../../../services/changeFormatFilter'

const { Option } = Select;

export default function LocationListMobile() {
    const [locationList, setLocationList] = React.useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [totalResult, setTotalResult] = React.useState(0);
    const [filter, setFilter] = React.useState({});
    useLayoutEffect(async () => {
        if (typeof window !== 'undefined') {
            try {
                let accessToken = await checkLogin()
                let LocationList = await getLocationList(accessToken)
                console.log(LocationList)
                setLocationList(LocationList)
                setTotalResult(LocationList.length)
            } catch (error) {
                console.log(error)
                message.error('Something went wrong. please try again')
            }
        }
    }, [])

    const getLocationList = async (accessToken) => {
        try {
            let response = await restaurantService.getLocationList(accessToken)
            let locationList = response.data
            return locationList
        } catch (error) {
            console.log(error)
        }
    }

    const onSearch = async (filterForm) => {
        let filter = changeFormatFilter(filterForm)
        let accessToken = await checkLogin()
        let locationListByFilter = await restaurantService.getLocationSearchByFilter(accessToken, filter)
        setFilter(filterForm)
        console.log(locationListByFilter)
        // setLocationList(locationListByFilter)
    }

    const searchFunc = () => {
        setModalShow(true)
    }

    const locationCard = locationList && locationList.map((locationDetails) => (
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
    ))

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

                <Row>
                    {locationCard}
                </Row>

            </Container>
            <MobileFilterRestaurantList
                show={modalShow}
                onHide={() => setModalShow(false)}
                on_search={(filterForm) => onSearch(filterForm)}
            />
        </Layout >
    )
}

