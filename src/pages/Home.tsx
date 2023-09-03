import { useEffect, useState } from "react";
import axios from "axios";
import PostsGrid from "../components/PostsGrid";


type Post = {
  id: number;
  title: string;
  body: string;
  datetime: string;
  userid: number;
  lastfmattachment: null;
};

const Home = (): JSX.Element => {
  const [data, setData] = useState<Post[] | null>();

  useEffect(() => {
    axios.get<Post[]>(process.env.REACT_APP_SERVER_URL as string + 'posts').then((response) => {
      setData(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
}, []);

  return (
    <div className="mt-24">
        {data ? <PostsGrid posts={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default Home;