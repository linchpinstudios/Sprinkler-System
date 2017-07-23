import axios from 'axios'

export default function (req) {
  let options = {}
  options.headers = {}

  // The server-side needs a full url to works
  if (process.SERVER_BUILD) {
    options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api`
    options.headers = req.headers
  } else {
    // for when navigating around pages client-side (ie. not server rendering)
    options.baseURL = '/api'
  }
  return axios.create(options)
}
