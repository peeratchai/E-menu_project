import useMediaQuery from "../../../utils/utils";
import React, { useEffect } from 'react'
import WebComponent from './web'
import partnerSerivce from '../../../services/partner'

export default function RestaurantManagement({ restaurant_id, current_tab }) {
    const isMobileResolution = useMediaQuery(768)

    const [zone, setZone] = React.useState()
    const [table, setTable] = React.useState([])

    useEffect(() => {
        if (restaurant_id) {
            getZone()
        }
        if (current_tab === 'restaurantManagement') {
            getZone()
        }
    }, [restaurant_id, current_tab])

    const getZone = async () => {
        let awaitZone = partnerSerivce.getZoneByRestaurantId(restaurant_id)
        let zone = await awaitZone

        console.log('zone', zone)

        setZone(zone)
    }

    let RestaurantManagementComponent
    if (isMobileResolution) {
        RestaurantManagementComponent = (
            <WebComponent
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