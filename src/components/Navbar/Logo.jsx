import { Link } from '@/i18n/navigation';

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <Link
        href="/"
        className="text-dark dark:text-light flex items-center justify-center text-2xl font-bold"
      >
        US
      </Link>
    </div>
  )
}

export default Logo;
