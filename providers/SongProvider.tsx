"use client";
import store from "@/store/store";
import { Provider } from "react-redux";

interface SongProviderProps {
  children: React.ReactNode;
}
const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default SongProvider;
