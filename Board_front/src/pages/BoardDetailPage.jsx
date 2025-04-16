import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import '../styles/boardDetail.css';
import axios from "axios";


function BoardDetailPage() {
    const { boardId } = useParams();  // URL에서 boardId를 가져옵니다.
    const boardList = useSelector((state) => state.board.boardList);

    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const content = post.content;
        console.log(content);
        console.log(post.boardId);
        try {
            // 데이터가 요청 본문에 포함됩니다.
            await axios.patch('http://localhost:8887/api/boardUpdate', {
                content: content,
                boardId: boardId
            });
            navigate("/board");
        } catch (error) {
            console.error(error);
        }
    }

    // 게시글 데이터를 불러오는 useEffect
    useEffect(() => {
        const selectedPost = boardList.find(post => post.boardId === parseInt(boardId));
        setPost(selectedPost);
    }, [boardId, boardList]);

    if (!post) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="container">
            <h2>{post.title}</h2>
            <p><strong>작성자:</strong> {post.writer}</p>
            <p><strong>작성일:</strong> {post.regdate}</p>
            <p><strong>내용:</strong> {post.content}</p>

            {/* 수정할 수 있는 폼 추가 */}
            <textarea
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
            />

            <button onClick={handleSubmit}>수정 저장</button>
        </div>
    );
}

export default BoardDetailPage;
