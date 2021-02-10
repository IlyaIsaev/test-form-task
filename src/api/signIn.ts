import axios, { AxiosResponse } from "axios";

export interface SignIn {
  email: string;
  password: string;
  keepSign: boolean;
}

export const signIn = ({
  email,
  password,
  keepSign,
}: SignIn): Promise<AxiosResponse> =>
  axios.post("/api/sign-in", {
    email,
    password,
    keepSign,
  });
