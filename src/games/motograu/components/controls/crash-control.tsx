import React from 'react'
import MobileControl from './mobile-control'
import DesktopControl from './desktop-control'

type Props = {
  color: string
}

export default function CrashControl({ color }: Props) {
  return (
    <div className="w-full flex justify-center flex-wrap md:flex-nowrap">
      <MobileControl color={color} />

      <DesktopControl color={color} />
    </div>
  )
}
