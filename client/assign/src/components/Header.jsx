import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import InstagramIcon from "@mui/icons-material/Instagram";
import List from "@mui/material/List";
import { ListItem, ListItemButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { UserButton, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.common.black, 0.12),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "300px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "200px",
    [theme.breakpoints.up("md")]: {
      width: "200px",
    },
  },
}));

function Header({ userId, handleSetMyPost, handleUnsetMyPost }) {
  const router = useRouter();
  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{
          background: "#f8f8f8",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "60px",
          }}
        >
          <IconButton>
            <InstagramIcon fontSize="28" />
          </IconButton>

          <List
            sx={{
              color: "#222",
              display: "flex",
              cursor: "pointer",
              width: "max-content",
            }}
          >
            <ListItem>
              <ListItemButton onClick={() => handleUnsetMyPost()}>
                <Typography>HOME</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => router.push("/post?userId=" + userId)}
              >
                <Typography>ADD&nbsp;POST</Typography>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton onClick={() => handleUnsetMyPost()}>
                <Typography>NOTIFICATIONS</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => handleSetMyPost()}>
                <Typography>MY&nbsp;POST</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#222" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <UserButton />
        </Box>
      </Container>
    </AppBar>
  );
}
export default Header;
