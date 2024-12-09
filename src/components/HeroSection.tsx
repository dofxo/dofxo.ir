import { Button } from "./ui/button";

const dofxoImg = "src/assets/images/dofxo.jpg";

const HeroSection = () => {
  return (
    <section className="mt-[60px]">
      <div className="container flex justify-between">
        <div className="about-me">
          <h1 className="text-[var(--text-color)] font-bold text-[45px]">
            محمد کارگر
          </h1>
          <h1 className="text-[var(--text-color)]  text-[18px] font-[500]">
            برنامه نویس و توسعه دهنده فرانت اند
          </h1>
          <p className="text-[var(--text-secondary-color)]  text-[14px] leading-[30px] max-w-[500px] mt-5">
            من محمد کارگر هستم، توسعه‌دهنده فرانت‌اند و علاقه‌مند به طراحی و
            توسعه رابط‌های کاربری تعاملی و کاربرپسند. هدف من ایجاد تجربه‌هایی
            است که کاربران از کار با آن‌ها لذت ببرند و نیازهای آن‌ها را به
            بهترین شکل ممکن برآورده کنند.
          </p>
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
        </div>
        <div className="w-[300px]">
          <img src={dofxoImg} alt="dofxoImage" className="rounded-full " />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
