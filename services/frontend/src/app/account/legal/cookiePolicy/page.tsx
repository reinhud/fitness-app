import LegalHeader from "../_components/legalHeader";

export default function CookiePolicy() {
    return (
        <>
            <LegalHeader title="Cookie Policy" />
            <main>
                <p>
                    This policy explains how we use cookies and similar technologies to recognize you when you visit our websites.
                </p>

                <section className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">What Are Cookies?</h3>
                    <p className="text-muted-foreground mb-4">
                        Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to remember your actions and preferences (such as login, language, font size, and other display preferences) over a period of time.
                    </p>
                </section>

                <section className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">How We Use Cookies</h3>
                    <p className="text-muted-foreground mb-4">
                        We use cookies to enhance your user experience, analyze website usage, and deliver targeted advertisements.
                    </p>
                </section>

                <section className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">Types of Cookies We Use</h3>
                    <ul className="list-disc list-inside text-muted-foreground">
                        <li>Essential Cookies: Necessary for website functionality.</li>
                        <li>Analytics Cookies: Used to analyze website usage and performance.</li>
                        <li>Advertising Cookies: Used to deliver targeted advertisements.</li>
                    </ul>
                </section>

                <section className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">Managing Cookies</h3>
                    <p className="text-muted-foreground mb-4">
                        You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect your user experience on our website.
                    </p>
                </section>

                <section className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">Changes to Our Cookie Policy</h3>
                    <p className="text-muted-foreground pb-4">
                        We may update our Cookie Policy from time to time to reflect changes in technology or applicable laws. Any updates will be posted on this page.
                    </p>
                </section>
            </main>
        </>
    );
}
