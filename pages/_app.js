import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence } from "framer-motion";
import Head from 'next/head'
import Geocode from "react-geocode";
import { useEffect } from 'react';

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


export default function App({ Component, pageProps, router }) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem("version", '1.0.2')
        }
    }, [])
    return (
        <AnimatePresence exitBeforeEnter onExitComplete={handExitComplete} >
            <Head>

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300&family=Kanit:wght@300&family=Prompt:wght@100&display=swap" rel="stylesheet" />
                <script
                    type="text/javascript"
                    src="//maps.googleapis.com/maps/api/js?key=AIzaSyAqDX2CqFjdgUBY2QqPfUMlMDGS1gjttPw&language=en&libraries=places"
                ></script>
                <script src="https://static.line-scdn.net/liff/edge/2.1/liff.js"></script>
                <title>CeeMenu</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <style global jsx>{`
        body {
            font-family:'Kanit', sans-serif
        }
      `}</style>
            <Component key={router.route} {...pageProps} />
        </AnimatePresence>
    )
}