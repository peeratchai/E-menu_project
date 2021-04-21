import { Row, Col } from 'react-bootstrap'
import { Select, Checkbox } from 'antd';
import React from 'react'
import { StarOutlined, FireOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import utilStyles from '../../../../styles/utils.module.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

const { Option } = Select;

export default function WebFilter() {
    return (
        <div className={styles.banner}>
            <div className={utilStyles.container} style={{ position: "relative", zIndex: "9999" }}>
                <Row style={{ marginBottom: "2rem", paddingTop: "50px" }}>
                    <div>
                        <h1 style={{ fontWeight: "600" }}>
                            Discover
                        <p style={{ fontWeight: "300" }}>your amazing city</p>
                        </h1>
                        <h5>
                            <p style={{ color: "#666666", fontSize: "" }}>Find great places to stay, eat, shop, or visit from local experts.</p>
                        </h5>
                    </div>
                </Row>

                <Row style={{ marginBottom: "2rem" }}>
                    <Col style={{ padding: "0", backgroundColor: "white", borderRadius: "2px", borderRight: "1px solid #dee2e6" }}>
                        <div style={{ padding: "16px 20px" }}>
                            <Row style={{ fontSize: "16px" }}>
                                <Col>
                                    <b>Food Type</b>
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
                                        className={'myfilter'}
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
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col style={{ padding: "0", backgroundColor: "white", borderRadius: "2px", borderRight: "1px solid #dee2e6" }}>
                        <div style={{ padding: "16px 20px" }}>
                            <Row style={{ fontSize: "16px" }}>
                                <Col>
                                    <b>Payment option </b>
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
                                        className={'myfilter'}

                                    >
                                        <Option value="0">-</Option>
                                        <Option value="1">Cash</Option>
                                        <Option value="2">Credit Cards</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col style={{ padding: "0", backgroundColor: "white", borderRadius: "2px", borderRight: "1px solid #dee2e6" }}>
                        <div style={{ padding: "16px 20px" }}>
                            <Row style={{ fontSize: "16px" }}>
                                <Col>
                                    <b>Distance</b>
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
                                        className={'myfilter'}
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
                    <Col style={{ padding: "0", backgroundColor: "white", borderRadius: "2px" }}>
                        <div style={{ padding: "16px 20px" }}>
                            <Row style={{ fontSize: "16px" }}>
                                <Col>
                                    <b>Filter</b>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <Checkbox onChange={(e) => console.log(e)}>Parking</Checkbox>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <div style={{ fontSize: "1.125rem", color: "#666666", marginBottom: "1.25rem" }}>
                        Or browse the highlights
                    </div>
                </Row>

                {/* Highlights */}
                <Row>
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
                </Row>
            </div>

        </div>

    )
}