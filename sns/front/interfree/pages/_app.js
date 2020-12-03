import PropTypes from "prop-types";
import Head from "next/head";
import withReduxSaga from "next-redux-saga";
import wrapper from "../store/configureStore";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(withReduxSaga(MyApp));
