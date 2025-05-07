import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { FaRegComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [categories] = useState<string[]>(['카테고리1', '카테고리2', '카테고리3']);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const navigate = useNavigate();

  // 전체 게시글
  const allPosts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `타이틀 ${i + 1}`,
    content: `내용입니다. 내용입니다. 내용입니다. ${i + 1}`,
  }));

  const [visibleCount, setVisibleCount] = useState(10);
  const visiblePosts = allPosts.slice(0, visibleCount);

  const [likedPosts, setLikedPosts] = useState<boolean[]>(
    new Array(allPosts.length).fill(false)
  );
  const [likeCounts, setLikeCounts] = useState<number[]>(
    new Array(allPosts.length).fill(0)
  );

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback((node: HTMLDivElement) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < allPosts.length) {
        setVisibleCount((prev) => prev + 10);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [visibleCount]);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
  };

  const handleLike = (index: number) => {
    const isCurrentlyLiked = likedPosts[index];
    const updatedLikedPosts = [...likedPosts];
    updatedLikedPosts[index] = !isCurrentlyLiked;
    setLikedPosts(updatedLikedPosts);

    const updatedLikeCounts = [...likeCounts];
    updatedLikeCounts[index] += isCurrentlyLiked ? -1 : 1;
    setLikeCounts(updatedLikeCounts);
  };

  const handleComment = (index: number) => {
    console.log(`Comment on post ${index}`);
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
        {visiblePosts.map((post, index) => {
          const globalIndex = post.id - 1;
          const isLastPost = index === visiblePosts.length - 1;

          return (
            <PostCard
              key={post.id}
              ref={isLastPost ? lastPostRef : null}
              onClick={() => handlePostClick(post.id)}
            >
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
              <ActionsContainer>
                <ActionButton
                  as="div"
                  onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭 방지
                    handleLike(globalIndex);
                  }}
                >
                  <img
                    src={
                      likedPosts[globalIndex]
                        ? '/src/assets/setting/favorite_fill.svg'
                        : '/src/assets/setting/favorite_border.svg'
                    }
                    alt="like"
                    style={{ width: '16px', height: '16px', marginRight: '4px' }}
                  />
                  {likeCounts[globalIndex]}
                </ActionButton>
                <ActionButton as="div">
                  <FaRegComment style={{ color: 'black', marginRight: '4px' }} />
                  0
                </ActionButton>
              </ActionsContainer>
            </PostCard>
          );
        })}
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
