import { from, fromEvent } from 'rxjs'
import {map, distinct, distinctUntilChanged} from 'rxjs/operators'


/** FROM **/

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



/* FROM EVENT */

const clicker$ = fromEvent(document, 'click');
clicker$.subscribe(console.log)

const keeeyer$ = fromEvent<KeyboardEvent>(document, 'keydown')
keeeyer$.pipe(map(({code}) => code)).subscribe(console.log)

const mover$ = fromEvent<MouseEvent>(document, 'mousemove')
mover$.pipe(distinctUntilChanged()).subscribe(console.log)

const scroller$ = fromEvent<UIEvent>(document, 'scroll')
scroller$.pipe(distinctUntilChanged()).subscribe(console.log)