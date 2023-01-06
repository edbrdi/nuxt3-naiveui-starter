import { defineStore } from 'pinia';
import api from '~/utils/api';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
}

export const useUser = defineStore('user', {
  state: (): User => ({}),
  actions: {
    set(user: User) {
      this.id = user.id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.token = user.token;

      if (user.token) localStorage.setItem('token', user.token);
    },

    async signIn(signInData: {
      email: string;
      password: string;
    }): Promise<User | void> {
      const user = await api.signIn(signInData).catch((e) => {
        throw new Error(e.message);
      });

      if (user) {
        this.set(user);
        return user;
      }
    },

    signOut() {
      this.set({});
      localStorage.removeItem('token');
    },
  },
});
