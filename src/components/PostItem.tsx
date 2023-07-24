interface PostItemProps {
  title: string;
  body: string;
  datetime: string;
  userid: number;
}

const PostItem = (props: PostItemProps): JSX.Element => {
  return (
    <div className="post-item group">
      <h1 className="bg-orange-100 line-clamp-1">{props.title}</h1>
      <p className="line-clamp-2">{props.body}</p>
      <p>{props.datetime}</p>
      <p>{props.userid}</p>
    </div>
  );
};

export default PostItem;