type User = {
  email: string;
  password: string;
  id?: number;
};

type Book = {
  id?: number;
  user_email?: string;
  title: string;
  author: string;
  year: string;
  genre: Genre;
};

type Genre = "fiction" | "non-fiction" | "fantasy" | "mystery" | "thriller";

type SharedStateProperties<T> = {
  selected: T | undefined;
  show: boolean;
};

type BookState = SharedStateProperties<Book> & { books: Book[] };
type UserState = SharedStateProperties<User> & { users: User[] };

type Table = "users" | "books";