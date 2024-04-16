import LegalHeader from "@/components/account/legal/legalHeader";

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-gray-100">
            <LegalHeader title="Cookie Policy" />
            <div className="pl-4 pr-4">
                <h2 className="text-2xl mb-4">Cookie Policy</h2>
                <p className="mb-4">
                    Welcome to [Your App Name]&apos;s Cookie Policy. This policy
                    explains how we use cookies and similar technologies to
                    recognize you when you visit our websites.
                </p>
                <h3 className="text-xl mb-2">What Are Cookies?</h3>
                <p className="mb-4">
                    Cookies are small text files that are stored on your
                    computer or mobile device when you visit a website. They
                    allow the website to remember your actions and preferences
                    (such as login, language, font size, and other display
                    preferences) over a period of time.
                </p>
                <h3 className="text-xl mb-2">How We Use Cookies</h3>
                <p className="mb-4">
                    We use cookies to enhance your user experience, analyze
                    website usage, and deliver targeted advertisements.
                </p>
                <h3 className="text-xl mb-2">Types of Cookies We Use</h3>
                <ul className="list-disc pl-8 mb-4">
                    <li>Essential Cookies: Necessary for website functionality.</li>
                    <li>Analytics Cookies: Used to analyze website usage and performance.</li>
                    <li>Advertising Cookies: Used to deliver targeted advertisements.</li>
                </ul>
                <h3 className="text-xl mb-2">Managing Cookies</h3>
                <p className="mb-4">
                    You can manage your cookie preferences through your
                    browser settings. Please note that disabling cookies may
                    affect your user experience on our website.
                </p>
                <h3 className="text-xl mb-2">Changes to Our Cookie Policy</h3>
                <p className="pb-4">
                    We may update our Cookie Policy from time to time to
                    reflect changes in technology or applicable laws. Any
                    updates will be posted on this page.
                </p>
            </div>
        </div>
    );
}
