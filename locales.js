export const LOCALES = {
  en: {
    metaTitle: "X-RAY FOR BLENDER — Character Reference Workstation",
    metaDescription: "Prepare character reference sheets and inspect real GLB models, polygon surfaces, skinning skeletons, and animation in your browser.",
    skip: "Skip to content", localOnly: "Files stay in this browser", languageLabel: "Language",
    eyebrow: "CHARACTER WORKSTATION · BLENDER-READY",
    title: "Prepare the views. Inspect the model.",
    subtitle: "A focused companion for character modeling: organize consistent 2D references, then inspect a finished GLB model and its real skinning skeleton.",
    stepRefs: "Prepare references", stepModel: "Load a model", stepPose: "Check a pose",
    refsTitle: "Prepare 2D references",
    refsLede: "This step organizes images only. It does not create a 3D mesh or rig.",
    openingInstruction: "First prepare your character images. Use the same character, outfit, lighting, and scale in every view.",
    promptTitle: "Copyable image-generation prompt", promptHint: "Edit the bracketed fields first",
    promptLabel: "Character reference prompt",
    promptCaution: "Generate each view separately. Image models may not preserve exact identity or proportions.",
    copyPrompt: "Copy prompt", copied: "Prompt copied.", copyFailed: "Copy was unavailable. Select and copy the text manually.",
    requiredViews: "Main set · same neutral A-pose",
    requiredViewsHelp: "One image per view. A multi-view collage is useful for a quick overview, but not as the only source.",
    front: "Front", back: "Back", left: "Left side", right: "Right side",
    required: "Required", optional: "Optional", emptyPreview: "No image yet", chooseImage: "Choose image", removeImage: "Remove",
    referenceStatus: "Images are checked and previewed in this browser only. They are not uploaded to a server.",
    extraViews: "Additional views", extraViewsHelp: "Use these to clarify identity, small details, or asymmetry.",
    threeQuarter: "Front three-quarter", face: "Face", hands: "Hands", feet: "Feet", asymmetry: "Asymmetric details",
    poseRefsTitle: "Reference views show shape",
    poseRefsText: "Front, back, and side views keep one neutral A-pose. Change the viewing direction, not the character’s pose.",
    deformationTitle: "Bent limbs check deformation",
    deformationText: "Arm and leg bends are for checking a finished rig. A seated pose does not replace the main reference set.",
    viewerTitle: "Inspect a finished 3D model",
    viewerLede: "This viewer reads geometry, skinning skeletons, and animations already stored in a GLB file. It does not build a rig from photos.",
    chooseGlb: "Choose GLB model", loadDemo: "Load licensed demo",
    glbLimit: "Self-contained GLB only · up to 30 MB · files are processed locally.",
    emptyViewerTitle: "The viewer is ready for a model",
    emptyViewerText: "Load the demo or choose a self-contained GLB file from your device.",
    demoCredit: "Demo model: RobotExpressive — Tomás Laulhé, modified by Don McCurdy, CC0 1.0.",
    assetSource: "Source and license", noModel: "No model loaded",
    skeletonLabel: "Skeleton", bonesLabel: "Bones", meshesLabel: "Meshes", modeLabel: "Mode", selectedBoneLabel: "Selected bone",
    keyboardHint: "Viewer keys: focus the model, then use arrow keys to orbit and + / − to zoom. The page scrolls normally outside the viewer.",
    displayMode: "Display mode", surface: "Surface", mesh: "Mesh", bones: "Bones", xray: "X-ray",
    camera: "Camera", resetCamera: "Reset camera",
    animation: "Animations in this file", animationSelect: "Choose animation", noAnimations: "No animations", play: "Play", stop: "Stop",
    poseTools: "Pose and bone rotation", chooseBone: "Choose a real model bone", noBones: "No bones available",
    rigNote: "These are deforming bones from the file, not Blender controls, IK, or Rigify handles.",
    resetPose: "Reset pose and bone changes", mappingTitle: "Map bones for pose checks",
    mappingHelp: "Pose checks are enabled only after both sides of the required bone pair are matched. Names are suggested from the loaded model.",
    autoMap: "Suggest matches from bone names", testArms: "Test: raise arms", testElbows: "Test: bend elbows", testKnees: "Test: bend knees",
    roleUpper: "Upper arm", roleForearm: "Forearm", roleLowerLeg: "Lower leg",
    sideLeft: "Left", sideRight: "Right", mappingNone: "Choose a bone",
    blenderLimitTitle: "What GLB does and does not carry",
    blenderLimitText: "GLB can carry meshes, skinning bones, and animation clips. Blender IK, constraints, drivers, and Rigify controls are not recreated here. Use Blender for full rigging and authoring.",
    privacyText: "Your reference images and GLB are read in this page only. Nothing is uploaded or saved to GitHub. The optional demo model and Three.js library are fetched from their named public sources.",
    footerText: "A reference-preparation and GLB inspection companion — not a replacement for Blender.",
    modeSurface: "Surface", modeMesh: "Mesh + wireframe", modeBones: "Bones", modeXray: "X-ray",
    statusInitializing: "Starting the 3D viewer…",
    statusNoWebGL: "3D view is unavailable here. Your reference images still work; try a browser with WebGL enabled.",
    statusLoadingDemo: "Loading the licensed demo model…",
    statusLoadingFile: "Checking and opening the GLB locally…",
    statusLoadError: "The model could not be opened. Check the file and try another self-contained GLB.",
    statusExternal: "This GLB refers to external files. For privacy and safety, this viewer accepts only self-contained GLB files.",
    statusTooLarge: "This file is larger than the 30 MB limit.",
    statusNotGLB: "Choose a binary GLB file (.glb). Separate .gltf files are not supported.",
    statusInvalid: "This file is damaged or is not a valid GLB 2.0 file.",
    statusComplex: "This model exceeds the viewer’s safe complexity limits.",
    statusUnsupported: "This model requires a compression extension that is not enabled in this viewer.",
    statusNoSkeleton: "There is no animation skeleton in this model. Bone and pose controls are disabled.",
    statusHasSkeleton: "Animation skeleton found.",
    statusDemoError: "The demo could not be downloaded. Check your connection or choose a local GLB file.",
    statusNoAnimations: "This model contains no animations.",
    statusRefsSize: "This image exceeds the 12 MB per-image limit.",
    statusRefsType: "Choose a PNG, JPEG, or WebP image.",
    statusRefsDecode: "This image could not be read. Choose a different file.",
    statusRefsPixels: "This image is too large to preview safely.",
    statusRemoved: "Image removed.",
    statusPoseMapping: "Map the required left and right bones before running this pose check.",
    statusPoseAxis: "Preview uses a simple local-axis rotation. Bone axes differ between rigs; adjust the selected bone or reset if the result looks wrong.",
    statusAutoMap: "Bone-name suggestions added where a clear match was found. Review every selection before applying a pose.",
    statusManualMap: "Choose the actual bones from this model. No pose has been applied.",
    statusCamera: "Camera reset.",
    stateYes: "Yes", stateNo: "No", loading: "Loading…", modeNameSurface: "Surface", modeNameMesh: "Mesh + wireframe", modeNameBones: "Bones", modeNameXray: "X-ray",
    bonesCount: "{count} bones", meshesCount: "{count} mesh objects", selectedNone: "None",
    prompt: `Create a technical reference set of one original adult character for later 3D modeling and rigging in Blender.

Character: [describe appearance].
Style: [realistic / stylized].
Clothing: a plain fitted T-shirt and leggings, or similarly simple clothing that shows the body shape. No loose folds, accessories, or large logos. Barefoot. Hair does not cover the neck or shoulders.

Keep the face, hairstyle, age, body proportions, limb lengths, clothing, and color palette consistent in every image. Do not mirror asymmetric features.

Main set:
1. Strict front view.
2. Strict back view.
3. Strict left-side view.
4. Strict right-side view.
5. Front three-quarter view as an optional depth reference.

Use one neutral, symmetrical A-pose for the first four views: arms about 35–45 degrees from the torso, elbows nearly straight, hands relaxed, fingers slightly apart, legs slightly apart, feet pointing forward. Do not change the body pose between views; change only the viewing direction.

Use orthographic projection or very weak perspective, with no wide-angle distortion. Show the full character at the same scale, with one floor line and equal space above the head and below the feet.

Use a uniform light-gray background, soft even lighting, and minimal shadows. No artistic posing, text, frames, measurements, or decorative elements.

Create each view as a separate image, using the approved first view as the identity reference. Do not claim that exact consistency is guaranteed.`
  },
  sk: {
    metaTitle: "X-RAY FOR BLENDER — pracovisko referencií postavy",
    metaDescription: "Pripravte referenčné pohľady postavy a v prehliadači skontrolujte GLB model, polygónovú sieť, kostru skinningu a animácie.",
    skip: "Preskočiť na obsah", localOnly: "Súbory zostávajú v tomto prehliadači", languageLabel: "Jazyk",
    eyebrow: "PRACOVISKO POSTAVY · PRIPRAVENÉ PRE BLENDER",
    title: "Pripravte pohľady. Skontrolujte model.",
    subtitle: "Pomôcka na modelovanie postáv: usporiadajte jednotné 2D referencie a potom prezrite hotový GLB model a jeho skutočnú kostru skinningu.",
    stepRefs: "Pripraviť referencie", stepModel: "Načítať model", stepPose: "Skontrolovať pózu",
    refsTitle: "Príprava 2D referencií",
    refsLede: "Tento krok iba usporiada obrázky. Nevytvára 3D model ani rig.",
    openingInstruction: "Najprv pripravte obrázky postavy. Vo všetkých pohľadoch zachovajte rovnakú postavu, oblečenie, osvetlenie a mierku.",
    promptTitle: "Kopírovateľný prompt na tvorbu obrázkov", promptHint: "Najprv upravte text v hranatých zátvorkách",
    promptLabel: "Prompt na referencie postavy",
    promptCaution: "Každý pohľad vytvorte samostatne. Generátor obrázkov nemusí zachovať presnú identitu ani proporcie.",
    copyPrompt: "Kopírovať prompt", copied: "Prompt bol skopírovaný.", copyFailed: "Kopírovanie nie je dostupné. Označte text a skopírujte ho ručne.",
    requiredViews: "Základná sada · rovnaká neutrálna A-póza",
    requiredViewsHelp: "Jeden obrázok pre každý pohľad. Koláž viacerých pohľadov pomôže pri rýchlom prehľade, ale nemá byť jediným podkladom.",
    front: "Spredu", back: "Zo zadnej strany", left: "Ľavý bok", right: "Pravý bok",
    required: "Povinné", optional: "Voliteľné", emptyPreview: "Zatiaľ bez obrázka", chooseImage: "Vybrať obrázok", removeImage: "Odstrániť",
    referenceStatus: "Obrázky sa kontrolujú a zobrazujú iba v tomto prehliadači. Neodosielajú sa na server.",
    extraViews: "Doplnkové pohľady", extraViewsHelp: "Pomáhajú objasniť identitu, drobné detaily alebo asymetriu.",
    threeQuarter: "Spredu v troch štvrtinách", face: "Tvár", hands: "Ruky", feet: "Chodidlá", asymmetry: "Asymetrické detaily",
    poseRefsTitle: "Referenčné pohľady ukazujú tvar",
    poseRefsText: "Pohľad spredu, zozadu a zboku zachováva jednu neutrálnu A-pózu. Mení sa smer pohľadu, nie póza postavy.",
    deformationTitle: "Ohnuté končatiny kontrolujú deformáciu",
    deformationText: "Ohnutie rúk a nôh slúži na kontrolu hotového rigu. Sediaca póza nenahrádza základnú sadu referencií.",
    viewerTitle: "Kontrola hotového 3D modelu",
    viewerLede: "Prehliadač načíta geometriu, kostru skinningu a animácie uložené v súbore GLB. Rig nevytvára z fotografií.",
    chooseGlb: "Vybrať GLB model", loadDemo: "Načítať licencovanú ukážku",
    glbLimit: "Len samostatný GLB · do 30 MB · súbory sa spracúvajú lokálne.",
    emptyViewerTitle: "Prehliadač čaká na model",
    emptyViewerText: "Načítajte ukážku alebo vyberte samostatný súbor GLB zo svojho zariadenia.",
    demoCredit: "Ukážkový model: RobotExpressive — Tomás Laulhé, úpravy Don McCurdy, CC0 1.0.",
    assetSource: "Zdroj a licencia", noModel: "Nie je načítaný model",
    skeletonLabel: "Kostra", bonesLabel: "Kosti", meshesLabel: "Mesh objekty", modeLabel: "Režim", selectedBoneLabel: "Vybraná kosť",
    keyboardHint: "Ovládanie: zamerajte model, šípkami otáčajte pohľad a klávesmi + / − približujte. Mimo prehliadača sa stránka posúva bežne.",
    displayMode: "Režim zobrazenia", surface: "Povrch", mesh: "Sieť", bones: "Kosti", xray: "Röntgen",
    camera: "Pohľad kamery", resetCamera: "Obnoviť pohľad",
    animation: "Animácie v súbore", animationSelect: "Vybrať animáciu", noAnimations: "Bez animácií", play: "Prehrať", stop: "Zastaviť",
    poseTools: "Póza a otáčanie kostí", chooseBone: "Vybrať skutočnú kosť modelu", noBones: "Nie sú dostupné kosti",
    rigNote: "Ide o deformujúce kosti zo súboru, nie o ovládacie prvky Blenderu, IK ani Rigify.",
    resetPose: "Obnoviť pózu a zmeny kostí", mappingTitle: "Priradiť kosti na kontrolu pózy",
    mappingHelp: "Kontrola pózy sa zapne až po priradení oboch strán potrebného páru kostí. Návrhy vychádzajú z názvov v modeli.",
    autoMap: "Navrhnúť priradenie podľa názvov", testArms: "Skúška: zdvihnúť ruky", testElbows: "Skúška: ohnúť lakte", testKnees: "Skúška: ohnúť kolená",
    roleUpper: "Horná časť ruky", roleForearm: "Predlaktie", roleLowerLeg: "Predkolenie",
    sideLeft: "Ľavá", sideRight: "Pravá", mappingNone: "Vyberte kosť",
    blenderLimitTitle: "Čo GLB prenáša a čo nie",
    blenderLimitText: "GLB môže obsahovať mesh, kosti skinningu a animačné klipy. IK, constraints, drivers a ovládacie prvky Rigify z Blenderu sa tu neobnovujú. Na kompletný rig a tvorbu použite Blender.",
    privacyText: "Referenčné obrázky aj GLB sa spracúvajú iba na tejto stránke. Nič sa neodosiela na server ani neukladá do GitHubu. Ukážkový model a knižnica Three.js sa načítajú z uvedených verejných zdrojov.",
    footerText: "Pomôcka na prípravu referencií a kontrolu GLB — nie náhrada Blenderu.",
    modeSurface: "Povrch", modeMesh: "Povrch + sieť", modeBones: "Kosti", modeXray: "Röntgen",
    statusInitializing: "Spúšťa sa 3D prehliadač…",
    statusNoWebGL: "3D zobrazenie tu nie je dostupné. Referenčné obrázky fungujú ďalej; skúste prehliadač so zapnutým WebGL.",
    statusLoadingDemo: "Načítava sa licencovaný ukážkový model…",
    statusLoadingFile: "Kontroluje sa a lokálne otvára GLB…",
    statusLoadError: "Model sa nepodarilo otvoriť. Skontrolujte súbor alebo skúste iný samostatný GLB.",
    statusExternal: "Tento GLB odkazuje na externé súbory. Z dôvodu súkromia a bezpečnosti prehliadač prijíma len samostatné GLB.",
    statusTooLarge: "Súbor prekračuje limit 30 MB.",
    statusNotGLB: "Vyberte binárny GLB súbor (.glb). Samostatné súbory .gltf nie sú podporované.",
    statusInvalid: "Súbor je poškodený alebo nejde o platný GLB 2.0.",
    statusComplex: "Model prekračuje bezpečné limity zložitosti prehliadača.",
    statusUnsupported: "Model vyžaduje kompresné rozšírenie, ktoré tento prehliadač nemá zapnuté.",
    statusNoSkeleton: "Tento model nemá animačnú kostru. Ovládanie kostí a póz je vypnuté.",
    statusHasSkeleton: "Animačná kostra bola nájdená.",
    statusDemoError: "Ukážku sa nepodarilo stiahnuť. Skontrolujte pripojenie alebo vyberte lokálny GLB.",
    statusNoAnimations: "Tento model neobsahuje animácie.",
    statusRefsSize: "Obrázok prekračuje limit 12 MB na jeden súbor.",
    statusRefsType: "Vyberte obrázok PNG, JPEG alebo WebP.",
    statusRefsDecode: "Obrázok sa nepodarilo načítať. Vyberte iný súbor.",
    statusRefsPixels: "Obrázok je príliš veľký na bezpečné zobrazenie.",
    statusRemoved: "Obrázok bol odstránený.",
    statusPoseMapping: "Pred spustením tejto kontroly priraďte požadované ľavé a pravé kosti.",
    statusPoseAxis: "Ide o jednoduchú rotáciu okolo lokálnej osi. Osi sa medzi rigmi líšia; pri nesprávnom výsledku upravte kosť alebo obnovte pózu.",
    statusAutoMap: "Návrhy sa doplnili iba tam, kde sa našla jasná zhoda. Pred použitím pózy skontrolujte každé priradenie.",
    statusManualMap: "Vyberte skutočné kosti tohto modelu. Póza sa zatiaľ nezmenila.",
    statusCamera: "Pohľad kamery bol obnovený.",
    stateYes: "Áno", stateNo: "Nie", loading: "Načítava sa…", modeNameSurface: "Povrch", modeNameMesh: "Povrch + sieť", modeNameBones: "Kosti", modeNameXray: "Röntgen",
    bonesCount: "{count} kostí", meshesCount: "{count} mesh objektov", selectedNone: "Žiadna",
    prompt: `Vytvor technickú sadu referencií jednej originálnej dospelej postavy na neskoršie 3D modelovanie a rigging v Blenderi.

Postava: [opis vzhľadu].
Štýl: [realistický / štylizovaný].
Oblečenie: jednofarebné priliehavé tričko a legíny alebo podobné jednoduché oblečenie, na ktorom vidno tvar tela. Bez voľných záhybov, doplnkov a veľkých log. Naboso. Vlasy nezakrývajú krk ani ramená.

Na všetkých obrázkoch zachovaj tvár, účes, vek, proporcie tela, dĺžku končatín, oblečenie a farebnú paletu. Asymetrické znaky nezrkadli.

Základná sada:
1. Presne spredu.
2. Presne zozadu.
3. Presne zľava.
4. Presne sprava.
5. Spredu v troch štvrtinách ako doplnková priestorová referencia.

Pri prvých štyroch pohľadoch použi jednu neutrálnu symetrickú A-pózu: ruky približne 35–45 stupňov od trupu, lakte takmer vystreté, ruky uvoľnené, prsty mierne oddelené, nohy mierne od seba a chodidlá smerujú dopredu. Medzi pohľadmi nemeň pózu tela, iba smer pohľadu.

Použi ortografické zobrazenie alebo veľmi slabú perspektívu bez širokouhlého skreslenia. Zobraz celú postavu v rovnakej mierke, s jednou líniou podlahy a rovnakou rezervou nad hlavou aj pod chodidlami.

Použi rovnomerné svetlosivé pozadie, mäkké rovnomerné svetlo a minimum tieňov. Bez umeleckého pózovania, textu, rámov, rozmerov a dekoratívnych prvkov.

Každý pohľad vytvor ako samostatný obrázok a schválený prvý pohľad použi ako referenciu identity. Netvrď, že úplná zhoda je zaručená.`
  },
  uk: {
    metaTitle: "X-RAY FOR BLENDER — підготовка референсів персонажа",
    metaDescription: "Підготуйте референси персонажа та переглядайте GLB-моделі, полігональну сітку, скелет деформації й анімації у браузері.",
    skip: "Перейти до вмісту", localOnly: "Файли залишаються в цьому браузері", languageLabel: "Мова",
    eyebrow: "РОБОЧЕ МІСЦЕ ПЕРСОНАЖА · ДЛЯ BLENDER",
    title: "Підготуйте ракурси. Перегляньте модель.",
    subtitle: "Інструмент для моделювання персонажів: упорядкуйте узгоджені 2D-референси, а потім перегляньте готову GLB-модель і її справжній скелет деформації.",
    stepRefs: "Підготувати референси", stepModel: "Завантажити модель", stepPose: "Перевірити позу",
    refsTitle: "Підготовка 2D-референсів",
    refsLede: "На цьому кроці ви лише впорядковуєте зображення. 3D-сітка чи риг не створюються.",
    openingInstruction: "Спочатку підготуйте зображення персонажа. На всіх ракурсах зберігайте одного персонажа, одяг, освітлення та масштаб.",
    promptTitle: "Промпт для копіювання", promptHint: "Спочатку замініть текст у квадратних дужках",
    promptLabel: "Промпт для референсів персонажа",
    promptCaution: "Створюйте кожен ракурс окремо. Генератор зображень може не зберегти точну ідентичність і пропорції.",
    copyPrompt: "Копіювати промпт", copied: "Промпт скопійовано.", copyFailed: "Копіювання недоступне. Виділіть текст і скопіюйте його вручну.",
    requiredViews: "Основний набір · одна нейтральна A-поза",
    requiredViewsHelp: "Один файл на ракурс. Колаж із кількох ракурсів зручний для огляду, але не як єдине джерело.",
    front: "Спереду", back: "Ззаду", left: "Лівий бік", right: "Правий бік",
    required: "Обов’язково", optional: "Необов’язково", emptyPreview: "Зображення ще немає", chooseImage: "Вибрати зображення", removeImage: "Видалити",
    referenceStatus: "Зображення перевіряються та показуються лише в цьому браузері. Вони не надсилаються на сервер.",
    extraViews: "Додаткові ракурси", extraViewsHelp: "Додавайте їх, щоб показати особливості зовнішності, дрібні деталі чи асиметрію.",
    threeQuarter: "Спереду у три чверті", face: "Обличчя", hands: "Кисті рук", feet: "Стопи", asymmetry: "Асиметричні деталі",
    poseRefsTitle: "Референси показують форму",
    poseRefsText: "Ракурси спереду, ззаду й збоку зберігають одну нейтральну A-позу. Змінюйте напрямок огляду, а не позу персонажа.",
    deformationTitle: "Зігнуті кінцівки перевіряють деформацію",
    deformationText: "Згинання рук і ніг потрібне для перевірки готового рига. Поза сидячи не замінює основний набір референсів.",
    viewerTitle: "Перегляд готової 3D-моделі",
    viewerLede: "Переглядач читає геометрію, скелет деформації та анімації, уже збережені у файлі GLB. Він не створює риг із фотографій.",
    chooseGlb: "Вибрати модель GLB", loadDemo: "Завантажити ліцензований приклад",
    glbLimit: "Лише автономний GLB · до 30 МБ · файли обробляються локально.",
    emptyViewerTitle: "Переглядач очікує на модель",
    emptyViewerText: "Завантажте приклад або виберіть автономний файл GLB на своєму пристрої.",
    demoCredit: "Демонстраційна модель: RobotExpressive — Tomás Laulhé, зміни Don McCurdy, CC0 1.0.",
    assetSource: "Джерело й ліцензія", noModel: "Модель не завантажена",
    skeletonLabel: "Скелет", bonesLabel: "Кістки", meshesLabel: "Об’єкти mesh", modeLabel: "Режим", selectedBoneLabel: "Вибрана кістка",
    keyboardHint: "Керування: сфокусуйте модель, стрілками обертайте огляд, клавішами + / − змінюйте масштаб. Поза переглядачем сторінка прокручується звичайно.",
    displayMode: "Режим відображення", surface: "Поверхня", mesh: "Сітка", bones: "Кістки", xray: "Рентген",
    camera: "Камера", resetCamera: "Скинути камеру",
    animation: "Анімації у файлі", animationSelect: "Вибрати анімацію", noAnimations: "Анімацій немає", play: "Відтворити", stop: "Зупинити",
    poseTools: "Поза й обертання кістки", chooseBone: "Виберіть кістку з моделі", noBones: "Кісток немає",
    rigNote: "Це деформувальні кістки з файлу, а не контролери Blender, IK чи елементи Rigify.",
    resetPose: "Скинути позу й обертання", mappingTitle: "Зіставлення кісток для перевірки пози",
    mappingHelp: "Перевірки пози доступні лише після зіставлення обох кісток потрібної пари. Назви пропонуються за даними моделі.",
    autoMap: "Запропонувати відповідність за назвами", testArms: "Перевірка: підняти руки", testElbows: "Перевірка: зігнути лікті", testKnees: "Перевірка: зігнути коліна",
    roleUpper: "Плече", roleForearm: "Передпліччя", roleLowerLeg: "Гомілка",
    sideLeft: "Ліва", sideRight: "Права", mappingNone: "Виберіть кістку",
    blenderLimitTitle: "Що GLB передає, а що ні",
    blenderLimitText: "GLB може містити mesh, кістки деформації та анімаційні кліпи. IK, constraints, drivers та контролери Rigify з Blender тут не відтворюються. Для повного ригу й авторингу використовуйте Blender.",
    privacyText: "Референси й GLB обробляються лише на цій сторінці. Нічого не надсилається на сервер і не зберігається в GitHub. Демомодель і бібліотека Three.js завантажуються з указаних відкритих джерел.",
    footerText: "Помічник для підготовки референсів і перегляду GLB — не заміна Blender.",
    modeSurface: "Поверхня", modeMesh: "Поверхня + сітка", modeBones: "Кістки", modeXray: "Рентген",
    statusInitializing: "Запуск 3D-переглядача…",
    statusNoWebGL: "3D-перегляд тут недоступний. Завантаження референсів працює; спробуйте браузер із WebGL.",
    statusLoadingDemo: "Завантаження ліцензованої демонстраційної моделі…",
    statusLoadingFile: "Перевірка та локальне відкриття GLB…",
    statusLoadError: "Не вдалося відкрити модель. Перевірте файл або виберіть інший автономний GLB.",
    statusExternal: "Цей GLB посилається на зовнішні файли. З міркувань приватності й безпеки приймаються лише автономні GLB.",
    statusTooLarge: "Розмір файлу перевищує обмеження 30 МБ.",
    statusNotGLB: "Виберіть бінарний файл GLB (.glb). Окремі файли .gltf не підтримуються.",
    statusInvalid: "Файл пошкоджений або не є коректним GLB 2.0.",
    statusComplex: "Модель перевищує безпечні обмеження складності переглядача.",
    statusUnsupported: "Для цієї моделі потрібне розширення стиснення, яке в переглядачі не ввімкнене.",
    statusNoSkeleton: "У моделі немає скелета анімації. Керування кістками й позою вимкнено.",
    statusHasSkeleton: "Скелет анімації знайдено.",
    statusDemoError: "Не вдалося завантажити приклад. Перевірте з’єднання або виберіть локальний GLB.",
    statusNoAnimations: "У моделі немає анімацій.",
    statusRefsSize: "Розмір зображення перевищує обмеження 12 МБ на файл.",
    statusRefsType: "Виберіть зображення PNG, JPEG або WebP.",
    statusRefsDecode: "Не вдалося прочитати зображення. Виберіть інший файл.",
    statusRefsPixels: "Зображення надто велике для безпечного перегляду.",
    statusRemoved: "Зображення видалено.",
    statusPoseMapping: "Перед перевіркою пози зіставте потрібні ліву та праву кістки.",
    statusPoseAxis: "Це проста ротація навколо локальної осі. Осі в різних ригах відрізняються; якщо результат не підходить, змініть кістку або скиньте позу.",
    statusAutoMap: "Відповідність запропоновано лише для очевидних збігів. Перевірте всі кістки перед застосуванням пози.",
    statusManualMap: "Виберіть справжні кістки цієї моделі. Позу не змінено.",
    statusCamera: "Камеру скинуто.",
    stateYes: "Так", stateNo: "Ні", loading: "Завантаження…", modeNameSurface: "Поверхня", modeNameMesh: "Поверхня + сітка", modeNameBones: "Кістки", modeNameXray: "Рентген",
    bonesCount: "{count} кісток", meshesCount: "{count} об’єктів mesh", selectedNone: "Немає",
    prompt: `Створи технічний набір референсів одного оригінального дорослого персонажа для подальшого 3D-моделювання та ригінгу в Blender.

Персонаж: [опис зовнішності].
Стиль: [реалістичний / стилізований].
Одяг: однотонна обтисла футболка та легінси або подібний простий одяг, що дає змогу бачити форму тіла. Без вільних складок, аксесуарів і великих логотипів. Босоніж. Волосся не закриває шию та плечі.

На всіх зображеннях зберігай обличчя, зачіску, вік, пропорції тіла, довжину кінцівок, одяг і палітру кольорів. Не віддзеркалюй асиметричні риси.

Основний набір:
1. Строго спереду.
2. Строго ззаду.
3. Строго зліва.
4. Строго справа.
5. Спереду у три чверті — додатковий орієнтир об’єму.

Для перших чотирьох ракурсів використовуй одну нейтральну симетричну A-позу: руки приблизно під кутом 35–45 градусів до тулуба, лікті майже прямі, кисті розслаблені, пальці трохи розведені, ноги злегка розставлені, стопи спрямовані вперед. Не змінюй позу тіла між ракурсами — змінюй лише напрямок огляду.

Використовуй ортографічну проєкцію або дуже слабку перспективу без ширококутних спотворень. Покажи персонажа повністю, в однаковому масштабі, з однією лінією підлоги й однаковими відступами над головою та під стопами.

Рівний світло-сірий фон, м’яке рівномірне освітлення, мінімум тіней. Без художнього позування, тексту, рамок, розмірів і декоративних елементів.

Створи кожен ракурс окремим зображенням, використовуючи затверджений перший ракурс як референс ідентичності. Не стверджуй, що точний збіг гарантовано.`
  },
  ru: {
    metaTitle: "X-RAY FOR BLENDER — подготовка референсов персонажа",
    metaDescription: "Подготовьте референсы персонажа и просматривайте GLB-модели, полигональную сетку, скелет деформации и анимации в браузере.",
    skip: "Перейти к содержимому", localOnly: "Файлы остаются в этом браузере", languageLabel: "Язык",
    eyebrow: "РАБОЧЕЕ МЕСТО ПЕРСОНАЖА · ДЛЯ BLENDER",
    title: "Подготовьте ракурсы. Проверьте модель.",
    subtitle: "Помощник для моделирования персонажей: соберите согласованные 2D-референсы, затем просмотрите готовую GLB-модель и её настоящий скелет деформации.",
    stepRefs: "Подготовить референсы", stepModel: "Загрузить модель", stepPose: "Проверить позу",
    refsTitle: "Подготовка 2D-референсов",
    refsLede: "На этом шаге вы только упорядочиваете изображения. 3D-сетка и риг не создаются.",
    openingInstruction: "Сначала подготовьте изображения персонажа. Во всех ракурсах сохраняйте одного персонажа, одежду, освещение и масштаб.",
    promptTitle: "Копируемый промпт для генерации изображений", promptHint: "Сначала замените текст в квадратных скобках",
    promptLabel: "Промпт для референсов персонажа",
    promptCaution: "Создавайте каждый ракурс отдельно. Генератор изображений может не сохранить точную идентичность и пропорции.",
    copyPrompt: "Скопировать промпт", copied: "Промпт скопирован.", copyFailed: "Копирование недоступно. Выделите и скопируйте текст вручную.",
    requiredViews: "Основной набор · одна нейтральная A-поза",
    requiredViewsHelp: "Отдельный файл для каждого ракурса. Коллаж удобен для обзора, но не должен быть единственным исходником.",
    front: "Спереди", back: "Сзади", left: "Слева", right: "Справа",
    required: "Обязательно", optional: "Необязательно", emptyPreview: "Изображения пока нет", chooseImage: "Выбрать изображение", removeImage: "Удалить",
    referenceStatus: "Изображения проверяются и показываются только в этом браузере. Они не отправляются на сервер.",
    extraViews: "Дополнительные ракурсы", extraViewsHelp: "Добавьте их, чтобы показать внешность, мелкие детали или асимметрию.",
    threeQuarter: "Спереди в три четверти", face: "Лицо", hands: "Кисти", feet: "Ступни", asymmetry: "Асимметричные детали",
    poseRefsTitle: "Референсы показывают форму",
    poseRefsText: "Виды спереди, сзади и сбоку используют одну нейтральную A-позу. Меняется направление обзора, а не поза персонажа.",
    deformationTitle: "Согнутые конечности проверяют деформацию",
    deformationText: "Сгибания рук и ног нужны для проверки готового рига. Сидячая поза не заменяет основной набор референсов.",
    viewerTitle: "Просмотр готовой 3D-модели",
    viewerLede: "Просмотрщик читает геометрию, скелет деформации и анимации, уже сохранённые в файле GLB. Он не создаёт риг по фотографиям.",
    chooseGlb: "Выбрать GLB-модель", loadDemo: "Загрузить лицензированный пример",
    glbLimit: "Только самодостаточный GLB · до 30 МБ · файлы обрабатываются локально.",
    emptyViewerTitle: "Просмотрщик ждёт модель",
    emptyViewerText: "Загрузите пример или выберите самодостаточный файл GLB на своём устройстве.",
    demoCredit: "Демо-модель: RobotExpressive — Tomás Laulhé, изменения Don McCurdy, CC0 1.0.",
    assetSource: "Источник и лицензия", noModel: "Модель не загружена",
    skeletonLabel: "Скелет", bonesLabel: "Кости", meshesLabel: "Объекты mesh", modeLabel: "Режим", selectedBoneLabel: "Выбранная кость",
    keyboardHint: "Управление: установите фокус на модели, стрелками вращайте обзор, клавишами + / − меняйте масштаб. Вне просмотрщика страница прокручивается обычно.",
    displayMode: "Режим отображения", surface: "Поверхность", mesh: "Сетка", bones: "Кости", xray: "Рентген",
    camera: "Камера", resetCamera: "Сбросить камеру",
    animation: "Анимации в файле", animationSelect: "Выбрать анимацию", noAnimations: "Анимаций нет", play: "Воспроизвести", stop: "Остановить",
    poseTools: "Поза и поворот костей", chooseBone: "Выберите кость модели", noBones: "Костей нет",
    rigNote: "Это деформирующие кости из файла, а не контроллеры Blender, IK или элементы Rigify.",
    resetPose: "Сбросить позу и повороты", mappingTitle: "Сопоставить кости для проверки позы",
    mappingHelp: "Проверка позы включается только после сопоставления обеих костей нужной пары. Предложения берутся из названий костей модели.",
    autoMap: "Предложить кости по названиям", testArms: "Проверка: поднять руки", testElbows: "Проверка: согнуть локти", testKnees: "Проверка: согнуть колени",
    roleUpper: "Плечо", roleForearm: "Предплечье", roleLowerLeg: "Голень",
    sideLeft: "Левая", sideRight: "Правая", mappingNone: "Выберите кость",
    blenderLimitTitle: "Что GLB передаёт и чего не передаёт",
    blenderLimitText: "GLB может хранить mesh, кости деформации и анимационные клипы. IK, constraints, drivers и контроллеры Rigify из Blender здесь не восстанавливаются. Для полного риггинга и создания модели используйте Blender.",
    privacyText: "Референсы и GLB обрабатываются только на этой странице. Ничего не отправляется на сервер и не сохраняется в GitHub. Демо-модель и библиотека Three.js загружаются из указанных открытых источников.",
    footerText: "Помощник по подготовке референсов и просмотру GLB — не замена Blender.",
    modeSurface: "Поверхность", modeMesh: "Поверхность + сетка", modeBones: "Кости", modeXray: "Рентген",
    statusInitializing: "Запуск 3D-просмотрщика…",
    statusNoWebGL: "3D-просмотр здесь недоступен. Загрузка референсов продолжит работать; попробуйте браузер с включённым WebGL.",
    statusLoadingDemo: "Загружается лицензированная демо-модель…",
    statusLoadingFile: "Проверяем и открываем GLB локально…",
    statusLoadError: "Не удалось открыть модель. Проверьте файл или выберите другой самодостаточный GLB.",
    statusExternal: "Этот GLB ссылается на внешние файлы. Для защиты приватности просмотрщик принимает только самодостаточные GLB.",
    statusTooLarge: "Файл превышает ограничение 30 МБ.",
    statusNotGLB: "Выберите бинарный GLB-файл (.glb). Отдельные файлы .gltf не поддерживаются.",
    statusInvalid: "Файл повреждён или не является корректным GLB 2.0.",
    statusComplex: "Модель превышает безопасные ограничения сложности просмотрщика.",
    statusUnsupported: "Для этой модели требуется не включённое в просмотрщик расширение сжатия.",
    statusNoSkeleton: "В модели нет анимационного скелета. Управление костями и позой отключено.",
    statusHasSkeleton: "Анимационный скелет найден.",
    statusDemoError: "Не удалось загрузить пример. Проверьте соединение или выберите локальный GLB-файл.",
    statusNoAnimations: "В модели нет анимаций.",
    statusRefsSize: "Изображение превышает ограничение 12 МБ на файл.",
    statusRefsType: "Выберите изображение PNG, JPEG или WebP.",
    statusRefsDecode: "Не удалось прочитать изображение. Выберите другой файл.",
    statusRefsPixels: "Изображение слишком большое для безопасного просмотра.",
    statusRemoved: "Изображение удалено.",
    statusPoseMapping: "Перед проверкой сопоставьте нужные левую и правую кости.",
    statusPoseAxis: "Это простое вращение вокруг локальной оси. Оси в разных ригах отличаются; если результат неправильный, измените кость или сбросьте позу.",
    statusAutoMap: "Предложения добавлены только для очевидных совпадений. Проверьте каждую кость перед применением позы.",
    statusManualMap: "Выберите реальные кости этой модели. Поза пока не менялась.",
    statusCamera: "Камера сброшена.",
    stateYes: "Да", stateNo: "Нет", loading: "Загрузка…", modeNameSurface: "Поверхность", modeNameMesh: "Поверхность + сетка", modeNameBones: "Кости", modeNameXray: "Рентген",
    bonesCount: "{count} костей", meshesCount: "{count} объектов mesh", selectedNone: "Нет",
    prompt: `Создай технический набор референсов одного оригинального взрослого персонажа для последующего 3D-моделирования и риггинга в Blender.

Персонаж: [описание внешности].
Стиль: [реалистичный / стилизованный].
Одежда: однотонная прилегающая футболка и легинсы или аналогичная простая одежда, позволяющая видеть форму тела. Без свободных складок, аксессуаров и крупных логотипов. Босиком. Волосы не закрывают шею и плечи.

Во всех изображениях сохраняй лицо, причёску, возраст, пропорции тела, длину конечностей, одежду и цветовую палитру. Не зеркаль асимметричные особенности.

Основной набор:
1. Строго спереди.
2. Строго сзади.
3. Строго слева.
4. Строго справа.
5. Спереди в три четверти — дополнительный объёмный ориентир.

Для первых четырёх видов используй одну нейтральную симметричную A-позу: руки примерно на 35–45 градусов от корпуса, локти почти прямые, кисти расслаблены, пальцы слегка разделены, ноги немного расставлены, стопы направлены вперёд. Не меняй положение тела между видами — меняется только направление просмотра.

Ортографическая подача или максимально слабая перспектива, без широкоугольных искажений. Персонаж целиком, одинаковый масштаб, единая линия пола, одинаковые поля над головой и под стопами.

Ровный светло-серый фон, мягкое равномерное освещение, минимум теней. Без художественной позировки, текста, рамок, размеров и декоративных элементов.

Создавай каждый ракурс отдельным изображением, используя утверждённый первый ракурс как референс идентичности. Не выдавай точность совпадения за гарантированную.`
  }
};

export function localeDictionary(lang) {
  return LOCALES[lang] || LOCALES.en;
}
