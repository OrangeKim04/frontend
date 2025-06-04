import styled from 'styled-components';
import fillHeartIcon from '@/assets/setting/favorite_fill.svg';
import blankHeartIcon from '@/assets/setting/favorite_border.svg';
import { useNavigate } from 'react-router-dom';
import { SubText } from '@/components/styles/common';
import { Post } from '@/type/post';
import { FaRegComment } from 'react-icons/fa';
import { useState } from 'react';
import { customFetch } from '@/hooks/CustomFetch';
const CommunityItem = ({ post }: { post: Post }) => {
   const navigate = useNavigate();
   const [liked, setLiked] = useState(post.liked);
   const [likeCount, setLikeCount] = useState(post.likeCount);

   const handlePostClick = (postId: number) => {
      navigate(`/community/post/${postId}`);
   };

   const handleLikeClick = async (e: React.MouseEvent) => {
      e.stopPropagation(); // 카드 클릭 방지
      try {
         if (liked) {
            await customFetch(`/boards/${post.boardId}/likes`, { method: 'DELETE' }, navigate);
            setLiked(false);
            setLikeCount(prev => prev - 1);
         } else {
            await customFetch(`/boards/${post.boardId}/likes`, { method: 'POST' }, navigate);
            setLiked(true);
            setLikeCount(prev => prev + 1);
         }
      } catch (error) {
         console.error('좋아요 실패:', error);
      }
   };

   return (
      <PostCard onClick={() => handlePostClick(post.boardId)}>
         <PostAuthor>{post.name}</PostAuthor>
         <PostTitle>{post.title}</PostTitle>
         <PostContent>
            {post.content.length > 25 ? `${post.content.slice(0, 25)}...` : post.content}
         </PostContent>

         <ActionsContainer>
            <ActionButton as="div" onClick={handleLikeClick}>
               <img
                  src={liked ? fillHeartIcon : blankHeartIcon}
                  alt="like"
                  style={{
                     width: '14px',
                     marginRight: '4px',
                  }}
               />
               {likeCount}
            </ActionButton>
            <ActionButton as="div">
               <FaRegComment style={{ color: 'black', marginRight: '4px' }} />
               {post.commentCount}
            </ActionButton>
            <DateText>{post.createdDate}</DateText>
         </ActionsContainer>
      </PostCard>
   );
};

export default CommunityItem;
const PostCard = styled.div`
   position: relative;
   border: 1px solid #e1e1e1;
   border-radius: 10px;
   padding: 1rem;
   margin-bottom: 1rem;
`;

const PostAuthor = styled.p`
   display: inline-block;
   position: absolute;
   top: 16px;
   right: 16px;
   margin: 0;
   font-family: Regular;
   font-size: 0.9rem;
`;

const PostTitle = styled.h2`
   margin: 0;
   font-size: 1rem;
   font-family: Medium;
   padding-right: 80px;
   word-break: break-word;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const PostContent = styled.p`
   font-size: 0.9rem;
   color: #555;
   font-family: Regular;
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
const DateText = styled(SubText)`
   color: gray;
   display: inline-block;
   position: absolute;
   bottom: 16px;
   right: 16px;
   margin: 0;
   font-size: 0.8rem;
`;
