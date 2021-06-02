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
import changeFormatFilter from '../../services/changeFormatFilter'

export default function Newspaper() {
    const isMobileResolution = useMediaQuery(768)
    const [modalShow, setModalShow] = React.useState(false);
    const [newspaperList, setNewspaperList] = React.useState();
    const [filter, setFilter] = React.useState({});

    const searchFunc = () => {
        setModalShow(true)
        console.log("test")
    }

    useEffect(async () => {
        let newspaperList = await getNewspaperlist()
        setNewspaperList(newspaperList)
    }, [])

    const getNewspaperlist = async () => {
        let response = await newspaperService.getNewspaperList();
        console.log('response', response)
        return response
    }

    const onSearch = async (filterForm) => {
        let filter = changeFormatFilter(filterForm)
        console.log('filter', filter)
        let locationListSearchByFilter = await newspaperService.getNewspaperListBySearch(accessToken, filter)
        setFilter(filterForm)
        console.log('locationListSearchByFilter', locationListSearchByFilter)
        setNewspaperList(locationListSearchByFilter)
    }

    let component
    if (isMobileResolution) {
        //Layout for mobile
        component = (
            <Layout containerType="mobile" search searchFunc={searchFunc}>
                <Container className={utilStyles.container_sm}>
                    <ShowFiilterSelected
                        filter={filter}
                    />
                    <MobilePromotionlist
                        newspaper_list={newspaperList}
                    />
                </Container>
                <MobileFilter
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onSearch={(form) => onSearch(form)}
                />
            </Layout>
        )

    } else {
        //Layout for web
        component = (
            <Layout>
                <WebFilter
                    onSearch={(form) => onSearch(form)}
                />
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