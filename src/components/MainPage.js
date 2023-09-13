import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  TextField,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import {
  collection,
  setDoc,
  arrayUnion,
  onSnapshot,
  doc,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { DB, auth } from "../Myfirebase.js";
import { signOut } from "firebase/auth";

export default function MainPage({ user, isLogin }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const { state } = useLocation();
    // console.log(state);
    const userId = state;

  const write = () => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }
        navigate("/WritePage", { state: userId});
  };

  const handleSignInClick = async () => {
    navigate("/SignIn");
  };

  const handleSignOutClick = async () => {
    signOut(auth);
  };

  useEffect(() => {
    const postsCollection = collection(DB, "write_page");
    const queryData = query(
      postsCollection,
      orderBy("contents.startDate", "asc")
    );
    const unsubscribe = onSnapshot(queryData, (snapshot) => {
      console.log(snapshot.docs);
      let postData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        firestoreId: doc.id,
      }));
      setPosts(postData);
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 해제
  }, []);

  /* eslint-disable */
  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) =>
        post.contents.inputTitle
          ? post.contents.inputTitle
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          : false
      )
    );
  }, [searchTerm, posts]);

  const addComment = async (firestoreId, comment) => {
    const postDocRef = doc(DB, "write_page", firestoreId);

    await setDoc(
      postDocRef,
      {
        comments: arrayUnion(comment),
      },
      { merge: true }
    );
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static" elevation={0} color="inherit">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Box my={4} display="flex" justifyContent="center" sx={{ flex: 5 }}>
            <Typography variant="h2">Pet Mate</Typography>
          </Box>
          {isLogin ? (
            <Button
              variant="text"
              onClick={handleSignOutClick}
              sx={{ flex: 1 }}
            >
              로그아웃
            </Button>
          ) : (
            <Button variant="text" onClick={handleSignInClick} sx={{ flex: 1 }}>
              로그인
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="검색어를 입력해주세요"
          variant="outlined"
          sx={{ width: "70%", textAlign: "center" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" onClick={write} sx={{ fontSize: "14px" }}>
          <Typography variant="h5">모집하기</Typography>
        </Button>
      </Box>

      <Stack direction="column" spacing={2}>
        {filteredPosts.map((post) => (
          <Post
            post={post}
            key={post.firestoreId}
            addComment={addComment}
            user={user}
            isLogin={isLogin}
          />
        ))}
      </Stack>
      <Box minHeight="10vh"></Box>
    </Container>
  );
}

function Post({ post, addComment, user, isLogin }) {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const HandleAddButton = (postId) => {
    const newComment = { userId: user.displayName, content: commentText };

    addComment(postId, newComment);

    setCommentText("");
  };

  return (
    <Box
      key={post.firestoreId}
      p={1}
      border={1}
      borderRadius="borderRadius"
      borderColor="#ddd"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" sx={{ flex: 1, textAlign: "left" }}>
          {post.UserName}
        </Typography>
        <Typography
          variant="h5"
          sx={{ wordWrap: "break-word", flex: 5, textAlign: "center" }}
        >
          {post.contents.inputTitle}
        </Typography>
        <Box sx={{ flex: 1 }} />
      </Box>
      <Divider />
      <Box
        minHeight="15vh"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography sx={{ wordWrap: "break-word", textAlign: "center" }}>
          {post.contents.inputValue}
        </Typography>
      </Box>
      <Box
        minHeight="10vh"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Typography sx={{ wordWrap: "break-word", textAlign: "center" }}>
          장소: {post.contents.inputPlace}
          <br />
          시간 : {`${post.contents.startDate.toDate().getMonth() + 1}월 ${post.contents.startDate.toDate().getDate()}일 ${post.contents.startDate.toDate().getHours()}시`}
          <br />
          모집인원: {post.contents.maxNum}
        </Typography>
      </Box>

      <Divider />
      <Box display="flex" p={1}>
        <Box flexGrow={1} display="flex" justifyContent="center">
          <Button variant="text" onClick={() => setShowComments(!showComments)}>
            {showComments ? `댓글 숨기기` : `댓글(${post.comments?.length})`}
          </Button>
        </Box>
      </Box>
      {showComments && (
        <>
          {post.comments.map((comment, index) => (
            <React.Fragment key={index}>
              <Divider />
              <Typography
                sx={{ wordWrap: "break-word" }}
                variant="subtitle2"
                mt={2}
              >
                {comment.userId}
              </Typography>
              <Typography
                sx={{ wordWrap: "break-word" }}
                variant="body2"
                mt={1}
                mb={2}
              >
                {comment.content}
              </Typography>
            </React.Fragment>
          ))}
          {isLogin && (
            <Box display="flex" alignItems="flex-start" mt={2}>
              <TextField
                label="댓글 달기"
                variant="outlined"
                fullWidth
                multiline
                size="small"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  HandleAddButton(post.firestoreId);
                }}
                style={{ marginLeft: 10 }}
              >
                등록
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
