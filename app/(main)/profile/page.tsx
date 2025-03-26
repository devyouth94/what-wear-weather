import MyOutfitFilter from '~/src/components/outfit/my-outfit-filter';
import MyOutfitList from '~/src/components/outfit/my-outfit-list';
import MyProfile from '~/src/components/profile/my-profile';
import { MyOutfitFilterProvider } from '~/src/contexts/my-outfit-filter-provider';

const Profile = () => {
  return (
    <>
      <MyProfile />

      <MyOutfitFilterProvider>
        <MyOutfitFilter />
        <MyOutfitList />
      </MyOutfitFilterProvider>
    </>
  );
};

export default Profile;
