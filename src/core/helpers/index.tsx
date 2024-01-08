import React from 'react'

import motograuLogo from '@/assets/logos/moto-grau.png'
import wallStreetLogo from '@/assets/logos/wallStreetBull.png'

import motograuHTP from '@/games/motograu/components/HowToPlay/how-to-play'
import wallStreetHTP from '@/games/wall-street/components/HowToPlay/how-to-play'

import hypetechHTP from '@/core/components/provably-fair/how-to-play'


export const getGameLogo = (gameName: string) => {
  switch (gameName) {
    case 'motograu':
      return <img src={motograuLogo} className="h-8 w-16" alt="" />

    case 'wall-street':
      return <img src={wallStreetLogo} className="h-8 w-26" alt="" />

    default:
      return <img src={hypetechLogo} className="h-8 w-26" alt="" />
  }
}


export const getHowToPlay = (gameName: string) => {
  switch (gameName) {
    case 'motograu':
      return motograuHTP

    case 'wall-street':
      return wallStreetHTP

    default:
      return hypetechHTP
  }
}
