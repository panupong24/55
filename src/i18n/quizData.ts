import { Question, QuizResultTier } from '../types';
import { SupportedLang } from './types';

import imgTiktokDance from '../assets/images/quiz_tiktok_dance_1790436314817.webp';
import imgCatCafe from '../assets/images/quiz_cat_cafe_1790436328359.webp';
import imgBlBackhug from '../assets/images/quiz_bl_backhug_1790436339591.webp';
import imgBangkokPride from '../assets/images/quiz_bangkok_pride_1790436349886.webp';
import imgIgFlatlay from '../assets/images/quiz_ig_flatlay_1790436360268.webp';
import imgDistractedBoyfriend from '../assets/images/quiz_distracted_boyfriend.webp';
import imgBlHearthands from '../assets/images/quiz_bl_hearthands_1790436371061.webp';
import imgThaiIcon from '../assets/images/quiz_thai_icon_1790436382078.webp';
import imgPageantQueen from '../assets/images/quiz_pageant_queen_1790434242170.webp';
import imgBtsGroup from '../assets/images/quiz_bts_group_1790436394487.webp';
import imgPrideMeme from '../assets/images/quiz_pride_meme_1790436405083.webp';
import imgTarotFortune from '../assets/images/quiz_tarot_fortune_1790434253591.webp';
import imgKpopWonyoung from '../assets/images/quiz_kpop_wonyoung_1790436416525.webp';
import imgWellImGay from '../assets/images/quiz_well_im_gay.webp';

const questionImages = [
  imgTiktokDance,
  imgCatCafe,
  imgBlBackhug,
  imgBangkokPride,
  imgIgFlatlay,
  imgDistractedBoyfriend,
  imgBlHearthands,
  imgThaiIcon,
  undefined,
  imgPageantQueen,
  imgBtsGroup,
  imgPrideMeme,
  imgTarotFortune,
  imgKpopWonyoung,
  imgWellImGay,
];

const illustrationTypes: Question['illustrationType'][] = [
  'tiktok',
  'music',
  'bl_series',
  'pride',
  'ig_story',
  'radar_gaze',
  'fanfic',
  'icons',
  'chat_judge',
  'pageant',
  'kpop',
  'slang_meme',
  'tarot',
  'stylist',
  'spectrum',
];

interface RawQuestionTranslation {
  title: string;
  category: string;
  hint: string;
  options: [string, string, string, string]; // index 0->score 0, 1->score 1, 2->score 2, 3->score 3
}

// Translations for all 15 questions
const questionsI18n: Record<SupportedLang, RawQuestionTranslation[]> = {
  th: [
    {
      title: 'เปิด TikTok เจอคลิปพระเอก/นางเอกซีรีส์วายไทยแดนซ์คัฟเวอร์ คุณ...',
      category: 'โซเชียลมีเดีย & ไวรัลแดนซ์',
      hint: 'เลือกการตอบสนองที่ตรงกับนิสัยการไถฟีดของคุณมากที่สุด',
      options: [
        'เลื่อนผ่านอย่างไว ไม่ได้หยุดดู',
        'ดูจบคลิปเดียว เพลินๆ ดี',
        'กดเซฟไว้ดูซ้ำ วนลูปไม่ต่ำกว่า 3 รอบ',
        'แคปหน้าจอส่งในกลุ่มเพื่อนพร้อมแคปชั่น "กรี๊ดดด"',
      ],
    },
    {
      title: 'เพลง T-pop/Lisa BLACKPINK ดังขึ้นในร้านกาแฟ คุณ...',
      category: 'ดนตรี & จังหวะในหัวใจ',
      hint: 'เมื่อบีทเพลงเริ่มกระแทก โสตประสาทสั่งการอย่างไร',
      options: [
        'ไม่สนใจ นั่งจิบกาแฟปกติ',
        'โยกหัวตามจังหวะเบาๆ พอกรุบกริบ',
        'ร้องเนื้อได้ทุกท่อน ฮัมตามไม่หยุด',
        'จำท่าเต้นได้แม่นยำระดับแดนเซอร์ พร้อมลุกขึ้นสับขา',
      ],
    },
    {
      title: 'ซีรีส์วาย (BL) สำหรับคุณคือ...',
      category: 'จักรวาลซีรีส์ & คู่จิ้น',
      hint: 'มุมมองของคุณต่อซีรีส์วายไทยที่กำลังครองโลก',
      options: [
        'ไม่เคยดู งงว่าคืออะไร',
        'เคยผ่านตาในฟีด รู้จักผิวเผิน',
        'ดูจบหลายเรื่องแล้ว มีคู่โปรดในดวงใจ',
        'จำได้ทุกคู่จิ้น ตามข่าวถ่ายแบบ ตามงานแฟนมีตทุกเสาร์-อาทิตย์',
      ],
    },
    {
      title: 'เพื่อนชวนไปงาน Pride เดือนมิถุนาที่สีลม/สยาม คุณ...',
      category: 'เทศกาล & พลังแห่งสีรุ้ง',
      hint: 'เมื่อปฏิทินก้าวเข้าสู่เดือนมิถุนายนอันเจิดจ้า',
      options: [
        'ขอผ่าน ไม่ใช่แนว คนเยอะเกินไป',
        'ไปเที่ยวเล่นก็ได้ เดินดูบรรยากาศชิลๆ',
        'ตื่นเต้นมาก เตรียมชุดล่วงหน้าเป็นสัปดาห์',
        'วางแผนลุคธีมสีรุ้งเป็นเดือน แถมรู้ประวัติ Pride ทุกปีอย่างถ่องแท้',
      ],
    },
    {
      title: 'ก่อนถ่ายรูปลง IG Story คุณ...',
      category: 'สไตล์ & การจัดองค์ประกอบ',
      hint: 'เบื้องหลังการอัปลงสตอรี่ที่คนอื่นเห็นเพียง 24 ชั่วโมง',
      options: [
        'ถ่ายมุมไหนก็ได้ ส่งเลย ไม่คิดเยอะ',
        'เลือกฟิลเตอร์นิดหน่อย ปรับแสงเบาๆ',
        'เซ็ตมุม แสง คอนเซปต์ล่วงหน้า หามุมหน้าที่รอด',
        'มีมู้ดบอร์ดคอนเทนต์ประจำสัปดาห์ โทนสีคุมโทนระดับโปรดักชัน',
      ],
    },
    {
      title: 'เจอคนเพศเดียวกันหน้าตาดีเดินผ่าน คุณคิดในใจว่า "อันนี้ต้องบอกว่าเริ่ด/หล่อมาก" บ่อยแค่ไหน',
      category: 'เรดาร์ & สายตาการชื่นชม',
      hint: 'ปฏิกิริยาอัตโนมัติในเสี้ยววินาทีที่คนหน้าตาดีเดินสวน',
      options: [
        'ไม่เคยคิดเลย เดินผ่านไปเฉยๆ',
        'นานๆ ที เมื่อคนนั้นโดดเด่นสะดุดตาจริงๆ',
        'บ่อยอยู่เหมือนกัน ตาไวสแกนเก่ง',
        'เป็นรีแอคชั่นอัตโนมัติทุกครั้ง หันคอแทบเคล็ด!',
      ],
    },
    {
      title: 'ดูซีรีส์วายแล้วคู่จิ้นยังไม่ได้ลงเอยกัน คุณ...',
      category: 'อารมณ์ร่วม & โลกแฟนฟิค',
      hint: 'เมื่อปมความรักในจอยังค้างคา หัวใจคนดูจะอยู่ได้อย่างไร',
      options: [
        'เฉยๆ ดูเพื่อความบันเทิง ไม่ได้ผูกพัน',
        'ลุ้นเหมือนดูซีรีส์ทั่วไป รอดูตอนหน้า',
        'อินหนักมาก ทวีตระบายความรู้สึก แท็กทวีตแตก',
        'ไปตามอ่านนิยาย ตามแฟนฟิคใน Twitter/AO3 จนถึงตีสี่',
      ],
    },
    {
      title: 'รู้จักไอคอน LGBTQ+ ไทย/สายบันเทิงแค่ไหน',
      category: 'คลังความรู้ & วงการป๊อปคัลเจอร์',
      hint: 'ระดับความคุ้นเคยกับดาวเด่นผู้ขับเคลื่อนวงการ',
      options: [
        'ไม่รู้จักเลย แทบไม่ได้ติดตาม',
        'พอรู้จักผ่านข่าว คุ้นหน้าบางคน',
        'ติดตามผลงาน เป็นแฟนคลับหลายคน',
        'รู้ทุกดีเทล วันเกิด ซิงเกิลแรก ไปงานแฟนมีตแทบทุกงาน',
      ],
    },
    {
      title: 'เพื่อนถามความเห็นว่า "คนนี้หล่อ/สวยไหม" ในกลุ่มแชท คุณ...',
      category: 'บทบาทในกลุ่มเพื่อน',
      hint: 'เมื่อภาพปริศนาถูกส่งเข้ามาในกรุ๊ปไลน์',
      options: [
        'เฉยๆ ไม่ค่อยออกความเห็น ปล่อยคนอื่นตอบ',
        'ตอบได้บ้าง "ก็น่ารักดีนะ"',
        'วิจารณ์ละเอียดยิบ สายตาแหลมคม วิเคราะห์โครงหน้า',
        'เพื่อนแท็กชื่อคุณเป็นคนแรกทุกครั้ง เพราะคุณคือคำตัดสินสูงสุด!',
      ],
    },
    {
      title: 'เวลาดูประกวดนางงาม (Miss Universe, Miss Grand ฯลฯ) คุณ...',
      category: 'เวทีมงกุฎ & โลกความงาม',
      hint: 'เทศกาลลุ้นมงระดับประเทศและระดับโลก',
      options: [
        'ไม่เคยดู ไม่สนใจเลย',
        'ดูรอบตัดสินรอบเดียวพอ ลุ้นว่าใครชนะ',
        'ดูทุกรอบ ชุดประจำชาติ ชุดว่ายน้ำ วิจารณ์ชุดราตรีฉ่ำๆ',
        'จำสถิติ คะแนน คำถามรอบสุดท้ายและคีย์เวิร์ดตอบจับใจได้ทุกปี',
      ],
    },
    {
      title: 'เพลย์ลิสต์เพลงที่ฟังบ่อยที่สุดตอนนี้มี K-pop boy group กี่เปอร์เซ็นต์',
      category: 'เพลย์ลิสต์ & ศิลปินคนโปรด',
      hint: 'สถิติเพลงในหูฟังที่เปิดวนอยู่ตลอดวัน',
      options: [
        'ไม่มีเลย ฟังแนวอื่นล้วนๆ',
        'มีบ้างนิดหน่อย เพลงฮิตติดหูทั่วไป',
        'เกินครึ่งเพลย์ลิสต์ เมโลดี้ติดชาร์ตแน่นเอี้ยด',
        'เป็นแฟนคลับตัวยง มีอัลบั้มครบทุกเวอร์ชัน ท่องแฟนชานท์คล่อง',
      ],
    },
    {
      title: 'เห็นคำว่า "สายเปย์" "ทำไมพี่เป็นแบบนี้" หรือมีมสายไทย LGBTQ+ ในฟีด คุณ...',
      category: 'มีม & วัฒนธรรมภาษาตัวแม่',
      hint: 'ความลื่นไหลในการใช้ศัพท์แสลงสุดไวรัล',
      options: [
        'งง ไม่เข้าใจมุก เลื่อนผ่านไปแบบมึนๆ',
        'พอเก็ตมุกบ้าง ขำตามเพื่อน',
        'ใช้ประจำในแชท พิมพ์เป็นภาษาหลักในชีวิตประจำวัน',
        'เป็นคนคิดมุกและเสิร์ฟสติกเกอร์ให้เพื่อนก่อนใครในกลุ่ม',
      ],
    },
    {
      title: 'ดวงประจำวัน/ไพ่ทาโรต์ที่บอกเรื่องความรัก คุณ...',
      category: 'สายมู & สัญชาตญาณหัวใจ',
      hint: 'ศาสตร์แห่งจักรวาลและดวงชะตาชีวิตรัก',
      options: [
        'ไม่เคยอ่าน ไม่เชื่อเรื่องพวกนี้',
        'อ่านผ่านๆ เอาฮา ไม่ได้ซีเรียส',
        'เช็กทุกวันก่อนออกจากบ้าน ใส่เสื้อสีมงคลตามตาราง',
        'มีหมอดูประจำตัว จำคำทำนายได้แม่นกว่าตารางเรียนตารางงาน',
      ],
    },
    {
      title: 'เพื่อนสนิทมาปรึกษาเรื่องแฟชั่น/แต่งหน้า คุณ...',
      category: 'กูรูสไตล์ & สไตลิสต์ส่วนตัว',
      hint: 'เมื่อมีคนต้องการความช่วยเหลือเรื่องโทนสีและเสื้อผ้า',
      options: [
        'ไม่รู้เรื่องเลย ช่วยไม่ได้จริงๆ',
        'ให้ความเห็นได้นิดหน่อย "ก็สวยดีนะแก"',
        'เป็นที่ปรึกษาประจำกลุ่ม บอกเฉดสีลิปสติกและรองเท้าที่เข้าคู่',
        'เพื่อนยกให้เป็นสไตลิสต์ประจำตัว ถามทุกเรื่องก่อนสแกนจ่ายเงินซื้อ',
      ],
    },
    {
      title: 'ถามตรงๆ เลย คุณประเมินตัวเองอยู่ตรงไหนของสเปกตรัม',
      category: 'บทสรุปความจริงใจในหัวใจ',
      hint: 'ข้อสุดท้าย... ซื่อสัตย์กับความรู้สึกของตัวเองที่สุด!',
      options: [
        'สเตรท 100% ไม่มีข้อสงสัยในความตรงเป๊ะ',
        'ก็มีแอบคิดบ้างแหละ สับสนนิดๆ พอเป็นสีสัน',
        'ลื่นไหล เปิดกว้างอยู่เหมือนกัน ความรักไร้พรมแดน',
        'ภูมิใจในตัวตนเต็มร้อย พร้อมโบกธงสีรุ้งสะบัดก้องโลก!',
      ],
    },
  ],

  en: [
    {
      title: 'Scrolling TikTok and a viral BL dance cover pops up on your feed, you...',
      category: 'Social Media & Viral Dance',
      hint: 'Pick the reaction that best matches your usual scrolling habits.',
      options: [
        'Scroll right past without pausing.',
        'Watch it once to the end, looks nice.',
        'Save it and rewatch on loop at least 3 times.',
        'Screenshot, send to friends with "OMG I AM SCREAMING!"',
      ],
    },
    {
      title: 'A groovy T-Pop or Lisa track plays in a trendy cafe, you...',
      category: 'Music & Heartbeat Rhythm',
      hint: 'When the bass drops, how do your instincts react?',
      options: [
        'Pay no attention, keep sipping coffee normally.',
        'Bob your head slightly to the beat.',
        'Know every lyric and hum along continuously.',
        'Know the full choreo like a main dancer, ready to strut!',
      ],
    },
    {
      title: 'Boys’ Love (BL) series to you are...',
      category: 'Series Universe & Ships',
      hint: 'Your take on the global sensation of BL dramas.',
      options: [
        'Never watched, not sure what that is.',
        'Seen clips passing by on my feed, vaguely familiar.',
        'Finished several series, have my ultimate favorite ship.',
        'Know every couple, follow every photoshoot and fan-meeting.',
      ],
    },
    {
      title: 'Friends invite you to the huge city Pride Parade in June, you...',
      category: 'Festivals & Rainbow Power',
      hint: 'When June arrives with vibrant celebration.',
      options: [
        'Pass, not my thing, crowds are too overwhelming.',
        'Might go stroll around and enjoy the chilled vibe.',
        'Super hyped, outfit planned a week in advance.',
        'Planning rainbow looks for a month, know Pride history by heart.',
      ],
    },
    {
      title: 'Before posting a photo to your Instagram Story, you...',
      category: 'Style & Aesthetic Composition',
      hint: 'The secret prep behind a 24-hour temporary story.',
      options: [
        'Snap whatever angle and post immediately without thought.',
        'Slap on a quick filter and adjust brightness slightly.',
        'Plan angle, lighting, and concept carefully for the best face view.',
        'Maintain a weekly moodboard with studio-level color grading.',
      ],
    },
    {
      title: 'An attractive person of the same gender walks by, how often do you think "Damn, they are gorgeous!"',
      category: 'Radar & Appreciation Gaze',
      hint: 'Your involuntary split-second reaction in public.',
      options: [
        'Never really cross my mind, just walk past.',
        'Rarely, only if they truly stand out in the crowd.',
        'Quite often, my radar scans sharp and fast.',
        'Instant automatic reflex every single time, almost broke my neck!',
      ],
    },
    {
      title: 'Watching a romantic series and the couple hasn’t confessed yet, you...',
      category: 'Emotional Investment & Fanfic',
      hint: 'When on-screen tension is peaking, how does your heart cope?',
      options: [
        'Indifferent, just casual entertainment.',
        'Anticipating the next episode like any normal TV show.',
        'Deeply invested, live-tweeting up a storm on social media.',
        'Reading fanfics on AO3 and Twitter until 4:00 AM.',
      ],
    },
    {
      title: 'How well do you know prominent LGBTQ+ icons & pop stars?',
      category: 'Pop Culture Knowledge',
      hint: 'Your familiarity with stars shaping the entertainment scene.',
      options: [
        'Don’t know any, rarely follow entertainment news.',
        'Recognize a few famous faces from headlines.',
        'Follow their work, fan of multiple icons.',
        'Know their debut dates, birthdays, and attend all their events.',
      ],
    },
    {
      title: 'A friend drops a photo in the group chat asking "Are they hot?", you...',
      category: 'Group Chat Role',
      hint: 'When a mystery photo lands in your main group chat.',
      options: [
        'Silent, rarely comment, let others answer.',
        'Offer a mild response like "Yeah, cute I guess."',
        'Detailed facial analysis: jawline, cheekbones, aesthetic ratio.',
        'Friends tag you first because your verdict is the supreme supreme court!',
      ],
    },
    {
      title: 'When beauty pageants (Miss Universe, Miss Grand, etc.) air, you...',
      category: 'Crowns & Pageantry',
      hint: 'The annual spectacle of glamour and crowning moments.',
      options: [
        'Never watch, not interested at all.',
        'Watch only the finale coronation to see who wins.',
        'Watch every round: evening gown, national costume, commentary ready.',
        'Memorized final Q&A answers, scores, and statistics across years.',
      ],
    },
    {
      title: 'What percentage of your most played playlist consists of K-pop boy groups?',
      category: 'Playlists & Favorite Artists',
      hint: 'The listening stats on your earphones throughout the day.',
      options: [
        'Zero percent, listen exclusively to other genres.',
        'A couple of viral chart-toppers here and there.',
        'Over half my playlist, catchy melodies everywhere.',
        'Hardcore stan, own every album version, chant fan chants flawlessly.',
      ],
    },
    {
      title: 'Seeing viral Pride memes and diva slang filling up your feed, you...',
      category: 'Memes & Diva Slang Culture',
      hint: 'How fluid is your grasp of the latest internet humor?',
      options: [
        'Confused, don’t get the joke, scroll past blankly.',
        'Catch on somewhat, laugh along with friends.',
        'Use slang regularly in daily chats as second nature.',
        'The one inventing the jokes and supplying custom stickers first.',
      ],
    },
    {
      title: 'Daily horoscopes or tarot card love predictions, you...',
      category: 'Mysticism & Heart Intuition',
      hint: 'The mystical universe and romantic destiny.',
      options: [
        'Never read them, don’t believe in that stuff.',
        'Skim through for laughs, don’t take it seriously.',
        'Check daily before heading out, wear lucky colors according to charts.',
        'Have personal tarot readers, know prophecies better than school schedules.',
      ],
    },
    {
      title: 'A close friend asks for fashion / makeup advice before a date, you...',
      category: 'Style Guru & Personal Stylist',
      hint: 'When someone desperately needs color palette and outfit guidance.',
      options: [
        'Clueless, honestly cannot help them.',
        'Give a brief polite opinion: "Looks nice on you!"',
        'Group consultant: recommend exact matching lipstick shades & shoes.',
        'Their designated personal stylist; they verify every purchase with you first.',
      ],
    },
    {
      title: 'Honest question: where would you place yourself on the rainbow spectrum?',
      category: 'Honest Heart Conclusion',
      hint: 'Final question... be 100% true to yourself!',
      options: [
        '100% straight, no doubts whatsoever.',
        'Occasionally wonder, a tiny spark of curious colorful reflection.',
        'Fluid and open-minded, love knows no borders.',
        '100% proudly radiating rainbow energy to the whole universe!',
      ],
    },
  ],

  zh: [
    {
      title: '在短视频上刷到热门双男主剧主角的帅气舞蹈挑战，你会...',
      category: '社交媒体 & 热门舞蹈',
      hint: '选出最符合你日常刷视频习惯的反应。',
      options: [
        '快速划过，完全不作停留。',
        '顺手看完一遍，觉得挺养眼。',
        '点击收藏反复观看，至少循环3遍以上。',
        '截图发进闺蜜群狂呼“救命啊这也太绝了！”',
      ],
    },
    {
      title: '咖啡馆里响起了超带感的流行舞曲或Lisa的歌，你...',
      category: '音乐 & 律动心跳',
      hint: '当节奏鼓点响起，你的神经中枢会怎样反应？',
      options: [
        '无动于衷，继续平静地喝咖啡。',
        '随着节奏轻轻点头晃脑。',
        '每一句歌词都能跟唱，忍不住轻声跟哼。',
        '对编舞动作了如指掌，恨不得当场起身热舞！',
      ],
    },
    {
      title: '双男主剧（BL）对你来说意味着...',
      category: '影视剧宇宙 & 磕CP',
      hint: '你对风靡全球的泰剧及双男主影视的看法。',
      options: [
        '从没看过，也不清楚是什么。',
        '在首页偶尔刷到过片段，略有耳闻。',
        '看过好几部热门剧，心里有锁死的本命CP。',
        '对每对大火CP如数家珍，杂志图和见面会全勤打卡。',
      ],
    },
    {
      title: '六月骄阳正好，朋友邀请你参加城市骄傲游行（Pride），你...',
      category: '盛典 & 彩虹力量',
      hint: '当多元与包容的彩虹月来临。',
      options: [
        '婉拒，人太多太吵，不适合我。',
        '去逛逛也行，感受一下轻松热闹的氛围。',
        '超级兴奋，提前一周就把穿搭准备好了。',
        '提前一个月精心构思彩虹主题OOTD，对Pride历史了如指掌。',
      ],
    },
    {
      title: '在社交软件发布动态照片前，你通常会...',
      category: '审美 & 视觉构图',
      hint: '在一条只展示24小时的故事背后的准备工作。',
      options: [
        '随手拍了直接发，不假思索。',
        '套个现成滤镜，简单调一下亮度。',
        '仔细研究构图、光线和面部最佳角度。',
        '拥有专属视觉Moodboard，调色和排版完全是杂志级别。',
      ],
    },
    {
      title: '迎面走过一位极具魅力的同性，你在心里赞叹“哇太好看了”的频率是？',
      category: '雷达 & 审美扫描',
      hint: '帅哥美女擦肩而过瞬间的无意识生理反应。',
      options: [
        '几乎从不注意，径直走过。',
        '偶尔，只有对方特别惊艳出众时才会多看一眼。',
        '挺频繁的，眼神锐利且擅长捕捉高颜值。',
        '每次都会条件反射，回头率高到脖子快扭到！',
      ],
    },
    {
      title: '追剧时CP迟迟没有挑明心意走到一起，你...',
      category: '情绪共鸣 & 同人宇宙',
      hint: '荧幕里的暧昧拉扯悬而未决，屏幕前的你如何自处？',
      options: [
        '毫无波澜，纯粹当普通电视剧看。',
        '跟着剧情走，期待下一集会怎么演。',
        '深深共情，在社交平台上疯狂发帖倾诉心情。',
        '熬夜刷同人文和二创剪辑直到凌晨四点。',
      ],
    },
    {
      title: '你对娱乐圈中的彩虹Icon与知名偶像了解多少？',
      category: '娱乐知识库',
      hint: '你对推动流行风尚的明星名人的熟悉程度。',
      options: [
        '完全不了解，平时几乎不关注娱乐八卦。',
        '在热搜新闻上见过，部分面孔有点眼熟。',
        '关注他们的动态与作品，粉过不少人。',
        '出道日、生日、名场面全背得出来，演唱会见面会从不缺席。',
      ],
    },
    {
      title: '好友在聊天群里发照片问“这个人好看吗？”，你...',
      category: '群聊角色 & 颜值裁判',
      hint: '当神秘照片空降在闺蜜/好友群里。',
      options: [
        '沉默围观，几乎不发表意见，让别人先说。',
        '客套附和一句“还挺清秀/可爱的”。',
        '开启毒舌审视模式，精准分析骨相、五官比例和穿搭。',
        '群友第一时间艾特你，因为你是全群的最高颜值法官！',
      ],
    },
    {
      title: '每当选美大赛（环球小姐等）开播时，你...',
      category: '皇冠舞台 & 盛世美颜',
      hint: '一年一度的争奇斗艳与封冠高光时刻。',
      options: [
        '从不收看，毫不感兴趣。',
        '只看看最终加冕结果，瞧瞧谁夺冠了。',
        '全程追看：国服、泳装和晚礼服，边看边专业点评。',
        '对历届问答金句、台步特点与比分数据倒背如流。',
      ],
    },
    {
      title: '你最常听的常驻歌单里，韩系流行男团的歌曲占比大概是多少？',
      category: '歌单 & 本命歌手',
      hint: '耳机里全天候循环播放的音乐统计。',
      options: [
        '完全没有，只听其他类型的音乐。',
        '偶尔有几首火爆出圈的大热曲。',
        '超过半张歌单，上头洗脑的副歌旋律满满当当。',
        '铁杆追星人，各版本专辑全齐，应援口号倒背如流。',
      ],
    },
    {
      title: '刷到网络上的彩虹热梗或女明星口头禅表情包，你...',
      category: '网络流行梗 & 语言艺术',
      hint: '你对冲浪潮言潮语的敏锐度如何？',
      options: [
        '一头雾水，看不太懂，茫然划过。',
        '大概能get到点，跟着大家笑笑。',
        '日常聊天高频使用，已经成为生活主要语言体系。',
        '造梗先锋，全群最新最辣的表情包都出自你手。',
      ],
    },
    {
      title: '关于每日星座运势或塔罗牌恋爱指引，你...',
      category: '玄学直觉 & 心灵指引',
      hint: '宇宙星盘与心动走向的神秘学探索。',
      options: [
        '从不阅读，坚决不信这些。',
        '随便扫一眼图个乐，从不往心里去。',
        '出门前必查当日指引，严格按照幸运色搭配衣服。',
        '有御用占卜师，对运势指引记得比上课上班日程还清楚。',
      ],
    },
    {
      title: '好友约会前向你紧急求助穿搭和妆容，你...',
      category: '造型顾问 & 个人造型师',
      hint: '当有人急需色彩美学与穿搭救赎。',
      options: [
        '毫无概念，实在帮不上忙。',
        '简单客套一句“挺好看的挺适合你”。',
        '全能造型顾问：精确指出哪支口红色号和哪双高跟鞋最搭。',
        '被奉为御用设计师：下单付款前必先拍照向你汇报审核！',
      ],
    },
    {
      title: '坦白局：如果给自己在彩虹光谱上的位置打分，你觉得自己是？',
      category: '真我心声总结',
      hint: '最后一题……忠于你内心深处最真实的感受！',
      options: [
        '纯正钢铁直，毫无任何动摇。',
        '偶尔也有过好奇的小火花，作为平淡生活的一抹亮色。',
        '心境流动开放，爱本来就无拘无束、超越性别界限。',
        '自信闪耀的彩虹化身，随时准备向全世界高举自豪旗帜！',
      ],
    },
  ],

  ja: [
    {
      title: 'TikTokで話題のBLドラマ主演によるダンスカバー動画が流れてきたら...',
      category: 'SNS & バズダンス',
      hint: '普段のスクロール習慣に最も近い行動を選んでください。',
      options: [
        '止まらずにすぐ次の動画へスワイプする。',
        '最後まで一度見て「いいね」と思う。',
        'お気に入り保存して少なくとも3回以上ループ再生する。',
        'スクショを撮って友達に「尊死した！」と即シェアする。',
      ],
    },
    {
      title: 'カフェでT-PopやLisaのスタイリッシュな曲が流れてきたら...',
      category: '音楽 & リズムの鼓動',
      hint: 'ビートが鳴り響いたとき、あなたの体はどう反応する？',
      options: [
        '気にせず、普段通りコーヒーを飲み続ける。',
        'リズムに合わせて軽く首を揺らす程度。',
        '歌詞を完全に覚えていて、思わず口ずさんでしまう。',
        'メインダンサー並みに振付が完璧で、今すぐ立ち上がって踊りたい！',
      ],
    },
    {
      title: 'あなたにとって「BLドラマ」とは...',
      category: 'ドラマの世界 & 推しカップル',
      hint: '世界中でブームを巻き起こしているBL作品への印象。',
      options: [
        '見たことがなく、どんなものかよく知らない。',
        'SNSで見かけたことがあり、何となく知っている程度。',
        '何作も完走していて、心に決めた推しケミがある。',
        '全ペアを把握し、雑誌グラビアやファンミ情報も全追跡。',
      ],
    },
    {
      title: '友達から6月のプライドパレードに誘われたら、あなたなら...',
      category: 'フェスティバル & レインボーパワー',
      hint: '多様性を祝福する鮮やかな季節がやってきたとき。',
      options: [
        'パスする。人混みが多すぎて苦手。',
        '散歩がてら雰囲気を楽しみに行くのはあり。',
        '大興奮！1週間前からコーデを念入りに準備する。',
        '1ヶ月前からレインボーコーデを企画し、パレードの歴史も熟知。',
      ],
    },
    {
      title: 'Instagramストーリーに写真を投稿する前の準備は？',
      category: 'スタイル & 構図へのこだわり',
      hint: '24時間で消える日常の裏に隠された美学。',
      options: [
        '適当な角度ですぐ撮ってそのままアップする。',
        'フィルターをサッとかけて明るさを微調整するくらい。',
        '光の当たり方、角度、小物の配置までベストを計算する。',
        '週間ムードボードを作成し、雑誌並みの色味管理を徹底する。',
      ],
    },
    {
      title: '街で魅力的な同性とすれ違った時、「素敵すぎる！」と心の中で思う頻度は？',
      category: 'レーダー & 称賛の視線',
      hint: '魅力的な人とすれ違った瞬間の反射的な反応。',
      options: [
        'ほぼ思ったことがない。普通に通り過ぎる。',
        'たまに、本当に目を引く人がいた時だけ。',
        'かなり頻繁。美男美女を瞬時に見分けるレーダーが作動する。',
        'すれ違うたび無意識に反応し、首が痛くなるほど振り返ってしまう！',
      ],
    },
    {
      title: '恋愛ドラマで推しペアがなかなか結ばれないとき、あなたなら...',
      category: '感情移入 & 二次創作の世界',
      hint: '画面上のすれ違いに胸が締め付けられたとき。',
      options: [
        '特に気にしない。ただのエンタメとして気楽に観る。',
        '一般的なドラマ同様、次の展開を楽しみに待つ。',
        '感情移入しまくりで、SNSに想いを書き殴る。',
        '深夜4時までTwitterやファンフィクサイトで二次創作を読み漁る。',
      ],
    },
    {
      title: 'LGBTQ+アイコンやエンタメ界のセレブにどれくらい詳しい？',
      category: 'ポップカルチャー知識',
      hint: 'カルチャーを牽引する人気スターたちへの親しみ度。',
      options: [
        '全く知らない。普段エンタメニュースも見ない。',
        'ニュースで見たことがあり、顔と名前が少し一致する程度。',
        '活動を追っていて、推しているアイコンが何人もいる。',
        'デビュー日や誕生日を網羅し、イベントにも欠かさず参加する。',
      ],
    },
    {
      title: 'グループチャットで「この人かっこいい/可愛い？」と聞かれたら...',
      category: 'グループ内での役割',
      hint: '謎の写真がグループLINEに投下された瞬間。',
      options: [
        '静観する。あまり意見せず他の人に任せる。',
        '「うん、可愛いと思うよ」と無難に答える。',
        '骨格、パーツ配置、スタイリングまで鋭く徹底分析する。',
        'あなたの判定が最高権威なので、真っ先にメンションされる！',
      ],
    },
    {
      title: 'ミス・ユニバースなどの世界的なビューティーコンテストを見るとき...',
      category: 'クラウン & 美の頂点',
      hint: '年に一度の華やかなティアラ決定戦。',
      options: [
        '見たことがない。関心もない。',
        '誰が優勝したか最終結果だけチェックする。',
        'ナショナルコスチュームからドレス審査まで全部見てガチ講評。',
        '歴代のスピーチ、質疑応答のキラーフレーズ、得点まで覚えている。',
      ],
    },
    {
      title: '一番よく聴くお気に入りプレイリストのうち、K-popボーイズグループの割合は？',
      category: 'プレイリスト & お気に入り',
      hint: '一日中イヤホンから流れている音楽の傾向。',
      options: [
        'ゼロ。他のジャンルしか聴かない。',
        '流行っているヒット曲が数曲入っているくらい。',
        '半分以上。中毒性のあるキャッチーなメロディでぎっしり。',
        '熱烈なファン。アルバム全種買い、掛け声も完璧に暗記。',
      ],
    },
    {
      title: 'SNSでレインボーカルチャー由来のスラングやミームを見かけたら...',
      category: 'ミーム & トレンドスラング',
      hint: 'ネット上の最新スラングへの馴染みやすさ。',
      options: [
        '意味が分からず困惑し、そのままスルーする。',
        'なんとなくノリは理解して一緒に笑う。',
        '普段のチャットで日常語として自然に使いこなしている。',
        '自分で流行り言葉を広め、最新スタンプを仲間へいち早く届ける。',
      ],
    },
    {
      title: '毎日のタロット占いや恋愛運診断について、あなたなら...',
      category: 'スピリチュアル & 直感',
      hint: '星のめぐりとロマンスの運命。',
      options: [
        '読んだことがない。そういったものは信じない。',
        '暇つぶしとして楽しむ程度で本気にはしない。',
        '出かける前に毎日チェックし、ラッキーカラーの服を着る。',
        '専属占い師がいて、予定表より予言の内容を熟知している。',
      ],
    },
    {
      title: '親友からデート前のファッションやメイクの相談を受けたら...',
      category: 'スタイル顧問 & スタイリスト',
      hint: '誰かが服の組み合わせや色使いで助けを求めているとき。',
      options: [
        '全く知識がないので力になれない。',
        '「うん、似合ってるよ！」と簡単に褒める。',
        'リップの色味から靴のトーンまで具体的にアドバイスする。',
        '専属スタイリスト扱いされ、会計前に必ずあなたに写真確認が来る。',
      ],
    },
    {
      title: '正直なところ、自分のアイデンティティや魅力はどのあたりにあると思う？',
      category: 'ありのままの自己診断',
      hint: '最後の質問……自分自身の心に一番正直に！',
      options: [
        '完全にストレート。迷いは一切ない。',
        'たまに心が揺れることもある。人生の彩りとして少し考える程度。',
        '柔軟でオープン。愛に境界線はないと思っている。',
        'レインボーの輝きに満ち溢れ、プライドを持って自分を表現できる！',
      ],
    },
  ],

  ko: [
    {
      title: '틱톡 피드를 넘기다가 화제의 비엘 드라마 주인공 댄스 챌린지가 떴을 때, 당신은...',
      category: 'SNS & 바이럴 댄스',
      hint: '평소 스크롤 습관과 가장 잘 맞는 반응을 선택하세요.',
      options: [
        '멈추지 않고 바로 다음 영상으로 슥 넘긴다.',
        '끝까지 한 번 보고 "오 괜찮네" 하고 만다.',
        '저장해 두고 최소 3번 이상 무한 반복 재생한다.',
        '캡처해서 친구 단톡방에 "미쳤다 대박!" 외치며 공유한다.',
      ],
    },
    {
      title: '힙한 카페에서 리사(LISA)나 트렌디한 팝 음악이 흘러나올 때, 당신은...',
      category: '음악 & 심장 박동',
      hint: '비트가 터져 나올 때 내 몸의 본능적인 반응은?',
      options: [
        '전혀 신경 쓰지 않고 차분히 커피만 마신다.',
        '비트에 맞춰 가볍게 고개만 까딱거린다.',
        '가사를 완벽히 꿰고 있어 저절로 흥얼거린다.',
        '안무 디테일까지 메인 댄서급으로 숙지, 당장 일어나서 출 기세다.',
      ],
    },
    {
      title: 'BL(Boys Love) 드라마에 대한 당신의 생각은...',
      category: '드라마 세계관 & 케미',
      hint: '글로벌 신드롬을 일으키고 있는 BL 콘텐츠에 대한 나의 시선.',
      options: [
        '본 적도 없고 뭔지 잘 모른다.',
        '피드에서 스쳐 지나가며 얼핏 들어본 정도다.',
        '여러 작품을 완주했고 마음에 품은 최애 커플이 있다.',
        '모든 페어를 꿰뚫고 있으며 화보와 팬미팅까지 올클리어한다.',
      ],
    },
    {
      title: '6월 서울 퀴어문화축제나 프라이드 행사에 친구가 가자고 한다면, 당신은...',
      category: '페스티벌 & 무지개 파워',
      hint: '다양성과 긍정의 에너지가 넘치는 축제의 계절.',
      options: [
        '패스. 사람이 너무 많고 내 취향이 아니다.',
        '분위기 구경할 겸 가볍게 놀러 가보는 건 괜찮다.',
        '초흥분 상태! 일주일 전부터 입고 갈 룩을 세팅한다.',
        '한 달 전부터 레인보우 테마 룩을 기획하고 역대 역사까지 섭렵했다.',
      ],
    },
    {
      title: '인스타그램 스토리에 사진을 올리기 직전, 당신은...',
      category: '스타일 & 감성 구도',
      hint: '24시간 동안 노출되는 일상 컷의 숨은 준비 과정.',
      options: [
        '아무 각도에서나 찍어서 고민 없이 바로 올린다.',
        '간단한 필터 하나 씌우고 밝기만 살짝 조절한다.',
        '자연광, 턱선, 구도, 소품 배치까지 세심하게 맞춘다.',
        '주간 무드보드를 운영하며 잡지 화보급 톤앤매너를 유지한다.',
      ],
    },
    {
      title: '길에서 매력적인 동성을 마주쳤을 때 속으로 "와 진짜 매력 있다/잘생겼다" 감탄하는 빈도는?',
      category: '스캔 레이더 & 감탄의 시선',
      hint: '멋진 사람이 스쳐 지나가는 찰나의 무의식적 반응.',
      options: [
        '거의 생각해 본 적 없다. 그냥 무심하게 지나친다.',
        '아주 가끔, 정말 눈에 띄게 특별한 사람일 때만.',
        '꽤 자주 있다. 눈썰미가 좋아서 순식간에 스캔한다.',
        '마주칠 때마다 자동 반사, 목이 꺾일 정도로 돌아본다!',
      ],
    },
    {
      title: '로맨스 드라마에서 주인공들이 엇갈리고 아직 마음을 확인하지 못했을 때, 당신은...',
      category: '과몰입 & 팬픽의 세계',
      hint: '화면 속 애타는 텐션 앞에서 내 심장의 대처법.',
      options: [
        '무덤덤하다. 그냥 가벼운 예능/드라마 보듯 본다.',
        '보통 드라마처럼 다음 회차가 어떨지 기다려진다.',
        '과몰입 폭발! 트위터나 커뮤니티에 앓는 글을 쏟아낸다.',
        '새벽 4시까지 관련 팬픽과 2차 창작물을 찾아 밤을 지새운다.',
      ],
    },
    {
      title: '엔터계의 다양한 LGBTQ+ 아이콘과 팝스타들에 대해 얼마나 알고 있나요?',
      category: '팝컬처 지식 창고',
      hint: '트렌드를 이끄는 스타들과의 친밀도.',
      options: [
        '전혀 모른다. 연예 뉴스도 거의 안 본다.',
        '이슈를 통해 얼굴이나 이름 정도는 들어봤다.',
        '작품이나 활동을 챙겨보고 응원하는 팬이다.',
        '데뷔일, 생일, 시그니처 명장면까지 완벽하게 기억한다.',
      ],
    },
    {
      title: '친구가 단톡방에 "이 사람 어때? 괜찮아?" 사진을 올렸을 때, 당신은...',
      category: '단톡방 판사 역할',
      hint: '단톡방에 의문의 사진이 투척된 순간.',
      options: [
        '조용히 침묵. 다른 애들이 답할 때까지 둔다.',
        '"응 훈훈하네/귀엽네" 하고 무난하게 맞장구친다.',
        '이목구비 조화, 골격, 스타일링까지 정밀 분석 들어간다.',
        '당신의 감별력이 절대 법관 수준이라 친구들이 제일 먼저 태그한다!',
      ],
    },
    {
      title: '미스 유니버스 같은 대형 미인대회가 방영될 때, 당신은...',
      category: '티아라 & 뷰티의 세계',
      hint: '화려한 드레스와 여왕의 탄생을 지켜보는 순간.',
      options: [
        '한 번도 본 적 없고 관심도 없다.',
        '누가 우승했는지만 최종 발표만 찾아본다.',
        '전통의상, 수영복, 이브닝드레스까지 다 보며 실시간 평을 남긴다.',
        '역대 최종 인터뷰 모범 답안과 점수 통계까지 줄줄 외운다.',
      ],
    },
    {
      title: '매일 듣는 최애 플레이리스트에서 보이그룹 K-pop의 비중은?',
      category: '플레이리스트 & 최애 아티스트',
      hint: '이어폰 속에서 하루 종일 반복되는 선곡 통계.',
      options: [
        '전혀 없다. 다른 장르의 음악만 듣는다.',
        '대중적인 메가 히트곡 몇 곡 정도 담겨 있다.',
        '절반 이상. 중독성 넘치는 킬링 파트 곡들로 가득 차 있다.',
        '찐팬 모드. 앨범 버전별 소장, 응원법도 완벽 마스터.',
      ],
    },
    {
      title: 'SNS에서 유행하는 주접 밈이나 찰진 유행어 짤을 봤을 때, 당신은...',
      category: '밈 & 신조어 감각',
      hint: '인터넷 최신 밈과 트렌드 언어에 대한 흡수력.',
      options: [
        '무슨 말인지 이해가 안 돼서 멍하니 넘긴다.',
        '대충 뉘앙스는 알아듣고 친구들과 웃는다.',
        '일상 카톡에서 주 언어로 능숙하게 써먹는다.',
        '유행어를 먼저 캐치해 단톡방에 짤을 선사하는 주동자다.',
      ],
    },
    {
      title: '오늘의 타로 운세나 연애운 점괘를 접했을 때, 당신은...',
      category: '타로 직관 & 운명의 이끌림',
      hint: '우주의 에너지와 사랑의 방향에 대한 나의 태도.',
      options: [
        '절대 안 본다. 그런 거 안 믿는다.',
        '재미 삼아 쓱 훑어보고 진지하게 생각 안 한다.',
        '외출 전 매일 체크하고 행운의 컬러 맞춰 입는다.',
        '전담 타로 마스터가 있고 학업/업무 일정보다 운세 조언을 더 잘 외운다.',
      ],
    },
    {
      title: '절친이 데이트 전 패션/메이크업 조언을 구해왔을 때, 당신은...',
      category: '스타일 멘토 & 개인 스타일리스트',
      hint: '누군가 컬러 조합과 룩 매칭에 구조 요청을 보냈을 때.',
      options: [
        '전혀 몰라서 솔직히 도와줄 수가 없다.',
        '"응 나쁘지 않아 예뻐!" 정도만 말해준다.',
        '찰떡 립스틱 컬러부터 구두 톤까지 디테일하게 코칭한다.',
        '친구의 전담 코디 취급, 결제하기 전에 무조건 사진 찍어 검사받는다.',
      ],
    },
    {
      title: '솔직히 터놓고 말해서, 본인의 스펙트럼은 어디쯤에 있다고 생각하나요?',
      category: '진솔한 마음의 총정리',
      hint: '마지막 질문... 내 마음속 가장 솔직한 울림에 귀 기울여보세요!',
      options: [
        '100% 스트레이트. 의심의 여지 없이 확실하다.',
        '가끔 호기심 어린 마음이 들기도 한다. 삶의 소소한 자극 정도.',
        '유연하고 개방적이다. 사랑에는 정해진 틀이나 성별의 한계가 없다.',
        '내 안의 다채로운 무지개 매력을 당당하고 자랑스럽게 표현한다!',
      ],
    },
  ],

  es: [
    {
      title: 'Navegando en TikTok te encuentras con un baile viral de protagonistas de serie BL, tú...',
      category: 'Redes Sociales y Baile Viral',
      hint: 'Elige la reacción que mejor se adapte a tu forma de deslizar la pantalla.',
      options: [
        'Paso de largo rápidamente sin detenerme a mirar.',
        'Lo miro una vez hasta el final, está entretenido.',
        'Lo guardo en favoritos y lo reproduzco al menos 3 veces seguidas.',
        'Tomo captura de pantalla y lo mando al grupo gritando "¡DIOS MÍO QUÉ FANTASÍA!"',
      ],
    },
    {
      title: 'Suena un tema pegajoso de T-Pop o Lisa en una cafetería moderna, tú...',
      category: 'Música y Ritmo en el Corazón',
      hint: 'Cuando el ritmo explota, ¿cómo reacciona tu cuerpo?',
      options: [
        'No le presto atención, sigo tomando mi café con calma.',
        'Muevo la cabeza suavemente al compás del ritmo.',
        'Me sé cada estrofa y tarareo sin parar.',
        '¡Me sé toda la coreografía al nivel de bailarín principal listo para la pasarela!',
      ],
    },
    {
      title: 'Las series Boys’ Love (BL) para ti son...',
      category: 'Universo de Series y Parejas',
      hint: 'Tu opinión sobre el fenómeno mundial de los dramas BL.',
      options: [
        'Nunca las he visto, no sé muy bien de qué tratan.',
        'Las he visto pasar por mi feed, las ubico superficialmente.',
        'He terminado varias series y tengo mi pareja favorita absoluta.',
        'Conozco a todas las parejas, sigo sus sesiones de fotos y eventos de fans.',
      ],
    },
    {
      title: 'Tus amigos te invitan a la gran marcha del Orgullo en junio, tú...',
      category: 'Festivales y Poder Arcoíris',
      hint: 'Cuando llega junio con su celebración multicolor.',
      options: [
        'Paso, no es mi estilo, hay demasiada multitud.',
        'Podría ir a dar una vuelta y disfrutar del ambiente relajado.',
        '¡Súper emocionado/a! Preparo mi outfit con una semana de anticipación.',
        'Planeo mi look temático un mes antes y conozco la historia del Orgullo al dedillo.',
      ],
    },
    {
      title: 'Antes de subir una foto a tu historia de Instagram, tú...',
      category: 'Estilo y Composición Visual',
      hint: 'La preparación detrás de una historia que solo durará 24 horas.',
      options: [
        'Tomo la foto desde cualquier ángulo y la subo sin pensarlo.',
        'Le pongo un filtro rápido y ajusto un poco el brillo.',
        'Planifico el ángulo, la iluminación y el concepto para lucir el mejor perfil.',
        'Tengo un tablero de inspiración semanal y mantengo una paleta de color profesional.',
      ],
    },
    {
      title: 'Pasa alguien atractivo de tu mismo género, ¿con qué frecuencia piensas "¡Qué porte y qué belleza!"?',
      category: 'Radar y Mirada de Admiración',
      hint: 'Tu reacción espontánea de un segundo al cruzarte con alguien llamativo.',
      options: [
        'Rara vez se me cruza por la mente, sigo caminando normal.',
        'De vez en cuando, solo si la persona realmente destaca mucho.',
        'Bastante seguido, mi radar visual escanea con mucha rapidez.',
        '¡Es un reflejo automático instantáneo, casi me fracturo el cuello de tanto mirar!',
      ],
    },
    {
      title: 'Viendo una serie romántica y la pareja aún no se confiesa sus sentimientos, tú...',
      category: 'Involucramiento Emocional y Fanfics',
      hint: 'Cuando la tensión en pantalla llega al clímax, ¿cómo responde tu corazón?',
      options: [
        'Indiferente, solo la veo como simple pasatiempo.',
        'A la expectativa del siguiente capítulo como en cualquier serie.',
        'Totalmente involucrado/a, publicando desahogos en redes sociales.',
        'Leyendo historias y fanfics en Twitter y AO3 hasta las 4:00 de la madrugada.',
      ],
    },
    {
      title: '¿Qué tan bien conoces a los grandes íconos y celebridades LGBTQ+?',
      category: 'Cultura Pop y Entretenimiento',
      hint: 'Tu cercanía con las estrellas que marcan tendencia.',
      options: [
        'No conozco a casi nadie, apenas sigo noticias de espectáculos.',
        'Ubico a algunas figuras famosas por titulares y noticias.',
        'Sigo su trabajo y me considero fan de varios íconos.',
        'Conozco fechas de debut, cumpleaños y sigo todas sus presentaciones.',
      ],
    },
    {
      title: 'Un amigo envía una foto al chat grupal preguntando "¿Es guapo/a?", tú...',
      category: 'Rol en el Chat Grupal',
      hint: 'Cuando una foto misteriosa cae en el grupo de amigos.',
      options: [
        'Silencio, casi no opino, dejo que los demás contesten.',
        'Doy una respuesta tibia: "Sí, se ve simpático/a".',
        'Análisis minucioso: estructura ósea, proporciones faciales y estilo.',
        '¡Te etiquetan primero porque tu veredicto es el tribunal supremo del grupo!',
      ],
    },
    {
      title: 'Cuando se transmiten certámenes de belleza (Miss Universo, etc.), tú...',
      category: 'Coronas y Glamour',
      hint: 'El evento anual de vestidos y momentos de coronación.',
      options: [
        'Nunca los veo, no me interesan en absoluto.',
        'Solo miro la coronación final para enterarme de quién ganó.',
        'Miro todas las etapas: traje típico, gala y comento cada vestido a detalle.',
        'Recuerdo preguntas finales, respuestas memorables y puntuaciones de años pasados.',
      ],
    },
    {
      title: '¿Qué porcentaje de tu lista de música más escuchada está compuesto por K-pop masculino?',
      category: 'Listas de Reproducción y Favoritos',
      hint: 'Las canciones que suenan en tus audífonos a lo largo del día.',
      options: [
        'Cero por ciento, escucho exclusivamente otros géneros.',
        'Tengo algunas canciones populares que se volvieron virales.',
        'Más de la mitad de mi lista, lleno de melodías pegadizas.',
        'Fan consagrado/a: tengo varias versiones de álbumes y me sé los cánticos de memoria.',
      ],
    },
    {
      title: 'Al ver memes virales o frases de divas en tu inicio de redes, tú...',
      category: 'Memes y Jerga Pop',
      hint: '¿Qué tan natural es tu dominio del humor de internet?',
      options: [
        'No entiendo el chiste, sigo bajando desconcertado/a.',
        'Entiendo la idea general y me río con mis amigos.',
        'Uso esas expresiones diariamente en mis chats como lenguaje habitual.',
        'Soy quien inventa los chistes y distribuye los mejores stickers en el grupo.',
      ],
    },
    {
      title: 'Con respecto a horóscopos diarios o lecturas de tarot sobre el amor, tú...',
      category: 'Intuición y Misticismo',
      hint: 'El universo cósmico y el destino del corazón.',
      options: [
        'Nunca los leo, no creo en esas cosas.',
        'Los miro por curiosidad y risa, sin tomármelos en serio.',
        'Los reviso cada mañana antes de salir y uso el color de la suerte recomendado.',
        'Tengo videntes de confianza y recuerdo las predicciones mejor que mis horarios de trabajo.',
      ],
    },
    {
      title: 'Tu mejor amigo/a te pide consejo de moda o maquillaje antes de una cita, tú...',
      category: 'Gurú de Estilo y Asesoría',
      hint: 'Cuando alguien necesita auxilio urgente con su combinación de ropa.',
      options: [
        'No sé nada del tema, realmente no puedo ayudar.',
        'Le digo algo breve y amable: "¡Se te ve muy bien!".',
        'Asesoría completa: le indico el tono exacto de labial y el calzado a juego.',
        'Me consideran su estilista personal: ¡me mandan foto antes de pagar en la tienda!',
      ],
    },
    {
      title: 'Pregunta sincera: ¿dónde te ubicarías tú en el espectro arcoíris?',
      category: 'Reflexión Sincera del Corazón',
      hint: 'Última pregunta... ¡sé completamente fiel a lo que sientes!',
      options: [
        '100% heterosexual, sin ninguna duda al respecto.',
        'A veces he tenido curiosidad, una pequeña chispa que le da color a la vida.',
        'Fluido/a y con mente abierta, el amor no entiende de fronteras ni etiquetas.',
        '¡100% orgulloso/a de mi energía arcoíris, listo/a para brillar ante el mundo!',
      ],
    },
  ],
};

// Result Tiers for all 6 languages
export const resultTiersI18n: Record<SupportedLang, QuizResultTier[]> = {
  th: [
    {
      minPercent: 25,
      maxPercent: 40,
      title: 'สเตรทตัวแม่ แต่แอบมีสายตากวาดมองบ้างเป็นบางที',
      badge: 'สเตรทสายชื่นชม',
      tagline: 'ตรงเป๊ะมั่นคง แต่มีสายตาเฉียบคมแอบมองคนสวยหล่อเป็นสีสัน',
      description:
        'คุณยืนหยัดในฝั่งความตรงไปตรงมาแบบมั่นคง 100% ทรงคุณธรรม แต่วงการบันเทิง แฟชั่น และเพื่อนๆ ก็มีแอบทำให้คุณเหลียวมองบ้างเป็นอาหารตา ความเป็นธรรมชาติ ไม่เฟก และซื่อตรงต่อตัวเองคือเสน่ห์ที่น่ารักที่สุดของคุณ!',
      quote: '“ฉันมองเพราะเขาสวยเฉยๆ แก ไม่ได้คิดอะไรลึกซึ้งจริ๊งงง!”',
      traits: [
        { label: 'ความตรงของเส้นทาง', level: 'ระดับ 99%' },
        { label: 'เรดาร์จับคนหน้าตาดี', level: 'ระดับ 40%' },
        { label: 'สกิลวิเคราะห์มีมเพื่อน', level: 'ระดับ 35%' },
        { label: 'ภูมิคุ้มกันความฟิน', level: 'ระดับ 85%' },
      ],
      advice:
        'คุณเป็นเพื่อนแท้ที่ดีมากในวงสนทนา เป็นผู้ฟังที่สงบเงียบท่ามกลางเพื่อนตัวแม่ที่กรี๊ดกร๊าด คอยดึงสติเพื่อนได้ดีเสมอ!',
    },
    {
      minPercent: 41,
      maxPercent: 55,
      title: 'โซนชิลๆ ลื่นไหลนิดๆ เปิดใจรับความสวยงามรอบตัว',
      badge: 'สายชิลเปิดกว้าง',
      tagline: 'ชีวิตไร้กรอบ อะไรดีก็ชื่นชม ดนตรีเพราะก็เต้นตาม สบายใจสุดๆ',
      description:
        'คุณอยู่ในโซนสบายใจ ไร้กรอบความจำเจ ดนตรีเพราะก็โยกตาม คอนเทนต์น่ารักก็ยิ้มตาม คุณมองว่าความสวยงาม เสน่ห์ และความรักไม่มีเพศมากั้น มีความเปิดกว้างทางความคิดสูงมาก และพร้อมเอ็นจอยกับทุกความสุขในชีวิตรอบตัว',
      quote: '“โลกนี้มันกว้างใหญ่ ความงามไม่ได้มีแบบเดียวเนอะ สวยก็คือสวย จบ!”',
      traits: [
        { label: 'ความลื่นไหลทางอารมณ์', level: 'ระดับ 65%' },
        { label: 'การเปิดรับสิ่งใหม่', level: 'ระดับ 80%' },
        { label: 'สกิลโยกตามจังหวะ T-Pop', level: 'ระดับ 55%' },
        { label: 'ความใจดีต่อเพื่อนทุกแนว', level: 'ระดับ 90%' },
      ],
      advice:
        'ความสบายๆ ของคุณทำให้ใครอยู่ใกล้ก็รู้สึกปลอดภัย ไม่ตัดสินใคร และพร้อมเป็นเพื่อนเที่ยวที่ไปได้ทุกงาน!',
    },
    {
      minPercent: 56,
      maxPercent: 70,
      title: 'หัวใจเอียงไปทางสีรุ้งชัดเจน สายวายตัวยง',
      badge: 'สายวายตัวมัม',
      tagline: 'เรดาร์ทำงานแม่นยำ รู้ใจชาวด้อม จิกหมอนขาดไปแล้วหลายใบ',
      description:
        'เรดาร์ของคุณทำงานได้แม่นยำสุดๆ! รู้งาน ซึมซับป๊อปคัลเจอร์ เข้าใจฟีลลิ่งของความฟินระดับจิกหมอน มีความสุขกับการซัพพอร์ตสิ่งที่รักเต็มที่ แค่เห็นเค้าเดินเคียงกัน สายตาคุณก็สแกนโมเมนต์โรแมนติกได้เร็วกว่าเน็ตไฟเบอร์ 1000 Mbps!',
      quote: '“คู่นี้เขาไม่ได้เป็นเพื่อนกันธรรมดาหรอก สายตามันฟ้องชัดขนาดนั้น!”',
      traits: [
        { label: 'ความไวของเรดาร์คู่จิ้น', level: 'ระดับ 88%' },
        { label: 'พลังอินเนอร์ตอนจิกหมอน', level: 'ระดับ 92%' },
        { label: 'คลังศัพท์แสลงในแชท', level: 'ระดับ 75%' },
        { label: 'ความพร้อมไปงานแฟนมีต', level: 'ระดับ 80%' },
      ],
      advice:
        'อย่าลืมเตรียมหมอนสำรองไว้เยอะๆ เพราะความฟินไม่มีวันหมดอายุ และคุณคือหัวเรือใหญ่ที่พากองเรือพายไปข้างหน้าเสมอ!',
    },
    {
      minPercent: 71,
      maxPercent: 85,
      title: 'แฟนพันธุ์แท้สายรุ้ง รู้ลึกรู้จริงระดับผู้เชี่ยวชาญ',
      badge: 'ตัวแม่ระดับผู้เชี่ยวชาญ',
      tagline: 'คลังความรู้แน่น อินเนอร์พร้อม เพื่อนมีปัญหาเรื่องผู้เรื่องแฟชั่นต้องโทรหา',
      description:
        'ความรู้แน่นปึ้ก อินเนอร์พร้อม เพื่อนมีปัญหาเรื่องแฟชั่น เรื่องซีรีส์ หรือเรื่องคนรัก คุณคือที่พึ่งพิงอันดับหนึ่ง สายตากวาดรอบทิศทางไม่มีพลาดสักดีเทล รู้ว่าใครเริ่มเดบิวต์ปีไหน ชุดนี้แบรนด์อะไร และใครกำลังส่งสัญญาณความรักกันอยู่!',
      quote: '“อย่าให้แม่ต้องพูด... แค่เดินผ่านมุมตึกแม่ก็รู้ลึกถึงไส้ติ่งแล้วย่ะ!”',
      traits: [
        { label: 'ความรู้ลึกวงการบันเทิง', level: 'ระดับ 95%' },
        { label: 'เซนส์การเป็นสไตลิสต์', level: 'ระดับ 90%' },
        { label: 'ความจัดจ้านของฝีปาก', level: 'ระดับ 85%' },
        { label: 'ความภูมิใจในสีสันชีวิต', level: 'ระดับ 92%' },
      ],
      advice:
        'คุณคือดาวเด่นของทุกโต๊ะแฮงเอาท์ ถ้าไม่มีคุณ โต๊ะนั้นจะขาดสีสันไป 80% ทันที จงภูมิใจในความเริ่ดนี้!',
    },
    {
      minPercent: 86,
      maxPercent: 100,
      title: 'ไอคอนสีรุ้งตัวจริง ระดับตำนานที่ทุกคนต้องยกนิ้วให้',
      badge: 'ไอคอนระดับตำนาน',
      tagline: 'มงลงหัวตั้งแต่เกิด รันทุกวงการ ออร่าตัวแม่เปล่งประกาย 360 องศา',
      description:
        'ไม่มีใครต้านทานรัศมีตัวแม่ของคุณได้! รันวงการทุกมิติ ทั้งแฟชั่น มีม นางงาม แดนซ์ และการซัพพอร์ตความเท่าเทียมในสังคม ออร่าความปังกระจายรอบทิศทาง 360 องศา ทุกก้าวที่เดินคือรันเวย์ ทุกคำพูดคือไวรัลระดับชาติ!',
      quote: '“มงไม่ลงจะงงมาก ระดับนี้ไม่มีคำว่าแผ่ว มีแต่คำว่า ปัง ปัง ปัง!”',
      traits: [
        { label: 'ออร่าตัวแม่ระดับจักรวาล', level: 'ระดับ 100%' },
        { label: 'ความเร็วในการเสิร์ฟมีม', level: 'ระดับ 99%' },
        { label: 'ความทรงพลังในการโบกธง', level: 'ระดับ 100%' },
        { label: 'ความเป๊ะของการเดินสับขา', level: 'ระดับ 98%' },
      ],
      advice:
        'กราบในความตัวแม่ระดับตำนาน! รักษาพลังงานบวกและอารมณ์ขันนี้ไว้ โลกใบนี้สดใสขึ้นเป็นกองเพราะมีคุณ!',
    },
  ],

  en: [
    {
      minPercent: 25,
      maxPercent: 40,
      title: 'Steadfast Straight with an Eye for Aesthetics',
      badge: 'Respectful Admirer',
      tagline: 'Firmly grounded, yet possessing a sharp eye that appreciates beauty in everyone',
      description:
        'You stand firmly on the straight side with 100% confidence, but you certainly enjoy pop culture, fashion, and good-looking people as visual treats. Your authenticity, natural charm, and honesty are your greatest strengths!',
      quote: '“I am just looking because they look amazing, nothing deep, I swear!”',
      traits: [
        { label: 'Straight Alignment', level: 'Level 99%' },
        { label: 'Good-Looking Radar', level: 'Level 40%' },
        { label: 'Meme Analysis Skill', level: 'Level 35%' },
        { label: 'Drama Immunity', level: 'Level 85%' },
      ],
      advice:
        'You are the dependable, calm anchor in your friend group who keeps everyone grounded during wild discussions!',
    },
    {
      minPercent: 41,
      maxPercent: 55,
      title: 'Chilled & Fluid Mind with an Open Heart',
      badge: 'Open-Minded Explorer',
      tagline: 'Life without strict boundaries: when the music is good you dance, when people are lovely you smile',
      description:
        'You reside in a cozy, relaxed comfort zone without rigid labels. Catchy tunes make you groove, heartwarming shows make you beam. You believe beauty, charisma, and genuine love have no gender barriers.',
      quote: '“The world is vast and beauty comes in all forms. What is lovely is lovely, period!”',
      traits: [
        { label: 'Emotional Fluidity', level: 'Level 65%' },
        { label: 'Openness to Experiences', level: 'Level 80%' },
        { label: 'Pop Rhythm Response', level: 'Level 55%' },
        { label: 'Universal Kindness', level: 'Level 90%' },
      ],
      advice:
        'Your chill demeanor makes everyone around you feel safe and unjudged. You are the ultimate easygoing road-trip buddy!',
    },
    {
      minPercent: 56,
      maxPercent: 70,
      title: 'Rainbow Heart Shining: Certified Shipper & BL Enthusiast',
      badge: 'Devoted Shipper',
      tagline: 'High-precision romantic radar, pillow-clutching enthusiast of genuine chemistry',
      description:
        'Your romantic radar functions at fiber-optic speed! You grasp pop culture subtleties instantly, know every tender gaze on screen, and cheer passionately for your favorites. A single glance between two stars sends your heart racing!',
      quote: '“Those two are definitely not just casual friends; the eye contact speaks volumes!”',
      traits: [
        { label: 'Ship Radar Sensitivity', level: 'Level 88%' },
        { label: 'Pillow-Clutching Energy', level: 'Level 92%' },
        { label: 'Chat Slang Fluency', level: 'Level 75%' },
        { label: 'Fan-Meeting Readiness', level: 'Level 80%' },
      ],
      advice:
        'Keep spare pillows handy because your joy has no expiration date, and you are the fearless captain steering the ship forward!',
    },
    {
      minPercent: 71,
      maxPercent: 85,
      title: 'Rainbow Connoisseur: Verified Culture Expert',
      badge: 'Master Connoisseur',
      tagline: 'Endless pop culture encyclopedic wisdom, the first person friends call for advice',
      description:
        'Unshakable pop knowledge and unmatched style intuition! Whether friends need dating advice, styling tips, or a breakdown of the latest drama, you are the indisputable number one consultant. Nothing escapes your 360-degree radar!',
      quote: '“Do not make me spill the tea... Just one glance and I already know the whole backstory!”',
      traits: [
        { label: 'Entertainment Mastery', level: 'Level 95%' },
        { label: 'Stylist Eye & Taste', level: 'Level 90%' },
        { label: 'Sharp Wit & Humor', level: 'Level 85%' },
        { label: 'Pride & Joy of Living', level: 'Level 92%' },
      ],
      advice:
        'You are the dazzling star of every hangout. Without you, the gathering loses 80% of its color. Own your fabulous glow!',
    },
    {
      minPercent: 86,
      maxPercent: 100,
      title: 'Iconic Rainbow Legend: Crowned Diva of the Universe',
      badge: 'Legendary Icon',
      tagline: 'Crowned from day one, setting trends and radiating 360-degree undeniable star aura',
      description:
        'Utterly irresistible star power! You rule every realm: fashion, memes, runway energy, and fierce advocacy for equality. Every sidewalk is your personal catwalk, and every phrase you drop becomes an instant viral quote!',
      quote: '“If the crown doesn’t land on my head, the judges made a mistake. Pure perfection, always!”',
      traits: [
        { label: 'Universal Star Power', level: 'Level 100%' },
        { label: 'Meme Delivery Speed', level: 'Level 99%' },
        { label: 'Pride Flag Waving Impact', level: 'Level 100%' },
        { label: 'Runway Strut Precision', level: 'Level 98%' },
      ],
      advice:
        'Bowing down to your legendary presence! Keep this magnetic humor and positivity burning bright—the world is infinitely more radiant because of you!',
    },
  ],

  zh: [
    {
      minPercent: 25,
      maxPercent: 40,
      title: '钢铁直人但拥有敏锐的审美鉴赏力',
      badge: '直爽审美家',
      tagline: '立场坚定笔直，但拥有一双善于发现俊男靓女的敏锐眼睛',
      description:
        '你在直人领域站得稳如泰山，但你热爱生活与流行文化，善于欣赏美的事物。真实、自然、不假修饰正是你最受大家喜爱的魅力所在！',
      quote: '“我纯粹是因为对方好看才多看两眼，绝对没有想多，真的！”',
      traits: [
        { label: '笔直坚定指数', level: '等级 99%' },
        { label: '高颜值扫描雷达', level: '等级 40%' },
        { label: '网络热梗分析力', level: '等级 35%' },
        { label: '剧情狗血免疫力', level: '等级 85%' },
      ],
      advice: '你是朋友圈中最让人踏实的理性定海神针，总能在大家嗨翻天时稳稳把控全场！',
    },
    {
      minPercent: 41,
      maxPercent: 55,
      title: '自在随性，心态开放包容的美好体验家',
      badge: '随性开放派',
      tagline: '生活不设限，好听的音乐就跟着摇摆，可爱的事物就尽情微笑',
      description:
        '你生活在一个自由无拘的舒适圈。动感的旋律让你摇摆，温馨的剧情让你心动。在你眼中，美好、魅力与真爱从来没有任何界限。',
      quote: '“世界这么大，美从来不止一种模样。好看就是好看，开心就好！”',
      traits: [
        { label: '情感流动包容度', level: '等级 65%' },
        { label: '新事物接纳能力', level: '等级 80%' },
        { label: '流行乐律动感应', level: '等级 55%' },
        { label: '对所有人的善意', level: '等级 90%' },
      ],
      advice: '你的随和与包容让身边的每个人都感到安全与自在，是大家最想一起出游的神仙伙伴！',
    },
    {
      minPercent: 56,
      maxPercent: 70,
      title: '彩虹之心炽热跳动：资深CP粉与浪漫同好',
      badge: '资深同人CP主理人',
      tagline: '雷达精准敏锐，嗑糖抱枕抓破好几个的浪漫大户',
      description:
        '你的浪漫雷达灵敏度堪比千兆光纤！你深谙流行影视的细微甜意，只要看到两个主角并肩而立，眼神交汇的瞬间你就已经脑补出了一整部甜蜜大戏！',
      quote: '“这俩人的眼神绝对不只是普通朋友，真情流露得太明显了！”',
      traits: [
        { label: 'CP雷达敏锐度', level: '等级 88%' },
        { label: '嗑糖沉浸爆发力', level: '等级 92%' },
        { label: '群聊黑话熟练度', level: '等级 75%' },
        { label: '线下打卡行动力', level: '等级 80%' },
      ],
      advice: '多准备几个抱枕吧，你的快乐永不过期，永远是一往无前的坚定掌舵人！',
    },
    {
      minPercent: 71,
      maxPercent: 85,
      title: '彩虹文化资深学者：朋友圈时尚与情感导师',
      badge: '专家级领航者',
      tagline: '知识储备丰富，气场十足，朋友遇到穿搭或感情难题第一个找你',
      description:
        '底蕴深厚，审美出众！不管是流行风向、穿搭指导还是情感困惑，你永远是全场的第一顾问。360度全方位雷达，没有任何八卦与细节能逃过你的双眼！',
      quote: '“别逼我开口爆料……只要瞄一眼，我连前因后果全门儿清！”',
      traits: [
        { label: '娱乐圈深度知识', level: '等级 95%' },
        { label: '专业级造型审美', level: '等级 90%' },
        { label: '金句频出犀利度', level: '等级 85%' },
        { label: '人生多彩自豪感', level: '等级 92%' },
      ],
      advice: '你是每一次聚会无可替代的灵魂主角，没有你聚会立刻失色八成，尽情享受你的耀眼吧！',
    },
    {
      minPercent: 86,
      maxPercent: 100,
      title: '传奇彩虹天花板：万众瞩目的宇宙级Icon',
      badge: '传奇级彩虹巨星',
      tagline: '天生带冠，气场全开，360度散发无可阻挡的绝对巨星光芒',
      description:
        '没有任何人能抵挡你的女王气场！时尚、有梗、气度、公益全维度拿捏。每一条马路都是你的专属T台，每一句随口而出的话都能成为流行金句！',
      quote: '“王冠不戴在我头上就说不过去了，姐的字典里只有炸裂和完美！”',
      traits: [
        { label: '宇宙级天后气场', level: '等级 100%' },
        { label: '造梗与表情包速度', level: '等级 99%' },
        { label: '挥舞彩虹旗号召力', level: '等级 100%' },
        { label: '台步踩点精确度', level: '等级 98%' },
      ],
      advice: '向传奇的你致敬！请务必保持这份无与伦比的自信与幽默，这个世界因为你的存在而加倍璀璨！',
    },
  ],

  ja: [
    {
      minPercent: 25,
      maxPercent: 40,
      title: '美意識と審美眼に長けたストレート',
      badge: '爽快なる美の鑑賞者',
      tagline: 'ブレない自分軸を持ちながら、美しい人々を愛でる確かな目を持つ',
      description:
        '自分の生き方にブレはなくストレート度100%ですが、エンタメやファッションの美しい世界を愛する素直な感性を持っています。飾らないナチュラルな人柄こそが最大の魅力です！',
      quote: '「ただ素敵だから見惚れてただけだよ、他意はないからホントに！」',
      traits: [
        { label: 'まっすぐ度', level: 'レベル 99%' },
        { label: '美形察知レーダー', level: 'レベル 40%' },
        { label: 'ミーム分析力', level: 'レベル 35%' },
        { label: 'ドラマ耐性', level: 'レベル 85%' },
      ],
      advice: '仲間内の会話で最も頼りになる冷静な聞き手。大騒ぎする友達を優しく見守る癒やしの存在です！',
    },
    {
      minPercent: 41,
      maxPercent: 55,
      title: '境界を持たないオープンマインドな自由人',
      badge: 'リラックス開拓派',
      tagline: '枠にとらわれない暮らし。良い曲なら踊り、愛らしい人には微笑みかける',
      description:
        '肩肘張らない心地よいゾーンにいます。ノリの良い曲が鳴れば揺れ、心温まるストーリーに癒やされる。美しさや愛に性別の壁はないと信じるオープンな心の持ち主です。',
      quote: '「世界は広いし、美しさに決まった形なんてないよね。素敵ならそれで最高！」',
      traits: [
        { label: '心の柔軟性', level: 'レベル 65%' },
        { label: '受容性と好奇心', level: 'レベル 80%' },
        { label: 'ポップス反応度', level: 'レベル 55%' },
        { label: 'すべてへの優しさ', level: 'レベル 90%' },
      ],
      advice: 'あなたの気取らない親しみやすさは、誰にとっても安心できる居場所です。どこへ行くにも最高の相棒！',
    },
    {
      minPercent: 56,
      maxPercent: 70,
      title: '高感度レーダー作動：筋金入りの尊いケミ愛好家',
      badge: '熱狂的ケミマスター',
      tagline: '二人の間に流れる空気感をミリ単位で見抜くロマンス感知の達人',
      description:
        'あなたの恋愛レーダーは光回線並みに超高速！二人が隣り合って歩くほんの些細な視線の交錯から、言葉以上のエモーショナルな尊さを瞬時に感じ取ります。',
      quote: '「あの二人は絶対にただの友達じゃない…視線の熱さが物語ってる！」',
      traits: [
        { label: '推しケミ感知度', level: 'レベル 88%' },
        { label: '尊死エネルギー', level: 'レベル 92%' },
        { label: 'チャット用語熟練度', level: 'レベル 75%' },
        { label: 'イベント参戦力', level: 'レベル 80%' },
      ],
      advice: '予備のクッションを常備しておきましょう！あなたの情熱に限界はなく、常に船を進める頼もしい船長です。',
    },
    {
      minPercent: 71,
      maxPercent: 85,
      title: 'レインボー界の生き字引：トレンド＆相談役のスペシャリスト',
      badge: 'エキスパートリーダー',
      tagline: '豊富な知識とセンス。恋愛やコーデで困った友達は真っ先にあなたへ電話する',
      description:
        'カルチャーへの造詣が深く、直感的なセンスも抜群！友達がファッションや人間関係で迷ったとき、一番頼りにされる名カウンセラー。360度全方位を見渡す眼力は本物です。',
      quote: '「私の口から言わせないで…角を曲がった瞬間に全部お見通しよ！」',
      traits: [
        { label: 'エンタメ網羅度', level: 'レベル 95%' },
        { label: 'スタイリスト級センス', level: 'レベル 90%' },
        { label: '切れ味鋭いトーク力', level: 'レベル 85%' },
        { label: '人生を謳歌する誇り', level: 'レベル 92%' },
      ],
      advice: '集まりの中心にはいつもあなたがいます。あなたがいなければその場の鮮やかさは半減。堂々と輝いて！',
    },
    {
      minPercent: 86,
      maxPercent: 100,
      title: '伝説のレインボーアイコン：誰もがひれ伏す唯一無二のカリスマ',
      badge: 'レジェンドアイコン',
      tagline: '生まれた時からティアラを抱き、歩く場所すべてをランウェイに変えるオーラ',
      description:
        'あなたのカリスマ性に誰も抗うことはできません！ファッション、ユーモア、ダンス、多様性への発信力、すべてがパーフェクト。吐く言葉すべてがパンチラインになる絶対的スター！',
      quote: '「ティアラが私に輝かないなんてあり得ない。いつだって主役は私よ！」',
      traits: [
        { label: '宇宙規模のスター性', level: 'レベル 100%' },
        { label: 'ミーム生成スピード', level: 'レベル 99%' },
        { label: '旗を掲げる影響力', level: 'レベル 100%' },
        { label: 'ウォーキングの美しさ', level: 'レベル 98%' },
      ],
      advice: '伝説的な輝きに敬意を！そのユーモアとポジティブなパワーを保ち続けてください。世界はあなたのおかげで鮮やかです！',
    },
  ],

  ko: [
    {
      minPercent: 25,
      maxPercent: 40,
      title: '흔들림 없는 직진 본능 속 예리한 미적 감각',
      badge: '깔끔한 미학 감상가',
      tagline: '흔들림 없이 곧지만, 아름다운 사람을 알아보는 날카로운 눈을 지닌 타입',
      description:
        '당신은 100% 확고한 스트레이트의 영역에 있지만, 트렌드와 멋진 사람들을 긍정적으로 즐길 줄 아는 솔직하고 세련된 감각을 지녔습니다. 꾸밈없는 솔직함이 당신의 가장 큰 매력입니다!',
      quote: '“그냥 정말 예쁘고 멋있어서 본 것뿐이야, 진짜 딴마음 없다고!”',
      traits: [
        { label: '직진 본능 일치도', level: '레벨 99%' },
        { label: '비주얼 스캔 레이더', level: '레벨 40%' },
        { label: '드립 및 밈 분석력', level: '레벨 35%' },
        { label: '과몰입 방어 면역력', level: '레벨 85%' },
      ],
      advice: '친구들 모임에서 가장 믿음직하고 차분한 조율자입니다. 흥분한 친구들을 다정하게 진정시켜 주는 소중한 존재!',
    },
    {
      minPercent: 41,
      maxPercent: 55,
      title: '경계 없는 편안함과 열린 마음의 소유자',
      badge: '오픈마인드 탐험가',
      tagline: '틀에 갇히지 않는 유연함: 좋은 음악엔 리듬을 타고, 멋진 사람에겐 미소를 보낸다',
      description:
        '당신은 틀에 갇히지 않는 편안한 힐링 존에 머물고 있습니다. 신나는 멜로디에 몸을 맡기고, 사랑스러운 콘텐츠에 미소 짓습니다. 아름다움과 진정한 사랑에는 성별의 장벽이 없다고 믿습니다.',
      quote: '“세상은 넓고 매력은 무궁무진하잖아. 좋은 건 그냥 좋은 거지, 끝!”',
      traits: [
        { label: '감정 유연성 지수', level: '레벨 65%' },
        { label: '새로움에 대한 수용도', level: '레벨 80%' },
        { label: '팝 음악 반응 센스', level: '레벨 55%' },
        { label: '모두를 향한 친절함', level: '레벨 90%' },
      ],
      advice: '당신의 편안한 태도는 곁에 있는 모든 사람에게 안정감을 줍니다. 어떤 모임이든 함께하고 싶은 최고의 여행 메이트!',
    },
    {
      minPercent: 56,
      maxPercent: 70,
      title: '무지개빛 심장 장착: 검증된 로맨스 케미 과몰입러',
      badge: '프로 과몰입러',
      tagline: '초정밀 로맨스 레이더 가동, 베개를 쥐어뜯으며 환호하는 진정한 덕후',
      description:
        '당신의 로맨스 감별 레이더는 초고속 광랜 수준입니다! 찰나의 눈빛 교환만으로도 숨겨진 설렘과 서사를 즉각 파악하며, 두 사람이 나란히 서 있기만 해도 가슴이 벅차오르는 감동을 느낍니다.',
      quote: '“저 둘은 절대 그냥 친구일 수가 없어. 눈빛이 이미 모든 걸 말해주잖아!”',
      traits: [
        { label: '케미 감별 레이더', level: '레벨 88%' },
        { label: '과몰입 심장 박동수', level: '레벨 92%' },
        { label: '채팅 신조어 구사력', level: '레벨 75%' },
        { label: '오프라인 팬미팅 화력', level: '레벨 80%' },
      ],
      advice: '여분의 베개를 넉넉히 챙겨두세요! 당신의 덕질과 설렘은 유통기한이 없으며, 언제나 사랑의 배를 이끄는 든든한 선장입니다.',
    },
    {
      minPercent: 71,
      maxPercent: 85,
      title: '트렌드 백과사전: 검증된 엔터 & 스타일 카운슬러',
      badge: '전문가급 디바',
      tagline: '방대한 정보와 센스, 패션이나 연애 고민이 생기면 친구들이 가장 먼저 전화하는 1순위',
      description:
        '깊이 있는 대중문화 이해도와 독보적인 감각! 친구들이 스타일링이나 연애사로 고민할 때 찾는 부동의 넘버원 상담사입니다. 360도 전방위 레이더로 그 어떤 비밀과 디테일도 놓치지 않습니다.',
      quote: '“말 안 해도 다 알아… 그냥 골목 모퉁이만 돌아도 견적 다 나왔거든!”',
      traits: [
        { label: '엔터 트렌드 지식', level: '레벨 95%' },
        { label: '스타일리스트 심미안', level: '레벨 90%' },
        { label: '촌철살인 입담 파워', level: '레벨 85%' },
        { label: '컬러풀 라이프 자부심', level: '레벨 92%' },
      ],
      advice: '당신은 모든 술자리와 모임의 눈부신 주인공입니다. 당신이 빠지면 모임의 생기가 반감되니, 마음껏 이 멋짐을 뽐내세요!',
    },
    {
      minPercent: 86,
      maxPercent: 100,
      title: '전설의 무지개 아이콘: 온 우주가 인정하는 당당한 퀸',
      badge: '레전드 슈퍼스타',
      tagline: '태어날 때부터 왕관을 쓴 존재, 걷는 모든 거리를 런웨이로 바꾸는 360도 스타 아우라',
      description:
        '그 누구도 당신의 압도적인 아우라를 막을 수 없습니다! 패션, 밈, 당당한 워킹, 다양성에 대한 지지까지 완벽 그 자체. 당신의 한 걸음 한 걸음이 런웨이이며 내뱉는 말마다 유행어가 되는 독보적 아이콘!',
      quote: '“왕관이 내 머리에 안 올라가면 그게 이상한 거지. 내 인생엔 완벽함뿐이야!”',
      traits: [
        { label: '우주급 스타성 아우라', level: '레벨 100%' },
        { label: '짤 공급 및 밈 순발력', level: '레벨 99%' },
        { label: '무지개 깃발 파급력', level: '레벨 100%' },
        { label: '런웨이 캣워크 엣지', level: '레벨 98%' },
      ],
      advice: '전설적인 당신의 존재감에 경의를 표합니다! 긍정적인 에너지와 센스 넘치는 유머를 잃지 마세요. 세상은 당신 덕분에 훨씬 더 찬란합니다!',
    },
  ],

  es: [
    {
      minPercent: 25,
      maxPercent: 40,
      title: 'Heterosexual Firme con Gran Sentido de la Estética',
      badge: 'Admirador Sincero',
      tagline: 'Posición firme y clara, pero con una mirada aguda para apreciar la belleza en los demás',
      description:
        'Te mantienes con total seguridad en el lado heterosexual, pero disfrutas de la cultura pop, la moda y las personas atractivas como un placer visual. ¡Tu autenticidad y honestidad son tus mejores cualidades!',
      quote: '“¡Solo estoy mirando porque se ve increíble, no hay segundas intenciones, de verdad!”',
      traits: [
        { label: 'Alineación Hetero', level: 'Nivel 99%' },
        { label: 'Radar de Belleza', level: 'Nivel 40%' },
        { label: 'Análisis de Memes', level: 'Nivel 35%' },
        { label: 'Inmunidad al Drama', level: 'Nivel 85%' },
      ],
      advice: '¡Eres el amigo fiel y tranquilo que mantiene con los pies en la tierra a todo el grupo en momentos de euforia!',
    },
    {
      minPercent: 41,
      maxPercent: 55,
      title: 'Mente Relajada y Fluida con el Corazón Abierto',
      badge: 'Explorador Relajado',
      tagline: 'Vida sin barreras: cuando la música suena bien bailas, cuando la gente es encantadora sonríes',
      description:
        'Habitas en una zona cómoda y libre de etiquetas rígidas. La buena música te hace mover el cuerpo y las series tiernas te sacan una sonrisa. Crees firmemente que el encanto y el amor no entienden de géneros.',
      quote: '“El mundo es enorme y la belleza no tiene una sola forma. ¡Lo hermoso es hermoso y punto!”',
      traits: [
        { label: 'Fluidez Emocional', level: 'Nivel 65%' },
        { label: 'Apertura a lo Nuevo', level: 'Nivel 80%' },
        { label: 'Ritmo y Sabor Pop', level: 'Nivel 55%' },
        { label: 'Amabilidad Universal', level: 'Nivel 90%' },
      ],
      advice: 'Tu tranquilidad hace que cualquiera se sienta seguro y libre de juicios a tu lado. ¡El mejor compañero de viaje!',
    },
    {
      minPercent: 56,
      maxPercent: 70,
      title: 'Corazón Multicolor Encendido: Fanático/a Apasionado/a de las Parejas',
      badge: 'Experto/a en Shipeos',
      tagline: 'Radar romántico de alta precisión, devorador/a de momentos dulces en pantalla',
      description:
        '¡Tu radar de química romántica funciona a la velocidad de la luz! Captas las miradas cómplices al instante y celebras cada momento especial. ¡Ver a dos personas caminar juntas hace que tu corazón lata a mil por hora!',
      quote: '“Esos dos definitivamente no son solo amigos; ¡la mirada lo dice absolutamente todo!”',
      traits: [
        { label: 'Radar de Parejas', level: 'Nivel 88%' },
        { label: 'Emoción y Euforia', level: 'Nivel 92%' },
        { label: 'Vocabulario Pop en Chat', level: 'Nivel 75%' },
        { label: 'Puntualidad en Eventos', level: 'Nivel 80%' },
      ],
      advice: 'Ten almohadas de repuesto a mano porque tu entusiasmo no tiene fecha de caducidad. ¡Eres el capitán que guía el barco!',
    },
    {
      minPercent: 71,
      maxPercent: 85,
      title: 'Conocedor/a de la Cultura Arcoíris: Asesor/a de Moda y Confianza',
      badge: 'Líder Especialista',
      tagline: 'Sabiduría pop enciclopédica; la primera persona a quien llaman tus amigos ante dudas de estilo o amor',
      description:
        '¡Conocimientos sólidos y un gusto impecable! Si tus amigos tienen dudas de moda, series o relaciones, tú eres su consulta obligada. Tu radar de 360 grados no pasa por alto ningún detalle ni chisme de temporada.',
      quote: '“No me hagan hablar... ¡Solo con verlos doblar la esquina ya me sé la historia completa!”',
      traits: [
        { label: 'Cultura de Espectáculos', level: 'Nivel 95%' },
        { label: 'Ojo de Estilista', level: 'Nivel 90%' },
        { label: 'Agilidad Verbal y Chispa', level: 'Nivel 85%' },
        { label: 'Orgullo por la Vida', level: 'Nivel 92%' },
      ],
      advice: 'Eres el alma reluciente de cada fiesta. Sin ti, la reunión perdería el 80% de su chispa. ¡Brilla con orgullo!',
    },
    {
      minPercent: 86,
      maxPercent: 100,
      title: 'Ícono Legendario del Arcoíris: Reina Indiscutible del Universo',
      badge: 'Leyenda Viva',
      tagline: 'Con corona desde la cuna, irradiando aura estelar y pisando fuerte en cada pasarela',
      description:
        '¡Nadie puede resistirse a tu magnético poder! Dominas la moda, los memes, la presencia escénica y la lucha por la igualdad. Cada acera es tu pasarela personal y cada frase que dices se convierte en leyenda.',
      quote: '“Si la corona no cae en mi cabeza es un error de los jueces. ¡Aquí solo hay perfección y fuego!”',
      traits: [
        { label: 'Aura Estelar Universal', level: 'Nivel 100%' },
        { label: 'Velocidad de Memes', level: 'Nivel 99%' },
        { label: 'Impacto de la Bandera', level: 'Nivel 100%' },
        { label: 'Elegancia de Pasarela', level: 'Nivel 98%' },
      ],
      advice: '¡Inclinémonos ante tu majestuosidad! Mantén viva esa chispa de humor y energía positiva. ¡El mundo es mil veces más brillante gracias a ti!',
    },
  ],
};

// Builder function that returns localized questions with scores & option IDs preserved
export function getLocalizedQuestions(lang: SupportedLang): Question[] {
  const localizedRaw = questionsI18n[lang] || questionsI18n.en;

  return localizedRaw.map((raw, idx) => {
    return {
      id: idx + 1,
      title: raw.title,
      category: raw.category,
      hint: raw.hint,
      image: questionImages[idx],
      illustrationType: illustrationTypes[idx],
      options: [
        { id: 'a', text: raw.options[0], score: 0 },
        { id: 'b', text: raw.options[1], score: 1 },
        { id: 'c', text: raw.options[2], score: 2 },
        { id: 'd', text: raw.options[3], score: 3 },
      ],
    };
  });
}

// Function that returns localized result tier based on percentage
export function getLocalizedResultTier(
  percentage: number,
  lang: SupportedLang,
): QuizResultTier {
  const tiers = resultTiersI18n[lang] || resultTiersI18n.en;
  const match = tiers.find(
    (t) => percentage >= t.minPercent && percentage <= t.maxPercent,
  );
  return match || tiers[tiers.length - 1];
}
