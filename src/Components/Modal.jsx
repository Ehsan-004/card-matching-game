import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";


const Modal = forwardRef(function Modal({ title, children, id, className }, ref) {
    const dialog = useRef()
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            }
        };
    })

    return createPortal(
        <dialog
            ref={dialog}
            id={id}
            class={className}>
            <h1 class="page-title">{title}</h1>
            {children}
        </dialog>,
        document.getElementById('modal')
    );
})

export default Modal;