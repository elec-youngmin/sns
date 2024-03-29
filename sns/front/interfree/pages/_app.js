import React from "react";
import withReduxSaga from "next-redux-saga";
import wrapper from "../store/configureStore";
import Head from "next/head";

import BottomTabs from "../components/layout/BottomTabs";
import HorizontalNav from "../components/layout/HorizontalNav";
// import ScrollButton from "../components/layout/ScrollButton";
import ActionLoading from "../components/loading/ActionLoading";
import Toast from "../components/Toast/Toast";

function MyApp({ Component, pageProps }) {


  return (
    <>
      <Head>
        <title>interfree</title>
        <meta charset="utf-8" />
        <meta name="description" content="sns 포트폴리오" />
        <meta name="keywords" content="interfree, sns" />
        <meta name="author" content="mintzerocode" />
      </Head>

      <HorizontalNav />
      <BottomTabs />
      {/* <ScrollButton /> */}
      <ActionLoading />
      <Toast />

      <style jsx global>{`
        body {
          @import url("https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@500&display=swap");
          font-family: "Hind Vadodara", sans-serif;
          font-size: 16px;
          font-weight: 500;
          background-color: #f5f5f5;
          overflow-y: scroll;
          margin:0 auto;
        }
        a {
          cursor: pointer;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(withReduxSaga(MyApp));
