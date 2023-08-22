import axios from "axios";

export default ({req}) => {
    if(typeof  window === undefined){
        return axios.create({
            baseUrl: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })
    } else {
        return  axios.create()
    }
}