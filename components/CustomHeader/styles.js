import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navBar: {
    height: 55,
    backgroundColor: 'white',
    elevation: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightNav: {
    flexDirection: 'row'
  },
  navItem: {
    marginLeft: 25
  },
  navTitle: {
    fontSize: 32,
    fontWeight: "bold",
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default styles;
