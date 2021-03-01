import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Button, Modal, Form } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import Link from 'next/link'
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react'



export default function Newspaper() {
    const isBreakpoint = useMediaQuery(768)

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <Layout>
            <Container>
                {
                    !isBreakpoint ? (
                        <Row style={{ marginBottom: "20px" }}>
                            <Col>
                                <span className={utilStyles.fontTitle}>
                                    Area Selection
                                </span>
                                &nbsp;&nbsp;
                                <span onClick={() => setModalShow(true)} style={{ cursor: "pointer", border: "1px solid #9c9c9c", borderRadius: "5px", backgroundColor: "#9c9c9c", padding: "0 10px", color: "white" }}><SearchIcon /> <span style={{ fontSize: "22px" }}>Search</span></span>
                            </Col>
                        </Row>

                    ) : (
                            <Row style={{ marginBottom: "20px" }}>

                                <Col xs={7}>
                                    <span className={utilStyles.fontTitle}>
                                        Area Selection
                                        </span>
                                </Col>
                                <Col xs={5} style={{ margin: "auto" }}>
                                    <span onClick={() => setModalShow(true)} style={{ cursor: "pointer", border: "1px solid #9c9c9c", borderRadius: "5px", backgroundColor: "#9c9c9c", padding: "0 10px", color: "white" }}><SearchIcon /> <span style={{ fontSize: "1rem" }}>Search</span></span>
                                </Col>
                            </Row>
                        )
                }

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
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Layout>
    )
}

//Modal Add Menu
function MyVerticallyCenteredModal(props) {
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