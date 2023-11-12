export function firstLetterUppercase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function range(start: number, end: number) {
  return Array.from(
    { length: (end - start) / 1 + 1 },
    (_value, index) => start + index * 1
  );
}
