import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import styles from './index.module.css'

export default function instructionFacebook() {

    return (
        <Layout style={{ border: "1px solid #78100E" }}>
            <div className={styles.card}>
                <h4 style={{ textAlign: "center", marginBottom: "25px" }}>
                    คุณสามารถลบข้อมูลจากแอพได้ผ่านฟังชัน Update profile โดยการกดปุ่ม Delete
                    หลังจาก Delete แล้วจะไม่สามารถเข้าใช้งานด้วย Account นี้ได้อีก
                    หรือจนกว่าจะ sign up ด้วย Email เดิมอีกครั้ง
                </h4>
            </div>
        </Layout>
    )
}