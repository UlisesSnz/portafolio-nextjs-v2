'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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