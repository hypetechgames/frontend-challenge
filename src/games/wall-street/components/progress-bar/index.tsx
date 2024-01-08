import React from 'react'

type Props = {
  value: number
  max: number
  color: string
  label?: string
}

const getBackgroundColor = (color: string) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-600'
    case 'lime':
      return 'bg-[#28a909]'
    case 'yellow':
      return 'bg-yellow-400'
    case 'amber':
      return 'bg-amber-600'
    case 'red':
      return 'bg-red-700'
    case 'pink':
      return 'bg-pink-700'
    case 'rose':
      return 'bg-rose-700'
    case 'gray':
      return 'bg-gray-400'
  }
}

export default function ProgressBar({
  max,
  value,
  color,
  label = 'Análise de mercado em ',
}: Props) {
  return (
    <div className="block mx-auto w-full relative items-center text-center">
        <p className="title-font mb-0 text-center text-[60px] lg:text-[120px] text-gray-200 font-extrabold uppercase game-texts drop-shadow only-stroke">{Math.abs(value)}</p>
        <p className="text-white lg:mt-[-20px] uppercase text-xs dropshadow font-bold animate-pulse duration-500">Recebendo tendências <br />apostadas pelos jogadores</p>

        <div className="w-full relative flex items-center bg-gray-600 bg-opacity-50 border-opacity-50 rounded-md h-2 dark:bg-gray-700 mt-6">
          <div
            className={`${getBackgroundColor(
              color
            )} h-full transition-all duration-100 rounded-md`}
            style={{
              width: `${(value / max) * 100}%`,
              transitionTimingFunction: 'linear',
              transitionDuration: '990ms',
            }}
          ></div>
        </div>
    </div>
  )
}