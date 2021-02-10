import axios, { AxiosResponse } from "axios";

export interface SignUp {
  email: string;
  password: string;
}

export const signUp = ({ email, password }: SignUp): Promise<AxiosResponse> =>
  axios.post("/api/sign-up", {
    email,
    password,
  });
