// Type declarations for .vue imports and the preload API
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Minimal Artist shape used in the renderer (match server mapping)
declare global {
  interface Artist {
    id_artist?: number
    Nom: string
    'Prénom'?: string
    Email: string
    id_type_artist: number
  }

  interface Window {
    api: {
      getAllArtists: () => Promise<Artist[]>
    }
  }
}

export {}
