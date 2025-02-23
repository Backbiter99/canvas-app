"use client";

interface IAuthPage {
    isSignin: boolean;
}

export function AuthPage({ isSignin }: IAuthPage) {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-2 m-2 bg-white rounded">
                <div className="p-2">
                    <input type="text" placeholder="Email" />
                </div>
                <div className="p-2">
                    <input type="password" placeholder="Password" />
                </div>
                <div className="pt-2">
                    <button onClick={() => {}}>
                        {isSignin ? "Sign in" : "Sign up"}
                    </button>
                </div>
            </div>
        </div>
    );
}
