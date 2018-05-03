import { StyleSheet } from 'react-native';
import { general, metrics, colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    ...general.box,
    marginHorizontal: metrics.basePadding,
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
    alignItems: 'center',
  },
  repoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 10,
    // marginTop: metrics.baseMargin / 2,
  },
  info: {
    flexDirection: 'row',
    marginRight: metrics.baseMargin,
    alignItems: 'center',
  },
  infoIcon: {
    color: colors.dark,
  },
  infoText: {
    color: colors.dark,
    fontSize: 14,

  },
  repoImage: {
    width: 45,
    height: 45,
  },
});

export default styles;
