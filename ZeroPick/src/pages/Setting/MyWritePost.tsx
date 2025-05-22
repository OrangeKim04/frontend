import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegComment } from 'react-icons/fa';
import { customFetch } from '@/hooks/CustomFetch';
import { Post } from '@/type/post';
import LeftArrow from '@/assets/Left Arrow.svg'; // ← 아이콘 경로 예시

const MyWritePost: React.FC = () => {
   const navigate = useNavigate();
   const [posts, setPosts] = useState<Post[]>([]);
   const [page, setPage] = useState(0);
   const [hasMore, setHasMore] = useState(true);
   const [loading, setLoading] = useState(false);
   const observerRef = useRef<IntersectionObserver | null>(null);

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

   const lastPostRef = useCallback(
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
   );

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
               {posts.map((post, index) => (
                  <Item
                     key={`${post.boardId}-${index}`}
                     onClick={() => navigate(`/community/post/${post.boardId}`)}
                     ref={index === posts.length - 1 ? lastPostRef : undefined}>
                     <PostTitle>{post.title}</PostTitle>
                     <Meta>
                        <Author>{post.name}</Author>
                        <Counts>
                           <Count>
                              <img
                                 src={
                                    post.likeCount > 0
                                       ? '/src/assets/setting/favorite_fill.svg'
                                       : '/src/assets/setting/favorite_border.svg'
                                 }
                                 alt="like"
                                 style={{
                                    width: 16,
                                    height: 16,
                                    marginRight: 4,
                                 }}
                              />
                              {post.likeCount}
                           </Count>
                           <Count>
                              <FaRegComment style={{ marginRight: 4 }} />
                              {post.commentCount}
                           </Count>
                        </Counts>
                     </Meta>
                  </Item>
               ))}
            </List>
         )}
         {loading && <Message>로딩 중...</Message>}
      </Container>
   );
};

export default MyWritePost;

/* ---------- Styled Components ---------- */

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

const Counts = styled.div`
   display: flex;
   gap: 0.5rem;
`;

const Count = styled.div`
   display: flex;
   align-items: center;
   font-size: 0.85rem;
`;
