import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import React, { useEffect } from 'react'
import { Row, Col, Image, Button, Container } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import { useRouter } from 'next/router'
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';
import Link from 'next/link'
import withSession from '../../lib/session'
import PropTypes from 'prop-types'

const axios = require('axios')

const Order = ({ user }) => {

    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { order } = router.query;
    const [orders, setOrders] = React.useState({ restaurant: { name: '' } });
    const [orderItems, setOrderItems] = React.useState([]);
    const [total, setTotal] = React.useState(0)
    useEffect(() => {
        console.log('user', user)
        if (order && user) {
            let parseOrder = JSON.parse(order)
            let orderItmes = parseOrder.order_items
            setOrderItems(orderItmes)
            sumOfPriceTotal(orderItmes)
            setOrders(parseOrder)
        } else {
            router.push({
                pathname: "/orderHistory"
            })
        }
    }, [order,user])

    const sumOfPriceTotal = (orderItmes) => {
        let total = 0
        orderItmes.forEach((order) => {
            total += order.total
        })
        setTotal(total)
    }



    let MobileOrderListComponent = orderItems && orderItems.map((order) => {
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
                                <Button style={{ padding: "1px 6px", border: "1px solid #DEDEDE", backgroundColor: "white", cursor: "default" }}>
                                    <Row>
                                        <Col>
                                        </Col>
                                        <Col style={{ fontSize: "0.7rem", margin: "auto", padding: "0px 5px", color: "white" }}>
                                            {order.quantity}
                                        </Col>
                                        <Col>
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

    let WebOrderListComponent = orderItems && orderItems.map((order) => {
        console.log('order', order)
        return (
            <>
                <Row style={{ height: "12rem", borderBottom: "1px solid #DEDEDE", paddingBottom: "10px" }} key={order.id}>
                    <Col xs={4} style={{ paddingRight: "0px", height: "100%" }}>
                        <Image src={order.menu.image_url} rounded style={{ height: "100%" }} />
                    </Col>
                    <Col xs={8} className={utilStyles.font_size_md}>
                        <Row>
                            <Col>
                                <b>{order.menu.name}</b>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ color: "gray", fontSize: "14px" }}>
                                * {order.special_instruction}
                            </Col>
                        </Row>
                        <Row >
                            <Col xs={4} style={{ margin: "auto" }}>
                                <b>฿ {order.total}</b>
                            </Col>
                            <Col xs={8} style={{ textAlign: "right" }}>
                                <Button style={{ padding: "1px 6px", border: "1px solid #DEDEDE", backgroundColor: "white", cursor: "default" }}>
                                    <Row>
                                        <Col>
                                        </Col>
                                        <Col style={{ fontSize: "0.7rem", margin: "auto", padding: "0px 5px", color: "white" }}>
                                            {order.quantity}
                                        </Col>
                                        <Col>
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
                                {MobileOrderListComponent}
                                <div style={{ width: "100%", fontSize: "16px", marginBottom: "10px" }} className="bg-gray-100">
                                    <div className="bg-gray-100 container-sm " style={{ paddingTop: "10px", textAlign: "right" }}>
                                        Total Price : {total}
                                    </div>
                                </div>
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
                                {WebOrderListComponent}
                                <div style={{ width: "100%", fontSize: "16px", marginBottom: "10px" }} className="bg-gray-100">
                                    <div className="bg-gray-100 container-sm " style={{ paddingTop: "10px", textAlign: "right" }}>
                                        Total Price : {total}
                                    </div>
                                </div>
                            </Container>
                        </Layout >
                    </>
                )
            }
        </>
    )
}


export default Order

Order.propTypes = {
    user: PropTypes.shape({
        isLoggedIn: PropTypes.bool,
    }),
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    let user = req.session.get('user')
    console.log('user', user)
    if (user) {

        let config = {
            headers: {
                'Authorization': 'Bearer ' + user.accessToken,
            }
        }
        let reponse = await axios.get(`${process.env.API_URL}/profile`, config)
        let profile = reponse.data

        console.log('profile', profile)

        if (profile) {
            user.profile = profile
        }else{
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }
        return {
            props: { user }
        }
    } else {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
})
