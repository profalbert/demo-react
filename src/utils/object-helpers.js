
export const updateObjectArray = (items, itemId, objPropname, newObjProps) => {
  return items.map(u => {
    if(u[objPropname] === itemId) {
      return {...u, ...newObjProps};
    } else {
      return u;
    }
  });
}

