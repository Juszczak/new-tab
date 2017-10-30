import {Component, h, render} from 'preact'
import {Observable} from 'rxjs'

interface ClockProps {}
interface ClockState {
  time: number;
}

export class Clock extends Component<ClockProps, ClockState> {
  private intervalSubscription

  constructor() {
    super();
    this.state = {
      time: Date.now()
    };
  }

  componentDidMount() {
    this.intervalSubscription = Observable.interval(1000)
      .subscribe(() => this.setState({time: Date.now()}))
  }

  componentWillUnmount() {
    this.intervalSubscription.unsubscribe()
  }

  public render(props, state) {
    let time = new Date(state.time).toLocaleTimeString().split('')
    return (
      <div class="clock">{
        time.map((character, index) =>
          <span key={index.toString()} className={(index == 2 || index == 5) ? 'd' : 'c'}>{character}</span>)
      }</div>
    )
  }
}
