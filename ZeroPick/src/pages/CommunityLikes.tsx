import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';
import { customFetch } from '@/hooks/CustomFetch';
import { PostDetail } from '@/type/post';
import LeftArrow from '@/assets/Left Arrow.svg';

const CommunityLikes: React.FC = () => {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState<PostDetail[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      setLoading(true);
      try {
        const categories = ['FREE_BOARD', 'RECIPE', 'ZERO_PRODUCT_REVIEW'];
        const allBoardIds: number[] = [];

        for (const category of categories) {
          let page = 0;
          let last = false;

          while (!last) {
            const query = new URLSearchParams({
              category,
              page: page.toString(),
              size: '20',
            });

            const res = await customFetch<{
              content: { boardId: number }[];
              last: boolean;
            }>(`/boards/scroll?${query.toString()}`, { method: 'GET' }, navigate);

            if (!res || !res.content) return;

            const typedRes = res as {
              content: { boardId: number }[];
              last: boolean;
            };

            const ids = typedRes.content.map(post => post.boardId);
            allBoardIds.push(...ids);
            last = typedRes.last;
            page++;
          }
        }

        const detailResults = await Promise.all(
          allBoardIds.map(id =>
            customFetch<PostDetail>(
              `/boards/${id}/full`,
              { method: 'GET' },
              navigate
            ).catch(() => null)
          )
        );

        const filtered = detailResults.filter(
          post => post && post.liked
        ) as PostDetail[];

        setLikedPosts(filtered);
      } catch (error) {
        console.error('좋아요한 게시글 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedPosts();
  }, [navigate]);

  return (
    <Container>
      <TopBar>
        <BackButton onClick={() => navigate(-1)}>
          <img src={LeftArrow} alt="뒤로가기" />
        </BackButton>
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
              onClick={() => navigate(`/community/post/${post.boardId}`)}
            >
              <PostTitle>{post.title}</PostTitle>
              <Meta>
                <Author>{post.nickname}</Author>
                <Counts>
                  <Count>
                    <img
                      src={
                        post.likeCount > 0
                          ? '/src/assets/setting/favorite_fill.svg'
                          : '/src/assets/setting/favorite_border.svg'
                      }
                      alt="like"
                      style={{ width: 16, height: 16, marginRight: 4 }}
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
    </Container>
  );
};

export default CommunityLikes;

// ---------- Styled Components ----------
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
