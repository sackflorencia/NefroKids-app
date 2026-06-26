import images from "../../../assets/images";
import globalStyle from "../../styles/globalStyles";
import colors from "../../styles/colors";
import typography from "../../styles/typography";
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

const Header = () => {
    return (
        <View style={styles.headerContainer}>
                <Image
                    source={images.logo}
                    style={styles.imagenLogo}
                    resizeMode="contain"
                    accessibilityLabel="logo"
                />
        </View>
    );
}
export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: "center",
        marginBottom: 28,
        backgroundColor: colors.primary,
        paddingBottom: 20,
        paddingVertical: 20,
    },
    imagenLogo: {
      width: 300,
      padding: 0,
      margin: 0,
    },
});