import { ContextType } from './API'

export interface ConfigComponents {
  drawer: (props: ContextType) => Config;
  header: (props: ContextType) => Header;
  content: (props: ContextType) => Content;
  toolbar: (props: ContextType) => ToolbarItem[];
  badges: (props: ContextType) => Badge[];
  search: (props: ContextType, value: string, ref: React.RefObject<HTMLDivElement>) => Search;
}

export interface Config { }

export interface Header extends Config {
  children?: React.ReactElement;
}
export interface Search extends Config {
  children?: React.ReactElement;
}
export interface Content extends Config {
  children: React.ReactElement;
}
export interface Badge extends Config {
  label: string;
  children: React.ReactElement;
  onClick: () => React.ReactElement;
}
export interface ToolbarItem extends Config {
  id: string;
  children: React.ReactNode;
  onClick: (id: string) => ToolbarItemButton | ToolbarItemView | ToolbarItemDialog;
}


export type ToolbarItemButton = {
  button: () => void;
}
export type ToolbarItemView = {
  page: () => React.ReactNode;
}
export type ToolbarItemDialog = {
  dialog: (onClose: () => void) => React.ReactNode;
}