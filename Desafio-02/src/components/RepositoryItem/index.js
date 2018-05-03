import React from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

const RepositoryItem = ({ repository, onPress }) => (
  <View style={styles.container}>

    <Image
      style={styles.repoImage}
      source={{ uri: repository.owner.avatar_url }}
    />

    <View style={styles.infoContainer}>

      <Text style={styles.repoTitle}>{repository.name}</Text>
      <Text style={styles.infoText}>{repository.owner.login}</Text>

    </View>

    <TouchableOpacity
      onPress={onPress}
    >
      <Icon name="angle-right" size={30} style={styles.infoIcon} />
    </TouchableOpacity>

  </View>

);

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    full_name: PropTypes.string,
    stargazers_count: PropTypes.number,
    forks_count: PropTypes.number,
    watchers_count: PropTypes.number,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};


export default RepositoryItem;
