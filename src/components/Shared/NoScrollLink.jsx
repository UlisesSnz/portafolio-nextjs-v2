'use client';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';

const NoScrollLink = ({ href, title, className }) => {
  const pathname = usePathname()
  const isSamePath = pathname === href;

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
