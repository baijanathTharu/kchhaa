import { Link } from 'remix';
import { useAuth } from '~/contexts/auth';

export const Nav = () => {
  const { data } = useAuth();

  return (
    <nav className='bg-white shadow fixed top-0 left-0 right-0'>
      <div className='container max-w-4xl flex items-center justify-center p-6 mx-auto text-gray-600 capitalize'>
        <Link to='/' className='text-red-500 font-bold'>
          kchhaa
        </Link>

        {data?.user ? (
          <>
            <div className='ml-auto border-b-2 border-transparent hover:text-gray-800 hover:border-blue-500'>
              <Link to={`/profile/${data.user.sub}`}>Your Profile</Link>
            </div>
            <div className='ml-4 border-b-2 border-transparent hover:text-gray-800 hover:border-blue-500'>
              <form action='/logout' method='post'>
                <button type='submit' className='button'>
                  Logout
                </button>
              </form>
            </div>
          </>
        ) : (
          <Link
            className='ml-auto border-b-2 border-transparent hover:text-gray-800 hover:border-blue-500'
            to='login'
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
