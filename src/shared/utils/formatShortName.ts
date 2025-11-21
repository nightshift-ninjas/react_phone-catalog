export const formatShortName = (fullName: string): string => {
  if (!fullName.trim()) return '';

  const parts = fullName.trim().split(/\s+/);

  const first = parts[0];
  const lastInitial = parts[1]?.charAt(0) ?? '';

  return lastInitial ? `${first}.${lastInitial}` : first;
};
