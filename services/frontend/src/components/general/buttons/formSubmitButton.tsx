import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton({ title }: { title: string }) {
    const { pending } = useFormStatus()
    return <Button 
            type="submit" 
            aria-disabled={pending} 
            className="font-bold w-full
            bg-accent-200 text-primary py-2 
            px-4 rounded-md 
            hover:bg-accent-300"
            >
                {title}
            </Button>
}