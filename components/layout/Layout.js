import { motion } from "framer-motion";


export default function Layout({ children, name }) {
    const variants = {
        hidden: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 },
    }
    return (
        <div id={name}>
            <motion.main
                initial="hidden"
                key={name}
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ type: 'linear' }}
            >
                {children}
            </motion.main>
        </div>
    )
}