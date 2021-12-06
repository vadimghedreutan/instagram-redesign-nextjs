function Story({ img, username }) {
  return (
    <div>
      <img
        src={img}
        alt=""
        className="h-14 w-14 rounded-full p-[1.5px] cursor-pointer border-2 border-red-500 object-contain
      hover:scale-110 transition transform duration-200 ease-out"
      />
      <p className="mt-2 text-xs text-center w-14 truncate">{username}</p>
    </div>
  )
}

export default Story
