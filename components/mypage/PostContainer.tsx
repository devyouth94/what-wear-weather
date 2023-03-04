type Props = {
  children: React.ReactNode;
};

const PostContainer = ({ children }: Props) => {
  return <div className="grid grid-cols-2 items-start gap-2 mt-5 h-full">{children}</div>;
};

export default PostContainer;
