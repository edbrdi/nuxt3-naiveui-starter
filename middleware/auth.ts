import { useUser } from '~/store/user';
import api from '~/utils/api';

export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();

  if (!user.token) {
    if (localStorage.token) {
      const refreshUser = await api.authResfresh().catch((e) => console.log(e));
      if (refreshUser) {
        user.set(refreshUser);
        if (refreshUser.token) localStorage.setItem('token', refreshUser.token);
        return true;
      } else {
        localStorage.removeItem('token');
      }
    }
    return '/sign-in';
  }
});
