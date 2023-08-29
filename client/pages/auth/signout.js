import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useRequest } from "../../hooks/use-request";

export default () => {
    const router = useRouter();
    const {makeRequest} = useRequest({
        url: "/auth/signout",
        method: "post",
        body: {},
        onSuccess: () => router.push("/")
    })

    useEffect(() => {
        makeRequest()
    }, [])
    return (<div>Signing you out......</div>)
}