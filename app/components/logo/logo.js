import react from "react";
import images from "../../assets/images";
import globalStyle from "../../styles/globalStyles";
import colors from "../../styles/colors";
import typography from "../../styles/typography";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const LogoSlogan = () => {
    <View style={styles.logoSloganContainer}>
              <Image
                source={images.logo}
                style={globalStyle.logo}
                resizeMode="contain"
                alt="logo"
              />
              <Text style={styles.slogan}>
                Creciendo acompañados
              </Text>
            </View>
            
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
});
