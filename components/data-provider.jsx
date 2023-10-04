"use client";

import { createContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children, features, categories }) => <DataContext.Provider value={{ features, categories }}>{children}</DataContext.Provider>;
