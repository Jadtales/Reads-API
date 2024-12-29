import {ReactElement} from "react";

export default function PageLoader(): ReactElement<any> {
    return <div className="pageLoader"
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'var(--darkThemeBody)',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: '200'
                }}>

        <span style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '5rem',
            letterSpacing: '10px',
            animation: 'ease',
            color: 'var(--textColor_gray_dark)'
        }}>
            Reanotes
        </span>

    </div>
}