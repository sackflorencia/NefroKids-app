export const URINE_COLORS = [
  {
    value: "normal",
    label: "Normal",
    color: "#F7E27C"
  },
  {
    value: "dark",
    label: "Oscura",
    color: "#D4A017"
  },
  {
    value: "reddish",
    label: "Rojiza",
    color: "#8B4513"
  },
  {
    value: "no_urine",
    label: "---------",
    color: "#FFFFFF"
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

  if (value === null || value === undefined || value === "") return "---";

  const valStr = String(value);

  const found = options.find((item) => {
    try {
      return String(item.value).toLowerCase() === valStr.toLowerCase();
    } catch (e) {
      return item.value === value;
    }
  });

  return found?.label ?? valStr;

}