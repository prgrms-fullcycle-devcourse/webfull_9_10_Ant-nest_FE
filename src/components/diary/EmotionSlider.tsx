interface Emotion {
  id: string;
  label: string;
  img: string;
}


interface EmotionSliderProps {
  emotions: Emotion[];
  currentSlide: number;
  selectedEmotion: string;
  setSelectedEmotion: React.Dispatch<React.SetStateAction<string>>;
  visibleEmotions: Emotion[];
  emotionsPerview: number;
  handlePrevSlide: () => void;
  handleNextSlide: () => void;
}

export default function EmotionSlider({
  emotions,
  currentSlide,
  selectedEmotion,
  setSelectedEmotion,
  visibleEmotions,
  emotionsPerview,
  handlePrevSlide,
  handleNextSlide,
}: EmotionSliderProps) {
  return (
      <div className="emotionWrap mb-8">
        <div className="text-[#8d8d8d] flex items-center justify-between">
          <button className={`bg-transparent border-none text-[24px] shrink-0 transition-all
            ${currentSlide === 0 ? 'cursor-default invisible' : 'cursor-pointer visible'}`}
            onClick = {handlePrevSlide}
            disabled = {currentSlide === 0}
          >
            {'<'}
          </button>
          <div className="flex flex-1 justify-center min-w-0 py-[2px] overflow-visible">
            {visibleEmotions.map((emotion) => (
              <button key={emotion.id}
                className= {`flex items-center cursor-pointer justify-center rounded-[14px] p-[clamp(0px,0.8vw,4px)] shrink-0 box-border transition-all min-w-[clamp(48px,15vw,62px)] border-[3px]
                  ${selectedEmotion === emotion.id ? 'border-[#66BB6A] bg-[#f0f8f5]' : 'border-transparent bg-white'}`}
                onClick={() => 
                  setSelectedEmotion((prev) => (prev === emotion.id ? '' : emotion.id))
                }>
                <img src={emotion.img}
                  alt={emotion.label}
                  className="h-[clamp(52px,15vw,64px)] w-[clamp(52px,15vw,64px)] object-contain"/>
              </button>
            ))}
          </div>
          <button className={`bg-transparent border-none text-[24px] shrink-0 transition-all
            ${currentSlide >= emotions.length - emotionsPerview ? 'cursor-default invisible' : 'cursor-pointer visible'}`}
            onClick={handleNextSlide}
            disabled={currentSlide === emotions.length - emotionsPerview}
          >
            {'>'}
          </button>
        </div>
      </div>

    );
}
