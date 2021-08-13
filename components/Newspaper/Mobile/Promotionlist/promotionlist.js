import utilStyles from '../../../../styles/utils.module.css'
import styles from './index.module.css'
import { Row, Col } from 'react-bootstrap'
import React, { useEffect } from 'react'
import Link from 'next/link'
import EmptyComponent from '../../../Empty'
import InfiniteScroll from "react-infinite-scroll-component";

export default function MobilePromotionlist(props) {
    const { newspaper_list, total_page, current_page } = props
    const { on_search } = props
    const [promotionsCardColumn1, setPromotionsCardColumn1] = React.useState()
    const [promotionsCardColumn2, setPromotionsCardColumn2] = React.useState()

    useEffect(() => {
        if (newspaper_list !== undefined) {
            console.log(newspaper_list)
            renderPromotionsCard(newspaper_list)
        }
    }, [newspaper_list])

    const renderPromotionsCard = () => {
        let column1Array = newspaper_list.filter((newspaperDetail, index) => index === 0 || index % 2 === 0)
        let heightArray = ["8rem", "12rem", "14rem"]
        let column1 = column1Array && column1Array.map((newspaperDetail,index) => (
            <Link
                href={{
                    pathname: '/menuFeeding/restaurantList/' + newspaperDetail.restaurant.name,
                    query: { restaurantId: newspaperDetail.restaurant.id },
                }}
                key={'column1'+index}
            >
                <div className={styles.colCardMobile} >
                    <div className={utilStyles.parent_zoom_bgImg}>
                        <div className={utilStyles.child_zoom_bgImg} style={{ backgroundImage: "url(" + newspaperDetail.image_url + ")", backgroundSize: "cover", backgroundPosition: "center", height: heightArray[Math.floor(Math.random() * heightArray.length)] }}>
                            <div className={styles.bannerText}>
                                {newspaperDetail.title}
                            </div>
                        </div>
                    </div>

                    <div className={utilStyles.fontMobile + " " + utilStyles.overflowDot}>
                        <b>{newspaperDetail.restaurant.name}</b>
                    </div>
                    <div className={utilStyles.fontMobileSM + " " + utilStyles.overflowDot}>
                        {newspaperDetail.promote_content}
                    </div>
                    <div className={utilStyles.fontMobileSM + " " + utilStyles.overflowDot}>
                        {"฿ " + newspaperDetail.price_from + " - " + newspaperDetail.price_to}
                    </div>
                </div>
            </Link>

        ))

        let column2Array = newspaper_list.filter((newspaperDetail, index) => index === 1 || index % 2 !== 0)

        let column2 = column2Array && column2Array.map((newspaperDetail,index) => (
            <Link
                href={{
                    pathname: '/menuFeeding/restaurantList/' + newspaperDetail.restaurant.name,
                    query: { restaurantId: newspaperDetail.restaurant.id },
                }}
                key={'column2'+index}
            >
                <div className={styles.colCardMobile} >
                    <div className={utilStyles.parent_zoom_bgImg}>
                        <div className={utilStyles.child_zoom_bgImg} style={{ backgroundImage: "url(" + newspaperDetail.image_url + ")", backgroundSize: "cover", backgroundPosition: "center", height: heightArray[Math.floor(Math.random() * heightArray.length)] }}>
                            <div className={styles.bannerText}>
                                {newspaperDetail.title}
                            </div>
                        </div>
                    </div>

                    <div className={utilStyles.fontMobile + " " + utilStyles.overflowDot}>
                        <b>{newspaperDetail.restaurant.name}</b>
                    </div>
                    <div className={utilStyles.fontMobileSM + " " + utilStyles.overflowDot}>
                        {newspaperDetail.promote_content}
                    </div>
                    <div className={utilStyles.fontMobileSM + " " + utilStyles.overflowDot}>
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
                newspaper_list.length > 0 ? (
                    <InfiniteScroll
                        dataLength={newspaper_list.length}
                        next={on_search}
                        hasMore={total_page === current_page ? false : true}
                        loader={<h4>Loading...</h4>}
                    >
                        <Row xs={2}>
                            <Col style={{ padding: "0 7.5px" }}>
                                {promotionsCardColumn1}
                            </Col>
                            <Col style={{ padding: "0 7.5px" }}>
                                {promotionsCardColumn2}
                            </Col>
                        </Row>
                    </InfiniteScroll>
                ) : (
                    <EmptyComponent />
                )
            }
        </>
    )
}