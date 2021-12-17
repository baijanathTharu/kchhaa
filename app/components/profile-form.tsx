import type { Transition } from '@remix-run/react/transition';
import React from 'react';
import { Form, Link } from 'remix';
import { ProfileActionData, ProfileLoaderData } from '~/routes/profile/$id';

export const ProfileForm = ({
  actionData,
  loaderData,
  transition,
}: {
  actionData: ProfileActionData | undefined;
  loaderData: ProfileLoaderData | undefined;
  transition: Transition;
}) => {
  const [firstName, setFirstName] = React.useState(
    loaderData?.data?.first_name
  );
  const [lastName, setLastName] = React.useState(loaderData?.data?.last_name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'first_name') {
      setFirstName(value);
    }
    if (name === 'last_name') {
      setLastName(value);
    }
  };

  return (
    <div className='bg-primary rounded-lg p-10'>
      <Form
        method='post'
        aria-describedby={actionData?.formError ? 'form-error' : undefined}
      >
        <h2 className='text-lg font-bold text-center'>Edit Profile</h2>

        <div className='grid grid-cols-1 gap-6 mt-4 max-w-sm text-primary-content'>
          <p id='form-error' className='text-error'>
            {actionData?.formError && (actionData?.formError as string)}
          </p>
          <div>
            <label className='' htmlFor='first_name'>
              First Name
            </label>
            <input
              name='first_name'
              type='text'
              className='block w-full px-4 py-2 mt-2  bg-white border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none focus:ring'
              value={firstName}
              onChange={(e) => handleChange(e)}
              placeholder='First Name'
            />
            <p id='first_name-error' className='text-red-400'>
              {actionData?.fieldErrors?.first_name &&
                (actionData?.fieldErrors?.first_name as string)}
            </p>
          </div>
          <div>
            <label className='' htmlFor='last_name'>
              Last Name
            </label>
            <input
              name='last_name'
              type='text'
              className='block w-full px-4 py-2 mt-2  bg-white border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none focus:ring'
              value={lastName}
              onChange={(e) => handleChange(e)}
              placeholder='Last Name'
            />
            <p id='last_name-error' className='text-red-400'>
              {actionData?.fieldErrors?.last_name &&
                (actionData?.fieldErrors?.last_name as string)}
            </p>
          </div>
          <div>
            <label className='' htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              className='block w-full h-40 px-4 py-2 resize-none  bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
              defaultValue={loaderData?.data?.description as string}
            />

            <p id='description-error' className='text-red-400'>
              {actionData?.fieldErrors?.description &&
                (actionData?.fieldErrors?.description as string)}
            </p>
          </div>
        </div>

        <div className='w-full grid grid-cols-2 mt-6 gap-2'>
          <button type='submit' className='btn btn-secondary'>
            {transition.state === 'submitting' ? 'Submitting' : 'Submit'}
          </button>
          <button className='btn btn-neutral btn-outline'>
            <Link to={`/profile/${loaderData?.user_id}`} className='flex-1'>
              Cancel
            </Link>
          </button>
        </div>
      </Form>
    </div>
  );
};
