import { dehydrate } from "@tanstack/react-query";

import { storage } from "./storage";
import { queryClient } from "../provider/QueryProvider";

const QUERY_CACHE_KEY = "queryCache";

export const saveQueryCache = () => {
  try {
    const dehydratedState = dehydrate(queryClient);
    storage.set(QUERY_CACHE_KEY, JSON.stringify(dehydratedState));
  } catch (error) {
    console.log("saveQueryCache ERROR ===>", error);
  }
};

export const loadQueryCache = (): any => {
  try {
    const saved = storage.getString(QUERY_CACHE_KEY);
    return saved ? JSON.parse(saved) : undefined;
  } catch (error) {
    console.log("loadQueryCache ERROR ===>", error);
    return undefined;
  }
};

export const clearQueryCache = () => {
  try {
    storage.delete(QUERY_CACHE_KEY);
  } catch (error) {
    console.log("clearQueryCache ERROR ===>", error);
  }
};
