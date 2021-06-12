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
import changeFormatFilter from '../../services/changeFormatFilter'
import { message, Spin } from 'antd';
import masterDataService from '../../services/masterData'

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

export default function Newspaper() {
    const isMobileResolution = useMediaQuery(768)
    const [modalShow, setModalShow] = React.useState(false);
    const [newspaperList, setNewspaperList] = React.useState([]);
    const [filter, setFilter] = React.useState({});
    const [loading, setLoading] = React.useState(false)
    const [userLocation, setUserLocation] = React.useState()
    const [masterDataList, setMasterDataList] = React.useState({
        foodTypeMasterData: [],
        distanceMasterData: [],
        peymentOptionsMasterData: []
    })

    const searchFunc = () => {
        setModalShow(true)
        console.log("test")
    }

    function success(pos) {
        var crd = pos.coords;
        let userLocation = `POINT(${crd.latitude + " " + crd.longitude})`
        console.log('userLocation', userLocation)
        setUserLocation(userLocation)
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(async () => {
        getInitialData()
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, options)
        } else {
            alert('Sorry Not available!');
        }
    }, [])

    const getInitialData = async () => {
        await getNewspaperlist()
        await getFilterMasterData()
    }

    const getNewspaperlist = async () => {
        setLoading(true)
        newspaperService.getNewspaperList().then((newspaperList) => {
            setNewspaperList(newspaperList)
            setLoading(false)
            console.log('newspaperList', newspaperList)
        }).catch(error => {
            setLoading(false)
            console.log('getNewspaperlist error', error)
            if (error.response.status === 403) {
                message.error('403 Forbidden Error')
            }
        })

    }

    const getFilterMasterData = async () => {
        try {

            let awaitFoodTypeMasterData = masterDataService.getFoodType()
            let awaitDistanceMasterData = masterDataService.getDistance()
            let awaitPeymentOptionsMasterData = masterDataService.getPaymentOptions()

            let foodTypeMasterData = await awaitFoodTypeMasterData
            let distanceMasterData = await awaitDistanceMasterData
            let peymentOptionsMasterData = await awaitPeymentOptionsMasterData

            let masterData = {
                foodTypeMasterData: foodTypeMasterData,
                distanceMasterData: distanceMasterData,
                peymentOptionsMasterData: peymentOptionsMasterData
            }
            setMasterDataList(masterData)
        } catch (error) {
            console.log('error', error)
        }


    }

    const onSearch = async (filterForm) => {
        console.log('filterForm', filterForm)
        let filter = changeFormatFilter(filterForm)
        console.log('filter', filter)
        if (filter.distance !== null) {
            let splitDistanceArray = filter.distance.split(" ")
            filter.distance = parseFloat(splitDistanceArray[0]) * 1000
            filter.current_location = userLocation
        } else {
            filter.current_location = null
        }
        console.log('filter', filter)
        setLoading(true)
        newspaperService.getNewspaperListBySearch(filter).then((promotions) => {
            setLoading(false)
            setFilter(filterForm)
            setNewspaperList(promotions)
        }).catch(error => {
            setLoading(false)
            console.log('onSearch', error)
        })
    }

    let component
    if (isMobileResolution) {
        //Layout for mobile
        component = (
            <Layout containerType="mobile" search searchFunc={searchFunc}>
                <Container className={utilStyles.container_sm}>
                    <Spin spinning={loading} tip="Loading...">
                        <ShowFiilterSelected
                            filter={filter}
                        />
                        <MobilePromotionlist
                            newspaper_list={newspaperList}
                        />
                    </Spin>
                </Container>
                <MobileFilter
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onSearch={(form) => onSearch(form)}
                    filter_master_data_list={masterDataList}
                    user_location={userLocation}
                />
            </Layout>
        )

    } else {
        //Layout for web
        component = (
            <Layout>
                <WebFilter
                    onSearch={(form) => onSearch(form)}
                    filter_master_data_list={masterDataList}
                    user_location={userLocation}
                />
                <Spin spinning={loading} tip="Loading...">
                    <div style={{ backgroundColor: "white" }}>
                        <div className={styles.container} >
                            <br />
                            <WebPromotionlist
                                newspaper_list={newspaperList}
                            />
                        </div>
                    </div>
                </Spin >
            </Layout >
        )
    }

    return component
}