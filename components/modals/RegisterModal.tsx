"use client"
import { useCallback, useState } from "react";
import Input from "../inputs/Input";
import Modal from "./Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";


const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const onToggle = useCallback(() => {
    if(loading) {
      return
    }

    registerModal.onClose()
    loginModal.onOpen()
  }, [loading, registerModal, loginModal])

  const onSubmit = useCallback(async() => {
    try {
      setLoading(true)

      const data = await axios.post("/api/register", {
        email,
        password,
        username,
        name
      })

      toast.success("Account Created")
      
      signIn("credentials", {
        email,
        password
      })

      registerModal.onClose()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [registerModal, email, password, username, name])

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
      type="text"
      placeholder="Name"
      onChange={(e) => setName(e.target.value)}
      value={name}
      disabled={loading}
      />
      <Input
      type="text"
      placeholder="Username"
      onChange={(e) => setUsername(e.target.value)}
      value={username}
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
        Already have an account? &nbsp;
        <span 
        onClick={onToggle}
        className="text-white cursor-pointer hover:underline">
          Sign in
        </span>
      </p>
    </div>
  )

  return (
    <Modal
    disabled={loading}
    isOpen={registerModal.isOpen}
    onClose={registerModal.onClose}
    title="Create an Account"
    actionLabel="Create"
    onSubmit={onSubmit}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default RegisterModal