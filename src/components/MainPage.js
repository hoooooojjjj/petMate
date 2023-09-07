import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Divider, Stack, TextField, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);





export default function MainPage() {
    const navigate = useNavigate();


    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);

    const write = () => {
        navigate("/InsertForm");
    };

    const handleSignInClick = () => {
        navigate("/Signin");
    };

    //DB연결 필요
    const [posts, setPosts] = useState([
        { id: 1, UserName: "User1", title: '서울숲 산책하기', content: '날짜/시간, 장소, 인원', comments: [{ userId: 'User2', content: '참석합니다~' }, { userId: 'User3', content: '저두요!' }] },
        { id: 2, UserName: "User2", title: '애견카페 같이가요~', content: '날짜/시간, 장소, 인원', comments: [] },
        { id: 3, UserName: "User3", title: '망원 한강공원 산책하기', content: '날짜/시간, 장소, 인원', comments: [] },
    ]);

    //TODO:: DB연결 시 DB에 댓글 추가하는 부분으로 수정해야됨
    const addComment = (postId, comment) => {
        let newPosts = posts.map((post) => {

            if (post.id === postId) {
                let newPost = { ...post };
                newPost.comments = [...newPost.comments, comment];
                return newPost;
            } else {
                return post;
            }
        });
        setPosts(newPosts);
    }

    /* eslint-disable */
    useEffect(() => {
        setFilteredPosts(
            posts.filter((post) =>
                post.content.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, posts]);




    return (
        <Container maxWidth="md">

            <AppBar position="static" elevation={0} color="inherit" >

                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box my={4} display="flex" justifyContent="center">
                        <Typography variant="h2">Pet Mate</Typography>
                        <Button variant="contained" onClick={write} sx={{ fontSize: '14px', padding: '14px', height: '50px', marginTop: '10px', marginLeft: '20px' }}>
                            <Typography variant='h5'>모집하기</Typography>
                        </Button>
                    </Box>

                    <Button variant='text' onClick={handleSignInClick}>
                        로그인
                    </Button>
                </Toolbar>
            </AppBar>


            <Box display="flex" justifyContent="center" mb={2}>

                <TextField
                    label='검색하기'
                    variant='outlined'
                    sx={{ width: '50%', textAlign: 'center' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </Box>

            <Stack direction="column" spacing={2}>
                {filteredPosts.map((post) => (
                    <Post post={post} key={post.id} addComment={addComment} />
                ))}


            </Stack>
            <Box minHeight='10vh'></Box>
        </Container>
    );
}

function Post({ post, addComment }) {
    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);

    const HandleAddButton = (postId) => {

        const newComment = {
            userId: "아이디",
            content: commentText,
        };

        addComment(postId, newComment);

        // TODO: 여기서 댓글을 DB에 전송하는 API 호출 또는 다른 작업을 수행하세요.

        const HandleAddButton = async (postId) => {
            const newComment = {
                userId: "아이디",
                content: commentText,

            };

            try {
                const docRef = await addDoc(collection(db, "comments"), newComment);

                addComment(postId, { userId: newComment.userId, content: newComment.content });

                setCommentText("");
            } catch (error) {
                console.error("Error adding comment: ", error);
            }
        };

        setCommentText("");
    };


    return (
        <Box key={post.id} p={1} border={1} borderRadius='borderRadius' borderColor="#ddd">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant='h6' sx={{ wordWrap: 'break-word', flex: 1 }}>{post.title}</Typography>
                <Typography variant='subtitle2' sx={{ wordWrap: 'break-word', flex: 1, textAlign: 'right' }}>{post.UserName}</Typography>
            </Box>
            <Box minHeight="15vh" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ wordWrap: 'break-word', textAlign: 'center' }}>
                    {post.content.split(', ').map((item, index) => (
                        <React.Fragment key={index}>
                            {item}
                            <br />
                        </React.Fragment>
                    ))}
                </Typography>
            </Box>

            <Divider />
            <Box display="flex" p={1}>
                <Box flexGrow={1} display="flex" justifyContent="center">
                    <Button variant="text" onClick={() => setShowComments(!showComments)}>
                        {showComments ? `댓글 숨기기` : `댓글(${post.comments.length})`}
                    </Button>
                </Box>

            </Box>
            {showComments && (
                <>
                    {post.comments.map((comment, index) => (
                        <React.Fragment key={index}>
                            <Divider />
                            <Typography sx={{ wordWrap: 'break-word' }} variant='subtitle2' mt={2}>{comment.userId}</Typography>
                            <Typography sx={{ wordWrap: 'break-word' }} variant='body2' mt={1} mb={2}>{comment.content}</Typography>
                        </React.Fragment>
                    ))}
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

                                HandleAddButton(post.id);
                            }}
                            style={{ marginLeft: 10 }}
                        >
                            등록
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}