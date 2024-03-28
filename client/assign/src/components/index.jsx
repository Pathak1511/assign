import { useEffect, useState } from "react";
import Header from "./Header";
import Card from "./Card";
import Comments from "./Comments";
import Container from "@mui/material/Container";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updateLikes } from "../store/slice/postSlice";
import axios from "axios";

function index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openChat, setOpenChat] = useState(false);
  const [data, setData] = useState();
  const [username, setUsername] = useState("");
  const [imgurl, setimgUrl] = useState("");
  const [postId, setPostID] = useState("");
  const [myPost, setMyPost] = useState(false);
  const stateData = useSelector((state) => state);
  const [otherPost, setOtherPost] = useState(stateData.otherPost);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const handleSetData = (value, username, imgUrl, post_id) => {
    setData(value);
    setUsername(username);
    setimgUrl(imgUrl);
    setPostID(post_id);
    handleChangeChat();
  };
  let base64Image;
  let dataURL;

  const handleSetMyPost = () => {
    setMyPost(true);
    setOpenChat(false);
  };

  const handleLike = (postId, type) => {
    let data = JSON.stringify({
      user_id: userId,
    });
    dispatch(updateLikes({ postId: postId, user_Id: userId, type: type }));

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `http://localhost:5000/post/add-like/${postId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        router.reload();
      })
      .catch((error) => {
        console.log("error");
      });
  };
  // Fetching other Posts Data
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:5000/post/getAll/${userId}`,
    };

    axios
      .request(config)
      .then((response) => {
        dispatch(addPost({ otherPost: response.data.data, type: "otherPost" }));
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  const handleUnsetMyPost = () => {
    setMyPost(false);
  };
  const handleChangeChat = () => {
    if (openChat === true) {
      return;
    }
    setOpenChat(!openChat);
  };

  return (
    <div>
      <Header
        userId={userId}
        handleSetMyPost={handleSetMyPost}
        handleUnsetMyPost={handleUnsetMyPost}
      />
      <div
        className="cards"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "auto",
          height: "84vh",
          position: "relative",
        }}
      >
        <div>
          {otherPost?.map((item, ind) => {
            base64Image = new Blob([Buffer.from(item.post_img.data.data)], {
              type: item.post_img.data.type,
            });

            dataURL = URL.createObjectURL(base64Image);
            let like = item?.likes.find((id) => id === userId);
            like = like ? (like === userId ? true : false) : false;

            return (
              <Card
                ID={item._id}
                key={ind}
                image={dataURL}
                handleSetData={handleSetData}
                user="Hritik Pathak"
                description={item.description}
                userImg={item?.imgUrl}
                handleLike={handleLike}
                username={item?.username}
                type="otherPost"
                islike={like}
                comments={item.comments}
              />
            );
          })}
        </div>

        <div
          style={{
            position: "fixed",
            left: "80px",
            top: "100px",
            width: "320px",
            height: "64vh",
            backgroundColor: "#fff",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <Comments
            data={data}
            setOpenChat={setOpenChat}
            imgurl={imgurl}
            username={username}
            userId={userId}
            postId={postId}
          />
        </div>
      </div>
    </div>
  );
}

export default index;
