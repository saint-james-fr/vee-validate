import { reactive } from "vue";

type UserState = {
  users: User[];
  selected: User | undefined;
  show: boolean;
};

const userState: UserState = reactive<UserState>({
  users: [],
  selected: undefined,
  show: false,
});

let initialId = 0;
export const useUser = () => {
  const upsert = (user: Partial<User>) => {
    const { email, password } = user;
    if (!email || !password) {
      return;
    }
    const id = user.id || initialId;
    const data: User = { email, password, id };

    // Check if the user already exists
    const index = userState.users.findIndex((u) => u.id === data.id);
    console.log();
    if (index !== -1) {
      // If the user exists, update it
      userState.users[index] = data;
      return;
    }
    // If the user does not exist, add it
    userState.users.push(data);
  };

  const destroy = (id: number) => {
    console.log("destroy", id);
    const index = userState.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      userState.users.splice(index, 1);
    }
  };
  return { userState, upsert, destroy };
};
