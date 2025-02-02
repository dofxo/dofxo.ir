import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Slide } from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";

const token = import.meta.env.VITE_GITHUB_TOKEN;

const HeroSection = () => {
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.github.com/users/dofxo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { avatar_url } = await response.json();
      setAvatarUrl(avatar_url);
    })();
  }, []);
  return (
    <section className="mt-[50px]">
      <div className="container flex flex-col-reverse gap-10 items-center md:flex-row justify-between">
        <div className="about-me text-center md:text-start">
          <Slide duration={500} triggerOnce>
            <h1 className="text-[var(--text-color)] font-bold text-[30px] md:text-[45px]">
              محمد کارگر
            </h1>
          </Slide>
          <Slide duration={500} delay={50} triggerOnce>
            <h1 className="text-[var(--text-color)]  text-[18px] font-[500]">
              برنامه نویس و توسعه دهنده فرانت اند
            </h1>
          </Slide>
          <Slide duration={500} delay={100} triggerOnce>
            <p className="text-[var(--text-secondary-color)]  text-[12px] md:text-[14px] leading-[30px] max-w-[500px] mt-5">
              من محمد کارگر هستم، توسعه‌دهنده فرانت‌اند و علاقه‌مند به طراحی و
              توسعه رابط‌های کاربری تعاملی و کاربرپسند. هدف من ایجاد تجربه‌هایی
              است که کاربران از کار با آن‌ها لذت ببرند و نیازهای آن‌ها را به
              بهترین شکل ممکن برآورده کنند.
            </p>
          </Slide>
          <Slide duration={500} delay={150} triggerOnce>
            <Button
              asChild
              className="text-[var(--button-text-color)]  bg-[var(--primary)] mt-[15px] rounded-[20px]"
            >
              <a
                href="https://cvresume.ir/r/Aqul4IS93UaK73uEh0AusQ"
                target="_blank"
              >
                لینک رزومه
              </a>
            </Button>
          </Slide>
        </div>

        <div className="w-[200px] md:w-[300px]">
          <LazyLoadImage
            src={avatarUrl ?? ""}
            alt="dofxoImage"
            className="rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
