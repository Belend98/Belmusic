
declare global {

  interface Window {
    api: {
      getAllArtists: () => Promise<Artist[]>,
      createArtist: () => Promise<void>
    }
  }
}

export {}
