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

export interface RawQuestionTranslation {
  title: string;
  category: string;
  hint: string;
  options: [string, string, string, string]; // index 0->score 0, 1->score 1, 2->score 2, 3->score 3
}

// Translations for all 15 questions
export const questionsI18n: Partial<Record<SupportedLang, RawQuestionTranslation[]>> = {
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
};

// Result Tiers for all 6 languages
export const resultTiersI18n: Partial<Record<SupportedLang, QuizResultTier[]>> = {
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
};

// Builder function that returns localized questions with scores & option IDs preserved
export function getLocalizedQuestions(lang: SupportedLang): Question[] {
  const localizedRaw = (questionsI18n[lang] || questionsI18n.en)!;

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
  const tiers = (resultTiersI18n[lang] || resultTiersI18n.en)!;
  const match = tiers.find(
    (t) => percentage >= t.minPercent && percentage <= t.maxPercent,
  );
  return match || tiers[tiers.length - 1];
}
