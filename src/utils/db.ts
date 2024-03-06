type State = BookState | UserState;

const find = <T extends User | Book>(model: T, state: State, table: Table) => {
  if (table === "users" && "users" in state) {
    return state.users.findIndex((item: User) => item.id === model.id);
  } else if (table === "books" && "books" in state) {
    return state.books.findIndex((item: Book) => item.id === model.id);
  }
  return -1;
};

const insert = <T extends User | Book>(
  model: T,
  state: State,
  table: Table
) => {
  if (table === "users" && "users" in state) {
    state.users.push(model as User);
  } else if (table === "books" && "books" in state) {
    state.books.push(model as Book);
  }
};

export const upsert = <T extends User | Book>(
  model: T,
  state: State,
  table: Table
) => {
  let id: number;
  if (model.id) {
    id = model.id;
  } else {
    if (table === "users" && "users" in state) {
      id = state.users.length + 1;
    } else if (table === "books" && "books" in state) {
      id = state.books.length + 1;
    } else {
      throw new Error(`Invalid table: ${table}`);
    }
  }
  model.id = id;

  const index = find(model, state, table);
  if (index !== -1) {
    if (table === "users" && "users" in state) {
      state.users[index] = model as User;
    } else if (table === "books" && "books" in state) {
      state.books[index] = model as Book;
    }
    return;
  }
  insert(model, state, table);
};

export const destroy = <T extends User | Book>(
  model: T,
  state: State,
  table: Table
) => {
  const index = find(model, state, table);
  if (index !== -1) {
    state.selected = undefined;
    if (table === "users" && "users" in state) {
      state.users.splice(index, 1);
    } else if (table === "books" && "books" in state) {
      state.books.splice(index, 1);
    }
  }
};
