import { useEffect, useState } from "react";
import axios from "axios";

type Session = {
  key: string;
  name: string;
  subscriber: boolean;
};

type AuthCookie = {
  key: string;
  username: string;
};

const Auth = (): JSX.Element => {
  const [authText, setAuthText] = useState<string>("Authentication in progress...");

  function getToken(): string | null {
    const url = new URL(window.location.href);
    return url.searchParams.get("token");
  }

  //Could use refactoring, move api call to a function
  useEffect(() => {
    const token = getToken();
    const cookie = document.cookie.match(new RegExp('(^| )' + 'auth' + '=([^;]+)'));
    if(cookie) {
      const auth: AuthCookie = JSON.parse(cookie[2]) as AuthCookie;
      console.log(auth);
      setAuthText("Auth successful");
    } else {
      if (token) {
        const url = process.env.REACT_APP_SERVER_URL as string + "auth?token=" + token;
        axios.get<{session: Session}>(url)
        .then((response) => {
          const session: Session = response.data.session;
          const authCookie: AuthCookie = {
            key: session.key,
            username: session.name
          };
          document.cookie = "auth=" + JSON.stringify(authCookie);
          setAuthText("Auth successful");
        }).catch((error) => {
          console.log(error);
        });
      } else {
        setAuthText("No token found");
      }
    }
    setTimeout(() => {
      window.location.href = "/";
    }, 4000);
  }, []);


  return(
    <div className="md:max-w-6xl  mx-auto justify-center items-center mb-10 mt-16">
      <h1 className="text-4xl">{authText}</h1>
    </div>
  );
};

export default Auth;