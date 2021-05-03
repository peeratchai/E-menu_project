

export default function changeFormatFilter(filterForm) {
    let ObjectfilterForm = Object.keys(filterForm)
    let filterResponse = {}
    ObjectfilterForm.map((filter) => {
        switch (filter) {
            case 'price_to_price_from':
                let split = filterForm.price_to_price_from.split(" ")
                let price_from = split[0]
                console.log('price_from',price_from)
                let price_to = split[1]
                if (price_to === "0") {
                    filterResponse.price_from = null
                    filterResponse.price_to = null
                } else {
                    filterResponse.price_from = parseInt(price_from)
                    filterResponse.price_to = parseInt(price_to)
                }
                break;
            case 'distance':
                if (filterForm.distance === 0) {
                    filterResponse.distance = null
                } else {
                    filterResponse.distance = filterForm.distance
                }
                break;
            case 'is_open_now':
                if (filterForm.is_open_now === false) {
                    filterResponse.is_open_now = null
                } else {
                    filterResponse.is_open_now = filterForm.is_open_now
                }
                break;
            case 'have_parking':
                if (filterForm.have_parking === false) {
                    filterResponse.have_parking = null
                } else {
                    filterResponse.have_parking = filterForm.have_parking
                }
                break;
            case 'what':
                if (filterForm.what === '') {
                    filterResponse.what = null
                } else {
                    filterResponse.what = filterForm.what
                }
                break;
            case 'where':
                if (filterForm.where === '') {
                    filterResponse.where = null
                } else {
                    filterResponse.where = filterForm.where
                }
                break;
            case 'food_type':
                if (filterForm.food_type === '') {
                    filterResponse.food_type = null
                } else {
                    filterResponse.food_type = filterForm.food_type
                }
                break;
            case 'payment_option':
                if (filterForm.payment_option === '') {
                    filterResponse.payment_option = null
                } else {
                    filterResponse.payment_option = filterForm.payment_option
                }
                break;
            default: break;
        }
    })

    return filterResponse

}