import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import LeftArrow from '@/assets/Left Arrow.svg';
import FavoriteBorderIcon from '@/assets/setting/favorite_border.svg';
import FavoriteFillIcon from '@/assets/setting/favorite_fill.svg';

const PostDetailPage: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const myUserId = '123';
  const postOwnerId = '123';
  const [showMenu, setShowMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);           // 좋아요 수
  const [comments, setComments] = useState<string[]>([]);  // 댓글 목록
  const [input, setInput] = useState('');                  // 댓글 입력값

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (input.trim() !== '') {
      setComments([...comments, input.trim()]);
      setInput('');
    }
  };

  const handleLikeClick = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked((prev) => !prev);
  };

  return (
    <Container>
      {/* 헤더 */}
      <TopBar>
  <BackButton onClick={() => navigate(-1)}>
    <img src={LeftArrow} alt="back" style={{ width: '24px', height: '24px' }} />
  </BackButton>
  <TitleText>제로픽</TitleText>
  <MenuWrapper>
    <HiOutlineDotsVertical onClick={() => setShowMenu(prev => !prev)} style={{ cursor: 'pointer' }} />
    {showMenu && (
      <DropdownMenu>
        {myUserId === postOwnerId ? (
          <>
            <DropdownItem onClick={() => alert('수정 클릭')}>수정</DropdownItem>
            <DropdownItem onClick={() => alert('삭제 클릭')}>삭제</DropdownItem>
          </>
        ) : (
          <>
            <DropdownItem onClick={() => alert('좋아요 클릭')}>좋아요</DropdownItem>
            <DropdownItem onClick={() => alert('신고 클릭')}>신고</DropdownItem>
          </>
        )}
      </DropdownMenu>
    )}
  </MenuWrapper>
</TopBar>




      {/* 게시글 내용 */}
      <PostContainer>
        <PostTitle>글제목</PostTitle>
        <Nickname>닉네임</Nickname>
        <Content>
          내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
          내용입니다.내용입니다.내용입니다.
        </Content>
        <ImageBox />
        <IconRow>
          <IconWithText onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
            <img 
              src={liked ? FavoriteFillIcon : FavoriteBorderIcon}
              alt="like"
              style={{ width: '16px', height: '16px' }} />
            {likeCount}
          </IconWithText>
          <IconWithText>
            <FaRegComment style={{ color: 'black', width: '16px', height: '16px' }} />
            {comments.length}
          </IconWithText>
        </IconRow>
      </PostContainer>

      {/* 댓글 */}
      <CommentList>
        <CommentItem>
          <CommentNickname>닉네임</CommentNickname>
          <CommentText>댓글입니다.댓글입니다.댓글입니다.</CommentText>
        </CommentItem>
        {comments.map((c, i) => (
          <CommentItem key={i}>
            <CommentNickname>닉네임</CommentNickname>
            <CommentText>{c}</CommentText>
          </CommentItem>
        ))}
      </CommentList>

      {/* 댓글 입력 */}
      <CommentInputArea onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            placeholder="댓글을 입력해주세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <SubmitInlineButton type="submit">확인</SubmitInlineButton>
        </InputWrapper>
      </CommentInputArea>
    </Container>
  );
};

export default PostDetailPage;
// ---------------- 스타일 ----------------

const Container = styled.div`
  padding: 1rem;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MenuWrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  width: 100px; 
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  text-align: left;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

const TitleText = styled.h1`
  font-size: 1rem;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PostTitle = styled.h2`
  font-size: 1.1rem;
`;

const Nickname = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;

const Content = styled.p`
  font-size: 0.9rem;
  color: #333;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 120px;
  background-color: #e0e0e0;
  border-radius: 6px;
`;

const IconRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const IconWithText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
`;

const CommentList = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 1rem;
`;

const CommentItem = styled.div`
  margin-bottom: 0.75rem;
`;

const CommentNickname = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
`;

const CommentText = styled.div`
  font-size: 0.85rem;
  color: #333;
`;

const CommentInputArea = styled.form`
  border-top: 1px solid #ddd;
  padding-top: 1rem;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 3.5rem 0.5rem 0.75rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-sizing: border-box;
`;

const SubmitInlineButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 0.85rem;
  color: #333;
  cursor: pointer;
  line-height: 1;
`;
