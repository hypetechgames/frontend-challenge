import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import React, { useRef } from 'react'

type Props = {
  value: number
  setValue: Function
}

export default function Input({ value, setValue }: Props) {
  const intervalRef = useRef<any>(null)

  const incrementAmount = (increment: number) => {
    setValue((parseFloat(value) + increment).toFixed(2))
  }

  const startIncrement = (increment: number) => {
    incrementAmount(increment)
    let temp = parseFloat(value)
    const startTime = Date.now()
    intervalRef.current = setInterval(() => {
      const currentTime = Date.now()

      if (currentTime - startTime > 500) {
        temp += increment
        setValue(temp.toFixed(2))
      }
    }, 50)
  }

  const finishIncrement = () => {
    clearInterval(intervalRef.current)
  }

  return (
    <div className="flex w-full items-center relative">
      <button
        onMouseDown={(e) => startIncrement(-0.1)}
        onMouseUp={() => finishIncrement()}
        onMouseLeave={() => finishIncrement()}
        className="btn btn-xs w-6 text-lg p-0 absolute left-1"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        className="input input-sm input-bordered focus:outline-0 font-bold bg-slate-900 focus:border-gray-500 text-center  w-full"
      />
      <button
        onMouseDown={(e) => startIncrement(0.1)}
        onMouseUp={() => finishIncrement()}
        onMouseLeave={() => finishIncrement()}
        className="btn btn-xs w-6 text-lg p-0 absolute right-1 "
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
