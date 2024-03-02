import { reactive } from "vue";

type UserState = {
  users: User[];
  selected: User | undefined;
  show: boolean;
};

const state: UserState = reactive<UserState>({
  users: [],
  selected: undefined,
  show: false,
});

let initialId = 0;
export const useUser = () => {
  const upsert = (user: Partial<User>) => {
    initialId++;

    const { email, password } = user;
    if (!email || !password) {
      return;
    }
    const data: User = { email, password, id: initialId };

    // Check if the user already exists
    const index = state.users.findIndex((u) => u.id === data.id);

    if (index !== -1) {
      // If the user exists, update it
      state.users[index] = data;
      return;
    }
    // If the user does not exist, add it
    state.users.push(data);
  };
  return { state, upsert };
};
