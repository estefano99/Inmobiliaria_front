export const formatDuracion = (dias: number) => {
  if (dias >= 365) {
    return `${Math.floor(dias / 365)} ${Math.floor(dias / 365) > 1 ? "años" : "año"}`;
  } else {
    return `${Math.floor(dias / 30)} ${Math.floor(dias / 30) > 1 ? "meses" : "mes"}`;
  }
};

export const formatearImporte = (importe: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(importe);
};