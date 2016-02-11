import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import MUI from 'material-ui'

const {
  Paper,
} = MUI

const About = React.createClass({

  render() {
    return (
      <Paper zDepth={1} style={styles.content}>
        <p>This is a custom dashboard for <a href="https://github.com/Varying-Vagrant-Vagrants/VVV">Varying Vagrant Vagrants</a> (VVV) using Material Design, and written in React and Redux by <a href="http://goblindegook.com">Luís Rodrigues</a>.</p>
        <p>
          <a href="https://github.com/goblindegook/vvv-material-dashboard" title="Star the project on Github"><img src="https://img.shields.io/github/stars/goblindegook/vvv-material-dashboard.svg" /></a> <a href="https://github.com/goblindegook/vvv-material-dashboard" title="Fork the project on Github"><img src="https://img.shields.io/github/forks/goblindegook/vvv-material-dashboard.svg" /></a>
        </p>
        <h2>Components</h2>
        <h3>Backend</h3>
        <ul>
          <li><a href="https://github.com/phpseclib/phpseclib">phpseclib</a></li>
          <li><a href="http://www.slimframework.com/">Slim</a></li>
        </ul>
        <h3>Frontend</h3>
        <ul>
          <li><a href="https://facebook.github.io/immutable-js/">Immutable.js</a></li>
          <li><a href="https://github.com/matthew-andrews/isomorphic-fetch">Isomorphic Fetch</a></li>
          <li><a href="https://lodash.com/">lodash</a></li>
          <li><a href="http://www.material-ui.com/">Material UI</a></li>
          <li><a href="https://facebook.github.io/react/">React</a></li>
          <li><a href="https://github.com/helior/react-highlighter">React Highlighter</a></li>
          <li><a href="https://github.com/rackt/react-router">React Router</a></li>
          <li><a href="https://github.com/rackt/redux">Redux</a></li>
          <li><a href="https://github.com/rackt/redux-simple-router">Redux Simple Router</a></li>
          <li><a href="https://github.com/gaearon/redux-thunk">Redux Thunk</a></li>
        </ul>
      </Paper>
    )
  },
})

const styles = {
  content: {
    padding: 16,
  },
}

export default About
