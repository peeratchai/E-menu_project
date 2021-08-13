import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence } from "framer-motion";
import Head from 'next/head'
import Geocode from "react-geocode";

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


export default function App({ Component, pageProps ,router}) {
console.log('router',router.route)
    return (
    <AnimatePresence exitBeforeEnter onExitComplete={handExitComplete} >
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
            <title>CeeMenu</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <style global jsx>{`
        body {
            font-family: 'Work Sans', sans-serif;
        }
      `}</style>
        <Component key={router.route} {...pageProps}  />
    </AnimatePresence>
    )
}