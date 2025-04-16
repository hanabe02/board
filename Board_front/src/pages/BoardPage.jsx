import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Link를 추가
import '../styles/board.css';
import { boardInfo, requestTotalPages } from "../redux/board/boardActions";
import axios from "axios";
import api from '../api/api';



function BoardPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const boardList = useSelector((state) => state.board.boardList);
    // const boardList = boardData?.content || [];
    const [selectedPosts, setSelectedPosts] = useState([]); // 저장된 게시글들의 정보
    const [selectedPostInfo, setSelectedPostInfo] = useState([]); // 선택된 게시글들의 정보
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5;

    // console.log("디버깅 포인트 boardData : ", boardList);
    // console.log("디버깅 포인트 boardList : ", boardList);

    // const totalPages = useSelector((state) => state.board.totalPages || 0);
    const totalPages = useSelector((state) => state.board.totalPages); 
    const totalCount = totalPages.totalPages || 0;
    // console.log("디버깅 포인트 totalPages : ", totalPages);
    const [pageStart, setPageStart] = useState(0);

    const columns = [
        { headerName: '제목', field: 'title' },
        { headerName: '작성자', field: 'writer' },
        { headerName: '작성일', field: 'regdate' }
    ];

    useEffect(() => {
        console.log("디버깅 포인트 : fetchTotalPages 실행됨")
        dispatch(requestTotalPages()); // ⭐ 이건 최초 1번만!
    }, []);

    useEffect(() => {
        console.log(currentPage);
        const size = 10;
        dispatch(boardInfo(currentPage, size));
    }, [dispatch, currentPage]); // 값이 변경될 때마다 실행되는 부분

    const handleCheckboxChange = (e, postId, post) => {
        if (e.target.checked) {
            setSelectedPosts([...selectedPosts, postId]);
            setSelectedPostInfo([...selectedPostInfo, post]);  // 선택된 게시글의 정보 저장
        } else {
            setSelectedPosts(selectedPosts.filter(id => id !== postId));
            setSelectedPostInfo(selectedPostInfo.filter(item => item.boardId !== postId));  // 선택 해제 시 정보 제거
        }
    };

    const handleSelectAllChange = (e) => {
        if (e.target.checked) {
            setSelectedPosts(boardList.map(post => post.boardId)); // 모든 게시글 ID 추가
            setSelectedPostInfo(boardList);  // 모든 게시글 정보 저장
        } else {
            setSelectedPosts([]); // 모든 게시글 ID 제거
            setSelectedPostInfo([]);  // 선택 해제 시 모든 게시글 정보 초기화
        }
    };

    const handleDelete = async () => {
        if (selectedPosts.length === 0) {
            alert('삭제할 게시글을 선택해주세요!');
            return;
        }

        // 선택된 게시글들의 정보 전체 출력
        console.log("삭제할 게시글들: ", selectedPostInfo); // 선택된 게시글 정보 전체 출력

        try {

            // 선택된 게시글들을 삭제하는 요청 (예: 삭제 API 호출)
            const deleteRequests = selectedPostInfo.map(post => {
                const boardId = post.boardId;  // 각 게시글의 boardId를 가져옵니다
                console.log("삭제할 게시글 ID:", boardId);

                // 각 게시글에 대해 axios.delete 요청을 반환
                return axios.delete('http://localhost:8887/api/boardDelete', {
                    data: { boardId: boardId }  // 삭제할 게시글 ID를 배열로 전달
                });
            });

            await Promise.all(deleteRequests);
            // 삭제 후, 다시 게시판 목록을 불러오기 위해 boardInfo 액션 호출
            dispatch(boardInfo());
            setSelectedPosts([]);
            setSelectedPostInfo([]);
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
        }
    };

    const handleLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        }
     }

    const renderTableBody = () => {
        if (Array.isArray(boardList) && boardList.length > 0) {
            return boardList.map((post, index) => (
                <tr key={post.boardId}>
                    <td>
                        <input
                            type="checkbox"
                            checked={selectedPosts.includes(post.boardId)}
                            onChange={(e) => handleCheckboxChange(e, post.boardId, post)}
                        />
                    </td>
                    <td>{currentPage * 10 + index + 1}</td> {/* 글 번호 */}
                    {columns.map((col) => (
                        <td key={col.field}>
                            {col.field === "title" ? (
                                <Link to={`/board/${post.boardId}`}>{post[col.field]}</Link>
                            ) : (
                                post[col.field]
                            )}
                        </td>
                    ))}
                </tr>
            ));
        } else {
            return (
                <tr>
                    <td colSpan={columns.length + 2}>게시글이 없습니다.</td>
                </tr>
            );
        }
    };

    const renderPagination = () => {
        const pageButtons = [];
        const totalCountNumber = totalCount; // 전체 페이지 수

        // console.log("totalCount" + totalCount);

        for (let i = 0; i < pageSize; i++) {
            const page = pageStart + i;
            if (page >= totalCountNumber) break;

            pageButtons.push(
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? 'active pagination-button' : 'pagination-button'}
                >
                    {page + 1}
                </button>
            );
        }

        const handlePrev = () => {
            console.log("boardPage :", currentPage);
            if (currentPage > 0) {
                const prevPage = currentPage - 1;

                // currentPage가 그룹 첫 페이지보다 작아지면 그룹을 앞당김
                if (prevPage < pageStart) {
                    setPageStart(prev => prev - pageSize);
                }

                setCurrentPage(prevPage);
            }
        };

        const handleNext = () => {
            const nextPage = currentPage + 1;

            if (nextPage < totalCountNumber) {
                // 페이지 그룹 변경 필요 여부 판단
                const isNextGroup = nextPage % pageSize === 0;
                if (isNextGroup) {
                    setPageStart(prev => prev + pageSize);
                }
                setCurrentPage(nextPage);
            }
        };


        return (
            <div className="pagination">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                >
                    ◀
                </button>
                {pageButtons}
                <button
                    onClick={handleNext}
                    disabled={currentPage >= totalCountNumber - 1}
                >
                    ▶
                </button>
            </div>
        );
    };
    return (
        <div className="container">
            <h2>📋 게시글 목록</h2>

            <table className="board-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectedPosts.length === boardList.length}
                                onChange={handleSelectAllChange}
                            />
                        </th>
                        <th>글 번호</th>
                        {columns.map(col => (
                            <th key={col.field}>{col.headerName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
            </table>

            <div style={{ marginTop: "20px" }}>{renderPagination()}</div>


            <div className="button-group">
                <button className="btn-write" onClick={() => navigate('/write')}>글 쓰기</button>
                <button className="btn-delete" onClick={handleDelete}>삭제</button>
                <button className="btn-logout" onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
}

export default BoardPage;
