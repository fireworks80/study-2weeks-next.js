import Router from 'next/router';
import 'antd/dist/antd.css';
import 'nprogress/nprogress.css';
import Nprogress from 'nprogress';

Router.events.on('routeChangeStart', () => {
  Nprogress.start();
});

Router.events.on('routeChangeComplete', () => {
  Nprogress.done();
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
