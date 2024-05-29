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
                        class="bg-white p-6 rounded shadow-lg w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()} // Prevent click inside the modal from closing it
                    >
                        <h2 class="header mb-10 underline">How to use.</h2>
                        <div class="p-6 border border-slate-300 rounded-md">
                            <ul class="list-disc mb-4"><li>Bullet points are created by typing "-&nbsp;" on a new line.</li></ul>
                            <ol class="list-decimal mb-4"><li>Numbered lists are created by typing "1.&nbsp;" on a new line.</li></ol>
                            <p class="mb-4"><input type="checkbox" class="checkbox" /> Checklists are created by typing "checklist&nbsp;" on a new line.</p>
                            <p class="mb-4 text-base">Base text is created by typing "base&nbsp;" on a new line.</p>
                            <p class="mb-4 h1">Headings are created by typing "h1&nbsp;" on a new line.</p>
                        </div>
                        <button
                            onClick={closeModal}
                            class="px-4 py-2 mt-6 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}