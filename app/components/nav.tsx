import React from 'react';
import { Link } from 'remix';
import { MdLock } from 'react-icons/md';
import { FaLockOpen, FaUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAuth } from '~/contexts/auth';
import { useTheme } from '~/contexts/theme';
import { themes } from '~/themes';
import { Select } from './select';

export function Nav() {
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
    <div className='navbar mb-2 shadow-lg bg-neutral text-neutral-content'>
      <div className='max-w-4xl w-full mx-auto'>
        <div className='flex-1 px-2 mx-2'>
          <span className='text-lg font-bold'>
            <Link to='/' className='text-primary font-bold'>
              kchhaa
            </Link>
          </span>
        </div>
        <div className='flex-none hidden px-2 mx-2 lg:flex'>
          <div className='flex justify-center items-center gap-2'>
            {data?.user?.email ? (
              <>
                <Link
                  className='flex justify-center items-center hover:opacity-75'
                  to={`/profile/${data.user.sub}`}
                >
                  <FaUser className='w-4 h-4 mx-2' />
                  Your Profile
                </Link>
                <form action='/logout' method='post'>
                  <button type='submit' className='btn'>
                    <MdLock className='w-4 h-4 mx-2' />
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link className='' to='login'>
                <button className='btn btn-primary'>
                  <FaLockOpen className='w-4 h-4 mx-2' />
                  Login
                </button>
              </Link>
            )}
            <div className='ml-5'>
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
          </div>
        </div>
        <div className='flex-none lg:hidden'>
          <GiHamburgerMenu className='w-4 h-4' />
        </div>
      </div>
    </div>
  );
}
