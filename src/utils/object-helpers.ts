import { UserType } from './../types/types';

export const updateObjectArray = (items: Array<UserType>, itemId: number, objPropName: string, newObjProps: object) => {
  return items.map((u: UserType) => {
    if(u[objPropName as keyof UserType] === itemId) {
      return {...u, ...newObjProps};
    } else {
      return u;
    }
  });
}

