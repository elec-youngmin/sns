import React from "react";
import withReduxSaga from "next-redux-saga";
import Media from "react-media";
import wrapper from "../store/configureStore";
import Head from "next/head";

import BottomTabs from "../components/layout/BottomTabs";
import HorizontalNav from "../components/layout/HorizontalNav";
import VerticalNav from "../components/layout/VerticalNav";
import ScrollButton from "../components/layout/ScrollButton";
import ActionLoading from "../components/loading/ActionLoading";
import Toast from "../components/Toast/Toast";

function MyApp({ Component, pageProps }) {
  const initialState = {
    device: "mobile",
  };

  return (
    <>
      <Head>
        <title>interfree</title>
        <meta charset="utf-8" />
        <meta name="description" content="sns 포트폴리오" />
        <meta name="keywords" content="interfree, sns" />
        <meta name="author" content="mintzerocode" />
      </Head>
      <BottomTabs />
      <HorizontalNav />
      <ScrollButton />
      <ActionLoading />
      <Toast />
      <Media
        queries={{ medium: "(min-width: 854px)" }}
        defaultMatches={{ medium: initialState.device === "desktop" }}
        render={() => <VerticalNav />}
      />

      <style jsx global>{`
        body {
          @import url("https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@500&display=swap");
          font-family: "Hind Vadodara", sans-serif;
          font-size: 16px;
          font-weight: 500;
          background-color: #f5f5f5;
          overflow-y: scroll;
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
