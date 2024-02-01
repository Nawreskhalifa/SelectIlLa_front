import { Photo, Role, User, UserWithToken } from "./User";

export interface PhotoApi {
  id: number;
  name: string;
  url: string;
}
export interface RoleApi {
  id: number;
  name: string;
}
export interface UserApi {
  id: number;
  username: string;
  email: string;
  gender: string;
  date_of_birth: string;
  role: RoleApi;
  photo: PhotoApi | null;
  password: string;
  password_confirmation: string;
}
export interface UserWithTokenApi {
  jwt: string;
  user: UserApi;
}

// Encode a Photo object
export const encodePhoto = (photo: Photo): PhotoApi => {
  return {
    id: photo.id,
    name: photo.name,
    url: photo.url,
  };
};
// Encode a Role object
export const encodeRole = (role: Role): RoleApi => {
  return {
    id: role.id,
    name: role.name,
  };
};
// Encode a User object
export const encodeUser = (user: User): UserApi => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    gender: user.gender,
    date_of_birth: user.dateOfBirth,
    role: encodeRole(user.role),
    photo: user.photo ? encodePhoto(user.photo) : null,
    password: user.password,
    password_confirmation: user.passwordConfirmation,
  };
};
// Encode a UserWithToken object
export const encodeUserWithToken = (userWithToken: UserWithToken): UserWithTokenApi => {
  return {
    jwt: userWithToken.jwt,
    user: encodeUser(userWithToken.user),
  };
};