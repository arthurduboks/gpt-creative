import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism, shadesOfPurple } from "@clerk/themes";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GPT Creative",
  description:
    "Your new marketing assistant. Powered by OpenAI. Create content, and more!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [neobrutalism, shadesOfPurple],
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
