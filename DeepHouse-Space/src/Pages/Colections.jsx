import { Helmet } from "react-helmet-async";
import CartPage from "./cart/CartPage";

const Collections = () => {
    return ( 
        <>
            <Helmet >
            <title>DeepHouse Space - Collections</title>
                <meta name="description" content="Explore and manage your music collections with ease. Find your favorite tracks and albums in one place on DeepHouse Space." />
                <meta name="keywords" content="deep house, music collections, manage music, favorite tracks, music albums" />
                <meta property="og:title" content="DeepHouse Space - Collections" />
                <meta property="og:description" content="Explore and manage your music collections with ease. Find your favorite tracks and albums in one place on DeepHouse Space." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://deephousespace.web.app/collections" />
                
            </Helmet>
            <CartPage />
        </>
     );
}
 
export default Collections;