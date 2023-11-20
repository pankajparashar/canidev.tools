"use client";

import { createContext } from "react";
export const DataContext = createContext();

export const DataProvider = ({ children, ...props }) => (
	<DataContext.Provider value={{ ...props }}>{children}</DataContext.Provider>
);
