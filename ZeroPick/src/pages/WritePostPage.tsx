import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button as BaseButton } from '@/components/styles/common'; 
import LeftArrow from '@/assets/Left Arrow.svg';

const WritePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('제목:', title, '내용:', content, '키워드:', keywords, '이미지:', images);
    navigate(-1);
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() !== '') {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleKeywordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleDeleteKeyword = (index: number) => {
    setKeywords(keywords.filter((_, idx) => idx !== index));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...fileArray]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  return (
    <PageContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img
            src={LeftArrow}
            alt="back"
            style={{ width: '24px', height: '24px' }}
          />
        </BackButton>
        <HeaderTitle>게시글 작성</HeaderTitle>
        <HeaderSpacer />
      </Header>

      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Label>제목</Label>
          <Input
            type="text"
            placeholder="글 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <TextArea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>키워드</Label>
          <KeywordInputContainer>
            <KeywordInput
              type="text"
              placeholder="키워드를 입력하세요"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordKeyDown}
            />
            <AddKeywordButton type="button" onClick={handleAddKeyword}>
              추가
            </AddKeywordButton>
          </KeywordInputContainer>
          <KeywordContainer>
            {keywords.map((keyword, idx) => (
              <KeywordBubble key={idx}>
                {keyword}
                <DeleteButton onClick={() => handleDeleteKeyword(idx)}>×</DeleteButton>
              </KeywordBubble>
            ))}
          </KeywordContainer>
        </FormGroup>

        <FormGroup>
          <Label>이미지</Label>
          <ImageUploadContainer>
            <ImageUploadButton htmlFor="imageUpload">
              이미지 추가
            </ImageUploadButton>
            <ImageInput
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </ImageUploadContainer>
          <ImagesPreviewContainer>
            {images.map((img, idx) => (
              <ImagePreviewWrapper key={idx}>
                <ImagePreview src={img} alt={`uploaded-${idx}`} />
                <DeleteImageButton onClick={() => handleDeleteImage(idx)}>×</DeleteImageButton>
              </ImagePreviewWrapper>
            ))}
          </ImagesPreviewContainer>
        </FormGroup>

        <SubmitButton type="submit">게시글 등록</SubmitButton>
      </FormContainer>
    </PageContainer>
  );
};

export default WritePostPage;

/* ------------ Styled Components ------------ */

// 공통 Button 스타일을 각 용도에 맞게 오버라이딩
const AddKeywordButton = styled(BaseButton)`
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
`;

const ImageUploadButton = styled(BaseButton).attrs({ as: 'label' })`
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
`;

const SubmitButton = styled(BaseButton)`
  margin-top: 1rem;
`;

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 1rem;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
  flex: 1;
`;

const HeaderSpacer = styled.div`
  width: 1.5rem;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  height: 150px;
  resize: none;
`;

const KeywordInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const KeywordInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const KeywordContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const KeywordBubble = styled.span`
  background-color: #eee;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.span`
  margin-left: 0.5rem;
  cursor: pointer;
  font-weight: bold;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImagesPreviewContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ImagePreview = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const DeleteImageButton = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.8rem;
  cursor: pointer;
`;
