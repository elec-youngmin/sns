import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import withReduxSaga from "next-redux-saga";
import { useRouter } from "next/router";
import wrapper from "../store/configureStore";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";

import BottomTabs from "../components/layout/BottomTabs";
import VerticalNav from "../components/layout/VerticalNav";
import HorizontalNav from "../components/layout/HorizontalNav";
import ScrollButton from "../components/layout/ScrollButton";
import ActionLoading from "../components/loading/ActionLoading";
import Toast from "../components/Toast/Toast";
import GlobalStyle from "../styledComponents/GlobalStyle";

function MyApp({ Component, pageProps }) {
  const [renderNav, setRenderNav] = useState(false);
  useMemo(() => {
    router.events.on("routeChangeComplete", () => {
      setRenderNav(true);
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>interfree</title>
      </Head>
      <BottomTabs />
      <VerticalNav />
      {renderNav && <HorizontalNav />}
      <ScrollButton />
      <ActionLoading />
      <Toast />
      <style jsx global>{`
        body {
          @import url("https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@500&display=swap");
          font-family: "Hind Vadodara", sans-serif;
          font-size: 16px;
          font-weight: 500;
          background-color: #f5f5f5;
          overflow-x: hidden;
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
