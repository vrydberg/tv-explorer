import axios from 'axios'

// axios(url[, config])- url is optional, but for clarity purposes include

const request = async (url, config) => {
    try {
        const response = await axios(url, config)
        return response.data
    } catch (error) {
        console.log("Axios HTTP request error: " + error.message)
        throw error
    }
}

export { request }
