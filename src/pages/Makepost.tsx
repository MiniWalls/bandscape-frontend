import NewPostForm from "../components/NewPostForm";

const Makepost = (): JSX.Element => {
  return (
    <div className="max-w-7xl  mx-auto justify-center items-center">
      <h1 className="mt-16 text-4xl">Make new post</h1>
      <NewPostForm />
    </div>
  );
};

export default Makepost;