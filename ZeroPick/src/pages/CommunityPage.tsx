import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaRegComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

const HomePage: React.FC = () => {
  const [categories] = useState<string[]>(['카테고리1', '카테고리2', '카테고리3']);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const navigate = useNavigate();

  // 게시글 상태 및 페이징
  const [posts, setPosts] = useState<Post[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  // 게시글 목록 API 연동
  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axios.get('/api/v1/boards/scroll', {
        params: { category: activeCategory, page, size: 10 },
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken') ?? ''}` }
      });
      const data = res.data; // { items: Post[], hasNext: boolean }
      setPosts(prev => [...prev, ...data.items]);
      setHasMore(data.hasNext);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('게시글 조회 실패', err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, page, hasMore, loading]);

  // 카테고리 변경 시 초기화
  useEffect(() => {
    setPosts([]);
    setPage(0);
    setHasMore(true);
  }, [activeCategory]);

  // 초기 렌더 및 페치 호출
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 무한 스크롤 관찰자
  const lastPostRef = useCallback((node: HTMLDivElement) => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) fetchPosts();
    });
    if (node) observerRef.current.observe(node);
  }, [fetchPosts, hasMore]);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
  };

  const handleLike = (postId: number) => {
    // TODO: 좋아요 API 연동
  };

  const handleComment = (postId: number) => {
    // TODO: 댓글 API 연동
  };

  const handleFloatingButtonClick = () => {
    navigate('/community/write');
  };

  const handlePostClick = (postId: number) => {
    navigate(`/community/post/${postId}`);
  };

  return (
    <PageContainer>
      <Header>키워드별 잡다한 이야기</Header>

      <CategoryTabsContainer>
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryTabsContainer>

      <PostsContainer>
        {posts.slice(0, visibleCount).map((post, index) => {
          const isLast = index === visibleCount - 1;
          return (
            <PostCard
              key={post.id}
              ref={isLast ? lastPostRef : null}
              onClick={() => handlePostClick(post.id)}
            >
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
              <ActionsContainer>
                <ActionButton as="div" onClick={e => { e.stopPropagation(); handleLike(post.id); }}>
                  <img
                    src={
                      post.likeCount > 0
                        ? '/src/assets/setting/favorite_fill.svg'
                        : '/src/assets/setting/favorite_border.svg'
                    }
                    alt="like"
                    style={{ width: '16px', height: '16px', marginRight: '4px' }}
                  />
                  {post.likeCount}
                </ActionButton>
                <ActionButton as="div" onClick={e => { e.stopPropagation(); handleComment(post.id); }}>
                  <FaRegComment style={{ color: 'black', marginRight: '4px' }} />
                  {post.commentCount}
                </ActionButton>
              </ActionsContainer>
            </PostCard>
          );
        })}
        {loading && <LoadingMessage>로딩 중...</LoadingMessage>}
        {!hasMore && <EndMessage>마지막 게시글입니다.</EndMessage>}
      </PostsContainer>

      <FloatingButton onClick={handleFloatingButtonClick} />
    </PageContainer>
  );
};

export default HomePage;

// ⬇️ 스타일 컴포넌트들
const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  min-height: 100vh;
  overflow-y:  auto;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 1rem;
  text-align: left;
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 1px solid #eee;
`;

const CategoryTabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const CategoryButton = styled.button`
  background: #f0f0f0;
  border: 1px solid black;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
`;

const PostsContainer = styled.div`
  padding: 1rem;
`;

const PostCard = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const PostTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const PostContent = styled.p`
  font-size: 0.9rem;
  color: #555;
`;

const ActionsContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #888;
`;

const EndMessage = styled.p`
  text-align: center;
  color: #888;
`;

const FloatingButton = styled.button`
  position: fixed;
  right: 1rem;
  bottom: 80px;
  background-color: #FF9EB3;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-image: url('/src/assets/setting/PencilWhite.svg');
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 1000;
`;
