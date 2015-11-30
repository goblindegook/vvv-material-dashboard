import React from 'react'
import { render } from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { CircularProgress } from 'material-ui'
import Site from './Site'

const LoadingIndicator = props => (
  <CircularProgress mode="indeterminate" style={Object.assign({}, styles.progress, !props.isLoading && styles.hidden)} />
)

LoadingIndicator.mixins = [PureRenderMixin]

const styles = {
  progress: {
    display: 'block',
    margin: 'auto',
    position: 'relative',
    margin: '64px auto',
  },
  hidden: {
    display: 'none',
  }
}

export default LoadingIndicator
