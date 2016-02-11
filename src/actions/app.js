export const ActionTypes = {
  RESIZE_WINDOW: 'RESIZE_WINDOW',
}

/**
 * Resize window action creator.
 * @param  {Number} width  Window inner width.
 * @param  {Number} height Window inner height.
 * @return {Object}        Resize action.
 */
export function resizeWindow(width, height) {
  return {
    type:    ActionTypes.RESIZE_WINDOW,
    payload: { width, height },
  }
}
