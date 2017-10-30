import {Component, h, render} from 'preact'
import {Observable} from 'rxjs'
import {Bookmarks} from './bookmarks'

interface TabsProps {}
interface TabsState {
  tab: number;
}

export class Tabs extends Component<TabsProps, TabsState> {
  private keysSubscription

  componentDidMount() {
    this.keysSubscription = Observable.fromEvent(document, 'keydown')
      .subscribe(($event: KeyboardEvent) => {
        const tab = Number.parseInt(String.fromCharCode($event.which))
        if (!Number.isNaN(tab) && $event.shiftKey) {
          this.setState({tab})
        }
      })
  }

  componentWillUnmount() {
    this.keysSubscription.unsubscribe()
  }

  public render(props, {tab}: TabsState) {
    return (
      <div class="tabs">
        {!~[1].indexOf(tab) && <div class="hint">
          Press ⇧ + Number to select mode
        </div>}
        {tab === 1 && <Bookmarks />}
      </div>
    )
  }
}
