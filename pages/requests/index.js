import Header from '../../components/header/Header';
import BottomNav from '../../components/bottom_nav/BottomNav';
import Head from 'next/head';
import Pending from '../../components/requests/Pending';
import ToggleBtn from '../../components/requests/ToggleBtn';

export default function RequestPage() {
    const title = 'درخواست ها';
    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header
                pageTitle={title} 
                pageName='requests'
            />
            <main>
                <ToggleBtn />
                <Pending />
            </main>
            <BottomNav />
        </div>
    )
}