'use server'
import {ReactElement} from "react";
import PageLoader from "@/app/compos/page-loader/PageLoader";

export default async function loadingPage(): Promise<ReactElement>{
    return <PageLoader/>
}