import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Text,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
// Si no usas Expo, reemplaza el import de arriba por:
// import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * CustomInput
 * Componente de input reutilizable con forma de "pill", icono a la izquierda
 * y soporte para distintas variantes (texto normal, contraseña, email, etc.)
 *
 * Props principales:
 * - type: 'default' | 'password' | 'email' | 'search'  (define icono, teclado y si oculta texto)
 * - iconName: nombre de icono de Ionicons para sobreescribir el icono por defecto
 * - placeholder: texto de placeholder
 * - value / onChangeText: manejo del valor del input
 * - containerStyle / inputStyle: estilos custom opcionales
 * - error: string opcional, si existe pinta el borde en rojo
 * - editable: boolean, por si se quiere deshabilitar el input
 * - resto de props válidas de TextInput (autoCapitalize, onBlur, etc.) se pasan directo
 */

// Configuración por defecto según el "type" del input
const TYPE_PRESETS = {
  default: {
    icon: 'person-outline',
    secureTextEntry: false,
    keyboardType: 'default',
    autoCapitalize: 'none',
  },
  password: {
    icon: 'lock-closed-outline',
    secureTextEntry: true,
    keyboardType: 'default',
    autoCapitalize: 'none',
  },
  email: {
    icon: 'mail-outline',
    secureTextEntry: false,
    keyboardType: 'email-address',
    autoCapitalize: 'none',
  },
  search: {
    icon: 'search-outline',
    secureTextEntry: false,
    keyboardType: 'default',
    autoCapitalize: 'none',
  },
  phone: {
    icon: 'call-outline',
    secureTextEntry: false,
    keyboardType: 'phone-pad',
    autoCapitalize: 'none',
  },
  date: {
    icon: 'calendar-outline',
    secureTextEntry: false,
    keyboardType: 'default',
    autoCapitalize: 'none',
  },
};

export default function CustomInput({
  type = 'default',
  iconName,
  placeholder = 'Escribe aqui',
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  error,
  editable = true,
  ...restProps
}) {
  const preset = TYPE_PRESETS[type] || TYPE_PRESETS.default;
  const isPasswordType = type === 'password';
  const isDateType = type === 'date';

  // Solo relevante si es tipo password: controla si se muestra u oculta el texto
  const [isSecure, setIsSecure] = useState(preset.secureTextEntry);
  const [showPicker, setShowPicker] = useState(false);

  const finalIconName = iconName || preset.icon;

  const dateValue = value instanceof Date ? value : value ? new Date(value) : null;

  function formatDate(date) {
    if (!date) {
      return '';
    }
    return date.toLocaleDateString('es-AR');
  }

  function handleDateChange(event, selectedDate) {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      onChangeText?.(selectedDate);
    }
  }

  return (
    <View>
      <View style={styles.shadow} />
      
      <View
        style={[
          styles.container,
          error ? styles.containerError : null,
          !editable ? styles.containerDisabled : null,
          containerStyle,
        ]}
      >
        {/* Icono izquierdo (wrapper circular) */}
        <View style={[styles.leftIconWrapper, isDateType ? styles.leftIconAbsolute : null]}>
          <Ionicons
            name={finalIconName}
            size={18}
            color="#A0A0A0"
          />
        </View>

        {/* Input de texto o selector de fecha */}
        {isDateType ? (
          <Pressable
            style={[styles.datePressable, inputStyle, isDateType ? styles.centeredPressable : null]}
            onPress={() => editable && setShowPicker(true)}
          >
            <Text style={[styles.dateLabel, styles.dateText]}>
              {placeholder}
            </Text>
          </Pressable>
        ) : (
          <TextInput
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor="#A0A0A0"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isPasswordType ? isSecure : false}
            keyboardType={preset.keyboardType}
            autoCapitalize={preset.autoCapitalize}
            editable={editable}
            {...restProps}
          />
        )}

        {/* Icono de "ojo" para mostrar/ocultar contraseña, solo si type === 'password' */}
        {isPasswordType && (
          <TouchableOpacity
            onPress={() => setIsSecure((prev) => !prev)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#A0A0A0"
            />
          </TouchableOpacity>
        )}

        {showPicker && (
          <DateTimePicker
            value={dateValue || new Date()}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    top: 4,
    backgroundColor: '#D6D6D6',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 54,
    borderWidth: 2,
    borderColor: '#E8E8E8',
  },
  containerError: {
    borderColor: '#E53935',
  },
  containerDisabled: {
    opacity: 0.6,
  },
  leftIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F6F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#666666',
    paddingVertical: 14,
    textAlignVertical: 'center',
    paddingRight: 8,
  },
  datePressable: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 54,
  },
  placeholderText: {
    flex: 1,
    fontSize: 16,
    color: '#A0A0A0',
    paddingVertical: 14,
    textAlignVertical: 'center',
    paddingRight: 8,
  },
  dateLabel: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlignVertical: 'center',
    paddingRight: 8,
  },
  leftIconAbsolute: {
    position: 'absolute',
    left: 14,
    zIndex: 2,
  },
  centeredPressable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  dateText: {
    textAlign: 'center',
  },
});