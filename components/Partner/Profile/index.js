
import WebProfileComponent from './Web'
import MobileProfileComponent from './Mobile'
import useMediaQuery from "../../../utils/utils";
import React, { useEffect } from 'react'
import restaurantService from '../../../services/restaurant'
import uploadService from '../../../services/upload'
import { message } from 'antd';
export default function Profile({ restaurant_id }) {

    const isMobileResolution = useMediaQuery(768)
    const [restaurantDetails, setRestaurantDetails] = React.useState();
    const [restaurantBannerFileList, setRestaurantBannerFileList] = React.useState([]);
    const [formErrors, setFormErrors] = React.useState({});
    const [restaurantForm, setRestaurantForm] = React.useState({
        business_hour: [],
        facebook: '',
        description: '',
        have_parking: null,
        image_url: '',
        instragram: '',
        location: '',
        name: '',
        name_eng: '',
        description_eng: '',
        food_type: '',
        Line: '',
        is_active: '',
        image: null,
        banner: [],
        payment_option: [],
        phone: '',
        price_from: '',
        price_to: '',
        restaurant_pictures: [],
        website: ''
    })
    const [loading, setLoading] = React.useState(false)
    useEffect(() => {
        if (restaurant_id !== undefined) {
            getRestaurantDetails()
        }
    }, [restaurant_id])

    const getRestaurantDetails = async () => {
        setLoading(true)
        try {
            let responseRestaurantDetail = await restaurantService.getRestaurantById(restaurant_id)
            let restaurantDetail = responseRestaurantDetail.data
            let restaurantForm = {
                business_hour: restaurantDetail.business_hour,
                facebook: restaurantDetail.facebook,
                description: restaurantDetail.description,
                description_eng: restaurantDetail.description_eng,
                have_parking: restaurantDetail.have_parking,
                image_url: restaurantDetail.image_url,
                instragram: restaurantDetail.instragram,
                location: restaurantDetail.location,
                name: restaurantDetail.name,
                Line: restaurantDetail.line,
                name_eng: restaurantDetail.name_eng,
                payment_option: restaurantDetail.payment_option,
                phone: restaurantDetail.phone,
                price_from: restaurantDetail.price_from,
                price_to: restaurantDetail.price_to,
                restaurant_pictures: restaurantDetail.restaurant_pictures,
                website: restaurantDetail.website,
                restaurant_id: restaurant_id
            }
            setLoading(false)
            setRestaurantForm(restaurantForm)
        } catch (error) {
            message.error('Cannot connect to server.')
        }

    }

    const updateRestaurantDetails = async (restaurantForm) => {
        // console.log(restaurantForm)
        const { restaurantLogo, bannerImage, business_hour } = restaurantForm
        let dataForm = { ...restaurantForm }
        if (restaurantLogo === undefined) {
            dataForm.image = null
        } else {
            dataForm.image = restaurantLogo
        }
        let bannerImageFileList = []
        let restaurant_pictures = []
        let imageUrlArray = []
        if (bannerImage !== undefined) {
            if (bannerImage.length > 0) {
                bannerImage.map((bannerImageData) => {
                    console.log('bannerImageData', bannerImageData)
                    if (bannerImageData.name !== null) {
                        bannerImageFileList.push(bannerImageData)
                    } else {
                        restaurant_pictures.push({
                            "restaurant": restaurant_id,
                            "title": bannerImageData.name,
                            "is_active": true,
                            "image_url": bannerImageData.url
                        })
                    }
                })
            } else {
                dataForm.banner = null
                dataForm.restaurant_pictures = []
            }

            if (bannerImageFileList.length === 0) {
                dataForm.banner = null
            } else {
                let imageResponse
                await Promise.all(bannerImageFileList.map(async (bannerImageData) => {
                    imageResponse = await uploadService.uploadImage(bannerImageData.originFileObj)
                    console.log('imageResponse', imageResponse)
                    imageUrlArray.push(imageResponse)
                }))
                console.log('imageUrlArray', imageUrlArray)

                imageUrlArray.forEach((imageUrl) => {
                    restaurant_pictures.push({
                        "restaurant": restaurant_id,
                        "title": null,
                        "is_active": true,
                        "image_url": imageUrl
                    })
                })
            }
        } else {
            dataForm.banner = null
        }

        dataForm.restaurant_pictures = restaurant_pictures
        let businessHour = []
        business_hour.map((business_hour) => {
            businessHour.push({
                "restaurant": restaurant_id,
                "day": business_hour.day,
                "opening_time": parseFloat(business_hour.opening_time),
                "closing_time": parseFloat(business_hour.closing_time)
            })
        })
        dataForm.business_hour = businessHour
        let response = await restaurantService.updateRestaurantDetails(dataForm)
        try {
            if (response.is_success === true) {
                message.success('Update data successful.')
            } else {
                message.error('Cannot update data.')
            }
        } catch (error) {
            message.error('Error has occurred.')
        }

    }

    let profileComponent
    if (isMobileResolution) {
        profileComponent =
            <MobileProfileComponent
                restaurant_details={restaurantDetails}
                restaurant_banner_fileList={restaurantBannerFileList}
                restaurant_form={restaurantForm}
                form_errors={formErrors}
                spin_loading={loading}
                update_restaurant_details={updateRestaurantDetails}
            />
    } else {
        profileComponent =
            <WebProfileComponent
                restaurant_details={restaurantDetails}
                restaurant_banner_fileList={restaurantBannerFileList}
                restaurant_form={restaurantForm}
                form_errors={formErrors}
                spin_loading={loading}
                update_restaurant_details={updateRestaurantDetails}
            />
    }
    return profileComponent
}