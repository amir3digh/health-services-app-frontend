import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import BottomNav from '../components/bottom_nav/BottomNav'
import Header from '../components/header/Header'
import Popup from '../components/popup/Popup'
import { AnimatePresence, useAnimation } from 'framer-motion'
import '../styles/global.scss'
import '../styles/_globalConfig.scss'
import { userProfileRequest } from '../lib/requests'

function MyApp({ Component, pageProps, router }) {
  const pageTitle = pageProps.title;
  const slug = pageProps.slug;
  const layout = pageProps.layout;

  // const popupControls = useAnimation();
  // const [popup, setPopup] = useState({ opened: false, notified: false });
  // useEffect(() => {
  //   const query = router.query;
  //   (query.auth === 'false' && !popup.notified && !popup.opened) && loginPopupHandler('open');
  // });
  // const popupHandler = (action) => {
  //   action === 'close' && setPopup(prev => ({ ...prev, notified: true }))
  //   loginPopupHandler(action);
  // }
  // const loginPopupHandler = async (action) => {
  //   const animationState = ((action === 'close') && ('hidden')) || ((action === 'open') && ('visible'));
  //   action === 'open' && setPopup(prev => ({ ...prev, opened: true }));
  //   await popupControls.start(animationState);
  //   action === 'close' && setPopup(prev => ({ ...prev, opened: false }));
  // }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='background'>
        <Image
          src='/images/background.jpg'
          alt='page background'
          layout='fill'
        />
      </div>

      {layout.header && <Header pageTitle={pageTitle} />}
      <AnimatePresence
        exitBeforeEnter
        initial={false}
      >
        <Component {...pageProps} key={slug} />
      </AnimatePresence>
      {layout.bottomNav && <BottomNav />}
      {/* <Popup
        opened={popup.opened}
        popupControls={popupControls}
        handler={popupHandler}
      /> */}
    </>
  )
}

export default MyApp
