import utilStyles from '../../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap'
import React from 'react'
import { Slider, Select, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.module.css'
import { StarOutlined, FireOutlined } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

//Modal filter for mobile resolution
export default function MobileFilterRestaurantList(props) {
    const [priceMinSearch, setPriceMinSearch] = React.useState(0);
    const [priceMaxSearch, setPriceMaxSearch] = React.useState(2000);
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
                                            <option value="" key="null">-</option>
                                            <option value="Breads" key="Breads">Breads</option>
                                            <option value="Rice" key="Rice">Rice</option>
                                            <option value="Meat" key="Meat">Meat</option>
                                            <option value="Pasta" key="Pasta">Pasta</option>
                                            <option value="Noodles" key="Noodles">Noodles</option>
                                            <option value="Vegetables" key="Vegetables">Vegetables</option>
                                            <option value="Fruit" key="Fruit">Fruit</option>
                                        </Form.Control>
                                    </Form.Group>

                                    {/* <Select
                                        style={{ width: '100%' }}
                                        placeholder="Search to Select"
                                        // optionFilterProp="children"
                                        // filterOption={(input, option) =>
                                        //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        // }
                                        // filterSort={(optionA, optionB) =>
                                        //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        // }
                                        defaultValue="test"
                                        onChange={(value) => setform('food_type', value)}
                                        value={form.food_type}
                                    >
                                        <Option value="test">-</Option>
                                        <Option value="Breads">Breads2</Option>
                                        <Option value="Rice">Rice</Option>
                                        <Option value="Meat">Meat</Option>
                                        <Option value="Pasta">Pasta</Option>
                                        <Option value="Noodles">Noodles</Option>
                                        <Option value="Vegetables">Vegetables</Option>
                                        <Option value="Fruit">Fruit</Option>
                                    </Select> */}
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
                                                <option value="">-</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Credit Card">Credit Cards</option>
                                            </Form.Control>
                                        </Form.Group>
                                        {/* <Select
                                            showSearch
                                            showArrow={true}
                                            style={{ width: '100%' }}
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }
                                            defaultValue=""
                                            value={form.payment_option}
                                            onChange={(value) => setform('payment_option', value)}

                                        >
                                            <Option value="">-</Option>
                                            <Option value="Cash">Cash</Option>
                                            <Option value="Credit Card">Credit Cards</Option>
                                        </Select> */}
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
                                            defaultValue=""
                                            value={form.distance}
                                            onChange={(value) => setform('distance', value)}
                                        >
                                            <Option value="">-</Option>
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