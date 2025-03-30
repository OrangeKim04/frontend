

const CommunityPage = () => {
  return (
    <div>
      <header>
        <button>←</button>
        <h1>로고</h1>
      </header>

      <h2>키워드별 잡다한 이야기</h2>

      <div>
        <button>카테고리 1</button>
        <button>카테고리 2</button>
        <button>카테고리 3</button>
      </div>

      <div>
        <h3>타이틀</h3>
        <p>내용입니다.내용입니다.내용입니다.</p>
        <div>하트 수: 5 / 댓글 수: 2</div>
      </div>

      <button>✏️ 글쓰기</button>

      <nav>
        <span>🏠</span>
        <span>🔍</span>
        <span>🍴</span>
        <span>❤️</span>
        <span>⚙️</span>
      </nav>
    </div>
  );
};

export default CommunityPage;
