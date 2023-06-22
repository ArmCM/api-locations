/**
 * UserEntity interface Entity
 */
export interface IUser {
  id?: string | number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  password: string;
  gender?: string;
}
