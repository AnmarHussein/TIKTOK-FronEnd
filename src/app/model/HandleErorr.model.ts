export function handelErorr(status: number) {
  if (status === 401 || status === 403) {
    localStorage.removeItem('JWTToken');
    return 'You Cant Acess This Page UnAthraize';
  }
  return 'Errorr';
}
