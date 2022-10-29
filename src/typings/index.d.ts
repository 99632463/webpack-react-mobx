declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.svg";
declare module "*.eot";
declare module "*.woff2";
declare module "*.woff";
declare module "*.ttf";
declare module "*.scss";
declare module "*.css";

interface IKeyValueMap<T = any> {
  [key: string]: T;
}