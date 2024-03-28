import { createSlice } from "@reduxjs/toolkit";

function updateLikesArray(likesArray, user_Id) {
  const index = likesArray.indexOf(user_Id);
  if (index !== -1) {
    return likesArray.filter((id) => id !== user_Id);
  } else {
    return [...likesArray, user_Id];
  }
}

const postSlice = createSlice({
  name: "post",
  initialState: {
    otherPost: [],
    myPost: [],
  },
  reducers: {
    addPost(state, action) {
      const { type } = action.payload;
      if (type === "otherPost") {
        return {
          ...state,
          otherPost: action.payload.otherPost,
        };
      }
      if (type === "myPost") {
        return {
          ...state,
          myPost: action.payload.myPost,
        };
      }
      return state;
    },

    updateLikes(state, action) {
      const { postId, user_Id, type } = action.payload;

      if (type === "myPost") {
        const updatedMyPosts = state.myPost.map((post) =>
          post._id === postId
            ? { ...post, likes: updateLikesArray(post.likes, user_Id) }
            : post
        );
        return { ...state, myPost: updatedMyPosts };
      } else {
        const updatedOtherPosts = state.otherPost.map((post) =>
          post._id === postId
            ? { ...post, likes: updateLikesArray(post.likes, user_Id) }
            : post
        );
        return { ...state, otherPost: updatedOtherPosts };
      }
    },

    updateComments(state, action) {
      const { postId, comment, user_Id, type } = action.payload;

      if (type === "myPost") {
        const updatedMyPosts = state.myPost.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [...post.comments, { comment, user_Id }],
              }
            : post
        );
        return { ...state, myPost: updatedMyPosts };
      } else {
        const updatedOtherPosts = state.otherPost.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [...post.comments, { comment, user_Id }],
              }
            : post
        );
        return { ...state, otherPost: updatedOtherPosts };
      }
    },
  },
});

export default postSlice.reducer;
export const { addPost, updateComments, updateLikes } = postSlice.actions;
