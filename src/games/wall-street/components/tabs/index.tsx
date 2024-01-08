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

export default function Tabs({
  tabs,
  size,
  active,
  toggle,
  variant = 'slate',
}: Props) {
  return (
    <div
      className={`tabs p-1 rounded flex w-full justify-center hidden`}
    >
      {tabs.map((tab) => {
        return (
          <a
            key={tab.key}
            className={`tab tab-sm h-8 flex max:w-[33%] items-center text-xs font-medium ${size} ${
              active == tab.key
                ? `rounded bg-slate-600 text-gray-300`
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
