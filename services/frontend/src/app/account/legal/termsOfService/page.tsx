import LegalHeader from "@/components/account/legal/legalHeader";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-100">
            <LegalHeader title="Terms of Service" />
            <div className="pl-4 pr-4">
                <p className="mb-4">
                    Welcome to [Your App Name]! These terms and conditions
                    outline the rules and regulations for the use of [Your
                    Company Name]&apos;s Website, located at [Website URL].
                </p>
                <h3 className="text-xl mb-2">Interpretation and Definitions</h3>
                <p className="mb-4">
                    The words of which the initial letter is capitalized have
                    meanings defined under the following conditions. The
                    following definitions shall have the same meaning
                    regardless of whether they appear in singular or in plural.
                </p>
                <h3 className="text-xl mb-2">Cookies</h3>
                <p className="mb-4">
                    We employ the use of cookies. By accessing [Your App Name],
                    you agree to use cookies in agreement with the [Your
                    Company Name]&apos;s Privacy Policy.
                </p>
                <h3 className="text-xl mb-2">License</h3>
                <p className="mb-4">
                    Unless otherwise stated, [Your Company Name] and/or its
                    licensors own the intellectual property rights for all
                    material on [Your App Name]. All intellectual property
                    rights are reserved.
                </p>
                <h3 className="text-xl mb-2">Restrictions</h3>
                <ul className="list-disc pl-6 mb-4">
                    <li>Publishing any Website material in any other media</li>
                    <li>
                        Selling, sublicensing, and/or otherwise
                        commercializing any Website material
                    </li>
                    <li>
                        Publicly performing and/or showing any Website
                        material
                    </li>
                    <li>
                        Using this Website in any way that is or may be
                        damaging to this Website
                    </li>
                </ul>
                <h3 className="text-xl mb-2">Disclaimer</h3>
                <p className="mb-4">
                    To the maximum extent permitted by applicable law, we
                    exclude all representations, warranties, and conditions
                    relating to our website and the use of this website.
                </p>
                <h3 className="text-xl mb-2">Changes to These Terms</h3>
                <p className="pb-4">
                    We reserve the right, at our sole discretion, to modify or
                    replace these Terms at any time. Please review these Terms
                    periodically for updates.
                </p>
            </div>
        </div>
    );
}
