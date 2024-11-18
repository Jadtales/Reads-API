import {ReactElement} from "react";

import GoBackIcon from '@/public/icons/goBackIcon.svg'
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function (): ReactElement {
    const router = useRouter()

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--darkTheme_componentsBackgroundColor)',
            width: 'fit-content',
            color: 'white',
            padding: '6px 15px',
            borderRadius: '8px',
            margin: '30px 10%',
            cursor: 'pointer'
        }}
             onClick={() => router.back()}>
            <Image src={GoBackIcon}
                   alt="goBackToThePreviousPage"
                   style={{width: 'fit-content'}}/>Go back
        </div>
    )
}