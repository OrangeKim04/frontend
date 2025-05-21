import { customFetch } from '@/hooks/CustomFetch';
import { useUserStore } from '@/stores/user';
import { categoryMap } from '@/type/community';
import { Post } from '@/type/post';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CommunityPage: React.FC = () => {
   const { name, email, setName, setEmail } = useUserStore();
   const [categories] = useState<string[]>([
      'ZERO_PRODUCT_REVIEW',
      'RECIPE',
      'FREE_BOARD',
   ]);
   const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
   const navigate = useNavigate();
   const observerRef = useRef<IntersectionObserver | null>(null);
   const [posts, setPosts] = useState<Post[]>([]);
   const [page, setPage] = useState(0);
   const [hasMore, setHasMore] = useState(true);
   const [loading, setLoading] = useState(false);

   const fetchUser = useCallback(async () => {
      try {
         const result = await customFetch(
            '/user',
            {
               method: 'GET',
               headers: { accept: 'application/json' },
            },
            navigate,
         );
         console.log('사용자 정보 조회', result.data);
         setName(result.data.name);
         setEmail(result.data.email);
      } catch (error) {
         console.error('사용자 정보 조회 실패', error);
      }
   }, [navigate, setName, setEmail]);

   // fetch로 대체된 게시글 API 호출
   const fetchPosts = useCallback(async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
         const query = new URLSearchParams({
            category: activeCategory,
            page: page.toString(),
            size: '10',
         });

         const res = await fetch(`/api/v1/boards/scroll?${query.toString()}`, {
            method: 'GET',
            credentials: 'include',
         });

         if (!res.ok) throw new Error('API 실패');

         const data = await res.json(); // { items: Post[], hasNext: boolean }
         console.log('API 응답:', data);
         setPosts(prev => [...prev, ...data.content]);
         setHasMore(!data.last);
         setPage(prev => prev + 1);
      } catch (err) {
         console.error('게시글 조회 실패', err);
      } finally {
         setLoading(false);
      }
   }, [activeCategory, page, hasMore, loading]);

   useEffect(() => {
      setPosts([]);
      setPage(0);
      setHasMore(true);
   }, [activeCategory]);

   const lastPostRef = useCallback(
      (node: HTMLDivElement) => {
         if (observerRef.current) observerRef.current.disconnect();
         observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) fetchPosts();
         });
         if (node) observerRef.current.observe(node);
      },
      [fetchPosts, hasMore],
   );

   const handleCategorySelect = (category: string) => {
      setActiveCategory(category);
   };

   // 이건 상세 페이지에서!
   // const handleLike = (postId: number) => {
   //   // TODO: 좋아요 API 연동
   // };

   // const handleComment = (postId: number) => {
   //   // TODO: 댓글 API 연동
   // };

   const handleFloatingButtonClick = () => {
      navigate('/community/write');
   };

   const handlePostClick = (postId: number) => {
      navigate(`/community/post/${postId}`);
   };

   useEffect(() => {
      if (!name && !email) {
         fetchUser();
      }
   }, [name, email, setName, setEmail, fetchUser]);

   return (
      <PageContainer>
         <Header>키워드별 잡다한 이야기</Header>

         <CategoryTabsContainer>
            {categories.map(category => (
               <CategoryButton
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  $isActive={activeCategory === category}>
                  {categoryMap[category]}
               </CategoryButton>
            ))}
         </CategoryTabsContainer>

         <PostsContainer>
            {posts.map(post => {
               return (
                  <PostCard
                     key={post.boardId}
                     onClick={() => handlePostClick(post.boardId)}>
                     <PostAuthor>{post.name}</PostAuthor>
                     <PostTitle>{post.title}</PostTitle>
                     <PostContent>{post.content}</PostContent>
                     <ActionsContainer>
                        <ActionButton
                           as="div"
                           // onClick={e => {
                           //   e.stopPropagation();
                           //   handleLike(post.boardId);
                           // }}
                        >
                           <img
                              src={
                                 post.likeCount > 0
                                    ? '/src/assets/setting/favorite_fill.svg'
                                    : '/src/assets/setting/favorite_border.svg'
                              }
                              alt="like"
                              style={{
                                 width: '16px',
                                 height: '16px',
                                 marginRight: '4px',
                              }}
                           />
                           {post.likeCount}
                        </ActionButton>
                        <ActionButton
                           as="div"
                           // onClick={e => {
                           //   e.stopPropagation();
                           //   handleComment(post.boardId);
                           // }}
                        >
                           <FaRegComment
                              style={{ color: 'black', marginRight: '4px' }}
                           />
                           {post.commentCount}
                        </ActionButton>
                     </ActionsContainer>
                  </PostCard>
               );
            })}
            <ObserverDiv ref={hasMore ? lastPostRef : null} />
            {loading && <LoadingMessage>로딩 중...</LoadingMessage>}
            {!hasMore && <EndMessage>마지막 게시글입니다.</EndMessage>}
         </PostsContainer>

         <FloatingButton onClick={handleFloatingButtonClick} />
      </PageContainer>
   );
};

export default CommunityPage;

const ObserverDiv = styled.div`
   width: 100%;
   height: 0px;
`;

const PageContainer = styled.div`
   font-family: Arial, sans-serif;
   min-height: 100vh;
   overflow-y: auto;
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
   width: 100%;
   background-color: white;
   border-bottom: 1px solid #eee;
   position: sticky;
   top: 0;
   z-index: 10;
   position: relative;
`;

const CategoryButton = styled.button<{ $isActive: boolean }>`
   flex: 1;
   background: white;
   color: ${props => (props.$isActive ? '#FF9EB3' : '#666')};
   border: none;
   border-bottom: 2px solid
      ${props => (props.$isActive ? '#FF9EB3' : 'transparent')};
   padding: 1rem 0;
   font-size: 0.9rem;
   cursor: pointer;
   transition: all 0.2s ease-in-out;
   font-weight: ${props => (props.$isActive ? '600' : '400')};
   position: relative;
   font-family: Regular;

   &:hover {
      color: #ff9eb3;
   }

   &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #ff9eb3;
      transform: scaleX(${props => (props.$isActive ? 1 : 0)});
      transition: transform 0.2s ease-in-out;
   }
`;

const PostsContainer = styled.div`
   padding: 1rem;
`;

const PostCard = styled.div`
   position: relative;
   border: 1px solid black;
   border-radius: 10px;
   padding: 1rem;
   margin-bottom: 1rem;
`;

const PostAuthor = styled.p`
   display: inline-block;
   position: absolute;
   top: calc(0.5rem + 16px);
   right: 16px;
   margin: 0;
`;

const PostTitle = styled.h2`
   font-size: 1rem;
   margin: 0.5rem 0;
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
   margin-bottom: 80px;
`;

const FloatingButton = styled.button`
   position: fixed;
   right: 1rem;
   bottom: 80px;
   background-color: #ff9eb3;
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
