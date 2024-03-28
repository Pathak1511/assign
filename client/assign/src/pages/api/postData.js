import axios from "axios";

const sendPost = (formData) => {
  try {
    axios.post("http://localhost:5000/post/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    // Handle error
    console.error("Error sending form data:", error);
    return null;
  }
};

export default sendPost;
