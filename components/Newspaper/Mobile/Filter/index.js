import utilStyles from '../../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Button, Modal } from 'react-bootstrap'
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
    const [foodType, setFoodType] = React.useState();
    const [paymentOption, setPaymentOption] = React.useState();
    const [distance, setDistance] = React.useState();

    const onSearch = () => {
        console.log(restaurantName, location, restaurantType, foodType)
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
                    <Row>
                        <Col xs={12} className={styles.colPadding}>
                            <div className={utilStyles.fontTitleMobileSM}>
                                Food Type
                                </div>
                            <div>
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

                                >
                                    <Option value="0">-</Option>
                                    <Option value="1">Breads</Option>
                                    <Option value="2">Rice</Option>
                                    <Option value="3">Meat</Option>
                                    <Option value="4">Pasta</Option>
                                    <Option value="5">Noodles</Option>
                                    <Option value="6">Vegetables</Option>
                                    <Option value="7">Fruit</Option>
                                </Select>
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
                                    <Select
                                        showSearch
                                        mode="multiple"
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


                                    >
                                        <Option value="0">-</Option>
                                        <Option value="1">Cash</Option>
                                        <Option value="2">Credit Cards</Option>
                                    </Select>
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

                                    >
                                        <Option value="0">-</Option>
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
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} className={styles.colPadding}>
                            <Row>
                                <Col>
                                    <Checkbox onChange={(e) => console.log(e)}>Parking</Checkbox>
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
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}