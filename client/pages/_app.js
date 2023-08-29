import "bootstrap/dist/css/bootstrap.css";
import { Header } from "../components/header";


export const getServerSideProps = async ({ctx: {req}}) => {
    const baseUrl = 'http://ingress-nginx-controller./ingress-nginx.svc.cluster.local'
    const {data: {currentUser}} = await axios.get(`${baseUrl}/api/v1/auth/currentuser`, {
        headers: req.headers
    })
        .catch(err => console.log(err));
    return { props: { currentUser } }
}

export const AppComponent =  ({Component, pageProps}) => {
    console.log("APP",{pageProps})
    return <div>
        <Header currentUser={pageProps.currentUser}/>
        <Component {...pageProps}/>
    </div>
}

export default AppComponent;    