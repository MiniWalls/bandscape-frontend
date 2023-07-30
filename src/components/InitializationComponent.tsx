import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/store";

type AuthCookie = {
    key: string;
    username: string;
  };

const InitializationComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    
    function readAuthCookie(): AuthCookie {
        const cookie = document.cookie.match(new RegExp('(^| )' + 'auth' + '=([^;]+)'));
        if(cookie) {
            const auth: AuthCookie = JSON.parse(cookie[2]) as AuthCookie;
            return auth;
        } else {
            return {
                key: "",
                username: ""
            };
        }
    }

    //Handles reading cookies if exist and saving to redux store
    useEffect(() => {
        console.log("init");
        const auth = readAuthCookie();
        if(auth.key != "" || auth.username != "") {
            dispatch(login([auth.key, auth.username]));
        }
    }, [dispatch]);
    
    return <></>;  
};

export default InitializationComponent;