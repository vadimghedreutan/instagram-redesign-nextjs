import Image from 'next/image'
import { getProviders, signIn } from 'next-auth/react'

import signin_cover from '../../Images/signin_cover.jpg'
import logo from '../../Images/logo.svg'

function SignIn({ providers }) {
  return (
    <div className="h-screen bg-white py-6">
      <div className="grid md:grid-cols-2 mx-auto max-w-4xl">
        <div className="hidden md:inline-grid">
          <Image src={signin_cover} />
        </div>
        <div className="p-6 w-full">
          <div className="bg-gray p-12 text-center rounded-md">
            <Image src={logo} alt="" className="w-24" />

            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: '/',
                    })
                  }
                  className="mt-4 p-2 bg-blue-500 rounded-md w-full text-white hover:opacity-90"
                >
                  Log In with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-32 mx-auto max-w-4xl text-sm text-gray-dark">
        <p>English (UK)</p>
        <p>© 2021 Instagram from Meta</p>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default SignIn
