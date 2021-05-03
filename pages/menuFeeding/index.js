import useMediaQuery from "../../utils/utils";
import React from 'react'
import LocationListWeb from '../../components/MenuFeeding/Web/LocationList'
import LocationListMobile from '../../components/MenuFeeding/Mobile/LocationList'

export default function MenuFeeding() {
    const isMobileResolution = useMediaQuery(768)

    return (
        <>
            {
                isMobileResolution ? (
                    // Mobile Version
                    <LocationListMobile />
                ) : (
                    // PC Version
                    <LocationListWeb />
                )
            }
        </>
    )
}

