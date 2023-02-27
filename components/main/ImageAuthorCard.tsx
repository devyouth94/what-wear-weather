type Props = {
  backgroundData: {
    [y: string]: string;
  };
};

const ImageAuthorCard = ({ backgroundData }: Props) => {
  return (
    <p className="bg-neutral-400/20 p-2 backdrop-blur-md mt-2 text-center rounded-lg text-xs font-medium text-white">
      <span>Photo by</span>{' '}
      <a className="underline" href={backgroundData.profile} target="_blank" rel="noreferrer">
        {backgroundData.name}
      </a>{' '}
      <span>on</span>{' '}
      <a className="underline" href={backgroundData.unsplash} target="_blank" rel="noreferrer">
        Unsplash
      </a>
    </p>
  );
};

export default ImageAuthorCard;
