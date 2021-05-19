
import utilStyles from '../../../styles/utils.module.css'
import 'antd/dist/antd.css';
import { useRouter } from 'next/router'
import styles from './index.module.css'
import React, { useEffect, useRef } from 'react'
import useMediaQuery from "../../../utils/utils";
import RestaurantDetailMobile from '../../../components/MenuFeeding/Mobile/RestaurantDetail'
import RestaurantDetailWeb from '../../../components/MenuFeeding/Web/RestaurantDetail'
import restaurantService from '../../../services/restaurant'
import checkLogin from '../../../services/checkLogin'
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAqDX2CqFjdgUBY2QqPfUMlMDGS1gjttPw");
Geocode.setLanguage("th");
// Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();


export default function Restaurant({ props }) {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { locationId, locationName, restaurantId, locationLatLong } = router.query;
    ////Set State
    const [restaurantDetail, setRestaurantDetail] = React.useState()

    useEffect(async () => {
        if (!router.isReady) {
            // console.log('not ready')
        } else {

            console.log(restaurantId, locationLatLong)
            if (restaurantId === undefined || locationLatLong === undefined) {
                router.push({
                    pathname: "/menuFeeding"
                })
            } else {
                let restaurantDetail = await getRestaurantDetail(restaurantId)
                await getAddressOnGoogleMaps(restaurantDetail)
                // setRestaurantDetail(restaurantDetail)
            }
        }
    }, [router.isReady])


    const getAddressOnGoogleMaps = async (restaurantDetail) => {
        let point, substringPotion, splitPotion, latLong, lat, lng
        point = restaurantDetail.location;
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
        restaurantDetail.googleMapsAddress = address
        setRestaurantDetail(restaurantDetail)
        console.log('restaurantDetail', restaurantDetail)

    }

    const getRestaurantDetail = async (restaurantId) => {
        let response = await restaurantService.getRestaurantById(restaurantId)
        return response.data
    }

    return (
        <>
            {
                !isMobileResolution ? (
                    // PC Version
                    <RestaurantDetailWeb
                        restaurant_detail={restaurantDetail}
                        location_name={locationName}
                        location_id={locationId}
                        location_lat_long={locationLatLong}
                        restaurant_id={restaurantId}
                    />
                ) : (
                    // Mobile Version
                    <RestaurantDetailMobile
                        restaurant_detail={restaurantDetail}
                        location_name={locationName}
                        location_id={locationId}
                        location_lat_long={locationLatLong}
                        restaurant_id={restaurantId}
                    />
                )
            }
        </>
    )
}