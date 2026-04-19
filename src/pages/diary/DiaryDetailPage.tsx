import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DiaryHeader from '../../components/common/DiaryHeader';
import DiaryQuestion from '../../components/common/DiaryQuestion';
import DiaryForm from '../../components/common/DiaryForm';
import DiaryBottomBar from '../../components/common/DiaryBottomBar';
import { EMOTIONS } from '../../features/diary/utils/emotions';
import ImagePreviewModal from '../../components/common/ImagePreviewModal';
import { useDeleteDiary, useGetDiary, useToggleShare } from '../../features/diary/hooks/useDiary';


export default function DiaryDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: diaryData } = useGetDiary(id);
  const diary = diaryData?.data as {
    title: string;
    content: string;
    question: string;
    diaryDate: string;
    emotion: { type: string; name: string };
    photos: { photoId: string; imageUrl: string; displayOrder: number }[];
  } | undefined;

  const question = diary?.question ?? '';
  const title = diary?.title ?? '';
  const content = diary?.content ?? '';
  const dateStr = diary?.diaryDate ?? '';
  const selectedEmotionData = diary ? EMOTIONS.find((e) => e.emotion === diary.emotion.type) : undefined;
  const [isPublic, setIsPublic] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { mutate: removeDiary } = useDeleteDiary();
  const { mutate: toggleShare } = useToggleShare();

  const handleTogglePublic = () => {
    const next = !isPublic;
    setIsPublic(next);
    toggleShare({ diaryId: id!, isActive: next });
  };

  const handleDelete = () => {
    removeDiary(id!);
  };

  const handleEdit = () => {
    navigate(`/diary/edit/${id}`);
  };

  const images = diary?.photos?.map((p) => ({
    file: new File([], ''),
    preview: p.imageUrl,
  })) ?? [];
  
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
        onTogglePublic={handleTogglePublic}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <div className="h-[80px]" />

      {/* 이미지 확대 모달 */}
      <ImagePreviewModal imageUrl={previewImage} onClose={() => setPreviewImage(null)} />
    </div>
  );
}
