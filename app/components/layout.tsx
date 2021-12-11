import React from 'react';
import { Nav } from './nav';

export const Layout = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  return (
    <>
      <Nav user={user} />
      <main className='pt-20 max-w-4xl mx-auto'>{children}</main>
    </>
  );
};
