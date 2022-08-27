import { ItemStoreQuery } from "@/generated";

function getDescription(item: ItemStoreQuery["itemStore"][number]["item"]) {
  const stat =
    item.stat.name === "ATK"
      ? "el ataque"
      : item.stat.name === "DEF"
      ? "la defensa"
      : "la salud";

  const description = `Aumenta ${stat} en ${item.value}${
    item.mode === "PERCENTAGE" ? "%" : ""
  }`;

  return description;
}

export default getDescription;
