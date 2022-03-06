import Layout from '../../components/layout/Layout'
import ContactItems from '../../components/ContactItems/ContanctItems';
import { Instagram, Mobile, Phone, WhatsApp } from '../../components/microComponents/icons/Icons';

export function getStaticProps() {
    return { props: { title: 'پشتیبانی', layout: { header: true, bottomNav: true } } }
}

export default function RequestPage() {
    return (
        <Layout name='services'>
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
        </Layout>
    )
}