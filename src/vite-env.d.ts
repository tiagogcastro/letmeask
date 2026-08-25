/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Firebase web API key (public by design) */
  readonly VITE_API_KEY: string;
  /** Firebase auth domain, e.g. project.firebaseapp.com */
  readonly VITE_AUTH_DOMAIN: string;
  /** Realtime Database URL, e.g. https://project-default-rtdb.firebaseio.com */
  readonly VITE_DATABASE_URL: string;
  /** Firebase project id */
  readonly VITE_PROJECT_ID: string;
  /** Firebase storage bucket */
  readonly VITE_STORAGE_BUCKET: string;
  /** Firebase messaging sender id */
  readonly VITE_MESSAGING_SENDER_ID: string;
  /** Firebase web app id */
  readonly VITE_APP_ID: string;
  /** Set to "true" to attach Auth and Realtime Database emulators for offline sandbox mode */
  readonly VITE_USE_EMULATORS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
