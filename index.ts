import { from, of, defer, fromEvent, range, timer, interval } from 'rxjs'
import { fromFetch } from "rxjs/fetch";
import {map, distinct, distinctUntilChanged, switchMap, catchError, switchMapTo} from 'rxjs/operators'
import { ajax } from "rxjs/ajax";

console.clear()
/** FROM **/

export const stringer$ = from(['Venkateshwaran Selvaraj', 'AtamNirbhar'])


// stringer$.subscribe(console.log)



export const mapper$ = from(new Map([["Squirtle", "Water"],
    ["Charmander", "Fire"],
    ["Bulbasur", "Grass"]]))

// mapper$.subscribe(console.log)


const promiser$ = from(Promise.resolve('Well Done'))

// promiser$.subscribe(console.log)

const nodePicker$ = from(document.querySelectorAll('p'))

// nodePicker$.subscribe(console.log)



/* FROM EVENT */

const clicker$ = fromEvent(document, 'click');
// clicker$.subscribe(console.log)

const keeeyer$ = fromEvent<KeyboardEvent>(document, 'keydown')
keeeyer$.pipe(map(({code}) => code)).subscribe(console.log)

const mover$ = fromEvent<MouseEvent>(document, 'mousemove')
mover$.pipe(distinctUntilChanged()).subscribe(console.log)

const scroller$ = fromEvent<UIEvent>(document, 'scroll')
scroller$.pipe(distinctUntilChanged()).subscribe(console.log)


/** RANGE */

const ranger$ = range(10)
// ranger$.subscribe(console.log)

const ranger2$ = range(1, 10)
// ranger2$.subscribe(console.log)

const ranger3$ = range(10, 5)
// ranger3$.subscribe(console.log)

const ranger4$ = range(5, 10)
// ranger4$.subscribe(console.log)


/** TIMER */

const timer$ = timer()
// timer$.subscribe(console.log)
console.log('-----')
const timer1$ = timer(1000)
// timer1$.subscribe(console.log)
console.log('-----')
const timer2$ = timer(5000)
// timer2$.subscribe(console.log)
console.log('-----')
const timer3$ = timer(1000, 1000)
// timer3$.subscribe(console.log)


/** INTERVAL */

const intervellar$ = interval()
// intervellar$.subscribe(console.log)

const intervellar1$ = interval(2000)
// intervellar1$.subscribe(console.log)


/** AJAX */

const ajaxer$ = ajax('https://swapi.dev/api/people/1/')
// ajaxer$.subscribe(console.log)

const ajaxer2$ = ajax.getJSON('https://swapi.dev/api/starships/9/');
// ajaxer2$.subscribe(console.log)

const ajaxer3$ = ajax({
  url: 'https://swapi.dev/api/planets/3/',
  method: 'GET',
  headers: {
    'Content-Type': 'json'
  }
})

// ajaxer3$.subscribe(console.log)

/** FROM-FETCH */

const starWarer$ = fromFetch('https://swapi.dev/api/vehicles/14/') 
// starWarer$.subscribe(console.log)

const starWarer1$ = fromFetch('https://swapi.dev/api/vehicles/14/')
// starWarer1$.pipe(switchMap(response => response.json()))
// .subscribe(console.log)

const starWarer2$ = fromFetch('https://swapi.dev/api/vehicles/14/')
.pipe(switchMap(response => {
  if(!response) {
    throw `There was an error with status ${response.status}`;
  }
  return response.json()
  }),
  catchError(error => {
    return of({ error: true, message: error });
  })
);

// starWarer2$.subscribe(console.log)

/** DEFER */
function getPi() {
  const pi = document.querySelectorAll('p')
  return pi[Math.floor(Math.random() * 3)]
}
const offer$ = of(getPi())
offer$.subscribe(console.log)
offer$.subscribe(console.log)
offer$.subscribe(console.log)
const deferrer$ = defer(() => of(getPi()))
deferrer$.subscribe(console.log)
deferrer$.subscribe(console.log)
deferrer$.subscribe(console.log)


