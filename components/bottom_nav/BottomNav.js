import Link from 'next/link'
import styles from './BottomNav.module.scss'

export default function BottomNav() {
    return (
        <div className={styles.container + ' global-container'}>
            <Link href='/'>
                <a className={styles.navItems}>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40">
                        <defs>
                            <filter id="Path_515" x="-2.668" y="0.12" width="45.337" height="45.648" filterUnits="userSpaceOnUse">
                                <feOffset dy="3" input="SourceAlpha" />
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feFlood floodOpacity="0.161" />
                                <feComposite operator="in" in2="blur" />
                                <feComposite in="SourceGraphic" />
                            </filter>
                            <clipPath id="clip-Artboard_1">
                                <rect width="40" height="40" />
                            </clipPath>
                        </defs>
                        <g id="Artboard_1" data-name="Artboard – 1" clipPath="url(#clip-Artboard_1)">
                            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_515)">
                                <path id="Path_515-2" data-name="Path 515" d="M-105.9,158.259V145.971a1.172,1.172,0,0,1,.37-.85l10.877-10.345a1.3,1.3,0,0,1,1.744-.03l11.446,10.14a1.171,1.171,0,0,1,.4.881l-.011,12.492a1.231,1.231,0,0,1-1.258,1.2h-5.849a1.231,1.231,0,0,1-1.259-1.2v-7.488a1.231,1.231,0,0,0-.39-.869,1.231,1.231,0,0,0-.893-.331l-5.269.1a1.229,1.229,0,0,0-1.232,1.2v7.387a1.231,1.231,0,0,1-1.259,1.2h-6.161a1.23,1.23,0,0,1-1.256-1.2Z" transform="translate(113.48 -126.94)" fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="2.5" />
                            </g>
                        </g>
                    </svg>
                    <span>
                        خانه
                    </span>
                </a>
            </Link>

            <div className={styles.navItems}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40">
                    <defs>
                        <clipPath id="clip-Artboard_1">
                            <rect width="40" height="40" />
                        </clipPath>
                    </defs>
                    <g id="Artboard_1" data-name="Artboard – 1" clipPath="url(#clip-Artboard_1)">
                        <path id="assignment-o" d="M19.525,2.462a2.376,2.376,0,0,1,1.746.715,2.313,2.313,0,0,1,.716,1.689V24.45a2.31,2.31,0,0,1-.715,1.689,2.377,2.377,0,0,1-1.747.715H2.462a2.376,2.376,0,0,1-1.746-.715A2.313,2.313,0,0,1,0,24.45V4.867A2.31,2.31,0,0,1,.715,3.178a2.377,2.377,0,0,1,1.747-.715h5.1A3.756,3.756,0,0,1,8.9.688a3.522,3.522,0,0,1,4.18,0,3.761,3.761,0,0,1,1.345,1.775Zm-8.531,0a1.175,1.175,0,0,0-1.2,1.2,1.2,1.2,0,1,0,2.405,0,1.175,1.175,0,0,0-1.2-1.2ZM19.525,24.45V4.867h-2.4V8.531H4.867V4.867h-2.4V24.45H19.526Z" transform="translate(9.006 6.573)" fill="#fff" />
                    </g>
                </svg>
                <span>
                    درخواست ها
                </span>
            </div>
            <div className={styles.navItems}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40">
                    <defs>
                        <filter id="bx-support" x="-2.428" y="0.573" width="44.856" height="44.854" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feFlood floodOpacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                        <clipPath id="clip-Artboard_3">
                            <rect width="40" height="40" />
                        </clipPath>
                    </defs>
                    <g id="Artboard_1" data-name="Artboard – 1" clipPath="url(#clip-Artboard_1)">
                        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#bx-support)">
                            <path id="bx-support-2" data-name="bx-support" d="M16.427,3A13.442,13.442,0,0,0,3,16.427V21.99a2.6,2.6,0,0,0,2.685,2.494H7.028a1.343,1.343,0,0,0,1.343-1.343v-6.9a1.343,1.343,0,0,0-1.343-1.343H5.809a10.726,10.726,0,0,1,21.237,0h-1.22a1.343,1.343,0,0,0-1.343,1.343v8.248A2.688,2.688,0,0,1,21.8,27.169H19.113V25.826H13.742v4.028H21.8a5.376,5.376,0,0,0,5.371-5.371,2.6,2.6,0,0,0,2.685-2.493V16.427A13.442,13.442,0,0,0,16.427,3Z" transform="translate(3.57 3.57)" fill="#fff" />
                        </g>
                    </g>
                </svg>
                <span>
                    پشتیبانی
                </span>
            </div>
            <div className={styles.navItems}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 40 40">
                    <defs>
                        <filter id="Path_413" x="6.11" y="5.443" width="27.779" height="27.779" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feFlood floodOpacity="0.161" />
                            <feComposite operator="in" in2="blur" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                        <filter id="Path_414" x="-2.446" y="0.554" width="44.893" height="44.893" filterUnits="userSpaceOnUse">
                            <feOffset dy="3" input="SourceAlpha" />
                            <feGaussianBlur stdDeviation="3" result="blur-2" />
                            <feFlood floodOpacity="0.161" />
                            <feComposite operator="in" in2="blur-2" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                        <clipPath id="clip-Artboard_4">
                            <rect width="40" height="40" />
                        </clipPath>
                    </defs>
                    <g id="Artboard_1" data-name="Artboard – 1" clipPath="url(#clip-Artboard_1)">
                        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_413)">
                            <path id="Path_413-2" data-name="Path 413" d="M21.779,12.39A4.89,4.89,0,1,1,16.89,7.5,4.89,4.89,0,0,1,21.779,12.39Zm-2.445,0A2.445,2.445,0,1,1,16.89,9.945,2.445,2.445,0,0,1,19.334,12.39Z" transform="translate(3.11 3.94)" fill="#fff" fillRule="evenodd" />
                        </g>
                        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_414)">
                            <path id="Path_414-2" data-name="Path 414" d="M14.946,1.5A13.446,13.446,0,1,0,28.393,14.946,13.446,13.446,0,0,0,14.946,1.5Zm-11,13.446a10.957,10.957,0,0,0,2.332,6.774,11,11,0,0,1,17.418-.1A11,11,0,1,0,3.945,14.946Zm11,11a10.956,10.956,0,0,1-6.933-2.459,8.56,8.56,0,0,1,13.968-.083A10.957,10.957,0,0,1,14.946,25.948Z" transform="translate(5.05 5.05)" fill="#fff" fillRule="evenodd" />
                        </g>
                    </g>
                </svg>
                <span>
                    پروفایل
                </span>
            </div>
        </div>
    )
}