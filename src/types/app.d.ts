declare module 'react-html-parser';
declare module "*.svg" {
  import React = require("react")
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

interface Window {
  NextPublic: {
    lang: "en_US"
    version: string
  }
}
declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_APP_VERSION: string;
      NEXT_PUBLIC_API_HOST: string;
      NEXT_PUBLIC_CDN_HOST: string;
      NEXT_PUBLIC_API_BASE_URL: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
      NEXT_PUBLIC_FACEBOOK_APP_ID: string;
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_APPLE_APP_ID: string;
      NEXT_PUBLIC_GOOGLE_PLAY_APP_ID: string;
      NEXT_PUBLIC_ROBOTS_CONFIG: string;
      NEXT_PUBLIC_ADS_CONFIG: string;
      NEXT_PUBLIC_APP_ADS_CONFIG: string;
    }
  }
}