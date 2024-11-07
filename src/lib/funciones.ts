export const formatDuracion = (dias: number) => {
  if (dias >= 365) {
    return `${Math.floor(dias / 365)} ${Math.floor(dias / 365) > 1 ? "Años" : "Año"}`;
  } else {
    return `${Math.floor(dias / 30)} ${Math.floor(dias / 30) > 1 ? "Meses" : "Mes"}`;
  }
};