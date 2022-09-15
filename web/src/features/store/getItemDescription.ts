import { ItemStoreQuery } from "@/generated";

function getDescription(item: ItemStoreQuery["itemStore"][number]["item"]) {
  const stat =
    item.stat.name === "ATK"
      ? "el ataque"
      : item.stat.name === "DEF"
      ? "la defensa"
      : "la salud";

  const action = item.stat.name === "HP" ? "Restaura" : "Aumenta"

  const description = `${action} ${stat} en ${item.value}${
    item.mode === "PERCENTAGE" ? "%" : ""
  }`;

  return description;
}

export default getDescription;
