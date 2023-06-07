# 왓웨어웨더 - what wear weather

## 서비스 소개

- 오늘의 착장과 날씨를 함께 저장하고, 나만의 옷장을 만들어보세요.
- [서비스 링크](https://what-wear-weather.vercel.app/)
- [피그마](https://www.figma.com/file/7Yz1VTbCabOvmkCgEg2s0h/www.?type=design&node-id=0%3A1&t=iA4HTs7pU57COEhk-1)

## 작업 기간

- 2023/2/15 ~ 2023/2/28

## 기술 스택

- Typescript
- Next.js
- React Query / Zustand
- emotion / Headless UI
- ESLint / Prettier
- Prisma / PlanetScale
- Vercel
- PWA
- 그 외 주요 라이브러리

  - aws-sdk / multer / multer-sharp-s3
  - next-auth
  - next-connect
  - react-hook-form
  - nodemailer

## 개발 업무

- nextjs의 api routes기능과 서버리스 db를 적극 활용하여 API를 직접 구현했습니다.
- openweathermap의 open api로 날씨 데이터를 사용하였습니다.
- framer-motion을 사용하여 사용자에게 부드러운 애니메이션을 적용하고, 원활한 경험을 제공하기 위해 노력했습니다.

## 얻은 경험

### 기획부터 배포까지 혼자 경험해보기

- 서비스 기획부터 디자인, 프론트, 서버, 배포까지 전부 경험해보면서 각 직군이 어떤 고충을 겪고있는지 이해해보는 경험을 했습니다.
- 더 나아가 서비스 유지보수와 업데이트를 진행하며 수익 모델을 찾아보는 경험까지 해보는 것이 목표입니다.

## 사이트 화면

### 로그인

- next-auth 라이브러리를 통해 패스워드 없이 로그인하기를 구현하고, planetscale db에 prisma를 사용하여 사용자 정보를 저장했습니다.
- 이메일 로그인은 nodemailer와 sendgrid를 사용했습니다.
- 이메일 로그인과 소셜 로그인(카카오, 네이버)를 제공합니다.
- 이메일 로그인은 로그인 시마다, 인증 메일이 전달되는 방식입니다.

<p float="left">
  <img width="32%" alt="스크린샷 2023-06-04 오후 5 10 41" src="https://github.com/devyouth94/what-wear-weather/assets/97172050/b917ecb0-e68c-486e-a521-976d63f2ef98">
  <img width="32%" alt="스크린샷 2023-06-04 오후 5 11 25" src="https://github.com/devyouth94/what-wear-weather/assets/97172050/c7e9713a-53b2-4c7c-b097-8fe3adb650b8">
  <img width="32%" alt="스크린샷 2023-06-04 오후 5 11 59" src="https://github.com/devyouth94/what-wear-weather/assets/97172050/c3e30b39-62c6-49ba-8884-95d54fb0d7fb">
</p>

### 메인화면

- openweathermap의 Open API를 사용하여 날씨 데이터를 받아옵니다.
- 위치에 따른 최신 날씨 그리고 이후 8일의 날씨와 최저/최고 기온을 안내합니다.
- 오늘의 옷을 등록할 수 있는 버튼이 있고, 이미 등록 되어있다면 사진을 표시합니다.

<p float="left">
  <img width="32%" alt="스크린샷 2023-06-04 오후 5 13 34" src="https://github.com/devyouth94/what-wear-weather/assets/97172050/f290f007-7322-4fae-ac14-9c1ec5e84484">
  <img width="32%" alt="스크린샷 2023-06-04 오후 5 16 36" src="https://github.com/devyouth94/what-wear-weather/assets/97172050/61224e41-5efe-47cc-8c29-ffe527359664">
</p>

### 글 작성

- react-hook-form을 사용하여 효율적으로 form을 관리했습니다.
- 이미지는 sharp 라이브러리를 사용하여 리사이징 하고, multer를 사용해 S3에 업로드하는 방식입니다.
- 등록 버튼을 누르면 글 작성 모달이 제공됩니다.
- 오늘의 사진을 등록하고(필수), 선택에 따라 짧게 글을 쓸 수 있습니다.

<p float="left">
  <img width="32%" alt="스크린샷 2023-06-04 오후 5 14 00" src="https://github.com/devyouth94/what-wear-weather/assets/97172050/d219c932-cc81-4049-a706-3c0f604d96ab">
  <img width="32%" alt="스크린샷 2023-06-04 오후 5 14 59" src="https://github.com/devyouth94/what-wear-weather/assets/97172050/0511b079-9078-49b5-a7b2-464f289acef4">
</p>

### 마이 페이지

- 최신순 혹은 온도별로 사진을 확인할 수 있습니다.
- 프로필 변경이나 닉네임 변경도 가능합니다.
- 설정 버튼을 누르면 로그아웃 버튼이 있습니다.

<p float="left">
  <img width="32%" alt="스크린샷 2023-06-04 오후 5 17 41" src="https://github.com/devyouth94/what-wear-weather/assets/97172050/33bcef74-3c48-466a-97dc-5870109bc3aa">
  <img width="32%" alt="스크린샷 2023-06-04 오후 5 18 15" src="https://github.com/devyouth94/what-wear-weather/assets/97172050/bc10f1f9-daad-4fa4-9744-bdac175326af">
  <img width="32%" alt="스크린샷 2023-06-04 오후 5 22 56" src="https://github.com/devyouth94/what-wear-weather/assets/97172050/42bbecca-26aa-4afa-8766-184226af406e">
</p>

### 이미지 상세보기

- 메인 페이지 혹은 마이 페이지에서 사진을 클릭하면 이미지 상세보기가 가능합니다.
- 삭제 아이콘을 눌러 삭제가 가능합니다. (삭제 시에는 s3 스토리지에서도 삭제 되도록 구현했습니다.)

<img width="32%" alt="스크린샷 2023-06-04 오후 5 18 42" src="https://github.com/devyouth94/what-wear-weather/assets/97172050/a4c63b0b-2361-4dec-96a5-f3a59ab4bcb0">

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
