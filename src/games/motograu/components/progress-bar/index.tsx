import React, { useEffect, useState } from 'react'

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
      return 'bg-[#C5F700]'
    case 'rose':
      return 'bg-rose-700'
    case 'gray':
      return 'bg-gray-400'
  }
}

function ProgressBar(props) {
  const [percentage, setPercentage] = useState('100%')

  useEffect(() => {
    if (props.value === 10) setPercentage('100%')
    else if (props.value < 10) setPercentage('0%')
  }, [props.value])

  return (
    <div className="w-60 sm:w-96 bg-black relative bg-opacity-20 rounded-full">
      <div
        className="bg-[#ff1e4c] flex items-center text-xs font-medium text-blue-100 leading-none rounded-full h-6"
        style={{
          width: percentage,
          transition: 'linear',
          transitionDuration: '10000ms',
        }}
      ></div>
      <span className="top-1 left-[17%] sm:left-[30%] lg:left-[35%] uppercase absolute text-xs text-white font-bold">
        Próxima rodada
      </span>
    </div>
  )
}

export default ProgressBar
