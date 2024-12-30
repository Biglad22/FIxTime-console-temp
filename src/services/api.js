import axios from "axios";


///API FUNCTIONS FOR INTERACTION WITH BACKEND

//AXIOS INSTANCE
const customApi = axios.create({
    baseURL : 'https://mine.flxtime.click/miner',
    headers: {
        'Content-Type': 'application/json',
    },
})



//GETS USER INFORMATION FROM THE BACKEND 
export const getUserDetails = async (wallet) =>{
    try {
        return  await customApi.get(`/${wallet}`); 
    } catch (err) {
        throw new Error(err.response.data.message);
    }
}