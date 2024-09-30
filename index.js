import './style.css'
import {Datus} from 'datus.js'

const datus = new Datus()

const cards = document.querySelectorAll('.card__item-container')
const date = document.getElementById('date')

const searchButtons = document.querySelectorAll('.search-btns__item')
const mainInput = document.querySelector('.main-search')
const searchBtn = document.querySelector('.search-btn')

let inputValue = localStorage.getItem('input') !== null ? JSON.parse(localStorage.getItem('input')) : '' 

cards.forEach(el => {
    el.addEventListener('mousemove', e => {
        const card = e.target
        let time = card.getAttribute('data-time')

        if (time) {
            time = Math.floor(datus.time(time, 'deconvert') / 6e1)
            time += datus.time(datus.now('time'), 'deconvert')
            time = datus.time(time)

            date.textContent = `Watched up to ${time} | ${datus.now('date')}`        
        }
    })
})

searchButtons.forEach(el => {
    el.addEventListener('click', e => {
        searchButtons.forEach(btn => {
            if (btn.textContent !== el.textContent) {
                btn.classList.remove('search-btns__item-active')
            }
        })

        e.target.classList.add('search-btns__item-active')
    })
})

const onUpdateSearchResult = () => {
    localStorage.setItem('input', JSON.stringify(inputValue))
    mainInput.textContent = ''
}

mainInput.setAttribute('placeholder', inputValue !== '' ? inputValue : 'Введите запрос')

mainInput.addEventListener('input', e => {
    inputValue = e.target.value
})

mainInput.addEventListener('keypress', e => {
    if (e.code === 'Enter') {
        onUpdateSearchResult()
    }
})

searchBtn.addEventListener('click', onUpdateSearchResult)