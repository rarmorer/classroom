export const devConfig = {
    topic: ' test topic',
    name: '',
    password: 'pass', 
    roleType: 0, 
  };


  export const isShallowEqual = (objA, objB) => {
    if (objA === objB) return true;

    if (!objA || !objB) return false;

    const aKeys = Object.keys(objA);
    const bKeys = Object.keys(objB);
    const length = aKeys.length;

    if (bKeys.length !== length) return false;
    
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      const key = aKeys[i];
      if (objA[key] !== objB[key] || !Object.prototype.hasOwnProperty.call(objB, key)) {
        return false
      }
    }
    return true;
  }