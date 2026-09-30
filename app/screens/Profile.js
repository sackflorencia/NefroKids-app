import React, { useEffect, useState } from "react";
import {
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import { useSQLiteContext } from "expo-sqlite";

import Button from "../components/Button";
import { useUser } from "../context/UserContext";
import UserController from "../../back/controllers/userController";
import TutorController from "../../back/controllers/tutorController";
import colors from "../styles/colors";
import PerfilVacio from "../../assets/images/PerfilVacio.png";

export default function Profile() {
    const db = useSQLiteContext();
    const { user, logout, loading: userLoading } = useUser();

    const [profile, setProfile] = useState({
        child: null,
        tutors: []
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
    }, []);

    useEffect(() => {
        loadProfile();
    }, [user?.childId, db]);

    async function loadProfile() {
        try {
            if (!user?.childId) {
                setProfile({
                    child: null,
                    tutors: []
                });

                setLoading(false);
                return;
            }

            const userController = new UserController(db);
            const tutorController = new TutorController(db);

            const child =
                await userController.getUserById(user.childId);

            const tutors =
                await tutorController.getTutorsByChildId(user.childId);

            setProfile({
                child,
                tutors: tutors || [],
            });

        } catch (error) {
            console.error("Error cargando perfil:", error);

            setProfile({
                child: null,
                tutors: []
            });

            Alert.alert(
                "Error",
                "No se pudo cargar tu perfil."
            );

        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        try {
            await logout();
        } catch (error) {
            Alert.alert(
                "Error",
                error.message || "No se pudo cerrar sesión."
            );
        }
    }

    function formatDate(dateValue) {
        if (!dateValue) return "Sin información";

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return dateValue;
        }

        return date.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    function getInitials(name) {
        if (!name) return "P";

        const parts = name
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (parts.length === 1) {
            return parts[0].slice(0, 2).toUpperCase();
        }

        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    const childName =
        profile.child?.full_name ||
        user?.fullName ||
        "Perfil";

    const primaryTutor =
        profile.tutors.find(
            (tutor) =>
                tutor.is_primary === 1 ||
                tutor.relationship === "Padre" ||
                tutor.relationship === "Madre"
        ) ||
        profile.tutors[0];

    if (userLoading || loading) {
        return (
            <SafeAreaView style={styles.loaderContainer}>
                <ActivityIndicator
                    size="large"
                    color={colors.primaryShadow}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerCard}>
                    <View style={styles.avatarCircle}>
                        {profile.child?.full_name ? (
                            <Text style={styles.avatarText}>
                                {getInitials(childName)}
                            </Text>
                        ) : (
                            <Image
                                source={PerfilVacio}
                                style={styles.avatarImage}
                                resizeMode="cover"
                            />
                        )}
                    </View>

                    <Text style={styles.name}>
                        {childName}
                    </Text>

                    <Text style={styles.subtitle}>
                        Perfil del niño
                    </Text>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>
                        Datos del niño
                    </Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>
                            Nombre
                        </Text>

                        <Text style={styles.infoValue}>
                            {profile.child?.full_name ||
                                "Sin completar"}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>
                            Fecha de nacimiento
                        </Text>

                        <Text style={styles.infoValue}>
                            {formatDate(
                                profile.child?.birth_date
                            )}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>
                            ¿Orina?
                        </Text>

                        <Text style={styles.infoValue}>
                            {profile.child?.urinates === 1 ||
                            profile.child?.urinates === true
                                ? "Sí"
                                : "No"}
                        </Text>
                    </View>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>
                        Tutores
                    </Text>

                    {profile.tutors.length === 0 ? (
                        <Text style={styles.emptyText}>
                            Todavía no hay tutores registrados.
                        </Text>
                    ) : (
                        profile.tutors.map((tutor, index) => (
                            <View
                                key={tutor.id || index}
                                style={styles.tutorCard}
                            >
                                <View style={styles.tutorHeader}>
                                    <Text style={styles.tutorName}>
                                        {tutor.full_name}
                                    </Text>

                                    {tutor.is_primary === 1 && (
                                        <Text style={styles.primaryBadge}>
                                            Principal
                                        </Text>
                                    )}
                                </View>

                                <Text style={styles.tutorMeta}>
                                    {tutor.relationship ||
                                        "Relación no especificada"}
                                </Text>

                                <Text style={styles.tutorMeta}>
                                    {tutor.email ||
                                        "Email no disponible"}
                                </Text>

                                <Text style={styles.tutorMeta}>
                                    {tutor.phone ||
                                        "Teléfono no disponible"}
                                </Text>
                            </View>
                        ))
                    )}
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>
                        Cuenta
                    </Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>
                            Tutor activo
                        </Text>

                        <Text style={styles.infoValue}>
                            {primaryTutor?.full_name ||
                                user?.fullName ||
                                "No disponible"}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>
                            Email
                        </Text>

                        <Text style={styles.infoValue}>
                            {user?.email ||
                                primaryTutor?.email ||
                                "No disponible"}
                        </Text>
                    </View>
                </View>

                <Button
                    title="Cerrar sesión"
                    onPress={handleLogout}
                    style={styles.logoutButton}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 32,
        gap: 18,
    },

    headerCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    avatarCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: "#EAFBF4",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#B7F0D6",
        marginBottom: 12,
    },

    avatarImage: {
        width: 96,
        height: 96,
        borderRadius: 48,
    },

    avatarText: {
        fontSize: 28,
        fontWeight: "700",
        color: colors.textDark,
    },

    name: {
        fontSize: 28,
        fontWeight: "700",
        color: colors.textDark,
        textAlign: "center",
    },

    subtitle: {
        marginTop: 6,
        fontSize: 15,
        color: "#7A8C84",
        fontWeight: "600",
    },

    sectionCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.textDark,
        marginBottom: 12,
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F3F2",
    },

    infoLabel: {
        fontSize: 15,
        color: "#6D7F78",
        fontWeight: "600",
        flex: 1,
    },

    infoValue: {
        fontSize: 15,
        color: colors.textDark,
        fontWeight: "700",
        textAlign: "right",
        flex: 1,
    },

    tutorCard: {
        backgroundColor: "#F5FBF8",
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#D9F0E7",
    },

    tutorHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },

    tutorName: {
        fontSize: 17,
        color: colors.textDark,
        fontWeight: "700",
        flex: 1,
    },

    primaryBadge: {
        fontSize: 11,
        color: colors.textDark,
        backgroundColor: "#B7F0D6",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        fontWeight: "700",
    },

    tutorMeta: {
        fontSize: 14,
        color: "#4E6760",
        marginTop: 3,
    },

    emptyText: {
        fontSize: 14,
        color: "#7A8C84",
        fontStyle: "italic",
    },

    logoutButton: {
        marginTop: 6,
        width: "100%",
    },
});
