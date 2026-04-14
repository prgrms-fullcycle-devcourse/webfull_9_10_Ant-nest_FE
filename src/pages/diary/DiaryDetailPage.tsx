import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DiaryHeader from '../../components/common/DiaryHeader';
import DiaryQuestion from '../../components/common/DiaryQuestion';
import DiaryForm from '../../components/common/DiaryForm';
import DiaryBottomBar from '../../components/common/DiaryBottomBar';
import { EMOTIONS } from '../../features/diary/utils/emotions';
import ImagePreviewModal from '../../components/common/ImagePreviewModal';

export default function DiaryDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // TODO: API로 일기 데이터 가져오기
  const question = '오늘 당신을 미소 짓게 만든 것은 무엇인가요?';
  const title = '완전완전 맛있는 밥을 먹음.';
  const content =
    '떡볶이 먹고 너무 매워서 아이스크림까지 먹었음 역시 맛있는 걸 먹는게 인생의 행복이다.';
  const dateStr = '2026년 3월 17일 화요일';
  const photoUrl = 'https://picsum.photos/200';
  const selectedEmotionData = EMOTIONS.find((e) => e.id === 'peaceful'); // 임시
  const [isPublic, setIsPublic] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleDelete = () => {
    // TODO: API 연동 - DELETE /diaries/:id
    console.log('삭제', id);
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/diary/edit/${id}`);
  };

  const images = photoUrl ? [{ file: new File([], ''), preview: photoUrl }] : [];

  return (
    <div>
      <DiaryHeader onBack={() => navigate(-1)} />
      <DiaryQuestion question={question} />
      <DiaryForm
        selectedEmotionData={selectedEmotionData}
        dateStr={dateStr}
        title={title}
        content={content}
        images={images}
        setPreviewModal={setPreviewImage}
        readOnly={true}
      />
      <DiaryBottomBar
        mode="detail"
        isPublic={isPublic}
        onTogglePublic={() => setIsPublic(!isPublic)}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <div className="h-[80px]" />

      {/* 이미지 확대 모달 */}
      <ImagePreviewModal imageUrl={previewImage} onClose={() => setPreviewImage(null)} />
    </div>
  );
}
