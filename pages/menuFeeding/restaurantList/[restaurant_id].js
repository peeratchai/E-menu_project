
import 'antd/dist/antd.css';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Spin } from 'antd'
import useMediaQuery from "../../../utils/utils";
import RestaurantDetailMobile from '../../../components/MenuFeeding/Mobile/RestaurantDetail'
import RestaurantDetailWeb from '../../../components/MenuFeeding/Web/RestaurantDetail'
import restaurantService from '../../../services/restaurant'
import Geocode from "react-geocode";

export default function Restaurant() {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { locationId, locationName, restaurantId, tableId } = router.query;
    ////Set State
    const [restaurantDetail, setRestaurantDetail] = React.useState()
    const [loading, setLoading] = React.useState(false)
    useEffect(() => {
        if (router.isReady) {
            if (restaurantId === undefined) {
                router.push({
                    pathname: "/menuFeeding"
                })
            } else {
                setLoading(true)
                getRestaurantDetail(restaurantId).then(async (restaurantDetail) => {
                    await getAddressOnGoogleMaps(restaurantDetail)
                }).catch((error) => {
                    console.log('error', error)
                })
            }
        }
    }, [router.isReady])

    const getRestaurantDetail = async (restaurantId) => {
        let response = await restaurantService.getRestaurantById(restaurantId)
        return response.data
    }

    const getAddressOnGoogleMaps = async (restaurantDetail) => {
        let point, substringPotion, splitPotion, latLong, lat, lng
        point = restaurantDetail[0].location;
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
        setRestaurantDetail(restaurantDetail[0])
        setLoading(false)

    }

    return (
        <Spin spinning={loading} tip="Loading...">
            {
                !isMobileResolution ? (
                    // PC Version
                    <RestaurantDetailWeb
                        restaurant_detail={restaurantDetail}
                        location_name={locationName}
                        location_id={locationId}
                        restaurant_id={restaurantId}
                        table_id={tableId}
                    />
                ) : (
                    // Mobile Version
                    <RestaurantDetailMobile
                        restaurant_detail={restaurantDetail}
                        location_name={locationName}
                        location_id={locationId}
                        restaurant_id={restaurantId}
                        table_id={tableId}
                    />
                )
            }
        </Spin>
    )
}