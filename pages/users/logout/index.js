import { removeCookies } from "cookies-next";
import Link from "next/link";
import { useEffect } from "react";
import Notify from "../../../components/microComponents/notify/Notify";


export default function Logout() {
    useEffect(() => {
        removeCookies('jwtToken');
    }, [])
    return (
        <Notify
            title='خروج'
            message={{
                summary: 'با موفقیت خارج شدید',
                detail:
                    (<Link href='/users'>
                        <a>برای ورود مجدد کلیک کنید</a>
                    </Link>)
            }}
        />
    )
}