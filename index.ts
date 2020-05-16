import { from } from 'rxjs'

export const stringer$ = from(['Venkateshwaran Selvaraj', 'Jahnavi Reddy'])


stringer$.subscribe(console.log)


export const mapper$ = from(new Map([["Squirtle", "Water"],
    ["Charmander", "Fire"],
    ["Bulbasur", "Grass"]]))

mapper$.subscribe(console.log)


const promiser$ = from(Promise.resolve('Well Done'))

promiser$.subscribe(console.log)

const nodePicker$ = from(document.querySelectorAll('p'))

nodePicker$.subscribe(console.log)

