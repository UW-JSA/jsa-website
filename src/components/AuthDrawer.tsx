// src/components/AuthDrawer.tsx
"use client";

import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { supabase } from "@/lib/supabase";
import { Divider } from "@mui/material";

type AuthDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const AuthDrawer: React.FC<AuthDrawerProps> = ({ open, onClose }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setErrorMsg("");
    setMessage("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setErrorMsg(error.message);
    else onClose();
  };

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_REDIRECT_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      'http://localhost:3000/'
    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`
    return url
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() === "" || lastName.trim() === "") {
      setErrorMsg("Please enter your first and last name.");
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName },
        emailRedirectTo: getURL(),
      },
    });
    if (error) setErrorMsg(error.message);
    else
      setMessage(
        "Registration successful! Please check your email to verify your account."
      );
  };  

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width:
            typeof window !== "undefined" && window.innerWidth < 600
              ? "100%"
              : 400,
        },
      }}
    >
      <Box p={3} position="relative" height="100%">
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 16, right: 16 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" align="center" gutterBottom>
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </Typography>
        {errorMsg && (
          <Typography variant="body2" color="error" align="center" gutterBottom>
            {errorMsg}
          </Typography>
        )}
        {message && (
          <Typography
            variant="body2"
            color="primary"
            align="center"
            gutterBottom
          >
            {message}
          </Typography>
        )}
        <form onSubmit={mode === "login" ? handleLogin : handleSignup}>
          {mode === "signup" && (
            <>
              <TextField
                label="First Name"
                variant="outlined"
                margin="normal"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <TextField
                label="Last Name"
                variant="outlined"
                margin="normal"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </>
          )}
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
          />
          <Box mt={2}>
            <Button
              variant="contained"
              fullWidth
              className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white"
              type="submit"
            >
              {mode === "login" ? "Log In" : "Sign Up"}
            </Button>
          </Box>
        </form>
        <Divider className="my-4" />
        <Box textAlign="center">
          <Button onClick={toggleMode} color="secondary">
            {mode === "login"
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log In"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AuthDrawer;
