import Layout from '../../../layout'
import utilStyles from '../../../../styles/utils.module.css'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import Link from 'next/link'
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react'
import styles from './index.module.css'
import GoogleMapReact from 'google-map-react';
import { Slider, Select, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import restaurantService from '../../../../services/restaurant'
import authentication from '../../../../services/authentication'
import checkLogin from '../../../../services/checkLogin'
import Filter from '../Filter'
const { Option } = Select;

const AnyReactComponent = ({ text }) => <div>{text}</div>;


export default function WebLocationList() {

    const [locationList, setLocationList] = React.useState([]);
    const [totalResult, setTotalResult] = React.useState(0);

    useEffect(async () => {
        if (typeof window !== 'undefined') {
            let accessToken = await checkLogin()
            let LocationList = await getLocationList(accessToken)
            setLocationList(LocationList)
            setTotalResult(LocationList.length)
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


    const locationCard = locationList && locationList.map((locationDetails) => (
        <Col xs={12} md={6} className={styles.colCard}>
            <Link
                href={{
                    pathname: '/menuFeeding/restaurantList',
                    query: { locationId: locationDetails.id, locationName: locationDetails.title },
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
    ))

    return (
        <Layout containerType="center">
            <div className={utilStyles.container_xl}>
                <Row style={{ marginTop: "15px" }}>
                    <Col xs={6} md={4}>
                        <Filter />
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
                            {locationCard}
                        </Row>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}