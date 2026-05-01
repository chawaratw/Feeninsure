const prefixBase = (path: string): string =>
  import.meta.env.BASE_URL + path.replace(/^\//, '');

export const asset = prefixBase;
export const url = prefixBase;
