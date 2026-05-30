export const URINE_COLORS = [
  {
    value: "normal",
    label: "🟡 Normal",
    color: "#F7E27C"
  },
  {
    value: "dark",
    label: "🟠 Oscura",
    color: "#F2C94C"
  },
  {
    value: "reddish",
    label: "🔴 Rojiza",
    color: "#D4A017"
  },
  {
    value: "no_urine",
    label: "⚫ No oriné",
    color: "#8B4513"
  },
  {
    value: "pending",
    label: "⚪ Todavía no oriné",
    color: "#BDBDBD"
  }
];

export const MOODS = [
  {
    value: "happy",
    label: "😊 Feliz"
  },
  {
    value: "tired",
    label: "😴 Cansado"
  },
  {
    value: "pain",
    label: "🤕 Con dolor"
  },
  {
    value: "swollen",
    label: "💧 Hinchado"
  }
];

export const PAIN_LOCATIONS = [
  {
    value: "head",
    label: "Cabeza"
  },
  {
    value: "stomach",
    label: "Panza"
  },
  {
    value: "arm",
    label: "Brazo"
  },
  {
    value: "leg",
    label: "Pierna"
  },
  {
    value: "none",
    label: "No me duele"
  }
];

export function getLabel(options, value) {

  return (
    options.find(
      item => item.value === value
    )?.label ?? value
  );

}