export const isManager = (permissionLevel: string | number): boolean => {
  return (
    Number(permissionLevel) === 2 ||
    Number(permissionLevel) === 3 ||
    Number(permissionLevel) === 6 ||
    Number(permissionLevel) === 7
  );
};

export const isGovernor = (permissionLevel: string | number): boolean => {
  return (
    Number(permissionLevel) === 4 ||
    Number(permissionLevel) === 5 ||
    Number(permissionLevel) === 6 ||
    Number(permissionLevel) === 7
  );
};

export const isAdmin = (permissionLevel: string | number): boolean => {
  return (
    Number(permissionLevel) === 1 ||
    Number(permissionLevel) === 3 ||
    Number(permissionLevel) === 5 ||
    Number(permissionLevel) === 7
  );
};
