import { StackNavigator, TabNavigator } from 'react-navigation';
import Repositories from 'pages/Repositories';
import Issues from 'pages/Issues';
import { colors, metrics } from 'styles';

const Routes = StackNavigator({
  Repositories: { screen: Repositories },
  Issues: {
    screen: TabNavigator({
      all: { screen: Issues },
      open: { screen: Issues },
      close: { screen: Issues },
    }, {
      tabBarPosition: 'top',
      lazy: false,

      tabBarOptions: {
        showLabel: true,
        upperCaseLabel: false,
        activeTintColor: 'rgba(102, 102, 102, 1)',
        activeTabStyle: {
          fontWeight: 'bold',
        },
        inactiveTintColor: 'rgba(102, 102, 102, 0.5)',
        indicatorStyle: {
          opacity: 0,
        },
        style: {
          backgroundColor: colors.light,
          marginHorizontal: metrics.baseMargin * 2,
          marginTop: metrics.baseMargin * 2,
          height: 35,
          borderRadius: metrics.baseRadius,
          elevation: 0,
        },
        labelStyle: { fontSize: 14, textAlign: 'center', marginTop: 3 },
      },

      navigationOptions: {
        headerTitleStyle: { textAlign: 'center', width: '70%' },
        headerStyle: { elevation: 0 },
      },
    }),
  },
}, {
  initialRouteName: 'Repositories',
});

export default Routes;
