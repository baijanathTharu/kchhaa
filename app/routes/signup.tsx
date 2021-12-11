import { Form, Link, useActionData, useSearchParams, redirect } from 'remix';
import type { ActionFunction, LoaderFunction } from 'remix';
import { createUserSession, getUser, signUp } from '~/utils/session.server';

type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
    password: string | undefined;
  };
  fields?: {
    email: string;
    password: string;
  };
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  const form = await request.formData();

  const email = form.get('email');
  const password = form.get('password');
  const redirectTo = form.get('redirectTo') || '/';

  if (!email && !password) {
    return {
      formError: 'Please fill in all fields',
    };
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return {
      formError: 'Form not submitted correctly',
    };
  }

  if (!email) {
    return {
      fieldErrors: {
        email: 'Email is required',
        password: undefined,
      },
    };
  }

  if (!password) {
    return {
      fieldErrors: {
        email: undefined,
        password: 'Password is required',
      },
    };
  }

  const { user, session } = await signUp({ email, password });

  if (!user || !session) {
    return {
      formError: 'Invalid email or password',
    };
  }

  return createUserSession({
    access_token: session?.access_token,
    redirectTo: redirectTo.toString(),
  });
};

type LoaderData = {};

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response | LoaderData> => {
  const user = await getUser(request);
  if (user) return redirect('/');
  return {};
};

export default function Signup() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <section className='max-w-2xl p-6 mx-auto bg-white rounded-md shadow-md'>
        <h2 className='text-center text-lg font-semibold text-gray-700 capitalize'>
          Sigup Form
        </h2>

        <Form
          method='post'
          aria-describedby={actionData?.formError ? 'form-error' : undefined}
        >
          <input
            type='hidden'
            name='redirectTo'
            value={searchParams.get('redirectTo') ?? undefined}
          />
          <div className='grid grid-cols-1 gap-6 mt-4'>
            <p id='form-error' className='text-red-400'>
              {actionData?.formError && (actionData?.formError as string)}
            </p>
            <div>
              <label className='text-gray-700' htmlFor='email'>
                Email Address
              </label>
              <input
                name='email'
                type='email'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none focus:ring'
                aria-invalid={
                  Boolean(actionData?.fieldErrors?.email) || undefined
                }
                aria-describedby={
                  actionData?.fieldErrors?.email ? 'email-error' : undefined
                }
              />
              <p id='email-error' className='text-red-400'>
                {actionData?.fieldErrors?.email &&
                  (actionData?.fieldErrors?.email as string)}
              </p>
            </div>

            <div>
              <label className='text-gray-700' htmlFor='password'>
                Password
              </label>
              <input
                name='password'
                type='password'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring'
                aria-invalid={
                  Boolean(actionData?.fieldErrors?.password) || undefined
                }
                aria-describedby={
                  actionData?.fieldErrors?.password
                    ? 'password-error'
                    : undefined
                }
              />
              <p id='password-error' className='text-red-400'>
                {actionData?.fieldErrors?.password &&
                  (actionData?.fieldErrors?.password as string)}
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
            <Link to='/'>
              <button className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-400 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'>
                Cancel
              </button>
            </Link>
          </div>
        </Form>
      </section>
    </div>
  );
}
