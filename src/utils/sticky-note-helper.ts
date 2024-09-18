export type StickyNoteStyle = {
  base: string;
};

const stickyNoteStyles: StickyNoteStyle[] = [
  { base: "bg-yellow-200/90" },
  { base: "bg-green-200/90" },
  { base: "bg-blue-200/90" },
  { base: "bg-indigo-200/90" },
  { base: "bg-purple-200/90" },
  { base: "bg-pink-200/90" },
  { base: "bg-red-200/90" },
  { base: "bg-orange-200/90" },
];

export const getRandomRotation = () => {
  return Math.floor(Math.random() * 4) - 2;
};

export const getRandomStyle = () => {
  const randomIndex = Math.floor(Math.random() * stickyNoteStyles.length);
  return stickyNoteStyles[randomIndex];
};
