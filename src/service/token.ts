export const readToken = () => {
  return localStorage.getItem('token');
};

export const createToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const deleteToken = () => {
  localStorage.removeItem('token');
};
