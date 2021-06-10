
import 'antd/dist/antd.css';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { message, Spin } from 'antd'
import useMediaQuery from "../../../utils/utils";
import RestaurantDetailMobile from '../../../components/MenuFeeding/Mobile/RestaurantDetail'
import RestaurantDetailWeb from '../../../components/MenuFeeding/Web/RestaurantDetail'
import restaurantService from '../../../services/restaurant'
import Geocode from "react-geocode";
import checkUserPermission from '../../../lib/checkUserPermission'
import fetchJson from '../../../lib/fetchJson'
import partnerSerivce from '../../../services/partner'

export default function Restaurant() {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { locationId, locationName, restaurantId, tableId, tableName } = router.query;
    ////Set State
    const [restaurantDetail, setRestaurantDetail] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const { mutateUser } = checkUserPermission()

    useEffect(() => {
        if (router.isReady) {
            if (restaurantId === undefined) {
                router.push({
                    pathname: "/menuFeeding"
                })
            } else {
                setLoading(true)
                setInitialData()
            }
        }
    }, [router.isReady])

    const setInitialData = async () => {
        getRestaurantDetail(restaurantId).then(async (restaurantDetail) => {
            if (typeof window !== 'undefined') {
                if (tableId !== undefined) {
                    saveTableOnScanQrCode().then((response) => {
                        console.log('response', response)
                        if (tableName) {
                            message.success(`You've checked in ${tableName} at ${restaurantDetail.name}. Let's start ordering!`, 4)
                        } else {
                            message.success(`You've checked at ${restaurantDetail.name}. Let's start ordering!`, 4)
                        }
                        // let basket = window.localStorage.getItem('basket');
                        // try {
                        //     basket = JSON.parse(basket)
                        //     console.log('basket', basket)
                        //     if (basket) {
                        //         try {
                        //             let order = basket.order
                        //             console.log('order', order)
                        //             if (order.length > 0) {
                        //                 router.push({
                        //                     pathname: "/checkout"
                        //                 })
                        //             }
                        //         } catch (error) {
                        //             console.log('error', error)
                        //         }
                        //     }
                        // } catch (error) {
                        //     console.log('error', error)
                        // }
                        // console.log('saveTableOnScanQrCode')
                    }).catch(error => {
                        console.log('error', error)
                    })
                }
            }
            await getAddressOnGoogleMaps(restaurantDetail)
        }).catch((error) => {
            console.log('error', error)
        })
    }

    const saveTableOnScanQrCode = async () => {
        await mutateUser(
            fetchJson('/api/saveTable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tableId: tableId }),
            })
        )
    }

    const getRestaurantDetail = async (restaurantId) => {
        let response = await restaurantService.getRestaurantById(restaurantId)
        return response.data
    }

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
        setLoading(false)

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
                        restaurant_id={restaurantId}
                        table_id={tableId}
                        loading={loading}
                    />
                ) : (
                    // Mobile Version
                    <RestaurantDetailMobile
                        restaurant_detail={restaurantDetail}
                        location_name={locationName}
                        location_id={locationId}
                        restaurant_id={restaurantId}
                        table_id={tableId}
                        loading={loading}
                    />
                )
            }
        </>
    )
}