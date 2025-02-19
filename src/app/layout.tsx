import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import NavBar from "@/components/NavBar";
import ScrollTop from "@/components/ScrollTop";
import "./globals.css";
import { Fab, Toolbar } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DM_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "University of Waterloo Japanese Student Association",
  description: "Official Website for Japanese Student Association",
};

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${dmSans.className} antialiased`}>
        <ThemeProvider>
          <NavBar />
          <Toolbar id="back-to-top-anchor" />
          {children}
          <ScrollTop>
            <Fab
              size="small"
              aria-label="scroll back to top"
              sx={{
                backgroundColor: "transparent",
                border: "1px solid black",
                color: "black",
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </ThemeProvider>
      </body>
    </html>
  );
}
