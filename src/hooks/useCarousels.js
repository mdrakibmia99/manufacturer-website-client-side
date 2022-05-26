import axios from "axios";
import { useEffect, useState } from "react";

const useCarousels = () => {
    const [carousels, setCarousels] = useState([]);
    useEffect(() => {
        axios.get('https://thawing-wildwood-00183.herokuapp.com/carousels')
            .then(res => setCarousels(res?.data))
    }, []);

    return [carousels];
};

export default useCarousels;
