import PropTypes from "prop-types";
import Head from "next/head";
import withReduxSaga from "next-redux-saga";
import wrapper from "../store/configureStore";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

import BottomTabs from "../components/layout/BottomTabs";
import VerticalNav from "../components/layout/VerticalNav";
import HorizontalNav from "../components/layout/HorizontalNav";
import ScrollButton from "../components/layout/ScrollButton";
// import FloatingButton from "../components/FloatingButton/FloatingButton";
import ActionLoading from "../components/loading/ActionLoading";
import Toast from "../components/Toast/Toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <BottomTabs />
      <VerticalNav />
      <HorizontalNav />
      <ScrollButton />
      {/* <FloatingButton /> */} //효율성 저하로 드랍처리
      <ActionLoading />
      <Toast />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(withReduxSaga(MyApp));
