import {ReactElement} from "react";

import GoBackIcon from '@/public/icons/goBackIcon.svg'
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function ({margin}: {margin?: any}): ReactElement {
    const router = useRouter()

    return (
        <div className={'goBackToButton'} style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--darkTheme_componentsBackgroundColor)',
            width: 'fit-content',
            color: 'white',
            padding: '6px 15px',
            borderRadius: '8px',
            margin: `${margin}`,
            cursor: 'pointer'
        }}
             onClick={() => router.back()}>
            <Image src={GoBackIcon}
                   alt="goBackToThePreviousPage"
                   style={{width: 'fit-content'}}/>Go back
        </div>
    )
}