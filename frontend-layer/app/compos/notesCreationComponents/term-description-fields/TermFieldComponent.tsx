import {ReactElement, useEffect, useRef} from "react";


export default function TermField(): { termField: ReactElement<any> } {
    const termDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const keydownListener = (event: KeyboardEvent): void => {
            if (event.ctrlKey && event.key === 'm') {
                event.preventDefault();
                applyBulletsToSelectedText();
            }

            if (event.ctrlKey && event.key === 'y') {
                event.preventDefault();
                applyOLList();
            }
        };

        document.addEventListener('keydown', keydownListener);

        return () => {
            document.removeEventListener('keydown', keydownListener);
        };
    }, []);

    const applyBulletsToSelectedText = (): void => {
        const selectedText: Selection | null = document.getSelection();
        if (!selectedText || selectedText.rangeCount === 0) return;

        const range: Range = selectedText.getRangeAt(0);

        if (termDivRef.current && termDivRef.current.contains(range.startContainer)) {
            const selectedPlainText: string = selectedText.toString();

            if (selectedPlainText) {
                const lines: string[] = selectedPlainText.split('\n');
                const bulletTextContainer: HTMLUListElement = document.createElement('ul');
                bulletTextContainer.className = 'bulletList';
                bulletTextContainer.style.padding = '10px 30px';

                lines.forEach((line) => {
                    if (line.trim() !== '') {
                        const bulletText: HTMLLIElement = document.createElement('li');
                        bulletText.textContent = line;
                        bulletTextContainer.appendChild(bulletText);
                    }
                });

                range.deleteContents();
                range.insertNode(bulletTextContainer);

                const newRange = document.createRange();
                newRange.setStartAfter(bulletTextContainer);
                newRange.collapse(true);
                selectedText.removeAllRanges();
                selectedText.addRange(newRange);
            }
        }
    };

    const applyOLList = (): void => {
        const selectedText: Selection | null = document.getSelection();
        if (!selectedText || selectedText.rangeCount === 0) return;

        const range: Range = selectedText.getRangeAt(0);

        if (termDivRef.current && termDivRef.current.contains(range.startContainer)) {
            const selectedPlainText: string = selectedText.toString();

            if (selectedPlainText) {
                const lines: string[] = selectedPlainText.split('\n');
                const numberedTextContainer: HTMLOListElement = document.createElement('ol');
                numberedTextContainer.className = 'numberedList';
                numberedTextContainer.style.padding = '10px 30px';

                lines.forEach((line) => {
                    if (line.trim() !== '') {
                        const numberedText: HTMLLIElement = document.createElement('li');
                        numberedText.textContent = line;
                        numberedTextContainer.appendChild(numberedText);
                    }
                });

                range.deleteContents();
                range.insertNode(numberedTextContainer);

                const newRange = document.createRange();
                newRange.setStartAfter(numberedTextContainer);
                newRange.collapse(true);
                selectedText.removeAllRanges();
                selectedText.addRange(newRange);
            }
        }
    };


    const termField: ReactElement<any> = (
        <div id="termInputField"
             ref={termDivRef}
             autoFocus
             data-placeholder={'Chapter number/name'}
             contentEditable={true}
             suppressContentEditableWarning={true}>
        </div>
    )

    return {
        termField
    }
}