import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '7bebb2df667e458aa97a5641263b17c7'
    }
})