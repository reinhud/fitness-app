import AccountHeader from '@/components/account/accountHeader';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-100">
            <AccountHeader title="About" />
            <div className='pl-4 pr-4'>
                <section className="mt-8">
                    <h1 className="text-2xl font-semibold mb-4">Welcome!</h1>
                    <p className="text-gray-600">
                        Elevate your fitness journey with our comprehensive fitness app designed to help you achieve your health goals. Whether you&apos;re looking to track your food intake, monitor your exercise routines, or maintain a balanced lifestyle, we&apos;ve got you covered.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>Effortlessly track your daily meals with our intuitive food diary.</li>
                        <li>Personalize your workout plans with customizable exercise tracking.</li>
                        <li>Stay motivated and informed with insightful analytics and progress reports.</li>
                        <li>Connect with a community of fitness enthusiasts to share tips and experiences.</li>
                    </ul>
                </section>

                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Why Choose Our Fitness App?</h2>
                    <p className="text-gray-600">
                        Our app is designed with user-centric features to make your fitness journey enjoyable and sustainable. With our easy-to-use interface, personalized recommendations, and supportive community, achieving your health goals has never been easier.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Get Started Today!</h2>
                    <p className="text-gray-600">
                        Ready to embark on a healthier lifestyle? Let us help with your journey towards a fitter, happier you!
                    </p>
                </section>
            </div>
        </div>
    );
}
