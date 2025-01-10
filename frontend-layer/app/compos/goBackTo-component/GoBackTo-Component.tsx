import {ReactElement} from "react";

import GoBackIcon from '@/public/icons/goBackIcon.svg'
import Image from "next/image";
import {useRouter} from "next/navigation";

interface ComponentProps {
    margin?: string;
    iconSize: string | null;
    withText: boolean;
}

export default function ({margin, withText, iconSize}: ComponentProps): ReactElement<any> {
    const router = useRouter();

    const addPadding = document.createAttribute('withPadding');


    return (
        <div className={'goBackToButton'} style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--darkTheme_componentsBackgroundColor)',
            width: 'fit-content',
            color: 'white',
            padding: withText ? '6px 15px' : '0 0',
            borderRadius: '4px',
            margin: `${margin}`,
            cursor: 'pointer'
        }}
             onClick={() => router.back()}>
            <Image src={GoBackIcon}
                   alt="goBackToThePreviousPage"
                   style={{
                       width: iconSize ? `${iconSize}` : 'fit-content',
                       height: iconSize ? `${iconSize}` : 'fit-content'
                   }}/>
            {withText && 'Go back'}
        </div>
    )
}