
import { useState } from 'react';
import peacefulImg from '../../assets/images/emotions/illu-default.png';
import happyImg from '../../assets/images/emotions/illu-happy.png';
import excitedImg from '../../assets/images/emotions/emotion-excited.png';
import absurdImg from '../../assets/images/emotions/emotion-absurd.png';
import depressedImg from '../../assets/images/emotions/emotion-depressed.png';
import angryImg from '../../assets/images/emotions/emotion-angry.png';
import tiredImg from '../../assets/images/emotions/emotion-tired.png';
import disgustedImg from '../../assets/images/emotions/emotion-disgusted.png';

import DiaryHeader from '../../components/diary/DiaryHeader';
import DiaryQuestion from '../../components/diary/DiaryQuestion';
import EmotionSlider from '../../components/diary/EmotionSlider';
import DiaryForm from '../../components/diary/DiaryForm';
import DiaryBottomBar from '../../components/diary/DiaryBottomBar';
import DiaryConfirmModal from '../../components/diary/DiaryConfirmModal';
import { useNavigate } from 'react-router-dom';

export default function DiaryCreatePage() {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images , setImages] = useState<{file: File; preview: string}[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const emotions = [
    {id: 'peaceful', label: '평온', img: peacefulImg},
    {id: 'happy', label: '행복', img: happyImg},
    {id: 'excited', label: '설렘', img: excitedImg},
    {id: 'absurd', label: '황당', img: absurdImg},
    {id: 'depressed', label: '우울', img: depressedImg},
    {id: 'angry', label: '화남', img: angryImg},
    {id: 'tired', label: '피곤', img: tiredImg},
    {id: 'disgusted', label: '역겨움', img: disgustedImg}
  ]

  const emotionsPerview = 5;
  const startIndex = currentSlide;
  const visibleEmotions = emotions.slice(startIndex, startIndex + emotionsPerview);
  const selectedEmotionData = emotions.find((e) => e.id === selectedEmotion);

  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;


  const handlePrevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, emotions.length - emotionsPerview));
  };
  
  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    if (images.length > 0) {
      URL.revokeObjectURL(images[0].preview);
    }

    const file = e.target.files[0];
    setImages([{ file, preview: URL.createObjectURL(file) }]);
    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const target = prev[index];
      if(target) {
        URL.revokeObjectURL(target.preview);
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      }
      return prev.filter((_, i) => i !== index);
    })
  };
  
  const handleSave = () => {
    // TODO: API 연동
    console.log({ title, content, selectedEmotion, isPublic, images });
    setSaveModalOpen(false);
    navigate('/');
  };

  
  return (
    <div className="diaryCreateWrap">
      <DiaryHeader onBack={() => setExitModalOpen(true)} />
      <DiaryQuestion />
      <EmotionSlider
        emotions={emotions}
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
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <img 
            src={previewImage} 
            alt="미리보기 확대" 
            className="max-h-full max-w-full object-contain cursor-zoom-out" 
          />
        </div>
      )}
    </div>
  );
}