import {Role} from "./role";

export interface User {
  id: BigInt,
  name: string,
  email: string,
  username: string,
  roles: Set<Role>
}
