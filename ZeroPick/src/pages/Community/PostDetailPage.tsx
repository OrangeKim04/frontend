import LeftArrow from '@/assets/Left Arrow.svg';
import FavoriteBorderIcon from '@/assets/setting/favorite_border.svg';
import FavoriteFillIcon from '@/assets/setting/favorite_fill.svg';
import { customFetch } from '@/hooks/CustomFetch';
import { useUserStore } from '@/stores/user';
import { Comment, PostDetail } from '@/type/post';
import React, { useRef, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { SubText } from '@/components/styles/common';
import logoIcon from '@/assets/Logo.svg';

const PostDetailPage: React.FC = () => {
   const inputRef = useRef<HTMLInputElement>(null);
   const replyInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
   const { postId } = useParams();
   const navigate = useNavigate();
   const { name } = useUserStore();

   const [showMenu, setShowMenu] = useState(false);
   const [liked, setLiked] = useState(false);
   const [likeCount, setLikeCount] = useState(0);
   const [comments, setComments] = useState<Comment[]>([]);
   const [commentCount, setCommentCount] = useState<number>(0);
   const [postDetail, setPostDetail] = useState<PostDetail | null>(null);
   const [showReplyInputs, setShowReplyInputs] = useState<{ [key: string]: boolean }>({});
   const [editingComments, setEditingComments] = useState<{ [key: string]: boolean }>({});
   const [editedContent, setEditedContent] = useState<{ [key: string]: string }>({});
   // ← 추가: 댓글/대댓글 메뉴 토글 상태
   const [showCommentMenu, setShowCommentMenu] = useState<{ [key: string]: boolean }>({});

   const fetchPostDetail = async () => {
      try {
         const res = await customFetch(
            `/boards/${postId}/full`,
            { method: 'GET' },
            navigate,
         );
         if (!res) throw new Error('불러오기 실패');
         setPostDetail(res);
         setComments(res.comments);
         setLiked(res.liked);
         setLikeCount(res.likeCount);
         setCommentCount(res.commentCount);
      } catch (err) {
         navigate(-1);
         console.log(err);
      }
   };

   if (!postDetail) {
      fetchPostDetail();
   }

   const deletePost = async () => {
      const confirmed = window.confirm('정말로 이 게시글을 삭제하시겠습니까?');
      if (!confirmed) return;
      try {
         await customFetch(`/boards/${postId}`, { method: 'DELETE' }, navigate);
         alert('게시글이 삭제되었습니다.');
         navigate(-1);
      } catch (err) {
         console.log(err);
         alert('삭제에 실패했습니다');
      }
   };

   // ── 댓글 작성 ──
   const handleSubmitComment = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputRef.current?.value) return;

      try {
         await customFetch(
            `/comments/${postId}`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json', accept: 'application/json' },
               body: JSON.stringify({ content: inputRef.current.value }),
            },
            navigate,
         );
         inputRef.current.value = '';
         await fetchPostDetail();
      } catch (error) {
         console.log(error);
      }
   };

   const fetchPostLike = () => {
      customFetch(`/likes/${postId}`, { method: 'POST' }, navigate);
   };

   const fetchCancelPostLike = () => {
      fetch(`/api/v1/likes/${postId}`, { method: 'DELETE' });
   };

   const handleLikeClick = () => {
      if (liked) {
         setLikeCount(prev => prev - 1);
         fetchCancelPostLike();
      } else {
         setLikeCount(prev => prev + 1);
         fetchPostLike();
      }
      setLiked(prev => !prev);
   };

   // ── 댓글 수정 모드 토글 ──
   const toggleEditMode = (commentId: string, currentContent: string) => {
      setEditingComments(prev => ({ ...prev, [commentId]: !prev[commentId] }));
      if (!editingComments[commentId]) {
         setEditedContent(prev => ({ ...prev, [commentId]: currentContent }));
      } else {
         setEditedContent(prev => {
            const copy = { ...prev };
            delete copy[commentId];
            return copy;
         });
      }
   };

   // ── 댓글 저장(수정 완료) ──
   const handleSaveEdit = async (commentId: string) => {
      const newContent = editedContent[commentId]?.trim();
      if (!newContent) return alert('내용을 입력해주세요.');
      try {
         await customFetch(
            `/comments/${commentId}`,
            {
               method: 'PUT',
               headers: { 'Content-Type': 'application/json', accept: 'application/json' },
               body: JSON.stringify({ content: newContent }),
            },
            navigate,
         );
         setEditingComments(prev => ({ ...prev, [commentId]: false }));
         await fetchPostDetail();
      } catch (err) {
         console.log(err);
         alert('댓글 수정에 실패했습니다.');
      }
   };

   // ── 댓글/대댓글 삭제 ──
   const handleDeleteComment = async (commentId: string) => {
      const confirmed = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');
      if (!confirmed) return;
      try {
         await customFetch(`/comments/${commentId}`, { method: 'DELETE' }, navigate);

         const parentIndex = comments.findIndex(c => c.id === commentId);
         if (parentIndex !== -1) {
            const numReplies = comments[parentIndex].replies.length;
            setComments(prev => prev.filter(c => c.id !== commentId));
            setCommentCount(prev => prev - (1 + numReplies));
         } else {
            setComments(prev =>
               prev.map(c => ({
                  ...c,
                  replies: c.replies.filter(r => r.id !== commentId),
               })),
            );
            setCommentCount(prev => prev - 1);
         }
      } catch (err) {
         console.log(err);
         alert('댓글 삭제에 실패했습니다.');
      }
   };

   // ── 대댓글 작성 ──
   const handleReplySubmit = async (commentId: string, e: React.FormEvent) => {
      e.preventDefault();
      const replyInput = replyInputRefs.current[commentId];
      if (!replyInput?.value) return;

      try {
         await customFetch(
            `/comments/${postId}`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json', accept: 'application/json' },
               body: JSON.stringify({ content: replyInput.value, parentId: commentId }),
            },
            navigate,
         );
         replyInput.value = '';
         await fetchPostDetail();
         setShowReplyInputs(prev => ({ ...prev, [commentId]: false }));
      } catch (error) {
         console.log(error);
      }
   };

   const toggleReplyInput = (commentId: string) => {
      setShowReplyInputs(prev => ({ ...prev, [commentId]: !prev[commentId] }));
   };

   // ← 추가: 댓글/대댓글 메뉴 토글 함수
   const toggleCommentMenu = (commentId: string) => {
      setShowCommentMenu(prev => ({ ...prev, [commentId]: !prev[commentId] }));
   };

   if (!postDetail) {
      return <div>게시글 불러오는 중...</div>;
   }

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
                     {name === postDetail.nickname ? (
                        <>
                           <DropdownItem onClick={() => navigate(`/community/edit/${postId}`)}>수정</DropdownItem>
                           <DropdownItem onClick={deletePost}>삭제</DropdownItem>
                        </>
                     ) : (
                        <>
                           <DropdownItem onClick={() => { handleLikeClick(); setShowMenu(false); }}>좋아요</DropdownItem>
                           <DropdownItem onClick={() => alert('신고 클릭')}>신고</DropdownItem>
                        </>
                     )}
                  </DropdownMenu>
               )}
            </MenuWrapper>
         </TopBar>

         <ContentWrapper>
            {/* 게시글 내용 */}
            <PostContainer>
               <Box>
                  <Icon src={logoIcon} />
                  <div>
                     <Nickname>{postDetail.nickname}</Nickname>
                     <DateText>{postDetail.createdDate}</DateText>
                  </div>
               </Box>
               <PostTitle>{postDetail.title}</PostTitle>
               <Content>{postDetail.content}</Content>
               <img src={postDetail.postImage} />
               <IconRow>
                  <IconWithText onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
                     <img
                        src={liked ? FavoriteFillIcon : FavoriteBorderIcon}
                        alt="like"
                        style={{ width: '16px', height: '16px' }}
                     />
                     {likeCount}
                  </IconWithText>
                  <IconWithText>
                     <FaRegComment style={{ color: 'black', width: '16px', height: '16px' }} />
                     {commentCount}
                  </IconWithText>
               </IconRow>
            </PostContainer>

            {/* 댓글 */}
            <CommentList>
               {comments.map(c => (
                  <CommentThread key={c.id}>
                     <CommentItem>
                        <CommentBody>
                           <CommentNickname>{c.username}</CommentNickname>
                           {/* 수정 모드가 아닐 때 */}
                           {!editingComments[c.id] ? (
                              <CommentText>{c.content}</CommentText>
                           ) : (
                              /* 수정 모드일 때 */
                              <EditWrapper>
                                 <EditInput
                                    value={editedContent[c.id] || ''}
                                    onChange={e =>
                                       setEditedContent(prev => ({
                                          ...prev,
                                          [c.id]: e.target.value,
                                       }))
                                    }
                                 />
                                 <EditButton onClick={() => handleSaveEdit(c.id)}>저장</EditButton>
                                 <CancelButton onClick={() => {
                                    toggleEditMode(c.id, c.content);
                                    // 메뉴도 닫아주기
                                    setShowCommentMenu(prev => ({ ...prev, [c.id]: false }));
                                 }}>취소</CancelButton>
                              </EditWrapper>
                           )}
                        </CommentBody>

                        {/* 현재 사용자 작성 댓글에만 세 점(︙) 버튼 */}
                        {c.username === name && (
                           <CommentMenuWrapper>
                              <ThreeDotButton onClick={() => toggleCommentMenu(c.id)}>
                                 <HiOutlineDotsVertical size={18} />
                              </ThreeDotButton>
                              {/* 메뉴를 showCommentMenu[c.id]일 때만 보여주도록 변경 */}
                              {showCommentMenu[c.id] && (
                                 <CommentDropdownMenu>
                                    {!editingComments[c.id] ? (
                                       <CommentDropdownItem onClick={() => toggleEditMode(c.id, c.content)}>
                                          수정
                                       </CommentDropdownItem>
                                    ) : (
                                       <CommentDropdownItem onClick={() => toggleEditMode(c.id, c.content)}>
                                          수정 취소
                                       </CommentDropdownItem>
                                    )}
                                    <CommentDropdownItem onClick={() => handleDeleteComment(c.id)}>
                                       삭제
                                    </CommentDropdownItem>
                                 </CommentDropdownMenu>
                              )}
                           </CommentMenuWrapper>
                        )}
                     </CommentItem>

                     {/* 대댓글 */}
                     {c.replies.length > 0 && (
                        <ReplySection>
                           {c.replies.map(reply => (
                              <ReplyItem key={reply.id}>
                                 <ReplyBody>
                                    <CommentNickname>{reply.username}</CommentNickname>
                                    {!editingComments[reply.id] ? (
                                       <CommentText>{reply.content}</CommentText>
                                    ) : (
                                       <EditWrapper>
                                          <EditInput
                                             value={editedContent[reply.id] || ''}
                                             onChange={e =>
                                                setEditedContent(prev => ({
                                                   ...prev,
                                                   [reply.id]: e.target.value,
                                                }))
                                             }
                                          />
                                          <EditButton onClick={() => handleSaveEdit(reply.id)}>저장</EditButton>
                                          <CancelButton onClick={() => {
                                             toggleEditMode(reply.id, reply.content);
                                             setShowCommentMenu(prev => ({ ...prev, [reply.id]: false }));
                                          }}>취소</CancelButton>
                                       </EditWrapper>
                                    )}
                                 </ReplyBody>

                                 {/* 대댓글 작성자 본인에게만 세 점(︙) 버튼 */}
                                 {reply.username === name && (
                                    <CommentMenuWrapper>
                                       <ThreeDotButton onClick={() => toggleCommentMenu(reply.id)}>
                                          <HiOutlineDotsVertical size={18} />
                                       </ThreeDotButton>
                                       {showCommentMenu[reply.id] && (
                                          <CommentDropdownMenu>
                                             {!editingComments[reply.id] ? (
                                                <CommentDropdownItem onClick={() => toggleEditMode(reply.id, reply.content)}>
                                                   수정
                                                </CommentDropdownItem>
                                             ) : (
                                                <CommentDropdownItem onClick={() => toggleEditMode(reply.id, reply.content)}>
                                                   수정 취소
                                                </CommentDropdownItem>
                                             )}
                                             <CommentDropdownItem onClick={() => handleDeleteComment(reply.id)}>
                                                삭제
                                             </CommentDropdownItem>
                                          </CommentDropdownMenu>
                                       )}
                                    </CommentMenuWrapper>
                                 )}
                              </ReplyItem>
                           ))}
                        </ReplySection>
                     )}

                     <ReplyButton onClick={() => toggleReplyInput(c.id)}>답글 달기</ReplyButton>

                     <ReplyInputWrapper
                        onSubmit={e => handleReplySubmit(c.id, e)}
                        style={{
                           visibility: showReplyInputs[c.id] ? 'visible' : 'hidden',
                           height: showReplyInputs[c.id] ? '40px' : '0',
                           margin: showReplyInputs[c.id] ? '0.5rem 0' : '0',
                           opacity: showReplyInputs[c.id] ? 1 : 0,
                           transition: 'all 0.2s ease-in-out',
                        }}>
                        <ReplyInput
                           ref={el => {
                              replyInputRefs.current[c.id] = el;
                           }}
                           placeholder="답글을 입력해주세요"
                        />
                        <ReplySubmitButton type="submit">확인</ReplySubmitButton>
                     </ReplyInputWrapper>
                  </CommentThread>
               ))}
            </CommentList>

            {/* 댓글 입력 */}
            <CommentInputArea onSubmit={handleSubmitComment}>
               <InputWrapper>
                  <Input ref={inputRef} placeholder="댓글을 입력해주세요" />
                  <SubmitInlineButton type="submit">확인</SubmitInlineButton>
               </InputWrapper>
            </CommentInputArea>
         </ContentWrapper>
      </Container>
   );
};

export default PostDetailPage;

/* ────────────────────────────────────────────────────────────────────────── */
/* 스타일 컴포넌트 정의 */

const Box = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
`;

const Icon = styled.img`
   width: 38px;
`;

const DateText = styled(SubText)`
   color: gray;
   font-size: 0.8rem;
`;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   min-height: 100vh;
`;

const ContentWrapper = styled.div`
   flex: 1;
   padding: 1rem;
   padding-bottom: calc(1rem + 140px); // 네비게이션바 + 댓글창 여백
   font-family: Arial, sans-serif;
   display: flex;
   flex-direction: column;
   gap: 1rem;
   overflow-y: auto;
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
   padding: 1rem;
   background-color: white;
   border-bottom: 1px solid #eee;
   position: sticky;
   top: 0;
   z-index: 100;
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
   font-size: 1.3rem;
   margin: 0;
`;

const Nickname = styled.span`
   font-size: 0.9rem;
   font-weight: bold;
`;

const Content = styled.p`
   font-size: 0.9rem;
   color: #333;
   width: 100%;
   word-wrap: break-word;
   word-break: break-word;
   white-space: pre-wrap;
   margin-top: 0;
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

const CommentThread = styled.div`
   margin-bottom: 1.5rem;
   padding: 1rem;
   border: 1px solid #eee;
   border-radius: 8px;
   background-color: #fff;
`;

const CommentItem = styled.div`
   margin-bottom: 0.75rem;
   display: flex;
   align-items: flex-start;
`;

const CommentBody = styled.div`
   flex: 1;
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
   position: fixed;
   bottom: 60px;
   left: 0;
   right: 0;
   background-color: white;
   padding: 1rem;
   z-index: 100;
   box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
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

const ReplySection = styled.div`
   margin: 0.75rem 0;
   padding-left: 1rem;
   border-left: 2px solid #eee;
`;

const ReplyItem = styled.div`
   display: flex;
   align-items: flex-start;
   margin-bottom: 0.5rem;
   padding: 0.5rem;
   background-color: #f9f9f9;
   border-radius: 4px;
`;

const ReplyBody = styled.div`
   flex: 1;
`;

const ReplyInputWrapper = styled.form`
   position: relative;
   width: 100%;
   overflow: hidden;
`;

const ReplyInput = styled.input`
   width: 100%;
   padding: 0.5rem 3.5rem 0.5rem 0.75rem;
   font-size: 0.9rem;
   border: 1px solid #ccc;
   border-radius: 20px;
   box-sizing: border-box;
`;

const ReplySubmitButton = styled.button`
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

const ReplyButton = styled.button`
   background: none;
   border: none;
   color: #888;
   font-size: 0.85rem;
   padding: 0;
   margin: 0.5rem 0;
   cursor: pointer;
   text-decoration: underline;
   height: 40px;
   display: flex;
   align-items: center;

   &:hover {
      color: #666;
   }
`;

const EditWrapper = styled.div`
   display: flex;
   align-items: center;
   gap: 0.5rem;
   margin-top: 0.5rem;
`;

const EditInput = styled.input`
   flex: 1;
   padding: 0.4rem;
   border: 1px solid #cccccc;
   border-radius: 4px;
   font-size: 0.9rem;
`;

const EditButton = styled.button`
   background-color: #4a90e2;
   color: white;
   padding: 0.4rem 0.8rem;
   border: none;
   border-radius: 4px;
   font-size: 0.85rem;
   cursor: pointer;

   &:hover {
      background-color: #357ab8;
   }
`;

const CancelButton = styled.button`
   background-color: #aaaaaa;
   color: white;
   padding: 0.4rem 0.8rem;
   border: none;
   border-radius: 4px;
   font-size: 0.85rem;
   cursor: pointer;

   &:hover {
      background-color: #888888;
   }
`;

const CommentMenuWrapper = styled.div`
   position: relative;
   margin-left: 0.5rem;
`;

const ThreeDotButton = styled.button`
   background: none;
   border: none;
   cursor: pointer;
   padding: 0;
   display: flex;
   align-items: center;

   &:hover {
      opacity: 0.7;
   }
`;

const CommentDropdownMenu = styled.div`
   position: absolute;
   top: 100%;
   right: 0;
   background-color: white;
   border: 1px solid #dddddd;
   border-radius: 4px;
   box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
   z-index: 10;
   min-width: 80px;
`;

const CommentDropdownItem = styled.div`
   padding: 0.5rem 0.8rem;
   font-size: 0.9rem;
   color: #333333;
   cursor: pointer;

   &:hover {
      background-color: #f2f2f2;
   }
`;
