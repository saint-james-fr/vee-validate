const fakeData = {
  email: "admin@gmail.com",
  password: "motdepasse",
};

// simultate fetch with 200ms
const fetchData = (): Promise<LoginData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeData);
    }, 1000);
  });
};

export const useLogin = () => {
  const insert = (values: LoginData) => {
    console.log(values, "sending data to the server");
  };

  const select = async (id: string): Promise<LoginData> => {
    console.log("fetching data from the server with this id:", id);
    const result = await fetchData();
    return result;
  };
  return { insert, select };
};
