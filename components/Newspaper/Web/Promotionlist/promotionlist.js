import utilStyles from '../../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Image } from 'react-bootstrap'
import React, { useEffect } from 'react'

export default function WebPromotionlist(props) {

    const [promotionsCardColumn1, setPromotionsCardColumn1] = React.useState()
    const [promotionsCardColumn2, setPromotionsCardColumn2] = React.useState()
    const [promotionsCardColumn3, setPromotionsCardColumn3] = React.useState()

    useEffect(() => {
        if (props.newspaper_list !== undefined) {
            console.log(props.newspaper_list)
            renderPromotionsCard(props.newspaper_list)
        }
    }, [props])


    const renderPromotionsCard = (newspaper_list) => {
        let column1Array = newspaper_list.filter((newspaperDetail, index) => index === 0 || index % 3 === 0)
        console.log(column1Array)
        let heightArray = ["16rem", "18rem", "20rem", "22rem", "24rem", "25rem"]
        let column1 = column1Array && column1Array.map((newspaperDetail) => (
            <div className={styles.colCard} >
                <div className={utilStyles.parent_zoom_bgImg}>
                    <div className={utilStyles.child_zoom_bgImg} style={{ backgroundImage: "url(" + newspaperDetail.image_url + ")", backgroundSize: "cover", backgroundPosition: "center", height: heightArray[Math.floor(Math.random() * heightArray.length)] }}>
                        <div className={styles.bannerText}>
                            {newspaperDetail.promote_content}
                        </div>
                    </div>
                </div>

                <div className={utilStyles.fontContent}>
                    <b>{newspaperDetail.restaurant.name}</b>
                </div>
                <div className={utilStyles.font_size_sm}>
                    {newspaperDetail.title}
                    {/* Opening : 8.00 am - 17.30 pm */}
                </div>
            </div>
        ))

        let column2Array = newspaper_list.filter((newspaperDetail, index) => index % 3 === 1)
        console.log(column2Array)

        let column2 = column2Array && column2Array.map((newspaperDetail) => (
            <div className={styles.colCard} >
                <div className={utilStyles.parent_zoom_bgImg}>
                    <div className={utilStyles.child_zoom_bgImg} style={{ backgroundImage: "url(" + newspaperDetail.image_url + ")", backgroundSize: "cover", backgroundPosition: "center", height: heightArray[Math.floor(Math.random() * heightArray.length)] }}>
                        <div className={styles.bannerText}>
                            {newspaperDetail.promote_content}
                        </div>
                    </div>
                </div>

                <div className={utilStyles.fontContent}>
                    <b>{newspaperDetail.restaurant.name}</b>
                </div>
                <div className={utilStyles.font_size_sm}>
                    {newspaperDetail.title}
                    {/* Opening : 8.00 am - 17.30 pm */}
                </div>
            </div>
        ))

        let column3Array = newspaper_list.filter((newspaperDetail, index) => index % 3 === 2)
        console.log(column3Array)

        let column3 = column3Array && column3Array.map((newspaperDetail) => (
            <div className={styles.colCard} >
                <div className={utilStyles.parent_zoom_bgImg}>
                    <div className={utilStyles.child_zoom_bgImg} style={{ backgroundImage: "url(" + newspaperDetail.image_url + ")", backgroundSize: "cover", backgroundPosition: "center", height: heightArray[Math.floor(Math.random() * heightArray.length)] }}>
                        <div className={styles.bannerText}>
                            {newspaperDetail.promote_content}
                        </div>
                    </div>
                </div>

                <div className={utilStyles.fontContent}>
                    <b>{newspaperDetail.restaurant.name}</b>
                </div>
                <div className={utilStyles.font_size_sm}>
                    {newspaperDetail.title}
                    {/* Opening : 8.00 am - 17.30 pm */}
                </div>
            </div>
        ))
        // return (
        //     <div className={styles.colCard} >
        //         <div className={utilStyles.img_hover_zoom} style={{ backgroundImage: "url(" + newspaperDetail.image_url + ")", backgroundSize: "cover", height: "25rem" }}>
        //             <div className={styles.bannerText}>
        //                 {newspaperDetail.promote_content}
        //             </div>
        //         </div>
        //         <div className={utilStyles.fontContent}>
        //             <b>{newspaperDetail.title}</b>
        //         </div>
        //         <div className={utilStyles.font_size_sm}>
        //             Opening : 8.00 am - 17.30 pm
        //     </div>
        //     </div>
        // )

        setPromotionsCardColumn1(column1)
        setPromotionsCardColumn2(column2)
        setPromotionsCardColumn3(column3)

    }

    return (
        <Row xs={12} md={3} >
            {/* <div dangerouslySetInnerHTML={{ __html: promotionsCardColumn1 }}></div>
            <div dangerouslySetInnerHTML={{ __html: promotionsCardColumn2 }}></div>
            <div dangerouslySetInnerHTML={{ __html: promotionsCardColumn3 }}></div> */}

            <Col style={{ padding: "0 1.2rem" }}>
                {promotionsCardColumn1}
            </Col>
            <Col style={{ padding: "0 1.2rem" }}>
                {promotionsCardColumn2}
            </Col>
            <Col style={{ padding: "0 1.2rem" }}>
                {promotionsCardColumn3}
            </Col>
            {/*<Col style={{ padding: "0 1.2rem" }}>
                <div className={styles.colCard} >
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
                </div>

                 <div className={styles.colCard}>
                    <div className={utilStyles.img_hover_zoom} style={{ backgroundImage: " url('/images/news2.jpg')", backgroundSize: "cover", height: "25rem" }}>
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
            </Col>*/}
        </Row >
    )
}