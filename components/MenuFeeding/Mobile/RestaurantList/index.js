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
import EmptyComponent from '../../../Empty'
import InfiniteScroll from "react-infinite-scroll-component";

export default function RestaurantListMobile(props) {

    const { loading, location_name, location_id, master_data_list, user_location, restaurant_list, current_filter_form, location_in_maps, total_result, total_page, current_page } = props
    const { on_search, filter_search, on_sort } = props
    const [restaurantCard, setRestaurantCard] = React.useState()
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        if (restaurant_list !== undefined) {
            console.log(restaurant_list)
            renderRestaurantCard()
        }
    }, [restaurant_list])

    const searchFunc = () => {
        setModalShow(true)
    }

    const renderRestaurantCard = () => {
        let restaurantCard = restaurant_list && restaurant_list.map((restaurantDetails) => {
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
    return (
        <Layout containerType="mobile" search searchFunc={searchFunc}>
            <Container className={utilStyles.container_sm} >

                <ShowFiilterSelected filter={current_filter_form} />

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
                            <b>{total_result} Results found</b>
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
                                onChange={(value) => on_sort(value)}
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
                    <Spin spinning={loading} tip="Loading...">
                        <Row>
                            {
                                restaurant_list.length > 0 ? (
                                    <>
                                        <InfiniteScroll
                                            dataLength={restaurant_list.length}
                                            next={on_search}
                                            hasMore={total_page === current_page ? false : true}
                                            loader={
                                                <div style={{ width: "100%", textAlign: "center" }}> Loading...</div>
                                            }
                                        >
                                            {restaurantCard}
                                        </InfiniteScroll>
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
                on_search={(filterForm) => filter_search(filterForm)}
                filter_master_data_list={master_data_list}
                user_location={user_location}
                initial_filter_form={current_filter_form}
            />
        </Layout >
    )
}