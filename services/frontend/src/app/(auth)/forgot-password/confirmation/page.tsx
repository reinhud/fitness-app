import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export default function ForgotPasswordSuccess() {
    return (
        <Card className="xl:w-1/4 md:w-1/2 w-[80%] shadow-md">
            <CardHeader className="text-3xl font-semibold">
                Password reset needed
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
                We send you an email with a link to reset your password.
            </CardContent>
            <CardFooter className="">
                <p className="text-muted-foreground text-sm">Already verified?</p>
                <Button variant="link" className="text-sm p-2" asChild>
                    <Link href="/login">
                        Login here.
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
