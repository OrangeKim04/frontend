import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';
import { customFetch } from '@/hooks/CustomFetch';
import LeftArrow from '@/assets/Left Arrow.svg';

type LikedPost = {
   boardId: string;
   title: string;
   name: string; // 작성자
   createdDate: string;
   content: string;
   likeCount: number;
   commentCount: number;
};

const CommunityLikes = () => {
   const navigate = useNavigate();
   const [likedPosts, setLikedPosts] = useState<LikedPost[]>([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchLiked = async () => {
         setLoading(true);
         try {
            let page = 0;
            let last = false;
            const all: LikedPost[] = [];

            while (!last) {
               const res = await customFetch(
                  `/likes/my?page=${page}&size=10`,
                  { method: 'GET' },
                  navigate,
               );
               if (!res) break;

               all.push(...res.content);
               last = res.last;
               page++;
            }

            setLikedPosts(all);
         } catch (err) {
            console.error('좋아요 게시글 실패:', err);
         } finally {
            setLoading(false);
         }
      };

      fetchLiked();
   }, [navigate]);

   return (
      <Container>
         <TopBar>
            <BackBtn onClick={() => navigate(-1)}>
               <img src={LeftArrow} alt="back" />
            </BackBtn>
            <Title>좋아요한 게시글</Title>
         </TopBar>

         {loading ? (
            <Message>로딩 중...</Message>
         ) : likedPosts.length === 0 ? (
            <Message>좋아요한 게시글이 없습니다.</Message>
         ) : (
            <List>
               {likedPosts.map(post => (
                  <Item
                     key={post.boardId}
                     onClick={() =>
                        navigate(`/community/post/${post.boardId}`)
                     }>
                     <PostTitle>{post.title}</PostTitle>
                     <Meta>
                        <Author>{post.name}</Author>
                        <Stats>
                           <Stat>
                              <img
                                 src={
                                    post.likeCount > 0
                                       ? '/src/assets/setting/favorite_fill.svg'
                                       : '/src/assets/setting/favorite_border.svg'
                                 }
                                 alt="like"
                                 width={16}
                                 height={16}
                                 style={{ marginRight: 4 }}
                              />
                              {post.likeCount}
                           </Stat>
                           <Stat>
                              <FaRegComment style={{ marginRight: 4 }} />
                              {post.commentCount}
                           </Stat>
                        </Stats>
                     </Meta>
                  </Item>
               ))}
            </List>
         )}
      </Container>
   );
};

export default CommunityLikes;

// ---------- Styled ----------
const Container = styled.div`
   padding: 1rem;
   height: calc(100dvh - 70px);
   overflow-y: auto;
   padding-bottom: 90px;
`;

const TopBar = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 1rem;
`;

const BackBtn = styled.button`
   background: none;
   border: none;
   margin-right: 0.5rem;
   cursor: pointer;
   img {
      width: 24px;
      height: 24px;
   }
`;

const Title = styled.h1`
   font-size: 1.2rem;
   margin: 0;
`;

const Message = styled.p`
   text-align: center;
   color: #888;
`;

const List = styled.div`
   display: flex;
   flex-direction: column;
   gap: 1rem;
`;

const Item = styled.div`
   border: 1px solid #ddd;
   border-radius: 8px;
   padding: 1rem;
   cursor: pointer;
   transition: background 0.2s;
   &:hover {
      background: #f9f9f9;
   }
`;

const PostTitle = styled.h2`
   margin: 0 0 0.5rem;
   font-size: 1rem;
`;

const Meta = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

const Author = styled.span`
   font-size: 0.85rem;
   color: #555;
`;

const Stats = styled.div`
   display: flex;
   gap: 0.5rem;
`;

const Stat = styled.div`
   display: flex;
   align-items: center;
   font-size: 0.85rem;
`;
