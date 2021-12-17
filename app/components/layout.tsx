import React from 'react';
import { FaLockOpen, FaUser } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';
import { Form, Link } from 'remix';
import { useAuth } from '~/contexts/auth';
import { useTheme } from '~/contexts/theme';
import { themes } from '~/themes';
import { Drawer, useDrawer } from './drawer';
import { Nav } from './nav';
import { Select } from './select';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useDrawer();
  return (
    <>
      <Drawer right={false} isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className='text-lg font-bold mb-10 text-center'>
          <Link to='/' className='text-primary font-bold'>
            kchhaa
          </Link>
        </h2>
        <Login />
      </Drawer>
      <Nav />
      <main className='max-w-4xl mx-auto'>{children}</main>
    </>
  );
};

// component to show login and logout
const Login = () => {
  const { data } = useAuth();
  const theme = useTheme();

  React.useEffect(() => {
    const themeName = theme?.theme?.name;
    if (themeName) {
      localStorage.setItem('theme', themeName);
      document.body.setAttribute('data-theme', themeName);
    }
  }, [theme?.theme?.name]);

  return (
    <>
      {data?.user?.email ? (
        <div className='flex flex-col gap-4'>
          <Link
            className='flex justify-center items-center hover:opacity-75'
            to={`/profile/${data.user.sub}`}
          >
            <FaUser className='w-4 h-4 mx-2' />
            Your Profile
          </Link>
          <Form action='/logout' method='post'>
            <button
              type='submit'
              className='btn btn-outline btn-secondary w-full'
            >
              <MdLock className='w-4 h-4 mx-2' />
              Logout
            </button>
          </Form>
        </div>
      ) : (
        <Link to='login'>
          <button className='btn btn-primary w-full'>
            <FaLockOpen className='w-4 h-4 mx-2 animate-bounce' />
            Login
          </button>
        </Link>
      )}
      <div className='mt-auto'>
        <Select
          options={themes}
          title='select themes'
          onChange={(e) => {
            console.log('changed');
            const value = e.target.value;
            theme?.setTheme({
              name: value,
              value: value,
            });
          }}
          defaultValue={theme?.theme?.name}
        />
      </div>
    </>
  );
};
