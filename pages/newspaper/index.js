import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import useMediaQuery from "../../utils/utils";
import { Select, Checkbox } from 'antd';
import React, { useEffect } from 'react'
import WebFilter from '../../components/Newspaper/Web/Filter/filter'
import WebPromotionlist from '../../components/Newspaper/Web/Promotionlist/promotionlist'
import MobilePromotionlist from '../../components/Newspaper/Mobile/Promotionlist/promotionlist'
import MobileFilterRestaurants from '../../components/MobileFilterRestaurants/index'
import styles from './index.module.css'
import 'antd/dist/antd.css';

export default function Newspaper() {
    const isBreakpoint = useMediaQuery(768)
    const [modalShow, setModalShow] = React.useState(false);

    const searchFunc = () => {
        setModalShow(true)
        console.log("test")
    }

    let component

    if (isBreakpoint) {
        //Layout for mobile
        component = (
            <Layout containerType="mobile" search searchFunc={searchFunc}>
                <Container className={utilStyles.container_sm}>
                    <MobilePromotionlist />
                </Container>
                <MobileFilterRestaurants
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Layout>
        )

    } else {
        //Layout for web
        component = (
            <Layout>
                <WebFilter />
                <div style={{ backgroundColor: "white" }}>
                    <div className={styles.container} >
                        <br />
                        <WebPromotionlist />
                    </div>
                </div>
            </Layout >
        )
    }

    return component
}