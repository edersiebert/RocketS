import React, { Component } from 'react';
import api from 'services/api';
import PropTypes from 'prop-types';
import RepositoryItem from 'components/RepositoryItem';
import SearchHeader from 'components/SearchHeader';
import { View, AsyncStorage, ActivityIndicator, FlatList, Text, StatusBar } from 'react-native';
import styles from './styles';


export default class Repositories extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: null,
    header: <SearchHeader {...navigation.state.params} />,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    data: [],
    loading: false,
    refreshing: false,
    errorMessage: null,
  }

  async componentWillMount() {
    // AsyncStorage.clear();
    const list = await AsyncStorage.getItem('@GitHuber:data');
    if (list) {
      await this.setState({ data: JSON.parse(list) });
    }

    this.props.navigation.setParams({
      saveRepo: this.saveRepo,
    });
  }

  componentDidMount() {
    this.renderList();
  }


  refresh = async () => {
    const list = await AsyncStorage.getItem('@GitHuber:data');
    if (list) {
      await this.setState({ data: JSON.parse(list) });
    }
  };


  saveRepo = async (repoName) => {
    if (repoName.length === 0) return;

    this.setState({ loading: true, errorMessage: null });

    try {
      const response = await api.get(`/repos/${repoName}`);

      this.state.data.find(r =>
        (r.id === response.data.id
          ? this.setState({ loading: false, errorMessage: 'Já existe na lista (:' })
          : null));

      if (!this.state.loading) return;

      await this.setState({
        data: [...this.state.data, response.data],
        loading: false,
        refreshing: false,
      });
      await AsyncStorage.setItem('@GitHuber:data', JSON.stringify(this.state.data));
    } catch (err) {
      this.setState({ loading: false, errorMessage: 'Não encontrado :/' });
    }
  }


  renderListItem = ({ item }) => (
    <RepositoryItem repository={item} onPress={() => { this.props.navigation.navigate('Issues', { idRepo: item.id, titleHeader: item.name }); }} />
  );

  renderList = () => (
    <FlatList
      data={this.state.data}
      keyExtractor={item => String(item.id)}
      renderItem={this.renderListItem}
      onRefresh={this.refresh}
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
