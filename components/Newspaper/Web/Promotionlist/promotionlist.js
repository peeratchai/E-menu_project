import utilStyles from '../../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Image } from 'react-bootstrap'
import React, { useEffect } from 'react'

export default function WebPromotionlist(props) {

    const [promotionsCard, setPromotionsCard] = React.useState()

    useEffect(() => {
        if (props.newspaper_list !== undefined) {
            console.log(props.newspaper_list)
            renderPromotionsCard(props.newspaper_list)
        }
    }, [props])


    const renderPromotionsCard = (newspaper_list) => {
        let column1 = "", column2, column3
        let promotionsCard = newspaper_list.map((newspaperDetail, index) => {
            console.log(newspaperDetail.image_url)
            if (index === 0) {
                column1 += ('<div class=' + styles.colCard + '><div class=' + utilStyles.img_hover_zoom + ' style=background-image:url(' + '"' + newspaperDetail.image_url + '"' + ');background-size:cover;background-position:center;height:25rem;><div class=' + styles.bannerText + '>Sale up to 60 %</div></div><div class=' + utilStyles.fontContent + '><b>Ithaa</b> - Rangali Island, Maldives</div><div class=' + utilStyles.font_size_sm + '>Opening : 8.00 am - 17.30 pm</div></div > ')
            }
        })

        setPromotionsCard(column1)
    }

    return (
        <Row xs={12} md={3} >
            <Col style={{ padding: "0 1.2rem" }}>
                {/* <div className={styles.colCard} >
                    <div className={utilStyles.img_hover_zoom} style={{ backgroundImage: " url('/images/news1.jpg')", backgroundSize: "cover", height: "25rem" }}>
                        <div className={styles.bannerText}>
                            Sale up to 60%
                        </div>
                    </div>
                    <div className={utilStyles.fontContent}>
                        <b>Ithaa</b> - Rangali Island, Maldives
                                        </div>
                    <div className={utilStyles.font_size_sm}>
                        Opening : 8.00 am - 17.30 pm
                    </div>
                </div> */}

                <div dangerouslySetInnerHTML={{ __html: promotionsCard }}></div>
                <div className={styles.colCard}>
                    <div className={utilStyles.img_hover_zoom} style={{ backgroundImage: " url('/images/news2.jpg')", backgroundSize: "cover", height: "25rem" }}>
                        {/* <Image src="/images/news1.jpg" style={{}} /> */}
                        <div className={styles.bannerText}>
                            Sale up to 60%
                        </div>
                    </div>
                    <div className={utilStyles.fontContent}>
                        <b>Dinner in the Sky</b> - Over 45 countries worldwide
                                        </div>
                    <div className={utilStyles.font_size_sm}>
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
                    <div className={utilStyles.font_size_sm}>
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
                    <div className={utilStyles.font_size_sm}>
                        Opening : 9.00 am - 15.30 pm
                                        </div>
                </div>
            </Col>
            <Col style={{ padding: "0 1.2rem" }}>
                <div className={styles.colCard}>
                    <div className={utilStyles.img_hover_zoom}>
                        <Image src="/images/news3.jpg" style={{ height: "17rem" }} />
                    </div>
                    <div className={utilStyles.fontContent}>
                        <b>Sur un Arbre Perché</b> - Paris, France
                                        </div>
                    <div className={utilStyles.font_size_sm}>
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
                    <div className={utilStyles.font_size_sm}>
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
                    <div className={utilStyles.font_size_sm}>
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
                    <div className={utilStyles.font_size_sm}>
                        Opening : 9.00 am - 20.30 pm
                                        </div>
                </div>
            </Col>
            <Col style={{ padding: "0 1.2rem" }}>
                <div className={styles.colCard}>
                    <div className={utilStyles.img_hover_zoom}>
                        <Image src="/images/news5.jpg" style={{ height: "21rem" }} />

                    </div>
                    <div className={utilStyles.fontContent}>
                        <b>Parallax Restaurant</b> - Mammoth Lakes, California
                                        </div>
                    <div className={utilStyles.font_size_sm}>
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
                    <div className={utilStyles.font_size_sm}>
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
                    <div className={utilStyles.font_size_sm}>
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
                    <div className={utilStyles.font_size_sm}>
                        Opening : 8.00 am - 17.30 pm
                                        </div>
                </div>
            </Col>
        </Row >
    )
}