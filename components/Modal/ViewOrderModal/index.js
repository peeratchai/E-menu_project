import utilStyles from '../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Image, Button, Tab, Tabs, Modal } from 'react-bootstrap'
import 'antd/dist/antd.css';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import React from 'react'


export default function ViewOrderModal(props) {

    const [tableNumber, setTableNumber] = React.useState(props.tableNumber)

    return (

        <Modal
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    All tables
                        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="newOrder" id="orderStatus-tabs">
                    <Tab eventKey="newOrder" title="New order">
                        <Row style={{ height: "80vh", marginTop: "20px" }}>
                            <Col xs={4} style={{ borderRight: "1px solid #DEDEDE" }}>
                                {/* Table list */}
                                <Row className={tableNumber == 1 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(1)}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col>
                                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                        &nbsp;&nbsp; T1
                                                    </Col>
                                                <Col>
                                                    <div style={{ textAlign: "right" }}>
                                                        <b>1,059 THB</b>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                        14:14:59 - 20/03/2021
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={tableNumber == 2 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(2)}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col>
                                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                        &nbsp;&nbsp; T2
                                                    </Col>
                                                <Col>
                                                    <div style={{ textAlign: "right" }}>
                                                        <b>860 THB</b>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                        14:14:59 - 20/03/2021
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={tableNumber == 3 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(3)}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col>
                                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                        &nbsp;&nbsp; T3
                                                    </Col>
                                                <Col>
                                                    <div style={{ textAlign: "right" }}>
                                                        <b>1530 THB</b>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                        14:14:59 - 20/03/2021
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={8}>
                                <Row style={{ paddingBottom: "10px" }}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col xs={2}>
                                                    <Image src="/images/food1.jpg" rounded style={{ height: "100%" }} />
                                                </Col>
                                                <Col xs={10}>
                                                    <div>
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div>
                                                                    <b>ผัดไทย</b>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                                    <Button variant="primary" style={{ padding: ".1rem .5rem", marginRight: "10px" }}><CheckOutlined style={{ fontSize: "12px" }} /></Button>
                                                                    <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div>
                                                        <b>x 1</b>
                                                    </div>
                                                    <div style={{ textAlign: "right" }}>
                                                        Price : 80 THB
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ paddingBottom: "10px" }}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col xs={2}>
                                                    <Image src="/images/food5.jpg" rounded style={{ height: "100%" }} />
                                                </Col>
                                                <Col xs={10}>
                                                    <div>
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div>
                                                                    <b>ยำปลาหมึก</b>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                                    <Button variant="primary" style={{ padding: ".1rem .5rem", marginRight: "10px" }}><CheckOutlined style={{ fontSize: "12px" }} /></Button>
                                                                    <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div>
                                                        <b>x 2</b>
                                                    </div>
                                                    <div style={{ textAlign: "right" }}>
                                                        Price : 160 THB
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <div style={{ position: "absolute", bottom: "0", right: "10px" }}>
                                    <b>Total is 240 THB</b>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="inOrder" title="In Order">
                        <Row style={{ height: "80vh", marginTop: "20px" }}>
                            <Col xs={4} style={{ borderRight: "1px solid #DEDEDE" }}>
                                {/* Table list */}
                                <Row className={tableNumber == 1 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(1)}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col>
                                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                        &nbsp;&nbsp; T1
                                                    </Col>
                                                <Col>
                                                    <div style={{ textAlign: "right" }}>
                                                        <b>1,059 THB</b>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                        14:14:59 - 20/03/2021
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={tableNumber == 2 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(2)}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col>
                                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                        &nbsp;&nbsp; T2
                                                    </Col>
                                                <Col>
                                                    <div style={{ textAlign: "right" }}>
                                                        <b>860 THB</b>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                        14:14:59 - 20/03/2021
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={tableNumber == 3 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(3)}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col>
                                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                        &nbsp;&nbsp; T3
                                                    </Col>
                                                <Col>
                                                    <div style={{ textAlign: "right" }}>
                                                        <b>1530 THB</b>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                        14:14:59 - 20/03/2021
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={8}>
                                <Row style={{ paddingBottom: "10px" }}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col xs={2}>
                                                    <Image src="/images/food1.jpg" rounded style={{ height: "100%" }} />
                                                </Col>
                                                <Col xs={10}>
                                                    <div>
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div>
                                                                    <b>ผัดไทย</b>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                                    <Button variant="primary" style={{ padding: ".1rem .5rem", marginRight: "10px" }}><CheckOutlined style={{ fontSize: "12px" }} /></Button>
                                                                    <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div>
                                                        <b>x 1</b>
                                                    </div>
                                                    <div style={{ textAlign: "right" }}>
                                                        Price : 80 THB
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ paddingBottom: "10px" }}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col xs={2}>
                                                    <Image src="/images/food5.jpg" rounded style={{ height: "100%" }} />
                                                </Col>
                                                <Col xs={10}>
                                                    <div>
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div>
                                                                    <b>ยำปลาหมึก</b>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                                    <Button variant="primary" style={{ padding: ".1rem .5rem", marginRight: "10px" }}><CheckOutlined style={{ fontSize: "12px" }} /></Button>
                                                                    <Button variant="danger" style={{ padding: ".1rem .5rem" }}><DeleteOutlined style={{ fontSize: "12px" }} /></Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div>
                                                        <b>x 2</b>
                                                    </div>
                                                    <div style={{ textAlign: "right" }}>
                                                        Price : 160 THB
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <div style={{ position: "absolute", bottom: "0", right: "10px" }}>
                                    <b>Total is 240 THB</b>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="completed" title="Completed">
                        <Row style={{ height: "80vh", marginTop: "20px" }}>
                            <Col xs={4} style={{ borderRight: "1px solid #DEDEDE" }}>
                                {/* Table list */}
                                <Row className={tableNumber == 1 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(1)}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col>
                                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                        &nbsp;&nbsp; T1
                                                    </Col>
                                                <Col>
                                                    <div style={{ textAlign: "right" }}>
                                                        <b>1,059 THB</b>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                        14:14:59 - 20/03/2021
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={tableNumber == 2 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(2)}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col>
                                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                        &nbsp;&nbsp; T2
                                                    </Col>
                                                <Col>
                                                    <div style={{ textAlign: "right" }}>
                                                        <b>860 THB</b>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                        14:14:59 - 20/03/2021
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={tableNumber == 3 ? styles.tableSelected : null} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setTableNumber(3)}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col>
                                                    <Image src="/images/table-icon.png" style={{ width: "30px", height: "30px" }} />
                                                        &nbsp;&nbsp; T3
                                                    </Col>
                                                <Col>
                                                    <div style={{ textAlign: "right" }}>
                                                        <b>1530 THB</b>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div style={{ textAlign: "right" }} className={utilStyles.font_size_sm}>
                                                        14:14:59 - 20/03/2021
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={8}>
                                <Row style={{ paddingBottom: "10px" }}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col xs={2}>
                                                    <Image src="/images/food1.jpg" rounded style={{ height: "100%" }} />
                                                </Col>
                                                <Col xs={10}>
                                                    <div>
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div>
                                                                    <b>ผัดไทย</b>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                                    <b>Completed</b>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div>
                                                        <b>x 1</b>
                                                    </div>
                                                    <div style={{ textAlign: "right" }}>
                                                        Price : 80 THB
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ paddingBottom: "10px" }}>
                                    <Col>
                                        <div style={{ borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                            <Row >
                                                <Col xs={2}>
                                                    <Image src="/images/food5.jpg" rounded style={{ height: "100%" }} />
                                                </Col>
                                                <Col xs={10}>
                                                    <div>
                                                        <Row>
                                                            <Col xs={8}>
                                                                <div>
                                                                    <b>ยำปลาหมึก</b>
                                                                </div>
                                                            </Col>
                                                            <Col xs={4}>
                                                                <div className={utilStyles.font_size_sm} style={{ textAlign: "right" }}>
                                                                    <b>Completed</b>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div>
                                                        <b>x 2</b>
                                                    </div>
                                                    <div style={{ textAlign: "right" }}>
                                                        Price : 160 THB
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <div style={{ position: "absolute", bottom: "0", right: "10px" }}>
                                    <b>Total is 240 THB</b>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </Modal.Body >
        </Modal >
    );
}
