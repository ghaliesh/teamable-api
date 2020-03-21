interface UserVm {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

interface SignInVm {
  accessToken: string;
}

type DateTime = string | Date | number;
