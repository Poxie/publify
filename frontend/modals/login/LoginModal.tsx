import { useTranslation } from "next-i18next"
import { ModalFooter } from "../ModalFooter"
import { ModalHeader } from "../ModalHeader"
import { LoginModalContent } from "./LoginModalContent"
import { LoginModalFooter } from "./LoginModalFooter"

export const LoginModal = () => {
    const { t } = useTranslation();

    return(
        <div>
            <ModalHeader>
                {t('loginHeader')}
            </ModalHeader>
            <LoginModalContent />
            <LoginModalFooter />
        </div>
    )
}