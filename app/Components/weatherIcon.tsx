
export default function weatherIcon(code: number): string {
  if (code === 0) return "icon-sunny.webp";
  if ([1, 2].includes(code)) return "icon-partly-cloudy.webp";
  if (code === 3) return "icon-overcast.webp";
  if ([45, 48].includes(code)) return "icon-fog.webp";
  if ([51, 53, 55, 56, 57].includes(code)) return "icon-drizzle.webp";
  if ([61, 63, 65, 80, 81, 82].includes(code)) return "icon-rain.webp";
  if ([66, 67].includes(code)) return "icon-rain.webp";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "icon-snow.webp";
  if ([95, 96, 99].includes(code)) return "icon-storm.webp";
  return "/unknown.png";
}
