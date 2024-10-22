import {useEffect, useState} from 'react';


export default function ListOfContentComponent({contentList}: { contentList: string[] }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth)

            // close the table of contents if width exceeds 500 pixels
            if (window.innerWidth > 500) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleTableOfContent = () => {
        if (innerWidth <= 500) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={innerWidth > 500 ? 'listOfContentContainer-largeSize' : 'listOfContentContainer-smallSize'}>
            {innerWidth <= 500 ? (
                <>
                    <div className="tableOfContent-phoneSize">
                        <h1
                            className='viewListOfContentIcon-phoneSize'
                            onClick={toggleTableOfContent}
                        >
                            T
                        </h1>
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
