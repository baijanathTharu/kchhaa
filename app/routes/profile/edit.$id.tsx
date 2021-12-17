import { useActionData, useLoaderData, redirect, useTransition } from 'remix';
import type { ActionFunction, LoaderFunction } from 'remix';
import invariant from 'tiny-invariant';
import { ProfileForm } from '~/components/profile-form';
import db from '~/utils/db.server';
import { setAuthToken } from '~/utils/session.server';
import { ProfileActionData, ProfileLoaderData } from './$id';

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response | ProfileActionData> => {
  const formData = await request.formData();

  invariant(params.id, 'params.id is required');
  const userId = params.id;

  const first_name = formData.get('first_name');
  const last_name = formData.get('last_name');
  const description = formData.get('description');

  if (
    first_name === '' ||
    last_name === '' ||
    typeof first_name !== 'string' ||
    typeof last_name !== 'string' ||
    typeof description !== 'string'
  ) {
    return {
      formError: 'Please fill out all the fields.',
    };
  }

  // set token before updating
  await setAuthToken(request);
  const { error } = await db
    .from('profiles')
    .update([
      {
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        description: description.trim(),
      },
    ])
    .eq('id', userId)
    .single();

  if (error) {
    return {
      formError: `Something went wrong. ${error.message}`,
    };
  }

  return redirect(`/profile/${userId}`);
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<Response | ProfileLoaderData> => {
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

export default function ProfileEdit() {
  const actionData = useActionData<ProfileActionData>();
  const loaderData = useLoaderData<ProfileLoaderData>();

  const transition = useTransition();
  return (
    <div className='mt-5 flex flex-col justify-center items-center'>
      <ProfileForm
        actionData={actionData}
        loaderData={loaderData}
        transition={transition}
      />
    </div>
  );
}
