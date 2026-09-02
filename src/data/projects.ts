import { projectsType } from "@/types";

export const projects: projectsType = [
	{
		title: {
			fa: "منوساز",
			en: "menusaz",
		},
		websiteLink: "https://menu-saz.ir/",
		description: {
			fa: `
			مشارکت در توسعه یک پلتفرم SaaS برای ساخت و مدیریت منوی دیجیتال رستوران‌ها و کافه‌ها در قالب  یک تیم دو نفره. مسئول طراحی و توسعه رابط کاربری، اتصال فرانت‌اند به API و پایگاه داده، پیاده‌سازی امکانات مدیریت منو و شخصی‌سازی تنظیمات. همچنین در استقرار پروژه روی سرور، پیکربندی محیط Production و بهینه‌سازی عملکرد و تجربه کاربری همکاری داشتم.
			`,
			en: `
			Contributed to the development of a SaaS platform for creating and managing digital menus for restaurants and cafés as part of a two-developer team. Responsible for designing and developing the user interface, integrating the frontend with APIs and the database, and implementing menu management and customization features. Also collaborated on server deployment, production environment configuration, and performance and user experience optimization.
			`,
		},
		role: "Developer",
		skills: ["Nextjs", "Tailwind", "Shadcn", "MongoDB", "Typescript", "Github Action"],
	},

	{
		title: {
			fa: "ترکر فیلم",
			en: "Movie Tracker",
		},
		websiteLink: "https://fulcain-movie-tracker.vercel.app/",
		description: {
			fa: `یک اپلیکیشن فول‌استک برای تماشای گروهی و خصوصی فیلم و سریال. کاربران حساب می‌سازند، از طریق کد اتاق به گروه‌های خصوصی دعوت می‌شوند و پیشرفت هر عضو را روی هر عنوان دنبال می‌کنند. احراز هویت با ایمیل/رمز (scrypt) و گوگل (OAuth)، دیتابیس MongoDB، به‌روزرسانی زنده، داشبورد مدیریت و پشتیبانی از چند پلتفرم شامل وب، اندروید (Capacitor) و دسکتاپ ویندوز (Electron) با CI/CD گیت‌هاب.`,
			en: `A full-stack app for private watch parties: users create accounts, join invite-only parties via room codes and track every member's progress on movies and series. Features email/password (scrypt) and Google OAuth authentication, MongoDB persistence, live updates, an admin dashboard and multi-platform support: web, Android (Capacitor) and Windows desktop (Electron) with CI/CD via GitHub Actions.`,
		},
		role: "Developer",
		sourceCode: "https://github.com/fulcain/movie-tracker-releases/",
		skills: [
			"Next.js",
			"Typescript",
			"Tailwind",
			"MongoDB",
			"Node.js",
			"Capacitor",
			"Electron",
			"Google Oauth",
			"Shadcn",
			"Lucide",
			"Github Action",
		],
	},

	{
		title: {
			fa: "فرانت چپتر (1403)",
			en: "Front Chapter (2024)",
		},
		websiteLink: "https://frontchapter.ir/",
		description: {
			fa: `لندینگ سایت فرانت چپتر برای همایش سال 1403 در شیراز طراحی و توسعه داده شد. به‌عنوان فرانت‌اند دولوپر افتخار داشتم در کنار تیم فنی فرانت چپتر در این پروژه حضور داشته باشم.`,
			en: `Front Chapter’s landing page for the 2024 conference in Shiraz was designed and developed. I had the honor of contributing as a front-end developer alongside the Front Chapter technical team.`,
		},
		role: "FrontEnd Developer",
		sourceCode: "https://github.com/frontChapter/nextjs",
		skills: ["Next.js", "TailwindCSS", "Launch UI"],
	},
	{
		title: {
			fa: "SilverBox",
			en: "SilverBox",
		},
		websiteLink: "https://silverboxjs.ir/",
		description: {
			fa: `کتابخانه جاوااسکریپت سبک و چندمنظوره برای ایجاد مدال‌ها و اعلان‌های سفارشی برای برنامه‌های وب. ساخته شده با جاوااسکریپت خالص و بدون وابستگی.`,
			en: `A lightweight and versatile JavaScript library for creating custom modals and alerts for web applications. Built with pure JavaScript and no dependencies.`,
		},
		role: "Developer",
		sourceCode: "https://github.com/silverethical/silverbox/",
		skills: ["JavaScript", "SCSS"],
	},
	{
		title: {
			fa: "تنرو",
			en: "Tonrow",
		},
		websiteLink: "https://tonrow.ir/",
		role: "FrontEnd Developer",
		description: {
			fa: `اپلیکیشن وب تحویل آنلاین برای شهر بوشهر، ایران که شامل درخواست‌های خرید و انتقال بسته‌ها می‌باشد.`,
			en: `An online delivery web app for the city of Bushehr, Iran — handling package delivery and shopping requests.`,
		},
		skills: ["JavaScript", "SCSS", "EJS", "Socket.io", "Swiper", "Alpine.js"],
	},
	{
		title: {
			fa: "ECRP Email Format Tool",
			en: "ECRP Email Format Tool",
		},
		websiteLink: "https://lssd-email-format-tool.vercel.app/",
		sourceCode: "https://github.com/dofxo/LSSD-email-format-tool",
		role: "FrontEnd Developer",
		description: {
			fa: `ابزار تولید خودکار فرمت‌های ایمیل برای فکشن (LSSD) در سرور Eclipse Roleplay، به منظور سهولت در تولید ایمیل های رسمی اتوماتیک درون بازی. از ساختارهای داینامیک برای هر بخش (RED، TSD، ATD) استفاده می‌کند.`,
			en: `Email Format Tool designed to streamline creation and management of official LSSD email format responses for the Eclipse Roleplay server. Provides automated, division-specific format generation for RED, TSD, and ATD units, supporting dynamic input handling, deputy data persistence, and instant clipboard copy for in-game use.`,
		},
		skills: ["TypeScript", "React.js", "TailwindCSS", "Ant Design", "shadcn", "react-toastify"],
	},
	{
		title: {
			fa: "ECRP Map POI",
			en: "ECRP Map POI",
		},
		websiteLink: "https://dofxo.github.io/ecrp-map-poi/",
		sourceCode: "https://github.com/dofxo/ecrp-map-poi",
		role: "FrontEnd Developer",
		description: {
			fa: `این پروژه ابزاری برای سرور بازی eclipse roleplay هست که متمرکز برای ذخیره اطلاعات مربوط به یکی از ارگان های درون بازی است.`,
			en: `This project is a tool for the Eclipse Roleplay game server, focused on storing data related to one of the in-game organizations.`,
		},
		skills: ["TypeScript", "React.js", "TailwindCSS", "Ant Design", "Supabase"],
	},
	{
		title: {
			fa: "ECRP legal faction playtime tracker",
			en: "ECRP legal faction playtime tracker",
		},
		websiteLink: "https://activity.legalfactions.com/",
		role: "FrontEnd Developer",
		description: {
			fa: `این پروژه ابزاری است برای تیم مدیریت سرور بازی Eclipse Roleplay. این ابزار مدت زمان بازی هر لیدر فکشن را بر روی شخصیت‌های مختلفش ذخیره می‌کند و آمارهایی بر اساس آن ارائه می‌دهد تا تیم مدیریت بتواند فعالیت آن‌ها را مانیتور کند.`,
			en: `This project is a tool designed for the Faction Management Team of the Eclipse Roleplay game server. It tracks each faction leader’s playtime on their individual game characters and provides statistics based on that playtime, helping the Legal Management Team monitor their activity.`,
		},
		skills: ["TypeScript", "Next.js", "TailwindCSS", "shadcn", "Yup", "formik", "Supabase"],
	},
	{
		title: {
			fa: "مربی باشگاه",
			en: "Gym Trainer",
		},
		websiteLink: "https://heydarifatemeh.ir/",
		sourceCode: "https://github.com/Silverethical/gym-trainer-website/",
		role: "FrontEnd Developer",
		description: {
			fa: `وبسایت مربی باشگاه برای فاطمه حیدری، شامل خدمات وی در حوزه تناسب اندام و سلامتی و اطلاعات کامل درباره خدمات او می‌باشد.`,
			en: `A fitness trainer website for Fatemeh Heydari, featuring her services in fitness and health, along with detailed information about her programs.`,
		},
		skills: ["TypeScript", "React.js", "Swiper", "TailwindCSS"],
	},
	{
		title: {
			fa: "NSD",
			en: "NSD",
		},
		websiteLink: "https://nirosaiedarakhsh.ir/",
		sourceCode: "https://github.com/fulcain/niro-saee",
		role: "FrontEnd Developer",
		description: {
			fa: `طراحی و توسعه وب‌سایتی حرفه‌ای برای معرفی خدمات شرکت نیرو ساعی درخش، شامل بخش‌های معرفی شرکت، خدمات مهندسی و پیمانکاری، نمونه‌کارها، و ارتباط با مشتریان.`,
			en: `A professional website designed and developed for Niro Saee Derakhsh company, showcasing its engineering and contracting services, portfolio, and client communication.`,
		},
		skills: ["TypeScript", "Next.js", "Swiper", "shadcn/ui", "TailwindCSS"],
	},
	{
		title: {
			fa: "فاکتور فروش رمیونا",
			en: "Remiona Invoice",
		},
		websiteLink: "https://factor.remiona.ir",
		sourceCode: "https://github.com/Silverethical/online_invoice/",
		role: "FrontEnd Developer",
		description: {
			fa: `این پروژه ابزاری حرفه‌ای برای صدور فاکتور فروشگاهی است که به‌صورت اختصاصی برای فروشگاه رمیونا طراحی و پیاده‌سازی شده است.`,
			en: `A professional invoicing tool specifically designed for Remiona store. It helps streamline the billing process, making it faster, more accurate, and standardized while neatly storing customer purchase information.`,
		},
		skills: ["TypeScript", "React.js", "MUI", "TailwindCSS", "Ant Design"],
	},
];
