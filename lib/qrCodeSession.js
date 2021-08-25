import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

export default function qrCodeSession({ redirectTo = false, redirectIfFound = false, } = {}) {
  let response = useSWR('/api/getQRCodeDetails')
  let qr_code_details
  if (response && response.data) {
    qr_code_details = response.data.qr_code_details
  }
  return qr_code_details 
}
