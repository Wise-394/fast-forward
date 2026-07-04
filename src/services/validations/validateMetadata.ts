export function validateMetadataInput(
  title: string,
  description: string,
  selectedDate: Date,
): string | null {
  if (!title) return "title cannot be empty";
  if (!selectedDate) return "selected date cannot be empty";
  if (description.length > 500) return "note cannot be longer than 500";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(selectedDate);
  compareDate.setHours(0, 0, 0, 0);

  if (compareDate < today) return "selected date cannot be in the past";

  return null;
}
