import { Form, useActionData, useLoaderData } from 'remix';
import type { LoaderFunction, ActionFunction } from 'remix';
import { Posts } from '~/components/posts';
import { ProfileSection } from '~/components/profile-section';
import db from '~/utils/db.server';
import { getUser, setAuthToken } from '~/utils/session.server';
import invariant from 'tiny-invariant';

type LoaderData = {
  data?: {
    first_name: string;
    last_name: string;
    description: string | null;
  };
  user_id: string;
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<Response | LoaderData> => {
  invariant(params.id, 'Expected params.id');
  const user_id = params.id;

  let { data: profiles, error } = await db
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    throw new Response(error.message, { status: 500 });
  }

  return {
    data: profiles,
    user_id,
  };
};

type ActionData = {
  formError?: string;
  fieldErrors?: {
    first_name: string | undefined;
    last_name: string | undefined;
  };
  data?: {
    first_name: string;
    last_name: string;
    description: string | null;
  };
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  const formData = await request.formData();

  const first_name = formData.get('first_name');
  const last_name = formData.get('last_name');
  const user_id = formData.get('user_id');

  if (
    first_name === '' ||
    last_name === '' ||
    typeof first_name !== 'string' ||
    typeof last_name !== 'string'
  ) {
    return {
      formError: 'Please fill out all the fields.',
    };
  }
  await setAuthToken(request);
  const { data, error } = await db
    .from('profiles')
    .insert([
      {
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        id: user_id,
      },
    ])
    .single();

  if (error) {
    return {
      formError: `Something went wrong. ${error.message}`,
    };
  }

  return { data };
};

export default function Profile() {
  const profileData = useLoaderData<LoaderData>();

  const actionData = useActionData<ActionData>();

  console.log('actionData', actionData);

  const fullName =
    profileData.data?.first_name + ' ' + profileData.data?.last_name;
  return (
    <>
      <Form
        method='post'
        aria-describedby={actionData?.formError ? 'form-error' : undefined}
      >
        <input type='hidden' name='user_id' value={profileData?.user_id} />
        <div className='grid grid-cols-1 gap-6 mt-4'>
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
            />
            <p id='last_name-error' className='text-red-400'>
              {actionData?.fieldErrors?.last_name &&
                (actionData?.fieldErrors?.last_name as string)}
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
        </div>
      </Form>

      <ProfileSection fullName={fullName} email={'test@test.com'} />
      <Posts />
    </>
  );
}
