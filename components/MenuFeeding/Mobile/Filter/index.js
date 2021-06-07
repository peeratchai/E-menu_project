import utilStyles from '../../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap'
import React, { useEffect } from 'react'
import { Slider, Select, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.module.css'
import { StarOutlined, FireOutlined } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

//Modal filter for mobile resolution
export default function MobileFilterRestaurantList(props) {

    const { filter_master_data_list, user_location } = props
    const [priceMinSearch, setPriceMinSearch] = React.useState(0);
    const [priceMaxSearch, setPriceMaxSearch] = React.useState(2000);
    const [haveUserLocation, setHaveUserLocation] = React.useState(false)
    const [form, setForm] = React.useState({
        what: null,
        where: null,
        food_type: null,
        payment_option: null,
        distance: 0,
        price_to_price_from: '0 0',
        is_open_now: false,
        have_parking: false,
        sort_by: null
    })

    useEffect(() => {
        if (user_location) {
            setHaveUserLocation(true)
        }
    }, [props])

    const onChangePriceFilter = (value) => {
        setPriceMinSearch(value[0])
        setPriceMaxSearch(value[1])
        let price_from = value[0]
        let price_to = value[1]
        setform('price_to_price_from', price_from + " " + price_to)

    }

    const setform = (fieldName, value) => {
        // console.log
        setForm({
            ...form,
            [fieldName]: value
        })
    }

    const onSearch = () => {
        props.on_search(form)
        props.onHide()
    }

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
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}><b>Filter</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Row>
                            <Col xs={12} className={styles.colPadding}>
                                <div className={utilStyles.fontTitleMobileSM}>
                                    What
                                </div>
                                <div>
                                    <Form.Group style={{ marginBottom: "0" }}>
                                        <Form.Control type="text" placeholder="Any keywords.." value={form.what} onChange={(e) => setform('what', e.target.value)} />
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col xs={12} className={styles.colPadding}>
                                <div className={utilStyles.fontTitleMobileSM}>
                                    Where
                                </div>
                                <div>
                                    <Form.Group controlId="whatSearchMobile" style={{ marginBottom: "0" }}>
                                        <Form.Control type="text" placeholder="City, postcode.." value={form.where} onChange={(e) => setform('where', e.target.value)} />
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col xs={12} className={styles.colPadding}>
                                <div className={utilStyles.fontTitleMobileSM}>
                                    Food Type
                                </div>
                                <div>
                                    <Form.Group >
                                        <Form.Control as="select" value={form.food_type} onChange={(e) => setform('food_type', e.target.value)}>
                                            <option value="null" key="null">-</option>
                                            {FootTypeDropDown}
                                        </Form.Control>
                                    </Form.Group>


                                </div>
                            </Col>
                            <Col xs={12} className={styles.colPadding}>
                                <Row>
                                    <Col>
                                        <div className={utilStyles.fontTitleMobileSM}>
                                            Price Range
                                    </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Slider range defaultValue={[priceMinSearch, priceMaxSearch]} value={[priceMinSearch, priceMaxSearch]} max={4000} onChange={onChangePriceFilter} />
                                        <div className={utilStyles.font_size_sm}>From {priceMinSearch} to {priceMaxSearch} baht</div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} className={styles.colPadding}>
                                <Row>
                                    <Col>
                                        <div className={utilStyles.fontTitleMobileSM}>
                                            Payment option
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group >
                                            <Form.Control as="select" value={form.payment_option} onChange={(e) => setform('payment_option', e.target.value)}>
                                                <option value="null">-</option>
                                                {PeymentOptionsDropDown}
                                            </Form.Control>
                                        </Form.Group>

                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} className={styles.colPadding}>
                                <Row>
                                    <Col>
                                        <div className={utilStyles.fontTitleMobileSM}>
                                            Distance
                                        </div>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group >
                                            <Form.Control as="select" disabled={!haveUserLocation} value={form.distance} onChange={(e) => setform('distance', e.target.value)}>
                                                <option value="null">-</option>
                                                {DistanceDropDown}
                                            </Form.Control>
                                        </Form.Group>
                                        {
                                            !haveUserLocation && (
                                                'Please allow to access your location it need to use in the filter.'
                                            )
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} className={styles.colPadding}>
                                <Row>
                                    <Col>
                                        <Checkbox onChange={(e) => setform('is_open_now', e.target.checked)} checked={form.is_open_now} >Open Now</Checkbox>
                                        <Checkbox onChange={(e) => setform('have_parking', e.target.checked)} checked={form.have_parking}>Parking</Checkbox>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                    <Row style={{ paddingTop: "3.15rem", paddtingBottom: "1.5rem" }}>
                        <Col>
                            <div style={{ textAlign: "center", fontSize: "1.125rem", color: "#666666", marginBottom: "1.25rem" }}>
                                Or browse the highlights
                            </div>
                        </Col>
                    </Row>
                    {/* Highlights */}
                    <Row style={{ textAlign: "center" }} xs={3}>
                        <Col>
                            <div className={styles.boxHighlight}>
                                <div className={styles.cardHighlight}>
                                    <div>
                                        <StarOutlined style={{ fontSize: "22px" }} />
                                    </div>
                                    <div style={{ marginTop: "0.625rem", fontSize: "0.7rem" }}>
                                        Poppular
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className={styles.boxHighlight}>
                                <div className={styles.cardHighlight}>
                                    <div>
                                        <LocationOnIcon style={{ fontSize: "22px" }} />
                                    </div>
                                    <div style={{ marginTop: "0.625rem", fontSize: "0.7rem" }}>
                                        near you
                        </div>
                                </div>
                            </div>
                        </Col>

                        <Col>
                            <div className={styles.boxHighlight}>
                                <div className={styles.cardHighlight}>
                                    <div>
                                        <WatchLaterIcon style={{ fontSize: "22px" }} />
                                    </div>
                                    <div style={{ marginTop: "0.625rem", fontSize: "0.7rem" }}>
                                        Open now
                        </div>
                                </div>
                            </div>
                        </Col>

                        <Col>
                            <div className={styles.boxHighlight}>
                                <div className={styles.cardHighlight}>
                                    <div>
                                        <FireOutlined style={{ fontSize: "22px" }} />
                                    </div>
                                    <div style={{ marginTop: "0.625rem", fontSize: "0.7rem" }}>
                                        Hot price
                        </div>
                                </div>
                            </div>
                        </Col>

                        <Col>
                            <div className={styles.boxHighlight}>
                                <div className={styles.cardHighlight}>
                                    <div>
                                        <LocationOnIcon style={{ fontSize: "22px" }} />
                                    </div>
                                    <div style={{ marginTop: "0.625rem", fontSize: "0.7rem" }}>
                                        near you
                        </div>
                                </div>
                            </div>
                        </Col>

                        <Col>
                            <div className={styles.boxHighlight}>
                                <div className={styles.cardHighlight}>
                                    <div>
                                        <LocationOnIcon style={{ fontSize: "22px" }} />
                                    </div>
                                    <div style={{ marginTop: "0.625rem", fontSize: "0.7rem" }}>
                                        near you
                        </div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onSearch()}>
                    Search
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal >
    );
}