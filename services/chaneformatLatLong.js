

export default function changeFormatLatLong(location) {
    try {
        let point, substringPotion, splitPotion, latLong, lat, lng
        point = location;
        substringPotion = point.substring(5)
        splitPotion = substringPotion.split('(').join('').split(')');
        latLong = splitPotion[0].split(' ')
        lat = latLong[0]
        lng = latLong[1]
        return { lat: lat, lng: lng }

    } catch (error) {
        return { lat: 0, lng: 0 }
    }


}