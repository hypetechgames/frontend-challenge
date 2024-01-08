import React from 'react'
import { ReactElement } from 'react'

type Props = {
  condition: boolean
  children: ReactElement
}

export default function If({ condition, children }: Props) {
  return <>{condition ? children : ''}</>
}
