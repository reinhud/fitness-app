'use client';

import IconButton from "@/components/general/buttons/iconButton";
import { useRouter } from "next/navigation";
import LegalHeader from "./_components/legalHeader";

export default function LegalAgreements() {
    const router = useRouter();
    return ( 
        <>
            <LegalHeader title="Legal Agreements"/>
            <main className="space-y-2">
                <IconButton
                    iconName="mdi:file-document-outline"
                    title="Terms of Service"
                    onClick={() => {router.push('/account/legal/termsOfService');}}
                />
                <IconButton
                    iconName="mdi:security"
                    title="Privacy Policy"
                    onClick={() => {router.push('/account/legal/privacyPolicy');}}
                />
                <IconButton
                    iconName="carbon:view-filled"
                    title="Cookie Policy"
                    onClick={() => {router.push('/account/legal/cookiePolicy');}}
                />
            </main>  
        </>
        
    );
}
