import { useState, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Album, Track } from "../api/lastfmTypes";
import { AiOutlineClose } from 'react-icons/ai';

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
    const artist = track?.artist?.name || album?.artist;
    const name = track ? `Track: ${track.name}` : `Album: ${album?.name}`; //If track is not null we concate track to the string, otherwise album
    const lastfmurl = track?.url || album?.url;
    const userplays = track?.userplaycount || album?.userplaycount;


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
                  <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-left shadow-xl transition-all">
                    <Dialog.Title as="h3" 
                    className="text-3xl  min-h-fit font-medium leading-8 text-gray-900 mb-4">
                      <div onClick={closeModal} className="float-right close-icon"><AiOutlineClose size="30"/></div>
                      {props.title}
                    </Dialog.Title>
                    <div className="flex flex-row space-x-2">
                      <div className="w-2/5 mr-3 pl-auto pr-0 float-left align-middle">
                        <img className="sm:max-h-24 md:max-h-80 w-full object-contain text-red-400" src={image || undefined} alt="Cover not found"/>
                      </div>
                      <div className="lg:text-lg w-full self-center space-y-1 border-b-[1px] border-b-black">
                        <p>Artist: {artist}</p>
                        <p>{name}</p>
                        <p>LastFM: <p onClick={() => window.location.href=lastfmurl} className="text-blue-400 underline hover:cursor-pointer inline">{lastfmurl}</p></p>
                        <p>Plays at the time of post: {userplays}</p>
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
                  className="text-2xl font-medium leading-6 text-gray-900 mb-4">
                    <div onClick={closeModal} className="float-right close-icon"><AiOutlineClose size="24"/></div>
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