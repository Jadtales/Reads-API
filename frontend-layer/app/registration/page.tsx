'use client'
import {ReactElement, useState} from "react";
import Image from "next/image";
import './registrationPageStyling.css'

// imported icons
import ReadnotesIcon from '@/favicon.png'
import GoogleIcon from '@/public/icons/google-fill.svg'
import {TextEffect} from "@/animationStyling/TextEffect";

export default function RegistrationComponentPage(): ReactElement {
    const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false);
    const [getUserCredentials, setUserCredentials] = useState<string>('');
    const [quoteData, setQuoteData] = useState<{ quote: string, author: string } | null>(null);

    const handleRegistrationMethodSwitching = (): void => {
        setIsUserRegistered(!isUserRegistered);
    }

    const getUsername = (event): void => {
        setUserCredentials(event.target.value)
    }


    return (
        <div className="registrationPageContainer">
            <div className="login_signup_container">
                <div className="registrationHeadTitle">
                    <Image src={ReadnotesIcon} alt="reanoesIcon" width={60}/> Reanotes.
                </div>

                {isUserRegistered ? <div className="registrationFormSwitch">
                        <span onClick={handleRegistrationMethodSwitching}>Sign up</span>
                        , if you don't have an account.</div>
                    : <div className="registrationFormSwitch">
                        <span onClick={handleRegistrationMethodSwitching}>Log in</span>
                        , if you already have an account
                    </div>}

                {isUserRegistered ?
                    <div className="loginForm">
                        <form action="">
                            <input type="email" placeholder={"Enter your email"}/>
                            <input type="password" placeholder={"Enter your password"}/>
                            <span style={{textAlign: 'center', fontWeight: 'lighter'}}>or, connect with google</span>
                            <button type="submit"><Image src={GoogleIcon} alt="signupWithGoogle"/></button>
                        </form>


                    </div>
                    :
                    <div className="registrationForm">
                        <form action={`registration_completion/${getUserCredentials}`}>
                            <input type="text" placeholder="Enter your username" onChange={getUsername}/>
                            <input type="number" placeholder="Enter your age"/>
                            <input type="email" placeholder="Enter your email"/>
                            <input type="password" placeholder="Enter your password"/>
                            <button>Sign up</button>
                            <span style={{textAlign: 'center', fontWeight: 'lighter'}}>or, connect with google</span>
                            <button><Image src={GoogleIcon} alt="signupWithGoogle"/></button>
                        </form>
                    </div>}
            </div>
            <div className="quotes">
                <h1>“You can never get a cup of tea large enough or a book long enough to suit me.”</h1>
                <span>― C.S. Lewis</span>
            </div>
        </div>
    )
}