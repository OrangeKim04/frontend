import styled from 'styled-components';
import fillHeartIcon from '@/assets/setting/favorite_fill.svg';
import blankHeartIcon from '@/assets/setting/favorite_border.svg';
import { useNavigate } from 'react-router-dom';
import { SubText } from '@/components/styles/common';
import { Post } from '@/type/post';
import { FaRegComment } from 'react-icons/fa';
const CommunityItem = ({ post }: { post: Post }) => {
   const navigate = useNavigate();
   const handlePostClick = (postId: number) => {
      navigate(`/community/post/${postId}`);
   };
   return (
      <PostCard
         key={post.boardId}
         onClick={() => handlePostClick(post.boardId)}>
         <PostAuthor>{post.name}</PostAuthor>
         <PostTitle>{post.title}</PostTitle>
         <PostContent>
            {post.content.length > 25
               ? `${post.content.slice(0, 25)}...`
               : post.content}
         </PostContent>

         <ActionsContainer>
            <ActionButton as="div">
               <img
                  src={post.likeCount > 0 ? fillHeartIcon : blankHeartIcon}
                  alt="like"
                  style={{
                     width: '14px',
                     marginRight: '4px',
                  }}
               />
               {post.likeCount}
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
