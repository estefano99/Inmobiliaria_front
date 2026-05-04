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

/**
 * Parsea una fecha (string o Date) manteniendo la zona horaria local
 * Convierte fechas UTC a fechas locales correctamente
 */
export const parseDateLocal = (dateInput: string | Date): Date => {
  if (typeof dateInput === "string") {
    // Si es string formato YYYY-MM-DD, crear fecha en hora local
    const [year, month, day] = dateInput.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  
  if (dateInput instanceof Date) {
    // Si es una Date (probablemente en UTC del servidor), convertirla a hora local
    const isoString = dateInput.toISOString().split("T")[0]; // Obtener "YYYY-MM-DD"
    const [year, month, day] = isoString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  
  return new Date();
};