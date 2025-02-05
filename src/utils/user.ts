// create a custom hook to validate the user

export const validateUser = (user: string, password: string) => {
  const ADMIN_PERMISSION_EMAIL = "admin@admin.com";
  const ADMIN_PERMISSION_PASSWORD = "Admin";

  return (
    user === ADMIN_PERMISSION_EMAIL && password === ADMIN_PERMISSION_PASSWORD
  );
};
