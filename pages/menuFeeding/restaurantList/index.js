import Layout, { siteTitle } from '../../../components/layout'
import utilStyles from '../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Button, Breadcrumb } from 'react-bootstrap'
import { useRouter } from 'next/router'
import styles from './index.module.css'
import Link from 'next/link'


export default function RestaurantList({ props }) {

    const router = useRouter()
    const { area } = router.query;
    console.log(area)
    return (
        <Layout>
            <Container>
                <Breadcrumb>
                    <Link href="/menuFeeding" passHref>
                        <Breadcrumb.Item>Ari</Breadcrumb.Item>
                    </Link>
                    <Breadcrumb.Item active>Restaurant List</Breadcrumb.Item>
                </Breadcrumb>
                {/* List of Restaurant */}
                <Row>
                    <Col xs={12} md={4}>
                        <Link
                            href={{
                                pathname: '/menuFeeding/restaurantList/' + 'Park Hyatt Bangkok',
                                query: { area: 'Ari', restaurant: 'Park Hyatt Bangkok' },
                            }}
                        >
                            <Card>
                                <Card.Img variant="top" src="/images/restaurant1.jpg" />
                                <Card.Body className={styles.content}>
                                    <Card.Title className={styles.title}>Park Hyatt Bangkok</Card.Title>
                                    <Card.Text className={styles.text}>
                                        <Row>
                                            <Col>
                                                <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.9</span>
                                    &nbsp;&nbsp;
                                    <span >120 rating</span>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "10px" }}>
                                            <Col>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card>
                            <Card.Img variant="top" src="/images/restaurant3.jpg" />
                            <Card.Body className={styles.content}>
                                <Card.Title className={styles.title}>TATE</Card.Title>
                                <Card.Text className={styles.text}>
                                    <Row>
                                        <Col>
                                            <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.7</span>
                                    &nbsp;&nbsp;
                                    <span >45 rating</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "10px" }}>
                                        <Col>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card>
                            <Card.Img variant="top" src="/images/restaurant2.jpg" />
                            <Card.Body className={styles.content}>
                                <Card.Title className={styles.title}>SEEN Restaurant</Card.Title>
                                <Card.Text className={styles.text}>
                                    <Row>
                                        <Col>
                                            <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.2</span>
                                    &nbsp;&nbsp;
                                    <span >6 rating</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "10px" }}>
                                        <Col>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <Link
                            href={{
                                pathname: '/menuFeeding/restaurantList/' + 'Park Hyatt Bangkok',
                                query: { area: 'Ari', restaurant: 'Park Hyatt Bangkok' },
                            }}
                        >
                            <Card>
                                <Card.Img variant="top" src="/images/restaurant8.jpg" />
                                <Card.Body className={styles.content}>
                                    <Card.Title className={styles.title}>Signs</Card.Title>
                                    <Card.Text className={styles.text}>
                                        <Row>
                                            <Col>
                                                <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.6</span>
                                    &nbsp;&nbsp;
                                    <span >76 rating</span>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "10px" }}>
                                            <Col>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card>
                            <Card.Img variant="top" src="/images/restaurant9.jpg" />
                            <Card.Body className={styles.content}>
                                <Card.Title className={styles.title}>Norma’s</Card.Title>
                                <Card.Text className={styles.text}>
                                    <Row>
                                        <Col>
                                            <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.7</span>
                                    &nbsp;&nbsp;
                                    <span >45 rating</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "10px" }}>
                                        <Col>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card>
                            <Card.Img variant="top" src="/images/restaurant10.jpg" />
                            <Card.Body className={styles.content}>
                                <Card.Title className={styles.title}>Toby's</Card.Title>
                                <Card.Text className={styles.text}>
                                    <Row>
                                        <Col>
                                            <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.2</span>
                                    &nbsp;&nbsp;
                                    <span >6 rating</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "10px" }}>
                                        <Col>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <Link
                            href={{
                                pathname: '/menuFeeding/restaurantList/' + 'Park Hyatt Bangkok',
                                query: { area: 'Ari', restaurant: 'Park Hyatt Bangkok' },
                            }}
                        >
                            <Card>
                                <Card.Img variant="top" src="/images/restaurant11.jpg" />
                                <Card.Body className={styles.content}>
                                    <Card.Title className={styles.title}>Nang Gin Kui</Card.Title>
                                    <Card.Text className={styles.text}>
                                        <Row>
                                            <Col>
                                                <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.9</span>
                                    &nbsp;&nbsp;
                                    <span >120 rating</span>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "10px" }}>
                                            <Col>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                        </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card>
                            <Card.Img variant="top" src="/images/restaurant12.jpg" />
                            <Card.Body className={styles.content}>
                                <Card.Title className={styles.title}>Rock Restaurant and Bar</Card.Title>
                                <Card.Text className={styles.text}>
                                    <Row>
                                        <Col>
                                            <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.7</span>
                                    &nbsp;&nbsp;
                                    <span >45 rating</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "10px" }}>
                                        <Col>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card>
                            <Card.Img variant="top" src="/images/restaurant13.jpg" />
                            <Card.Body className={styles.content}>
                                <Card.Title className={styles.title}>Le Normandie</Card.Title>
                                <Card.Text className={styles.text}>
                                    <Row>
                                        <Col>
                                            <span style={{ backgroundColor: "rgb(162,216,76)", padding: "2px 4px", borderRadius: "3px", color: "white" }}>4.7</span>
                                    &nbsp;&nbsp;
                                    <span >28 rating</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "10px" }}>
                                        <Col>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout >
    )
}