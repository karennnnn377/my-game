import type { Person } from "./people";
import type { Lang } from "../i18n";

/* ============================================================
   Rich metadata layer — keyed by stable person id (`cat:index`).
   Append-only: adding an entry enriches one person, nothing merges.
   People without an entry fall back to generated facts/eras.
   ============================================================ */

export interface PMeta {
  fa?: string; // Persian name
  ar?: string; // Arabic name
  c?: string; // country (English key)
  b?: string; // short bio (English)
  f?: string; // fun fact (English)
  k?: string[]; // search keywords
}

export const META: Record<string, PMeta> = {
  // ---- football ----
  "football:0": { fa: "لیونل مسی", ar: "ليونيل ميسي", c: "Argentina", b: "Argentine forward, 8-time Ballon d'Or winner and 2022 World Cup champion.", f: "He scored a record 91 goals in a single calendar year (2012).", k: ["barcelona", "psg", "inter miami", "goat", "world cup"] },
  "football:1": { fa: "کریستیانو رونالدو", ar: "كريستيانو رونالدو", c: "Portugal", b: "Portuguese forward, all-time top international scorer and 5-time Ballon d'Or winner.", f: "First player to score in five different FIFA World Cups.", k: ["real madrid", "manchester united", "juventus", "al nassr"] },
  "football:2": { fa: "پله", ar: "بيليه", c: "Brazil", b: "Brazilian legend who won three World Cups — the only player ever to do so.", f: "Scored over 1,000 career goals including friendlies.", k: ["brazil", "santos", "world cup", "legend"] },
  "football:3": { fa: "دیگو مارادونا", ar: "دييغو مارادونا", c: "Argentina", b: "Argentine icon who dragged Argentina to the 1986 World Cup title.", f: "Scored the 'Hand of God' and the 'Goal of the Century' in the same match.", k: ["napoli", "boca", "world cup"] },
  "football:4": { fa: "کیلیان امباپه", ar: "كيليان مبابي", c: "France", b: "French superstar, 2018 World Cup winner and hat-trick hero of the 2022 final.", f: "Scored a World Cup final hat-trick at age 23.", k: ["psg", "real madrid", "france"] },
  "football:6": { fa: "دیوید بکهام", ar: "ديفيد بيكهام", c: "England", b: "England captain and free-kick specialist who played for United, Madrid and LA.", f: "His free-kick vs Greece in 2001 sent England to the World Cup.", k: ["manchester united", "real madrid", "galaxy"] },
  // ---- actors ----
  "actors:0": { fa: "تام هنکس", ar: "توم هانكس", c: "USA", b: "Beloved American actor, back-to-back Oscar winner for Philadelphia and Forrest Gump.", f: "Voiced Woody in all four Toy Story films.", k: ["forrest gump", "saving private ryan", "oscar"] },
  "actors:1": { fa: "لئوناردو دی‌کاپریو", ar: "ليوناردو دي كابريو", c: "USA", b: "Oscar-winning star of Titanic, Inception and The Revenant.", f: "Finally won his first Oscar in 2016 after five nominations.", k: ["titanic", "inception", "wolf of wall street"] },
  "actors:9": { fa: "مورگان فریمن", ar: "مورغان فريمان", c: "USA", b: "Distinguished American actor with one of cinema's most famous voices.", f: "Played God in Bruce Almighty — and narrated half the universe.", k: ["shawshank", "narrator", "oscar"] },
  "actors:25": { fa: "شاهرخ خان", ar: "شاروخان", c: "India", b: "The 'King of Bollywood' with over 90 films and a global fanbase.", f: "Known as SRK — one of the world's most followed actors.", k: ["bollywood", "ddlj", "king khan"] },
  "actors:30": { fa: "بروس لی", ar: "بروس لي", c: "China", b: "Martial-arts revolutionary who redefined action cinema in the 1970s.", f: "Founded his own martial art: Jeet Kune Do.", k: ["kung fu", "enter the dragon", "martial arts"] },
  "actors:32": { fa: "چارلی چاپلین", ar: "تشارلي تشابلن", c: "UK", b: "Silent-film genius whose 'Tramp' became cinema's first global icon.", f: "Co-founded United Artists studio in 1919.", k: ["silent film", "tramp", "the kid"] },
  // ---- actresses ----
  "actresses:0": { fa: "مریل استریپ", ar: "ميريل ستريب", c: "USA", b: "Most Oscar-nominated actor in history with 21 nominations.", f: "Has mastered dozens of accents across her career.", k: ["oscar", "devil wears prada", "mamma mia"] },
  "actresses:2": { fa: "آنجلینا جولی", ar: "أنجلينا جولي", c: "USA", b: "Oscar-winning actress and longtime UN humanitarian envoy.", f: "Won her Oscar for Girl, Interrupted (1999).", k: ["lara croft", "maleficent", "un"] },
  "actresses:18": { fa: "آدری هپبورن", ar: "أودري هيبورن", c: "Belgium", b: "Hollywood golden-age icon of Breakfast at Tiffany's and Roman Holiday.", f: "One of the few EGOT winners — Emmy, Grammy, Oscar, Tony.", k: ["breakfast at tiffany's", "roman holiday", "classic"] },
  "actresses:19": { fa: "مریلین مونرو", ar: "مارلين مونرو", c: "USA", b: "The definitive Hollywood glamour icon of the 1950s.", f: "Her white-dress scene in The Seven Year Itch is cinema's most famous.", k: ["hollywood", "some like it hot", "icon"] },
  // ---- singers ----
  "singers:0": { fa: "مایکل جکسون", ar: "مايكل جاكسون", c: "USA", b: "The King of Pop — Thriller remains the best-selling album of all time.", f: "The moonwalk debuted on TV in 1983 during 'Billie Jean'.", k: ["king of pop", "thriller", "moonwalk"] },
  "singers:1": { fa: "فردی مرکوری", ar: "فريدي ميركوري", c: "UK", b: "Queen's flamboyant frontman with a legendary four-octave voice.", f: "Live Aid 1985 — his 20 minutes are called rock's greatest set.", k: ["queen", "bohemian rhapsody", "live aid"] },
  "singers:2": { fa: "الویس پریسلی", ar: "إلفيس بريسلي", c: "USA", b: "The King of Rock and Roll, best-selling solo artist in history.", f: "Never performed a full concert outside North America except Hawaii.", k: ["king", "rock and roll", "graceland"] },
  "singers:4": { fa: "بیانسه", ar: "بيونسيه", c: "USA", b: "32-time Grammy winner — the most awarded artist in Grammy history.", f: "Her 2018 Coachella set became the documentary 'Homecoming'.", k: ["grammy", "destiny's child", "queen b"] },
  "singers:6": { fa: "تیلور سوئیفت", ar: "تايلور سويفت", c: "USA", b: "Singer-songwriter whose Eras Tour became the first billion-dollar tour.", f: "Re-records her old albums to own her masters.", k: ["eras tour", "swifties", "grammy"] },
  "singers:30": { fa: "باب مارلی", ar: "بوب مارلي", c: "Jamaica", b: "Reggae pioneer who carried Jamaican music to the entire world.", f: "'One Love' was named song of the millennium by the BBC.", k: ["reggae", "one love", "no woman no cry"] },
  // ---- musicians ----
  "musicians:0": { fa: "پل مک‌کارتنی", ar: "بول مكارتني", c: "UK", b: "Beatles legend and one of history's most successful songwriters.", f: "His song 'Yesterday' is among the most covered songs ever.", k: ["beatles", "wings", "hey jude"] },
  "musicians:1": { fa: "جان لنون", ar: "جون لينون", c: "UK", b: "Beatles co-founder and peace activist behind 'Imagine'.", f: "Returned his MBE in protest in 1969.", k: ["beatles", "imagine", "peace"] },
  "musicians:14": { fa: "ولفگانگ آمادئوس موتسارت", ar: "فولفغانغ موتسارت", c: "Austria", b: "Child-prodigy composer with 600+ works written before age 35.", f: "Composed his first piece at age five.", k: ["composer", "classical", "prodigy"] },
  "musicians:15": { fa: "لودویگ فان بتهوون", ar: "لودفيغ بيتهوفن", c: "Germany", b: "Revolutionary composer who kept writing masterpieces after going deaf.", f: "Premiered his Ninth Symphony completely deaf in 1824.", k: ["symphony", "deaf", "classical"] },
  // ---- rappers ----
  "rappers:0": { fa: "امینم", ar: "إمينيم", c: "USA", b: "Best-selling rapper of all time and Oscar-winning 'Lose Yourself'.", f: "'Lose Yourself' was the first rap song to win an Oscar.", k: ["slim shady", "8 mile", "oscar"] },
  "rappers:3": { fa: "دریک", ar: "دريك", c: "Canada", b: "Streaming-era titan with more Billboard Hot 100 entries than anyone.", f: "Started as an actor on Degrassi before rap.", k: ["ovo", "hotline bling", "billboard"] },
  // ---- basketball ----
  "basketball:0": { fa: "مایکل جردن", ar: "مايكل جوردان", c: "USA", b: "Six-time NBA champion, widely called the greatest basketball player ever.", f: "Won 6 Finals, 6 Finals MVPs — never a Game 7 in the Finals.", k: ["chicago bulls", "air jordan", "nba"] },
  "basketball:1": { fa: "لبران جیمز", ar: "ليبرون جيمس", c: "USA", b: "NBA's all-time leading scorer with four championships.", f: "Passed Kareem's 38,387-point record in 2023.", k: ["lakers", "cavaliers", "nba"] },
  "basketball:2": { fa: "کوبی برایانت", ar: "كوبي براينت", c: "USA", b: "Lakers legend who scored 81 points in a single game.", f: "His 'Mamba Mentality' became a global mindset brand.", k: ["lakers", "mamba", "81 points"] },
  "basketball:6": { fa: "استفن کری", ar: "ستيفن كوري", c: "USA", b: "Greatest shooter in NBA history, four-time champion.", f: "First unanimous MVP in NBA history (2016).", k: ["warriors", "three point", "splash"] },
  // ---- tennis ----
  "tennis:0": { fa: "راجر فدرر", ar: "روجر فيدرر", c: "Switzerland", b: "20-time Grand Slam champion famed for effortless elegance.", f: "Spent a record 237 consecutive weeks as world No. 1.", k: ["grand slam", "wimbledon", "swiss"] },
  "tennis:1": { fa: "رافائل نادال", ar: "رافائيل نادال", c: "Spain", b: "The 'King of Clay' with a record 14 French Open titles.", f: "14 Roland Garros titles — most ever at one Grand Slam.", k: ["clay", "roland garros", "rafa"] },
  "tennis:2": { fa: "نواک جوکوویچ", ar: "نوفاك ديوكوفيتش", c: "Serbia", b: "Record 24 Grand Slam singles titles — the most in history.", f: "Only man to win all nine Masters 1000 events twice.", k: ["grand slam", "djoker", "serbia"] },
  "tennis:3": { fa: "سرینا ویلیامز", ar: "سيرينا ويليامز", c: "USA", b: "23 Grand Slam singles titles — the Open-era record.", f: "Won the 2017 Australian Open while pregnant.", k: ["grand slam", "wta", "serena"] },
  // ---- racing ----
  "racing:0": { fa: "لوئیس همیلتون", ar: "لويس هاميلتون", c: "UK", b: "Seven-time F1 world champion and the sport's winningest driver.", f: "First Black driver in F1 history.", k: ["f1", "mercedes", "ferrari"] },
  "racing:1": { fa: "میشائیل شوماخر", ar: "مايكل شوماخر", c: "Germany", b: "Seven-time F1 champion who dominated with Ferrari.", f: "Won 5 straight titles with Ferrari (2000–2004).", k: ["f1", "ferrari", "schumi"] },
  "racing:2": { fa: "آیرتون سنا", ar: "آيرتون سينا", c: "Brazil", b: "Three-time F1 champion, revered as the fastest qualifier ever.", f: "Won the 1993 European GP in the rain, passing four cars on lap one.", k: ["f1", "mclaren", "brazil"] },
  // ---- boxing ----
  "boxing:0": { fa: "محمدعلی کلی", ar: "محمد علي كلاي", c: "USA", b: "'The Greatest' — three-time heavyweight champion and cultural icon.", f: "Won Olympic gold in 1960 as Cassius Clay.", k: ["rumble in the jungle", "heavyweight", "greatest"] },
  "boxing:1": { fa: "مایک تایسون", ar: "مايك تايسون", c: "USA", b: "Youngest heavyweight champion in history at age 20.", f: "Many of his 1980s knockouts came inside the first round.", k: ["iron mike", "heavyweight", "ko"] },
  // ---- athletes ----
  "athletes:0": { fa: "اوسین بولت", ar: "أوسين بولت", c: "Jamaica", b: "Fastest human ever — 9.58s world record in the 100m.", f: "Eight Olympic golds, three of them in three straight Games.", k: ["sprint", "olympics", "lightning bolt"] },
  "athletes:1": { fa: "مایکل فلپس", ar: "مايكل فيلبس", c: "USA", b: "Most decorated Olympian ever with 28 medals, 23 gold.", f: "Won 8 golds at a single Games — Beijing 2008.", k: ["swimming", "olympics", "23 gold"] },
  "athletes:12": { fa: "تایگر وودز", ar: "تايغر وودز", c: "USA", b: "15 major golf championships, including the 2019 Masters comeback.", f: "Won the Masters by 12 strokes in 1997 — a record margin.", k: ["golf", "masters", "pga"] },
  // ---- scientists ----
  "scientists:0": { fa: "آلبرت اینشتین", ar: "ألبرت أينشتاين", c: "Germany", b: "Physicist who rewrote space, time and gravity with relativity.", f: "Won his Nobel for the photoelectric effect — not relativity.", k: ["e=mc2", "relativity", "nobel", "physics"] },
  "scientists:1": { fa: "آیزاک نیوتن", ar: "إسحاق نيوتن", c: "UK", b: "Formulated gravity and the laws of motion; co-invented calculus.", f: "Built the first practical reflecting telescope.", k: ["gravity", "calculus", "physics"] },
  "scientists:2": { fa: "نیکولا تسلا", ar: "نيكولا تسلا", c: "Serbia", b: "Inventor of the AC electrical system and radio-era pioneer.", f: "Held around 300 patents across 26 countries.", k: ["electricity", "ac current", "invention"] },
  "scientists:3": { fa: "ماری کوری", ar: "ماري كوري", c: "Poland", b: "First person to win Nobel Prizes in two different sciences.", f: "Her notebooks are still radioactive — kept in lead boxes.", k: ["radioactivity", "nobel", "chemistry"] },
  "scientists:5": { fa: "گالیلئو گالیله", ar: "غاليليو غاليلي", c: "Italy", b: "Father of modern astronomy; turned the telescope to the heavens.", f: "Discovered Jupiter's four largest moons in 1610.", k: ["telescope", "astronomy", "heliocentrism"] },
  "scientists:12": { fa: "توماس ادیسون", ar: "توماس إديسون", c: "USA", b: "Prolific inventor behind the practical light bulb and phonograph.", f: "Held 1,093 US patents.", k: ["light bulb", "invention", "edison"] },
  // ---- astronauts ----
  "astronauts:0": { fa: "نیل آرمسترانگ", ar: "نيل أرمسترونغ", c: "USA", b: "First human to walk on the Moon — Apollo 11, 1969.", f: "His first words: 'One small step for man…'", k: ["apollo 11", "moon", "nasa"] },
  "astronauts:2": { fa: "یوری گاگارین", ar: "يوري غاغارين", c: "Russia", b: "First human in space — orbited Earth aboard Vostok 1 in 1961.", f: "His flight lasted just 108 minutes.", k: ["vostok", "space", "first"] },
  // ---- historical ----
  "historical:0": { fa: "ژولیوس سزار", ar: "يوليوس قيصر", c: "Italy", b: "Roman general and dictator who reshaped the Roman Republic.", f: "The month of July is named after him.", k: ["rome", "emperor", "venividivici"] },
  "historical:1": { fa: "کلئوپاترا", ar: "كليوباترا", c: "Egypt", b: "Last active ruler of the Ptolemaic Kingdom of Egypt.", f: "She lived closer in time to the Moon landing than to the building of the Great Pyramid.", k: ["egypt", "queen", "ptolemy"] },
  "historical:2": { fa: "اسکندر مقدونی", ar: "الإسكندر الأكبر", c: "Greece", b: "Conquered the known world from Greece to India before age 32.", f: "Founded over 20 cities named Alexandria.", k: ["macedon", "conqueror", "alexandria"] },
  "historical:4": { fa: "ناپلئون بناپارت", ar: "نابليون بونابرت", c: "France", b: "French emperor who conquered much of Europe.", f: "The Napoleonic Code still influences law in dozens of countries.", k: ["france", "emperor", "waterloo"] },
  "historical:8": { fa: "وینستون چرچیل", ar: "ونستون تشرشل", c: "UK", b: "British PM who led the UK through World War II.", f: "Also won the Nobel Prize in Literature (1953).", k: ["ww2", "prime minister", "nobel"] },
  "historical:9": { fa: "مهاتما گاندی", ar: "المهاتما غاندي", c: "India", b: "Led India's independence through nonviolent resistance.", f: "Walked 240 miles to the sea in the Salt March of 1930.", k: ["india", "peace", "independence"] },
  "historical:10": { fa: "نلسون ماندلا", ar: "نيلسون مانديلا", c: "South Africa", b: "Anti-apartheid icon, imprisoned 27 years, then elected president.", f: "His prison number, 46664, became a global symbol.", k: ["apartheid", "nobel peace", "president"] },
  "historical:11": { fa: "مارتین لوتر کینگ", ar: "مارتن لوثر كينغ", c: "USA", b: "Civil-rights leader of 'I Have a Dream'.", f: "The youngest-ever Nobel Peace laureate at 35.", k: ["civil rights", "i have a dream", "nobel"] },
  // ---- leaders ----
  "leaders:0": { fa: "باراک اوباما", ar: "باراك أوباما", c: "USA", b: "44th US president — the first African-American to hold the office.", f: "Won the Nobel Peace Prize in his first year (2009).", k: ["us president", "nobel", "yes we can"] },
  "leaders:3": { fa: "آنگلا مرکل", ar: "أنغيلا ميركل", c: "Germany", b: "Germany's chancellor for 16 years, de facto leader of Europe.", f: "Trained as a quantum chemist with a doctorate.", k: ["chancellor", "germany", "eu"] },
  // ---- artists ----
  "artists:0": { fa: "لئوناردو داوینچی", ar: "ليوناردو دافنشي", c: "Italy", b: "Renaissance polymath who painted the Mona Lisa and The Last Supper.", f: "Wrote his notebooks in mirror-image script.", k: ["mona lisa", "renaissance", "polymath"] },
  "artists:2": { fa: "پابلو پیکاسو", ar: "بابلو بيكاسو", c: "Spain", b: "Co-founder of Cubism and the 20th century's most influential artist.", f: "Painted Guernica in just over a month (1937).", k: ["cubism", "guernica", "modern art"] },
  "artists:3": { fa: "ونسان ون گوگ", ar: "فينسنت فان غوخ", c: "Netherlands", b: "Post-impressionist genius who sold almost nothing while alive.", f: "Painted around 900 canvases in just ten years.", k: ["starry night", "sunflowers", "impressionism"] },
  "artists:5": { fa: "سالوادور دالی", ar: "سلفادور دالي", c: "Spain", b: "Surrealist master of melting clocks and flamboyant mustaches.", f: "The Persistence of Memory was painted in 1931, when he was 27.", k: ["surrealism", "melting clocks", "dali"] },
  "artists:7": { fa: "فریدا کالو", ar: "فريدا كاهلو", c: "Mexico", b: "Mexican icon known for uncompromising self-portraits.", f: "Painted 55 self-portraits out of 143 total works.", k: ["mexico", "self portrait", "surrealism"] },
  // ---- writers ----
  "writers:0": { fa: "ویلیام شکسپیر", ar: "ويليام شكسبير", c: "UK", b: "The Bard — wrote ~39 plays and 154 sonnets.", f: "Invented words like 'swagger', 'lonely' and 'bedazzled'.", k: ["hamlet", "romeo", "theatre"] },
  "writers:7": { fa: "جی.کی. رولینگ", ar: "ج. ك. رولينغ", c: "UK", b: "Creator of Harry Potter, the best-selling book series in history.", f: "Wrote early Potter drafts as a jobless single mother.", k: ["harry potter", "hogwarts", "wizard"] },
  "writers:14": { fa: "جی.آر.آر. تالکین", ar: "ج. ر. ر. تولكين", c: "UK", b: "Oxford professor who invented Middle-earth and modern fantasy.", f: "Created entire Elvish languages before writing the stories.", k: ["lord of the rings", "hobbit", "middle earth"] },
  // ---- entrepreneurs ----
  "entrepreneurs:0": { fa: "ایلان ماسک", ar: "إيلون ماسك", c: "South Africa", b: "CEO of Tesla and SpaceX, pushing electric cars and Mars rockets.", f: "SpaceX landed the first privately-built orbital rocket (2010).", k: ["tesla", "spacex", "x"] },
  "entrepreneurs:1": { fa: "جف بزوس", ar: "جيف بيزوس", c: "USA", b: "Founded Amazon in a garage in 1994; later founded Blue Origin.", f: "Amazon started as an online bookstore.", k: ["amazon", "blue origin", "aws"] },
  "entrepreneurs:2": { fa: "بیل گیتس", ar: "بيل غيتس", c: "USA", b: "Microsoft co-founder turned global philanthropist.", f: "Was the world's richest person for 18 years.", k: ["microsoft", "windows", "gates foundation"] },
  "entrepreneurs:3": { fa: "مارک زاکربرگ", ar: "مارك زوكربيرغ", c: "USA", b: "Co-founded Facebook from a Harvard dorm in 2004.", f: "Launched Facebook at age 19.", k: ["facebook", "meta", "instagram"] },
  "entrepreneurs:9": { fa: "والت دیزنی", ar: "والت ديزني", c: "USA", b: "Animation pioneer who created Mickey Mouse and Disneyland.", f: "Won 22 competitive Oscars — a record.", k: ["disney", "mickey", "animation"] },
  // ---- tech ----
  "tech:0": { fa: "استیو جابز", ar: "ستيف جوبز", c: "USA", b: "Apple co-founder who gave us the iPhone, iPad and Mac.", f: "Was briefly a billionaire thanks to Pixar, not Apple.", k: ["apple", "iphone", "think different"] },
  // ---- gaming ----
  "gaming:0": { fa: "پیودی‌پای", ar: "بيو دي باي", c: "Sweden", b: "One of YouTube's first mega-stars, king of gaming commentary.", f: "First individual creator to reach 100M subscribers.", k: ["youtube", "pewds", "streamer"] },
  "gaming:10": { fa: "هیدئو کوجیما", ar: "هيديو كوجيما", c: "Japan", b: "Auteur behind Metal Gear Solid and Death Stranding.", f: "Famously said his body is '70% movies'.", k: ["metal gear", "death stranding", "konami"] },
  // ---- tv ----
  "tv:6": { fa: "گوردون رمزی", ar: "غوردون رامزي", c: "UK", b: "Multi-Michelin-starred chef and star of Hell's Kitchen.", f: "Holds 16 Michelin stars across his career.", k: ["hell's kitchen", "chef", "michelin"] },
  // ---- comedians ----
  "comedians:0": { fa: "جیم کری", ar: "جيم كاري", c: "Canada", b: "Rubber-faced comedy star of The Mask and Ace Ventura.", f: "Wrote himself a $10M cheque in 1990 — cashed it in 1995.", k: ["the mask", "ace ventura", "comedy"] },
  "comedians:5": { fa: "رابین ویلیامز", ar: "روبن ويليامز", c: "USA", b: "Oscar-winning comic genius with lightning improvisation.", f: "Voiced the Genie in Aladdin (1992).", k: ["aladdin", "good morning vietnam", "oscar"] },
  "comedians:8": { fa: "روآن اتکینسون", ar: "روان أتكينسون", c: "UK", b: "Creator of Mr. Bean — physical comedy without words.", f: "Mr. Bean barely speaks; his humor is silent.", k: ["mr bean", "johnny english", "blackadder"] },
  // ---- internet ----
  "internet:0": { fa: "مستربیست", ar: "مستر بيست", c: "USA", b: "YouTube's biggest individual creator, known for mega-giveaways.", f: "Recreated Squid Game in real life — 456 real contestants.", k: ["youtube", "giveaway", "beast"] },
  // ---- iran ----
  "iran:0": { fa: "علی دایی", ar: "علي دائي", c: "Iran", b: "Iran's greatest striker; held the international goals record for years.", f: "First player ever to reach 100 international goals.", k: ["perspolis", "bayern", "team melli"] },
  "iran:6": { fa: "سردار آزمون", ar: "سردار أزمون", c: "Iran", b: "Iranian striker nicknamed the 'Iranian Messi'.", f: "Won the Russian league with Zenit and Rubin Kazan.", k: ["zenit", "bayer leverkusen", "striker"] },
  "iran:7": { fa: "مهدی طارمی", ar: "مهدي طارمي", c: "Iran", b: "Striker who starred for Porto and Inter Milan.", f: "Won the Portuguese league's top-scorer award with Porto.", k: ["porto", "inter", "striker"] },
  "iran:16": { fa: "غلامرضا تختی", ar: "غلام رضا تختي", c: "Iran", b: "Olympic wrestling champion, beloved as 'Jahan Pahlavan' — the chivalrous hero.", f: "Olympic gold in 1956, plus two silvers and a world title.", k: ["wrestling", "olympics", "jahan pahlavan"] },
  "iran:34": { fa: "گوگوش", ar: "غوغوش", c: "Iran", b: "The legendary voice of Iranian pop, adored across generations.", f: "Began performing on stage as a small child in the 1950s.", k: ["pop", "diva", "concert"] },
  "iran:40": { fa: "محمدرضا شجریان", ar: "محمدرضا شجريان", c: "Iran", b: "Master of Persian classical singing, called 'Ostad' by millions.", f: "His 'Morgh-e Sahar' is an unofficial anthem of Persian music.", k: ["sonnati", "avaz", "master"] },
  "iran:44": { fa: "مریم میرزاخانی", ar: "مريم ميرزاخاني", c: "Iran", b: "First woman ever to win the Fields Medal, math's highest honor.", f: "Won the Fields Medal in 2014 for geometry and dynamics.", k: ["fields medal", "mathematics", "stanford"] },
  "iran:48": { fa: "مولانا", ar: "جلال الدين الرومي", c: "Iran", b: "13th-century poet whose verses are read on every continent.", f: "The best-selling poet in the United States is 800 years old.", k: ["rumi", "masnavi", "poet"] },
  "iran:49": { fa: "فردوسی", ar: "الفردوسي", c: "Iran", b: "Author of the Shahnameh — saved the Persian language with 50,000 verses.", f: "Spent about 30 years writing the Shahnameh.", k: ["shahnameh", "epic", "poet"] },
  "iran:50": { fa: "عمر خیام", ar: "عمر الخيام", c: "Iran", b: "Poet-mathematician of the Rubaiyat and solar-calendar reformer.", f: "His calendar reform is still the basis of Iran's calendar.", k: ["rubaiyat", "math", "calendar"] },
  "iran:57": { fa: "کوروش بزرگ", ar: "كورش الكبير", c: "Iran", b: "Founder of the Achaemenid Empire and author of a famed human-rights charter.", f: "The Cyrus Cylinder is often called history's first charter of rights.", k: ["achaemenid", "cylinder", "empire"] },
  // ---- world ----
  "world:0": { fa: "ملاله یوسف‌زی", ar: "ملالا يوسفزاي", c: "Pakistan", b: "Education activist, youngest-ever Nobel Peace laureate.", f: "Won the Nobel Peace Prize at 17.", k: ["nobel", "education", "activist"] },
  "world:3": { fa: "پاپ فرانسیس", ar: "البابا فرنسيس", c: "Argentina", b: "Head of the Catholic Church from 2013 — the first pope from the Americas.", f: "First Jesuit pope in history.", k: ["vatican", "pope", "catholic"] },
};

/* ---------- curated content accessors ----------
   Country/nationality/localized-name enrichment lives in nations.ts
   (keyed by exact name, so identities never merge). Eras live in people.ts.
   meta.ts adds the hand-written layer: bios + fun facts for top legends. */

export function metaOf(p: Person): PMeta {
  return META[p.id] ?? {};
}

/** Curated one-line bio (English curation; other languages use the auto-bio). */
export function curatedBio(p: Person): string | null {
  return META[p.id]?.b ?? null;
}

/** Curated fun fact — shown on the reveal screen + person page (English curation). */
export function curatedFact(p: Person): string | null {
  return META[p.id]?.f ?? null;
}

/* legacy country table kept out of the public API — superseded by nations.ts */
const _CL10N_UNUSED: Record<string, [string, string, string]> = {
  Iran: ["Iran", "ایران", "إيران"],
  Argentina: ["Argentina", "آرژانتین", "الأرجنتين"],
  Portugal: ["Portugal", "پرتغال", "البرتغال"],
  Brazil: ["Brazil", "برزیل", "البرازيل"],
  France: ["France", "فرانسه", "فرنسا"],
  England: ["England", "انگلستان", "إنجلترا"],
  UK: ["United Kingdom", "بریتانیا", "المملكة المتحدة"],
  USA: ["United States", "آمریکا", "الولايات المتحدة"],
  Germany: ["Germany", "آلمان", "ألمانيا"],
  Italy: ["Italy", "ایتالیا", "إيطاليا"],
  Spain: ["Spain", "اسپانیا", "إسبانيا"],
  India: ["India", "هند", "الهند"],
  China: ["China", "چین", "الصين"],
  Japan: ["Japan", "ژاپن", "اليابان"],
  Russia: ["Russia", "روسیه", "روسيا"],
  Poland: ["Poland", "لهستان", "بولندا"],
  Belgium: ["Belgium", "بلژیک", "بلجيكا"],
  Jamaica: ["Jamaica", "جامائیکا", "جامايكا"],
  Austria: ["Austria", "اتریش", "النمسا"],
  Netherlands: ["Netherlands", "هلند", "هولندا"],
  Mexico: ["Mexico", "مکزیک", "المكسيك"],
  Egypt: ["Egypt", "مصر", "مصر"],
  Greece: ["Greece", "یونان", "اليونان"],
  Serbia: ["Serbia", "صربستان", "صربيا"],
  Switzerland: ["Switzerland", "سوئیس", "سويسرا"],
  "South Africa": ["South Africa", "آفریقای جنوبی", "جنوب أفريقيا"],
  Sweden: ["Sweden", "سوئد", "السويد"],
  Canada: ["Canada", "کانادا", "كندا"],
  Pakistan: ["Pakistan", "پاکستان", "باكستان"],
};


