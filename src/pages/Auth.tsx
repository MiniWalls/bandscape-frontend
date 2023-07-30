import { useEffect } from "react";
import axios from "axios";
import config from "../config";

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
    } else {
      if (token) {
        const url = config.API_URL + "auth?token=" + token;
        axios.get<{session: Session}>(url)
        .then((response) => {
          const session: Session = response.data.session;
          const authCookie: AuthCookie = {
            key: session.key,
            username: session.name
          };
          document.cookie = "auth=" + JSON.stringify(authCookie);
        }).catch((error) => {
          console.log(error);
        });
      } else {
        console.log("no token found");
      }
    }
  }, []);


  return(
    <div className="mt-10">
      <h1 className="text-4xl">Auth</h1>
    </div>
  );
};

export default Auth;