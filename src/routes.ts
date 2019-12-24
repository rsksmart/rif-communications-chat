export const ROUTES = {
  CHATS: '/',
  PROFILE: '/profile',
  EXAMPLE: '/example',
  LOGIN: '/login',
  CHAT: (rnsName?: string) => `/chat/${rnsName ? rnsName : ':rnsName'}`,
  CLEAR: '/clear',
};
