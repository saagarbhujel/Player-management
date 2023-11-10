

const SignInForm = () => {
    return (
        <section className={"flex flex-col justify-center items-center h-screen w-screen"}>
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                Login to your account.
            </h2>
            <p className="text-light-3 small-medium md:base-regular">
                Welcome back! Please login to your account.
            </p>
            <form>
                <div >
                    <label htmlFor="email">Email</label>
                    <input type="email" id={'email'} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" id={'password'} />
                </div>
                <button type={'submit'}>
                    Login
                </button>

                <p>
                    Don&apos;t have an account? SignUp
                </p>
            </form>
        </section>
    );
};

export default SignInForm;