import { useState, useEffect } from "react";
import PostItem from "./PostItem";
import PostSortListBox from "./PostSortListBox";

type Post = {
  id: number;
  title: string;
  body: string;
  datetime: string;
  userid: number;
  lastfmattachment: null;
};

interface ComponentProps {
    posts: Post[];
}

const sortOptions = [
  {id: 1, name: "ID"},
  {id: 2, name: "Title"},
  {id: 3, name: "Username"},
  {id: 4, name: "Date"},
];

const PostsGrid = (props: ComponentProps): JSX.Element => {
  const [sort, setSort] = useState<string>(sortOptions[0].name);

  useEffect(() => {
    console.log(sort);
  }, [sort]);

  const changeSort = (id: string) => {
    const option = sortOptions.find((item) => item.name === id);
    if(option) {
      setSort(option.name);
    } else {
      setSort(sortOptions[0].name);
    }
  };

  return(
    <div className="md:max-w-6xl  mx-auto justify-center items-center mb-10">
      <div className="flex justify-end pb-2">
        <PostSortListBox changeSort={changeSort} sortOptions={sortOptions}/>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 list-none">
        {props.posts.map((item: Post) => (
          <li key={item.id}>
            <PostItem title={item.title} body={item.body} datetime={item.datetime} userid={item.userid} lastfmattachment={item.lastfmattachment} />
          </li>
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;