import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icon } from "@iconify/react";
import { ReactNode } from "react";

interface AlertMessageProps {
    message: ReactNode;
}

export default function AlertMessage({ message }: AlertMessageProps) {
    return (
        <Alert variant="destructive">
            
            <div className="flex flex-row gap-2 mb-1">
                <Icon icon="mingcute:alert-fill"/>
                <AlertTitle>Error</AlertTitle>           
            </div>
            <AlertDescription>
                    {message}
                </AlertDescription>
        </Alert>
    );
}
