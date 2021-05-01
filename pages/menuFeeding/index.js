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
import { Select } from 'antd';
import MobileFilterRestaurant from '../../components/MenuFeeding/Mobile/Filter'
import ShowFiilterSelected from '../../components/ShowFiilterSelected'
import WebLocationList from '../../components/MenuFeeding/Web/LocationList'
import 'antd/dist/antd.css';

const { Option } = Select;

export default function MenuFeeding() {
    const isMobileResolution = useMediaQuery(768)
    const [modalShow, setModalShow] = React.useState(false);
    const searchFunc = () => {
        setModalShow(true)
    }

    return (
        <>
            {
                !isMobileResolution ? (
                    // PC Version
                    <WebLocationList

                    />
                ) : (
                    // Mobile Version
                    <Layout containerType="mobile" search searchFunc={searchFunc}>
                        <Container className={utilStyles.container_sm}>

                            <ShowFiilterSelected />

                            <Row style={{ marginBottom: "20px" }}>
                                <Col xs={12}>
                                    <span className={utilStyles.fontTitleMobile}>
                                        Area Selection
                                        </span>
                                </Col>
                            </Row>

                            {/* Results found */}
                            <Row style={{ padding: "0 10px 10px 10px" }} className={utilStyles.font_size_sm}>
                                <Col xs={5} style={{ margin: "auto" }}>
                                    <div>
                                        <b>130 Results found</b>
                                    </div>
                                </Col>
                                <Col xs={7}>
                                    <div style={{ textAlign: "right" }}>
                                        <b>sort by</b> &nbsp;
                                        <Select
                                            showSearch
                                            style={{ width: "25vw", textAlign: "left" }}
                                            placeholder="Search to Select"
                                            defaultValue="Lastet"
                                        >
                                            <Option value="-">-</Option>
                                            <Option value="Lastet">Lastet</Option>
                                            <Option value="Bangkok">Bangkok</Option>
                                            <Option value="Nonthaburi">Nonthaburi</Option>
                                        </Select>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} className={styles.colCardMobile}>
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
                                <Col xs={12} className={styles.colCardMobile}>
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
                                <Col xs={12} className={styles.colCardMobile}>
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
                                <Col xs={12} className={styles.colCardMobile}>
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
                                <Col xs={12} className={styles.colCardMobile}>
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
                                <Col xs={12} className={styles.colCardMobile}>
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
                                <Col xs={12} className={styles.colCardMobile}>
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
                                <Col xs={12} className={styles.colCardMobile}>
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
                        <MobileFilterRestaurant
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Layout >
                )
            }
        </>
    )
}

