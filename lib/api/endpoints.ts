export const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },

  shortUrls: {
    list: "/short-urls",
    create: "/short-urls",
    update: (id: string) => `/short-urls/${id}`,
    delete: (id: string) => `/short-urls/${id}`,
  },

  admin: {
    shortUrls: {
      list: "/admin/short-urls",
      update: (id: string) => `/admin/short-urls/${id}`,
      delete: (id: string) => `/admin/short-urls/${id}`,
    },
  },
};
