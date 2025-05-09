import styled from 'styled-components';
import { Container, WhiteBox } from '@/components/styles/common';
import { useEffect, useState } from 'react';
import pencil from '@/assets/setting/Pencil.svg';
import postIcon from '@/assets/setting/게시글.svg';
import communityIcon from '@/assets/setting/thumb_up.svg';
import likeIcon from '@/assets/setting/favorite_border.svg';
import scrapIcon from '@/assets/setting/스크랩.svg';
type User = {
   email: string;
   name: string;
};
const SettingPage = () => {
   const [user, setUser] = useState<User>();
   const [isEditing, setIsEditing] = useState(false);
   const [newName, setNewName] = useState('');
   // 사용자 정보 조회
   const fetchUser = async () => {
      try {
         const response = await fetch(`https://zeropick.p-e.kr/user`, {
            method: 'GET',
            credentials: 'include',
            headers: {
               accept: 'application/json',
            },
         });
         if (!response.ok) throw new Error('Network response was not ok');
         const result = await response.json();
         console.log('사용자 정보 조회', result.data);
         setUser(result.data);
      } catch (error) {
         console.error('Fetch error:', error);
      }
   };
   // 사용자 이름 수정
   const fetchEditName = async (name: string) => {
      try {
         const response = await fetch(`https://zeropick.p-e.kr/user/name`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newName: name }),
         });
         if (!response.ok) throw new Error('Network response was not ok');
         const result = await response.json();
         console.log('이름 수정 성공', result);
         fetchUser();
      } catch (error) {
         console.error('Fetch error:', error);
         alert('닉네임 수정에 실패했어요.');
      }
   };

   useEffect(() => {
      fetchUser();
   }, []);
   if (!user) return <p>loading...</p>;
   return (
      <Container>
         <WhiteBox style={{ gap: '0', position: 'relative' }}>
            <TitleText>프로필</TitleText>
            <EditIcon
               src={pencil}
               onClick={() => {
                  setIsEditing(true);
                  setNewName(user.name);
               }}
            />
            <ProfileBox>
               <InfoText>닉네임</InfoText>
               {isEditing ? (
                  <>
                     <Input
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                     />
                     <Button
                        onClick={() => {
                           if (newName !== user.name) {
                              fetchEditName(newName);
                           }
                           setIsEditing(false);
                        }}>
                        확인
                     </Button>
                  </>
               ) : (
                  <DetailText>{user.name}</DetailText>
               )}
            </ProfileBox>
            <ProfileBox>
               <InfoText>이메일</InfoText>
               <DetailText>{user.email}</DetailText>
            </ProfileBox>
            <Br />

            <InfoBox>
               <MenuIcon src={postIcon} />
               <InfoText>내 게시글</InfoText>
            </InfoBox>
            <InfoBox>
               <MenuIcon src={communityIcon} />
               <InfoText>커뮤니티 좋아요 목록</InfoText>
            </InfoBox>
            <InfoBox>
               <MenuIcon src={likeIcon} />
               <InfoText>상품 좋아요 목록</InfoText>
            </InfoBox>
            <InfoBox>
               <MenuIcon src={scrapIcon} />
               <InfoText>레시피 북마크</InfoText>
            </InfoBox>
         </WhiteBox>
      </Container>
   );
};
export default SettingPage;
const InfoText = styled.p`
   margin: 0;
   font-family: Medium;
`;

const TitleText = styled.p`
   margin: 0;
   font-family: SemiBold;
   font-size: 1.3rem;
   margin-left: 10px;
   margin-bottom: 20px;
   margin-top: 12px;
`;
const ProfileBox = styled.div`
   display: flex;
   gap: 20px;
   padding: 8px 10px;
   align-items: center;
`;
const InfoBox = styled.div`
   display: flex;
   gap: 20px;
   padding: 15px 10px;
   align-items: center;
   cursor: pointer;
`;
const DetailText = styled.p`
   margin: 0;
   font-family: Regular;
   opacity: 0.8;
`;
const EditIcon = styled.img`
   width: 24px;
   position: absolute;
   right: 25px;
   top: 27px;
   cursor: pointer;
`;
const MenuIcon = styled.img`
   width: 24px;
`;
const Br = styled.div`
   height: 0.5px;
   background-color: #ff9eb3;
   width: 100%;
   margin: 30px 0;
`;
const Input = styled.input`
   padding: 4px;
   margin-right: 8px;
   width: 50%;
   outline: none;
`;

const Button = styled.button`
   border: none;
   border-radius: 10px;
   color: white;
   background-color: #ff9eb3;
   font-family: SemiBold;
   cursor: pointer;
   padding: 8px 10px;
`;
