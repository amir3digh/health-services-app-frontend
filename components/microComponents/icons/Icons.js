import Image from "next/image"
import Link from "next/link"

export function Request() {
    return (
        <Link href='/requests'>
            <a>
                <svg xmlns="http://www.w3.org/2000/svg" width="21.987" height="26.854" viewBox="0 0 21.987 26.854">
                    <path id="assignment-o" d="M19.525,2.462a2.376,2.376,0,0,1,1.746.715,2.313,2.313,0,0,1,.716,1.689V24.45a2.31,2.31,0,0,1-.715,1.689,2.377,2.377,0,0,1-1.747.715H2.462a2.376,2.376,0,0,1-1.746-.715A2.313,2.313,0,0,1,0,24.45V4.867A2.31,2.31,0,0,1,.715,3.178a2.377,2.377,0,0,1,1.747-.715h5.1A3.756,3.756,0,0,1,8.9.688a3.522,3.522,0,0,1,4.18,0,3.761,3.761,0,0,1,1.345,1.775Zm-8.531,0a1.175,1.175,0,0,0-1.2,1.2,1.2,1.2,0,1,0,2.405,0,1.175,1.175,0,0,0-1.2-1.2ZM19.525,24.45V4.867h-2.4V8.531H4.867V4.867h-2.4V24.45H19.526Z" transform="translate(0 0)" fill="#f8f8f8" />
                </svg>
            </a>
        </Link>

    )
}
export function Logo() {
    return (
        <Link href='/'>
            <a>
                <Image
                    src='/icons/logo.png'
                    width={25}
                    height={24}
                    alt='logo'
                />
            </a>
        </Link>

    )
}
export function Menu() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20.5" viewBox="0 0 24 20.5">
            <g id="menu-right-alt" transform="translate(-6 -7.5)">
                <path id="Path_430" data-name="Path 430" d="M6,9A1.5,1.5,0,0,1,7.5,7.5h21a1.5,1.5,0,0,1,0,3H7.5A1.5,1.5,0,0,1,6,9Z" fill="#fff" />
                <path id="Path_431" data-name="Path 431" d="M6,27a1.5,1.5,0,0,1,1.5-1.5h21a1.5,1.5,0,0,1,0,3H7.5A1.5,1.5,0,0,1,6,27Z" transform="translate(0 -0.5)" fill="#fff" />
                <path id="Path_432" data-name="Path 432" d="M16.5,16.5a1.5,1.5,0,0,0,0,3h12a1.5,1.5,0,0,0,0-3Z" transform="translate(0 -0.25)" fill="#fff" />
            </g>
        </svg>
    )
}