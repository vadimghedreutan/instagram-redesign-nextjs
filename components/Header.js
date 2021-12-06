import { HomeIcon } from '@heroicons/react/solid'
import {
  SearchIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import router from 'next/router'

function Header() {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)

  return (
    <header
      className="flex justify-between items-center 
    p-4 max-w-7xl md:mx-auto sticky top-0 z-50 bg-white"
    >
      {/* Logo */}
      <div>
        <img
          src="logo.svg"
          alt=""
          className="h-10 cursor-pointer"
          onClick={() => router.push('/')}
        />
      </div>
      {/* nav */}
      <div className="flex items-center space-x-4">
        <HomeIcon className="icons" onClick={() => router.push('/')} />
        <SearchIcon className="icons" />
        <PaperAirplaneIcon className="icons rotate-45" />
      </div>
      {/* user */}
      <div className="flex items-center space-x-4">
        {session && (
          <PlusCircleIcon
            onClick={() => setOpen(true)}
            className="w-9 h-9 text-red-300 cursor-pointer 
    hover:scale-125 transition-all duration-150 ease-out;"
          />
        )}
        {session ? (
          <img
            onClick={signOut}
            src={session.user.image}
            alt=""
            className="h-8 w-8 rounded-full cursor-pointer object-cover"
          />
        ) : (
          <button onClick={signIn} className="text-semibold cursor-pointer">
            Sign In
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
