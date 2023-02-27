type Props = {
  children: React.ReactNode;
};

const PostContainer = ({ children }: Props) => {
  return <div className="grid grid-cols-2 gap-2 mt-5">{children}</div>;
};

export default PostContainer;
