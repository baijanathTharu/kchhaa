import jwt from 'jsonwebtoken';

export function decodeJwt(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const decoded = jwt.decode(token);
    resolve(decoded);
  });
}
