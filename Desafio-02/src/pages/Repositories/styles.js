import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: metrics.basePadding / 2,
  },
  loading: {
    marginTop: metrics.basePadding,
  },

  error: {
    textAlign: 'center',
    marginTop: metrics.baseMargin,
    marginBottom: metrics.baseMargin,
    fontSize: 14,
    color: colors.danger,
  },

});

export default styles;
