import Nav from '@/components/common/Nav';
import NicknameModal from '@/components/mypage/NicknameModal';
import ProfileImgModal from '@/components/mypage/ProfileImgModal';
import SettingDrawer from '@/components/mypage/SettingDrawer';
import useGetPosts from '@/hooks/mypage/useGetPosts';
import useGetPostsBySearch from '@/hooks/mypage/useGetPostsBySearch';
import { longNowTime } from '@/lib/utils/timeCalculate';
import { useModalActions } from '@/store/useModalStore';
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const Mypage = () => {
  const [value, setValue] = useState([-20, 40]);
  const { data: userData } = useSession();
  const { data: postData, status: postStatus } = useGetPosts();
  const { data: searchData, status: searchStatus, refetch } = useGetPostsBySearch(value);

  const { changeModalState } = useModalActions();

  return (
    <>
      {userData && <NicknameModal nickname={String(userData.user?.name)} />}
      {userData && <ProfileImgModal initialImg={String(userData.user?.image)} />}

      <SettingDrawer />

      <Avatar size="xl" name={userData?.user?.name || ''} src={userData?.user?.image || ''} />
      <button onClick={() => changeModalState('profileImg')}>프로필 이미지 변경</button>
      <span>{userData?.user?.name}</span>
      <button onClick={() => changeModalState('nickname')}>닉네임 변경</button>

      <button onClick={() => changeModalState('setting')}>설정</button>

      <Tabs isFitted variant="enclosed">
        <TabList mb="1rem">
          <Tab>최신순</Tab>
          <Tab>온도별 검색하기</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid spacing={4} templateColumns="repeat(2, 1fr)">
              {postStatus === 'success' &&
                postData.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <Heading size="sm">{longNowTime(post.createdAt)}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Image
                        objectFit="cover"
                        src={post.image}
                        minWidth="full"
                        minHeight="300px"
                        maxHeight="300px"
                        borderRadius="sm"
                      />
                      <Heading>{post.temp_now}&#8451;</Heading>
                      <Text>체감 온도 {post.temp_feels}&#8451;</Text>
                      <Text>최저 온도 {post.temp_min}&#8451;</Text>
                      <Text>최고 온도 {post.temp_max}&#8451;</Text>
                    </CardBody>
                  </Card>
                ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <div>
              {value[0]}&#8451; ~ {value[1]}&#8451;
            </div>

            <RangeSlider
              defaultValue={[-20, 40]}
              min={-20}
              max={40}
              step={1}
              onChangeEnd={(value) => setValue(value)}>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={4} index={0} />
              <RangeSliderThumb boxSize={4} index={1} />
            </RangeSlider>

            <button onClick={() => refetch()}>검색</button>

            <SimpleGrid spacing={4} templateColumns="repeat(2, 1fr)">
              {searchStatus === 'success' &&
                searchData.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <Heading size="sm">{post.createdAt}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Image
                        objectFit="cover"
                        src={post.image}
                        minWidth="full"
                        minHeight="300px"
                        maxHeight="300px"
                        borderRadius="sm"
                      />
                      <Heading>{post.temp_now}&#8451;</Heading>
                      <Text>체감 온도 {post.temp_feels}&#8451;</Text>
                      <Text>최저 온도 {post.temp_min}&#8451;</Text>
                      <Text>최고 온도 {post.temp_max}&#8451;</Text>
                    </CardBody>
                  </Card>
                ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Nav />
    </>
  );
};

export default Mypage;
