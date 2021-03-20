import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './index.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Card, Image, Button } from 'react-bootstrap'
import useMediaQuery from "../../utils/utils";
import menu from '../../utils/menu.json'
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

export default function Newspaper() {
    const isBreakpoint = useMediaQuery(768)

    let listMenu
    if (!isBreakpoint) {
        listMenu = menu && menu.map((menu, Index) => (
            <Row key={menu.title + Index} xs={12} md={4} xl={6}>
                <Col>
                    <Image src={menu.image} rounded />
                </Col>
                <Col>
                    <Image src={menu.image} rounded />
                </Col>
                <Col>
                    <Image src={menu.image} rounded />
                </Col>
                <Col>
                    <Image src={menu.image} rounded />
                </Col>
                <Col>
                    <Image src={menu.image} rounded />
                </Col>
                <Col>
                    <Image src={menu.image} rounded />
                </Col>
            </Row >));
    } else {
        //for Mobile
        listMenu = menu && menu.map((menu, Index) => (
            <Card key={menu.title + Index}>
                <Card.Img variant="top" src={menu.image} />
                <Card.Body className={styles.cardBodyMobile}>
                    <Card.Title className={utilStyles.fontTitleMobile}>{menu.title}</Card.Title>
                    <Card.Text className={utilStyles.fontMobile}>
                        {menu.detail}
                    </Card.Text>
                </Card.Body>
                <Card.Body className={styles.cardBodyMobile} style={{ borderTop: '1px solid rgb(223,223,223)' }}>
                    <StarIcon className={utilStyles.fontMobile} /><StarIcon className={utilStyles.fontMobile} /><StarIcon className={utilStyles.fontMobile} /><StarHalfIcon className={utilStyles.fontMobile} /><StarOutlineIcon className={utilStyles.fontMobile} />
                </Card.Body>
            </Card>
        ));
    }

    return (
        <>
            {
                !isBreakpoint ? (
                    //PC Version
                    <Layout util>
                        <div className={utilStyles.container_xl}>
                            {/* {listMenu} */}
                            <Row xs={12} md={4} xl={5}>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCard} >
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news1.jpg" style={{ height: "25rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news2.jpg" style={{ height: "15rem" }} />

                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Dinner in the Sky</b> - Over 45 countries worldwide
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 10.00 am - 20.00 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news9.jpg" style={{ height: "16rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Parallax Restaurant</b> - Mammoth Lakes, California
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 9.00 am - 19.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news2.jpg" style={{ height: "15rem" }} />

                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>El Diablo “The Devil”</b> - Las Palmas, Spain
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 9.00 am - 15.30 pm
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news3.jpg" style={{ height: "17rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Sur un Arbre Perché</b> - Paris, France
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news4.jpg" style={{ height: "25rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Signs</b> - Toronto, Canada
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 10.00 am - 22.00 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news7.jpg" style={{ height: "20rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Norma’s</b> - New York City, New York
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news8.jpg" style={{ height: "16rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Eternity</b> - Truskavets, Ukraine
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 9.00 am - 20.30 pm
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news5.jpg" style={{ height: "21rem" }} />

                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Parallax Restaurant</b> - Mammoth Lakes, California
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 9.00 am - 19.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news6.jpg" style={{ height: "19rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>El Diablo “The Devil”</b> - Las Palmas, Spain
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 9.00 am - 15.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news5.jpg" style={{ height: "19rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news6.jpg" style={{ height: "21rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news7.jpg" style={{ height: "20rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Norma’s</b> - New York City, New York
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news8.jpg" style={{ height: "16rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Eternity</b> - Truskavets, Ukraine
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 9.00 am - 20.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news3.jpg" style={{ height: "17rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news4.jpg" style={{ height: "25rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news9.jpg" style={{ height: "16rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>The Disaster Café</b> - Loloret de Mar, Spain
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news10.jpg" style={{ height: "19rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Devil Island Prison Restaurant </b> - Devil Island, China
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 10.00 am - 20.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news1.jpg" style={{ height: "25rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCard}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news2.jpg" style={{ height: "15rem" }} />
                                        </div>
                                        <div className={utilStyles.fontContent}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontContentSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                </Col>
                            </Row >
                        </div >
                    </Layout >
                ) : (
                    //Mobile Version
                    <Layout mobile>
                        <Container className={utilStyles.container_sm}>
                            {/* {listMenu} */}
                            <Row xs={2}>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCardMobile} >
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news1.jpg" style={{ height: "10rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news2.jpg" style={{ height: "9rem" }} />

                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Dinner in the Sky</b> - Over 45 countries worldwide
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 10.00 am - 20.00 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news3.jpg" style={{ height: "10rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>The Disaster Café</b> - Loloret de Mar, Spain
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news9.jpg" style={{ height: "12rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Parallax Restaurant</b> - Mammoth Lakes, California
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 9.00 am - 19.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news5.jpg" style={{ height: "13rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>El Diablo “The Devil”</b> - Las Palmas, Spain
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 9.00 am - 15.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news6.jpg" style={{ height: "10rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Eternity</b> - Truskavets, Ukraine
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 9.00 am - 20.30 pm
                                        </div>
                                    </div>
                                </Col>
                                <Col style={{ padding: "0 7.5px" }}>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news9.jpg" style={{ height: "12rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Parallax Restaurant</b> - Mammoth Lakes, California
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 9.00 am - 19.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news5.jpg" style={{ height: "13rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>El Diablo “The Devil”</b> - Las Palmas, Spain
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 9.00 am - 15.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news6.jpg" style={{ height: "10rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Eternity</b> - Truskavets, Ukraine
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 9.00 am - 20.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile} >
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news1.jpg" style={{ height: "10rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news2.jpg" style={{ height: "9rem" }} />

                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>Dinner in the Sky</b> - Over 45 countries worldwide
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 10.00 am - 20.00 pm
                                        </div>
                                    </div>
                                    <div className={styles.colCardMobile}>
                                        <div className={utilStyles.img_hover_zoom}>
                                            <Image src="/images/news3.jpg" style={{ height: "10rem" }} />
                                        </div>
                                        <div className={utilStyles.fontMobile}>
                                            <b>The Disaster Café</b> - Loloret de Mar, Spain
                                        </div>
                                        <div className={utilStyles.fontMobileSM}>
                                            Opening : 8.00 am - 17.30 pm
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Layout>
                )
            }
        </>
    )
}