import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import useMediaQuery from "../../utils/utils";
import MobilePromotionlist from '../../components/Newspaper/Mobile/Promotionlist/promotionlist'
import WebFilter from '../../components/Newspaper/Web/Filter/filter'
import WebPromotionlist from '../../components/Newspaper/Web/Promotionlist/promotionlist'
import MobileFilter from '../../components/Newspaper/Mobile/Filter'
import ShowFiilterSelected from '../../components/ShowFiilterSelected'
import styles from './index.module.css'
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import newspaperService from '../../services/newspaper'
import checklogin from '../../services/checkLogin'

export default function Newspaper() {
    const isMobileResolution = useMediaQuery(768)
    const [modalShow, setModalShow] = React.useState(false);
    const [newspaperList, setNewspaperList] = React.useState();

    const searchFunc = () => {
        setModalShow(true)
        console.log("test")
    }

    useEffect(async () => {
        let accessToken = await checklogin()
        let newspaperList = await getNewspaperlist(accessToken)
        setNewspaperList(newspaperList)
    }, [])

    const getNewspaperlist = async (accessToken) => {
        let response = await newspaperService.getNewspaperList(accessToken);
        console.log('response', response)
        return response.data
    }

    let component
    if (isMobileResolution) {
        //Layout for mobile
        component = (
            <Layout containerType="mobile" search searchFunc={searchFunc}>
                <Container className={utilStyles.container_sm}>
                    <ShowFiilterSelected />
                    <MobilePromotionlist />
                </Container>
                <MobileFilter
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
                        <WebPromotionlist
                            newspaper_list={newspaperList}
                        />
                    </div>
                </div>
            </Layout >
        )
    }

    return component
}