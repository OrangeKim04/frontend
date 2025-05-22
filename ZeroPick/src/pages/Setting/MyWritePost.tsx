import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { customFetch } from '@/hooks/CustomFetch';
import { Post } from '@/type/post';
import LeftArrow from '@/assets/Left Arrow.svg'; // ← 아이콘 경로 예시
import CommunityItem from '@/components/CommunityItem';

const MyWritePost: React.FC = () => {
   const navigate = useNavigate();
   const [posts, setPosts] = useState<Post[]>([]);
   const [page, setPage] = useState(0);
   const [hasMore, setHasMore] = useState(true);
   const [loading, setLoading] = useState(false);
   /* const observerRef = useRef<IntersectionObserver | null>(null); */

   const fetchMyPosts = useCallback(async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
         const query = new URLSearchParams({
            page: page.toString(),
            size: '10',
         });

         const res = (await customFetch(
            `/boards/my?${query.toString()}`,
            { method: 'GET' },
            navigate,
         )) as { content?: Post[]; last?: boolean };

         const newPosts = Array.isArray(res.content) ? res.content : [];
         setPosts(prev => [
            ...prev,
            ...newPosts.filter(
               newPost =>
                  !prev.some(existing => existing.boardId === newPost.boardId),
            ),
         ]);
         setHasMore(!res.last);

         setPage(prev => prev + 1);
      } catch (err) {
         console.error('내 게시글 불러오기 실패:', err);
      } finally {
         setLoading(false);
      }
   }, [page, hasMore, loading, navigate]);

   useEffect(() => {
      fetchMyPosts();
   }, []);

   /*   const lastPostRef = useCallback(
      (node: HTMLDivElement) => {
         if (loading) return;
         if (observerRef.current) observerRef.current.disconnect();
         observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
               fetchMyPosts();
            }
         });
         if (node) observerRef.current.observe(node);
      },
      [loading, hasMore, fetchMyPosts],
   ); */

   return (
      <Container>
         <TopBar>
            <BackButton onClick={() => navigate(-1)}>
               <img src={LeftArrow} alt="뒤로가기" />
            </BackButton>
            <Title>내가 쓴 게시글</Title>
         </TopBar>

         {posts.length === 0 && !loading ? (
            <Message>작성한 게시글이 없습니다.</Message>
         ) : (
            <List>
               {posts.map((post, id) => (
                  <CommunityItem key={id} post={post} />
               ))}
            </List>
         )}
         {loading && <Message>로딩 중...</Message>}
      </Container>
   );
};

export default MyWritePost;

const Container = styled.div`
   padding: 1rem;
   font-family: Arial, sans-serif;
   height: calc(100dvh - 70px);
   overflow-y: auto;
   padding-bottom: 90px;
`;

const TopBar = styled.div`
   display: flex;
   align-items: center;
   margin-bottom: 1rem;
`;

const BackButton = styled.button`
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
