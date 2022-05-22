import axios from "axios";
import { useEffect, useState } from "react";

const useCarousels = () => {
    const [carousels, setCarousels] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/carousels')
            .then(res => setCarousels(res?.data))
    }, []);

    return [carousels];
};

export default useCarousels;
