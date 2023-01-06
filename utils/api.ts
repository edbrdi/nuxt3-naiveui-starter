import { useUser, User } from '~/store/user';

const config = useRuntimeConfig();
const nuxtApp = useNuxtApp();

async function jsonOrText(res: Response) {
  const clone = res.clone();
  try {
    return await res.json();
  } catch (e) {
    return clone.text();
  }
}

async function response(res: Response | void) {
  const t = nuxtApp.vueApp.config.globalProperties.$t;

  if (res) {
    const data = await jsonOrText(res);
    if (res.ok) return data;
    else if (data.message) throw new Error(t(`api.${data.message}`));
  }

  throw new Error(t(`api.unknown`));
}

function headers() {
  const user = useUser();
  const token = user.token ?? localStorage.token;

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function post(path: string, data: object): Promise<Response | void> {
  const res = await fetch(
    `${config.public.BACKEND_HOST}:${config.public.BACKEND_PORT}${path}`,
    {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    },
  ).catch((e) => console.log(e));

  return response(res);
}

async function get(
  path: string,
  query?: { [key: string]: string },
): Promise<Response | void> {
  for (const key in query) if (!query[key]) delete query[key];

  const res = await fetch(
    `${config.public.BACKEND_HOST}:${config.public.BACKEND_PORT}${path}` +
      (query ? `?${new URLSearchParams({ ...query })}` : ''),
    {
      method: 'GET',
      headers: headers(),
    },
  ).catch((e) => console.log(e));

  return response(res);
}

export default {
  signIn: (data: { email: string; password: string }) =>
    post('/auth/sign-in', data) as Promise<User | void>,
  authResfresh: () => get('/auth/refresh') as Promise<User | void>,
};
