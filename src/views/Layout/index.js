//  Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faBars,
  faRocket,
  faTrophy,
  faUsers,
  faSearch,
  faEllipsisH,
  faStar,
  faLink,
  faFile,
  faComment,
  faPaperclip,
  faLaughBeam,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons'
import home from '../../assets/images/svg/home.svg';

//  API
import {getChatCommits} from "../../api";

//  Actions
import {chatAddCommit} from '../../actions';

//  Styles
import styles from './styles.scss';

const mapStateToProps = state => ({
  user: state.user.data,
  people: state.people,
  channels: state.channels.data,
  emitter: state.chat.emitter,
  favorites: state.favorites,
  recent: state.recent,
  commits: state.chat.commits,
});

const mapDispatchToProps = dispatch => ({
  chatAddCommit(commits) {
    chatAddCommit({commits, dispatch});
  }
});

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      commit: ''
    };

    this.setCommit = this.setCommit.bind(this);
  }

  async componentDidMount() {
    const {user, emitter} = this.props;

    let commits = await getChatCommits();

    commits = commits.map(commit => {
      if (!commit.created_at) commit.created_at = moment(new Date()).format();

      switch (commit.user.name) {
        case 'Bender':
          return {
            ...commit,
            user: {
              ...commit.user,
              avatar: user.photo
            }
          };

        case 'Pickle Rick':
          return {
            ...commit,
            user: {
              ...commit.user,
              avatar: emitter.avatar
            }
          };

        default:
          return commit;
      }
    });

    this.props.chatAddCommit(commits);
  }

  setCommit(_event_) {
    const {name, photo} = this.props.user;

    const isValidKey = _event_.charCode === 13;
    const commit = _event_.currentTarget.value;

    if (isValidKey) {
      this.setState({commit: ''});
      this.props.chatAddCommit([{
        user: {
          name,
          username: name,
          id: 1,
          avatar: photo
        },
        created_at: moment(new Date()).format(),
        receiver_id: 2,
        message: commit
      }]);
    }
  }

  render() {
    const {
      children,
      favorites,
      user,
      recent,
      channels,
      people,
      emitter,
      commits
    } = this.props;

    const {commit, showMenu} = this.state;

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles['buttons-group']}>
            <div className={styles.btn}>Click Me!</div>
            <div className={styles.btn}>Click Me!</div>
            <div className={styles.btn}>Click Me!</div>
          </div>

          <div className={styles.title}>
            <h1 className={styles.text}>Title</h1>
          </div>

          <div className={styles.actions}>
            <div className={`${styles.btn} ${styles['btn-menu']}`} onClick={() => this.setState({showMenu: !showMenu})}>
              <FontAwesomeIcon className={styles.icon} icon={faBars}/>
            </div>

            <div className={styles.btn}>
              <FontAwesomeIcon className={styles.icon} icon={faRocket}/>
            </div>

            <div className={styles.btn}>
              <FontAwesomeIcon className={styles.icon} icon={faTrophy}/>
            </div>

            <div className={styles.btn}>
              <FontAwesomeIcon className={styles.icon} icon={faUsers}/>
            </div>

            <div className={styles.btn}>
              <img className={styles.img} alt={`foto del usuario ${user.name} ${user.lastname}`} src={user.photo}/>
            </div>
          </div>
        </header>

        <aside className={`${styles.menu} ${styles[showMenu ? 'menu-active' : 'menu-inactive']}`}>
          {/* <UserBackgroundImage> */}
          <div className={styles['close-menu']} onClick={() => this.setState({showMenu: !showMenu})}>
            <div className={styles.wrapper}>
              <FontAwesomeIcon className={styles.icon} icon={faBars}/>
            </div>
          </div>
          {/* <UserBackgroundImage> */}

          {/* <UserBackgroundImage> */}
          <div className={styles['user-bg']}>
            <img className={styles.img} src={user.backgroundImage} alt="Imagen de fondo"/>
          </div>
          {/* <UserBackgroundImage/> */}

          {/* <Search> */}
          <div className={styles.search}>
            <div className={styles.wrapper}>
              <div className={styles.entry}>
                <input className={styles.input} type="text" placeholder="Buscar personas y canales"/>
              </div>

              <div className={styles.btn}>
                <FontAwesomeIcon className={styles.icon} icon={faSearch}/>
              </div>
            </div>
          </div>
          {/* <Search/> */}

          {/* <Favorites> */}
          <div className={styles.favorites}>
            <div className={styles.title}>
              <h3 className={styles.text}>Favoritos</h3>
            </div>

            <div className={styles['users-list']}>
              {_.map(favorites.users, (_user_, key) => (
                <div key={`menu:module:user:${key}`}
                     className={`${styles.user} ${_user_.status === 'active' && styles['user-selected']}`}>
                  <div className={styles.status}>
                    <div className={styles[_user_.status]}/>
                  </div>

                  <div className={styles.avatar}>
                    <img alt={`Foto de ${_user_.name} ${_user_.lastname || ''}`} src={_user_.avatar}
                         className={styles.img}/>
                  </div>

                  <div className={styles.fullname}>
                    <span
                      className={styles.text}>{`${_user_.name} ${_user_.lastname || ''} ${_user_.name === user.name ? ' ─ Tú' : ''}`}</span>
                  </div>

                  {_user_.status === 'active' && (
                    <div className={styles.btn}>
                      <FontAwesomeIcon className={styles.icon} icon={faEllipsisH}/>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* <Favorites/> */}

          {/* <Recent> */}
          <div className={styles.recent}>
            <div className={styles.title}>
              <h3 className={styles.text}>Recientes</h3>
            </div>

            <div className={styles['recent-list']}>
              {_.map(recent.users, (_user_, key) => (
                <div key={`menu:module:recent:${key}`}
                     className={`${styles.recent} ${_user_.status === 'active' && styles['user-selected']}`}>
                  <div className={styles.status}>
                    <div className={styles[_user_.status]}/>
                  </div>

                  <div className={styles.avatar}>
                    <img alt={`Foto de ${_user_.name} ${_user_.lastname || ''}`} src={_user_.avatar}
                         className={styles.img}/>
                  </div>

                  <div className={styles.fullname}>
                    <span
                      className={styles.text}>{`${_user_.name} ${_user_.lastname || ''} ${_user_.name === user.name ? ' ─ Tú' : ''}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <Recent/> */}

          {/* <Channels> */}
          <div className={styles.channels}>
            <div className={styles.title}>
              <h3 className={styles.text}>Canales</h3>
            </div>

            <div className={styles['channel-list']}>
              {_.map(channels, (channel, key) => (
                <div key={`menu:module:channel:${key}`}
                     className={`${styles.channel} ${true && styles['channel-selected']}`}>
                  <div className={styles.hash}>
                    <span className={styles.text}>#</span>
                  </div>

                  <div className={styles.name}>
                    <span className={styles.text}>{`${channel.name}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <Channels/> */}

          {/* <People> */}
          <div className={styles.people}>
            <div className={styles.title}>
              <h3 className={styles.text}>Personas</h3>
            </div>

            <div className={styles['people-list']}>
              {_.map(people.users, (_user_, key) => (
                <div key={`menu:module:person:${key}`}
                     className={`${styles.person} ${_user_.status === 'active' && styles['person-selected']}`}>
                  <div className={styles.status}>
                    <div className={styles[_user_.status]}/>
                  </div>

                  <div className={styles.avatar}>
                    <img alt={`Foto de ${_user_.name} ${_user_.lastname || ''}`} src={_user_.avatar}
                         className={styles.img}/>
                  </div>

                  <div className={styles.fullname}>
                    <span
                      className={styles.text}>{`${_user_.name} ${_user_.lastname || ''} ${_user_.name === user.name ? ' ─ Tú' : ''}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <People/> */}
        </aside>

        <section className={styles.chat}>
          <header className={styles.header}>
            {/* <Photothumb> */}
            <div className={styles.photothumb}>
              <img src={emitter.avatar} alt={`Foto del usuatio ${emitter.name}`} className={styles.img}/>
            </div>
            {/* <Photothumb/> */}

            {/* <Meta> */}
            <div className={styles.meta}>
              {/* <Fullname> */}
              <div className={styles.fullname}>
                <h3 className={styles.text}>{`${emitter.name} ${emitter.lastname}`}</h3>
              </div>
              {/* <Fullname/> */}

              {/* <Favorite> */}
              <div className={styles.favorite}>
                <FontAwesomeIcon className={styles.icon} icon={faStar}/>
              </div>
              {/* <Favorite/> */}

              {/* <Status> */}
              <div className={styles.status}>
                <div className={styles.icon}/>

                <span className={styles.text}>{emitter.status === 'active' ? 'online' : emitter.status}</span>
              </div>
              {/* <Status/> */}

              {/* <Location> */}
              <div className={styles.location}>
                <div className={styles.icon}>
                  <img className={styles.img} src={home} alt="icono de casa"/>
                </div>

                <span className={styles.text}>{emitter.location}</span>
              </div>
              {/* <Location/> */}
            </div>
            {/* <Meta/> */}

            {/* <SearchChat> */}
            <div className={styles.search}>
              <div className={styles.wrapper}>
                <div className={styles.entry}>
                  <input className={styles.input} type="text" placeholder="Buscar un mensage"/>
                </div>

                <div className={styles.btn}>
                  <FontAwesomeIcon className={styles.icon} icon={faSearch}/>
                </div>
              </div>
            </div>
            {/* <SearchChat/> */}

            {/* <ActionChat/> */}
            <div className={styles.actions}>
              <div className={`${styles.action} ${styles['action-selected']}`}>
                <FontAwesomeIcon className={styles.icon} icon={faComment}/>
                <span className={styles.text}>Chat</span>
              </div>

              <div className={styles.action}>
                <FontAwesomeIcon className={styles.icon} icon={faFile}/>
                <span className={styles.text}>Archivos</span>
              </div>

              <div className={styles.action}>
                <FontAwesomeIcon className={styles.icon} icon={faLink}/>
                <span className={styles.text}>Links</span>
              </div>
            </div>
            {/* <ActionChat/> */}
          </header>

          {/* <Commits> */}
          <article className={styles.commits}>
            {_.map(commits, (commit, key) => (
              <div
                key={`chat:module:commit:${key}`}
                className={`${styles.commit} ${styles[commit.user.name === user.name ? 'commit-start' : 'commit-end']}`}
              >
                {/* <Photothumb> */}
                <div className={styles.photothumb}>
                  <img src={commit.user.avatar} alt={`Foto del usuatio ${commit.user.name}`} className={styles.img}/>
                </div>
                {/* <Photothumb/> */}

                <div className={styles.content}>
                  <div className={styles.date}>
                    <span className={styles.text}>{moment(commit.created_at).format('YYYY-MM-DD HH:MM a')}</span>
                  </div>

                  <div className={styles.message}>
                    <span className={styles.text}>{commit.message}</span>
                  </div>
                </div>
              </div>
            ))}
          </article>
          {/* <Commits> */}

          {/* <Entry> */}
          <footer className={styles.entry}>
            {/* <Photothumb> */}
            <div className={styles.photothumb}>
              <img src={user.photo} alt={`Foto del usuatio ${user.name}`} className={styles.img}/>
            </div>
            {/* <Photothumb/> */}

            {/* <CommitEntry> */}
            <div className={styles['commit-entry']}>
              <div className={styles.wrapper}>
                <div className={styles.entry}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Escribe tu mensage"
                    value={commit}
                    onChange={({currentTarget}) => this.setState({commit: currentTarget.value})}
                    onKeyPress={this.setCommit}
                  />
                </div>
              </div>
            </div>
            {/* <CommitEntry/> */}

            {/* <CommitEntryActions> */}
            <div className={styles.actions}>
              <div className={styles.action}>
                <FontAwesomeIcon className={styles.icon} icon={faPaperclip}/>
              </div>

              <div className={styles.action}>
                <FontAwesomeIcon className={styles.icon} icon={faLaughBeam}/>
              </div>

              <div className={styles.action}>
                <FontAwesomeIcon className={styles.icon} icon={faPaperPlane}/>
              </div>
            </div>
            {/* <CommitEntryActions/> */}
          </footer>
          {/* <Entry> */}
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
