import { createComment, deleteComment, listComments } from '@/services/comment';
import useAppQuery from '../useAppQuery';
import { IBodyComment, IBodyLogin, IResponseListComments } from '@/services/types';
import useAppMutation from '../useAppMutation';
import { login, logout } from '@/services/auth';

export const useListComments = () => {
  return useAppQuery<IResponseListComments>(['comments'], () => listComments());
};

export const useCreateComment = () => {
  return useAppMutation<IBodyComment>(createComment);
};

export const useDeleteComment = () => {
  return useAppMutation<number>(deleteComment);
};

export const useLogin = () => {
  return useAppMutation<IBodyLogin>((data) => login(data));
};

export const useLogout = () => {
  return useAppMutation(() => logout());
};
