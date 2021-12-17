import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  redirect,
  useTransition,
} from 'remix';
import type { ActionFunction, LoaderFunction } from 'remix';
import { createUserSession, getUser, login } from '~/utils/session.server';

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

  const { user, session } = await login({ email, password });

  if (!user) {
    return {
      formError: 'Invalid email or password',
    };
  }

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

export default function Login() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();

  const transition = useTransition();

  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <section className='max-w-2xl p-6 mx-auto bg-primary text-primary-content rounded-md shadow-md'>
        <h2 className='text-center text-lg font-semibold  capitalize'>
          Login Form
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
            <p id='form-error' className='text-error'>
              {actionData?.formError && (actionData?.formError as string)}
            </p>
            <div className='flex flex-col gap-1'>
              <label className='' htmlFor='email'>
                Email Address
              </label>
              <input
                name='email'
                type='email'
                className='input input-bordered'
                aria-invalid={
                  Boolean(actionData?.fieldErrors?.email) || undefined
                }
                aria-describedby={
                  actionData?.fieldErrors?.email ? 'email-error' : undefined
                }
              />
              <p id='email-error' className='text-error'>
                {actionData?.fieldErrors?.email &&
                  (actionData?.fieldErrors?.email as string)}
              </p>
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='password'
                className='input input-bordered'
                aria-invalid={
                  Boolean(actionData?.fieldErrors?.password) || undefined
                }
                aria-describedby={
                  actionData?.fieldErrors?.password
                    ? 'password-error'
                    : undefined
                }
              />

              <p id='password-error' className='text-error'>
                {actionData?.fieldErrors?.password &&
                  (actionData?.fieldErrors?.password as string)}
              </p>
            </div>
          </div>

          <div className='w-full grid grid-cols-2 mt-6 gap-2'>
            <button type='submit' className='btn btn-secondary'>
              {transition.state === 'submitting' ? 'Submitting' : 'Submit'}
            </button>
            <button className='btn btn-neutral btn-outline'>
              <Link to='/' className='flex-1'>
                Cancel
              </Link>
            </button>
          </div>
        </Form>
      </section>
    </div>
  );
}
