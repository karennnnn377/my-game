export type Lang = "en" | "fa" | "ar";
export const LANGS: { id: Lang; label: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { id: "en", label: "English", flag: "🇬🇧", dir: "ltr" },
  { id: "fa", label: "فارسی", flag: "🇮🇷", dir: "rtl" },
  { id: "ar", label: "العربية", flag: "🇸🇦", dir: "rtl" },
];

type Entry = [string, string, string]; // [en, fa, ar]
const L: Record<string, Entry> = {
  // nav / brand
  brand_sub: ["FAMOUS PEOPLE", "افراد مشهور", "المشاهير"],
  nav_home: ["Home", "خانه", "الرئيسية"],
  nav_play: ["Play", "بازی", "العب"],
  nav_cats: ["Categories", "دسته‌ها", "الفئات"],
  nav_lb: ["Leaderboard", "جدول امتیازات", "المتصدرون"],
  nav_profile: ["Profile", "پروفایل", "الملف الشخصي"],
  nav_daily: ["Daily", "روزانه", "يومي"],
  sound: ["Sound", "صدا", "الصوت"],
  // hero
  hero_sub: ["How well do you know the world's most famous people?", "چقدر مشاهیر جهان را می‌شناسی؟", "ما مدى معرفتك بأشهر شخصيات العالم؟"],
  play_now: ["Play Now", "شروع بازی", "العب الآن"],
  birthdate_quiz: ["Birthdate Quiz", "کوییز تولد", "اختبار الميلاد"],
  daily_challenge: ["Daily Challenge", "چالش روزانه", "تحدي اليوم"],
  categories_btn: ["Categories", "دسته‌بندی‌ها", "الفئات"],
  leaderboard_btn: ["Leaderboard", "جدول امتیازات", "المتصدرون"],
  scroll_hint: ["SCROLL TO EXPLORE", "برای کاوش اسکرول کن", "مرر للاستكشاف"],
  // stats
  st_legends: ["Famous People", "مشاهیر", "شخصية مشهورة"],
  st_cats: ["Categories", "دسته‌بندی", "فئة"],
  st_questions: ["Questions / Game", "سؤال در هر بازی", "سؤال لكل جولة"],
  st_langs: ["Languages", "زبان", "لغات"],
  // home sections
  born_today: ["Born On This Day", "متولدین امروز", "وُلدوا في مثل هذا اليوم"],
  born_today_sub: ["Legends in our database who share today's date", "مشاهیری که تاریخ تولدشان امروز است", "مشاهير يشاركون تاريخ اليوم"],
  how_title: ["How To Play", "روش بازی", "طريقة اللعب"],
  how1_t: ["A Date Appears", "یک تاریخ ظاهر می‌شود", "تظهر لك تواريخ"],
  how1_d: ["Every round shows a month and day — like DECEMBER 25. No year, no hints.", "هر راند یک ماه و روز نشان داده می‌شود — مثل ۲۵ دسامبر. بدون سال و بدون تقلب.", "كل جولة تعرض شهراً ويوماً — مثل 25 ديسمبر. بدون سنة ولا تلميح."],
  how2_t: ["Pick 1 Of 5", "یکی از ۵ نفر را انتخاب کن", "اختر واحداً من 5"],
  how2_d: ["Five famous faces, only one was born on that exact date. Choose wisely.", "پنج چهره مشهور، فقط یکی دقیقاً همان روز به دنیا آمده. هوشمندانه انتخاب کن.", "خمسة مشاهير، واحد فقط وُلد في ذلك اليوم تماماً. اختر بحكمة."],
  how3_t: ["Survive 15 Rounds", "۱۵ راند را پشت سر بگذار", "أكمل 15 جولة"],
  how3_d: ["15 questions per game. Build streaks, climb difficulties, earn XP and trophies.", "هر بازی ۱۵ سؤال دارد. رکورد بزن، سخت‌تر شو، امتیاز و جام بگیر.", "15 سؤالاً في كل جولة. ابنِ سلاسل، ارفع الصعوبة، واكسب الخبرة والكؤوس."],
  all_cats_title: ["Explore 25 Arenas", "۲۵ زمین بازی را کاوش کن", "استكشف 25 ساحة"],
  all_cats_sub: ["From football gods to Persian poets — every arena trains a different part of your fame-brain.", "از خدایان فوتبال تا شاعران پارسی — هر زمین بخش متفاوتی از مغز شهرت‌شناسی‌ات را قوی می‌کند.", "من آلهة كرة القدم إلى الشعراء الفرس — كل ساحة تدرّب جزءاً مختلفاً من ذاكرتك."],
  see_all: ["See All Categories", "همه دسته‌ها", "كل الفئات"],
  lb_teaser: ["Hall of Fame", "تالار افتخار", "قاعة المشاهير"],
  lb_teaser_sub: ["The sharpest fame-brains on the planet right now", "تیزهوش‌ترین شهرت‌شناسان دنیا در حال حاضر", "أذكى عقول المشاهير على الكوكب الآن"],
  view_full: ["View Full Leaderboard", "جدول کامل", "المتصدرون بالكامل"],
  cta_title: ["Ready to prove your fame IQ?", "آماده‌ای هوش شهرتت را ثابت کنی؟", "مستعد لإثبات ذكاء المشاهير لديك؟"],
  cta_sub: ["One date. Five faces. Fifteen rounds of glory.", "یک تاریخ. پنج چهره. پانزده راند افتخار.", "تاريخ واحد. خمسة وجوه. خمس عشرة جولة من المجد."],
  marquee: ["WHO WAS BORN ON THIS DATE?", "چه کسی در این تاریخ به دنیا آمده؟", "من وُلد في هذا التاريخ؟"],
  // game
  who_born: ["WHO WAS BORN ON THIS DATE?", "چه کسی در این تاریخ به دنیا آمده است؟", "من وُلد في هذا التاريخ؟"],
  question: ["Question", "سؤال", "سؤال"],
  score: ["Score", "امتیاز", "النقاط"],
  streak: ["Streak", "رکورد پیاپی", "سلسلة"],
  best: ["Best", "بهترین", "الأفضل"],
  exit: ["Exit", "خروج", "خروج"],
  diff0: ["Easy", "آسان", "سهل"],
  diff1: ["Medium", "متوسط", "متوسط"],
  diff2: ["Hard", "سخت", "صعب"],
  diff3: ["Impossible", "غیرممکن", "مستحيل"],
  correct: ["CORRECT!", "درست!", "صحيح!"],
  wrong: ["WRONG!", "اشتباه!", "خطأ!"],
  it_was: ["It was", "پاسخ صحیح:", "الإجابة هي"],
  next: ["Next Question", "سؤال بعدی", "السؤال التالي"],
  results: ["See Results", "مشاهده نتیجه", "عرض النتائج"],
  complete: ["QUESTIONS COMPLETE", "سؤال کامل شد", "اكتملت الأسئلة"],
  final_score: ["Final Score", "امتیاز نهایی", "النتيجة النهائية"],
  accuracy: ["Accuracy", "دقت", "الدقة"],
  best_streak: ["Best Streak", "بهترین رکورد", "أفضل سلسلة"],
  xp_gained: ["XP Gained", "تجربه کسب‌شده", "الخبرة المكتسبة"],
  level_up: ["LEVEL UP!", "ارتقای سطح!", "ترقية مستوى!"],
  level_now: ["You reached level", "به سطح رسیدی:", "وصلت إلى المستوى"],
  ach_unlocked: ["Achievement Unlocked", "دستاورد باز شد", "إنجاز مفتوح"],
  play_again: ["Play Again", "بازی دوباره", "العب مجدداً"],
  back_home: ["Home", "خانه", "الرئيسية"],
  grade_perfect: ["FLAWLESS VICTORY", "پیروزی بی‌نقص", "انتصار مثالي"],
  grade_great: ["LEGENDARY MEMORY", "حافظه افسانه‌ای", "ذاكرة أسطورية"],
  grade_good: ["RISING STAR", "ستاره نوظهور", "نجم صاعد"],
  grade_ok: ["WARMING UP", "در حال گرم شدن", "قيد الإحماء"],
  grade_bad: ["FAME ROOKIE", "تازه‌کار شهرت", "مبتدئ المشاهير"],
  daily_badge: ["DAILY CHALLENGE", "چالش روزانه", "تحدي اليوم"],
  daily_done: ["Come back tomorrow for a new set!", "فردا برای مجموعه جدید برگرد!", "عد غداً لمجموعة جديدة!"],
  q_category: ["Category", "دسته", "الفئة"],
  points: ["pts", "امتیاز", "نقطة"],
  bonus: ["streak bonus", "پاداش رکورد", "مكافأة سلسلة"],
  // categories screen
  choose_cat: ["Choose Your Arena", "زمین بازی‌ات را انتخاب کن", "اختر ساحتك"],
  legends_count: ["legends", "چهره", "أسطورة"],
  start_quiz: ["Start Quiz", "شروع کوییز", "ابدأ الاختبار"],
  random_mix: ["Random Mix", "مخلوط تصادفی", "مزيج عشوائي"],
  random_mix_d: ["All categories, random difficulties, pure chaos.", "همه دسته‌ها، سختی تصادفی، آشوب خالص.", "كل الفئات، صعوبات عشوائية، فوضى حقيقية."],
  // leaderboard
  lb_global: ["Global", "جهانی", "عالمي"],
  lb_daily: ["Daily", "روزانه", "يومي"],
  lb_weekly: ["Weekly", "هفتگی", "أسبوعي"],
  rank: ["Rank", "رتبه", "الترتيب"],
  player: ["Player", "بازیکن", "اللاعب"],
  th_score: ["Score", "امتیاز", "النقاط"],
  th_acc: ["Accuracy", "دقت", "الدقة"],
  th_streak: ["Streak", "رکورد", "السلسلة"],
  th_level: ["Level", "سطح", "المستوى"],
  you_row: ["YOU", "شما", "أنت"],
  lb_note: ["Play games to climb the board", "برای صعود در جدول بازی کن", "العب لتتصدر الجدول"],
  // profile
  p_title: ["Player Profile", "پروفایل بازیکن", "ملف اللاعب"],
  p_name: ["Username", "نام کاربری", "اسم المستخدم"],
  p_name_hint: ["Tap to edit your legend name", "برای ویرایش نام افسانه‌ات بزن", "اضغط لتعديل اسمك"],
  p_birthday: ["Your Birthday", "تاریخ تولدت", "عيد ميلادك"],
  p_calendar: ["Calendar", "تقویم", "التقويم"],
  p_gregorian: ["Gregorian", "میلادی", "ميلادي"],
  p_jalali: ["Solar Hijri", "هجری شمسی", "هجري شمسي"],
  p_save: ["Save", "ذخیره", "حفظ"],
  p_saved: ["Saved!", "ذخیره شد!", "تم الحفظ!"],
  p_games: ["Games Played", "بازی‌های انجام‌شده", "مباريات لُعبت"],
  p_questions: ["Questions Answered", "سؤالات پاسخ‌داده", "أسئلة مُجابة"],
  p_correct: ["Correct Answers", "پاسخ‌های درست", "إجابات صحيحة"],
  p_hiscore: ["Highest Score", "بیشترین امتیاز", "أعلى نتيجة"],
  p_fav: ["Favorite Arena", "زمین محبوب", "الساحة المفضلة"],
  p_xp: ["Total XP", "مجموع تجربه", "مجموع الخبرة"],
  p_ach: ["Achievements", "دستاوردها", "الإنجازات"],
  p_unlocked: ["unlocked", "باز شده", "مفتوح"],
  p_locked: ["Locked", "قفل", "مقفل"],
  p_twins: ["Your Birthday Twins", "هم‌تولدی‌های مشهورت", "توائم عيد ميلادك"],
  p_twins_sub: ["Famous people born on your day", "مشاهیری که روز تولد تو به دنیا آمده‌اند", "مشاهير وُلدوا في يومك"],
  p_no_twins: ["Set your birthday to meet your fame twins", "تاریخ تولدت را تنظیم کن تا هم‌تولدی‌هایت را ببینی", "حدّد عيد ميلادك لتقابل توائمك المشاهير"],
  p_none: ["—", "—", "—"],
  // misc
  loading: ["Loading arena…", "در حال بارگذاری…", "جارٍ التحميل…"],
  bc: ["BC", "پ.م", "ق.م"],
  born: ["b.", "متولد", "وُلد"],
  footer_tag: ["The ultimate famous-people quiz arena. Built for trivia hunters worldwide.", "میدان نهایی کوییز مشاهیر. ساخته‌شده برای شکارچیان دانستنی در سراسر جهان.", "ساحة الاختبار الكبرى للمشاهير. صُنعت لصيّادي المعلومات حول العالم."],
  footer_modes: ["Game Modes", "حالت‌های بازی", "أوضاع اللعب"],
  footer_links: ["Quick Links", "لینک‌های سریع", "روابط سريعة"],
  rights: ["All portraits are original AI-styled artwork. Names & birth dates are facts of the public record.", "همه پرتره‌ها آثار هنری اوریجینال به سبک هوش مصنوعی‌اند. نام‌ها و تاریخ تولدها اطلاعات عمومی‌اند.", "كل اللوحات أعمال فنية أصلية بأسلوب الذكاء الاصطناعي. الأسماء وتواريخ الميلاد حقائق عامة."],
  today: ["Today", "امروز", "اليوم"],
};

export const MONTHS: Record<Lang, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  fa: ["ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"],
  ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
};

export const JALALI_MONTHS: Record<Lang, string[]> = {
  en: ["Farvardin", "Ordibehesht", "Khordad", "Tir", "Mordad", "Shahrivar", "Mehr", "Aban", "Azar", "Dey", "Bahman", "Esfand"],
  fa: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
  ar: ["فروردین", "أرديبهشت", "خرداد", "تیر", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دی", "بهمن", "إسفند"],
};

export const CAT_NAMES: Record<string, Entry> = {
  football: ["Footballers", "فوتبالیست‌ها", "لاعبو كرة القدم"],
  actors: ["Actors", "بازیگران مرد", "ممثلون"],
  actresses: ["Actresses", "بازیگران زن", "ممثلات"],
  singers: ["Singers", "خوانندگان", "مغنون"],
  musicians: ["Musicians", "نوازندگان و آهنگسازان", "موسيقيون"],
  rappers: ["Rappers", "رپرها", "مغنو راب"],
  basketball: ["Basketball Players", "بسکتبالیست‌ها", "لاعبو السلة"],
  tennis: ["Tennis Players", "تنیسورها", "لاعبو التنس"],
  racing: ["Racing Drivers", "رانندگان مسابقه‌ای", "سائقو السباقات"],
  boxing: ["Boxers", "بوکسورها", "الملاكمون"],
  athletes: ["Athletes", "ورزشکاران", "رياضيون"],
  scientists: ["Scientists", "دانشمندان", "علماء"],
  astronauts: ["Astronauts", "فضانوردان", "رواد الفضاء"],
  historical: ["Historical Figures", "چهره‌های تاریخی", "شخصيات تاريخية"],
  leaders: ["World Leaders", "رهبران جهان", "قادة العالم"],
  artists: ["Artists", "هنرمندان", "فنانون"],
  writers: ["Writers", "نویسندگان", "كُتّاب"],
  entrepreneurs: ["Entrepreneurs", "کارآفرینان", "روّاد أعمال"],
  tech: ["Tech Figures", "چهره‌های فناوری", "شخصيات التقنية"],
  gaming: ["Gaming Personalities", "چهره‌های گیمینگ", "شخصيات الألعاب"],
  tv: ["TV Personalities", "چهره‌های تلویزیونی", "شخصيات تلفزيونية"],
  comedians: ["Comedians", "کمدین‌ها", "كوميديون"],
  internet: ["Internet Personalities", "چهره‌های اینترنت", "شخصيات الإنترنت"],
  iran: ["Famous Iranians", "مشاهیر ایرانی", "مشاهير إيران"],
  world: ["World Famous", "مشاهیر جهان", "مشاهير العالم"],
};

export const ACH: Record<string, { icon: string; n: Entry; d: Entry }> = {
  first_win: { icon: "🏆", n: ["First Win", "اولین پیروزی", "أول فوز"], d: ["Finish a game with 8+ correct", "یک بازی را با ۸+ پاسخ درست تمام کن", "أنهِ جولة بـ8 إجابات صحيحة+"] },
  streak10: { icon: "🔥", n: ["On Fire", "در آتش", "مشتعل"], d: ["Hit a 10-answer streak", "رکورد ۱۰ پاسخ پیاپی بزن", "حقق سلسلة من 10 إجابات"] },
  streak25: { icon: "☄️", n: ["Unstoppable", "توقف‌ناپذیر", "لا يُوقف"], d: ["Reach a 25-answer streak (across games)", "رکورد ۲۵ پاسخ پیاپی بزن", "بلغ سلسلة من 25 إجابة"] },
  acc90: { icon: "🎯", n: ["Sharpshooter", "تیرانداز ماهر", "قنّاص"], d: ["Finish a game with 90%+ accuracy", "بازی را با دقت ۹۰٪+ تمام کن", "أنهِ جولة بدقة +90٪"] },
  football_expert: { icon: "⚽", n: ["Football Expert", "کارشناس فوتبال", "خبير كرة القدم"], d: ["Answer 15 football questions right", "۱۵ سؤال فوتبال را درست جواب بده", "أجب صحيحاً على 15 سؤال كرة قدم"] },
  movie_expert: { icon: "🎬", n: ["Movie Expert", "کارشناس سینما", "خبير السينما"], d: ["Answer 15 film questions right", "۱۵ سؤال سینمایی را درست جواب بده", "أجب صحيحاً على 15 سؤال سينما"] },
  music_expert: { icon: "🎵", n: ["Music Expert", "کارشناس موسیقی", "خبير الموسيقى"], d: ["Answer 15 music questions right", "۱۵ سؤال موسیقی را درست جواب بده", "أجب صحيحاً على 15 سؤال موسيقى"] },
  iran_legend: { icon: "🇮🇷", n: ["Iranian Legends", "افسانه‌های ایران", "أساطير إيران"], d: ["Answer 15 Iranian questions right", "۱۵ سؤال مشاهیر ایران را درست جواب بده", "أجب صحيحاً على 15 سؤالاً إيرانياً"] },
  world_knowledge: { icon: "🌎", n: ["World Knowledge", "دانش جهانی", "معرفة عالمية"], d: ["Score in 10 different categories", "در ۱۰ دسته مختلف امتیاز بگیر", "سجّل في 10 فئات مختلفة"] },
  quiz_master: { icon: "👑", n: ["Quiz Master", "استاد کوییز", "سيد الاختبار"], d: ["A perfect 15/15 game", "یک بازی کامل ۱۵ از ۱۵", "جولة مثالية 15/15"] },
  veteran: { icon: "🎖️", n: ["Veteran", "کهنه‌سرباز", "مخضرم"], d: ["Play 10 games", "۱۰ بازی انجام بده", "العب 10 جولات"] },
  level5: { icon: "⭐", n: ["Rising Legend", "افسانه نوظهور", "أسطورة صاعدة"], d: ["Reach player level 5", "به سطح ۵ برس", "ابلغ المستوى 5"] },
};

const idx = { en: 0, fa: 1, ar: 2 } as const;

export function tr(lang: Lang, key: string): string {
  const e = L[key];
  return e ? e[idx[lang]] : key;
}
export function trCat(lang: Lang, cat: string): string {
  const e = CAT_NAMES[cat];
  return e ? e[idx[lang]] : cat;
}
export function fmt(s: string, vars: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}
