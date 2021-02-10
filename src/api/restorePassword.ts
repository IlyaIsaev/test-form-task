import axios, { AxiosResponse } from "axios";

export interface RestorePassword {
  email: string;
}

export const restorePassword = ({
  email,
}: RestorePassword): Promise<AxiosResponse> =>
  axios.post("/api/restorePassword", {
    email,
  });
