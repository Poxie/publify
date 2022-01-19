import { ModalFooter } from "../ModalFooter"
import { ModalHeader } from "../ModalHeader"
import { LoginModalContent } from "./LoginModalContent"
import { LoginModalFooter } from "./LoginModalFooter"

export const LoginModal = () => {
    return(
        <div>
            <ModalHeader>
                Login to use these features!
            </ModalHeader>
            <LoginModalContent />
            <LoginModalFooter />
        </div>
    )
}