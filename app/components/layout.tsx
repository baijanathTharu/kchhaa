import React from 'react';
import { Nav } from './nav';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      <main className='pt-20 max-w-4xl mx-auto'>{children}</main>
    </>
  );
};
