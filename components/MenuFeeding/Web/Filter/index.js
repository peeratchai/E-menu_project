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

    const { location_restaurant_in_maps, filter_master_data_list, user_location, initial_filter_form = {} } = props
    const [priceMinSearch, setPriceMinSearch] = React.useState();
    const [priceMaxSearch, setPriceMaxSearch] = React.useState();
    const [locationInMaps, setLocationInMaps] = React.useState([]);
    const defaultCenterMaps = { lat: 13.7641482, lng: 100.5388393 }
    // const [form, setForm] = React.useState({
    //     what: null,
    //     where: null,
    //     food_type: null,
    //     payment_option: null,
    //     distance: 0,
    //     price_to_price_from: '0 0',
    //     is_open_now: false,
    //     have_parking: false,
    //     sort_by: null,
    // })
    const [form, setForm] = React.useState({})

    const onChangePriceFilter = (value) => {
        setPriceMinSearch(value[0])
        setPriceMaxSearch(value[1])
        let price_from = value[0]
        let price_to = value[1]

        setform('price_to_price_from', price_from + " " + price_to)
    }

    const [haveUserLocation, setHaveUserLocation] = React.useState(false)

    useEffect(() => {
        if (location_restaurant_in_maps) {
            setLocationInMaps(location_restaurant_in_maps)

            if (user_location) {
                setHaveUserLocation(true)
            }
        }
        console.log('initial_filter_form', initial_filter_form)
        console.log('form', form)

        if (Object.keys(initial_filter_form).length !== 0 && Object.keys(form).length === 0) {
            console.log('initial_filter_form', initial_filter_form)
            setForm({ ...initial_filter_form })
            try {
                let priceReange = initial_filter_form.price_to_price_from
                priceReange = priceReange.split(" ")
                let priceMin = priceReange[0]
                let priceMax = priceReange[1]
                setPriceMinSearch(priceMin)
                setPriceMaxSearch(priceMax)
            } catch (error) {
                console.log('error', error)
            }
        }
    }, [location_restaurant_in_maps, initial_filter_form])

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

    let FootTypeDropDown = filter_master_data_list.foodTypeMasterData && filter_master_data_list.foodTypeMasterData.map((foodType) => (
        <option value={foodType.name}>{foodType.name}</option>
    ))

    let DistanceDropDown = filter_master_data_list.distanceMasterData && filter_master_data_list.distanceMasterData.map((distance) => (
        <option value={distance.name}>{distance.name}</option>
    ))

    let PeymentOptionsDropDown = filter_master_data_list.peymentOptionsMasterData && filter_master_data_list.peymentOptionsMasterData.map((peymentOptions) => (
        <option value={peymentOptions.name}>{peymentOptions.name}</option>
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
                                    <Form.Control type="text" value={form.what} placeholder="Any keywords.." className={styles.search_Box} onChange={(e) => setform('what', e.target.value)} />
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
                                    <Form.Control type="text" value={form.where} placeholder="City, postcode.." className={styles.search_Box} onChange={(e) => setform('where', e.target.value)} />
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
                            <option value="null" key="null">-</option>
                            {FootTypeDropDown}
                        </Form.Control>
                    </Form.Group>
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
                                <option value="null">-</option>
                                {PeymentOptionsDropDown}
                            </Form.Control>
                        </Form.Group>
                    </div>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <div>
                        Distance
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <Form.Group >
                            <Form.Control as="select" value={form.distance} disabled={!haveUserLocation} onChange={(e) => setform('distance', e.target.value)} >
                                <option value="null">-</option>
                                {DistanceDropDown}
                            </Form.Control>
                        </Form.Group>
                        {
                            !haveUserLocation && (
                                'Please allow to access your location it need to use in the filter.'
                            )
                        }
                    </div>
                </div>

                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Checkbox value={form.is_open_now} onChange={(e) => setform('is_open_now', e.target.checked)} >Open Now</Checkbox>
                    <Checkbox value={form.have_parking} onChange={(e) => setform('have_parking', e.target.checked)} >Parking</Checkbox>
                </div>

                <Button style={{ textAlign: "center", width: "100%", backgroundColor: "#ff5a5f", border: "none" }} className={utilStyles.font_size_md} onClick={() => props.onSearch(form)}>
                    Filter
                </Button>

            </div>
        </div >
    )
}