import useMediaQuery from "../../../utils/utils";
import React, { useEffect } from 'react'
import WebComponent from './Web'
import MobileComponent from "./Mobile";

import partnerSerivce from '../../../services/partner'
import { message } from "antd";

export default function RestaurantManagement(props) {
    const { restaurant_id, current_tab, restaurant_name } = props
    const isMobileResolution = useMediaQuery(768)
    const [zone, setZone] = React.useState([])

    useEffect(() => {
        if (restaurant_id && current_tab === 'restaurantManagement') {
            getZone()
        }
    }, [props])

    const getZone = async () => {
        let zone = await partnerSerivce.getZoneByRestaurantId(restaurant_id)
        if (zone === 500) {
            message.error('Cannot access to database.')
        } else {
            setZone(zone)
        }
    }

    let RestaurantManagementComponent
    if (isMobileResolution) {
        RestaurantManagementComponent = (
            <MobileComponent
                zone={zone}
                get_zone={getZone}
                restaurant_id={restaurant_id}
                restaurant_name={restaurant_name}
            />
        )
    } else {
        RestaurantManagementComponent = (
            <WebComponent
                zone={zone}
                get_zone={getZone}
                restaurant_id={restaurant_id}
                restaurant_name={restaurant_name}
            />
        )
    }
    return RestaurantManagementComponent
}