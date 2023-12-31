import { NavLinks } from '@/shared/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AuthProviders from '../Auth/AuthProviders';
import { getCurrentUser } from '@/shared/lib/session';
import ShareProject from './ShareProject';

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className=" flexBetween navbar">
      <div className=" flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="Trickle" />
        </Link>
        <ul className=" xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className=" flexCenter gap-4">
        {session?.user ? <ShareProject session={session} /> : <AuthProviders />}
      </div>
    </nav>
  );
};

export default Navbar;
