import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { Posts } from '~/components/posts';
import { ProfileSection } from '~/components/profile-section';
import db from '~/utils/db.server';
import invariant from 'tiny-invariant';

export type ProfileLoaderData = {
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

export type ProfileActionData = {
  formError?: string;
  fieldErrors?: {
    first_name: string | undefined;
    last_name: string | undefined;
    description: string | undefined;
  };
  data?: {
    first_name: string;
    last_name: string;
    description: string | null;
  };
};

export default function Profile() {
  const profileData = useLoaderData<ProfileLoaderData>();

  const fullName =
    profileData.data?.first_name + ' ' + profileData.data?.last_name;
  return (
    <>
      <ProfileSection
        fullName={fullName}
        description={profileData.data?.description}
        userId={profileData.user_id}
      />
      <Posts />
    </>
  );
}
