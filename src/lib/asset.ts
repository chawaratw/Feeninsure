const prefixBase = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return base + path.replace(/^\//, '');
};

export const asset = prefixBase;
export const url = prefixBase;
