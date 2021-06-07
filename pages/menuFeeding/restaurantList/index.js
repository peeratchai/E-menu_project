import { useRouter } from 'next/router'
import useMediaQuery from "../../../utils/utils";
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import restaurantService from '../../../services/restaurant'
import RestaurantListWeb from '../../../components/MenuFeeding/Web/RestaurantList'
import RestaurantListMobile from '../../../components/MenuFeeding/Mobile/RestaurantList'
import Geocode from "react-geocode";
import masterDataService from '../../../services/masterData'

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

export default function RestaurantList() {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { locationId, locationName } = router.query;
    const [restaurantList, setRestaurantList] = React.useState([]);
    const [loading, setLoading] = React.useState(false)
    const [masterDataList, setMasterDataList] = React.useState({
        foodTypeMasterData: [],
        distanceMasterData: [],
        peymentOptionsMasterData: []
    })
    const [userLocation, setUserLocation] = React.useState()


    function success(pos) {
        var crd = pos.coords;

        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        let userLocation = `POINT(${crd.latitude + " " + crd.longitude})`
        console.log('userLocation', userLocation)
        setUserLocation(userLocation)
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(async () => {
        if (!router.isReady) {
            // console.log('not ready')
        } else {
            if (locationId === undefined || locationName === undefined) {
                router.push({
                    pathname: "/menuFeeding"
                })
            } else {
                getRestaurant(locationId);
                getFilterMasterData()
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(success, error, options)
                } else {
                    alert('Sorry Not available!');
                }
            }
        }

    }, [router.isReady])

    const getRestaurant = (locationId) => {
        setLoading(true)
        restaurantService.getRestaurantSearchByLocation(locationId).then(async (restaurantList) => {
            setRestaurantList(restaurantList)
            setLoading(false)
            await getAddressOnGoogleMaps(restaurantList)
        }).catch(error => {
            console.log('getRestaurant error', error)
        })
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
    }

    const getAddressOnGoogleMaps = async (restaurantList) => {
        let point, substringPotion, splitPotion, latLong, lat, lng
        Promise.all(restaurantList.map(async (restaurantDetails) => {
            try {
                point = restaurantDetails.location;
                substringPotion = point.substring(5)
                splitPotion = substringPotion.split('(').join('').split(')');
                latLong = splitPotion[0].split(' ')
                lat = latLong[0]
                lng = latLong[1]
                console.log(lat, lng)
                let address = await Geocode.fromLatLng(lat, lng).then(
                    (response) => {
                        const address = response.results[0].formatted_address;
                        return address
                    }
                );
                restaurantDetails.googleMapsAddress = address
                setRestaurantList(restaurantList)
                return address
            } catch (error) {
                console.log('error', error)
            }
        }))
    }

    return (
        <>
            {
                !isMobileResolution ? (
                    //PC Version
                    <RestaurantListWeb
                        restaurant_list={restaurantList}
                        location_name={locationName}
                        location_id={locationId}
                        loading={loading}
                        master_data_list={masterDataList}
                        user_location={userLocation}
                    />
                ) : (
                    //Mobile Version
                    <RestaurantListMobile
                        restaurant_list={restaurantList}
                        location_name={locationName}
                        location_id={locationId}
                        loading={loading}
                        master_data_list={masterDataList}
                        user_location={userLocation}
                    />
                )
            }
        </>
    )
}