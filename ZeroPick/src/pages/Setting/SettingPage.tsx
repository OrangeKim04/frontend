import styled from 'styled-components';
import { Container, WhiteBox } from '@/components/styles/common';
import pencil from '@/assets/setting/Pencil.svg';
import postIcon from '@/assets/setting/게시글.svg';
import communityIcon from '@/assets/setting/thumb_up.svg';
import likeIcon from '@/assets/setting/favorite_border.svg';
import scrapIcon from '@/assets/setting/스크랩.svg';

const SettingPage = () => {
   return (
      <Container>
         <WhiteBox style={{ gap: '0', position: 'relative' }}>
            <TitleText>프로필</TitleText>
            <EditIcon src={pencil} />
            <ProfileBox>
               <InfoText>닉네임</InfoText>
               <DetailText>홍길동</DetailText>
            </ProfileBox>
            <ProfileBox>
               <InfoText>이메일</InfoText>
               <DetailText>111@gmail.com</DetailText>
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
