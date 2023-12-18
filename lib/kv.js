export function toggleFavorites(slug) {
  const favorites = getFavorites();
  if (favorites.has(slug)) favorites.remove(slug);
  else favorites.add(slug);
  localStorage.setItem("F12", JSON.stringify([...favorites]));
}

export function isFavorite(slug) {
  const favorites = getFavorites();
  return favorites.has(slug);
}

export function getFavorites() {
  const item = localStorage.getItem("F12") || "[]";
  const json = JSON.parse(item);
  return new Set(json);
}
