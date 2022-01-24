import Head from 'next/head'
import { useEffect } from 'react'
import Router from 'next/router'

export default function Home() {
  const title = 'دکترخونه';
  useEffect(() => {
    Router.push('/services')
  }, []);
  return (
    <div className='container'>
      <Head>
        <title>title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
