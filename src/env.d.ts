/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
interface ImportMetaEnv {
	VITE__API_URL: string;
  VITE__API_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}


