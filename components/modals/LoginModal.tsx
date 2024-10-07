"use client"
import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react";
import Input from "../inputs/Input";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";


const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onToggle = useCallback(() => {
    if(loading) {
      return
    }

    registerModal.onOpen()
    loginModal.onClose()
  }, [loading, registerModal, loginModal])

  const onSubmit = useCallback(async() => {
    try {
      setLoading(true)
      
      await signIn("credentials", {
        email,
        password
      })

      loginModal.onClose()
    } catch (error) {
      console.log
    } finally {
      setLoading(false)
    }
  }, [loginModal, email, password])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      disabled={loading}
      />
      <Input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      disabled={loading}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-100 text-center mt-4">
      <p>
        First time using Twitter? &nbsp;
        <span 
        onClick={onToggle}
        className="text-white cursor-pointer hover:underline">
          Create an account
        </span>
      </p>
    </div>
  )

  return (
    <Modal
    disabled={loading}
    isOpen={loginModal.isOpen}
    onClose={loginModal.onClose}
    actionLabel="Sign In"
    onSubmit={onSubmit}
    body={bodyContent}
    title="Login"
    footer={footerContent}
    />
  )
}

export default LoginModal