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

// th + en ship in the main bundle; other languages load on demand (see locales.ts)
export const translations: Partial<Record<SupportedLang, TranslationDictionary>> = {
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
    introSubtitle: 'เคยสงสัยไหมว่าอินเนอร์ของคุณซ่อนความมุ้งมิ้งในระดับไหน? เมื่อเพลง T-pop หรือ Lisa ดังขึ้นคุณลืมขาที่ไหน? เห็นมีไวรัลแล้วเกิดไวกว่าใครหรือเปล่า? มาทดสอบความลื่นไหลและดึงสัญญาณแห่งสีรุ้งผ่านคำถาม 15 ข้อ ที่จะสรุปผลลัพธ์เป็นเปอร์เซ็นต์ความตึงของคุณ พร้อมภาพประกอบสุดจึ้งทุกข้อ',
    introStartBtn: 'เริ่มทำแบบทดสอบเลย 🌈',
    introResumeBtn: 'ทำต่อจากข้อที่บันทึกไว้ ✨',
    introSavedNotice: 'คุณมีคำตอบที่ทำค้างไว้ในข้อที่',
    introEstimatedTime: 'ภาพประกอบฮาๆ สะเท่ทุกข้อ',
    introQuestionCount: '1 หน้าต่อ 1 คำถาม',
    introInstantResult: 'สรุปผลเป็น %',
    introFeaturePrivacy: 'ไม่เปิดเผยคะแนน',
    introFeaturePrivacyDesc: 'ซ่อนคะแนนลับทุกข้อ',
    introFeatureFun: 'มีมและอินเนอร์ตัวแม่',
    introFeatureFunDesc: 'รวบรวมสถานการณ์ชีวิตจริง วงการบันเทิง แฟชั่น และป๊อปคัลเจอร์',
    introFeatureStory: 'สรุปผลทันทีเมื่อเล่นจบ',
    introFeatureStoryDesc: 'รู้ผลทันทีเมื่อเล่นจบ',
    introDisclaimer: 'แบบทดสอบนี้จัดทำขึ้น เพื่อความบันเทิง คลายเครียด และเอาไว้เล่นกับเพื่อนแบบขำๆ เท่านั้น 😜 ย้ำอีกทีว่าเป็นแค่สื่อเพื่อรอยยิ้ม ไม่ใช่เครื่องมือวัดหรือตัดสินรสนิยมทางเพศจริงจังนะ ขอให้ทุกคนสนุกกับการตอบคำถามตามความรู้สึกจริง แล้วมารอดูกันว่าจะได้กี่ % กันนะ!',

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
};
