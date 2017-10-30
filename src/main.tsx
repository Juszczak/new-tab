import {h, render} from 'preact';
import {Clock, Tabs} from './components'

render(
  <main>
    <Tabs />
    <Clock />
  </main>,
  document.body)
