import styled from 'styled-components';
import { Container, WhiteBox } from '@/components/styles/common';
import pencil from '@/assets/Pencil.svg';
const SettingPage = () => {
   return (
      <Container>
         <WhiteBox
            style={{ gap: '0', padding: '15px 0', position: 'relative' }}
         >
            <TitleText>프로필</TitleText>
            <Icon src={pencil} />
            <ProfileBox>
               <InfoText>닉네임</InfoText>
               <DetailText>홍길동</DetailText>
            </ProfileBox>
            <ProfileBox>
               <InfoText>이메일</InfoText>
               <DetailText>111@gmail.com</DetailText>
            </ProfileBox>
         </WhiteBox>
         <WhiteBox style={{ gap: '0', padding: '15px 0' }}>
            <InfoBox>
               <InfoText>내 게시글</InfoText>
            </InfoBox>
            <InfoBox>
               <InfoText>커뮤니티 좋아요 목록</InfoText>
            </InfoBox>
            <InfoBox>
               <InfoText>상품 좋아요 목록</InfoText>
            </InfoBox>
            <InfoBox>
               <InfoText>레시피 북마크</InfoText>
            </InfoBox>
         </WhiteBox>
      </Container>
   );
};
export default SettingPage;
const InfoText = styled.p`
   margin: 0;
   font-family: SemiBold;
   font-size: 1.1rem;
`;
const TitleText = styled.p`
   margin: 0;
   font-family: SemiBold;
   font-size: 1.3rem;
   margin-left: 25px;
   margin-bottom: 20px;
   margin-top: 12px;
`;
const ProfileBox = styled.div`
   display: flex;
   gap: 20px;
   padding: 8px 25px;
   align-items: center;
`;
const InfoBox = styled.div`
   display: flex;
   gap: 20px;
   padding: 12px 25px;
   align-items: center;
   cursor: pointer;
`;
const DetailText = styled.p`
   margin: 0;
   font-family: Regular;
   opacity: 0.8;
`;
const Icon = styled.img`
   width: 24px;
   position: absolute;
   right: 25px;
   top: 27px;
`;
