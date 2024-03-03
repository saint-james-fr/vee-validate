type User = {
  email: string;
  password: string;
  id: number;
};

type Book = {
  id: number;
  user_id?: number;
  title: string;
  author: string;
  year: string;
  genre: Genre;
};

type Genre = "fiction" | "non-fiction" | "fantasy" | "mystery" | "thriller";
