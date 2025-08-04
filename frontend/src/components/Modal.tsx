import type { ReactNode } from "react"

type ModalProps = {
    children: ReactNode
}

export default function Modal({ children }: ModalProps) {
  return (
<div className="fixed top-20 left-[50%] translate-x-[-50%] z-5 p-4 w-[95%] md:max-w-[60rem] bg-white">
   {children}
</div>
  )
}
