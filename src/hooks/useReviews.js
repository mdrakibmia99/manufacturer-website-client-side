import axios from "axios";
import { useEffect, useState } from "react";

const useReviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get('https://thawing-wildwood-00183.herokuapp.com/reviews')
            .then(res => setReviews(res.data))
    }, []);


    return [reviews];
};

export default useReviews;