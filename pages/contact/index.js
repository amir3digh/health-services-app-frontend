import Header from '../../components/header/Header';
import BottomNav from '../../components/bottom_nav/BottomNav';
import Head from 'next/head';
import ContactItems from '../../components/ContactItems/ContanctItems';
import { Instagram, Mobile, Phone, WhatsApp } from '../../components/microComponents/icons/Icons';

export default function RequestPage() {
    const title = 'پشتیبانی';

    return (
        <div>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header
                pageTitle={title}
                pageName='contact'
            />
            <main>
                <div className='global-container'>
                    <ContactItems
                        label='تماس ضروری'
                        sub='پاسخگوی شما در تمام ساعات'
                        icon={<Mobile />}
                        href='tel:09121234567'
                    />
                    <ContactItems
                        label='تماس با شرکت'
                        sub='پاسخگوی شما در تمام ساعات'
                        icon={<Phone />}
                        href='tel:09121234567'
                    />
                    <ContactItems
                        label='واتس اپ'
                        sub='پاسخگوی شما در تمام ساعات'
                        icon={<WhatsApp />}
                        href=''
                    />
                    <ContactItems
                        label='اینستاگرام'
                        sub='پاسخگوی شما در تمام ساعات'
                        icon={<Instagram />}
                        href=''
                    />
                </div>
            </main>
            <BottomNav />
        </div>
    )
}