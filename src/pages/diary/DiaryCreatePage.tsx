import { useState, useEffect } from 'react';

import DiaryHeader from '../../components/common/DiaryHeader';
import DiaryQuestion from '../../components/common/DiaryQuestion';
import EmotionSlider from '../../features/diary/components/EmotionSlider';
import DiaryForm from '../../components/common/DiaryForm';
import DiaryBottomBar from '../../components/common/DiaryBottomBar';
import DiaryConfirmModal from '../../features/diary/components/DiaryConfirmModal';
import { useNavigate, useParams } from 'react-router-dom';
import { EMOTIONS } from '../../features/diary/utils/emotions';
import { formatDateStr } from '../../utils/formatDate';
import ImagePreviewModal from '../../components/common/ImagePreviewModal';
import { useCreateDiary, useGetDiary, useGetQuestion, useUpdateDiary } from '../../features/diary/hooks/useDiary';

export default function DiaryCreatePage() {
  const navigate = useNavigate();
  const { diaryId } = useParams();     
  const isEditMode = Boolean(diaryId);
  const { data: diaryData } = useGetDiary(diaryId);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { data: questionData } = useGetQuestion();
  const question = questionData?.data?.content ?? '';
  const questionId = questionData?.data?.questionId ?? '';
  

  const { mutate: createDiary } = useCreateDiary();
  const { mutate: updateDiary } = useUpdateDiary();

  const emotionsPerview = 5;
  const startIndex = currentSlide;
  const visibleEmotions = EMOTIONS.slice(startIndex, startIndex + emotionsPerview);
  const selectedEmotionData = EMOTIONS.find((e) => e.id === selectedEmotion);

  const dateStr = formatDateStr(new Date());

  useEffect(() => {
    if (!diaryData?.data) return;
    
    const d = diaryData.data as {
      title: string;
      content: string;
      emotion: { type: string; name: string };
    };

    queueMicrotask(() => {
      setTitle(d.title);
      setContent(d.content);
      const matched = EMOTIONS.find((e) => e.emotion === d.emotion.type);
      if (matched) setSelectedEmotion(matched.id);
    });
  }, [diaryData]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, EMOTIONS.length - emotionsPerview));
  };

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newImages = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => {
      const total = [...prev, ...newImages].slice(0, 5);
      return total;
    });

    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const target = prev[index];
      if (target) {
        URL.revokeObjectURL(target.preview);
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      }
      return prev.filter((_, i) => i !== index);
    });
  };


  const handleSave = () => {
    if (!selectedEmotionData) {
      alert('감정을 선택해주세요');
      return;
    }

    if (isEditMode && diaryId) {
      updateDiary({
        diaryId,
        data: {
          title,
          content,
          emotion: selectedEmotionData.emotion,
          photoUrls: [],
        },
      });
    } else {
      createDiary({
        title,
        content,
        emotion: selectedEmotionData.emotion,
        questionId: questionId,
        photoUrls: [],
      });
    }

    setSaveModalOpen(false);
  };

  return (
    <div className="diaryCreateWrap">
      <DiaryHeader onBack={() => setExitModalOpen(true)} />
      <DiaryQuestion question={question} />
      <EmotionSlider
        emotions={EMOTIONS}
        currentSlide={currentSlide}
        selectedEmotion={selectedEmotion}
        setSelectedEmotion={setSelectedEmotion}
        visibleEmotions={visibleEmotions}
        emotionsPerview={emotionsPerview}
        handlePrevSlide={handlePrevSlide}
        handleNextSlide={handleNextSlide}
      />
      <DiaryForm
        selectedEmotionData={selectedEmotionData}
        dateStr={dateStr}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        images={images}
        handleAddImages={handleAddImages}
        handleRemoveImage={handleRemoveImage}
        setPreviewModal={setPreviewImage}
      />
      <DiaryBottomBar
        isPublic={isPublic}
        onTogglePublic={() => setIsPublic(!isPublic)}
        onSave={() => setSaveModalOpen(true)}
      />
      <div className="h-[80px]" />
      <DiaryConfirmModal
        isOpen={exitModalOpen}
        title="저장하지 않고 나가시겠어요?"
        description="작성한 내용이 저장되지 않습니다."
        confirmLabel="나가기"
        onConfirm={() => navigate('/')}
        onCancel={() => setExitModalOpen(false)}
      />

      {/* 저장 모달 */}
      <DiaryConfirmModal
        isOpen={saveModalOpen}
        title="일기를 저장하시겠어요?"
        description="작성한 내용이 저장됩니다."
        confirmLabel="저장"
        onConfirm={handleSave}
        onCancel={() => setSaveModalOpen(false)}
      />

      {/* 이미지 확대 모달 */}
      <ImagePreviewModal
        imageUrl={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </div>
  );
}
