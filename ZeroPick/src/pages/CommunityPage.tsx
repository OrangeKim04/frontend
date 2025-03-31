import React, { useState } from 'react';
import styled from 'styled-components';

const HomePage: React.FC = () => {
  const [categories] = useState<string[]>(['카테고리1', '카테고리2', '카테고리3']);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  const mockPosts = [
    { title: '타이틀 1', content: '내용입니다. 내용입니다. 내용입니다.' },
    { title: '타이틀 2', content: '내용입니다. 내용입니다. 내용입니다.' },
    { title: '타이틀 3', content: '내용입니다. 내용입니다. 내용입니다.' },
  ];

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
  };

  const handleLike = (index: number) => {
    console.log(`Post ${index} liked!`);
  };

  const handleComment = (index: number) => {
    console.log(`Comment on post ${index}`);
  };

  const handleFloatingButtonClick = () => {
    alert('글쓰기 버튼 클릭');
  };

  return (
    <PageContainer>
      {/* Header */}
      <HeaderContainer>
        <BackButton onClick={() => window.history.back()}>{'<'}</BackButton>
        <Logo>제로픽</Logo>
      </HeaderContainer>

      {/* Title Text */}
      <TitleText>키워드별 잡다한 이야기</TitleText>

      {/* Category Tabs */}
      <CategoryTabsContainer>
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            active={activeCategory === category}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryTabsContainer>

      {/* Posts List */}
      <PostsContainer>
        {mockPosts.map((post, index) => (
          <PostCard key={index}>
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>
            <ActionsContainer>
              <ActionButton onClick={() => handleLike(index)}>하트 수</ActionButton>
              <ActionButton onClick={() => handleComment(index)}>댓글 수</ActionButton>
            </ActionsContainer>
          </PostCard>
        ))}
      </PostsContainer>

      {/* Floating Button */}
      <FloatingButton onClick={handleFloatingButtonClick}>✏️</FloatingButton>
    </PageContainer>
  );
};

export default HomePage;

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const Logo = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const TitleText = styled.div`
  text-align: left;
  padding: 1rem;
  font-size: 24px;
  font-weight: bold;
`;

const CategoryTabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
`;

interface CategoryButtonProps {
  active: boolean;
}

const CategoryButton = styled.button<CategoryButtonProps>`
  background: ${({ active }) => (active ? '#ddd' : 'white')};
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
`;

const PostsContainer = styled.div`
  padding: 1rem;
`;

const PostCard = styled.div`
  border: 1px solid #eee;
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
`;

const FloatingButton = styled.button`
  position: fixed;
  right: 1rem;
  bottom: 80px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 1000;
`;
