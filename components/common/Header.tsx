import SimpleLogo from '@/components/common/SimpleLogo';

const Header = () => {
  return (
    <div className="flex justify-center">
      <SimpleLogo
        className="h-[20px] drop-shadow-md cursor-pointer"
        onClick={() => window.location.reload()}
      />
    </div>
  );
};

export default Header;
