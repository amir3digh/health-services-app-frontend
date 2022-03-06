import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Notify from "../../components/microComponents/notify/Notify";
import { paymentVerificationRequest } from "../../lib/requests";

export function getStaticProps() {
    return { props: { title: 'دکترخونه - پرداخت', layout: { header: false, bottomNav: false } } }
}

export default function BankCallback() {
    const title = 'دکترخونه - پرداخت';

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ summary: '', detail: '' });

    const router = useRouter();

    useEffect(() => {
        const verifiedMsg = 'درخواست شما با موفقیت ثبت شد';
        const rejectMsg = 'درخواست شما ثبت نشد';
        const verifiedDetail = 'کارشناسان ما پس از بررسی درخواست شما، با شما تماس خواهند گرفت';
        const rejectDetail = 'برای ثبت یا پرداخت مجدد دوباره تلاش کنید';
        const { status, id, order_id } = router.query;

        const verifyPayment = async () => {
            const verifyData = { status, id, order_id };
            const response = await paymentVerificationRequest(verifyData);
            (response.status === 'ok') ? (
                setMessage({ summary: verifiedMsg, detail: verifiedDetail })
            ) : (
                setMessage({ summary: rejectMsg, detail: rejectDetail })
            )
        }
        if (status && id && order_id) {
            verifyPayment();
        } else {
            setMessage({ summary: 'صفحه نامعتبر', detail: '' });
        }
    }, [router]);

    return (
        <Notify
            title={title}
            message={message}
        />
    )
}