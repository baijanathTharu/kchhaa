import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { Posts } from '~/components/posts';
import db from '~/utils/db.server';
import { requireUser } from '~/utils/session.server';

type Category = {
  id: number;
  name: string;
  created_at: string;
};
type LoaderData = {
  data: Array<Category> | null;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response | LoaderData> => {
  // user must be logged in to view this page

  await requireUser(request);

  let { data: categories, error } = await db
    .from<Category>('categories')
    .select('*');

  if (error) {
    console.log('error', error);
    throw new Response(error?.message, { status: 500 });
  }
  return { data: categories };
};

export default function Home() {
  const { data } = useLoaderData<LoaderData>();

  return (
    <>
      {/* categories */}
      <div className='flex flex-col py-4 mx-4'>
        <div className='flex overflow-x-scroll hide-scroll-bar'>
          <div className='flex flex-nowrap'>
            {data?.map((c) => {
              return (
                <div
                  key={c.id}
                  className='mx-3 py-3 w-36 flex justify-center items-center  bg-primary text-primary-content  overflow-hidden rounded-lg shadow-md  hover:cursor-pointer hover:text-white hover:shadow-xl hover:bg-primary-focus transition-shadow duration-300 ease-in-out'
                >
                  <p>{c.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* categories */}

      <Posts />
    </>
  );
}
