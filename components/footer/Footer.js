import styles from './Footer.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { LocationPin, WhiteInstagram, WhiteMail, WhitePhone, WhiteWhatsapp } from '../microComponents/icons/Icons'

export function Footer() {

    const Title = (props) => {
        return (
            <div className={styles.title}>
                <div>{props.text}</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="259" height="3" viewBox="0 0 259 3">
                    <line id="Line_11" data-name="Line 11" x1="256" transform="translate(1.5 1.5)" fill="none" stroke="#e2e2e2" strokeLinecap="round" strokeWidth="3" />
                </svg>
            </div>
        )
    }
    const ContactData = props => {
        return (
            <div className={styles.contact}>
                {props.icon}
                <span>{props.text}</span>
            </div>
        )
    }
    return (
        <footer className={`${styles.container} global-container`}>
            <div className={styles.logo}>
                <Image
                    src={'/images/logo_white.png'}
                    width={1919}
                    height={2418}
                    alt={'white logo'}
                />
            </div>
            <div className={styles.leftContainer}>
                <div>
                    <Title text='اطلاعات تماس' />
                    <ContactData
                        icon={<LocationPin />}
                        text='لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با'
                    />
                    <ContactData
                        icon={<WhitePhone />}
                        text='0214060379'
                    />
                    <ContactData
                        icon={<WhiteMail />}
                        text='Doctorkhoone@gmail.com'
                    />
                    <ContactData
                        icon={<WhiteWhatsapp />}
                        text='0214060379'
                    />
                    <ContactData
                        icon={<WhiteInstagram />}
                        text='doctorkhoone'
                    />
                </div>
                <div>
                    <Title text='درباره ما' />
                    <div className={styles.about}>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با ستفاده از طراحان گرافیک است، چاپگرها  متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
                    </div>
                </div>
                <div className={styles.links}>
                    <Title text='دسترسی سریع' />
                    <Link href={''}>
                        <a>قوانین و مقررات</a>
                    </Link>
                    <Link href={''}>
                        <a>حریم خصوصی</a>
                    </Link>
                    <Link href={''}>
                        <a>معرفی به دوستان</a>
                    </Link>
                </div>
            </div>
        </footer>
    )
}