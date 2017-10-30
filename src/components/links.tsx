import {Component, h, render} from 'preact'
import {Observable} from 'rxjs'

interface LinksProps {}
interface LinksState {
}

export class Links extends Component<LinksProps, LinksState> {
  componentDidMount() {}

  componentWillUnmount() {}

  public render(props, state) {
    let time = new Date(state.time).toLocaleTimeString().split('')
    return (
      <div class="tabs">
      </div>
    )
  }
}
