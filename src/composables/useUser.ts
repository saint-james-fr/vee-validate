import { reactive } from "vue";

const userState: UserState = reactive<UserState>({
  users: [],
  selected: undefined,
  show: false,
});

export const useUser = () => {
  return { userState };
};
