import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Settings() {
    const router = useRouter();
    
    useEffect(() => {
        // On mount, redirect to profile settings
        router.replace('/settings/profile')
    }, []);

    return(
        <></>
    )
}