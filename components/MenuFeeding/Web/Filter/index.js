import utilStyles from '../../../../styles/utils.module.css'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react'
import styles from './index.module.css'
import GoogleMapReact from 'google-map-react';
import { Slider, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import PointInMaps from '../../../PointInMaps'

export default function Filter(props) {

    const { location_restaurant_in_maps } = props
    const [priceMinSearch, setPriceMinSearch] = React.useState();
    const [priceMaxSearch, setPriceMaxSearch] = React.useState();
    const [locationInMaps, setLocationInMaps] = React.useState([]);
    const [form, setForm] = React.useState({
        what: '',
        where: '',
        food_type: '',
        payment_option: '',
        distance: 0,
        price_to_price_from: '0 0',
        is_open_now: false,
        have_parking: false,
        sort_by: null
    })
    const defaultCenterMaps = { lat: 13.7641482, lng: 100.5388393 }
    const onChangePriceFilter = (value) => {
        setPriceMinSearch(value[0])
        setPriceMaxSearch(value[1])
        let price_from = value[0]
        let price_to = value[1]

        setform('price_to_price_from', price_from + " " + price_to)
    }

    useEffect(() => {
        if (location_restaurant_in_maps) {
            console.log('location_restaurant_in_maps', location_restaurant_in_maps)
            setLocationInMaps(location_restaurant_in_maps)

        }
    }, [props])

    const setform = (fieldName, value) => {
        setForm({
            ...form,
            [fieldName]: value
        })
    }

    const pointInMaps = locationInMaps && locationInMaps.map((location) => (
        <PointInMaps
            lat={location.lat}
            lng={location.lng}
            name={location.name}
        />
    ))

    return (
        <div>
            <div style={{ height: '10rem', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAqDX2CqFjdgUBY2QqPfUMlMDGS1gjttPw' }}
                    center={{
                        lat: defaultCenterMaps.lat,
                        lng: defaultCenterMaps.lng
                    }}
                    defaultZoom={11}
                >
                    {pointInMaps}
                </GoogleMapReact>
            </div>
            <br />
            <br />

            <div style={{ width: '100%', padding: "1.875rem", backgroundColor: "white" }} className={utilStyles.font_size_sm}>
                <div className={utilStyles.headingMd}>
                    <b>Search</b>
                </div>
                <br />
                <div style={{ marginTop: "10px" }}>
                    <Form>
                        <Row style={{ border: "1px solid #ced4da", margin: "0" }}>
                            <Col xs={3} style={{ margin: "auto" }}>
                                <b>What</b>
                            </Col>
                            <Col xs={9} style={{ paddingLeft: "0" }}>
                                <Form.Group controlId="whatSearch" style={{ marginBottom: "0" }}>
                                    <Form.Control type="text" placeholder="Any keywords.." className={styles.search_Box} onChange={(e) => setform('what', e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row style={{ border: "1px solid #ced4da", margin: "0" }}>
                            <Col xs={3} style={{ margin: "auto" }}>
                                <b>Where</b>
                            </Col>
                            <Col xs={9} style={{ paddingLeft: "0" }}>
                                <Form.Group controlId="whatSearch" style={{ marginBottom: "0" }}>
                                    <Form.Control type="text" placeholder="City, postcode.." className={styles.search_Box} onChange={(e) => setform('where', e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Button onClick={() => props.onSearch(form)} style={{ textAlign: "center", width: "100%", backgroundColor: "#ff5a5f", border: "none" }} className={utilStyles.font_size_md}>
                            <SearchIcon /> Search
                        </Button>
                    </Form>
                </div>
            </div>

            <br />
            <br />

            <div style={{ width: '100%', padding: "1.875rem", backgroundColor: "white" }} className={utilStyles.font_size_sm}>
                <div className={utilStyles.headingMd}>
                    <b>Filter</b>
                </div>
                <br />
                <div>
                    Food Type
                </div>
                <div style={{ marginTop: "10px" }}>
                    <Form.Group >
                        <Form.Control as="select" value={form.food_type} onChange={(e) => setform('food_type', e.target.value)}>
                            <option value="">-</option>
                            <option value="Breads">Breads</option>
                            <option value="Rice">Rice</option>
                            <option value="Meat">Meat</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruit">Fruit</option>
                        </Form.Control>
                    </Form.Group>

                    {/* <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        defaultValue={null}
                        onChange={(value) => setform('food_type', value)}
                    >
                        <Option value={null}>-</Option>
                        <Option value="Breads">Breads</Option>
                        <Option value="2">Rice</Option>
                        <Option value="3">Meat</Option>
                        <Option value="4">Pasta</Option>
                        <Option value="5">Noodles</Option>
                        <Option value="6">Vegetables</Option>
                        <Option value="7">Fruit</Option>
                    </Select> */}
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Form>
                        <Form.Group controlId="priceRange">
                            <Form.Label>Price Range</Form.Label>
                            <br />
                            <Slider range defaultValue={[priceMinSearch, priceMaxSearch]} value={[priceMinSearch, priceMaxSearch]} max={4000} onChange={onChangePriceFilter} />
                            <div className={utilStyles.font_size_sm}>From {priceMinSearch} to {priceMaxSearch} baht</div>
                        </Form.Group>
                    </Form>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <div>
                        Payment option
                                            </div>
                    <div style={{ marginTop: "10px" }}>
                        <Form.Group >
                            <Form.Control as="select" value={form.payment_option} onChange={(e) => setform('payment_option', e.target.value)}>
                                <option value="">-</option>
                                <option value="Cash">Cash</option>
                                <option value="Credit Card">Credit Cards</option>
                            </Form.Control>
                        </Form.Group>
                        {/* <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                            defaultValue={null}
                            onChange={(value) => setform('payment_option', value)}
                        >
                            <Option value={null}>-</Option>
                            <Option value="Cash">Cash</Option>
                            <Option value="Credit Card">Credit Cards</Option>
                        </Select> */}
                    </div>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <div>
                        Distance
                                            </div>
                    <div style={{ marginTop: "10px" }}>
                        <Form.Group >
                            <Form.Control as="select" value={form.distance} onChange={(e) => setform('distance', e.target.value)}>
                                <option value="">-</option>
                                <option value="1">1 กิโลเมตร</option>
                                <option value="2">2 กิโลเมตร</option>
                                <option value="5">5 กิโลเมตร</option>
                                <option value="10">10 กิโลเมตร</option>
                                <option value="20">20 กิโลเมตร</option>
                                <option value="40">40 กิโลเมตร</option>
                                <option value="60">60 กิโลเมตร</option>
                                <option value="80">80 กิโลเมตร</option>
                                <option value="100">100 กิโลเมตร</option>
                                <option value="250">250 กิโลเมตร</option>
                                <option value="500">500 กิโลเมตร</option>
                            </Form.Control>
                        </Form.Group>
                        {/* <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                            defaultValue={null}
                            onChange={(value) => setform('distance', value)}
                        >
                            <Option value={null}>-</Option>
                            <Option value="1">1 กิโลเมตร</Option>
                            <Option value="2">2 กิโลเมตร</Option>
                            <Option value="3">5 กิโลเมตร</Option>
                            <Option value="4">10 กิโลเมตร</Option>
                            <Option value="5">20 กิโลเมตร</Option>
                            <Option value="6">40 กิโลเมตร</Option>
                            <Option value="7">60 กิโลเมตร</Option>
                            <Option value="8">80 กิโลเมตร</Option>
                            <Option value="9">100 กิโลเมตร</Option>
                            <Option value="10">250 กิโลเมตร</Option>
                            <Option value="11">500 กิโลเมตร</Option>
                        </Select> */}
                    </div>
                </div>

                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Checkbox onChange={(e) => setform('is_open_now', e.target.checked)} >Open Now</Checkbox>
                    <Checkbox onChange={(e) => setform('have_parking', e.target.checked)} >Parking</Checkbox>
                </div>

                <Button style={{ textAlign: "center", width: "100%", backgroundColor: "#ff5a5f", border: "none" }} className={utilStyles.font_size_md} onClick={() => props.onSearch(form)}>
                    Filter
                </Button>

            </div>
        </div>
    )
}