# 포트폴리오 소개(사이트 명:interfree)

## 포트폴리오 작성 목적

웹 신입 개발자로써 역량을 보여드리기 위해 작성하였습니다.

## 웹사이트 유형

sns을 지향하고 있으며, 팔로우, 언팔로우 같은 친구 관리 기능이 있습니다. 상세한 기능은 모든 기능란을 참조 하시기 바랍니다.

## 주요 기술 스택

프론트엔드: react,next,redux,bootstrap,styled Components
백엔드:node,express  
 데이터베이스:mysql,sequelize  
 서버: aws  
 스토리지:s3

## 개발환경

운영체제: window 10  
 에디터: VSCode  
 브라우저: chrome

## 모든 기능

모바일로 보실 경우 마인드맵 이미지를 눌러 확대해 보시는 것을 권장합니다.  
 mind mpas Pro로 작성하였습니다.

<img src="https://user-images.githubusercontent.com/71272034/103275533-bfeae180-4a07-11eb-9982-8c853023e8a5.png" width="100%"></img>

## 주요 기능

1. 모바일 친화/ 데스크탑 친화  
   854px 기준으로 854px 이하이면 모바일 레이아웃으로, 855px 이상이면 데스크탑 레이아웃 변경하여 레이아웃을 제공합니다.
   예를 들어 모바일 경우 하단 네비게이션이 생기고, 상단 네비게이션도 모바일에 맞게 바뀝니다. 데스크탑 경우 모바일에서 제공하는 하단 네비게이션이 생략 되고, 상단 네비게이션 메뉴도 데스크탑에 맞게 변경되며, 왼쪽 공백에 새로운 세로 메뉴바가 생성됩니다.

 <!-- 모바일 화면
 <img src="https://user-images.githubusercontent.com/71272034/103508346-2bb7c900-4ea4-11eb-9b0f-021dfdbd3e7e.jpg" width="280" height="550">

 데스크탑 화면
 <img src="https://user-images.githubusercontent.com/71272034/103508673-ca442a00-4ea4-11eb-891d-4f7854bd7da4.JPG" width="900" height="500"> -->

2. 사용자 동작 결과 알림과 에러 알림
   사용자가 웹의 기능을 이용하면 그 결과가 성공/ 실패 여부를 알려줍니다. react-toastify 라이브러리로 구현했으며 리덕스의 리듀서 함수에서 성공/ 실패여부에 따라 ToastSuccess, ToastError 함수를 호출합니다.

     <img src=" https://user-images.githubusercontent.com/71272034/103510818-450f4400-4ea9-11eb-81dc-112e0adefe21.JPG" width="500" height="300">

      <img src=" https://user-images.githubusercontent.com/71272034/103510899-65d79980-4ea9-11eb-83ae-2c5469f07927.JPG" width="500" height="300">
