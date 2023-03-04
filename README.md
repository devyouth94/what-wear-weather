# 왓웨어웨더 - what wear weather

## 서비스 소개

- 오늘의 착장과 날씨를 함께 저장하고, 나만의 옷장을 만들어보세요.
- [서비스 링크](https://what-wear-weather.vercel.app)

## 작업 기간

- 2023/2/15 ~ 2023/2/28

## 기술 스택

- Language
  - TypeScript
- Framework
  - create-next-app
  - Next.js (api routes를 사용하기 위해 선택)
- State Management
  - Tanstack Query (더 효율적인 서버 상태 관리)
  - Zustand (가벼운 클라이언트 상태 관리 라이브러리)
- CSS
  - Tailwind CSS (효과적인 스타일링)
  - Chakra UI (디자인 작업의 효율성을 위함)
  - Framer Motion
- Linter
  - ESLint
  - Prettier
- Severless
  - Prisma
  - PlanetScale
- Deploy
  - Vercel

## 사이트 화면

### 로그인

<img width="200" alt="스크린샷 2023-03-03 오후 6 59 06" src="https://user-images.githubusercontent.com/97172050/222696894-26f5a692-d73e-4b32-b061-b450b3383185.png">

- next-auth 라이브러리를 통해 패스워드 없이 로그인하기를 구현하고, planetscale db에 prisma를 사용하여 사용자 정보를 저장했습니다.
- 이메일 로그인은 nodemailer와 sendgrid를 사용했습니다.
- 이메일 로그인과 소셜 로그인(카카오, 네이버)를 제공합니다.
- 이메일 로그인은 로그인 시마다, 인증 메일이 전달되는 방식입니다.

### 메인화면

<img width="200" alt="스크린샷 2023-03-03 오후 7 18 26" src="https://user-images.githubusercontent.com/97172050/222697244-817b52da-5743-4155-b887-423692f5393a.png">
<img width="200" alt="스크린샷 2023-03-03 오후 7 19 59" src="https://user-images.githubusercontent.com/97172050/222697342-3f57c735-1bbf-4f3a-9511-eb9c002c30a7.png">

- openweathermap의 Open API를 사용하였고, react query를 통해 데이터를 캐싱하여 관리했습니다.
- 위치에 따른 최신 날씨 그리고 이후 8일의 날씨와 최저/최고 기온을 안내합니다.
- 오늘의 옷을 등록할 수 있는 버튼이 있고, 이미 등록 되어있다면 사진을 표시합니다.

### 글 작성

<img width="200" alt="스크린샷 2023-03-03 오후 7 18 51" src="https://user-images.githubusercontent.com/97172050/222698399-f5b553da-164c-4efe-ab0a-9f3fe8186c75.png">

- react-hook-form을 사용하여 효율적으로 form을 관리했습니다.
- 이미지는 sharp 라이브러리를 사용하여 리사이징 하고, multer를 사용해 S3에 업로드하는 방식입니다.
- 등록 버튼을 누르면 글 작성 모달이 제공됩니다.
- 오늘의 사진을 등록하고(필수), 선택에 따라 짧게 글을 쓸 수 있습니다.

### 마이 페이지

<img width="200" alt="스크린샷 2023-03-03 오후 7 18 42" src="https://user-images.githubusercontent.com/97172050/222698633-8efc9f47-ca26-44eb-b43a-ffe96a67144d.png">
<img width="200" alt="스크린샷 2023-03-03 오후 7 20 42" src="https://user-images.githubusercontent.com/97172050/222698751-25bfd16d-d5d1-439d-b55f-f3d260bfe619.png">

- 최신순 혹은 온도별로 사진을 확인할 수 있습니다.
- 프로필 변경이나 닉네임 변경도 가능합니다.
- 설정 버튼을 누르면 로그아웃 버튼이 있습니다.

### 이미지 상세보기

<img width="200" alt="스크린샷 2023-03-03 오후 7 20 07" src="https://user-images.githubusercontent.com/97172050/222698185-99e142af-bfcf-474d-8eee-5945b8df816e.png">

- 메인 페이지 혹은 마이 페이지에서 사진을 클릭하면 이미지 상세보기가 가능합니다.
- 삭제 아이콘을 눌러 삭제가 가능합니다. (삭제 시에는 s3 스토리지에서도 삭제 되도록 구현했습니다.)

### 기타

<img width="200" alt="스크린샷 2023-03-03 오후 7 22 57" src="https://user-images.githubusercontent.com/97172050/222698995-6a68e909-6318-44f1-8583-1f583ecc6789.png">
<img width="200" alt="스크린샷 2023-03-03 오후 7 23 37" src="https://user-images.githubusercontent.com/97172050/222699042-844ae89e-bef3-415f-b338-55aae4c9b47c.png">

- 날씨에 따라 배경화면이 제공됩니다. 직관적으로 날씨를 느껴보세요!
- 최대 7가지 날씨의 배경화면이 있습니다. (맑음, 흐림, 이슬비, 안개, 비, 눈, 번개)

## 컨트리뷰터

<table border="1">
    <th>
        <a href="https://github.com/devyouth94">김영진</a>
    </th>
    <tr>
        <td>
            <img src="https://github.com/devyouth94.png" width='120' />
        </td>
    </tr>
</table>
