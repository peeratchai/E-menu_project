import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence } from "framer-motion";
import Head from 'next/head'
import Geocode from "react-geocode";
import { useEffect } from 'react';
import { useRouter } from 'next/router'

Geocode.setApiKey("AIzaSyAqDX2CqFjdgUBY2QqPfUMlMDGS1gjttPw");
Geocode.setLanguage("th");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const handExitComplete = () => {
    if (typeof window !== "undefined") {
        const hashId = window.location.hash;

        console.log({ location: window.location, hashId });

        if (hashId) {
            const element = document.querySelector(hashId);
            console.log({ element });

            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest"
                });
            }
        }
    }
};


export default function App({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let newVersion = '11.06.2021 2.19'
            let currentVersion = window.localStorage.getItem('version')
            if (currentVersion) {
                if (currentVersion !== newVersion) {
                    localStorage.clear();
                    window.localStorage.setItem('version', newVersion)
                    window.location.reload();
                    router.push({
                        pathname: "/"
                    })
                }
            } else {
                localStorage.clear();
                window.localStorage.setItem('version', newVersion)
                window.location.reload();
                router.push({
                    pathname: "/"
                })
            }
        }
    }, [])

    return (<AnimatePresence exitBeforeEnter onExitComplete={handExitComplete}>
        <Head>
            <link
                href="https://fonts.googleapis.com/css?family=Work Sans"
                rel="stylesheet"
                key="google-font-cabin"
            />
            <script
                type="text/javascript"
                src="//maps.googleapis.com/maps/api/js?key=AIzaSyAqDX2CqFjdgUBY2QqPfUMlMDGS1gjttPw&language=en&libraries=places"
            ></script>
            <script src="https://static.line-scdn.net/liff/edge/2.1/liff.js"></script>
        </Head>
        <style global jsx>{`
        body {
            font-family: 'Work Sans', sans-serif;
        }
      `}</style>
        <Component {...pageProps} />
    </AnimatePresence>)
}