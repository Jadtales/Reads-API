import {Fragment, MouseEvent as ReactMouseEvent, ReactElement} from "react";
import './deleteNoteCardModalStyling.css'
interface ComponentProps {
    deleteIsClicked: (event: ReactMouseEvent, modalRef: any) => void;
    modalRefProp: any;
}

export default function DeleteNotecardModal({deleteIsClicked, modalRefProp}: ComponentProps): ReactElement {
    const modalRef = modalRefProp;


    const handleModalToggling = (): void => {
        if (!modalRef.current?.open) {
            modalRef.current?.showModal();
        } else {
            modalRef.current.close();
        }
    };

    const handleNotecardDeletion = (event: ReactMouseEvent): void => {
        if (modalRef.current?.open) {
            deleteIsClicked(event, modalRef);
        }
    };


    return <Fragment>
        <li onClick={handleModalToggling}>Delete</li>

        <dialog ref={modalRefProp} className={'noteCardDeletionDialog'}>
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