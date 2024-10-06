import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from '../helper/helper'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

/** custom hook */
export default function useFetch(query){
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })
//isLoading ,apiData,status will get extracted
    useEffect(() => {

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true}));
  //getusername is a function which is reteriving the token from the localstorage
                const { username } = !query ? await getUsername() : '';
    //when the req goes to the api endpoint with the username ->query params
    //backend api will get the username from  the req params then will check if the username from the mongodb exists or not
                const { data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);

                if(status === 201){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}