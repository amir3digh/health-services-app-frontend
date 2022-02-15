import Header from '../../components/header/Header';
import BottomNav from '../../components/bottom_nav/BottomNav';
import Head from 'next/head';
import ToggleBtn from '../../components/requests/ToggleBtn';
import PendingItem from '../../components/requests/PendingItem';

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
                <PendingItem />
            </main>
            <BottomNav />
        </div>
    )
}