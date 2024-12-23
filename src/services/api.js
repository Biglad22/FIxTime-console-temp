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

        const res =  await customApi.get(`/${wallet}`); 
        console.log(res);
        
        return res

    } catch (err) {

        console.log(err.message);
        throw new Error(err);
        
    }
}