import axios from "axios";
import { useEffect, useState } from "react";

const useReviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/reviews')
            .then(res => setReviews(res.data))
    }, []);


    return [reviews];
};

export default useReviews;