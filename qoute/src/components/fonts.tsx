import { Inter, Montserrat, Nunito, Urbanist } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const nuno = Nunito({ subsets: ["latin"] });
const urban = Urbanist({ subsets: ["latin"] });

export function inter_cn(className?: string) {
  return className ? `${className} ${inter.className}` : inter.className;
}

export function montse_cn(className?: string) {
  return className
    ? `${className} ${montserrat.className}`
    : montserrat.className;
}

export function nuno_cn(className?: string) {
  return className ? `${className} ${nuno.className}` : nuno.className;
}

export function urban_cn(className?: string) {
  return className ? `${className} ${urban.className}` : urban.className;
}
