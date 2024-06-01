import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "./Authinput.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation.js";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { loginUser } from "../../features/userSlice.js";
export default function Registerform() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const onSubmit = async (values) => {
    let res = await dispatch(loginUser({ ...values }));
    if (res?.payload?.user) {
      navigate("/");
    }
  };
  return (
    <div>
      {" "}
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        {/* container */}
        <div className="mx-auto max-w-lg">
          {/* Heading */}
          <h1 className="text-center text-2xl font-bold text-slate-950 sm:text-3xl">
            Welcome, Back
          </h1>
          {/* SubHeading */}
          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            We're thrilled to have you back. Sign in to your account to access
            exclusive services.
          </p>
          {/* FORM */}
          <form
            action="#"
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-center text-lg font-medium">
              Sign In to your account
            </p>

            <AuthInput
              name="email"
              type="text"
              placeholder="Email Address"
              register={register}
              error={errors?.email?.message}
            />
            <AuthInput
              name="password"
              type="password"
              placeholder="Password"
              register={register}
              error={errors?.password?.message}
            />
            {/**If Error Exists */}
            {error ? (
              <div>
                <p className="text-red-400">{error}</p>
              </div>
            ) : null}

            {/**Submi Button */}
            <button
              type="submit"
              className="block w-full rounded-lg bg-violet-600 focus:outline-none 
              hover:bg-violet-400 transition-all px-5 py-3 text-sm font-medium text-white"
            >
              {status === "loading" ? (
                <BeatLoader color="#fff" size={16} />
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't Have an Account?{" "}
              <Link className="underline" to="/register">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
