import {Fragment, MouseEvent as ReactMouseEvent, ReactElement, useRef} from "react";

interface ComponentProps{
    deleteIsClicked: (event: ReactMouseEvent, modalRef: any) => void;
}

export default function DeleteNotecardModal({deleteIsClicked}: ComponentProps): ReactElement {
    const modalRef = useRef<HTMLDialogElement>(null);


    const handleModalToggling = (): void => {
        if (!modalRef.current?.open) {
            modalRef.current?.showModal();
        } else {
            modalRef.current.close();
        }
    };

    const handleNotecardDeletion = (event: ReactMouseEvent): void => {
        if(modalRef.current?.open) {
            deleteIsClicked(event, modalRef);
        }
    };


    return <Fragment>
        <li onClick={handleModalToggling}>Delete</li>

        <dialog ref={modalRef} style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '5px',
            cursor: 'default',
            backgroundColor: 'var(--darkThemeBody-darkerGray_black)',
            border: 'var(--border_tags)'
        }}>
            <div style={{marginBottom: '2rem', fontSize: '1.2rem'}}>Are you sure about deleting your Notecard?</div>
            <div className="chosenButtons" style={{display: 'flex', gap: '5px', justifyContent: 'end'}}>
                <button onClick={handleNotecardDeletion} style={{
                    padding: '6px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    outline: 'none',
                    color: 'var(--textColor_in_dark_mode)',
                    cursor: 'pointer',
                    backgroundColor: "var(--secondPrimaryTextColor)"
                }}>Delete
                </button>
                <button onClick={handleModalToggling} style={{
                    padding: '6px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    outline: 'none',
                    color: 'var(--textColor_in_dark_mode)',
                    cursor: 'pointer',
                    backgroundColor: "black"
                }}>Cancel
                </button>
            </div>
        </dialog>
    </Fragment>
}