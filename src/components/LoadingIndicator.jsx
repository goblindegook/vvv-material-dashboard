import React from 'react'
import { render } from 'react-dom'
import { CircularProgress } from 'material-ui'
import Site from './Site'

const LoadingIndicator = props => (
  <CircularProgress mode="indeterminate" style={Object.assign({}, styles.progress, !props.isWaiting && styles.hidden)} />
)

const styles = {
  progress: {
    display: 'block',
    margin: 'auto',
    position: 'relative',
    margin: '64px auto 88px',
  },
  hidden: {
    display: 'none',
  }
}

export default LoadingIndicator
