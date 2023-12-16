export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US").replace(/\//g, ".");
}
