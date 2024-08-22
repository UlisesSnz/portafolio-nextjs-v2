import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CustomLink = ({href, title, className=""}) => {
    const pathname = usePathname()
    const isSamePath = pathname === href;

    const handleClick = () => {
        if(isSamePath) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return(
        <Link href={href} scroll={isSamePath} className={`${className} relative group`} onClick={handleClick}>
            {title}

            <span className={`
                h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5
                group-hover:w-full transition-[width] ease duration-300
                ${isSamePath ? 'w-full' : 'w-0'}
                dark:bg-light
                `}
            >
                &nbsp;
            </span>
        </Link>
    )
}

export default CustomLink;