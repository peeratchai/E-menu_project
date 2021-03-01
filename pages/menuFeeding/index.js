import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Button } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import Link from 'next/link'

export default function Newspaper() {
    const isBreakpoint = useMediaQuery(768)
    return (
        <Layout>
            <Container>
                <h1 className={utilStyles.headingLg}>
                    Area Selection
                </h1>
                <Row>
                    <Col xs={12} md={3}>
                        <Link
                            href={{
                                pathname: '/menuFeeding/restaurantList',
                                query: { area: 'Ari' },
                            }}
                        >
                            <Card>
                                <Card.Img variant="top" src="/images/ari.jpg" />
                                <Card.Body>
                                    <Card.Title>Ari</Card.Title>
                                    <Card.Text>
                                        20 Listing
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/thonglor.jpg" />
                            <Card.Body>
                                <Card.Title>Thonglor</Card.Title>
                                <Card.Text>
                                    15 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/eakmai.jpg" />
                            <Card.Body>
                                <Card.Title>Ekamai</Card.Title>
                                <Card.Text>
                                    7 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/rama4.jpg" />
                            <Card.Body>
                                <Card.Title>Rama 4</Card.Title>
                                <Card.Text>
                                    13 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/ari.jpg" />
                            <Card.Body>
                                <Card.Title>Ari</Card.Title>
                                <Card.Text>
                                    20 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/thonglor.jpg" />
                            <Card.Body>
                                <Card.Title>Thonglor</Card.Title>
                                <Card.Text>
                                    15 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/eakmai.jpg" />
                            <Card.Body>
                                <Card.Title>Ekamai</Card.Title>
                                <Card.Text>
                                    7 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/rama4.jpg" />
                            <Card.Body>
                                <Card.Title>Rama 4</Card.Title>
                                <Card.Text>
                                    13 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/ari.jpg" />
                            <Card.Body>
                                <Card.Title>Ari</Card.Title>
                                <Card.Text>
                                    20 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/thonglor.jpg" />
                            <Card.Body>
                                <Card.Title>Thonglor</Card.Title>
                                <Card.Text>
                                    15 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/eakmai.jpg" />
                            <Card.Body>
                                <Card.Title>Ekamai</Card.Title>
                                <Card.Text>
                                    7 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/rama4.jpg" />
                            <Card.Body>
                                <Card.Title>Rama 4</Card.Title>
                                <Card.Text>
                                    13 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/ari.jpg" />
                            <Card.Body>
                                <Card.Title>Ari</Card.Title>
                                <Card.Text>
                                    20 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/thonglor.jpg" />
                            <Card.Body>
                                <Card.Title>Thonglor</Card.Title>
                                <Card.Text>
                                    15 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/eakmai.jpg" />
                            <Card.Body>
                                <Card.Title>Ekamai</Card.Title>
                                <Card.Text>
                                    7 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3}>
                        <Card>
                            <Card.Img variant="top" src="/images/rama4.jpg" />
                            <Card.Body>
                                <Card.Title>Rama 4</Card.Title>
                                <Card.Text>
                                    13 Listing
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}