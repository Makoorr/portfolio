import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aziz Ben Rejeb — DevSecOps / Cloud Engineer",
  description: "Portfolio of Aziz Ben Rejeb. DevSecOps, Cloud Engineering, Cybersecurity. AWS Certified. Available immediately.",
  openGraph: {
    title: "Aziz Ben Rejeb — DevSecOps / Cloud Engineer",
    description: "DevSecOps, Cloud Engineering, Cybersecurity. AWS Certified Developer. Available immediately.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
