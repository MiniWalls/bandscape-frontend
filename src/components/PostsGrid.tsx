import PostItem from "../components/PostItem";

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

const PostsGrid = (props: ComponentProps): JSX.Element => {
  return(
    <div className="md:max-w-6xl  mx-auto justify-center items-center mb-10">
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