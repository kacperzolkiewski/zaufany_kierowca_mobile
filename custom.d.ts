declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "@env" {
  export const SERVER_ENDPOINT: string;
  export const GOOGLE_MAPS_API_KEY: string;
}
