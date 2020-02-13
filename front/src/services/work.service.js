import axios from 'axios'
import AuthHeader from './auth.header'

const URL = process.env.VUE_APP_API_URL + 'works/'

class workService {
    
    getWorks(payload) {
        AuthHeader.changeHeadersToken()
        return axios.get(URL, {
            params:{
                type:payload.type,
                study_id:payload.study_id
            }
        })
    }

    createWork(payload) {
        AuthHeader.changeHeadersToken()
        return axios.post(URL, {
            params:{
                type:payload.type,
                study_id:payload.study_id
            }
        })
    }
}

export default new workService()