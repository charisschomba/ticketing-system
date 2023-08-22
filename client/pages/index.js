import axios from "axios";
import buildClient from "../api/build-client"

export const getServerSideProps = async ({req}) => {
      const baseUrl = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
      const {data: {currentUser}} = await axios.get(`${baseUrl}/api/v1/auth/currentuser`, {
          headers: req.headers
      })
          .catch(err => console.log(err));
      return { props: { currentUser } }
}

const LandingPage = ({currentUser}) => {
    return (
        <div>
            <h1>{currentUser ? "Your are signed in" : "You are not signed in"}</h1>
        </div>
    )
}

export default LandingPage;