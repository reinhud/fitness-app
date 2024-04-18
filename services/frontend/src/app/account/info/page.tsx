'use client';

import AccountHeader from '../_components/accountHeader';
import AccountInfoAvatar from './_components/accountInfoAvatar';
import AccountInfoEmailForm from './_components/accountInfoEmailForm';
import AccountInfoUsernameForm from './_components/accountInfoUsernameForm';

export default function AccountInfo() {

    return (
        <div>
            <AccountHeader title={"Account Info"} />
            <main>
                {/* Avatar */}
                <AccountInfoAvatar/>
                {/* User Info */}
                <div className="rounded-lg shadow-md p-6 mt-4">
                    {/* Username */}
                    <div className="flex justify-between items-center">
                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Username
                            </label>
                            <p className="text-muted-foreground">JohnDoe</p>
                        </div>
                        <AccountInfoUsernameForm />
                    </div>

                    {/* Separator */}
                    <div className="border-b border mb-4 mt-4"></div>

                    {/* Email */}
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <label className="block text-sm font-bold mb-2">
                                Email
                            </label>
                            <p className="text-muted-foreground">jondoe@example.com</p>
                        </div>
                        <AccountInfoEmailForm />
                    </div>

                </div>
            </main>
        </div>
    );
}
