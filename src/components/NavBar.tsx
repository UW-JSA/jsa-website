"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import content from "@/context/content";
import { DM_Sans } from "next/font/google";
import { supabase } from "@/lib/supabase";
import AuthDrawer from "./AuthDrawer";
import { Person } from "@mui/icons-material";
import { AuthUser } from "@/interfaces/user";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function NavBar() {
  const { language, toggleLanguage } = useTheme();
  const [authDrawerOpen, setAuthDrawerOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      },
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#ffffe9",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
        }}
        className={`${dmSans.className} antialiased`}
      >
        <Toolbar className="flex justify-between items-center">
          <div className="flex flex-row items-center gap-3">
            <Link href="/" className="flex items-center no-underline">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              <Typography variant="h6" className="ml-2 font-bold text-gray-900">
                {content[language].shorttitle}
              </Typography>
            </Link>
          </div>

          <Box className="flex items-center text-gray-900 gap-5">
            <Link href="/team" className="flex items-center no-underline">
              <Typography variant="body1" className="hover:text-gray-700">
                Team
              </Typography>
            </Link>
            <Button
              onClick={toggleLanguage}
              color="inherit"
              className="capitalize"
            >
              <span
                className={`${language === "ja" ? "font-bold" : "font-thin"}`}
              >
                JA
              </span>
              <span className="mx-2">|</span>
              <span
                className={`${language === "en" ? "font-bold" : "font-thin"}`}
              >
                EN
              </span>
            </Button>
            {user ? (
              <>
                <IconButton onClick={handleMenuOpen} className="p-0">
                  <Avatar className="bg-gradient-to-r from-orange-400 to-red-500">
                    {user.user_metadata?.first_name?.charAt(0) || <Person />}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <Typography variant="body1" className="text-gray-900">
                      Hey {user.user_metadata?.first_name} 👋
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography variant="body1" className="text-red-500">
                      Log Out
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => setAuthDrawerOpen(true)}
                variant="contained"
                className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white"
              >
                Log In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <AuthDrawer
        open={authDrawerOpen}
        onClose={() => setAuthDrawerOpen(false)}
      />
    </>
  );
}
