function Loader() {
  let circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full text-red-500'

  return (
    <div className="flex p-4 justify-center">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  )
}

export default Loader
