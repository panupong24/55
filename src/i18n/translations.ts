import { SupportedLang } from './types';

export interface TranslationDictionary {
  // Brand & General
  appName: string;
  appTagline: string;
  prideEdition: string;
  loading: string;
  close: string;
  cancel: string;
  confirm: string;
  save: string;
  delete: string;
  back: string;
  copied: string;
  copy: string;

  // Navbar & Controls
  soundOn: string;
  soundOff: string;
  shareQuiz: string;
  restartQuiz: string;
  switchLanguage: string;

  // Intro Screen
  introBadge: string;
  introTitle: string;
  introSubtitle: string;
  introStartBtn: string;
  introResumeBtn: string;
  introSavedNotice: string;
  introEstimatedTime: string;
  introQuestionCount: string;
  introInstantResult: string;
  introFeaturePrivacy: string;
  introFeaturePrivacyDesc: string;
  introFeatureFun: string;
  introFeatureFunDesc: string;
  introFeatureStory: string;
  introFeatureStoryDesc: string;
  introDisclaimer: string;

  // Question Screen
  questionProgress: string;
  questionHint: string;
  btnPrev: string;
  btnNext: string;
  btnFinish: string;
  keyboardTip: string;
  selectOptionPrompt: string;

  // Result Screen
  resultHeaderBadge: string;
  resultScoreLabel: string;
  resultTraitsTitle: string;
  resultAdviceTitle: string;
  btnSaveStoryCard: string;
  btnShareSocial: string;
  btnCopySummary: string;
  btnPlayAgain: string;
  resultDisclaimer: string;

  // Share Modal & Story Card
  shareModalTitle: string;
  shareModalSubtitle: string;
  tabSocial: string;
  tabQr: string;
  tabCard: string;
  shareTitleTemplate: string;
  shareGenericTitle: string;
  shareViaApp: string;
  shareViaLine: string;
  shareViaFacebook: string;
  shareViaTwitter: string;
  copyShareLink: string;
  qrInstructionTitle: string;
  qrInstructionDesc: string;
  btnDownloadQr: string;
  storyCardStatusReal: string;
  btnReloadCard: string;
  storyCardGenerating: string;
  storyCardDesc: string;
  btnDownloadCard: string;
  canvasHeader: string;
  canvasSubtitle: string;
  canvasScoreLabel: string;
  canvasTraitsLabel: string;
  canvasAdviceLabel: string;
  canvasFooterUrl: string;
  canvasFooterCta: string;

  // Reset Modal
  resetModalTitle: string;
  resetModalDesc: string;
  resetModalConfirmBtn: string;
  resetModalCancelBtn: string;

  // Review Section
  reviewSectionTitle: string;
  reviewSectionSubtitle: string;
  reviewRatingPrompt: string;
  reviewNamePlaceholder: string;
  reviewNameOptional: string;
  defaultUserName: string;
  reviewCommentPlaceholder: string;
  reviewCommentLimit: string;
  btnSubmitReview: string;
  reviewSubmitting: string;
  reviewSubmittedSuccess: string;
  reviewEmptyError: string;
  reviewCooldownError: string;
  reviewListTitle: string;
  reviewEmptyList: string;
  btnReportComment: string;
  commentReportedTag: string;

  // Report & Feedback Modal
  reportModalTitle: string;
  reportModalSubtitle: string;
  reportCategoryLabel: string;
  catBug: string;
  catTranslation: string;
  catInappropriateComment: string;
  catSuggestion: string;
  reportDetailsPlaceholder: string;
  reportLinkedCommentBanner: string;
  btnSubmitReport: string;
  reportSubmitting: string;
  reportSubmittedSuccess: string;
  reportEmptyError: string;

  // Admin Modal
  adminTitle: string;
  adminAuthSubtitle: string;
  adminEmailLabel: string;
  adminEmailPlaceholder: string;
  adminPasswordLabel: string;
  adminPasswordPlaceholder: string;
  btnAdminLogin: string;
  btnAdminLogout: string;
  adminLoggingIn: string;
  adminConfigPrompt: string;
  adminConfigUrlLabel: string;
  adminConfigKeyLabel: string;
  btnAdminConnect: string;
  adminAccessDenied: string;
  adminTabReports: string;
  adminTabReviews: string;
  statusNew: string;
  statusInvestigating: string;
  statusResolved: string;
  btnMarkStatus: string;
  btnHideReview: string;
  btnUnpinHideReview: string;
  adminNoReports: string;
  adminNoReviews: string;

  // Footer & Accessibility
  footerSupport: string;
  btnOpenFeedback: string;
  btnOpenAdmin: string;
  allPlatformsSupported: string;
}

export const translations: Record<SupportedLang, TranslationDictionary> = {
  th: {
    appName: 'Rainbow Vibe Quiz',
    appTagline: 'แบบทดสอบวัดดีกรีตัวแม่สายรุ้งสุดฮา 15 ข้อ',
    prideEdition: 'Pride Edition',
    loading: 'กำลังโหลด...',
    close: 'ปิด',
    cancel: 'ยกเลิก',
    confirm: 'ยืนยัน',
    save: 'บันทึก',
    delete: 'ลบ',
    back: 'ย้อนกลับ',
    copied: 'คัดลอกแล้ว!',
    copy: 'คัดลอก',

    soundOn: 'เปิดเสียง',
    soundOff: 'ปิดเสียง',
    shareQuiz: 'แชร์แบบทดสอบ',
    restartQuiz: 'เริ่มทำใหม่',
    switchLanguage: 'เปลี่ยนภาษา',

    introBadge: 'แบบทดสอบยอดฮิต 15 ข้อ',
    introTitle: 'Rainbow Vibe Quiz',
    introSubtitle: 'มาค้นพบดีกรีและตัวตนสายรุ้งในตัวคุณ ด้วยคำถามสุดฮา อินเทรนด์ และภาพประกอบสุดจึ้ง!',
    introStartBtn: 'เริ่มทำแบบทดสอบเลย 🌈',
    introResumeBtn: 'ทำต่อจากข้อที่บันทึกไว้ ✨',
    introSavedNotice: 'คุณมีคำตอบที่ทำค้างไว้ในข้อที่',
    introEstimatedTime: 'ใช้เวลาประมาณ 3 นาที',
    introQuestionCount: '15 ข้อสนุกๆ',
    introInstantResult: 'สรุปผลทันที',
    introFeaturePrivacy: 'ความเป็นส่วนตัว 100%',
    introFeaturePrivacyDesc: 'ไม่เก็บข้อมูลส่วนตัว คะแนนคำนวณในเครื่องของคุณทันที',
    introFeatureFun: 'มีมและอินเนอร์ตัวแม่',
    introFeatureFunDesc: 'รวบรวมสถานการณ์ชีวิตจริง วงการบันเทิง แฟชั่น และป๊อปคัลเจอร์',
    introFeatureStory: 'การ์ดรูปภาพพร้อมแชร์',
    introFeatureStoryDesc: 'สร้าง Story Card ขนาด 9:16 สวยสดใสโพสต์ลง IG/TikTok ได้ทันที',
    introDisclaimer: 'แบบทดสอบนี้จัดทำขึ้นเพื่อความบันเทิงและความภาคภูมิใจในความหลากหลายทางเพศ 🏳️‍🌈',

    questionProgress: 'ข้อที่',
    questionHint: 'คำใบ้ / ฟีลลิ่ง:',
    btnPrev: 'ย้อนกลับ',
    btnNext: 'ข้อถัดไป',
    btnFinish: 'ดูผลลัพธ์เลย! 🌈',
    keyboardTip: 'กดแป้นตัวเลข 1-4 หรือ A-D เพื่อเลือกคำตอบ และ Enter เพื่อไปข้อถัดไป',
    selectOptionPrompt: 'กรุณาเลือก 1 คำตอบเพื่อไปต่อ',

    resultHeaderBadge: 'สรุปผลดีกรีความตัวแม่',
    resultScoreLabel: 'ระดับดีกรีตัวแม่ของคุณ',
    resultTraitsTitle: 'เรดาร์วัดทักษะ 4 มิติ',
    resultAdviceTitle: 'คำแนะนำประจำตัว',
    btnSaveStoryCard: 'บันทึกการ์ดรูปภาพ (Story Card) 🌈',
    btnShareSocial: 'แชร์โซเชียล & QR Code',
    btnCopySummary: 'คัดลอกข้อความสรุป',
    btnPlayAgain: 'เล่นใหม่อีกครั้ง',
    resultDisclaimer: 'ควิซนี้ทำขึ้นเพื่อความบันเทิงและรอยยิ้มระหว่างเพื่อนฝูงเท่านั้น ทุกคนมีความน่ารักและเป็นตัวเองในแบบที่ดีที่สุด! 🏳️‍🌈✨',

    shareModalTitle: 'เผยแพร่ & แชร์ผลลัพธ์',
    shareModalSubtitle: 'ส่งต่อความสนุกและป้ายยาเพื่อนให้มาเล่น',
    tabSocial: 'แชร์โซเชียล',
    tabQr: 'QR Code',
    tabCard: 'การ์ดรูปภาพ',
    shareTitleTemplate: '🌈 ฉันได้ผลลัพธ์ดีกรีตัวแม่ {score}%: "{title}" ({badge}) | แบบทดสอบ Rainbow Vibe Quiz',
    shareGenericTitle: '🌈 Rainbow Vibe Quiz — แบบทดสอบวัดดีกรีตัวแม่สายรุ้งสุดฮา 15 ข้อ',
    shareViaApp: 'แชร์ไปยังแอปต่างๆ (Share)',
    shareViaLine: 'แชร์ไปยัง LINE',
    shareViaFacebook: 'แชร์ลง Facebook',
    shareViaTwitter: 'โพสต์ลง X (Twitter)',
    copyShareLink: 'คัดลอกลิงก์สำหรับแชร์:',
    qrInstructionTitle: 'สแกนด้วยกล้องมือถือเพื่อเข้าเล่นได้ทันที!',
    qrInstructionDesc: 'เหมาะสำหรับเปิดบนหน้าจอ ปาร์ตี้ สื่อสิ่งพิมพ์ หรือป้ายยาเพื่อนๆ ในกลุ่ม',
    btnDownloadQr: 'บันทึกรูป QR Code ลงเครื่อง',
    storyCardStatusReal: 'การ์ดผลลัพธ์จริง:',
    btnReloadCard: 'โหลดใหม่',
    storyCardGenerating: 'กำลังเรนเดอร์การ์ดรูปภาพของคุณ...',
    storyCardDesc: 'บันทึกภาพขนาด 9:16 โพสต์ลง Instagram Story, Facebook Story หรือ TikTok ได้ทันที',
    btnDownloadCard: 'บันทึกการ์ดลงเครื่อง (Save Image)',
    canvasHeader: '🌈 RAINBOW VIBE QUIZ 🏳️‍🌈',
    canvasSubtitle: 'แบบทดสอบวัดดีกรีตัวแม่สายรุ้งสุดฮา 15 ข้อ',
    canvasScoreLabel: 'สรุปผลดีกรีความตัวแม่ของคุณ',
    canvasTraitsLabel: '📊 ระดับทักษะความตัวแม่:',
    canvasAdviceLabel: '💡 คำแนะนำประจำตัว:',
    canvasFooterUrl: '🔗 เล่นและแชร์ได้ที่: https://www.gaykub.online',
    canvasFooterCta: 'สแกนหรือคลิกเล่นเพื่อวัดดีกรีความตัวแม่ของคุณ!',

    resetModalTitle: 'เริ่มทำใหม่อีกครั้ง?',
    resetModalDesc: 'ความคืบหน้าและคำตอบที่คุณเคยเลือกไว้จะถูกรีเซ็ตและเริ่มใหม่ตั้งแต่ข้อที่ 1',
    resetModalConfirmBtn: 'ใช่, เริ่มใหม่เลย',
    resetModalCancelBtn: 'ทำต่อจากเดิม',

    reviewSectionTitle: 'คุณคิดยังไงกับควิซนี้? 💬',
    reviewSectionSubtitle: 'ให้คะแนนและบอกเล่าความฟิน เพื่อส่งต่อพลังบวกให้เพื่อนๆ',
    reviewRatingPrompt: 'แตะเพื่อให้คะแนนดาว (1 - 5 ดาว):',
    reviewNamePlaceholder: 'ชื่อของคุณ (ไม่ระบุก็ได้)',
    reviewNameOptional: 'เว้นว่างเพื่อใช้ "Rainbow Friend"',
    defaultUserName: 'Rainbow Friend',
    reviewCommentPlaceholder: 'เขียนคอมเมนต์สั้นๆ สไตล์ตัวแม่... (สูงสุด 280 ตัวอักษร)',
    reviewCommentLimit: 'ตัวอักษร',
    btnSubmitReview: 'ส่งรีวิวเลย ✨',
    reviewSubmitting: 'กำลังส่ง...',
    reviewSubmittedSuccess: 'ขอบคุณสำหรับรีวิวสุดปังของคุณ! 💖',
    reviewEmptyError: 'กรุณาพิมพ์ข้อความรีวิวก่อนส่งนะจ๊ะ',
    reviewCooldownError: 'ส่งรีวิวเรียบร้อยแล้ว กรุณารอสักครู่ก่อนส่งอีกครั้ง',
    reviewListTitle: 'รีวิวล่าสุดจากเพื่อนๆ สายรุ้ง',
    reviewEmptyList: 'ยังไม่มีรีวิว มาร่วมเป็นคนแรกที่รีวิวควิซนี้กันเลย! 🌈',
    btnReportComment: 'รายงาน',
    commentReportedTag: 'รายงานแล้ว',

    reportModalTitle: 'แจ้งปัญหา / เสนอแนะ 💡',
    reportModalSubtitle: 'ช่วยเราปรับปรุงควิซให้สนุกและปลอดภัยยิ่งขึ้น',
    reportCategoryLabel: 'เลือกหัวข้อ:',
    catBug: 'เว็บมีปัญหา / บั๊ก',
    catTranslation: 'คำแปล / ข้อความผิด',
    catInappropriateComment: 'คอมเมนต์ไม่เหมาะสม',
    catSuggestion: 'เสนอไอเดีย / ฟีเจอร์ใหม่',
    reportDetailsPlaceholder: 'อธิบายรายละเอียดที่พบ... (สูงสุด 500 ตัวอักษร)',
    reportLinkedCommentBanner: 'รายงานคอมเมนต์:',
    btnSubmitReport: 'ส่งข้อความแจ้งเตือน 🚀',
    reportSubmitting: 'กำลังส่ง...',
    reportSubmittedSuccess: 'เราได้รับข้อความของคุณแล้ว ขอบคุณที่ร่วมสร้างคอมมูนิตี้ที่ดี! 💖',
    reportEmptyError: 'กรุณากรอกรายละเอียดก่อนส่ง',

    adminTitle: 'ศูนย์จัดการระบบ (Admin)',
    adminPinPrompt: 'กรุณาใส่รหัสผ่านเพื่อเข้าใช้งาน:',
    adminPinPlaceholder: 'ใส่ PIN (ค่าเริ่มต้น: 1234)',
    btnAdminLogin: 'เข้าสู่ระบบ',
    adminInvalidPin: 'รหัส PIN ไม่ถูกต้อง',
    adminTabReports: 'รายงานปัญหา',
    adminTabReviews: 'จัดการคอมเมนต์',
    statusNew: 'ใหม่',
    statusInvestigating: 'กำลังตรวจสอบ',
    statusResolved: 'แก้ไขแล้ว',
    btnMarkStatus: 'เปลี่ยนสถานะ',
    btnHideReview: 'ซ่อนคอมเมนต์นี้',
    btnUnpinHideReview: 'ยกเลิกการซ่อน',
    adminNoReports: 'ไม่มีรายงานปัญหาในขณะนี้',
    adminNoReviews: 'ยังไม่มีรีวิวในระบบ',

    footerSupport: 'แจ้งปัญหา & เสนอแนะ',
    btnOpenFeedback: 'แจ้งปัญหา / เสนอแนะ',
    btnOpenAdmin: 'Admin',
    allPlatformsSupported: '✨ เว็บไซต์พร้อมใช้งานและรองรับทุกแพลตฟอร์ม (Mobile, Desktop, iOS, Android)',
  },

  en: {
    appName: 'Rainbow Vibe Quiz',
    appTagline: '15 Fun Questions to Measure Your Rainbow Vibe',
    prideEdition: 'Pride Edition',
    loading: 'Loading...',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    back: 'Back',
    copied: 'Copied!',
    copy: 'Copy',

    soundOn: 'Sound On',
    soundOff: 'Sound Off',
    shareQuiz: 'Share Quiz',
    restartQuiz: 'Restart Quiz',
    switchLanguage: 'Language',

    introBadge: 'Trending 15-Question Quiz',
    introTitle: 'Rainbow Vibe Quiz',
    introSubtitle: 'Discover your authentic rainbow vibe degree with hilarious pop-culture questions and vibrant art!',
    introStartBtn: 'Start Quiz Now 🌈',
    introResumeBtn: 'Resume Saved Quiz ✨',
    introSavedNotice: 'You have saved progress on Question',
    introEstimatedTime: 'Takes about 3 minutes',
    introQuestionCount: '15 Fun Questions',
    introInstantResult: 'Instant Score',
    introFeaturePrivacy: '100% Private',
    introFeaturePrivacyDesc: 'No personal data collected. Scored entirely in your browser.',
    introFeatureFun: 'Iconic Pop Culture & Memes',
    introFeatureFunDesc: 'Filled with real pop-culture moments, music, fashion, and TV shows.',
    introFeatureStory: 'Shareable Story Card',
    introFeatureStoryDesc: 'Generates a sleek 9:16 Story Card ready for Instagram, TikTok, and Facebook.',
    introDisclaimer: 'This quiz is created for entertainment and celebration of LGBTQ+ Pride and diversity 🏳️‍🌈',

    questionProgress: 'Question',
    questionHint: 'Hint / Vibe:',
    btnPrev: 'Previous',
    btnNext: 'Next Question',
    btnFinish: 'See My Results! 🌈',
    keyboardTip: 'Press keys 1-4 or A-D to select an answer, and Enter to proceed',
    selectOptionPrompt: 'Please select an option to continue',

    resultHeaderBadge: 'Your Rainbow Vibe Degree',
    resultScoreLabel: 'Your Rainbow Vibe Score',
    resultTraitsTitle: '4-Dimension Trait Radar',
    resultAdviceTitle: 'Personal Advice',
    btnSaveStoryCard: 'Save Story Card (Image) 🌈',
    btnShareSocial: 'Share & QR Code',
    btnCopySummary: 'Copy Result Text',
    btnPlayAgain: 'Play Again',
    resultDisclaimer: 'This quiz is made for fun, smiles, and friendship. Be proud of who you are! 🏳️‍🌈✨',

    shareModalTitle: 'Publish & Share Results',
    shareModalSubtitle: 'Spread the joy and challenge your friends to play',
    tabSocial: 'Social Share',
    tabQr: 'QR Code',
    tabCard: 'Image Card',
    shareTitleTemplate: '🌈 I scored {score}% Rainbow Vibe: "{title}" ({badge}) | Rainbow Vibe Quiz',
    shareGenericTitle: '🌈 Rainbow Vibe Quiz — 15 Fun Questions to Measure Your Rainbow Vibe',
    shareViaApp: 'Share via Apps',
    shareViaLine: 'Share to LINE',
    shareViaFacebook: 'Share to Facebook',
    shareViaTwitter: 'Post on X (Twitter)',
    copyShareLink: 'Copy share link:',
    qrInstructionTitle: 'Scan with your mobile camera to play instantly!',
    qrInstructionDesc: 'Perfect for parties, big screens, posters, or group chats.',
    btnDownloadQr: 'Download QR Code Image',
    storyCardStatusReal: 'Real Result Card:',
    btnReloadCard: 'Refresh',
    storyCardGenerating: 'Rendering your personalized Story Card...',
    storyCardDesc: 'Save a high-res 9:16 image ready for Instagram Story, Facebook Story, or TikTok.',
    btnDownloadCard: 'Download Card (Save Image)',
    canvasHeader: '🌈 RAINBOW VIBE QUIZ 🏳️‍🌈',
    canvasSubtitle: '15 Questions to Measure Your Rainbow Vibe',
    canvasScoreLabel: 'Your Rainbow Vibe Score',
    canvasTraitsLabel: '📊 Trait Radar Levels:',
    canvasAdviceLabel: '💡 Personal Advice:',
    canvasFooterUrl: '🔗 Play & share at: https://www.gaykub.online',
    canvasFooterCta: 'Scan or click to discover your Rainbow Vibe score!',

    resetModalTitle: 'Restart the Quiz?',
    resetModalDesc: 'Your saved answers will be reset and you will start fresh from Question 1.',
    resetModalConfirmBtn: 'Yes, Start Over',
    resetModalCancelBtn: 'Keep Playing',

    reviewSectionTitle: 'What do you think of this quiz? 💬',
    reviewSectionSubtitle: 'Rate and share your thoughts to spread positive energy to fellow players.',
    reviewRatingPrompt: 'Tap to rate (1 - 5 stars):',
    reviewNamePlaceholder: 'Your Name (optional)',
    reviewNameOptional: 'Leave blank to use "Rainbow Friend"',
    defaultUserName: 'Rainbow Friend',
    reviewCommentPlaceholder: 'Write a short comment... (up to 280 characters)',
    reviewCommentLimit: 'characters',
    btnSubmitReview: 'Submit Review ✨',
    reviewSubmitting: 'Submitting...',
    reviewSubmittedSuccess: 'Thank you for your wonderful review! 💖',
    reviewEmptyError: 'Please type a review before submitting.',
    reviewCooldownError: 'Review submitted! Please wait a moment before sending another.',
    reviewListTitle: 'Latest Reviews from Rainbow Friends',
    reviewEmptyList: 'No reviews yet. Be the first one to review this quiz! 🌈',
    btnReportComment: 'Report',
    commentReportedTag: 'Reported',

    reportModalTitle: 'Report an Issue / Feedback 💡',
    reportModalSubtitle: 'Help us make this quiz even more fun, accurate, and safe.',
    reportCategoryLabel: 'Select Category:',
    catBug: 'Bug / Technical Issue',
    catTranslation: 'Translation / Typo',
    catInappropriateComment: 'Inappropriate Comment',
    catSuggestion: 'Idea / Feature Suggestion',
    reportDetailsPlaceholder: 'Describe the issue or idea... (up to 500 characters)',
    reportLinkedCommentBanner: 'Reporting Comment:',
    btnSubmitReport: 'Submit Report 🚀',
    reportSubmitting: 'Submitting...',
    reportSubmittedSuccess: 'Thank you! We received your feedback and will review it promptly. 💖',
    reportEmptyError: 'Please provide some details before submitting.',

    adminTitle: 'Admin Moderation Panel',
    adminPinPrompt: 'Enter PIN to access moderator dashboard:',
    adminPinPlaceholder: 'Enter PIN (default: 1234)',
    btnAdminLogin: 'Log In',
    adminInvalidPin: 'Invalid PIN code.',
    adminTabReports: 'Reports',
    adminTabReviews: 'Moderate Reviews',
    statusNew: 'New',
    statusInvestigating: 'Investigating',
    statusResolved: 'Resolved',
    btnMarkStatus: 'Change Status',
    btnHideReview: 'Hide Comment',
    btnUnpinHideReview: 'Unhide Comment',
    adminNoReports: 'No reports submitted at this time.',
    adminNoReviews: 'No reviews found in database.',

    footerSupport: 'Report & Feedback',
    btnOpenFeedback: 'Feedback & Report',
    btnOpenAdmin: 'Admin',
    allPlatformsSupported: '✨ Optimized for all platforms (Mobile, Desktop, iOS, Android)',
  },

  zh: {
    appName: 'Rainbow Vibe Quiz',
    appTagline: '15道趣味题目测出你的彩虹魅力指数',
    prideEdition: 'Pride Edition',
    loading: '加载中...',
    close: '关闭',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    back: '返回',
    copied: '已复制！',
    copy: '复制',

    soundOn: '开启音效',
    soundOff: '静音',
    shareQuiz: '分享测验',
    restartQuiz: '重新测试',
    switchLanguage: '语言',

    introBadge: '热门15题测验',
    introTitle: 'Rainbow Vibe Quiz',
    introSubtitle: '通过超有趣的流行文化趣味问答，测出属于你的真我彩虹魅力！',
    introStartBtn: '立即开始测验 🌈',
    introResumeBtn: '继续上次进度 ✨',
    introSavedNotice: '你已保存答题进度于第',
    introEstimatedTime: '约需3分钟',
    introQuestionCount: '15道趣味题目',
    introInstantResult: '即时出分',
    introFeaturePrivacy: '100% 隐私安全',
    introFeaturePrivacyDesc: '不收集任何个人数据，分数完全在本地浏览器计算。',
    introFeatureFun: '流行梗与文化精选',
    introFeatureFunDesc: '涵盖泰剧、音乐、时尚、爱豆与流行文化日常。',
    introFeatureStory: '精美故事图片卡',
    introFeatureStoryDesc: '一键生成9:16社交故事海报，轻松分享至小红书、IG与微信。',
    introDisclaimer: '本测验仅供娱乐，弘扬多元与包容的Pride精神 🏳️‍🌈',

    questionProgress: '第',
    questionHint: '提示 / 氛围：',
    btnPrev: '上一题',
    btnNext: '下一题',
    btnFinish: '查看测试结果！🌈',
    keyboardTip: '按键盘 1-4 或 A-D 选择答案，按 Enter 进入下一题',
    selectOptionPrompt: '请先选择一个选项继续',

    resultHeaderBadge: '彩虹魅力评估报告',
    resultScoreLabel: '你的彩虹魅力指数',
    resultTraitsTitle: '四维特质雷达',
    resultAdviceTitle: '独家专属建议',
    btnSaveStoryCard: '保存图片海报 (Story Card) 🌈',
    btnShareSocial: '分享结果 & 二维码',
    btnCopySummary: '复制测试摘要',
    btnPlayAgain: '再测一次',
    resultDisclaimer: '测试结果仅供娱乐分享，每一份独特都是最好的自己！🏳️‍🌈✨',

    shareModalTitle: '发布与分享测试',
    shareModalSubtitle: '把快乐传递给身边的朋友们',
    tabSocial: '社交分享',
    tabQr: '二维码',
    tabCard: '图片海报',
    shareTitleTemplate: '🌈 我的彩虹魅力指数高达 {score}%：“{title}” ({badge}) | Rainbow Vibe Quiz',
    shareGenericTitle: '🌈 Rainbow Vibe Quiz — 15道趣味题测出你的彩虹魅力',
    shareViaApp: '系统分享 (Share)',
    shareViaLine: '分享至 LINE',
    shareViaFacebook: '分享至 Facebook',
    shareViaTwitter: '发布到 X (Twitter)',
    copyShareLink: '复制分享链接：',
    qrInstructionTitle: '使用手机相机扫码即可立即开玩！',
    qrInstructionDesc: '适合投屏派对、社群分享或打印展示。',
    btnDownloadQr: '下载二维码图片',
    storyCardStatusReal: '真实测试卡片：',
    btnReloadCard: '重新渲染',
    storyCardGenerating: '正在为你生成专属故事海报...',
    storyCardDesc: '生成高清 9:16 图片，可直接发布至 Instagram Story、朋友圈或小红书。',
    btnDownloadCard: '保存图片到本地 (Save Image)',
    canvasHeader: '🌈 RAINBOW VIBE QUIZ 🏳️‍🌈',
    canvasSubtitle: '15道趣味题目测出你的彩虹魅力',
    canvasScoreLabel: '你的彩虹魅力指数',
    canvasTraitsLabel: '📊 四维能力分析：',
    canvasAdviceLabel: '💡 独家专属建议：',
    canvasFooterUrl: '🔗 免费游玩：https://www.gaykub.online',
    canvasFooterCta: '扫码或点击链接测测你的彩虹能量！',

    resetModalTitle: '确定重新开始测试？',
    resetModalDesc: '当前的答题记录将被重置，并将从第1题重新开始。',
    resetModalConfirmBtn: '确定，重新开始',
    resetModalCancelBtn: '继续答题',

    reviewSectionTitle: '你觉得这个测验怎么样？💬',
    reviewSectionSubtitle: '打个分并留下简评，把正能量传递给更多朋友！',
    reviewRatingPrompt: '点击星星评分 (1 - 5 星)：',
    reviewNamePlaceholder: '你的昵称 (选填)',
    reviewNameOptional: '留空将显示为 "Rainbow Friend"',
    defaultUserName: 'Rainbow Friend',
    reviewCommentPlaceholder: '写下简短的感想...（最多280字）',
    reviewCommentLimit: '字',
    btnSubmitReview: '提交评价 ✨',
    reviewSubmitting: '提交中...',
    reviewSubmittedSuccess: '感谢你的精彩评价！💖',
    reviewEmptyError: '请先输入评价内容后再提交。',
    reviewCooldownError: '评价已提交，请稍后再试。',
    reviewListTitle: '彩虹伙伴们的最新评价',
    reviewEmptyList: '暂无评价，快来抢先留下第一条评价吧！🌈',
    btnReportComment: '举报',
    commentReportedTag: '已举报',

    reportModalTitle: '问题反馈 / 意见建议 💡',
    reportModalSubtitle: '帮助我们将本测验打造得更棒、更有趣。',
    reportCategoryLabel: '选择类型：',
    catBug: '网站异常 / Bug',
    catTranslation: '翻译错误 / 错别字',
    catInappropriateComment: '不当言论举报',
    catSuggestion: '新玩法 / 意见建议',
    reportDetailsPlaceholder: '请详细描述您遇到的问题或建议...（最多500字）',
    reportLinkedCommentBanner: '正在举报的评论：',
    btnSubmitReport: '提交反馈 🚀',
    reportSubmitting: '提交中...',
    reportSubmittedSuccess: '我们已收到您的反馈，感谢共同维护友好社区！💖',
    reportEmptyError: '请填写详细描述后提交。',

    adminTitle: '管理员控制台',
    adminPinPrompt: '请输入管理员 PIN 码：',
    adminPinPlaceholder: '输入 PIN (默认: 1234)',
    btnAdminLogin: '登入',
    adminInvalidPin: 'PIN 码不正确',
    adminTabReports: '问题反馈列表',
    adminTabReviews: '评论审核管理',
    statusNew: '新反馈',
    statusInvestigating: '排查中',
    statusResolved: '已解决',
    btnMarkStatus: '变更状态',
    btnHideReview: '隐藏此评论',
    btnUnpinHideReview: '取消隐藏',
    adminNoReports: '目前暂无问题反馈。',
    adminNoReviews: '系统内暂无评论数据。',

    footerSupport: '问题反馈 & 意见',
    btnOpenFeedback: '反馈与举报',
    btnOpenAdmin: '管理后台',
    allPlatformsSupported: '✨ 完美适配全平台（手机、电脑、iOS、Android）',
  },

  ja: {
    appName: 'Rainbow Vibe Quiz',
    appTagline: 'レインボー度を楽しく測定する15の質問',
    prideEdition: 'Pride Edition',
    loading: '読み込み中...',
    close: '閉じる',
    cancel: 'キャンセル',
    confirm: '確認',
    save: '保存',
    delete: '削除',
    back: '戻る',
    copied: 'コピー完了！',
    copy: 'コピー',

    soundOn: 'サウンドON',
    soundOff: 'サウンドOFF',
    shareQuiz: 'クイズをシェア',
    restartQuiz: '最初からやり直す',
    switchLanguage: '言語切替',

    introBadge: '大人気 15問診断',
    introTitle: 'Rainbow Vibe Quiz',
    introSubtitle: 'ポップカルチャー満載の楽しい質問で、あなたのレインボー度と魅力を診断！',
    introStartBtn: '診断スタート 🌈',
    introResumeBtn: '前回の続きから ✨',
    introSavedNotice: '保存済みの進捗：第',
    introEstimatedTime: '所要時間：約3分',
    introQuestionCount: '全15問',
    introInstantResult: '即時スコア判定',
    introFeaturePrivacy: '100% プライバシー保護',
    introFeaturePrivacyDesc: '個人情報は一切収集しません。ブラウザ上で安全に算出。',
    introFeatureFun: 'ミーム＆カルチャー満載',
    introFeatureFunDesc: 'ドラマ、音楽、ファッション、推し活カルチャーをたっぷり収録。',
    introFeatureStory: 'シェア用ストーリー画像',
    introFeatureStoryDesc: 'InstagramやTikTokにすぐ投稿できる9:16縦型カードを自動生成。',
    introDisclaimer: 'このクイズはエンターテインメントとLGBTQ+ Prideの祝福を目的に作成されています 🏳️‍🌈',

    questionProgress: '第',
    questionHint: 'ヒント / 雰囲気：',
    btnPrev: '前の質問',
    btnNext: '次の質問',
    btnFinish: '結果を見る！🌈',
    keyboardTip: 'キーボードの 1〜4 または A〜D で選択、Enterで次へ進めます',
    selectOptionPrompt: '選択肢を1つ選んでください',

    resultHeaderBadge: 'レインボー度 診断結果',
    resultScoreLabel: 'あなたのレインボー度スコア',
    resultTraitsTitle: '4次元スキルレーダー',
    resultAdviceTitle: 'あなたへのアドバイス',
    btnSaveStoryCard: 'ストーリーカード保存 (画像) 🌈',
    btnShareSocial: 'SNSシェア ＆ QRコード',
    btnCopySummary: '結果テキストをコピー',
    btnPlayAgain: 'もう一度プレイ',
    resultDisclaimer: 'このクイズは楽しむためのものです。自分らしい輝きを大切に！🏳️‍🌈✨',

    shareModalTitle: '結果をシェアする',
    shareModalSubtitle: '友だちにもシェアして一緒に楽しもう',
    tabSocial: 'SNSシェア',
    tabQr: 'QRコード',
    tabCard: '画像カード',
    shareTitleTemplate: '🌈 私のレインボー度は {score}%:「{title}」({badge}) | Rainbow Vibe Quiz',
    shareGenericTitle: '🌈 Rainbow Vibe Quiz — レインボー度を楽しく測定する15問診断',
    shareViaApp: '共有メニュー (Share)',
    shareViaLine: 'LINEで送る',
    shareViaFacebook: 'Facebookでシェア',
    shareViaTwitter: 'X (Twitter) に投稿',
    copyShareLink: '共有リンクをコピー：',
    qrInstructionTitle: 'スマホのカメラでスキャンして今すぐプレイ！',
    qrInstructionDesc: 'パーティーや大画面、オフ会でのシェアに最適です。',
    btnDownloadQr: 'QRコード画像をダウンロード',
    storyCardStatusReal: '実際の診断結果カード：',
    btnReloadCard: '再生成',
    storyCardGenerating: 'ストーリーカードを生成中...',
    storyCardDesc: 'Instagram StoriesやTikTokにぴったりの9:16縦型画像を保存できます。',
    btnDownloadCard: 'カード画像を保存 (Save Image)',
    canvasHeader: '🌈 RAINBOW VIBE QUIZ 🏳️‍🌈',
    canvasSubtitle: 'レインボー度を楽しく測定する15の質問',
    canvasScoreLabel: 'あなたのレインボー度スコア',
    canvasTraitsLabel: '📊 特性レーダーレベル：',
    canvasAdviceLabel: '💡 あなたへのアドバイス：',
    canvasFooterUrl: '🔗 プレイはこちら: https://www.gaykub.online',
    canvasFooterCta: 'スキャンまたはクリックしてあなたのレインボー度を測定！',

    resetModalTitle: '最初からやり直しますか？',
    resetModalDesc: 'これまでの回答データがリセットされ、第1問から再開します。',
    resetModalConfirmBtn: 'はい、やり直す',
    resetModalCancelBtn: 'このまま続ける',

    reviewSectionTitle: 'このクイズはどうでしたか？💬',
    reviewSectionSubtitle: '星評価とコメントで、みんなにポジティブな元気を届けよう！',
    reviewRatingPrompt: 'タップして評価 (1〜5つ星):',
    reviewNamePlaceholder: 'お名前（省略可）',
    reviewNameOptional: '空欄の場合は "Rainbow Friend" と表示されます',
    defaultUserName: 'Rainbow Friend',
    reviewCommentPlaceholder: '短いコメントを書いてね...（最大280文字）',
    reviewCommentLimit: '文字',
    btnSubmitReview: 'レビューを投稿 ✨',
    reviewSubmitting: '投稿中...',
    reviewSubmittedSuccess: '素敵なレビューをありがとうございます！💖',
    reviewEmptyError: 'レビュー内容を入力してください。',
    reviewCooldownError: '投稿完了しました。少し時間をおいてから再度投稿してください。',
    reviewListTitle: 'みんなの最新レビュー',
    reviewEmptyList: 'まだレビューがありません。最初のレビューを投稿してみよう！🌈',
    btnReportComment: '通報',
    commentReportedTag: '通報済み',

    reportModalTitle: '不具合報告 / ご意見・ご要望 💡',
    reportModalSubtitle: 'より楽しく安全なクイズ運営にご協力ください。',
    reportCategoryLabel: 'カテゴリを選択：',
    catBug: 'バグ / 動作の不具合',
    catTranslation: '誤訳 / 誤字脱字',
    catInappropriateComment: '不適切なコメントの通報',
    catSuggestion: '機能・アイデアの提案',
    reportDetailsPlaceholder: '詳細を入力してください...（最大500文字）',
    reportLinkedCommentBanner: '対象のコメント：',
    btnSubmitReport: '送信する 🚀',
    reportSubmitting: '送信中...',
    reportSubmittedSuccess: 'ご報告ありがとうございます。内容を確認いたします！💖',
    reportEmptyError: '詳細を入力してください。',

    adminTitle: '管理者用モデレーション',
    adminPinPrompt: 'PINコードを入力してください：',
    adminPinPlaceholder: 'PINを入力 (デフォルト: 1234)',
    btnAdminLogin: 'ログイン',
    adminInvalidPin: 'PINコードが正しくありません',
    adminTabReports: '不具合・通報一覧',
    adminTabReviews: 'レビュー管理',
    statusNew: '新規',
    statusInvestigating: '調査中',
    statusResolved: '解決済み',
    btnMarkStatus: 'ステータス変更',
    btnHideReview: 'このコメントを非表示',
    btnUnpinHideReview: '非表示を解除',
    adminNoReports: '現在、報告はありません。',
    adminNoReviews: 'レビューデータがありません。',

    footerSupport: '問題報告＆ご意見',
    btnOpenFeedback: '問題報告 / ご意見',
    btnOpenAdmin: 'Admin',
    allPlatformsSupported: '✨ 全てのデバイスに対応（Mobile, Desktop, iOS, Android）',
  },

  ko: {
    appName: 'Rainbow Vibe Quiz',
    appTagline: '당신의 레인보우 무드를 측정하는 15가지 질문',
    prideEdition: 'Pride Edition',
    loading: '로딩 중...',
    close: '닫기',
    cancel: '취소',
    confirm: '확인',
    save: '저장',
    delete: '삭제',
    back: '뒤로',
    copied: '복사 완료!',
    copy: '복사',

    soundOn: '소리 켜기',
    soundOff: '소리 끄기',
    shareQuiz: '퀴즈 공유하기',
    restartQuiz: '다시 시작하기',
    switchLanguage: '언어 변경',

    introBadge: '화제의 15문항 퀴즈',
    introTitle: 'Rainbow Vibe Quiz',
    introSubtitle: '유쾌하고 힙한 팝컬처 질문들을 통해 당신 안의 레인보우 매력 지수를 발견해보세요!',
    introStartBtn: '퀴즈 시작하기 🌈',
    introResumeBtn: '이어서 풀기 ✨',
    introSavedNotice: '저장된 진행 상황: 제',
    introEstimatedTime: '소요 시간 약 3분',
    introQuestionCount: '15가지 질문',
    introInstantResult: '즉시 결과 확인',
    introFeaturePrivacy: '100% 개인정보 보호',
    introFeaturePrivacyDesc: '어떠한 개인정보도 수집하지 않으며, 브라우저에서 안전하게 채점됩니다.',
    introFeatureFun: '밈 & 팝컬처 가득',
    introFeatureFunDesc: '음악, 패션, 드라마, 케이팝 등 생생한 트렌드를 담았습니다.',
    introFeatureStory: '스토리 공유 카드',
    introFeatureStoryDesc: '인스타그램, 틱톡에 바로 올릴 수 있는 세련된 9:16 스토리 카드를 생성합니다.',
    introDisclaimer: '이 퀴즈는 즐거움과 다양성을 기념하기 위해 제작되었습니다 🏳️‍🌈',

    questionProgress: '질문',
    questionHint: '힌트 / 무드:',
    btnPrev: '이전 질문',
    btnNext: '다음 질문',
    btnFinish: '결과 확인하기! 🌈',
    keyboardTip: '키보드 1-4 또는 A-D를 눌러 선택하고 Enter를 눌러 다음으로 넘어가세요',
    selectOptionPrompt: '계속하려면 보기를 하나 선택해 주세요',

    resultHeaderBadge: '레인보우 무드 진단 결과',
    resultScoreLabel: '당신의 레인보우 매력 지수',
    resultTraitsTitle: '4차원 스킬 레이더',
    resultAdviceTitle: '맞춤 조언',
    btnSaveStoryCard: '스토리 카드 저장 (이미지) 🌈',
    btnShareSocial: '공유하기 & QR 코드',
    btnCopySummary: '결과 요약 복사',
    btnPlayAgain: '다시 테스트하기',
    resultDisclaimer: '이 퀴즈는 재미와 긍정적인 에너지를 위해 만들어졌습니다. 당신 그대로 멋져요! 🏳️‍🌈✨',

    shareModalTitle: '결과 공유하기',
    shareModalSubtitle: '친구들에게 공유하고 함께 퀴즈를 즐겨보세요',
    tabSocial: 'SNS 공유',
    tabQr: 'QR 코드',
    tabCard: '이미지 카드',
    shareTitleTemplate: '🌈 나의 레인보우 무드 지수는 {score}%: "{title}" ({badge}) | Rainbow Vibe Quiz',
    shareGenericTitle: '🌈 Rainbow Vibe Quiz — 15가지 질문으로 알아보는 레인보우 무드',
    shareViaApp: '앱으로 공유 (Share)',
    shareViaLine: 'LINE으로 공유',
    shareViaFacebook: 'Facebook에 공유',
    shareViaTwitter: 'X (트위터)에 게시',
    copyShareLink: '공유 링크 복사:',
    qrInstructionTitle: '휴대폰 카메라로 스캔하여 바로 플레이하세요!',
    qrInstructionDesc: '파티, 모임 화면, 단체방 공유에 안성맞춤입니다.',
    btnDownloadQr: 'QR 코드 이미지 다운로드',
    storyCardStatusReal: '실제 결과 카드:',
    btnReloadCard: '새로고침',
    storyCardGenerating: '멋진 스토리 카드를 생성하는 중...',
    storyCardDesc: '인스타그램 스토리, 페이스북, 틱톡에 맞는 9:16 비율 이미지를 다운로드할 수 있습니다.',
    btnDownloadCard: '카드 저장하기 (Save Image)',
    canvasHeader: '🌈 RAINBOW VIBE QUIZ 🏳️‍🌈',
    canvasSubtitle: '15가지 질문으로 측정하는 레인보우 무드',
    canvasScoreLabel: '당신의 레인보우 매력 지수',
    canvasTraitsLabel: '📊 특성 레이더 레벨:',
    canvasAdviceLabel: '💡 맞춤 조언:',
    canvasFooterUrl: '🔗 플레이 링크: https://www.gaykub.online',
    canvasFooterCta: '스캔하거나 클릭하여 당신의 레인보우 지수를 확인하세요!',

    resetModalTitle: '처음부터 다시 시작하시겠습니까?',
    resetModalDesc: '저장된 모든 답변이 초기화되며 1번 질문부터 다시 시작합니다.',
    resetModalConfirmBtn: '네, 다시 시작할게요',
    resetModalCancelBtn: '계속 풀기',

    reviewSectionTitle: '이 퀴즈, 어떠셨나요? 💬',
    reviewSectionSubtitle: '별점과 한 줄 평을 남겨 다른 친구들에게 긍정의 에너지를 전해주세요!',
    reviewRatingPrompt: '별점을 터치해 주세요 (1 - 5점):',
    reviewNamePlaceholder: '이름 (선택 사항)',
    reviewNameOptional: '비워둘 경우 "Rainbow Friend"로 표시됩니다',
    defaultUserName: 'Rainbow Friend',
    reviewCommentPlaceholder: '짧은 코멘트를 남겨보세요... (최대 280자)',
    reviewCommentLimit: '자',
    btnSubmitReview: '리뷰 등록하기 ✨',
    reviewSubmitting: '등록 중...',
    reviewSubmittedSuccess: '소중한 리뷰를 남겨주셔서 감사합니다! 💖',
    reviewEmptyError: '리뷰 내용을 작성해 주세요.',
    reviewCooldownError: '리뷰가 등록되었습니다. 잠시 후 다시 작성하실 수 있습니다.',
    reviewListTitle: '친구들의 최근 리뷰',
    reviewEmptyList: '아직 리뷰가 없습니다. 첫 번째 리뷰어가 되어보세요! 🌈',
    btnReportComment: '신고',
    commentReportedTag: '신고됨',

    reportModalTitle: '문제 신고 / 피드백 💡',
    reportModalSubtitle: '퀴즈를 더 즐겁고 안전하게 개선할 수 있도록 도와주세요.',
    reportCategoryLabel: '유형 선택:',
    catBug: '웹 오류 / 버그',
    catTranslation: '번역 오류 / 오타',
    catInappropriateComment: '부적절한 댓글 신고',
    catSuggestion: '아이디어 / 기능 제안',
    reportDetailsPlaceholder: '내용을 자세히 적어주세요... (최대 500자)',
    reportLinkedCommentBanner: '신고 대상 댓글:',
    btnSubmitReport: '피드백 제출하기 🚀',
    reportSubmitting: '제출 중...',
    reportSubmittedSuccess: '피드백을 접수했습니다. 안전한 커뮤니티에 동참해 주셔서 감사합니다! 💖',
    reportEmptyError: '상세 내용을 입력해 주세요.',

    adminTitle: '관리자 대시보드',
    adminPinPrompt: '접근을 위한 PIN 코드를 입력하세요:',
    adminPinPlaceholder: 'PIN 입력 (기본값: 1234)',
    btnAdminLogin: '로그인',
    adminInvalidPin: 'PIN 코드가 올바르지 않습니다.',
    adminTabReports: '신고/피드백 내역',
    adminTabReviews: '리뷰 관리',
    statusNew: '신규',
    statusInvestigating: '검토 중',
    statusResolved: '해결됨',
    btnMarkStatus: '상태 변경',
    btnHideReview: '댓글 숨기기',
    btnUnpinHideReview: '숨김 해제',
    adminNoReports: '현재 접수된 신고가 없습니다.',
    adminNoReviews: '등록된 리뷰가 없습니다.',

    footerSupport: '문제 신고 & 의견 보내기',
    btnOpenFeedback: '문의 및 제보',
    btnOpenAdmin: 'Admin',
    allPlatformsSupported: '✨ 모든 기기 지원 (모바일, 데스크톱, iOS, Android)',
  },

  es: {
    appName: 'Rainbow Vibe Quiz',
    appTagline: '15 Preguntas Divertidas para Medir tu Energía Arcoíris',
    prideEdition: 'Pride Edition',
    loading: 'Cargando...',
    close: 'Cerrar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    delete: 'Eliminar',
    back: 'Atrás',
    copied: '¡Copiado!',
    copy: 'Copiar',

    soundOn: 'Sonido activado',
    soundOff: 'Sonido desactivado',
    shareQuiz: 'Compartir test',
    restartQuiz: 'Reiniciar test',
    switchLanguage: 'Idioma',

    introBadge: 'Test Popular de 15 Preguntas',
    introTitle: 'Rainbow Vibe Quiz',
    introSubtitle: '¡Descubre tu auténtico grado de energía arcoíris con preguntas divertidas de cultura pop y arte vibrante!',
    introStartBtn: 'Empezar el Test 🌈',
    introResumeBtn: 'Continuar donde lo dejaste ✨',
    introSavedNotice: 'Tienes progreso guardado en la pregunta',
    introEstimatedTime: 'Toma aprox. 3 minutos',
    introQuestionCount: '15 Preguntas',
    introInstantResult: 'Resultado Inmediato',
    introFeaturePrivacy: '100% Privado',
    introFeaturePrivacyDesc: 'No recopilamos datos personales. Tu puntuación se calcula en tu navegador.',
    introFeatureFun: 'Memes y Cultura Pop',
    introFeatureFunDesc: 'Lleno de música, moda, series y momentos icónicos.',
    introFeatureStory: 'Tarjeta para Historias',
    introFeatureStoryDesc: 'Genera una tarjeta 9:16 lista para compartir en Instagram Stories y TikTok.',
    introDisclaimer: 'Este cuestionario está hecho con fines de entretenimiento y celebración del Orgullo LGBTQ+ 🏳️‍🌈',

    questionProgress: 'Pregunta',
    questionHint: 'Pista / Vibra:',
    btnPrev: 'Anterior',
    btnNext: 'Siguiente',
    btnFinish: '¡Ver mis Resultados! 🌈',
    keyboardTip: 'Presiona las teclas 1-4 o A-D para elegir respuesta y Enter para avanzar',
    selectOptionPrompt: 'Por favor selecciona una opción para continuar',

    resultHeaderBadge: 'Tu Grado de Energía Arcoíris',
    resultScoreLabel: 'Tu Puntuación Arcoíris',
    resultTraitsTitle: 'Radar de Habilidades 4D',
    resultAdviceTitle: 'Consejo Personalizado',
    btnSaveStoryCard: 'Guardar Tarjeta de Historia (Imagen) 🌈',
    btnShareSocial: 'Compartir y Código QR',
    btnCopySummary: 'Copiar Resumen',
    btnPlayAgain: 'Jugar de Nuevo',
    resultDisclaimer: '¡Este test fue creado para divertirse y sonreír! Siéntete orgulloso/a de quién eres 🏳️‍🌈✨',

    shareModalTitle: 'Compartir Resultados',
    shareModalSubtitle: 'Comparte la diversión y reta a tus amigos a jugar',
    tabSocial: 'Redes Sociales',
    tabQr: 'Código QR',
    tabCard: 'Tarjeta de Imagen',
    shareTitleTemplate: '🌈 Obtuve {score}% de Energía Arcoíris: "{title}" ({badge}) | Rainbow Vibe Quiz',
    shareGenericTitle: '🌈 Rainbow Vibe Quiz — 15 Preguntas para Medir tu Energía Arcoíris',
    shareViaApp: 'Compartir en Apps',
    shareViaLine: 'Compartir en LINE',
    shareViaFacebook: 'Compartir en Facebook',
    shareViaTwitter: 'Publicar en X (Twitter)',
    copyShareLink: 'Copiar enlace:',
    qrInstructionTitle: '¡Escanea con tu cámara móvil para jugar al instante!',
    qrInstructionDesc: 'Ideal para fiestas, pantallas grandes, carteles o grupos de chat.',
    btnDownloadQr: 'Descargar Código QR',
    storyCardStatusReal: 'Tarjeta con Resultado Real:',
    btnReloadCard: 'Recargar',
    storyCardGenerating: 'Generando tu tarjeta de historia...',
    storyCardDesc: 'Guarda una imagen 9:16 en alta resolución para Instagram Stories, TikTok o Facebook.',
    btnDownloadCard: 'Guardar Tarjeta (Save Image)',
    canvasHeader: '🌈 RAINBOW VIBE QUIZ 🏳️‍🌈',
    canvasSubtitle: '15 Preguntas Divertidas de Energía Arcoíris',
    canvasScoreLabel: 'Tu Puntuación Arcoíris',
    canvasTraitsLabel: '📊 Niveles del Radar:',
    canvasAdviceLabel: '💡 Consejo Personal:',
    canvasFooterUrl: '🔗 Juega gratis en: https://www.gaykub.online',
    canvasFooterCta: '¡Escanea o haz clic para descubrir tu resultado!',

    resetModalTitle: '¿Reiniciar el cuestionario?',
    resetModalDesc: 'Tus respuestas guardadas se borrarán y comenzarás desde la pregunta 1.',
    resetModalConfirmBtn: 'Sí, reiniciar',
    resetModalCancelBtn: 'Seguir jugando',

    reviewSectionTitle: '¿Qué te pareció el test? 💬',
    reviewSectionSubtitle: 'Califica y comparte tu opinión para enviar buena vibra a los demás.',
    reviewRatingPrompt: 'Toca para calificar (1 a 5 estrellas):',
    reviewNamePlaceholder: 'Tu nombre (opcional)',
    reviewNameOptional: 'Déjalo vacío para usar "Rainbow Friend"',
    defaultUserName: 'Rainbow Friend',
    reviewCommentPlaceholder: 'Escribe un breve comentario... (máximo 280 caracteres)',
    reviewCommentLimit: 'caracteres',
    btnSubmitReview: 'Enviar Opinión ✨',
    reviewSubmitting: 'Enviando...',
    reviewSubmittedSuccess: '¡Muchas gracias por tu genial comentario! 💖',
    reviewEmptyError: 'Por favor escribe un comentario antes de enviar.',
    reviewCooldownError: '¡Comentario enviado! Por favor espera un momento antes de enviar otro.',
    reviewListTitle: 'Opiniones recientes de amigos arcoíris',
    reviewEmptyList: 'Aún no hay opiniones. ¡Sé el primero en dejar una! 🌈',
    btnReportComment: 'Reportar',
    commentReportedTag: 'Reportado',

    reportModalTitle: 'Reportar un Problema / Sugerencias 💡',
    reportModalSubtitle: 'Ayúdanos a hacer este test aún más divertido y seguro.',
    reportCategoryLabel: 'Selecciona una categoría:',
    catBug: 'Error técnico / Bug',
    catTranslation: 'Error de traducción / Ortografía',
    catInappropriateComment: 'Comentario inapropiado',
    catSuggestion: 'Idea / Nueva función',
    reportDetailsPlaceholder: 'Describe los detalles... (máximo 500 caracteres)',
    reportLinkedCommentBanner: 'Reportando comentario:',
    btnSubmitReport: 'Enviar Reporte 🚀',
    reportSubmitting: 'Enviando...',
    reportSubmittedSuccess: '¡Hemos recibido tu mensaje! Gracias por ayudarnos a mejorar. 💖',
    reportEmptyError: 'Por favor escribe algunos detalles antes de enviar.',

    adminTitle: 'Panel de Moderación Admin',
    adminPinPrompt: 'Ingresa el PIN de moderador:',
    adminPinPlaceholder: 'Ingresa PIN (por defecto: 1234)',
    btnAdminLogin: 'Iniciar Sesión',
    adminInvalidPin: 'Código PIN incorrecto.',
    adminTabReports: 'Reportes',
    adminTabReviews: 'Moderar Comentarios',
    statusNew: 'Nuevo',
    statusInvestigating: 'En revisión',
    statusResolved: 'Resuelto',
    btnMarkStatus: 'Cambiar Estado',
    btnHideReview: 'Ocultar comentario',
    btnUnpinHideReview: 'Mostrar comentario',
    adminNoReports: 'No hay reportes en este momento.',
    adminNoReviews: 'No se encontraron comentarios en la base de datos.',

    footerSupport: 'Reportes y Sugerencias',
    btnOpenFeedback: 'Reportar / Sugerencias',
    btnOpenAdmin: 'Admin',
    allPlatformsSupported: '✨ Optimizado para todas las plataformas (Móvil, PC, iOS, Android)',
  },
};
