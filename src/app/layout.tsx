import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import NavBar from "@/components/NavBar";
import ScrollTop from "@/components/ScrollTop";
import "./globals.css";
import { Fab, Toolbar } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const metadata: Metadata = {
  title: "JSA website",
  description: "Officiel Website for Japanese Student Association",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <NavBar />
          <Toolbar id="back-to-top-anchor" />
          {children}
          <ScrollTop>
            <Fab size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </ThemeProvider>
      </body>
    </html>
  );
}