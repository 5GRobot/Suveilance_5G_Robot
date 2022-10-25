import axios from 'axios';

export const controlUp = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, { W: 1, A: 0, S: 0, D: 0 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
}

export const controlDown = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, {  W: 0, A: 0, S: 1, D: 0 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
}


export const controlLeft = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, {  W: 0, A: 1, S: 0, D: 0 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
}


export const controlRight = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, {  W: 0, A: 0, S: 0, D: 1  })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
}

export const controlUpLeft = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, { W: 1, A: 1, S: 0, D: 0 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
}
export const controlUpRight = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, { W: 1, A: 0, S: 0, D: 1 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
}

export const controlDownLeft = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, { W: 0, A: 1, S: 1, D: 0 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
}

export const controlDownRight = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, { W: 0, A: 0, S: 1, D: 1 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
}

export const controlStop = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, {  W: 0, A: 0, S: 0, D: 0 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
}
