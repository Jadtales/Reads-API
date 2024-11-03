import {useEffect, useState} from 'react';
import ShrinkWindowIcon from '@/public/icons/collapse-diagonal-2-line.svg'
import Image from "next/image";

export default function ListOfContentComponent({contentList}: { contentList: string[] }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        let debouncingTimer: NodeJS.Timeout;

        const handleResize = () => {
            clearTimeout(debouncingTimer)

            debouncingTimer = setTimeout(() => {
                setInnerWidth(window.innerWidth)

                // close the table of contents if width exceeds 500 pixels
                if (window.innerWidth > 750) {
                    setIsOpen(false);
                }

            }, 300)


        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const toggleTableOfContent = () => {
        if (innerWidth <= 750) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={innerWidth >= 800 ? 'listOfContentContainer-largeSize' : 'listOfContentContainer-smallSize'}>
            {innerWidth <= 800 ? (
                <>
                    <div className="tableOfContent-phoneSize">
                        {isOpen ? <Image src={ShrinkWindowIcon} alt={'collapseTheWindow'} onClick={toggleTableOfContent}/> : <h1
                            className='viewListOfContentIcon-phoneSize'
                            onClick={toggleTableOfContent}
                        >
                            T
                        </h1>}
                        {isOpen && (
                            <div className={`tableOfContent`}>
                                <h1>Table of Content</h1>
                                <div className="contentList">
                                    {contentList.map((contentIndex, index) => (
                                        <span key={index}>{contentIndex}.</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className={`tableOfContent-largeSize`}>
                        <h1>Table of Content</h1>
                        <div className="contentList">
                            {contentList.map((contentIndex, index) => (
                                <span key={index}>{contentIndex}.</span>
                            ))}
                        </div>
                    </div>

                </>
            )}
        </div>
    );
}
