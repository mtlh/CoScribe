import { createEffect, createSignal, onCleanup } from "solid-js";

export default function HowToUse() {
    // Modal that descibes keyboard shortcuts for the editor
    const [isOpen, setIsOpen] = createSignal(false);

    const openModal = () => {
        setIsOpen(true);
    };
    
    const closeModal = () => {
        setIsOpen(false);
    };

    const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';
    
    onCleanup(() => {
        if (isClient) {
            document.body.style.overflow = 'auto';
          }
    });

    createEffect(() => {
        if (isOpen() && isClient) {
            document.body.style.overflow = 'hidden'; // Lock scrolling
        } else if (isClient) {
            document.body.style.overflow = 'auto'; // Unlock scrolling
        }
    });

    return (
        <>
            <button
                onClick={openModal}
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
            >
                How to use
            </button>

            {isOpen() && (
                <div 
                    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={closeModal}
                >
                    <div
                        class="bg-white p-6 rounded shadow-lg max-w-xl w-full"
                        onClick={(e) => e.stopPropagation()} // Prevent click inside the modal from closing it
                    >
                        <h2 class="header mb-4">How to use.</h2>
                        <p class="mb-4">Bullet points are created by typing "-&nbsp;" on a new line.</p>
                        <p class="mb-4">Numbered lists are created by typing "1.&nbsp;" on a new line.</p>
                        <p class="mb-4">Checklists are created by typing "checklist&nbsp;" on a new line.</p>
                        <button
                            onClick={closeModal}
                            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}