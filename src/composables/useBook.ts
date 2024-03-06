import { reactive } from "vue";

const bookState: BookState = reactive<BookState>({
  books: [],
  selected: undefined,
  show: false,
});

export const useBook = () => {
  return { bookState };
};
