import { Item } from "@prisma/client";

type ItemData = Pick<Item, "statId" | "mode" | "value">;

const attackItems: ItemData[] = [
  // ABSOLUTE
  {
    statId: 1,
    value: 10,
    mode: "ABSOLUTE",
  },
  {
    statId: 1,
    value: 20,
    mode: "ABSOLUTE",
  },
  {
    statId: 1,
    value: 50,
    mode: "ABSOLUTE",
  },
  // PERCENTAGE
  {
    statId: 1,
    value: 10,
    mode: "PERCENTAGE",
  },
  {
    statId: 1,
    value: 20,
    mode: "PERCENTAGE",
  },
  {
    statId: 1,
    value: 50,
    mode: "PERCENTAGE",
  },
];

const defenseItems: ItemData[] = [
  // ABSOLUTE
  {
    statId: 2,
    value: 10,
    mode: "ABSOLUTE",
  },
  {
    statId: 2,
    value: 20,
    mode: "ABSOLUTE",
  },
  {
    statId: 2,
    value: 50,
    mode: "ABSOLUTE",
  },
  // PERCENTAGE
  {
    statId: 2,
    value: 10,
    mode: "PERCENTAGE",
  },
  {
    statId: 2,
    value: 20,
    mode: "PERCENTAGE",
  },
  {
    statId: 2,
    value: 50,
    mode: "PERCENTAGE",
  },
];

const healthItems: ItemData[] = [
  // ABSOLUTE
  {
    statId: 3,
    value: 10,
    mode: "ABSOLUTE",
  },
  {
    statId: 3,
    value: 20,
    mode: "ABSOLUTE",
  },
  {
    statId: 3,
    value: 50,
    mode: "ABSOLUTE",
  },
  // PERCENTAGE
  {
    statId: 3,
    value: 10,
    mode: "PERCENTAGE",
  },
  {
    statId: 3,
    value: 20,
    mode: "PERCENTAGE",
  },
  {
    statId: 3,
    value: 50,
    mode: "PERCENTAGE",
  },
];

export const defaultItems = [
  ...attackItems,
  ...defenseItems,
  ...healthItems,
].map((item, i) => {
  let name = "";
  const mode = item.mode === "PERCENTAGE" ? "%" : "";

  if (item.statId === 1) name = `Espada +${item.value}${mode}`;
  else if (item.statId === 2) name = `Escudo +${item.value}${mode}`;
  else if (item.statId === 3) name = `Salud +${item.value}${mode}`;

  return { id: i + 1, name, ...item };
});
