import React from 'react';
import { Form, Link } from 'remix';
import { ProfileActionData, ProfileLoaderData } from '~/routes/profile/$id';

export const ProfileForm = ({
  actionData,
  loaderData,
}: {
  actionData: ProfileActionData | undefined;
  loaderData: ProfileLoaderData | undefined;
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
    <Form
      method='post'
      aria-describedby={actionData?.formError ? 'form-error' : undefined}
    >
      <div className='grid grid-cols-1 gap-6 mt-4 max-w-sm'>
        <p id='form-error' className='text-red-400'>
          {actionData?.formError && (actionData?.formError as string)}
        </p>
        <div>
          <label className='text-gray-700' htmlFor='first_name'>
            First Name
          </label>
          <input
            name='first_name'
            type='text'
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none focus:ring'
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
          <label className='text-gray-700' htmlFor='last_name'>
            Last Name
          </label>
          <input
            name='last_name'
            type='text'
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none focus:ring'
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
          <label className='text-gray-700' htmlFor='description'>
            Description
          </label>
          <textarea
            name='description'
            className='block w-full h-40 px-4 py-2 resize-none text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
            defaultValue={loaderData?.data?.description as string}
          />

          <p id='description-error' className='text-red-400'>
            {actionData?.fieldErrors?.description &&
              (actionData?.fieldErrors?.description as string)}
          </p>
        </div>
      </div>

      <div className='mx-auto w-4/5 flex justify-between gap-8 mt-6'>
        <button
          type='submit'
          className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
        >
          Submit
        </button>
        <Link to={`/profile/${loaderData?.user_id}`}>
          <button className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-400 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'>
            Cancel
          </button>
        </Link>
      </div>
    </Form>
  );
};
