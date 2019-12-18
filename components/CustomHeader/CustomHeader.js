import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react";
import { View, TouchableOpacity, Text} from "react-native";

import styles from "./styles";


const CustomHeader = ({ navigation }) => (

  <View style={styles.navBar}>
  <TouchableOpacity
  onPress={() => navigation.toggleDrawer()}
  >
  <Icon
    name="bars"
    size={30}
    color="#F7941D"
  />
</TouchableOpacity>
      <View style={styles.navTitle}>
        <Text>Brixon Arena</Text>
      </View>
      <View style={styles.rightNav}>
        <TouchableOpacity onPress={() => {
          alert("notifications here")
        }}>
        <Icon style={styles.navItem} name="bell" size={30} color="#F7941D" />
        </TouchableOpacity>
      </View>
    </View>


);

export default CustomHeader;
