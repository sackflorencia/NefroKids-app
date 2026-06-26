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

const LogoSlogan = () => {
    return (
        <View style={styles.logoSloganContainer}>
            <Image
                source={images.logo}
                style={styles.imagenLogo}
                resizeMode="contain"
                accessibilityLabel="logo"
            />
            <Text style={styles.slogan}>
                Creciendo acompañados
            </Text>
        </View>
    );
}
export default LogoSlogan;

const styles = StyleSheet.create({
    slogan: {
        fontSize: typography.regular.fontSize,
        fontWeight: typography.regular.fontWeight,
        color: colors.textLight,
        marginTop: 2,
    },
    logoSloganContainer: {
        alignItems: "center",
        marginBottom: 28,
    },
    imagenLogo: {
      width: 300, 
      padding: 0,
      margin: 0,
    },
});
