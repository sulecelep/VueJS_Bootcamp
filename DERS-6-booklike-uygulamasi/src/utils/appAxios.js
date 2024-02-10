import axios from "axios";

export const appAxios=axios.create({
    baseURL:"http://localhost:3000/",
    headers:{
        //'X-Custom-Header':'foobar',
        //'tokenX':'tokennn',
    }
})