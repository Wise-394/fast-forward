export function validateUsername(username: string): string | null {
  if (!username) return "username cannot be empty";
  if (username.length < 4) {
    return "username must be 4 characters long and above";
  }
  if (username.length > 15) {
    return "username must be shorter than 15 characters";
  }
  return null;
}
