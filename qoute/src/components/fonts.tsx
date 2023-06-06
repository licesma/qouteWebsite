import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

export function inter_cn(className?: string) {
  return className ? `${className} ${inter.className}` : inter.className;
}
