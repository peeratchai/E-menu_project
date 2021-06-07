import utilStyles from '../../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col } from 'react-bootstrap'
import React, { useEffect } from 'react'
import Link from 'next/link'
import EmptyComponent from '../../../Empty'

export default function MobilePromotionlist(props) {
    const [promotionsCardColumn1, setPromotionsCardColumn1] = React.useState()
    const [promotionsCardColumn2, setPromotionsCardColumn2] = React.useState()

    useEffect(() => {
        if (props.newspaper_list !== undefined) {
            console.log(props.newspaper_list)
            renderPromotionsCard(props.newspaper_list)
        }
    }, [props])

    const renderPromotionsCard = (newspaper_list) => {
        let column1Array = newspaper_list.filter((newspaperDetail, index) => index === 0 || index % 2 === 0)
        let heightArray = ["8rem", "12rem", "14rem"]
        let column1 = column1Array && column1Array.map((newspaperDetail) => (
            <Link
                href={{
                    pathname: '/menuFeeding/restaurantList/' + newspaperDetail.restaurant.name,
                    query: { restaurantId: newspaperDetail.restaurant.id, locationLatLong: newspaperDetail.restaurant.location },
                }}
            >
                <div className={styles.colCardMobile} >
                    <div className={utilStyles.parent_zoom_bgImg}>
                        <div className={utilStyles.child_zoom_bgImg} style={{ backgroundImage: "url(" + newspaperDetail.image_url + ")", backgroundSize: "cover", backgroundPosition: "center", height: heightArray[Math.floor(Math.random() * heightArray.length)] }}>
                            <div className={styles.bannerText}>
                                {newspaperDetail.promote_content}
                            </div>
                        </div>
                    </div>

                    <div className={utilStyles.fontMobile}>
                        <b>{newspaperDetail.restaurant.name}</b>
                    </div>
                    <div className={utilStyles.fontMobileSM}>
                        {newspaperDetail.title}
                    </div>
                    <div className={utilStyles.fontMobileSM}>
                        {"฿ " + newspaperDetail.price_from + " - " + newspaperDetail.price_to}
                    </div>
                </div>
            </Link>

        ))

        let column2Array = newspaper_list.filter((newspaperDetail, index) => index === 1 || index % 2 !== 0)

        let column2 = column2Array && column2Array.map((newspaperDetail) => (
            <Link
                href={{
                    pathname: '/menuFeeding/restaurantList/' + newspaperDetail.restaurant.name,
                    query: { restaurantId: newspaperDetail.restaurant.id, locationLatLong: newspaperDetail.restaurant.location },
                }}
            >
                <div className={styles.colCardMobile} >
                    <div className={utilStyles.parent_zoom_bgImg}>
                        <div className={utilStyles.child_zoom_bgImg} style={{ backgroundImage: "url(" + newspaperDetail.image_url + ")", backgroundSize: "cover", backgroundPosition: "center", height: heightArray[Math.floor(Math.random() * heightArray.length)] }}>
                            <div className={styles.bannerText}>
                                {newspaperDetail.promote_content}
                            </div>
                        </div>
                    </div>

                    <div className={utilStyles.fontMobile}>
                        <b>{newspaperDetail.restaurant.name}</b>
                    </div>
                    <div className={utilStyles.fontMobileSM}>
                        {newspaperDetail.title}
                    </div>
                    <div className={utilStyles.fontMobileSM}>
                        {"฿ " + newspaperDetail.price_from + " - " + newspaperDetail.price_to}
                    </div>
                </div>
            </Link>

        ))

        setPromotionsCardColumn1(column1)
        setPromotionsCardColumn2(column2)

    }

    return (
        <>
            {
                props.newspaper_list.length > 0 ? (
                    <Row xs={2}>
                        <Col style={{ padding: "0 7.5px" }}>
                            {promotionsCardColumn1}
                        </Col>
                        <Col style={{ padding: "0 7.5px" }}>
                            {promotionsCardColumn2}
                        </Col>
                    </Row>
                ) : (
                    <EmptyComponent />
                )
            }
        </>
    )
}