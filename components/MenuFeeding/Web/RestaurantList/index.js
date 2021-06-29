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
import changeFormatFilter from '../../../../services/changeFormatFilter'
import EmptyComponent from '../../../Empty'
import InfiniteScroll from "react-infinite-scroll-component";
const { Option } = Select;

export default function RestaurantListWeb(props) {

    const { loading, location_name, location_id, master_data_list, user_location, restaurant_list, current_filter_form, location_in_maps, total_result, total_page, current_page } = props
    const { on_search, filter_search, on_sort } = props
    const [restaurantCard, setRestaurantCard] = React.useState()


    useEffect(() => {
        if (restaurant_list !== undefined) {
            console.log(restaurant_list)
            renderRestaurantCard()
        }
    }, [restaurant_list])

    const renderRestaurantCard = () => {
        let restaurantCard = restaurant_list && restaurant_list.map((restaurantDetails) => {
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
                        onSearch={(form) => filter_search(form)}
                        initial_filter_form={current_filter_form}
                        location_restaurant_in_maps={location_in_maps}
                        filter_master_data_list={master_data_list}
                        user_location={user_location}
                    />
                </Col>
                {/* List Restaurant */}
                <Col xs={6} md={8}>
                    <Row style={{ padding: "20px 10px" }}>
                        <Col>
                            <div>
                                <b>{total_result} Results found</b>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ position: "absolute", right: "0" }}>
                                <b>sort by</b> &nbsp; <Select
                                    showSearch
                                    style={{ width: "150px" }}
                                    placeholder="Search to Select"
                                    defaultValue="-"
                                    onChange={(value) => on_sort(value)}
                                >
                                    <Option value="-">-</Option>
                                    <Option value="A-Z">A-Z</Option>
                                    <Option value="Z-A">Z-A</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                    <div style={{ width: "100%" }}>
                        <Spin spinning={loading} tip="Loading...">
                            {
                                restaurant_list.length > 0 ? (
                                    <>
                                        <InfiniteScroll
                                            dataLength={restaurant_list.length}
                                            next={on_search}
                                            hasMore={total_page === current_page ? false : true}
                                            loader={
                                                <div style={{ width: "100%", textAlign: "center" }}> <h4>Loading...</h4></div>
                                            }
                                        >
                                            <Row>
                                                {restaurantCard}
                                            </Row>
                                        </InfiniteScroll>
                                    </>
                                ) : (
                                    <EmptyComponent />
                                )
                            }
                        </Spin>
                    </div>
                </Col>
            </Row>
        </Layout >
    )
}