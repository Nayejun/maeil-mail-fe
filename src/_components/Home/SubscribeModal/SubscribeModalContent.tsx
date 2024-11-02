import { myStyle } from "@/_styles/vars.css";
import {
  container,
  title,
  successLayout,
  categoryText,
  radioWrapper,
  buttonWrapper,
  emailWrapper,
  inputSection,
  categoryWrapper,
  verificationNoti,
  verificationSection,
  categorySubtext,
  underline,
} from "./subscribeModalContent.css";
import Button from "../../common/Button/Button";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import VerifyEmailInput from "./VerifyEmailInput";
import CheckboxInput from "../../common/CheckboxInput/CheckboxInput";
import Input from "../../common/Input/Input";
import useSubscribe from "@/_hooks/useSubscribe";
import SuccessContent from "./SuccessContent";
import FRONTEND_BASE_URL from "@/_constants/frontendBaseUrl";

interface SubscribeModalContentProps {
  closeModal: () => void;
}

export default function SubscribeModalContent({ closeModal }: SubscribeModalContentProps) {
  const {
    isSubscriptionSuccess,
    isSubscriptionPending,
    isSubscriptionError,
    handleCategories,
    handleVerificationNumber,
    verificationNumber,
    handleConsent,
    handleEmail,
    handleVerifyEmail,
    isSentEmail,
    isAllValid,
    handleSubmitSubscription,
    email,
    isValidEmail,
    isValidCategories,
    isAgreed,
    isVerifyingPending,
    categories,
    handleFocus,
    isTouched,
  } = useSubscribe();

  return (
    <div className={`${container} ${myStyle} ${isSubscriptionSuccess && successLayout}`}>
      {isSubscriptionSuccess ? (
        <SuccessContent closeModal={closeModal} />
      ) : (
        <>
          <h2 className={title}>매일메일 구독</h2>
          <section className={inputSection}>
            <div className={categoryWrapper}>
              <p className={categoryText}>
                분야 <span className={categorySubtext}>*중복 선택 가능</span>
              </p>

              <div className={radioWrapper}>
                <CheckboxInput
                  text="프론트엔드"
                  value="frontend"
                  isSelected={categories.includes("frontend")}
                  onChange={handleCategories}
                />
                <CheckboxInput
                  text="백엔드"
                  value="backend"
                  isSelected={categories.includes("backend")}
                  onChange={handleCategories}
                />
              </div>
            </div>

            {!isSentEmail ? (
              <div className={emailWrapper}>
                <VerifyEmailInput
                  email={email}
                  isVerifyingPending={isVerifyingPending}
                  isValidEmail={isValidEmail && isTouched}
                  handleEmail={handleEmail}
                  handleVerifyEmail={handleVerifyEmail}
                  onFocus={handleFocus}
                  isValidCategories={isValidCategories}
                />
              </div>
            ) : (
              <>
                <section className={verificationSection}>
                  <h3 className={verificationNoti}>인증번호가 발송됐습니다.</h3>
                  <Input
                    onChange={handleVerificationNumber}
                    value={verificationNumber}
                    variant="primary"
                    placeholder="인증번호를 입력해 주세요."
                    errorMessage="올바르지 않은 인증번호입니다."
                    isError={isSubscriptionError}
                    maxLength={4}
                    type="text"
                  />

                  <CheckboxInput
                    text={
                      <>
                        <a
                          href={`${FRONTEND_BASE_URL}/policy`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className={underline}>개인정보취급방침</span>
                        </a>
                        에 동의합니다.
                      </>
                    }
                    isSelected={isAgreed}
                    onChange={handleConsent}
                  />
                </section>
                <div className={buttonWrapper}>
                  {isSubscriptionPending && <LoadingSpinner />}
                  <Button
                    variant="primary"
                    disabled={!isAllValid}
                    type="submit"
                    onClick={handleSubmitSubscription}
                  >
                    구독하기
                  </Button>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}
