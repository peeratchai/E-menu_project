import { useRouter } from 'next/router'
import useMediaQuery from "../../../utils/utils";
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import RestaurantListWeb from '../../../components/MenuFeeding/Web/RestaurantList'
import RestaurantListMobile from '../../../components/MenuFeeding/Mobile/RestaurantList'
import masterDataService from '../../../services/masterData'
import restaurantService from '../../../services/restaurant'
import changeFormatFilter from '../../../services/changeFormatFilter'

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

export default function RestaurantList({ masterData }) {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { locationId, locationName, currentFilterForm } = router.query;
    const [loading, setLoading] = React.useState(false)
    const [masterDataList, setMasterDataList] = React.useState({
        foodTypeMasterData: [],
        distanceMasterData: [],
        peymentOptionsMasterData: []
    })
    const [userLocation, setUserLocation] = React.useState()
    const [currentPage, setCurrentPage] = React.useState(1)
    const [nextPage, setNextPage] = React.useState(1)
    const [totalPage, setTotalPage] = React.useState(0)
    const [totalResult, setTotalResult] = React.useState(0);
    const [sortValue, setSortValue] = React.useState()
    const [restaurantList, setRestaurantList] = React.useState([]);
    const [locationInMaps, setLocationInMaps] = React.useState([]);
    const limit = 10
    const defaultFilter = {
        what: null,
        where: null,
        food_type: null,
        payment_option: null,
        distance: 0,
        price_to_price_from: '0 0',
        is_open_now: false,
        have_parking: false,
        sort_by: null,
    }
    const [currentFilter, setCurrentFilter] = React.useState(defaultFilter)

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
        console.log('masterData', masterData)
        if (!router.isReady) {
            // console.log('not ready')
        } else {
            if (locationId === undefined || locationName === undefined) {
                router.push({
                    pathname: "/menuFeeding"
                })
            } else {
                setLoading(true)
                getFilterMasterData()
                if (currentFilterForm) {
                    onSearch(JSON.parse(currentFilterForm), true)
                } else {
                    onSearch(defaultFilter, true)
                }

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(success, error, options)
                } else {
                    alert('Sorry Not available!');
                }
            }
        }

    }, [router.isReady])

    const onSearch = async (filterForm = defaultFilter, isLoadMore = false) => {
        setCurrentFilter(filterForm)
        setLoading(true)
        let filter = { ...filterForm }
        filter = changeFormatFilter(filter)
        console.log('filter', filter)
        if (filter.distance && filter.distance !== null) {
            let splitDistanceArray = filter.distance.split(" ")
            filter.distance = parseFloat(splitDistanceArray[0]) * 1000
            filter.current_location = user_location
        } else {
            filter.current_location = null
        }
        filter.business_district = locationId
        console.log('filter', filter)
        console.log('nextPage', nextPage)
        console.log('isLoadMore', isLoadMore)
        let page = nextPage
        if (isLoadMore === false) {
            page = 1
            setNextPage(2)
        }

        restaurantService.getRestaurantSearchWithPaging(page, limit, filter).then((response) => {
            console.log('response', response)
            let next_page = response.next_page
            let current_page = response.current_page
            let totalPage = response.total_page
            const results = response.results
            let newRestaurantList = []
            if (results.length > 0) {
                if (isLoadMore) {
                    newRestaurantList = [...restaurantList, ...results]
                } else {
                    newRestaurantList = [...results]
                }
                console.log(sortValue)
                if (sortValue) {
                    onSort(sortValue, newRestaurantList)
                } else {
                    setRestaurantList(newRestaurantList)
                }
                setCurrentPage(current_page)
                if (next_page !== null && isLoadMore) {
                    setNextPage(next_page)
                }
                setTotalPage(totalPage)
                setTotalResult(newRestaurantList.length)
            } else {
                setRestaurantList(newRestaurantList)
                setTotalResult(0)
                setNextPage(1)
            }
            setMaps(newRestaurantList)
            setLoading(false)
        }).catch(error => {
            console.log('error', error)
        })

    }

    const setMaps = (restaurant_list) => {
        let LocationInMaps = []
        let point, substringPotion, splitPotion, latLong, lat, lng

        restaurant_list.map((restaurantDetails) => {
            try {
                point = restaurantDetails.location;
                substringPotion = point.substring(5)
                splitPotion = substringPotion.split('(').join('').split(')');
                latLong = splitPotion[0].split(' ')
                lat = latLong[0]
                lng = latLong[1]
                LocationInMaps.push({ lat: lat, lng: lng, name: restaurantDetails.name })
            } catch (error) {
                console.log('')
            }

        })

        setLocationInMaps(LocationInMaps)
    }

    const onSort = (sortValue, newRestaurantList = restaurantList) => {
        setSortValue(sortValue)
        if (sortValue === 'A-Z') {
            const sortResult = [].concat(newRestaurantList)
                .sort((a, b) => a.name > b.name ? 1 : -1)
            setRestaurantList(sortResult)
        }
        if (sortValue === 'Z-A') {
            const sortResult = [].concat(newRestaurantList)
                .sort((a, b) => a.name < b.name ? 1 : -1)
            setRestaurantList(sortResult)
        }
    }

    const getFilterMasterData = async () => {
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
        setLoading(false)
    }

    return (
        <>
            {
                !isMobileResolution ? (
                    //PC Version
                    <RestaurantListWeb
                        location_name={locationName}
                        location_id={locationId}
                        loading={loading}
                        master_data_list={masterDataList}
                        user_location={userLocation}
                        restaurant_list={restaurantList}
                        on_search={() => onSearch(currentFilter, true)}
                        filter_search={(form) => onSearch(form)}
                        total_page={totalPage}
                        current_page={currentPage}
                        current_filter_form={currentFilter}
                        location_in_maps={locationInMaps}
                        total_result={totalResult}
                        on_sort={onSort}
                    />
                ) : (
                    //Mobile Version
                    <RestaurantListMobile
                        location_name={locationName}
                        location_id={locationId}
                        loading={loading}
                        master_data_list={masterDataList}
                        user_location={userLocation}
                        restaurant_list={restaurantList}
                        on_search={() => onSearch(currentFilter, true)}
                        filter_search={(form) => onSearch(form)}
                        total_page={totalPage}
                        current_page={currentPage}
                        current_filter_form={currentFilter}
                        location_in_maps={locationInMaps}
                        total_result={totalResult}
                        on_sort={onSort}
                    />
                )
            }
        </>
    )
}
