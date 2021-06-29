import utilStyles from '../../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Button, Modal, Form } from 'react-bootstrap'
import React from 'react'
import { Select, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.module.css'
import { StarOutlined, FireOutlined } from '@ant-design/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

const { Option } = Select;

//Modal filter for mobile resolution
export default function MobileFilter(props) {

    const { filter_master_data_list } = props
    const [form, setForm] = React.useState({
        food_type: '',
        payment_option: '',
        distance: 0,
        is_open_now: false,
        have_parking: false,
        sort_by: null
    })
    const setform = (fieldName, value) => {
        // console.log
        setForm({
            ...form,
            [fieldName]: value
        })
    }

    const onSearch = () => {
        props.onSearch(form)
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
                    <Row>
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
                                        <Form.Control as="select" value={form.distance} onChange={(e) => setform('distance', e.target.value)}>
                                            <option value="null">-</option>
                                            {DistanceDropDown}
                                        </Form.Control>
                                    </Form.Group>
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
                <Button onClick={() => { onSearch() }}>
                    Search
                </Button>
                <Button className="Buttom_Close" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}