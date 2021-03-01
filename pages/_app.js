import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence } from "framer-motion";

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
    return (<AnimatePresence exitBeforeEnter onExitComplete={handExitComplete}>
        <Component {...pageProps} />
    </AnimatePresence>)
}