import {Button} from "@radix-ui/themes";
import {ChevronLeftIcon} from "@radix-ui/react-icons";

interface HeaderProps {
    text?: string;
    onChange: (value: string) => void;
}

export default function Header({text, onChange}: HeaderProps) {
    return (
        <div className="fixed flex items-center justify-start top-0 w-full max-w-200 h-[4.7rem] pl-[2rem] pr-[2rem] bg-white shadow-bottom">
            <Button variant="outline"
                    className=""
                onChange={(e) => onChange(e.target.value)}
            ><ChevronLeftIcon/></Button>
            { text && <span>{text}</span>}
        </div>
    )
}