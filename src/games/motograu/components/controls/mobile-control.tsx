import React, { useState } from 'react'

import CrashForm from './crash/form'
import If from '@/core/components/conditions/if'

type Props = {
  color: string
}

export default function MobileControl({ color }: Props) {
  const [second, setSecond] = useState<boolean>(false)

  return (
    <div className="w-full flex gap-3 justify-center flex-wrap md:flex-nowrap md:hidden">
      <CrashForm
        color={color}
        secondEnabled={second}
        toggleSecond={setSecond}
        position="left"
      />

      <If condition={second}>
        <CrashForm
          color={color}
          hideSelf={setSecond}
          position="right"
        />
      </If>
    </div>
  )
}
