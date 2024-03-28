import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useClerk } from "@clerk/nextjs";
import sendPost from "./../pages/api/postData";
import { useRouter } from "next/router";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "500px",
  margin: "auto",
});

const Upload = () => {
  const [postName, setPostName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { user } = useClerk();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("user_id", router.query.userId);
    formdata.append(
      "post_img",
      image,
      "postman-cloud:///1eead3ab-c9d5-4500-8ce4-002ba9239d11"
    );
    formdata.append("description", description);
    formdata.append("username", user?.username);
    formdata.append("imgUrl", user?.imageUrl);

    sendPost(formdata);

    setPostName("");
    setDescription("");
    setImage(null);
    router.push("/");
  };

  const handleImageChange = (event) => {
    // Handle image upload
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Typography variant="h6">Create a New Post</Typography>
      <TextField
        label="Post Name"
        variant="outlined"
        value={postName}
        onChange={(event) => setPostName(event.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </FormContainer>
  );
};

export default Upload;
