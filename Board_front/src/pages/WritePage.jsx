import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/write.css'; // css는 그대로 사용
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

function WritePage() {
    // const [writer, setWriter] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const writer = user?.id || '';

    const handleSubmit = async () => {
        if (!writer.trim() || !title.trim() || !content.trim()) {
            return alert('작성자, 제목, 내용을 모두 입력해주세요!');
        }

        const requestData = { writer, title, content };
        console.log(requestData);


        try {
            await axios.post('http://localhost:8887/api/write', {
                writer,
                title,
                content
            });

            navigate('/board');
        } catch (error) {
            console.error('등록 오류:', error);
            alert('에러가 발생했습니다.');
        }
    };

    return (
        <div className="write-container">
            <div className="write-title">📝 글 작성</div>

            <input
                className="write-input"
                type="text"
                placeholder="작성자"
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
                readOnly
            />

            <input
                className="write-input"
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="write-textarea"
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <div className="write-buttons">
                <button onClick={handleSubmit}>등록</button>
                <button onClick={() => navigate('/board')}>취소</button>
            </div>
        </div>
    );
}

export default WritePage;
