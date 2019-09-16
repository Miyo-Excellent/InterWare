import React, {Component} from 'react';
import {connect} from 'react-redux';

//  API
import {getChatCommits} from "../../api";

//  Actions
import {chatAddCommit} from "../../actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  chatAddCommit(commit) {
    chatAddCommit({commit, dispatch});
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    const commits = await getChatCommits();

    debugger
  }

  render() {
    const {children} = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
