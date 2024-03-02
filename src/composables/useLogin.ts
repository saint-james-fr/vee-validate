import { reactive } from "vue";

let initialId = 2;

type UserState = {
  users: User[];
  selected: User | undefined;
  show: boolean;
};

const state: UserState = reactive({
  users: [
    { email: "user1@yahooo.fr", password: "password1", id: 0 },
    { email: "user2@gmail.com", password: "password2", id: 1 },
  ] as User[],
  selected: undefined as User | undefined,
  show: false,
});

export const useLogin = () => {
  const upsert = (user: User) => {
    initialId++;
    const data = { ...user, id: initialId };
    console.log(user.id);
    // Check if the user already exists
    const index = state.users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      // If the user exists, update it
      state.users[index] = user;
      return;
    }
    // If the user does not exist, add it
    state.users.push(data);
  };
  return { state, upsert };
};
