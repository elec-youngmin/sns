import PropTypes from "prop-types";
import withReduxSaga from "next-redux-saga";
import wrapper from "../store/configureStore";
import "bootstrap/dist/css/bootstrap.css";

import BottomTabs from "../components/layout/BottomTabs";
import VerticalNav from "../components/layout/VerticalNav";
import HorizontalNav from "../components/layout/HorizontalNav";
import ScrollButton from "../components/layout/ScrollButton";
import ActionLoading from "../components/loading/ActionLoading";
import Toast from "../components/Toast/Toast";
import GlobalStyle from "../styledComponents/GlobalStyle";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <BottomTabs />
      <VerticalNav />
      <HorizontalNav />
      <ScrollButton />
      <ActionLoading />
      <Toast />

      {/* <FloatingButton /> */}
      {/* 사용성 저하로 드랍처리 */}

      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(withReduxSaga(MyApp));
