import Layout from '../../../layout'
import utilStyles from '../../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Button, Breadcrumb } from 'react-bootstrap'
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

export default function RestaurantListMobile(props) {
    const { loading, location_name, location_id, master_data_list, user_location, current_filter_form } = props
    const [modalShow, setModalShow] = React.useState(false);
    const [restaurantCard, setRestaurantCard] = React.useState();
    const [totalResult, setTotalResult] = React.useState(0);
    const [restaurantList, setRestaurantList] = React.useState([]);
    const [filter, setFilter] = React.useState({});
    const [currentFilterForm, setCurrentFilterForm] = React.useState({})
    const [spinLoading, setSpinLoading] = React.useState(loading)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [nextPage, setNextPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState(0)
    const [sortValue, setSortValue] = React.useState()
    // limit is number of reataurant list each page 
    const limit = 10

    const searchFunc = () => {
        setModalShow(true)
    }

    useEffect(() => {
        if (location_name) {
            if (JSON.parse(current_filter_form)) {
                onSearch(JSON.parse(current_filter_form))
            }
        }

    }, [location_name])

    const onSearch = async (filterForm, isLoadMore = false) => {
        setFilter(filterForm)
        setCurrentFilterForm(filterForm)
        setSpinLoading(true)
        filterForm.business_location = location_id
        let filter = changeFormatFilter(filterForm)
        if (filter.distance !== null) {
            let splitDistanceArray = filter.distance.split(" ")
            filter.distance = parseFloat(splitDistanceArray[0]) * 1000
            filter.current_location = user_location
        } else {
            filter.current_location = null
        }
        filter.business_district = location_id
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
            setNextPage(next_page)
            setTotalPage(totalPage)
            setTotalResult(newRestaurantList.length)
        } else {
            setRestaurantList(newRestaurantList)
            renderRestaurantCard(newRestaurantList)
            setTotalResult(0)
            setNextPage(1)
        }

        setSpinLoading(false)
    }

    const renderRestaurantCard = (restaurantList) => {
        let restaurantCard = restaurantList && restaurantList.map((restaurantDetails) => {
            return (
                <Col xs={12}>
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
        <Layout containerType="mobile" search searchFunc={searchFunc}>
            <Container className={utilStyles.container_sm} >

                <ShowFiilterSelected filter={filter} />

                <Breadcrumb>
                    <Link href="/menuFeeding" passHref>
                        <Breadcrumb.Item>{location_name}</Breadcrumb.Item>
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

                {/* List of Restaurant */}
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
            </Container>
            <MobileFilterRestaurant
                show={modalShow}
                onHide={() => setModalShow(false)}
                on_search={(filterForm) => onSearch(filterForm)}
                filter_master_data_list={master_data_list}
                user_location={user_location}
                initial_filter_form={currentFilterForm}
            />
        </Layout >
    )
}