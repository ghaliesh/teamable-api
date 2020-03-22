type ID<T = string> = T;

interface UserVm {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

interface SignInVm {
  accessToken: string;
}

interface TokenPayload {
  id: ID;
}

type DateTime = string | Date | number;
