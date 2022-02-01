import Head from 'next/head'
import { useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link';
import { getCookies, removeCookies, setCookies } from 'cookies-next';

export default function Home() {
  const token = getCookies('jwtToken');
  if(token.jwtToken){
    Router.push('/services');
  }
  const title = 'دکترخونه';

  return (
    <div className='container'>
      <Head>
        <title>title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href='/users/'>
        <a>
         ورود یا ثبت نام
        </a>
      </Link>
    </div>
  )
}
