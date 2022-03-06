import Notify from "../components/microComponents/notify/Notify"

export function getStaticProps() {
    return { props: { title: 'خطای سرور', layout: { header: false, bottomNav: false } } }
}

export default function Custom500() {
    return (
        <Notify
            message={{
                summary: 'خطای سرور',
                detail: 'لطفا دوباره تلاش کنید'
            }}
        />
    )
}