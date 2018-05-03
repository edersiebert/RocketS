import React from 'react';

import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

const IssueItem = ({ repository }) => (
  <View style={styles.container}>

    <Image
      style={styles.repoImage}
      source={{ uri: repository.user.avatar_url }} // repository.user.avatar_url
    />

    <View style={styles.infoContainer}>

      <Text style={styles.repoTitle} numberOfLines={1} >{repository.title.length > 20 ? `${repository.title.substr(0, 35)}...` : repository.title}</Text>
      <Text style={styles.infoText}>{repository.user.login}</Text>

    </View>

    <TouchableOpacity
      onPress={() => { Linking.openURL(repository.html_url); }}
    >
      <Icon name="angle-right" size={30} style={styles.infoIcon} />
    </TouchableOpacity>

  </View>

);

IssueItem.propTypes = {
  repository: PropTypes.shape({
    full_name: PropTypes.string,
    stargazers_count: PropTypes.number,
    forks_count: PropTypes.number,
    watchers_count: PropTypes.number,
  }).isRequired,

};


export default IssueItem;
