import { useState, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Album, Track } from "../api/lastfmTypes";

/* We use ReactNode to allow jsx children to be passed to this component
   The point is to make this wrap each post so you can click anywhere inside of them to open the post. */
interface ComponentProps {
  children: ReactNode;

  title: string;
  body: string;
  datetime: string;
  userid: number;
  lastfmattachment: null | Album | Track;
}

const PostItemDialog = (props: ComponentProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //This is modal without attachment
  if(props.lastfmattachment == null) {
    return(
      <>
        <DialogWithoutAttachment {...props} />
      </>
    );
  } else { //This is modal with attachment
    const { album, track } = props.lastfmattachment as Album & Track; //Get the album or track from the props if exists

    const image = track?.album?.image?.[3]?.["#text"] || album?.image?.[3]?.["#text"] || null;
    const artist = track?.artist?.name || album?.artist || null;
    const name = "Track: " + track?.name || "Album: " + album?.name || null; //We insert album and track strings here so we dont have to make a mess in jsx

    return (
      <>
        <div onClick={openModal}>
          {props.children}
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" 
                    className="text-xl font-medium leading-6 text-gray-900">
                      {props.title}
                    </Dialog.Title>
                    <div className="flex flex-row">
                      <img className="sm:max-h-24 md:max-h-80 w-2/4 object-contain text-red-400" src={image || undefined}/>
                      <div>
                        <p>Artist: {artist}</p>
                        <p>{name}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-md text-gray-700">
                        {props.body}
                      </p>
                    </div>

                    <div className="text-gray-700 text-xs font-bold mt-2 border-t-2 border-t-black">
                      <p>Posted on {props.datetime} by {props.userid}</p>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
};

const DialogWithoutAttachment = (props: ComponentProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div onClick={openModal}>
        {props.children}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" 
                  className="text-xl font-medium leading-6 text-gray-900 first-letter:capitalize">
                    {props.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-md text-gray-700">
                      {props.body}
                    </p>
                  </div>
                  <div className="text-gray-700 text-xs font-bold mt-2 border-t-2 border-t-black">
                    <p>Posted on {props.datetime} by {props.userid}</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PostItemDialog;