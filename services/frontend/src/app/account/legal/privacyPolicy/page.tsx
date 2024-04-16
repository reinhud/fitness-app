import LegalHeader from "@/components/account/legal/legalHeader";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-100">
            <LegalHeader title="Privacy Policy" />
            <div className="pl-4 pr-4">
                <p className="mb-4">
                    Welcome to [Your App Name]&apos;s Privacy Policy. Your privacy
                    is critically important to us.
                </p>
                <h3 className="text-xl mb-2">Information We Collect</h3>
                <p className="mb-4">
                    We collect information from you when you register on our
                    site or fill out a form.
                </p>
                <h3 className="text-xl mb-2">How We Use Your Information</h3>
                <p className="mb-4">
                    We may use the information we collect from you when you
                    register, make a purchase, sign up for our newsletter,
                    respond to a survey or marketing communication, surf the
                    website, or use certain other site features.
                </p>
                <h3 className="text-xl mb-2">Cookies</h3>
                <p className="mb-4">
                    Cookies are small files that a site or its service
                    provider transfers to your computer&apos;s hard drive through
                    your web browser (if you allow) that enables the site&apos;s or
                    service provider&apos;s systems to recognize your browser and
                    capture and remember certain information.
                </p>
                <h3 className="text-xl mb-2">Third-party Disclosure</h3>
                <p className="mb-4">
                    We do not sell, trade, or otherwise transfer your
                    personally identifiable information to outside parties
                    unless we provide users with advance notice.
                </p>
                <h3 className="text-xl mb-2">Changes to Our Privacy Policy</h3>
                <p className="mb-4">
                    If we decide to change our privacy policy, we will post
                    those changes on this page.
                </p>
            </div>
        </div>
    );
}
