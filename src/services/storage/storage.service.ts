export const saveLocalItem = (key: string, item: any) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalItem = <R extends any>(key: string): R => {
  if (typeof window === "undefined") return null as any;
  try {
    return JSON.parse(localStorage.getItem(key) as string);
  } catch {
    return localStorage.getItem(key) as any;
  }
};

export const destroyLocalItem = (key: string) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};
export const clearLocal = () => {
  if (typeof window === "undefined") return;
  localStorage.clear();
};

export const saveSessionItem = (key: string, item: any) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key, JSON.stringify(item));
};

export const getSessionItem = <R extends any>(key: string): R => {
  if (typeof window === "undefined") return null as any;
  try {
    return JSON.parse(sessionStorage.getItem(key) as string);
  } catch {
    return sessionStorage.getItem(key) as any;
  }
};

export const destroySessionItem = (key: string) => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(key);
};

export const clearSession = (key: string) => {
  if (typeof window === "undefined") return;
  sessionStorage.clear();
};
