import { Button, Input, Modal, Typography } from "@/shared/ui";
import * as styles from "./auth.module.css";
import { useState } from "react";

const InlineLogo = () => (
    <svg
        width="266"
        height="61"
        viewBox="0 0 266 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Company Logo"
    >
        <path
            d="M32.8642 22.4545V37H30.2789V22.4545H32.8642ZM21.7349 37L26.3514 29.358L21.9977 22.4545H25.2292L28.6667 28.598H34.5403L37.921 22.4545H41.1383L36.8485 29.3509L41.4082 37H38.2903L34.9167 31.0412H28.2619L24.8244 37H21.7349ZM44.8936 41.0909C44.5433 41.0909 44.2189 41.0625 43.9206 41.0057C43.6271 40.9536 43.3927 40.892 43.2175 40.821L43.8141 38.8182C44.1882 38.9271 44.522 38.9792 44.8155 38.9744C45.1091 38.9697 45.3671 38.8774 45.5897 38.6974C45.8169 38.5223 46.0087 38.2287 46.165 37.8168L46.3851 37.2273L42.4292 26.0909H45.1564L47.6706 34.3295H47.7843L50.3056 26.0909H53.04L48.6721 38.321C48.4685 38.8987 48.1986 39.3935 47.8624 39.8054C47.5262 40.2221 47.1143 40.5393 46.6266 40.7571C46.1436 40.9796 45.566 41.0909 44.8936 41.0909ZM54.8191 41.0909V26.0909H57.3475V27.8949H57.4966C57.6292 27.6297 57.8162 27.348 58.0577 27.0497C58.2992 26.7467 58.6259 26.4886 59.0378 26.2756C59.4498 26.0578 59.9753 25.9489 60.6145 25.9489C61.4573 25.9489 62.2173 26.1643 62.8944 26.5952C63.5762 27.0213 64.1159 27.6534 64.5137 28.4915C64.9161 29.3248 65.1174 30.3475 65.1174 31.5597C65.1174 32.7576 64.9209 33.7756 64.5279 34.6136C64.1349 35.4517 63.5998 36.0909 62.9228 36.5312C62.2457 36.9716 61.4786 37.1918 60.6216 37.1918C59.9966 37.1918 59.4782 37.0876 59.0662 36.8793C58.6543 36.6709 58.3229 36.42 58.0719 36.1264C57.8257 35.8281 57.6339 35.5464 57.4966 35.2812H57.3901V41.0909H54.8191ZM57.3404 31.5455C57.3404 32.2509 57.4398 32.8688 57.6387 33.3991C57.8423 33.9295 58.1335 34.3437 58.5123 34.642C58.8958 34.9356 59.3598 35.0824 59.9043 35.0824C60.4725 35.0824 60.9483 34.9309 61.3319 34.6278C61.7154 34.3201 62.0042 33.901 62.1983 33.3707C62.3972 32.8357 62.4966 32.2273 62.4966 31.5455C62.4966 30.8684 62.3996 30.267 62.2054 29.7415C62.0113 29.2159 61.7225 28.804 61.339 28.5057C60.9554 28.2074 60.4772 28.0582 59.9043 28.0582C59.3551 28.0582 58.8887 28.2027 58.5051 28.4915C58.1216 28.7803 57.8304 29.1851 57.6316 29.706C57.4374 30.2268 57.3404 30.84 57.3404 31.5455ZM74.812 30.4801V32.5895H69.0023V30.4801H74.812ZM69.7978 26.0909V37H67.3191V26.0909H69.7978ZM76.4952 26.0909V37H74.0236V26.0909H76.4952ZM82.2356 37.2202C81.5443 37.2202 80.9217 37.0971 80.3677 36.8509C79.8185 36.5999 79.3829 36.2306 79.0609 35.7429C78.7437 35.2552 78.585 34.6539 78.585 33.9389C78.585 33.3234 78.6987 32.8144 78.926 32.4119C79.1532 32.0095 79.4634 31.6875 79.8564 31.446C80.2493 31.2045 80.6921 31.0223 81.1845 30.8991C81.6816 30.7713 82.1954 30.679 82.7257 30.6222C83.3649 30.5559 83.8833 30.4967 84.2811 30.4446C84.6788 30.3878 84.9676 30.3026 85.1475 30.1889C85.3322 30.0705 85.4245 29.8883 85.4245 29.642V29.5994C85.4245 29.0644 85.2659 28.6501 84.9487 28.3565C84.6315 28.063 84.1745 27.9162 83.5779 27.9162C82.9482 27.9162 82.4487 28.0535 82.0794 28.3281C81.7148 28.6027 81.4686 28.9271 81.3407 29.3011L78.9402 28.9602C79.1296 28.2973 79.4421 27.7434 79.8777 27.2983C80.3133 26.8485 80.8459 26.5123 81.4757 26.2898C82.1054 26.0625 82.8014 25.9489 83.5637 25.9489C84.0893 25.9489 84.6125 26.0104 85.1333 26.1335C85.6542 26.2566 86.13 26.4602 86.5609 26.7443C86.9918 27.0237 87.3374 27.4048 87.5978 27.8878C87.863 28.3707 87.9956 28.9744 87.9956 29.6989V37H85.524V35.5014H85.4387C85.2825 35.8045 85.0623 36.0885 84.7782 36.3537C84.4989 36.6141 84.1461 36.8248 83.72 36.9858C83.2986 37.142 82.8038 37.2202 82.2356 37.2202ZM82.9032 35.331C83.4193 35.331 83.8668 35.2292 84.2456 35.0256C84.6243 34.8172 84.9155 34.5426 85.1191 34.2017C85.3275 33.8608 85.4316 33.4891 85.4316 33.0866V31.8011C85.3511 31.8674 85.2138 31.929 85.0197 31.9858C84.8303 32.0426 84.6172 32.0923 84.3805 32.1349C84.1438 32.1776 83.9094 32.2154 83.6774 32.2486C83.4454 32.2817 83.2441 32.3101 83.0737 32.3338C82.6902 32.3859 82.3469 32.4711 82.0439 32.5895C81.7408 32.7079 81.5017 32.8736 81.3265 33.0866C81.1513 33.295 81.0637 33.5649 81.0637 33.8963C81.0637 34.3698 81.2366 34.7273 81.5822 34.9688C81.9279 35.2102 82.3682 35.331 82.9032 35.331ZM89.8279 37L89.8137 34.8835H90.1902C90.4743 34.8835 90.7134 34.8196 90.9075 34.6918C91.1016 34.5639 91.2626 34.3509 91.3904 34.0526C91.5183 33.7495 91.6177 33.3423 91.6887 32.831C91.7598 32.3196 91.8095 31.6828 91.8379 30.9205L92.0297 26.0909H99.9842V37H97.4984V28.2003H94.3663L94.1958 31.7159C94.1532 32.625 94.0514 33.4134 93.8904 34.081C93.7342 34.7438 93.5117 35.2907 93.2228 35.7216C92.9387 36.1525 92.5813 36.4744 92.1504 36.6875C91.7195 36.8958 91.2105 37 90.6234 37H89.8279ZM161.579 24.6634V22.4545H173.184V24.6634H168.688V37H166.074V24.6634H161.579ZM174.175 41.0909V26.0909H176.703V27.8949H176.852C176.985 27.6297 177.172 27.348 177.413 27.0497C177.655 26.7467 177.981 26.4886 178.393 26.2756C178.805 26.0578 179.331 25.9489 179.97 25.9489C180.813 25.9489 181.573 26.1643 182.25 26.5952C182.932 27.0213 183.471 27.6534 183.869 28.4915C184.272 29.3248 184.473 30.3475 184.473 31.5597C184.473 32.7576 184.276 33.7756 183.883 34.6136C183.49 35.4517 182.955 36.0909 182.278 36.5312C181.601 36.9716 180.834 37.1918 179.977 37.1918C179.352 37.1918 178.834 37.0876 178.422 36.8793C178.01 36.6709 177.678 36.42 177.427 36.1264C177.181 35.8281 176.989 35.5464 176.852 35.2812H176.746V41.0909H174.175ZM176.696 31.5455C176.696 32.2509 176.795 32.8688 176.994 33.3991C177.198 33.9295 177.489 34.3437 177.868 34.642C178.251 34.9356 178.715 35.0824 179.26 35.0824C179.828 35.0824 180.304 34.9309 180.687 34.6278C181.071 34.3201 181.36 33.901 181.554 33.3707C181.753 32.8357 181.852 32.2273 181.852 31.5455C181.852 30.8684 181.755 30.267 181.561 29.7415C181.367 29.2159 181.078 28.804 180.694 28.5057C180.311 28.2074 179.833 28.0582 179.26 28.0582C178.711 28.0582 178.244 28.2027 177.861 28.4915C177.477 28.7803 177.186 29.1851 176.987 29.706C176.793 30.2268 176.696 30.84 176.696 31.5455ZM191.504 37.2131C190.41 37.2131 189.466 36.9858 188.67 36.5312C187.88 36.072 187.271 35.4233 186.845 34.5852C186.419 33.7424 186.206 32.7505 186.206 31.6094C186.206 30.4872 186.419 29.5024 186.845 28.6548C187.276 27.8026 187.877 27.1397 188.649 26.6662C189.421 26.188 190.327 25.9489 191.369 25.9489C192.041 25.9489 192.676 26.0578 193.273 26.2756C193.874 26.4886 194.404 26.8201 194.863 27.2699C195.327 27.7197 195.692 28.2926 195.957 28.9886C196.222 29.6799 196.355 30.5038 196.355 31.4602V32.2486H187.413V30.5156H193.89C193.886 30.0232 193.779 29.5852 193.571 29.2017C193.363 28.8134 193.071 28.508 192.697 28.2855C192.328 28.063 191.897 27.9517 191.405 27.9517C190.879 27.9517 190.417 28.0795 190.02 28.3352C189.622 28.5862 189.312 28.9176 189.089 29.3295C188.872 29.7367 188.76 30.1842 188.756 30.6719V32.1847C188.756 32.8191 188.872 33.3636 189.104 33.8182C189.336 34.268 189.66 34.6136 190.077 34.8551C190.493 35.0919 190.981 35.2102 191.54 35.2102C191.914 35.2102 192.252 35.1581 192.555 35.054C192.858 34.9451 193.121 34.7865 193.344 34.5781C193.566 34.3698 193.734 34.1117 193.848 33.804L196.248 34.0739C196.097 34.7083 195.808 35.2623 195.382 35.7358C194.961 36.2045 194.421 36.5691 193.763 36.8295C193.104 37.0852 192.352 37.2131 191.504 37.2131ZM206.023 30.4801V32.5895H200.213V30.4801H206.023ZM201.009 26.0909V37H198.53V26.0909H201.009ZM207.706 26.0909V37H205.235V26.0909H207.706ZM215.137 37.2131C214.043 37.2131 213.099 36.9858 212.303 36.5312C211.512 36.072 210.904 35.4233 210.478 34.5852C210.052 33.7424 209.839 32.7505 209.839 31.6094C209.839 30.4872 210.052 29.5024 210.478 28.6548C210.909 27.8026 211.51 27.1397 212.282 26.6662C213.054 26.188 213.96 25.9489 215.002 25.9489C215.674 25.9489 216.309 26.0578 216.905 26.2756C217.507 26.4886 218.037 26.8201 218.496 27.2699C218.96 27.7197 219.325 28.2926 219.59 28.9886C219.855 29.6799 219.988 30.5038 219.988 31.4602V32.2486H211.046V30.5156H217.523C217.519 30.0232 217.412 29.5852 217.204 29.2017C216.995 28.8134 216.704 28.508 216.33 28.2855C215.961 28.063 215.53 27.9517 215.037 27.9517C214.512 27.9517 214.05 28.0795 213.653 28.3352C213.255 28.5862 212.945 28.9176 212.722 29.3295C212.504 29.7367 212.393 30.1842 212.388 30.6719V32.1847C212.388 32.8191 212.504 33.3636 212.736 33.8182C212.968 34.268 213.293 34.6136 213.709 34.8551C214.126 35.0919 214.614 35.2102 215.172 35.2102C215.546 35.2102 215.885 35.1581 216.188 35.054C216.491 34.9451 216.754 34.7865 216.976 34.5781C217.199 34.3698 217.367 34.1117 217.481 33.804L219.881 34.0739C219.73 34.7083 219.441 35.2623 219.015 35.7358C218.593 36.2045 218.054 36.5691 217.395 36.8295C216.737 37.0852 215.984 37.2131 215.137 37.2131ZM222.163 41.0909V26.0909H224.691V27.8949H224.84C224.973 27.6297 225.16 27.348 225.401 27.0497C225.643 26.7467 225.97 26.4886 226.382 26.2756C226.794 26.0578 227.319 25.9489 227.958 25.9489C228.801 25.9489 229.561 26.1643 230.238 26.5952C230.92 27.0213 231.46 27.6534 231.857 28.4915C232.26 29.3248 232.461 30.3475 232.461 31.5597C232.461 32.7576 232.265 33.7756 231.872 34.6136C231.479 35.4517 230.944 36.0909 230.267 36.5312C229.589 36.9716 228.822 37.1918 227.965 37.1918C227.34 37.1918 226.822 37.0876 226.41 36.8793C225.998 36.6709 225.667 36.42 225.416 36.1264C225.169 35.8281 224.978 35.5464 224.84 35.2812H224.734V41.0909H222.163ZM224.684 31.5455C224.684 32.2509 224.784 32.8688 224.982 33.3991C225.186 33.9295 225.477 34.3437 225.856 34.642C226.24 34.9356 226.704 35.0824 227.248 35.0824C227.816 35.0824 228.292 34.9309 228.676 34.6278C229.059 34.3201 229.348 33.901 229.542 33.3707C229.741 32.8357 229.84 32.2273 229.84 31.5455C229.84 30.8684 229.743 30.267 229.549 29.7415C229.355 29.2159 229.066 28.804 228.683 28.5057C228.299 28.2074 227.821 28.0582 227.248 28.0582C226.699 28.0582 226.232 28.2027 225.849 28.4915C225.465 28.7803 225.174 29.1851 224.975 29.706C224.781 30.2268 224.684 30.84 224.684 31.5455ZM237.802 37.2202C237.111 37.2202 236.488 37.0971 235.934 36.8509C235.385 36.5999 234.949 36.2306 234.627 35.7429C234.31 35.2552 234.151 34.6539 234.151 33.9389C234.151 33.3234 234.265 32.8144 234.492 32.4119C234.72 32.0095 235.03 31.6875 235.423 31.446C235.816 31.2045 236.258 31.0223 236.751 30.8991C237.248 30.7713 237.762 30.679 238.292 30.6222C238.931 30.5559 239.45 30.4967 239.847 30.4446C240.245 30.3878 240.534 30.3026 240.714 30.1889C240.899 30.0705 240.991 29.8883 240.991 29.642V29.5994C240.991 29.0644 240.832 28.6501 240.515 28.3565C240.198 28.063 239.741 27.9162 239.144 27.9162C238.515 27.9162 238.015 28.0535 237.646 28.3281C237.281 28.6027 237.035 28.9271 236.907 29.3011L234.507 28.9602C234.696 28.2973 235.008 27.7434 235.444 27.2983C235.88 26.8485 236.412 26.5123 237.042 26.2898C237.672 26.0625 238.368 25.9489 239.13 25.9489C239.656 25.9489 240.179 26.0104 240.7 26.1335C241.221 26.2566 241.696 26.4602 242.127 26.7443C242.558 27.0237 242.904 27.4048 243.164 27.8878C243.429 28.3707 243.562 28.9744 243.562 29.6989V37H241.09V35.5014H241.005C240.849 35.8045 240.629 36.0885 240.345 36.3537C240.065 36.6141 239.713 36.8248 239.286 36.9858C238.865 37.142 238.37 37.2202 237.802 37.2202ZM238.47 35.331C238.986 35.331 239.433 35.2292 239.812 35.0256C240.191 34.8172 240.482 34.5426 240.686 34.2017C240.894 33.8608 240.998 33.4891 240.998 33.0866V31.8011C240.918 31.8674 240.78 31.929 240.586 31.9858C240.397 32.0426 240.184 32.0923 239.947 32.1349C239.71 32.1776 239.476 32.2154 239.244 32.2486C239.012 32.2817 238.811 32.3101 238.64 32.3338C238.257 32.3859 237.913 32.4711 237.61 32.5895C237.307 32.7079 237.068 32.8736 236.893 33.0866C236.718 33.295 236.63 33.5649 236.63 33.8963C236.63 34.3698 236.803 34.7273 237.149 34.9688C237.494 35.2102 237.935 35.331 238.47 35.331Z"
            fill="url(#paint0_linear_3946_223)"
        />
        <path
            d="M102.089 18.9751V12.6364H131.954V18.9751H120.821V49H113.222V18.9751H102.089ZM146.891 12.6364H154.491V37.9915C154.491 40.3352 153.964 42.3712 152.91 44.0994C151.869 45.8277 150.419 47.1593 148.56 48.0945C146.702 49.0296 144.541 49.4972 142.079 49.4972C139.889 49.4972 137.901 49.1125 136.113 48.343C134.338 47.5618 132.929 46.3781 131.888 44.7919C130.846 43.1939 130.331 41.1875 130.343 38.7727H137.995C138.019 39.7315 138.214 40.5542 138.581 41.2408C138.96 41.9155 139.475 42.4363 140.126 42.8033C140.789 43.1584 141.57 43.3359 142.47 43.3359C143.417 43.3359 144.216 43.1347 144.867 42.7322C145.53 42.3179 146.033 41.7143 146.376 40.9212C146.719 40.1281 146.891 39.1515 146.891 37.9915V12.6364Z"
            fill="url(#paint1_linear_3946_223)"
        />
        <defs>
            <linearGradient
                id="paint0_linear_3946_223"
                x1="0"
                y1="30"
                x2="266"
                y2="30"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#24397E" />
                <stop offset="0.5" stop-color="#335EEB" />
                <stop offset="1" stop-color="#24397E" />
            </linearGradient>
            <linearGradient
                id="paint1_linear_3946_223"
                x1="100"
                y1="30.5"
                x2="158"
                y2="30.5"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#24397E" />
                <stop offset="0.5" stop-color="#335EEB" />
                <stop offset="1" stop-color="#24397E" />
            </linearGradient>
        </defs>
    </svg>
);

export const Auth = () => {
    const [firstModal, setFirstModal] = useState<boolean>(false);
    const [secondModal, setSecondModal] = useState<boolean>(false);

    const handleFirstModal = () => {
        setSecondModal(false);
        setFirstModal(true);
    };

    const handleSecondModal = () => {
        setFirstModal(false);
        setSecondModal(true);
    };

    return (
        <>
            <div className={styles.container}>
                <div className="mb-[30px]">
                    <InlineLogo />
                </div>
                <form className={styles.form}>
                    <Input type="text" label="Логин" />
                    <Input type="password" label="Пароль" />
                    <Button type="submit">Войти</Button>
                </form>
                <Typography variant="text_12_r" tag="span">
                    Забыли пароль?
                    <Button variant="empty" className="p-0" onClick={handleFirstModal}>
                        Восстановить
                    </Button>
                </Typography>
            </div>
            <Modal visible={firstModal} onClose={() => setFirstModal(false)}>
                <form className="flex flex-col gap-y-[20px] p-[14px]">
                    <Typography variant="text_20_b" tag="p" className="text-blue-dark">
                        Восстановить пароль
                    </Typography>
                    <Input type="email" label="Почта" />
                    <Button variant="primary" type="button" onClick={handleSecondModal}>
                        Отправить код
                    </Button>
                </form>
            </Modal>
            <Modal visible={secondModal} onClose={() => setSecondModal(false)}>
                <form className="flex flex-col gap-y-[20px] p-[14px]">
                    <Typography variant="text_20_b" tag="p" className="text-blue-dark">
                        Восстановить пароль
                    </Typography>
                    <Input type="text" label="Логин" />
                    <Input type="text" label="Код" />
                    <Button type="button">Подтвердить</Button>
                    <Button variant="empty" type="button">
                        Отпавить код заново
                    </Button>
                </form>
            </Modal>
        </>
    );
};