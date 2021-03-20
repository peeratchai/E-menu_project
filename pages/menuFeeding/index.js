import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Button, Modal, Form } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import Link from 'next/link'
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react'
import styles from './index.module.css'


export default function Newspaper() {
    const isBreakpoint = useMediaQuery(768)

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            {
                !isBreakpoint ? (
                    // PC Version
                    <Layout center>
                        <Container>
                            <Row style={{ marginBottom: "20px" }}>
                                <Col>
                                    <span className={utilStyles.fontTitle}>
                                        Area Selection
                                </span>
                                &nbsp;&nbsp;
                                <span onClick={() => setModalShow(true)} style={{ cursor: "pointer", border: "1px solid #9c9c9c", borderRadius: "5px", backgroundColor: "#9c9c9c", padding: "0 10px", color: "white" }}><SearchIcon /> <span style={{ fontSize: "22px" }}>Search</span></span>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={3} className={styles.colCard}>
                                    <Link
                                        href={{
                                            pathname: '/menuFeeding/restaurantList',
                                            query: { area: 'Ari' },
                                        }}
                                    >
                                        <Card style={{ height: "100%", border: "none" }}>
                                            <div className={utilStyles.img_hover_zoom} style={{ height: "80%" }} >
                                                <Card.Img variant="top" src="/images/ari.jpg" style={{ height: "100%" }} />
                                            </div>
                                            <Card.Body className={utilStyles.cardBody}>
                                                <Card.Text>
                                                    <div className={utilStyles.cardTitle}>Ari</div>
                                                    <div className={utilStyles.cardText}>20 Listing</div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={12} md={3} className={styles.colCard}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <div className={utilStyles.img_hover_zoom} style={{ height: "80%" }} >
                                            <Card.Img variant="top" src="/images/thonglor.jpg" style={{ height: "100%" }} />
                                        </div>
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Thonglor</div>
                                                <div className={utilStyles.cardText}>2150 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={3} className={styles.colCard}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <div className={utilStyles.img_hover_zoom} style={{ height: "80%" }} >
                                            <Card.Img variant="top" src="/images/eakmai.jpg" style={{ height: "100%" }} />
                                        </div>
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Ekamai</div>
                                                <div className={utilStyles.cardText}>7 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={3} className={styles.colCard}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <div className={utilStyles.img_hover_zoom} style={{ height: "80%" }} >
                                            <Card.Img variant="top" src="/images/rama4.jpg" style={{ height: "100%" }} />
                                        </div>
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Rama 4</div>
                                                <div className={utilStyles.cardText}>13 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={3} className={styles.colCard}>
                                    <Link
                                        href={{
                                            pathname: '/menuFeeding/restaurantList',
                                            query: { area: 'Ari' },
                                        }}
                                    >
                                        <Card style={{ height: "100%", border: "none" }}>
                                            <div className={utilStyles.img_hover_zoom} style={{ height: "80%" }} >
                                                <Card.Img variant="top" src="/images/ari.jpg" style={{ height: "100%" }} />
                                            </div>
                                            <Card.Body className={utilStyles.cardBody}>
                                                <Card.Text>
                                                    <div className={utilStyles.cardTitle}>Ari</div>
                                                    <div className={utilStyles.cardText}>20 Listing</div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={12} md={3} className={styles.colCard}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <div className={utilStyles.img_hover_zoom} style={{ height: "80%" }} >
                                            <Card.Img variant="top" src="/images/thonglor.jpg" style={{ height: "100%" }} />
                                        </div>
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Thonglor</div>
                                                <div className={utilStyles.cardText}>2150 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={3} className={styles.colCard}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <div className={utilStyles.img_hover_zoom} style={{ height: "80%" }} >
                                            <Card.Img variant="top" src="/images/eakmai.jpg" style={{ height: "100%" }} />
                                        </div>
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Ekamai</div>
                                                <div className={utilStyles.cardText}>7 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} md={3} className={styles.colCard}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <div className={utilStyles.img_hover_zoom} style={{ height: "80%" }} >
                                            <Card.Img variant="top" src="/images/rama4.jpg" style={{ height: "100%" }} />
                                        </div>
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Rama 4</div>
                                                <div className={utilStyles.cardText}>13 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                        <SearchLocationModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Layout>
                ) : (
                    // Mobile Version
                    <Layout mobile>
                        <Container className={utilStyles.container_sm}>
                            <Row style={{ marginBottom: "20px" }}>

                                <Col xs={7}>
                                    <span className={utilStyles.fontTitleMobile}>
                                        Area Selection
                                        </span>
                                </Col>
                                <Col xs={5} style={{ margin: "auto" }}>
                                    <span onClick={() => setModalShow(true)} style={{ cursor: "pointer", border: "1px solid #9c9c9c", borderRadius: "5px", backgroundColor: "#9c9c9c", padding: "0 10px", color: "white" }}><SearchIcon /> <span style={{ fontSize: "1rem" }}>Search</span></span>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={3} className={styles.colCardMobile}>
                                    <Link
                                        href={{
                                            pathname: '/menuFeeding/restaurantList',
                                            query: { area: 'Ari' },
                                        }}
                                    >
                                        <Card style={{ height: "100%", border: "none" }}>
                                            <Card.Img variant="top" src="/images/ari.jpg" style={{ height: "70%" }} />
                                            <Card.Body className={utilStyles.cardBody}>
                                                <Card.Text>
                                                    <div className={utilStyles.cardTitle}>Ari</div>
                                                    <div className={utilStyles.cardText}>20 Listing</div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={6} md={3} className={styles.colCardMobile}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <Card.Img variant="top" src="/images/thonglor.jpg" style={{ height: "70%" }} />
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Thonglor</div>
                                                <div className={utilStyles.cardText}>2150 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={6} md={3} className={styles.colCardMobile}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <Card.Img variant="top" src="/images/eakmai.jpg" style={{ height: "70%" }} />
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Ekamai</div>
                                                <div className={utilStyles.cardText}>7 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={6} md={3} className={styles.colCardMobile}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <Card.Img variant="top" src="/images/rama4.jpg" style={{ height: "70%" }} />
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Rama 4</div>
                                                <div className={utilStyles.cardText}>13 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={3} className={styles.colCardMobile}>
                                    <Link
                                        href={{
                                            pathname: '/menuFeeding/restaurantList',
                                            query: { area: 'Ari' },
                                        }}
                                    >
                                        <Card style={{ height: "100%", border: "none" }}>
                                            <Card.Img variant="top" src="/images/ari.jpg" style={{ height: "70%" }} />
                                            <Card.Body className={utilStyles.cardBody}>
                                                <Card.Text>
                                                    <div className={utilStyles.cardTitle}>Ari</div>
                                                    <div className={utilStyles.cardText}>20 Listing</div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                                <Col xs={6} md={3} className={styles.colCardMobile}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <Card.Img variant="top" src="/images/thonglor.jpg" style={{ height: "70%" }} />
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Thonglor</div>
                                                <div className={utilStyles.cardText}>2150 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={6} md={3} className={styles.colCardMobile}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <Card.Img variant="top" src="/images/eakmai.jpg" style={{ height: "70%" }} />
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Ekamai</div>
                                                <div className={utilStyles.cardText}>7 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={6} md={3} className={styles.colCardMobile}>
                                    <Card style={{ height: "100%", border: "none" }}>
                                        <Card.Img variant="top" src="/images/rama4.jpg" style={{ height: "70%" }} />
                                        <Card.Body className={utilStyles.cardBody}>
                                            <Card.Text>
                                                <div className={utilStyles.cardTitle}>Rama 4</div>
                                                <div className={utilStyles.cardText}>13 Listing</div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                        <SearchLocationModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Layout>
                )
            }
        </>
    )
}

//Modal Add Menu
function SearchLocationModal(props) {
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
                <Modal.Title style={{ fontSize: "1.3rem" }}> Location Search</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Form.Group controlId="restaurantName">
                            <Form.Label>Restaurant Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter restaurant name"
                                value={restaurantName}
                                onChange={e => setRestaurantName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            >
                                <option></option>
                                <option>Ari</option>
                                <option>Thonglor</option>
                                <option>Ekamai</option>
                                <option>Rama 4</option>
                                <option>Prompong</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="restaurantType">
                            <Form.Label>Restaurant Type</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                value={restaurantType}
                                onChange={e => setRestaurantType(e.target.value)}
                            >
                                <option></option>
                                <option>Restaurant Type 1</option>
                                <option>Restaurant Type 2</option>
                                <option>Restaurant Type 3</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="foodType">
                            <Form.Label>Food Type/Cuisine</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                value={foodType}
                                onChange={e => setFoodType(e.target.value)}
                            >
                                <option></option>
                                <option>FoodType 1</option>
                                <option>FoodType 2</option>
                                <option>FoodType 3</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
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