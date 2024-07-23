import { useRouter } from 'next/router';
import Link from 'next/link';

const NoScrollLink = ({ href, title, className }) => {
  const router = useRouter();
  const isSamePath = router.pathname === href;

  return (
    <Link
      href={href}
      scroll={isSamePath}
      className={className}
    >
      {title}
    </Link>
  );
}

export default NoScrollLink;
