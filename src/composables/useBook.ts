import { reactive } from "vue";

type BookState = {
  books: Book[];
  selected: Book | undefined;
  show: boolean;
};

const bookState: BookState = reactive<BookState>({
  books: [],
  selected: undefined,
  show: false,
});

let initialId = 0;
export const useBook = () => {
  const upsert = (book: Partial<Book> & { user_email: string }) => {
    const { author, title, year, genre, user_email } = book;
    if (!author || !title || !year || !genre) {
      return;
    }

    const id = book.id ?? initialId;

    const data: Book = { author, title, year, genre, id, user_email };

    // Check if the user already exists
    const index = bookState.books.findIndex((u) => u.id === data.id);
    if (index !== -1) {
      // If the user exists, update it
      bookState.books[index] = data;
      return;
    }
    // If the user does not exist, add it
    bookState.books.push(data);
  };

  const destroy = (id: number) => {
    const index = bookState.books.findIndex((u) => u.id === id);
    if (index !== -1) {
      bookState.selected = undefined;
      bookState.show = false;
      bookState.books.splice(index, 1);
    }
  };
  return { bookState, upsert, destroy };
};
