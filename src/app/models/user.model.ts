import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;
export class User {
  constructor(
    public name: string,
    public email: string,
    public img?: string,
    public password?: string,
    public role?: "ADMIN_ROLE" | "USER_ROLE",
    public google?: string,
    public uid?: string
  ) {}

  get imgUrl() {
    if (!this.img) {
      return `${base_url}/upload/users/no-image`;
    } else if (this.img.includes('https')) {
      return this.img;
    } else if (this.img) {
      return `${base_url}/upload/users/${this.img}`;
    } else {
      return `${base_url}/upload/users/no-image`;
    }
  }
}
