import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import BottomNav from '../components/bottom_nav/BottomNav'
import Header from '../components/header/Header'
import '../styles/global.scss'
import '../styles/_globalConfig.scss'

function MyApp({ Component, pageProps }) {
  const pageTitle = pageProps.title;
  const slug = pageProps.slug;
  const layout = pageProps.layout;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {layout.header && <Header pageTitle={pageTitle} />}
      <AnimatePresence
        exitBeforeEnter
        initial={false}
      >
        <Component {...pageProps} key={slug} />
      </AnimatePresence>
      {layout.bottomNav && <BottomNav />}
    </>
  )
}

export default MyApp
