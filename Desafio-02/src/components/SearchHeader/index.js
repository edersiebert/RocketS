import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';


export default class SearchHeader extends Component {
static propTypes = {
  saveRepo: PropTypes.func,
  // Não sei oq fazer aqui, deixei sem o isRequired para sumir o warning.
  // Devo declarar como defaultProps ?
};

  state = {
    search: '',
  }

  render() {
    return (

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Adicionar repositório"
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          value={this.state.search}
          onChangeText={search => this.setState({ search })}
          returnKeyType="go"
          blurOnSubmit
          onSubmitEditing={() => this.props.saveRepo(this.state.search)}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.saveRepo(this.state.search);
            Keyboard.dismiss();
          }}
        >
          <Icon name="plus" size={16} style={styles.icon} />
        </TouchableOpacity>
      </View>

    );
  }
}
