export type UsersResponse = {
  id: string,
  user_id: string,
  email: string,
  name: string,
  code?: string,
};

export type SelectedUsersResponse = Pick<UsersResponse,
  'id' | 'user_id' | 'email' | 'name'
>;

export type UserCreate = Pick<UsersResponse,
  'user_id' | 'email' | 'name'
>;

export type UserCreateGoogle = Pick<UsersResponse,
  'code'
>;