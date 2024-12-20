import axios from "axios";


const customApi = axios.create({
    baseURL : 'https://mine.flxtime.click/miner',
    headers: {
        'Content-Type': 'application/json',
    },
})



//get user information 
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