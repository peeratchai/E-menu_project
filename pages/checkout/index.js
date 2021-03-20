import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import React, { useEffect } from 'react'
import { Row, Col, Form, Image, Button, Tab, Modal, Container, Tabs } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import { useRouter } from 'next/router'
import { Card, InputNumber, Skeleton } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
export default function CheckoutPage() {
    const isBreakpoint = useMediaQuery(768)
    const router = useRouter()

    return (
        <>
            {
                isBreakpoint ? (
                    <>
                        <Layout mobile>
                            <Container className={utilStyles.container_sm}>
                                <Row>
                                    <Col xs={4} style={{ paddingRight: "0px" }}>
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
                                                <b>฿ 120</b>
                                            </Col>
                                            <Col xs={8} style={{ textAlign: "right" }}>
                                                <Button style={{ padding: "1px 6px" }}>
                                                    <Row>
                                                        <Col >
                                                            <MinusOutlined style={{ fontSize: "12px" }} />
                                                        </Col>
                                                        <Col style={{ fontSize: "0.7rem", margin: "auto", padding: "0px 5px" }}>
                                                            1
                                                    </Col>
                                                        <Col>
                                                            <PlusOutlined style={{ fontSize: "12px" }} />
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
                        <div style={{ position: "absolute", bottom: 0, width: "100%" }} className="bg-gray-100">
                            <div className="bg-gray-100 container mx-auto px-6 pt-10 pb-6">
                                <Row>
                                    <Col>
                                        1 รายการ
                                    </Col>
                                    <Col style={{ textAlign: "right" }}>
                                        <b>฿ 120</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>

                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </>
                ) : null
            }
        </>
    )
}