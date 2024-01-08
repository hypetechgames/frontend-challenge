import React from 'react'

export type Tab = {
  key: string
  title: string
}

type Props = {
  tabs: Tab[]
  active: string
  size: string
  toggle: Function
  variant: string
}

const getVariantColor = (variant: string) => {
  switch (variant) {
    case 'blue':
      return 'bg-blue-700'
    case 'lime':
      return 'bg-lime-600'
    case 'yellow':
      return 'bg-yellow-400'
    case 'red':
      return 'bg-red-700'
    case 'pink':
      return 'bg-pink-700'
    case 'rose':
      return 'bg-rose-700'
    case 'orange':
      return 'bg-orange-700'
    case 'slate':
      return 'bg-slate-600'
  }
}

export default function Tabs({
  tabs,
  size,
  active,
  toggle,
  variant = 'slate',
}: Props) {
  return (
    <div
      className={`tabs p-1 rounded bg-gray-700 bg-opacity-20 flex w-full justify-center`}
    >
      {tabs.map((tab) => {
        return (
          <a
            key={tab.key}
            className={`tab tab-sm flex max:w-[50%]   items-center text-xs font-medium ${size} ${
              active == tab.key
                ? `rounded bg-gray-700 bg-opacity-25 text-gray-300`
                : ''
            }`}
            onClick={() => toggle(tab.key)}
          >
            {tab.title}
          </a>
        )
      })}
    </div>
  )
}
