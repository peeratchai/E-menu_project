import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import React, { useEffect } from 'react'
import { Row, Col, Form, Image, Button, Modal, Container, Tabs } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import { useRouter } from 'next/router'
import 'antd/dist/antd.css';
import { Card, InputNumber, Skeleton } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
export default function CheckoutPage() {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()

    const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
    return (
        <>
            {
                isMobileResolution ? (
                    <>
                        <Layout containerType="mobile">
                            <Container className={utilStyles.container_sm}>
                                <Row style={{ height: "6rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                    <Col xs={4} style={{ paddingRight: "0px", height: "100%" }}>
                                        <Image src='/images/food1.jpg' rounded style={{ height: "100%" }} />
                                    </Col>
                                    <Col xs={8}>
                                        <Row>
                                            <Col>
                                                <b>ผัดไทย</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ color: "#D1D1D1", fontSize: "14px" }}>
                                                * ไม่ใส่กุ้ง
                                        </Col>
                                        </Row>
                                        <Row >
                                            <Col xs={4} style={{ margin: "auto" }}>
                                                <b>฿ 60</b>
                                            </Col>
                                            <Col xs={8} style={{ textAlign: "right" }}>
                                                <Button style={{ padding: "1px 6px", border: "1px solid #DEDEDE", backgroundColor: "white" }}>
                                                    <Row>
                                                        <Col >
                                                            <MinusOutlined style={{ fontSize: "12px", color: "#DEDEDE" }} />
                                                        </Col>
                                                        <Col style={{ fontSize: "0.7rem", margin: "auto", padding: "0px 5px", color: "black" }}>
                                                            1
                                                    </Col>
                                                        <Col>
                                                            <PlusOutlined style={{ fontSize: "12px", color: "#DEDEDE" }} />
                                                        </Col>
                                                    </Row>
                                                </Button>
                                                {/* <div>
                                                <Button><MinusOutlined /></Button><Form.Control as="text" /><Button><PlusOutlined /></Button>
                                            </div> */}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <br />
                                <Row style={{ height: "6rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                    <Col xs={4} style={{ paddingRight: "0px", height: "100%" }}>
                                        <Image src='/images/food4.jpg' rounded style={{ height: "100%" }} />
                                    </Col>
                                    <Col xs={8}>
                                        <Row>
                                            <Col>
                                                <b>ยำปลาหมึก</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ color: "#D1D1D1", fontSize: "14px" }}>
                                                * เผ็ดน้อย
                                        </Col>
                                        </Row>
                                        <Row >
                                            <Col xs={4} style={{ margin: "auto" }}>
                                                <b>฿ 80</b>
                                            </Col>
                                            <Col xs={8} style={{ textAlign: "right" }}>
                                                <Button style={{ padding: "1px 6px", border: "1px solid #DEDEDE", backgroundColor: "white" }}>
                                                    <Row>
                                                        <Col >
                                                            <MinusOutlined style={{ fontSize: "12px", color: "#DEDEDE" }} />
                                                        </Col>
                                                        <Col style={{ fontSize: "0.7rem", margin: "auto", padding: "0px 5px", color: "black" }}>
                                                            1
                                                    </Col>
                                                        <Col>
                                                            <PlusOutlined style={{ fontSize: "12px", color: "#DEDEDE" }} />
                                                        </Col>
                                                    </Row>
                                                </Button>
                                                {/* <div>
                                                <Button><MinusOutlined /></Button><Form.Control as="text" /><Button><PlusOutlined /></Button>
                                            </div> */}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </Layout >
                        <div style={{ position: "absolute", bottom: 0, width: "100%", fontSize: "16px", marginBottom: "10px", borderTop: "1px solid #DEDEDE" }} className="bg-gray-100">
                            <div className="bg-gray-100 container-sm " style={{ paddingTop: "10px" }}>
                                <Row>
                                    <Col>
                                        2 รายการ
                                    </Col>
                                    <Col style={{ textAlign: "right" }}>
                                        <b>฿ 140</b>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        <Button style={{ width: '100%', backgroundColor: "#19c7d7", border: "1px solid #19c7d7" }} onClick={() => setConfirmModalVisible(true)}>
                                            สั่ง 2 รายการ
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <ConfirmOrderModal
                            show={confirmModalVisible}
                            onHide={() => setConfirmModalVisible(false)}
                        />
                    </>
                ) : null
            }
        </>
    )
}

function ConfirmOrderModal(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ padding: "1.3rem" }}
        >

            <Modal.Body>
                <Row>
                    <Col>
                        <div>
                            <Image src="/images/checklist.png" style={{ objectFit: "contain", paddingLeft: "20px", height: "7rem", marginTop: "30px" }} />
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <div style={{ textAlign: "center", color: "#85878b" }} className={utilStyles.fontContent}>
                            ยืนยันการสั่งอาหาร
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ textAlign: "center", color: "#ced2dc" }} className={utilStyles.font_size_sm}>
                            คุณต้องการยืนยันการสั่งอาหารหรือไม่
                        </div>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col>
                        <div style={{ textAlign: "center" }}>
                            <Button style={{ width: "90%", backgroundColor: "#c0cacc", border: "1px solid #c0cacf" }} onClick={props.onHide} className={utilStyles.fontContent}>ยกเลิก</Button>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ textAlign: "center" }}>
                            <Button style={{ width: "90%", backgroundColor: "#19c7d7", border: "#19c7d9" }} onClick={props.onHide} className={utilStyles.fontContent}>ยืนยัน</Button>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal >
    );
}
