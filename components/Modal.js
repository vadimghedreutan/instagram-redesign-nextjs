import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CameraIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { db, storage } from '../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore'
import { ref, getDownloadURL, uploadString } from '@firebase/storage'

function Modal() {
  const [open, setOpen] = useRecoilState(modalState)
  const { data: session } = useSession()
  const filePikerRef = useRef(null)
  const captionRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const uploadPost = async () => {
    if (loading) return

    setLoading(true)

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })

    console.log('New doc added with ID', docRef.id)

    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadURl = await getDownloadURL(imageRef)

        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURl,
        })
      }
    )

    setOpen(false)
    setLoading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div
          className="flex items-end justify-center min-h-[800px] 
      sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-70 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg 
          px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all 
          sm:my-8 sm:align-middle sm:max-w-sm sm:w-full p-6"
            >
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    className="w-full object-contain cursor-pointer"
                    onClick={() => setSelectedFile(null)}
                  />
                ) : (
                  <div
                    onClick={() => filePikerRef.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full 
                bg-[#FCE1E1] cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-dark"
                    >
                      Upload Photo
                    </Dialog.Title>

                    <div>
                      <input
                        ref={filePikerRef}
                        type="file"
                        hidden
                        onChange={addImageToPost}
                      />
                    </div>

                    <div>
                      <input
                        className="border-none focus:ring-0 w-full text-center"
                        type="text"
                        ref={captionRef}
                        placeholder="Please enter a caption"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    onClick={uploadPost}
                    disabled={!selectedFile}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent 
                  shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white 
                  hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-red-500 sm:text-sm disabled:bg-[#6A7180] disabled:cursor-not-allowed"
                  >
                    {loading ? 'Uploading...' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
