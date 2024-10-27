import {
  FEEDBACK_GOOGLE_FORM_URL,
  GITHUB_ORGANIZATION_URL,
  TEAM_EMAIL,
} from "@/_constants/externalUrl";
import { container, innerWrapper, contactText, side } from "./footer.css";

export default function Footer() {
  return (
    <footer className={container}>
      <div className={innerWrapper}>
        <section className={side}>
          <p>
            Copyright © 2024 매일메일
            <br />
            All rights reserved.
          </p>
        </section>
        <section className={side}>
          <div className={contactText}>
            <a href={`mailto:${TEAM_EMAIL}`}>이메일 {TEAM_EMAIL}</a>
          </div>
          <a href={FEEDBACK_GOOGLE_FORM_URL} target="_blank">
            서비스 피드백하기
          </a>
          <a href={GITHUB_ORGANIZATION_URL} target="_blank">
            Github 스타는 서비스 운영에 큰 도움이 됩니다 ⭐️
          </a>
        </section>
      </div>
    </footer>
  );
}
