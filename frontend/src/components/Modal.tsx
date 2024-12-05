import React, { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;



// import React, { useState } from 'react';

// const ChatModal = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       {/* Botão para abrir o modal
//       <button
//         onClick={toggleModal}
//         className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
//       >
//         Chat
//       </button> */}

//       {/* Modal */}
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white w-96 rounded-lg shadow-lg flex flex-col">
//             {/* Header do Modal */}
//             <div className="flex justify-between items-center p-4 border-b">
//               <h2 className="text-lg font-semibold">Chat</h2>
//               <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
//                 ✖
//               </button>
//             </div>
//             <ChatModal />
//           </div>
//         </div>
//     </>
//   );
// };

// export default ChatModal;
