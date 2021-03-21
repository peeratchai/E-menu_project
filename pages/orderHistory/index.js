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
import LocationOnIcon from '@material-ui/icons/LocationOn';

export default function OrderHistory() {
    const isBreakpoint = useMediaQuery(768)
    const router = useRouter()

    const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);

    const viewOrder = (orderId) => {
        router.push({
            pathname: "/orderHistory/[oid]",
            query: { oid: orderId }
        })
    }
    return (
        <>
            {
                isBreakpoint ? (
                    <>
                        <Layout mobile>
                            <Container className={utilStyles.container_sm}>
                                <Row style={{ height: "4rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }} onClick={() => viewOrder(1)}>
                                    <Col xs={3} style={{ paddingRight: "0px", height: "100%" }}>
                                        <Image src='/images/restaurant1.jpg' rounded style={{ height: "100%" }} />
                                    </Col>
                                    <Col xs={9}>
                                        <Row>
                                            <Col style={{ fontSize: "14px" }}>
                                                Completed
                                            </Col>
                                            <Col >
                                                <div style={{ textAlign: "right", fontSize: "12px", margin: "auto" }}>
                                                    7 MAR 2021
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ fontSize: "12px" }} xs={8}>
                                                <LocationOnIcon style={{ fontSize: "12px" }} /> Katsuya (คัตสึยะ) เมกา บางนา
                                            </Col>
                                            <Col xs={4}>
                                                <div style={{ textAlign: "right", fontSize: "12px" }}>
                                                    5:26 PM
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ fontSize: "14px" }}>
                                                <div style={{ textAlign: "right" }}>
                                                    <b>Total : 240 ฿</b>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <br />
                                <Row style={{ height: "4rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }}>
                                    <Col xs={3} style={{ paddingRight: "0px", height: "100%" }}>
                                        <Image src='/images/restaurant2.jpg' rounded style={{ height: "100%" }} />
                                    </Col>
                                    <Col xs={9}>
                                        <Row>
                                            <Col style={{ fontSize: "14px" }}>
                                                Completed
                                            </Col>
                                            <Col >
                                                <div style={{ textAlign: "right", fontSize: "12px", margin: "auto" }}>
                                                    6 MAR 2021
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} xs={8}>
                                                <LocationOnIcon style={{ fontSize: "12px" }} /> แสงชัยโภชนา (Saengchai Pochana)dwdwdw
                                            </Col>
                                            <Col xs={4}>
                                                <div style={{ textAlign: "right", fontSize: "12px" }}>
                                                    8:52 PM
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col style={{ fontSize: "14px" }}>
                                                <div style={{ textAlign: "right" }}>
                                                    <b>Total : 150 ฿</b>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <br />
                            </Container>
                        </Layout >

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
                        <div style={{ textAlign: "center", color: "#ced2dc" }} className={utilStyles.fontContentSM}>
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
