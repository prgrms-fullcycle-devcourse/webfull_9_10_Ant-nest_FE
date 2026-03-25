
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

export default function DiaryCreatePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<{file: File; preview: string}[]>([]);

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
    if (!e.target.files) return;
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file)
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = ''; // 파일 선택 초기화 
  }

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
    });
  }
  return (
    <div className="diaryCreateWrap">
      <DiaryHeader />
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
        handleAddImages={handleAddImages}
        handleRemoveImage={handleRemoveImage}
      /> 
    </div>
  );
}