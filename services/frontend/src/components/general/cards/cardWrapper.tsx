import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";
import AuthHeader from "./cardHeader";

interface CardWrapperProps {
    label: string;
    title: string;
    footerText?: string;
    backButtonHref?: string;
    backButtonLabel?: string;
    children: React.ReactNode;
}

export default function CardWrapper({
    label,
    title,
    footerText,
    backButtonHref,
    backButtonLabel,
    children,
}: CardWrapperProps) {
    return (
        <Card className="xl:w-1/4 md:w-1/2 shadow-md">
            <CardHeader>
                <AuthHeader label={label} title={title} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="justify-center">
                {footerText && <p className="text-muted-foreground text-sm ">{footerText}</p>}
                {backButtonHref && backButtonLabel && (
                    <Button variant="link" className="text-sm p-2" asChild>
                        <Link href={backButtonHref}>
                            {backButtonLabel}
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
