export const basePath =
  process.env.NODE_ENV === "production" ? "/robin-marsman" : "";

export const getAssetPath = (path: string) => `${basePath}${path}`;
