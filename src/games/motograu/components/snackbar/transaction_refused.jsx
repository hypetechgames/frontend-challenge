export default function Error({
  index,
}) {
  return (
    <div
      className="mt-4 absolute bg-[#121212] rounded-lg top-4 z-50 border-t-[8px] border-red-700 border-opacity-70 max-w-full w-[300px] text-center"
      style={{ top: `${index == 0 ? 20 : 20 + 80 * index}px` }}
    >
      <section
        className={
          'text-gray-200'
        }
        role="alert"
      >
        <div className="flex items-center p-3">
          <p className="font-bold text-xs my-0">Não foi possível contabilizar sua aposta.</p>
          <p className="text-[10px] opacity-50 my-0">Tente novamente e contate o suporte caso o problema persista.</p>
        </div>
      </section>
    </div>
  )
}
