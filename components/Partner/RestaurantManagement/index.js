import useMediaQuery from "../../../utils/utils";
import React, { useEffect } from 'react'
import WebComponent from './Web'
import MobileComponent from "./Mobile";

import partnerSerivce from '../../../services/partner'

export default function RestaurantManagement(props) {
    const { restaurant_id, current_tab } = props
    const isMobileResolution = useMediaQuery(768)
    const [zone, setZone] = React.useState([])

    useEffect(() => {
        console.log('restaurant_id',restaurant_id)
        console.log('current_tab',current_tab)
        if (restaurant_id && current_tab === 'restaurantManagement') {
            getZone()
        }
    }, [props])

    const getZone = async () => {
        let zone = await partnerSerivce.getZoneByRestaurantId(restaurant_id)
        console.log('zone', zone)
        setZone(zone)
    }

    let RestaurantManagementComponent
    if (isMobileResolution) {
        RestaurantManagementComponent = (
            <MobileComponent
                zone={zone}
                get_zone={getZone}
                restaurant_id={restaurant_id}
            />
        )
    } else {
        RestaurantManagementComponent = (
            <WebComponent
                zone={zone}
                get_zone={getZone}
                restaurant_id={restaurant_id}
            />
        )
    }
    return RestaurantManagementComponent
}