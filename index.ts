import { from, of, defer, fromEvent, range, timer, interval, generate } from 'rxjs'
import { fromFetch } from "rxjs/fetch";
import {map, distinct, distinctUntilChanged, distinctUntilKeyChanged, switchMap, catchError, switchMapTo, concatMap, last, delay, first, skipUntil, skipWhile, skip, skipLast, find, take, takeLast, exhaustMap} from 'rxjs/operators'
import { ajax } from "rxjs/ajax";

console.clear()
const obj = [
  { name: "Squirtle", type: "Water" },
  { name: "Oquirrle", type: "Mercury" },
  { name: "Bulbasaur", type: "Grass" },
  { name: "Bulbasaur", type: "Grass" },
  { name: "Charmander", type: "Fire" },
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
  { name: "Bulbasaur", type: "Grass" }
]
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
// keeeyer$.pipe(map(({code}) => code)).subscribe(console.log)

const mover$ = fromEvent<MouseEvent>(document, 'mousemove')
// mover$.pipe(distinctUntilChanged()).subscribe(console.log)

const scroller$ = fromEvent<UIEvent>(document, 'scroll')
// scroller$.pipe(distinctUntilChanged()).subscribe(console.log)


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
const timer1$ = timer(1000)
// timer1$.subscribe(console.log)
const timer2$ = timer(5000)
// timer2$.subscribe(console.log)
const timer3$ = timer(4000, 1000)
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
// offer$.subscribe(console.log)
// offer$.subscribe(console.log)
// offer$.subscribe(console.log)
const deferrer$ = defer(() => of(getPi()))
// deferrer$.subscribe(console.log)
// deferrer$.subscribe(console.log)
// deferrer$.subscribe(console.log)


/** Delay */
const collectionIds = [1, 2, 34,544,55]
const delayer$ = from(collectionIds).pipe(concatMap(val => of(val).pipe(delay(1000))))
// delayer$.subscribe(
//   rs => console.log(rs),
//   err => console.log(err),
//   () => console.log('done')
// )

/** FIRST  */

const firster$ = from([1, 2, 3, 4, 5, 6, 7, 19])
// firster$.pipe(first()).subscribe(console.log)

const firstEventer$ = fromEvent(document, 'click')
// firstEventer$.pipe(first()).subscribe(console.log)

const firstElementer$ = from<NodeListOf<HTMLParagraphElement>>(document.querySelectorAll('p'))
//First value based on condition
// firstElementer$
// .pipe(first(({textContent}) => textContent.includes('V')))
// .subscribe(console.log)
//First but a default value
// firstElementer$
// .pipe(first(({textContent}) => textContent.includes('v'), '<p>Butter</p>'))
// .subscribe(console.log)

/** Generate */

const generator$ = generate(10, x => x < 10000, x => x * 5)
// generator$.subscribe(console.log)

const generator2$ = generate({
  initialState: 100,
  condition: x => x < 100000,
  iterate: x => x * 10
})
// generator2$.subscribe(console.log)


/** distinctUntilChanged */

const distincterUC$ = from([1, 2, 22,22,44,2,1,1,1,12,,3,4,5])
// distincterUC$.pipe(distinctUntilChanged()).subscribe(console.log)

const distincterUC1$ = of(1, 2, 22,22,44,2,1,1,1,12,3,4,5)
// distincterUC1$.pipe(distinctUntilChanged()).subscribe(console.log)


const pokemon$ = of(
  { name: "Squirtle", type: "Water" },
  { name: "Bulbasaur", type: "Grass" },
  { name: "Bulbasaur", type: "Grass" },
  { name: "Charmander", type: "Fire" },
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
  { name: "Bulbasaur", type: "Grass" }
).pipe(
  distinctUntilChanged(({name: newname}, {name}) => newname === name)
)

// pokemon$.subscribe(console.log)

/** Skip Until */

const skipperUntil$ = interval(1000)
const clicker1$ = fromEvent(document, 'click')
const timerer$ = timer(10000)

// skipperUntil$.pipe(skipUntil(clicker1$)).subscribe(console.log)
// skipperUntil$.pipe(skipUntil(timerer$)).subscribe(console.log)


/** SkipWhile  */

const skipWhiler$ = interval(1000).pipe(skipWhile(x => x < 4))
// skipWhiler$.subscribe(console.log)

const skipWhiler1$ = from([
  { name: "Bulbasaur", type: "Grass" },
  { name: "Chikorita", type: "Grass" },
  { name: "Charmander", type: "Fire" },
  { name: "Treecko", type: "Grass" },
  { name: "Squirtle", type: "Water" }
]).pipe(skipWhile(({type}) => type === 'Grass'))
// skipWhiler1$.subscribe(console.log)

/** SKIP */

const skipper$ = fromEvent<MouseEvent>(document, 'scroll').pipe(skip(100))
// skipper$.subscribe(console.log)


/** SKIP LAST */
const skipLaster$ = of(149, 244, 2, 1, 3, 4, 4, 5, 2, 6, 7, 8, 7, 34).pipe(skipLast()); // By default skips last one
// skipLaster$.subscribe(console.log)

const skipLaster1$ = of(149, 244, 2, 1, 3, 4, 4, 5, 2, 6, 7, 8, 7, 34).pipe(skipLast(5)); // 
// skipLaster1$.subscribe(console.log)


/** distinct */
const distincter$ = from([1, 3, 4, 5,4,4,4, 5,6,3,1,3,550, 10]).pipe(distinct())
// distincter$.subscribe(console.log)
const distincter1$ = of(
  { name: "Squirtle", type: "Water" },
  { name: "Bulbasaur", type: "Grass" },
  { name: "Bulbasaur", type: "Grass" },
  { name: "Charmander", type: "Fire" },
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
  { name: "Bulbasaur", type: "Grass" }
).pipe(distinct(({name}) => name))
// distincter1$.subscribe(console.log)

/** Last */
const laster$ = from(document.querySelectorAll('p')).pipe(last())
// laster$.subscribe(console.log)

const laster1$ = from(obj).pipe(last(({type}) => type === 'Fire'))
// laster1$.subscribe(console.log)

/** distinctUntilKeyChanged */

const distinctUCK$ = fromEvent<KeyboardEvent>(document, 'keydown')
.pipe(distinctUntilKeyChanged('keyCode'))
distinctUCK$.subscribe(console.log)

const distinctUCK1$ = from(obj)
.pipe(
  distinctUntilChanged(
    ({name : oldname}, {name}) => name.substring(0, 3) === oldname.substring(0, 3), 
  )
)
// distinctUCK1$.subscribe(console.log)

/** Find */

const finder$ = from(obj).pipe(find(({name}) => name.includes('aur')))
// finder$.subscribe(console.log)

/** Take */

const taker$ = from(obj).pipe(take(2))
// taker$.subscribe(console.log)

/** Take Last */

const takeLaster$ = from(obj).pipe(takeLast(3))
takeLaster$.subscribe(console.log)

var clicks = fromEvent(document, 'click');
var results = clicks.pipe(
  exhaustMap(ev => interval(1000).pipe(take(1)))
);

results.subscribe(console.log)