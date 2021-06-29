import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { message } from 'antd'
import 'antd/dist/antd.css';
import authentication from '../../services/authentication'
import Layout from '../../components/layout'
import styles from './index.module.css'

export default function verifyEmail() {
    const router = useRouter()
    const { u, token } = router.query;
    const [countDown, setCountDown] = React.useState(3);
    const [verifyStatus, setVerifyStatus] = React.useState(false);
    useEffect(() => {

        if (!router.isReady) {
            // console.log('not ready')
        } else {
            console.log('u data : ', u)
            console.log('token data : ', token)
            if (u !== undefined && token !== undefined) {
                let data = {
                    "id": u,
                    "token": token
                }
                authentication.verifyEmail(data).then(() => {
                    setVerifyStatus(true)
                    message.success('Verify email successful.Please sign in again.')

                    // router.push({
                    //     pathname: "/",
                    //     query: { 'verifyEmail': '10asdokzclskf0efsf-sef0xkczlv0efie0-s0esfklkvadfadffas-adfvshbostohtrodh' }
                    // })
                    // message.success('Verify email successful.Please sign in again.')
                    // setTimeout(() => {
                    //     router.push({
                    //         pathname: "/",
                    //         query: { 'verifyEmail': true }
                    //     })
                    // }, 3000);

                }).catch(error => {
                    console.log('error', error)
                })
            } else {
                message.error('Please check your email to reset password again. ')
                router.push({ path: "/" })
            }
        }

    }, [router.isReady])

    useEffect(() => {
        if (verifyStatus) {
            if (countDown > 1) {
                setTimeout(() => {
                    setCountDown(countDown - 1)
                }, 1000);
            } else {
                router.push({
                    pathname: "/"
                })
            }
        }
    })

    return (
        <Layout style={{ border: "1px solid #78100E" }}>
            <div className={styles.card}>
                <h3 style={{ textAlign: "center", marginBottom: "25px" }}>
                    Redirect to cee menu home page within {countDown}..
                </h3>
            </div>
        </Layout>
    )
}