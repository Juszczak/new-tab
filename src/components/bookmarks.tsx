import {Component, h, render} from 'preact'
import {Observable} from 'rxjs'

interface BookmarksProps {}
interface BookmarksState {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
  query: string;
}

export class Bookmarks extends Component<BookmarksProps, BookmarksState> {
  private focusSubscription

  state = {
    bookmarks: [],
    query: '',
  }

  componentDidMount() {
    this.setUpBookmarks()
    this.focusSubscription = Observable.fromEvent(document, 'keydown')
      .filter(({keyCode, ctrlKey}) => !!~'abcdefghijklmnopqrstuvwxyz'
        .indexOf(String.fromCharCode(keyCode).toLowerCase()) && !ctrlKey)
      .subscribe(() => document.getElementById('bookmarks-search').focus())
  }

  componentWillUnmount() {
    this.focusSubscription.unsubscribe()
  }

  public render(props, {bookmarks, query}: BookmarksState) {
    return (
      <div class="bookmarks">
        <input id="bookmarks-search"
               type="text"
               onInput={$event => this.onChange($event)}
               value={query}
               placeholder="Search bookmarks&hellip;" />
        <ul>
        {bookmarks
          .filter(bookmark => this.filterBookmark(bookmark))
          .map((bookmark, index) =>
          <li key={index.toString()}>
            <a href={bookmark.url} target="_blank">
              <span class="title">{bookmark.title}</span>
              <span class="url">{
                bookmark.url
                  .replace(/https?:\/\//, '')
                  .replace(/\/$/, '')
              }</span>
            </a>
          </li>
        )}
        </ul>
      </div>
    )
  }

  private onChange($event) {
    this.setState({query: $event.target.value})
  }

  private filterBookmark({title, url}: chrome.bookmarks.BookmarkTreeNode) {
    const query = this.state.query
    return query.length > 1 && !!(~title.indexOf(query) || ~url.indexOf(query))
  }

  private async setUpBookmarks() {
    const bookmarks = await this.fetch()
    this.setState({bookmarks})
  }

  private fetch() {
    return new Promise<chrome.bookmarks.BookmarkTreeNode[]>((resolve, reject) => {
      chrome.bookmarks.getRecent(1000, (results: chrome.bookmarks.BookmarkTreeNode[]) => {
        resolve(results)
      })
    })
  }
}
