import utilStyles from '../../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Image } from 'react-bootstrap'
import React from 'react'

export default function MobilePromotionlist() {
    return (
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
    )
}