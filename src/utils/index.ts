export const formatDate = (date: Date, format: number = 0) => {
  return format
    ? date.toLocaleDateString("en-CA")
    : date.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      });
  //`${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
};
