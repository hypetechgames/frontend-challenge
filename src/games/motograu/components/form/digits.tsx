import React, { useState } from 'react'

type Props = {
  value: string
  setValue: Function
}

export default function Digits({ value, setValue }: Props) {
  const [current, setCurrent] = useState<any>(null)

  const incrementValue = (increment: number) => {
    if (increment == current) setValue(parseFloat(value) + increment)
    else setValue(parseFloat(increment).toFixed(2))

    setCurrent(increment)
  }

  return (
    <article className="flex justify-center gap-1 w-full">
      <button
        onClick={() => incrementValue(1.0)}
        className="btn btn-xs flex-1 border-gray-600"
      >
        1
      </button>
      <button
        onClick={() => incrementValue(2.0)}
        className="btn btn-xs flex-1 border-gray-600"
      >
        2
      </button>
      <button
        onClick={() => incrementValue(5.0)}
        className="btn btn-xs flex-1 border-gray-600"
      >
        5
      </button>
      <button
        onClick={() => incrementValue(10.0)}
        className="btn btn-xs flex-1 border-gray-600"
      >
        10
      </button>
    </article>
  )
}
