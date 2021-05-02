

export default function changeFormatLatLong(location) {
    let point, substringPotion, splitPotion, latLong, lat, lng

    console.log('location',location)

    point = location;
    substringPotion = point.substring(5)
    splitPotion = substringPotion.split('(').join('').split(')');
    latLong = splitPotion[0].split(' ')
    lat = latLong[0]
    lng = latLong[1]

    return { lat: lat, lng: lng }
}