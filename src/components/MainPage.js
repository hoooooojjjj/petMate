import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Divider, Stack, TextField } from '@mui/material';
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
    }, [searchTerm,posts]);

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

                    <Typography variant='h6'>모집하기</Typography>
                </Button>
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

    //TODO::바로 밑 지우기
    const MyAddress = "잠만보";
    const HandleAddButton = () => {
        if (commentText !== "") {
            console.log(post.id);
            let newComment = { userId: MyAddress, content: commentText };
            addComment(post.id, newComment);
            setCommentText("");
        }
    }
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
                    <Button variant="contained" onClick={() => setShowComments(!showComments)}>
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
                    <Box display="flex" alignItems="center" mt={2}>
                        <TextField
                            label="댓글 달기"
                            variant="outlined"
                            fullWidth
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {

                                HandleAddButton();
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