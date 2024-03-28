import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import {
  Box,
  CardActionArea,
  List,
  ListItem,
  CardHeader,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
export default function Comments({
  data,
  setOpenChat,
  imgurl,
  username,
  userId,
  postId,
}) {
  const [chats, setChats] = useState("");
  const [chatData, setChatsData] = useState(data);

  useEffect(() => {
    setChatsData(data || []);
  }, [data]);
  const handleSubmit = () => {
    let data1 = JSON.stringify({
      user_id: userId,
      comment: chats,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://localhost:5000/post/add-comment/${postId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data1,
    };

    axios
      .request(config)
      .then((response) => {
        setChatsData((prev) => [...prev, response.data.comments]);
      })
      .catch((error) => {
        console.log("error");
      });

    setChats("");
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "4px",
        }}
      >
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={imgurl} />}
          title={username}
          subheader="Hey"
        />

        {/* <Box
          onClick={() => setOpenChat(false)}
          color="#090b10"
          aria-label="add"
          size="small"
        >
          <CloseIcon />
        </Box> */}
      </CardActionArea>
      <Box
        sx={{
          padding: "8px",
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <input
          style={{
            padding: "8px",
            backgroundColor: "#f8f8f8",
            border: "none",
            outline: "none",
            width: "100%",
          }}
          value={chats}
          onChange={(e) => setChats(e.target.value)}
          placeholder="Type here"
        />
        <button onClick={() => handleSubmit()}>Submit</button>
      </Box>
      <Box sx={{ height: "340px", overflow: "auto" }}>
        {chatData?.map((item, ind) => (
          <List>
            <ListItem key={ind}>{item.comment}</ListItem>
          </List>
        ))}
      </Box>
    </Card>
  );
}
