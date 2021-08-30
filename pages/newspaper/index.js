import MobileLayout from '../../components/MobileLayout'
import Layout from '../../components/Layout'
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
import { Button } from 'react-bootstrap'

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

export default function Newspaper() {
    const isMobileResolution = useMediaQuery(768)
    const [modalShow, setModalShow] = React.useState(false);
    const [newspaperList, setNewspaperList] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1)
    const [nextPage, setNextPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState(0)
    // limit is number of reataurant list each page 
    const limit = 10
    const [filter, setFilter] = React.useState({
        what: null,
        where: null,
        food_type: null,
        payment_option: null,
        distance: 0,
        price_to_price_from: '0 0',
        is_open_now: false,
        have_parking: false,
        sort_by: null
    });
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
        await onSearch(filter, true)
        await getFilterMasterData()
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

    const onSearch = async (filterForm = filter, isLoadMore = false) => {
        setLoading(true)
        console.log('filterForm', filterForm)
        let filter = changeFormatFilter(filterForm)
        if (filter.distance !== null) {
            let splitDistanceArray = filter.distance.split(" ")
            filter.distance = parseFloat(splitDistanceArray[0]) * 1000
            filter.current_location = userLocation
        } else {
            filter.current_location = null
        }
        console.log('filter', filter)

        let page = nextPage
        if (isLoadMore === false) {
            page = 1
            setNextPage(2)
        }

        newspaperService.getNewspaperListBySearchWithPaging(page, limit, filter).then((response) => {
            let next_page = response.next_page
            let current_page = response.current_page
            let totalPage = response.total_page
            const results = response.results
            let newNewspaperList = []
            if (results.length > 0) {
                if (isLoadMore) {
                    newNewspaperList = [...newspaperList, ...results]
                } else {
                    newNewspaperList = [...results]
                }
                console.log(newNewspaperList)

                setCurrentPage(current_page)
                if (next_page !== null && isLoadMore) {
                    setNextPage(next_page)
                }
                setTotalPage(totalPage)
            } else {
                setNextPage(1)
            }

            setLoading(false)
            setFilter(filterForm)
            setNewspaperList(newNewspaperList)
        }).catch(error => {
            setLoading(false)
            console.log('onSearch', error)
        })
    }

    let component
    if (isMobileResolution) {
        //Layout for mobile
        component = (
            <MobileLayout containerType="mobile" filterFunc={searchFunc}>
                <Container className={utilStyles.container_sm}>
                    <Spin spinning={loading} tip="Loading...">
                        <ShowFiilterSelected
                            filter={filter}
                        />
                        <MobilePromotionlist
                            newspaper_list={newspaperList}
                            on_search={() => onSearch(filter, true)}
                            total_page={totalPage}
                            current_page={currentPage}
                        />
                    </Spin>
                </Container>
                <MobileFilter
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    on_search={(form) => onSearch(form)}
                    filter_master_data_list={masterDataList}
                    user_location={userLocation}
                />
            </MobileLayout>
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
                                on_search={() => onSearch(filter, true)}
                                total_page={totalPage}
                                current_page={currentPage}
                            />
                        </div>
                    </div>
                </Spin>
            </Layout>
        )
    }

    return component
}