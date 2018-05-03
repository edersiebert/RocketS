import React, { Component } from 'react';
import api from 'services/api';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, FlatList, Text, StatusBar } from 'react-native';
import IssueItem from 'components/IssueItem';
import styles from './styles';


export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.titleHeader,

    tabBarLabel: navigation.state.params.tabBarText ?
      navigation.state.params.tabBarText :
      <ActivityIndicator small />,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      setParams: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
    }).isRequired,
  };

  state = {
    data: [],
    loading: false,
    refreshing: false,
    errorMessage: null,
    repoID: this.props.navigation.state.params.idRepo,
  }


  componentDidMount() {
    const { titleHeader } = this.props.navigation.state.params;
    const tabBarText = this.props.navigation.state.routeName;

    this.props.navigation.setParams({ titleHeader, tabBarText });

    this.checkIssue();

    if (tabBarText === 'open') {
      this.props.navigation.setParams({ tabBarText: 'Abertas' });
    } else if (tabBarText === 'close') {
      this.props.navigation.setParams({ tabBarText: 'Fechadas' });
    } else {
      this.props.navigation.setParams({ tabBarText: 'Todas' });
    }
  }

  checkIssue = async () => {
    const issueFilter = this.props.navigation.state.routeName;

    this.setState({ loading: true, errorMessage: null });

    try {
      const issues = await api.get(`/repositories/${this.state.repoID}/issues?state=${issueFilter}`);
      this.setState({
        data: issues.data,
        loading: false,
        refreshing: false,
      });
    } catch (err) {
      this.setState({ loading: false, errorMessage: 'Sem Issues' });
    }
  }


  renderListItem = ({ item }) => (
    <IssueItem repository={item} />

  );

  renderList = () => (
    <FlatList
      data={this.state.data}
      keyExtractor={item => String(item.id)}
      renderItem={this.renderListItem}
      onRefresh={this.checkIssue}
      refreshing={this.state.refreshing}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#EEE" />

        { !!this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text> }

        {this.state.loading
          ? <ActivityIndicator style={styles.loading} />
          : this.renderList() }

      </View>
    );
  }
}
