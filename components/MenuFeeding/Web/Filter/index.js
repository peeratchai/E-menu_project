import utilStyles from '../../../../styles/utils.module.css'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect } from 'react'
import styles from './index.module.css'
import GoogleMapReact from 'google-map-react';
import { Slider, Select, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import changeFormatLatLong from '../../../../services/chaneformatLatLong'
import PointInMaps from '../../../PointInMaps'

const { Option } = Select;




export default function Filter(props) {

    const [priceMinSearch, setPriceMinSearch] = React.useState(0);
    const [priceMaxSearch, setPriceMaxSearch] = React.useState(2000);
    const [locationInMaps, setLocationInMaps] = React.useState([]);
    const [form, setForm] = React.useState({
        what: null,
        where: null,
        food_type: null,
        price_from: null,
        price_to: null,
        payment_option: null,
        distance: null,
        is_open_now: null,
        have_parking: null,
        sort_by: null
    })
    const [defaultCenterMaps, setDefaultCenterMaps] = React.useState({ lat: 13.8537968, lng: 100.3764991 });

    const onChangePriceFilter = (value) => {
        console.log('value: ', value);
        setPriceMinSearch(value[0])
        setPriceMaxSearch(value[1])
        let price_from = value[0]
        let price_to = value[1]

        setform('price_from', price_from)
        setform('price_to', price_to)

    }

    useEffect(() => {

        if (props.center_location_LatLong !== undefined) {
            const { center_location_LatLong, location_restaurant_in_maps } = props
            let { lat, lng } = changeFormatLatLong(center_location_LatLong)
            console.log(lat, lng)
            setDefaultCenterMaps({ lat: parseFloat(lat), lng: parseFloat(lng) })
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
                    {/* <AnyReactComponent
                        lat={13.7559731}
                        lng={100.5608889}
                        text="My Marker"
                    /> */}
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
                    <Select
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
                    </Select>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Form>
                        <Form.Group controlId="priceRange">
                            <Form.Label>Price Range</Form.Label>
                            <br />
                            <Slider range defaultValue={[priceMinSearch, priceMaxSearch]} max={4000} onChange={onChangePriceFilter} />
                            <div className={utilStyles.font_size_sm}>From {priceMinSearch} to {priceMaxSearch} baht</div>
                        </Form.Group>
                    </Form>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <div>
                        Payment option
                                            </div>
                    <div style={{ marginTop: "10px" }}>
                        <Select
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
                        </Select>
                    </div>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <div>
                        Distance
                                            </div>
                    <div style={{ marginTop: "10px" }}>
                        <Select
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
                        </Select>
                    </div>
                </div>

                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Checkbox onChange={(value) => setform('is_open_now', value)} >Open Now</Checkbox>
                    <Checkbox onChange={(value) => setform('have_parking', value)} >Parking</Checkbox>
                </div>

                <Button style={{ textAlign: "center", width: "100%", backgroundColor: "#ff5a5f", border: "none" }} className={utilStyles.font_size_md} onClick={() => props.onSearch(form)}>
                    Filter
                </Button>

            </div>
        </div>
    )
}