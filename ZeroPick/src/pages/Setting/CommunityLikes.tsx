import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '@/hooks/CustomFetch';
import LeftArrow from '@/assets/Left Arrow.svg';
import CommunityItem from '@/components/CommunityItem';
import { Post } from '@/type/post';

const CommunityLikes = () => {
   const navigate = useNavigate();
   const [likedPosts, setLikedPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchLiked = async () => {
         setLoading(true);
         try {
            let page = 0;
            let last = false;
            const all: Post[] = [];

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
               {likedPosts.map((post, id) => (
                  <CommunityItem key={id} post={post} />
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
`;
