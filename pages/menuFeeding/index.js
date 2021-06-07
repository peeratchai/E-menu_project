import useMediaQuery from "../../utils/utils";
import React, { useEffect } from 'react'
import LocationListWeb from '../../components/MenuFeeding/Web/LocationList'
import LocationListMobile from '../../components/MenuFeeding/Mobile/LocationList'
import 'antd/dist/antd.css';

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

export default function MenuFeeding() {
    const isMobileResolution = useMediaQuery(768)
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

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, options)
        } else {
            alert('Sorry Not available!');
        }
    }, [])


    return (
        <>
            {
                isMobileResolution ? (
                    // Mobile Version
                    <LocationListMobile
                        user_location={userLocation}
                    />
                ) : (
                    // PC Version
                    <LocationListWeb
                        user_location={userLocation}
                    />
                )
            }
        </>
    )
}

