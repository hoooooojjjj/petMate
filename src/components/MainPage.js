import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Divider, Stack, TextField } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from "react-router-dom";

export default function MainPage() {
    const navigate = useNavigate();


    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);

    const write = () => {
        //글 작성 페이지로 이동
        navigate("/InsertForm");
    };

    //DB연결 필요
    const posts = [
        { id: "User11", likes: 0, content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', comments: [{ userId: 'Commenter1', content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.' }] },
        { id: "User22", content: '두번째 포스트', likes: 0, comments: [{ userId: 'Commenter2', content: '안녕하세요.' }, { userId: 'Commenter2', content: '두번째 댓글입니다.' }, { userId: 'Commenter2', content: '두번째 댓글입니다.' }, { userId: 'Commenter2', content: '두번째 댓글입니다.' }, { userId: 'Commenter2', content: '두번째 댓글입니다.' }, { userId: 'Commenter2', content: '두번째 댓글입니다.' }, { userId: 'Commenter2', content: '두번째 댓글입니다.' }, { userId: 'Commenter2', content: '두번째 댓글입니다.' }, { userId: 'Commenter2', content: '두번째 댓글입니다.' }, { userId: 'Commenter2', content: '두번째 댓글입니다.' }, { userId: 'Commenter2', content: '두번째 댓글입니다.' }, { userId: 'Commenter2', content: '두번째 댓글입니다.' }, { userId: 'Commenter2', content: '두번째 댓글입니다.' }] },
        { id: "User33", content: '세번째 포스트', likes: 0, comments: [{ userId: 'Commenter3', content: '안녕하세요.' }, { userId: 'Commenter3', content: '세번째 댓글입니다.' }] },
        { id: "User44", content: '네번째 포스트', likes: 0, comments: [] },
        { id: "User55", content: '다섯번째 포스트', likes: 0, comments: [{ userId: 'Commenter5', content: '안녕하세요.' }, { userId: 'Commenter5', content: '다섯번째 댓글입니다.' }] },
        { id: "User66", content: '여섯번째 포스트', likes: 0, comments: [{ userId: 'Commenter6', content: '안녕하세요.' }, { userId: 'Commenter6', content: '여섯번째 댓글입니다.' }] },
        { id: "User77", content: '일곱번째 포스트', likes: 0, comments: [{ userId: 'Commenter7', content: '안녕하세요.' }, { userId: 'Commenter7', content: '일곱번째 댓글입니다.' }] },
    ];

    /* eslint-disable */
    useEffect(() => {
        setFilteredPosts(
            posts.filter((post) =>
                post.content.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm]);

    return (
        <Container maxWidth="md">
            <Box my={4} display="flex" justifyContent="center">
                <Typography variant="h2">Pet Mate</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2}>

                <TextField
                    label='Search'
                    variant='outlined'
                    sx={{ width: '70%' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />


                <Button variant="contained" onClick={write}>

                    <Typography variant='h6'>글 작성</Typography>
                </Button>
            </Box>

            <Stack direction="column" spacing={2}>
                {filteredPosts.map((post) => (
                    <Post post={post} />
                ))}


            </Stack>
            <Box minHeight='10vh'></Box>
        </Container>
    );
}

function Post({ post }) {
    const [comment, setComment] = useState("");
    return (
        <Box key={post.id} p={1} border={1} borderRadius='borderRadius' borderColor="#ddd">
            <Typography variant='h6' sx={{ wordWrap: 'break-word' }}>{post.id}</Typography>
            <Box minHeight="15vh">
                <Typography sx={{ wordWrap: 'break-word' }}>{post.content}</Typography>
            </Box>

            <Divider />
            <Box display="flex" p={1}>
                <Box flexGrow={1} display="flex" justifyContent="center">
                    <CommentIcon />
                    <Typography ml={1}>댓글 수: {post.comments.length}</Typography>
                </Box>
                <Box flexGrow={1} display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        alert(comment);
                        setComment('');
                    }}
                >
                {}
                </Button>
                </Box>
            </Box>
            {post.comments.map((comment) => (
                <>
                    <Divider />
                    <Typography sx={{ wordWrap: 'break-word' }} variant='body1' mt={2}>{comment.userId} </Typography>
                    <Typography sx={{ wordWrap: 'break-word' }} variant='body1' mt={1} mb={2}>{comment.content}</Typography>

                </>
            ))}
            <Box display="flex" alignItems="center" mt={2}>
                <TextField
                    label="댓글 달기"
                    variant="outlined"
                    fullWidth
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        alert(comment);
                        setComment('');
                    }}
                    style={{ marginLeft: 10 }}
                >
                    게시
                </Button>
            </Box>

        </Box>
    );
}