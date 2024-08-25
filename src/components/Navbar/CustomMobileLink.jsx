import { usePathname, useRouter } from 'next/navigation';

const CustomMobileLink = ({href, title, className="", toggle}) => {
    const router = useRouter()
    const pathname = usePathname()
    const isSamePath = pathname === href;
    
    const handleClick = () => {
        toggle();
        router.push(href);
    }

    return(
        <button href={href} className={`${className} relative group text-light dark:text-dark my-2`} onClick={handleClick}>
            {title}
            <span
                className={`
                    h-[1px] inline-block bg-light absolute left-0 -bottom-0.5
                    group-hover:w-full transition-[width] ease duration-300
                    ${isSamePath ? 'w-full' : 'w-0'}
                    dark:bg-dark
                `}
            >
                &nbsp;
            </span>
        </button>
    )
}

export default CustomMobileLink;