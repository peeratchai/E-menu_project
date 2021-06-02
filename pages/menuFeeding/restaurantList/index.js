import { useRouter } from 'next/router'
import useMediaQuery from "../../../utils/utils";
import { Select } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import restaurantService from '../../../services/restaurant'
import checkLogin from '../../../services/checkLogin'
import RestaurantListWeb from '../../../components/MenuFeeding/Web/RestaurantList'
import RestaurantListMobile from '../../../components/MenuFeeding/Mobile/RestaurantList'
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAqDX2CqFjdgUBY2QqPfUMlMDGS1gjttPw");
Geocode.setLanguage("th");
// Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

export default function RestaurantList() {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { locationId, locationName } = router.query;
    const [restaurantList, setRestaurantList] = React.useState([]);

    useEffect(async () => {
        if (!router.isReady) {
            // console.log('not ready')
        } else {
            if (locationId === undefined || locationName === undefined) {
                router.push({
                    pathname: "/menuFeeding"
                })
            } else {
                console.log('restaurantList')
                let accessToken = await checkLogin()
                let restaurantList = await getRestaurant(accessToken, locationId);
                await getAddressOnGoogleMaps(restaurantList)
            }
        }
    }, [router.isReady])

    const getAddressOnGoogleMaps = async (restaurantList) => {
        let point, substringPotion, splitPotion, latLong, lat, lng
        Promise.all(restaurantList.map(async (restaurantDetails) => {
            point = restaurantDetails.location;
            substringPotion = point.substring(5)
            splitPotion = substringPotion.split('(').join('').split(')');
            latLong = splitPotion[0].split(' ')
            lat = latLong[0]
            lng = latLong[1]
            let address = await Geocode.fromLatLng(lat, lng).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    return address
                },
                (error) => {
                    console.error(error);
                }
            );
            restaurantDetails.googleMapsAddress = address
            console.log(address)
            return address
        })).then(() => {
            console.log(restaurantList)
            setRestaurantList(restaurantList)
        })

    }

    const getRestaurant = async (accessToken, locationId) => {
        let response = await restaurantService.getRestaurantSearchByLocation(accessToken, locationId);
        return response.data
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
                    />
                ) : (
                    //Mobile Version
                    <RestaurantListMobile
                        restaurant_list={restaurantList}
                        location_name={locationName}
                        location_id={locationId}
                    />
                )
            }
        </>
    )
}