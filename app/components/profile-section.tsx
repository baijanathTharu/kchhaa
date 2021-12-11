import { KchhaaForm } from './kchhaa-form';

export const ProfileSection = ({
  fullName,
  email,
}: {
  fullName: string;
  email: string | undefined;
}) => {
  return (
    <>
      <div className='mx-2 mb-4 lg:mx-auto flex flex-col bg-white rounded-lg shadow-md'>
        <div className='h-80 bg-red-400 overflow-hidden'>
          <img src='/universe.jpg' alt='header image' />
        </div>
        <div className='mt-4 flex items-center'>
          <img
            className='hidden object-cover w-20 h-20 mx-4 rounded-full sm:block'
            src='https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80'
            alt='avatar'
          />
          <p className='flex flex-col font-semibold text-gray-700 cursor-pointer'>
            {fullName}
            <span className='text-gray-400 font-normal'>{email}</span>
          </p>
          <div className='ml-auto mr-8'>
            <button>kchhaa</button>
          </div>
        </div>
        <KchhaaForm />
      </div>
    </>
  );
};
