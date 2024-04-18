import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export default function RegisterSuccess() {
    return (
        <Card className="xl:w-1/4 md:w-1/2 w-[80%] shadow-md">
            <CardHeader className="text-3xl font-semibold">
                Registration Successful 🎉
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
                Thank you for registering with us. An email has been sent to your inbox. 
                Please click on the verification link to activate your account.
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
