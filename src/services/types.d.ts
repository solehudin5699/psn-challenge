export interface IResponseListComments {
  data: {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }[];
}

export interface IBodyComment {
  name: string;
  email: string;
  body: string;
}

export interface IBodyLogin {
  username: string;
  password: string;
}
