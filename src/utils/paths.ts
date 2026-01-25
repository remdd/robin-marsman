export const basePath = "/robin-marsman";

export const getAssetPath = (path: string) =>
  process.env.NODE_ENV === "production" ? path : `${basePath}${path}`;
