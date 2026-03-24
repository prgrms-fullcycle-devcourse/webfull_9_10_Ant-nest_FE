import {Button} from "@radix-ui/themes";
import {ChevronLeftIcon} from "@radix-ui/react-icons";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    text?: string;
    onBack?: () => void;
}

export default function Header({text, onBack}: HeaderProps) {
    const navigation = useNavigate()

    const handleBack = () => {
        if (onBack) {
            onBack()
            return
        }

        navigation(-1)
    }

    return (
        <div className="fixed flex items-center justify-start top-0 z-10 w-full max-w-200 h-[4.7rem] pl-[2rem] pr-[2rem] bg-white shadow-bottom
        max-sm2:h-[4rem] max-sm2:pl-[1rem] max-sm2:pr-[1rem]
        ">
            <Button variant="outline"
                    className="icon-btn"
                onClick={handleBack}
            ><ChevronLeftIcon className="text-black"/></Button>
            { text && <b className="pl-[1rem] text-[var(--color-text-default)]
            max-sm2:pl-[0.6rem]
            ">{text}</b>}
        </div>
    )
}