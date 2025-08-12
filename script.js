/* script.js
 - يحتوي على جميع الأسئلة والإجابات + واجهة العرض
 - احفظه كملف نصي بنفس الاسم وربطه في index.html
*/

/* ----- إعداد الأسئلة ----- 
   تنسيق كل عنصر:
   {
     id: <number>,
     section: "technical" | "aptitude" | "english",
     q: "نص السؤال",
     options: ["أ","ب","ج","د"],
     answer: indexOfCorrect (0-based),
     explanation: "شرح مختصر"
   }
*/
const QUESTIONS = [
  // (سأضع مجموعة كاملة من 70 سؤالاً — تستطيع تعديلها لاحقاً)
  {id:1, section:"technical", q:"ما هي المهمة الأساسية لـ 3-Phase Separator في محطة المعالجة؟",
   options:["إزالة الماء من الغاز فقط","فصل النفط والماء والغاز","تخزين النفط قبل الضخ","إزالة الأملاح من النفط"], answer:1,
   explanation:"الـ 3-Phase Separator يفصل ثلاث مراحل: الغاز، النفط والماء."},
  {id:2, section:"technical", q:"في وحدة Gas Sweetening باستخدام أمينات، الغرض الرئيسي هو:",
   options:["رفع ضغط الغاز","إزالة H₂S و CO₂ من الغاز الطبيعي","تبريد الغاز","زيادة نسبة الهيدروكربون"], answer:1,
   explanation:"الـ amine تُستخدم لإزالة الغازات الحمضية مثل H₂S و CO₂."},
  {id:3, section:"technical", q:"وظيفة الـ Regenerator في عملية Dehydration بالـ TEG هي:",
   options:["إزالة الماء من الـ TEG المستعمل","تسخين الغاز المنتج","فصل الزيت عن الماء","زيادة ضغط الـ TEG"], answer:0,
   explanation:"الـ Regenerator يعيد تنشيط الـ TEG بإزالة الماء بالحرارة."},
  {id:4, section:"technical", q:"أحد حلول مشكلة Foaming في الـ Separator هو:",
   options:["زيادة سرعة الجريان","إضافة مضاد رغوة (Anti-foaming)","خفض مستوى السائل","تفريغ الغاز مباشرة"], answer:1,
   explanation:"مضادات الرغوة تقلل الرغوة وتحسّن الفصل."},
  {id:5, section:"technical", q:"أي مستوى من H₂S يعتبر مميتًا ويتطلب إخلاء فوري؟",
   options:["5 ppm","15 ppm","50 ppm","100 ppm"], answer:3,
   explanation:"تركيزات عالية جداً مثل 100 ppm خطرة للغاية وتستدعي إخلاء فوري."},
  // --- أضف بقية الأسئلة بنفس النمط ---
  // سأكمل بشكل كامل (أضف أو عدل حسب رغبتك)
  {id:6, section:"technical", q:"ما سبب تكون الhydrates في خطوط الغاز؟",
   options:["وجود ماء ودرجات حرارة منخفضة وضغط مرتفع","زيادة نسبة الهيدروجين","تسرب الزيت","تلوث"], answer:0,
   explanation:"الهايدريت يتكون عندما يتوفر ماء ودرجات حرارة منخفضة مع ضغط مناسب."},
  {id:7, section:"technical", q:"ما نوع مبادل حراري Shell & Tube؟",
   options:["مبادل صلب","أنابيب داخل غلاف خارجي","مبادل للسوائل فقط","مبادل للغازات فقط"], answer:1,
   explanation:"أنابيب داخل غلاف خارجي؛ يستخدم لمرور سائلين لتبادل الحرارة."},
  {id:8, section:"technical", q:"ما المقصود بـ P&ID؟",
   options:["مخطط إنتاج يومي","مخطط أنابيب وصمامات ومعدات","قائمة جودة النفط","نوع من المضخات"], answer:1,
   explanation:"P&ID يوضح الأنابيب، الصمامات، والمعدات والأدوات."},
  {id:9, section:"technical", q:"ما وظيفة Knockout Drum؟",
   options:["فصل السوائل الصلبة","التقاط السوائل من تيار الغاز","زيادة ضغط الغاز","تسخين التيار"], answer:1,
   explanation:"يزيل القطرات السائلة الكبيرة من تيار الغاز."},
  {id:10, section:"technical", q:"أيهما يستخدم لتقليل ضغط البئر في اختبار الإنتاج؟",
   options:["Choke","Compressor","Heat Exchanger","Regenerator"], answer:0,
   explanation:"المخنق (choke) يستخدم للتحكم بمعدل التدفق والضغط في البئر."},

  // ... بقية الأسئلة التقنية حتى 40
  {id:11, section:"technical", q:"في المعالجة، ما هو emulsion؟",
   options:["خليط متجانس","خلية غازية","مزيج ماء ونفط بمستحلب","غاز مذاب"], answer:2,
   explanation:"مزيج ماء ونفط مستقر بسبب مواد مستحلبة."},
  {id:12, section:"technical", q:"ما الهدف من استخدام Corrosion Inhibitor؟",
   options:["زيادة لزوجة","منع التآكل","زيادة الإنتاج","تنظيف النفط"], answer:1, explanation:"يمنع التآكل في الأنابيب والمعدات."},
  {id:13, section:"technical", q:"ما وحدة قياس التدفق الشائعة في حقول الغاز؟",
   options:["bbl/day","mmscfd","m³/hr","kg/s"], answer:1, explanation:"mmscfd = million standard cubic feet per day."},
  {id:14, section:"technical", q:"ما وظيفة Hydrocyclone؟",
   options:["فصل الماء عن الغاز","فصل الزيت عن الماء بالقوة الطردية","تسخين النفط","تنقية الهواء"], answer:1, explanation:"يفصل الزيت عن الماء باستخدام قوى طرد مركزية."},
  {id:15, section:"technical", q:"عند حدوث CUI، السبب عادة:",
   options:["تآكل بفِعل الصخور","تراكم ماء خلف العزل","تلوث كيميائي","خلو الأنابيب"], answer:1, explanation:"الماء خلف العزل يؤدي لتآكل تحت العزل."},
  {id:16, section:"technical", q:"الغرض من PRV؟",
   options:["زيادة الضغط","خفض الضغط عند الحد الآمن","قياس الضغط","تدفئة النظام"], answer:1, explanation:"صمام أمان يطلق الضغط الزائد."},
  {id:17, section:"technical", q:"لماذا نستخدم Intercooler بين مراحل الضاغط؟",
   options:["لتقليل الضغط","لتسخين","لإزالة الحرارة وتحسين كفاءة الضاغط","لزيادة اللزوجة"], answer:2, explanation:"التبريد يقلل حجم الغاز ويحسن الكفاءة."},
  {id:18, section:"technical", q:"ما هي API Gravity؟",
   options:["مقياس الكبريت","كثافة السائل مقارنةً بالماء","وحدة ضغط","مقياس لزوجة"], answer:1, explanation:"مقياس لكثافة الخام مقارنة بالماء."},
  {id:19, section:"technical", q:"ما هو bbl؟",
   options:["طن","برميل (~159 لتر)","متر مكعب","جالون"], answer:1, explanation:"bbl = برميل ≈ 158.987 لتر."},
  {id:20, section:"technical", q:"هدف Gas Lift؟",
   options:["تقليل الهيدروجين","رفع الإنتاج بإدخال غاز للرفع","تسخين النفط","تنقية الغاز"], answer:1, explanation:"يُدخل غازًا لمساعدة دفع السوائل داخل البئر."},
  {id:21, section:"technical", q:"ما الفرق بين sweet و sour crude؟",
   options:["الطعم","كمية H2S أعلى في sour","محتوى الماء","اللون"], answer:1, explanation:"sour يحتوي على H2S وCO2 أكثر."},
  {id:22, section:"technical", q:"ما الذي يسبب emulsions المستقرة؟",
   options:["مستحلبات وملوثات","حرارة فقط","ضغط فقط","غبار"], answer:0, explanation:"المواد المستحلبة والملوثات توفر الاستقرار."},
  {id:23, section:"technical", q:"ما الغرض من Demulsifier؟",
   options:["زيادة الماء","كسر المستحلب لفصل الماء","تنقية الغاز","تقليل الضغط"], answer:1, explanation:"كسر المستحلب لتسهيل الفصل."},
  {id:24, section:"technical", q:"وحدة معدل إنتاج النفط الشائعة؟",
   options:["kg/s","bbl/day","°C","ppm"], answer:1, explanation:"البرميل يوميًا هو شائع لقياس النفط."},
  {id:25, section:"technical", q:"ماذا يرمز 'HX'؟",
   options:["Heat Exchanger","Hydrocracker","Holding Tank","Hand Valve"], answer:0, explanation:"HX = Heat Exchanger."},
  {id:26, section:"technical", q:"ما سبب Cavitation في المضخات؟",
   options:["فراغ بالخزان","هبوط ضغط عند المدخل لأقل من ضغط البخار","زيادة الأملاح","انخفاض اللزوجة"], answer:1, explanation:"انخفاض الضغط عند مدخل المضخة يؤدي لتشكّل فقاعات بخارية."},
  {id:27, section:"technical", q:"دور VCM؟",
   options:["تحلية الماء","حصر الأبخرة والتحكم بها","قياس الإنتاج","تعبئة"], answer:1, explanation:"للتحكم في انبعاث الأبخرة وإعادتها للنظام."},
  {id:28, section:"technical", q:"ما هو HAZOP؟",
   options:["تحليل المخاطر والتشغيل","نوع مضخة","قانون بيئي","مخطط"], answer:0, explanation:"منهجية تحليلية لتحديد المخاطر وعمليات التشغيل."},
  {id:29, section:"technical", q:"ما الذي يؤثر على اختيار مادة الأنابيب؟",
   options:["اللون","نوع الوسط ودرجة الحرارة والضغط","السعر","الشكل"], answer:1, explanation:"الوسط ودرجة الحرارة والضغط تحدد المادة المناسبة."},
  {id:30, section:"technical", q:"أول خطوة إذا اكتُشف H2S؟",
   options:["الاستمرار","إبلاغ والإخلاء وارتداء معدات","فتح صمامات","زيادة السرعة"], answer:1, explanation:"H2S خطر يتطلب إخلاء سريع وارتداء معدات الوقاية."},
  {id:31, section:"technical", q:"ما معنى slugging؟",
   options:["تدفق مستمر","تدفق متقطع مع كتل سائلة","نوع مضخة","مقياس ضغط"], answer:1, explanation:"كتل سائلة كبيرة تمر عبر خط الغاز بشكل متقطع."},
  {id:32, section:"technical", q:"أفضل إجراء لتقليل انبعاثات خزانات التخزين؟",
   options:["فتح الخزانات","استخدام Floating Roof أو Vapor Recovery","زيادة الحرارة","تفريغ إلى الهواء"], answer:1, explanation:"الأسطح العائمة وأنظمة استرداد الأبخرة تقلل الانبعاثات."},
  {id:33, section:"technical", q:"وظيفة Flame Arrestor؟",
   options:["زيادة اللهب","منع انتشار اللهب داخل النظام","قياس الغاز","خفض الضغط"], answer:1, explanation:"يمنع انتقال اللهب داخل الأنظمة."},
  {id:34, section:"technical", q:"ما الذي يحدد تصنيف PPE؟",
   options:["مستوى الخطر ونوع التعرض","اللون","سن العامل","المسمى الوظيفي"], answer:0, explanation:"اختيار PPE يعتمد على نوع ومستوى الخطر."},
  {id:35, section:"technical", q:"ما الذي يحسن كفاءة الفصل في العمود؟",
   options:["عدد النظرات/التعبئة","سرعة النت","لون العمود","الموقع"], answer:0, explanation:"زيادة عدد النظرات أو التعبئة تحسّن الفصل."},
  {id:36, section:"technical", q:"ما معنى BS&W؟",
   options:["Basic Sulfur & Water","Bottom Sediment & Water","Benzene Sulfur & Water","Base Scale & Weight"], answer:1, explanation:"BS&W يقيس نسبة الرواسب والماء في الخام."},
  {id:37, section:"technical", q:"عند وجود لزوجة عالية في النفط، الحلول الممكنة؟",
   options:["تسخين/مخففات/مضخات أقوى","خفض ضغط البئر","زيادة الحفر","فتح صمامات جديدة"], answer:0, explanation:"التسخين أو إضافة مخففات أو مضخات أقوى يساعد في النقل."},
  {id:38, section:"technical", q:"ما دور Scavenger في معالجة الغاز؟",
   options:["تنظيف المعدات","امتصاص الشوائب (مثل H2S)","رفع الضغط","قياس الحرارة"], answer:1, explanation:"Scavengers تمتص الشوائب كيميائياً."},
  {id:39, section:"technical", q:"ما المقصود بـ blowdown؟",
   options:["زيادة الإنتاج","تفريغ الضغط بأمان","صيانة المضخات","تنظيف الخزانات"], answer:1, explanation:"تفريغ آمن للضغط قبل العمل أو الصيانة."},
  {id:40, section:"technical", q:"لماذا نستخدم Level Control؟",
   options:["تحسين المظهر","منع overflow والحفاظ على تشغيل مستقر","زيادة الضجيج","تقليل الوزن"], answer:1, explanation:"التحكم بالمستوى يمنع الفيض ويضمن استقرار التشغيل."},

  // --- Aptitude 41-60 (أمثلة)
  {id:41, section:"aptitude", q:"إذا كان A=3 و B=5، فما قيمة 2A+3B؟",
   options:["19","21","22","23"], answer:1, explanation:"2*3 + 3*5 = 21."},
  {id:42, section:"aptitude", q:"أكمل: 2,4,8,16, ___ ?",
   options:["18","24","32","30"], answer:2, explanation:"متضاعف بـ2 => 32."},
  {id:43, section:"aptitude", q:"آلة تنتج 200 وحدة في 5 ساعات. كم ساعة لإنتاج 40 وحدة؟",
   options:["1","2","3","4"], answer:0, explanation:"200/5=40 => 40 وحدة تحتاج ساعة واحدة."},
  {id:44, section:"aptitude", q:"أي الشكل مختلف: مربع، دائرة، مثلث، برميل ثلاثي الأبعاد؟",
   options:["مربع","دائرة","مثلث","برميل"], answer:3, explanation:"البرميل شكل ثلاثي الأبعاد."},
  {id:45, section:"aptitude", q:"حوالي كم يساوي 100 psi بالبار؟ (1 bar ≈ 14.5038 psi)",
   options:["6.9","7.2","14.5","10"], answer:0, explanation:"100 / 14.5038 ≈ 6.9 bar."},
  {id:46, section:"aptitude", q:"ميل الخط = 2 ماذا يعني؟",
   options:["الارتفاع يزيد 2 لكل وحدة أفقية","المنحنى يتقوس","ثابت","ينخفض"], answer:0, explanation:"الميل 2 يعني ارتفاع 2 لكل وحدة أفقية."},
  {id:47, section:"aptitude", q:"أكمل الحروف: A, C, F, J, ___ ?",
   options:["O","K","P","N"], answer:0, explanation:"الفروق +2,+3,+4,+5 => J+5=O."},
  {id:48, section:"aptitude", q:"إذا GOR=1000 scf/bbl، كم الغاز لـ10 bbl؟",
   options:["100","1000","10000","10"], answer:2, explanation:"1000 * 10 = 10000 scf."},
  {id:49, section:"aptitude", q:"زادت السرعة 20% ثم نقصت 25%، النتيجة؟",
   options:["أكثر","أقل","نفسها","لا يمكن"], answer:1, explanation:"1.2 * 0.75 = 0.9 => نقص 10%."},
  {id:50, section:"aptitude", q:"120 m ويمر 30 m/ساعة، كم ساعة؟",
   options:["2","3","4","5"], answer:2, explanation:"120/30=4 ساعات."},
  {id:51, section:"aptitude", q:"7 * ? = 84، ? = ?",
   options:["10","11","12","13"], answer:2, explanation:"84/7=12."},
  {id:52, section:"aptitude", q:"مثلث قائم 3 و4، طول الوتر؟",
   options:["5","6","7","8"], answer:0, explanation:"مثلث 3-4-5."},
  {id:53, section:"aptitude", q:"أي نهج منظم لإيجاد سبب خلل؟",
   options:["تخمين","تحليل الجذر (RCA)","ضبط عشوائي","إيقاف الجميع"], answer:1, explanation:"RCA منهج منظم لتحديد الأسباب الجذرية."},
  {id:54, section:"aptitude", q:"20% = 50، الكمية الكليّة؟",
   options:["100","150","250","200"], answer:2, explanation:"0.2*x=50 => x=250."},
  {id:55, section:"aptitude", q:"رتب تصاعدياً: 0.9,0.89,1.0,0.1",
   options:["0.1,0.89,0.9,1.0","0.89,0.1,0.9,1.0","0.1,0.9,0.89,1.0","0.89,0.9,0.1,1.0"],
   answer:0, explanation:"الترتيب من الأصغر للأكبر."},
  {id:56, section:"aptitude", q:"3 أنابيب تملأ الخزان في 6،8،12 ساعة. كم ساعة معًا؟",
   options:["2.0","2.4","2.67","3.0"], answer:2, explanation:"الوقت = 1/(1/6+1/8+1/12)=8/3≈2.67"},
  {id:57, section:"aptitude", q:"متسلسلة:5,11,23,47,؟",
   options:["95","99","101","92"], answer:0, explanation:"كل عنصر*2+1 => 47*2+1=95."},
  {id:58, section:"aptitude", q:"40 ساعة -> 240$. 10 ساعة = ؟",
   options:["60","70","80","90"], answer:0, explanation:"240/40=6$ بالساعة => 10*6=60$."},
  {id:59, section:"aptitude", q:"إذا كل A هي B وبعض B هي C، هل بعض A يمكن أن تكون C؟",
   options:["نعم دائماً","لا أبدا","قد تكون","غير معلوم"], answer:2, explanation:"قد تكون ممكنًا لكن ليس مضمونًا."},
  {id:60, section:"aptitude", q:"15% من 200 = ؟",
   options:["20","25","30","35"], answer:2, explanation:"0.15*200=30."},

  // English 61-70
  {id:61, section:"english", q:"What does 'separator' refer to in petroleum processing?",
   options:["A device to increase pressure","A device to separate gas, oil and water","A safety valve","A measuring instrument"], answer:1, explanation:"A separator separates gas, oil and water."},
  {id:62, section:"english", q:"'______ is used to remove water from natural gas.'",
   options:["Regenerator","Dehydration unit","Compressor","Pump"], answer:1, explanation:"Dehydration unit (e.g., TEG) removes water."},
  {id:63, section:"english", q:"What does PPE stand for?",
   options:["Personal Protective Equipment","Process Pressure Equalizer","Plant Production Estimate","Protective Pump Equipment"], answer:0, explanation:"PPE = Personal Protective Equipment."},
  {id:64, section:"english", q:"Translate to English: 'مضاد للرغوة'",
   options:["Anti-foam","Anti-corrosion","Anti-sediment","Anti-static"], answer:0, explanation:"'مضاد للرغوة' = Anti-foam."},
  {id:65, section:"english", q:"A hygroscopic liquid used in dehydration is called ____.",
   options:["MEG","TEG","H2S","CO2"], answer:1, explanation:"TEG is commonly used."},
  {id:66, section:"english", q:"What is 'slugging' in pipeline terms?",
   options:["Continuous steady flow","Intermittent large liquid slugs in a gas line","A type of valve","A unit"], answer:1, explanation:"Intermittent large slugs of liquid in a gas line."},
  {id:67, section:"english", q:"The process of removing H2S from gas is called ____.",
   options:["sweetening","drying","cracking","flaring"], answer:0, explanation:"Removing H2S is called sweetening."},
  {id:68, section:"english", q:"An operator must wear a _____ when H2S is present.",
   options:["helmet","respirator","gloves","boots"], answer:1, explanation:"A respirator (or SCBA) is required."},
  {id:69, section:"english", q:"Plural of 'analysis' is ____",
   options:["analysises","analyses","analysis'","analysi"], answer:1, explanation:"analysis -> analyses."},
  {id:70, section:"english", q:"PFD commonly stands for ____ in process docs.",
   options:["Process Flow Diagram","Personal Flotation Device","Pressure Flow Device","Pump Flow Data"], answer:0, explanation:"PFD = Process Flow Diagram."}
];

/* ----- إعداد المتغيرات والبناء ----- */
const WEIGHTS = { technical:50, aptitude:30, english:20 };
let answers = {};             // id -> selected index
let currentIndex = 0;

/* DOM references */
const navGrid = document.getElementById('navGrid');
const qCard = document.getElementById('questionCard');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const finishBtn = document.getElementById('finishBtn');
const resetBtn = document.getElementById('resetBtn');
const currentIndexEl = document.getElementById('currentIndex');
const totalCountEl = document.getElementById('totalCount');
const scoreBadge = document.getElementById('scoreBadge');
const exContainer = document.getElementById('explanations');
const exList = document.getElementById('exList');
const techScoreEl = document.getElementById('techScore');
const aptScoreEl = document.getElementById('aptScore');
const engScoreEl = document.getElementById('engScore');
const autoMarkCheckbox = document.getElementById('autoMark');

/* ترتيب الأسئلة (موجودة كما في المصفوفة) */
const TOTAL = QUESTIONS.length;
totalCountEl.textContent = TOTAL;

/* رندر أزرار التنقل */
function buildNav(){
  navGrid.innerHTML = '';
  QUESTIONS.forEach((q, idx)=>{
    const btn = document.createElement('div');
    btn.className = 'qbtn';
    btn.textContent = idx+1;
    btn.title = `${q.section.toUpperCase()} - سؤال ${idx+1}`;
    btn.addEventListener('click', ()=> { goTo(idx); });
    navGrid.appendChild(btn);
  });
}

/* إظهار سؤال */
function renderQuestion(idx){
  const q = QUESTIONS[idx];
  currentIndex = idx;
  currentIndexEl.textContent = idx+1;

  // Header
  const headerHtml = `
    <div class="qheader">
      <div>
        <h2>السؤال ${idx+1}</h2>
        <p class="desc">${q.section === 'technical' ? 'فني' : q.section === 'aptitude' ? 'قدرات' : 'إنجليزي'}</p>
      </div>
      <div class="tiny">ID: ${q.id}</div>
    </div>
  `;

  // Options
  let optionsHtml = '<div class="options">';
  q.options.forEach((opt, i)=>{
    const selected = answers[q.id] === i ? 'selected' : '';
    optionsHtml += `
      <label class="option ${selected}" data-idx="${i}">
        <input type="radio" name="opt" value="${i}" ${answers[q.id] === i ? 'checked' : ''} />
        <div style="flex:1">${String.fromCharCode(65+i)}. ${opt}</div>
      </label>
    `;
  });
  optionsHtml += '</div>';

  qCard.innerHTML = headerHtml + `<div style="margin-top:6px"><strong>${q.q}</strong></div>` + optionsHtml;

  // Attach option clicks
  qCard.querySelectorAll('.option').forEach(label=>{
    label.addEventListener('click', (e)=>{
      const idxOpt = Number(label.getAttribute('data-idx'));
      answers[q.id] = idxOpt;
      // visual
      qCard.querySelectorAll('.option').forEach(el=>el.classList.remove('selected'));
      label.classList.add('selected');
      // mark nav
      markNavAnswered(currentIndex);
      if(autoMarkCheckbox.checked){
        // small feedback (flash)
        label.style.animation = 'flash .35s ease';
        setTimeout(()=> label.style.animation = '', 400);
      }
      updateScorePreview();
    });
  });

  updateNavHighlight();
  updateButtons();
}

/* التنقل */
function goTo(idx){
  if(idx < 0 || idx >= TOTAL) return;
  renderQuestion(idx);
}

/* السابق/التالي */
prevBtn.addEventListener('click', ()=> goTo(currentIndex - 1));
nextBtn.addEventListener('click', ()=> goTo(currentIndex + 1));

/* وضع علامة في ناف */
function markNavAnswered(idx){
  const node = navGrid.children[idx];
  if(!node) return;
  node.classList.add('answered');
}

/* تحديث تمييز الناف الحالي */
function updateNavHighlight(){
  for(let i=0;i<navGrid.children.length;i++){
    navGrid.children[i].classList.remove('current');
  }
  const cur = navGrid.children[currentIndex];
  if(cur) cur.classList.add('current');
}

/* أزرار */
function updateButtons(){
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === TOTAL - 1;
}

/* حساب النتيجة (وزني) */
function computeScores(){
  const sectionCounts = { technical:0, aptitude:0, english:0 };
  const sectionCorrect = { technical:0, aptitude:0, english:0 };

  QUESTIONS.forEach(q=>{
    sectionCounts[q.section] += 1;
    const picked = answers[q.id];
    if(picked !== undefined && picked === q.answer) sectionCorrect[q.section] += 1;
  });

  const techScore = (sectionCounts.technical ? (sectionCorrect.technical / sectionCounts.technical) * WEIGHTS.technical : 0);
  const aptScore  = (sectionCounts.aptitude  ? (sectionCorrect.aptitude  / sectionCounts.aptitude)  * WEIGHTS.aptitude  : 0);
  const engScore  = (sectionCounts.english   ? (sectionCorrect.english   / sectionCounts.english)   * WEIGHTS.english   : 0);

  const total = Math.round((techScore + aptScore + engScore) * 100) / 100;
  return { total, techScore: round2(techScore), aptScore: round2(aptScore), engScore: round2(engScore),
           sectionCounts, sectionCorrect };
}

function round2(x){ return Math.round(x*100)/100; }

/* تحديث معاينة النتيجة في الوقت الحقيقي */
function updateScorePreview(){
  const s = computeScores();
  scoreBadge.textContent = `${s.total} / 100`;
  techScoreEl.textContent = `${s.techScore}`;
  aptScoreEl.textContent = `${s.aptScore}`;
  engScoreEl.textContent = `${s.engScore}`;
}

/* إنهاء الاختبار -> عرض النتيجة والشروحات */
finishBtn.addEventListener('click', ()=> {
  const s = computeScores();
  // تأكيد
  if(!confirm(`هل تريد إنهاء الاختبار ورؤية النتيجة؟ (ستظهر النتيجة النهائية: ${s.total}/100)`)) return;

  // عرض النتائج بشكل بارز
  scoreBadge.textContent = `${s.total} / 100`;
  techScoreEl.textContent = `${s.techScore}`;
  aptScoreEl.textContent = `${s.aptScore}`;
  engScoreEl.textContent = `${s.engScore}`;

  // عرض الشروحات
  exContainer.style.display = 'block';
  exList.innerHTML = '';
  QUESTIONS.forEach((q, idx)=>{
    const picked = answers[q.id];
    const correctIdx = q.answer;
    const ok = (picked !== undefined && picked === correctIdx);

    const exDiv = document.createElement('div');
    exDiv.className = 'ex';
    exDiv.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
        <div><strong>السؤال ${idx+1}:</strong> ${q.q}</div>
        <div style="font-weight:800;color:${ok ? '#0b8f55' : '#d43f3a'}">${ok ? 'صحيح' : 'خطأ'}</div>
      </div>
      <div style="margin-top:8px">إجابتك: <strong>${picked===undefined? 'لم تجب' : String.fromCharCode(65+picked)+'. '+q.options[picked]}</strong></div>
      <div>الإجابة الصحيحة: <strong>${String.fromCharCode(65+correctIdx)+'. '+q.options[correctIdx]}</strong></div>
      <div style="margin-top:8px;color:#333">${q.explanation}</div>
    `;
    exList.appendChild(exDiv);
  });

  // Scroll to explanations
  exContainer.scrollIntoView({behavior:'smooth'});
});

/* إعادة تعيين الإجابات */
resetBtn.addEventListener('click', ()=>{
  if(!confirm('هل تريد إعادة تعيين كل الإجابات؟')) return;
  answers = {};
  // إعادة بناء الواجهة
  for(let i=0;i<navGrid.children.length;i++){
    navGrid.children[i].classList.remove('answered');
  }
  exContainer.style.display = 'none';
  renderQuestion(0);
  updateScorePreview();
});

/* بداية التشغيل */
function init(){
  buildNav();
  renderQuestion(0);
  updateScorePreview();
  // احتفظ بعلامة الإجابة في الـ nav إذا كانت محفوظة (لو أعددت answers من قبل)
  QUESTIONS.forEach((q, idx)=>{
    if(answers[q.id] !== undefined) markNavAnswered(idx);
  });
}

init();
