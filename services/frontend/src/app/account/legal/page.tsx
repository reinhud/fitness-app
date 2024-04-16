'use client';

import LegalHeader from "@/components/account/legal/legalHeader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LegalAgreements() {
    const router = useRouter();
    return ( 
        <div className="min-h-screen bg-gray-100">
            <LegalHeader title="Legal Agreements"/>
            <div className="pl-4 pr-4 space-y-2">
                <Button 
                    onClick={() => {router.push('/account/legal/termsOfService');}} 
                    className="w-full bg-white text-blue-500 p-4 rounded hover:bg-gray-200 justify-start shadow-md">
                        <span className="ml-2">Terms of Service</span>
                </Button>
                <Button 
                    onClick={() => {router.push('/account/legal/privacyPolicy');}} 
                    className="w-full bg-white text-blue-500 p-4 rounded hover:bg-gray-200 justify-start shadow-md">
                        <span className="ml-2">Privacy Policy</span>
                </Button>

                <Button 
                    onClick={() => {router.push('/account/legal/cookiePolicy');}} 
                    className="w-full bg-white text-blue-500 p-4 rounded hover:bg-gray-200 justify-start shadow-md">
                        <span className="ml-2">Cookie Policy</span>
                </Button>
            </div>  
        </div>
        
    );
}
