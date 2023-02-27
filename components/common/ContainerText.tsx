type Props = {
  children: string;
};

const ContainerText = ({ children }: Props) => {
  return (
    <span className="flex justify-center w-full mt-8 text-neutral-400 text-sm font-semibold">
      {children}
    </span>
  );
};

export default ContainerText;
