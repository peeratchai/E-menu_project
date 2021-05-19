import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import React, { useEffect } from 'react'
import { Row, Col, Image, Button, Container } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import { useRouter } from 'next/router'
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';
import { MinusOutlined, PlusOutlined, LeftOutlined } from '@ant-design/icons';
import Link from 'next/link'

export default function Order(props) {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { order } = router.query;
    // const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
    const [orders, setOrders] = React.useState({ restaurant: { name: '' } });
    const [orderItems, setOrderItems] = React.useState([]);

    useEffect(() => {
        if (order) {
            let parseOrder = JSON.parse(order)
            let orderItmes = parseOrder.order_items
            setOrderItems(orderItmes)
            setOrders(parseOrder)
        }
    }, [order])


    const viewHistory = (order) => {
        router.push({
            pathname: "/orderHistory"
        })
    }

    let OrderListComponent = orderItems && orderItems.map((order) => {
        console.log('order', order)
        return (
            <>
                <Row style={{ height: "6rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }} key={order.id}>
                    <Col xs={4} style={{ paddingRight: "0px", height: "100%" }}>
                        <Image src={order.menu.image_url} rounded style={{ height: "100%" }} />
                    </Col>
                    <Col xs={8}>
                        <Row>
                            <Col>
                                <b>{order.menu.name}</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ color: "#D1D1D1", fontSize: "14px" }}>
                                * {order.special_instruction}
                            </Col>
                        </Row>
                        <Row >
                            <Col xs={4} style={{ margin: "auto" }}>
                                <b>฿ {order.total}</b>
                            </Col>
                            <Col xs={8} style={{ textAlign: "right" }}>
                                <Button style={{ padding: "1px 6px", border: "1px solid #DEDEDE", backgroundColor: "white" }}>
                                    <Row>
                                        <Col>
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
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br />
            </>
        )
    })

    return (
        <>
            {
                isMobileResolution ? (
                    <>
                        <Layout containerType="mobile">
                            <Container className={utilStyles.container_sm}>
                                <div style={{ marginBottom: "15px" }}>
                                    <Breadcrumb>
                                        <Breadcrumb.Item>
                                            <Link href="/orderHistory">
                                                History
                                            </Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            <Link href="">{orders.restaurant.name}</Link>
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                                {OrderListComponent}
                            </Container>
                        </Layout >
                    </>
                ) : (
                    <>
                        <Layout >
                            <Container className={utilStyles.container}>
                                <div style={{ marginBottom: "15px" }}>
                                    <Breadcrumb>
                                        <Breadcrumb.Item>
                                            <Link href="/orderHistory">
                                                History
                                            </Link>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            <Link href="">{orders.restaurant.name}</Link>
                                        </Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>
                                {OrderListComponent}
                            </Container>
                        </Layout >
                    </>
                )
            }
        </>
    )
}

// function ConfirmOrderModal(props) {
//     return (
//         <Modal
//             {...props}
//             size="sm"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//             style={{ padding: "1.3rem" }}
//         >

//             <Modal.Body>
//                 <Row>
//                     <Col>
//                         <div>
//                             <Image src="/images/checklist.png" style={{ objectFit: "contain", paddingLeft: "20px", height: "7rem", marginTop: "30px" }} />
//                         </div>
//                     </Col>
//                 </Row>
//                 <br />
//                 <Row>
//                     <Col>
//                         <div style={{ textAlign: "center", color: "#85878b" }} className={utilStyles.fontContent}>
//                             ยืนยันการสั่งอาหาร
//                         </div>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col>
//                         <div style={{ textAlign: "center", color: "#ced2dc" }} className={utilStyles.font_size_sm}>
//                             คุณต้องการยืนยันการสั่งอาหารหรือไม่
//                         </div>
//                     </Col>
//                 </Row>
//                 <br />
//                 <br />
//                 <Row>
//                     <Col>
//                         <div style={{ textAlign: "center" }}>
//                             <Button style={{ width: "90%", backgroundColor: "#c0cacc", border: "1px solid #c0cacf" }} onClick={props.onHide} className={utilStyles.fontContent}>ยกเลิก</Button>
//                         </div>
//                     </Col>
//                     <Col>
//                         <div style={{ textAlign: "center" }}>
//                             <Button style={{ width: "90%", backgroundColor: "#19c7d7", border: "#19c7d9" }} onClick={props.onHide} className={utilStyles.fontContent}>ยืนยัน</Button>
//                         </div>
//                     </Col>
//                 </Row>
//             </Modal.Body>
//         </Modal >
//     );
// }
