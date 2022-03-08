import styles from '../styles/Posts.module.scss'

const pages = [
    { slug: 'aboutUs', title: 'درباره ما' },
    { slug: 'rules', title: 'قوانین و مقررات' },
    { slug: 'privacy', title: 'حریم شخصی' },
];
export async function getStaticPaths() {

    const paths = pages.map(el => {
        return {
            params: {
                posts: el.slug,
            }
        }
    });
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({ params }) {
    const slug = params.posts;
    const pageData = pages.filter(el => el.slug === slug)[0];
    return {
        props: {
            slug,
            layout: { header: true, bottomNav: true },
            title: pageData.title
        }
    }
}

export default function Posts(props) {

    return (
        <main>
            <div className="global-container">
                <h1 className={styles.h1}>{props.title}</h1>
                <p className={styles.text}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
            </div>
        </main>
    )
}