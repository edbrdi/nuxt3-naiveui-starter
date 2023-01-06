import { setActivePinia, createPinia } from 'pinia';
import { useUser, User } from '~/store/user';

const userData: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@test.com',
  token: 'token',
};

vi.mock('/utils/api.ts', async () => ({
  default: {
    signIn: vi.fn(async () => userData),
  },
}));

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Set a user', () => {
    const user = useUser();
    [user.id, user.firstName, user.lastName, user.email, user.token].forEach(
      (value) => {
        expect(value).toBeUndefined();
      },
    );

    user.set(userData);
    ['id', 'firstNme', 'lastName', 'email', 'token'].forEach((key) => {
      const k = key as keyof User;
      expect(user[k]).toBe(userData[k]);
    });
  });

  it('Sign out', () => {
    const user = useUser();
    user.set(userData);
    expect(user.token).toBe(userData.token);

    user.signOut();
    [user.id, user.firstName, user.lastName, user.email, user.token].forEach(
      (value) => {
        expect(value).toBeUndefined();
      },
    );
  });

  it('Sign in', async () => {
    const user = useUser();
    await user.signIn({ email: 'test@test.com', password: 'password' });
    expect(user.token).toBe('token');
  });
});
