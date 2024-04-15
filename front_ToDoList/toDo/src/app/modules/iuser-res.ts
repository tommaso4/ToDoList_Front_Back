import { ITaskRes } from "./itask-res";

export interface IuserRes {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  age: number;
  authorities: any[];
  credentialsNonExpired: boolean;
  enabled: boolean;
  id: number;
  name: string;
  password: number;
  surname: string;
  tasks: ITaskRes[];
  username:string;
}

