import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {

    height: 60,
    elevation: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,

  },
  icon: {
    color: colors.darker,

    paddingHorizontal: metrics.basePadding,
  },
  input: {
    flex: 1,
    backgroundColor: colors.lighter,
    borderRadius: metrics.baseRadius,
    height: 35,
    width: metrics.screenWidth - 80,
    marginLeft: metrics.baseMargin,

  },

});

export default styles;
