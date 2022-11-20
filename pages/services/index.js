import Image from 'next/image'
import styles from '../../styles/Services.module.scss'
import Link from 'next/link'
import { servicesRequest } from '../../lib/requests'
import Layout from '../../components/layout/Layout'
import Carousel from 'react-bootstrap/Carousel';

// import { className, styles } from '../../styles/Services.styles'

export async function getStaticProps() {
    const response = await servicesRequest();
    return response.status === 'ok' ?
        {
            props:
            {
                servicesData: response.result,
                title: 'دکترخونه',
                layout: { header: true, footer: true, bottomNav: true }
            }
        }
        : 'error';
}

export default function Services({ servicesData }) {
    return (
        <Layout name='services'>
            <section className={styles.banner}>
                <div className={styles.bannerTitle}>دکتر خونه</div>
                <div className={styles.bannerImg}>
                    <Image
                        width={397.72}
                        height={162.25}
                        src='/images/home_page_header.svg'
                        alt='doctor services'
                    />
                </div>
            </section>
            <section className={styles.carousel}>
                <Carousel >
                    <Carousel.Item bsPrefix={`${styles.carouselBody} `}>
                        <div className={styles.carouselBodyChild}>
                            <div>
                                <Image
                                    src='/images/logo_textless.png'
                                    width='130'
                                    height='130'
                                    alt='doctorkhoneh logo'
                                />
                                <h2>درخواست آسان خدمات پزشکی در منزل</h2>
                            </div>
                        </div>
                        <div className={styles.carouselBodyChild}>
                            <Image
                                src='/images/services/carousel_1.svg'
                                width='516'
                                height='426.073'
                                alt='carousel'
                            />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className={styles.carouselBody}>
                            <div className={styles.carouselBodyChild}>
                                <div>
                                    <Image
                                        src='/images/logo_textless.png'
                                        width='130'
                                        height='130'
                                        alt='doctorkhoneh logo'
                                    />
                                    <h2>درخواست آسان خدمات پزشکی در منزل</h2>
                                </div>
                            </div>
                            <div className={styles.carouselBodyChild}>
                                <Image
                                    src='/images/services/carousel_1.svg'
                                    width='516'
                                    height='426.073'
                                    alt='carousel'
                                />
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="14.199" height="25.023" viewBox="0 0 14.199 25.023">
                    <path id="chevron-back" d="M12.938,7.875,23.063,18,12.938,28.125" transform="translate(-10.552 -5.489)" fill="none" stroke="#117c6f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.375" />
                </svg>
                <div className={styles.carouselBody}>
                    <div className={styles.carouselBodyChild}>
                        <div>
                            <Image
                                src='/images/logo_textless.png'
                                width='130'
                                height='130'
                                alt='doctorkhoneh logo'
                            />
                            <h2>درخواست آسان خدمات پزشکی در منزل</h2>
                        </div>
                    </div>
                    <div className={styles.carouselBodyChild}>
                        <Image
                            src='/images/services/carousel_1.svg'
                            width='516'
                            height='426.073'
                            alt='carousel'
                        />
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="13.196" height="25.017" viewBox="0 0 13.196 25.017">
                    <path id="chevron-back" d="M22.063,7.875,12.938,18l9.125,10.125" transform="translate(-11.251 -5.492)" fill="none" stroke="#117c6f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.375" />
                </svg> */}
            </section>
            <section className={`${styles.services} global-container`}>
                <h2 className={styles.servicesTitle}>خدمات پزشکی دکترخونه</h2>
                {servicesData.map((el) => {
                    const small = (el.icon_size === 'small');
                    const slug = el.slug;
                    return (
                        <Link href={'/services' + '/' + el.slug} key={el.id}>
                            <a className={small ? styles.servicesItemSmall : styles.servicesItemBig}>
                                <div className={styles.link}>
                                    {small ? <div className={styles.fixTitle}>خدمات</div> : ''}
                                    <div className={styles.serviceTitle}>{el.title}</div>
                                </div>
                                <div className={styles.serviceIcon}>
                                    <Image
                                        width={60}
                                        height={60}
                                        src={'/images/services/' + slug + '.svg'}
                                        alt='service icon'
                                    />
                                </div>
                            </a>
                        </Link>
                    )
                }
                )}
            </section>
            <section className={`global-container ${styles.illustraionContainer}`}>
                <div>
                    <h2>مزیت های دریافت خدمات پزشکی در منزل</h2>
                    <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با ستفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
                        خلاقی، و فرهنگ پیشرو در زبان فارسی
                    </p>
                </div>
                <div>
                    <Image
                        src='/images/services/medical_illustration_1.svg'
                        width='535'
                        height='345'
                        alt='medical illustration'
                    />
                </div>
            </section>
            <section className={styles.explainContainer}>
                <div className={`global-container ${styles.explain}`}>
                    <div className={styles.explainBox}></div>
                    <div className={styles.explainBox}></div>
                    <div className={styles.explainBox}></div>
                </div>
                <div className={`global-container`}>
                    <h2 className={styles.contactTitle}>با ما در تماس باشید</h2>
                    <div className={styles.contactContainer}>

                    </div>
                </div>
            </section>
        </Layout>
    )
}