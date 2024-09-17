import './style.css'
import {Datus} from 'datus.js'

const datus = new Datus()
const date = document.getElementById('date')

date.textContent = datus.now('date')

console.log('Work')