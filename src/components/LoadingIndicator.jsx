import React from 'react'
import { render } from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { CircularProgress } from 'material-ui'
import Site from './Site'

const LoadingIndicator = props => (
  <CircularProgress mode="indeterminate" style={Object.assign({}, styles.progress, !props.isWaiting && styles.hidden)} />
)

LoadingIndicator.mixins = [PureRenderMixin]

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
