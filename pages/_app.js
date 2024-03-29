import Head from "next/head";
import Layout from '../components/layout/Layout'
import '../styles/globals.css';
import { NotificationContextProvider } from "../store/NotificationContext";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta name="description" content="Explore transformative events for personal growth and meaningful connections."/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
    )
}

export default MyApp