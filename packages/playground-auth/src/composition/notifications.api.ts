import { useApi } from '@amilochau/core-vue3-auth/composition';
import type { NotificationsRegisterRequest } from '@amilochau/core-vue3/types';

export const useNotificationsApi = () => {

  const api = useApi('/notifications');

  const register = (request: NotificationsRegisterRequest) => {
    return api.postHttp<NotificationsRegisterRequest>('/register', request, { redirect404: false });
  };

  return {
    register,
  };
};
