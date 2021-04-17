import utilStyles from '../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Button, Modal, Form } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import React from 'react'
import { Slider, Select, Checkbox } from 'antd';
const { Option } = Select;
import 'antd/dist/antd.css';

//Modal Add Menu
export default function MobileFilterRestaurants(props) {
    const isBreakpoint = useMediaQuery(768)

    const [restaurantName, setRestaurantName] = React.useState();
    const [location, setLocation] = React.useState();
    const [restaurantType, setRestaurantType] = React.useState();
    const [foodType, setFoodType] = React.useState();

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
                        <Col xs={12}>
                            <div style={{ padding: "0.5rem", backgroundColor: "white", borderRadius: "2px" }}>
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

                            </div>

                        </Col>
                        <Col xs={12}>
                            <div style={{ padding: "0.5rem", backgroundColor: "white", borderRadius: "2px" }}>
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
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div style={{ padding: "0.5rem", backgroundColor: "white", borderRadius: "2px" }}>
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
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div style={{ padding: "0.5rem", backgroundColor: "white", borderRadius: "2px" }}>
                                <Row>
                                    <Col>
                                        <Checkbox onChange={(e) => console.log(e)}>Parking</Checkbox>
                                    </Col>
                                </Row>
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