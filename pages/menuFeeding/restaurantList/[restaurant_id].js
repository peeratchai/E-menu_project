
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
import shoppingCartService from '../../../services/shoppingCart'

export default function Restaurant() {
    const isMobileResolution = useMediaQuery(768)
    const router = useRouter()
    const { locationId, locationName, restaurantId, tableId, tableName } = router.query;
    ////Set State
    const [restaurantDetail, setRestaurantDetail] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const { mutateUser } = checkUserPermission()
    const [shoppingCart, setShoppingCart] = React.useState({})
    const [isInitialCart, setIsInitialCart] = React.useState(false)

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
            console.log('restaurantDetail', restaurantDetail)
            shoppingCartService.getShoppingCart().then((response) => {
                console.log('shoppingCart response', response)
                if (response === 'Not Login') {
                    message.warning('Please login and scan qr code again.')
                } else {
                    let shoppingCart = response
                    if (response === "") {
                        setShoppingCart(shoppingCart)
                    } else {
                        let cartItems = []
                        shoppingCart.shopping_cart_items.forEach((cartItem) => {
                            cartItems.push({
                                "menu": cartItem.menu.id,
                                "quantity": cartItem.quantity,
                                "price": cartItem.price,
                                "total": cartItem.total,
                                "special_instruction": cartItem.special_instruction
                            })
                        })
                        let newShoppingCart = {
                            "restaurant": shoppingCart.restaurant.id,
                            "shopping_cart_items": cartItems
                        }

                        setShoppingCart(newShoppingCart)

                    }
                    setIsInitialCart(true)
                    console.log('shoppingCart', shoppingCart)
                    if (tableId !== undefined) {

                        saveTableOnScanQrCode().then((response) => {
                            console.log('response', response)
                            if (tableName) {
                                message.success(`You've checked in ${tableName} at ${restaurantDetail.name}. Let's start ordering!`, 4)
                            } else {
                                message.success(`You've checked at ${restaurantDetail.name}. Let's start ordering!`, 4)
                            }
                        }).catch(error => {
                            console.log('error', error)
                        })
                    }
                }
            }).catch(error => {
                console.log('error', error)
                message.warning('Please login before take order.')
            })
            await getAddressOnGoogleMaps(restaurantDetail)

        }).catch((error) => {
            setLoading(false)
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
                        shopping_cart={shoppingCart}
                        is_initial_cart={isInitialCart}
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
                        shopping_cart={shoppingCart}
                        is_initial_cart={isInitialCart}
                    />
                )
            }
        </>
    )
}