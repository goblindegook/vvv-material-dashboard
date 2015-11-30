import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Colors from 'material-ui/lib/styles/colors'
import Spacing from 'material-ui/lib/styles/spacing'

const Theme = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#21759b',
    primary2Color: ColorManipulator.fade('#21759b', 0.3),
    primary3Color: '#464646',
    accent1Color: '#d54e21',
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
  },
}

export default Theme
