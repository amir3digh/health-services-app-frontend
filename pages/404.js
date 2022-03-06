import Notify from "../components/microComponents/notify/Notify"

export function getStaticProps() {
    return { props: { title: 'خطای 404', layout: { header: false, bottomNav: false } } }
}

export default function Custom404() {
    return (
        <Notify
            message={{
                summary: 'صفحه مورد نظر یافت نشد',
                detail: ''
            }}
        />
    )
}