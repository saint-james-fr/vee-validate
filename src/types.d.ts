type User = {
  email: string;
  password: string;
  id: number;
};

type Book = {
  id: number;
  user_email?: string;
  title: string;
  author: string;
  year: string;
  genre: Genre;
};

type Genre = "fiction" | "non-fiction" | "fantasy" | "mystery" | "thriller";
