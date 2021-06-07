import utilStyles from '../../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col, Image } from 'react-bootstrap'
import React, { useEffect } from 'react'
import Link from 'next/link'
import EmptyComponent from '../../../Empty'

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
        let heightArray = ["16rem", "18rem", "20rem", "22rem", "24rem", "25rem"]
        let column1 = column1Array && column1Array.map((newspaperDetail) => {
            return (
                <Link
                    href={{
                        pathname: '/menuFeeding/restaurantList/' + newspaperDetail.restaurant.name,
                        query: { restaurantId: newspaperDetail.restaurant.id, locationLatLong: newspaperDetail.restaurant.location },
                    }}
                >
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
                        </div>
                        <div className={utilStyles.font_size_sm}>
                            {"฿ " + newspaperDetail.price_from + " - " + newspaperDetail.price_to}
                        </div>
                    </div>
                </Link>
            )
        })

        let column2Array = newspaper_list.filter((newspaperDetail, index) => index % 3 === 1)

        let column2 = column2Array && column2Array.map((newspaperDetail) => (
            <Link
                href={{
                    pathname: '/menuFeeding/restaurantList/' + newspaperDetail.restaurant.name,
                    query: { restaurantId: newspaperDetail.restaurant.id, locationLatLong: newspaperDetail.restaurant.location },
                }}
            >
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
                    </div>
                    <div className={utilStyles.font_size_sm}>
                        {"฿ " + newspaperDetail.price_from + " - " + newspaperDetail.price_to}
                    </div>
                </div>
            </Link>

        ))

        let column3Array = newspaper_list.filter((newspaperDetail, index) => index % 3 === 2)

        let column3 = column3Array && column3Array.map((newspaperDetail) => (
            <Link
                href={{
                    pathname: '/menuFeeding/restaurantList/' + newspaperDetail.restaurant.name,
                    query: { restaurantId: newspaperDetail.restaurant.id, locationLatLong: newspaperDetail.restaurant.location },
                }}
            >
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
                    </div>
                    <div className={utilStyles.font_size_sm}>
                        {"฿ " + newspaperDetail.price_from + " - " + newspaperDetail.price_to}
                    </div>
                </div>
            </Link>
        ))
        setPromotionsCardColumn1(column1)
        setPromotionsCardColumn2(column2)
        setPromotionsCardColumn3(column3)

    }

    return (
        <>
            {
                props.newspaper_list.length > 0 ? (
                    <Row xs={12} md={3} >
                        <Col style={{ padding: "0 1.2rem" }}>
                            {promotionsCardColumn1}
                        </Col>
                        <Col style={{ padding: "0 1.2rem" }}>
                            {promotionsCardColumn2}
                        </Col>
                        <Col style={{ padding: "0 1.2rem" }}>
                            {promotionsCardColumn3}
                        </Col>
                    </Row >

                ) : (
                    <div style={{ minHeight: "30vh" }}>
                        <EmptyComponent />
                    </div>
                )
            }
        </>

    )
}