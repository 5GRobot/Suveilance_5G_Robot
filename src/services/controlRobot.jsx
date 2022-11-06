import axios from 'axios';
import io from 'socket.io-client'
const socket = io.connect(`${import.meta.env.VITE_SERVER_IO}`)

export const controlUp = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, { W: 1, A: 0, S: 0, D: 0 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
    // socket.emit('control', { W: 1, A: 0, S: 0, D: 0 })

}

export const controlDown = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, {  W: 0, A: 0, S: 1, D: 0 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
    // socket.emit('control', { W: 0, A: 0, S: 1, D: 0 })
    
}


export const controlLeft = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, {  W: 0, A: 1, S: 0, D: 0 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
    // socket.emit('control', { W: 0, A: 1, S: 0, D: 0 })
}


export const controlRight = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, {  W: 0, A: 0, S: 0, D: 1  })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
    // socket.emit('control', { W: 0, A: 0, S: 0, D: 1 })
}

export const controlUpLeft = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, { W: 1, A: 1, S: 0, D: 0 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
    // socket.emit('control', { W: 1, A: 1, S: 0, D: 0 })

}
export const controlUpRight = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, { W: 1, A: 0, S: 0, D: 1 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
    // socket.emit('control', { W: 1, A: 0, S: 0, D: 1 })
}

export const controlDownLeft = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, { W: 0, A: 1, S: 1, D: 0 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
    // socket.emit('control', { W: 0, A: 1, S: 1, D: 0 })

}

export const controlDownRight = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, { W: 0, A: 0, S: 1, D: 1 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
    // socket.emit('control', { W: 0, A: 0, S: 1, D: 1 })

}

export const controlStop = () => {
    axios.post(`${import.meta.env.VITE_API}/mqtt/Control`, {  W: 0, A: 0, S: 0, D: 0 })
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
    // socket.emit('control', { W: 0, A: 0, S: 0, D: 0 })

}
