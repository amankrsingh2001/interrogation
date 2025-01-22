export default function BackgroundPatter() {
  return (
    <svg className="w-full h-full " viewBox="0 0 3000 3000"  preserveAspectRatio="none">
      <defs>
        <pattern
          id="bg_pattern"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="#dadada"
            stroke-width="6"
            stroke-linecap="round"
          ></line>{" "}
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="#dadada"
            stroke-width="6"
            stroke-linecap="round"
          ></line>
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="#f9f9ff"></rect>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#bg_pattern)"
      ></rect>
    </svg>
  );
}
