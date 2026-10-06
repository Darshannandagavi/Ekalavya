# Project Context

You are helping with an existing software project.

## Instructions

1. First understand the project architecture before answering.
2. Do not modify unrelated files.
3. Reuse the existing project structure and coding style.
4. Make only the minimum required changes.
5. Mention every file that needs to be modified.
6. If additional files are required, ask only for those files.

---

## Project Structure

```text
├── .gitignore
├── README.md
├── client
│   ├── .oxlintrc.json
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── black board.avif
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── StyledComponents
│   │   │   ├── Fiberburst.jsx
│   │   │   ├── HorizontalScroller.jsx
│   │   │   └── MeshText.tsx
│   │   ├── axiosConfig.jsx
│   │   ├── components
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── adminlayout
│   │   │   │   ├── AcademicManagement.jsx
│   │   │   │   ├── AdminContacts.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   ├── AdminNavbar.jsx
│   │   │   │   ├── AdminUsers.jsx
│   │   │   │   ├── FacultyRequests.jsx
│   │   │   │   └── UserFeedbacks.jsx
│   │   │   ├── facultylayout
│   │   │   │   ├── FacultyLayout.jsx
│   │   │   │   ├── FacultyNavbar.jsx
│   │   │   │   ├── FacultyNote.jsx
│   │   │   │   ├── FacultyProfile.jsx
│   │   │   │   └── FacultySidebar.jsx
│   │   │   ├── guestlayout
│   │   │   │   ├── About.jsx
│   │   │   │   ├── AnimatedHScroll.jsx
│   │   │   │   ├── BookAnimation.jsx
│   │   │   │   ├── Cards.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   ├── EkalavyaHScroll.jsx
│   │   │   │   ├── FacultyLogin.jsx
│   │   │   │   ├── FacultyRegister.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── GuestFooter.jsx
│   │   │   │   ├── GuestLayout.jsx
│   │   │   │   ├── GuestNavbar.jsx
│   │   │   │   ├── HeroText.jsx
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── NotFound.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── Services.jsx
│   │   │   └── userlayout
│   │   │       ├── FeedbackForm.jsx
│   │   │       ├── Profile.jsx
│   │   │       ├── StudentNotes.jsx
│   │   │       ├── UserDashboard.jsx
│   │   │       ├── UserLayout.jsx
│   │   │       └── UserNavbar.jsx
│   │   ├── context
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks
│   │   │   ├── RichEditor.jsx
│   │   │   ├── useBase64ImageReplacer.js
│   │   │   └── useImageUpload.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── styles
│   │       └── theme.css
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
└── server
    ├── config
    │   ├── cloudinaryConfig.js
    │   └── emailConfig.js
    ├── controllers
    │   ├── adminAcademicController.js
    │   ├── adminController.js
    │   ├── adminFacultyController.js
    │   ├── contactController.js
    │   ├── facultyController.js
    │   ├── feedbackController.js
    │   ├── noteController.js
    │   ├── uploadController.js
    │   └── userController.js
    ├── index.js
    ├── middleware
    │   ├── admin.js
    │   ├── auth.js
    │   ├── authMany.js
    │   ├── facultyAuth.js
    │   ├── upload.js
    │   └── uploadMemory.js
    ├── models
    │   ├── Contact.js
    │   ├── Course.js
    │   ├── Faculty.js
    │   ├── Feedback.js
    │   ├── Note.js
    │   ├── Subject.js
    │   ├── University.js
    │   └── User.js
    ├── package.json
    └── routes
        ├── adminAcademicRoutes.js
        ├── adminFacultyRoutes.js
        ├── adminRoutes.js
        ├── contactRoutes.js
        ├── facultyRoutes.js
        ├── feedbackRoutes.js
        ├── noteRoutes.js
        └── userRoutes.js
```

===============================================================================
FILE: .gitignore
===============================================================================

```text
# ─── Dependencies ──────────────────────────────────────
client/node_modules/
server/node_modules/

# ─── Build output ───────────────────────────────────────
client/dist/
client/build/

# ─── Environment files ──────────────────────────────────
client/.env
client/.env.local
client/.env.production
server/.env
server/.env.local
server/.env.production

# ─── Logs ───────────────────────────────────────────────
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
client/npm-debug.log*
server/npm-debug.log*

# ─── OS files ───────────────────────────────────────────
.DS_Store
Thumbs.db
*.pem

# ─── Editor ─────────────────────────────────────────────
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# ─── Testing ────────────────────────────────────────────
coverage/
client/coverage/
server/coverage/

# ─── Misc ───────────────────────────────────────────────
.cache
.parcel-cache
*.tgz
```

===============================================================================
FILE: client/.oxlintrc.json
===============================================================================

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

===============================================================================
FILE: client/index.html
===============================================================================

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>client</title>

  <style>
    html::-webkit-scrollbar,
    body::-webkit-scrollbar {
      display: none;
    }

    html,
    body {
      margin: 0;
      padding: 0;

      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      -webkit-touch-callout: none;
      -webkit-tap-highlight-color: transparent;

      -webkit-user-drag: none;
    }

    img,
    svg,
    video,
    canvas {
      pointer-events: none;
      -webkit-user-drag: none;
      user-drag: none;
    }

    * {
      -webkit-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
      box-sizing: border-box;
    }

    @media print {
      html,
      body {
        display: none !important;
      }
    }

    .devtools-detected {
      overflow: hidden !important;
    }

    .devtools-detected #root {
      display: none !important;
    }
  </style>
</head>

<body>

<div id="root"></div>

<!-- <script>

/////////////////////////////
// Disable Right Click
/////////////////////////////

document.addEventListener("contextmenu", e => e.preventDefault());

/////////////////////////////
// Disable Copy/Paste/Cut
/////////////////////////////

["copy","cut","paste"].forEach(event=>{
    document.addEventListener(event,e=>e.preventDefault());
});

/////////////////////////////
// Disable Drag
/////////////////////////////

document.addEventListener("dragstart",e=>e.preventDefault());

/////////////////////////////
// Disable Select
/////////////////////////////

document.addEventListener("selectstart",e=>e.preventDefault());

/////////////////////////////
// Disable Text Selection
/////////////////////////////

document.onselectstart=()=>false;

/////////////////////////////
// Disable Keyboard Shortcuts
/////////////////////////////

document.addEventListener("keydown",function(e){

    const key=e.key.toUpperCase();

    if(
        e.key==="F12" ||

        (e.ctrlKey && key==="S") ||

        (e.ctrlKey && key==="P") ||

        (e.ctrlKey && key==="U") ||

        (e.ctrlKey && key==="C") ||

        (e.ctrlKey && key==="V") ||

        (e.ctrlKey && key==="X") ||

        (e.ctrlKey && key==="A") ||

        (e.ctrlKey && key==="H") ||

        (e.ctrlKey && key==="J") ||

        (e.ctrlKey && key==="I") ||

        (e.ctrlKey && e.shiftKey && key==="I") ||

        (e.ctrlKey && e.shiftKey && key==="J") ||

        (e.ctrlKey && e.shiftKey && key==="C") ||

        (e.ctrlKey && e.shiftKey && key==="K")

    ){
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

});

/////////////////////////////
// Disable View Source
/////////////////////////////

window.onhelp=function(){
    return false;
};

/////////////////////////////
// Blur on Window Lose Focus
/////////////////////////////

window.addEventListener("blur",()=>{
    document.body.style.filter="blur(20px)";
});

window.addEventListener("focus",()=>{
    document.body.style.filter="none";
});

/////////////////////////////
// DevTools Detection
/////////////////////////////

(function(){

    const threshold=160;

    function detect(){

        if(
            window.outerWidth-window.innerWidth>threshold ||
            window.outerHeight-window.innerHeight>threshold
        ){

            document.body.classList.add("devtools-detected");

            document.body.innerHTML=`
            <div style="
            background:#000;
            color:#fff;
            width:100vw;
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            font-size:28px;
            font-family:sans-serif;">
            Developer Tools Detected
            </div>`;
        }

    }

    setInterval(detect,1000);

})();

/////////////////////////////
// Detect Console Open
/////////////////////////////

(function(){

    const element=new Image();

    Object.defineProperty(element,'id',{

        get:function(){

            document.body.innerHTML="<h1 style='color:white;background:black;height:100vh;display:flex;justify-content:center;align-items:center;'>Developer Tools Detected</h1>";

        }

    });

    setInterval(function(){

        console.dir(element);

    },1000);

})();

/////////////////////////////
// Disable Image Drag
/////////////////////////////

document.querySelectorAll("img").forEach(img=>{
    img.draggable=false;
});

/////////////////////////////
// Disable Double Click Selection
/////////////////////////////

document.addEventListener("dblclick",e=>{
    e.preventDefault();
});

/////////////////////////////
// Disable Middle Mouse
/////////////////////////////

document.addEventListener("mousedown",e=>{
    if(e.button===1)
        e.preventDefault();
});

</script> -->

<script type="module" src="/src/main.jsx"></script>

</body>
</html>
```

===============================================================================
FILE: client/package.json
===============================================================================

```json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "start": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@studio-freight/lenis": "^1.0.42",
    "@tiptap/extension-bubble-menu": "^3.27.1",
    "@tiptap/extension-character-count": "^3.27.1",
    "@tiptap/extension-code-block": "^3.27.1",
    "@tiptap/extension-color": "^3.27.1",
    "@tiptap/extension-floating-menu": "^3.27.1",
    "@tiptap/extension-highlight": "^3.27.1",
    "@tiptap/extension-horizontal-rule": "^3.27.1",
    "@tiptap/extension-image": "^3.27.1",
    "@tiptap/extension-link": "^3.27.1",
    "@tiptap/extension-placeholder": "^3.27.1",
    "@tiptap/extension-subscript": "^3.27.1",
    "@tiptap/extension-superscript": "^3.27.1",
    "@tiptap/extension-table": "^3.27.1",
    "@tiptap/extension-table-cell": "^3.27.1",
    "@tiptap/extension-table-header": "^3.27.1",
    "@tiptap/extension-table-row": "^3.27.1",
    "@tiptap/extension-text-align": "^3.27.1",
    "@tiptap/extension-text-style": "^3.27.1",
    "@tiptap/extension-underline": "^3.27.1",
    "@tiptap/extension-youtube": "^3.27.1",
    "@tiptap/react": "^3.27.1",
    "@tiptap/starter-kit": "^3.27.1",
    "axios": "^1.18.1",
    "framer-motion": "^12.41.0",
    "gsap": "^3.15.0",
    "lenis": "^1.3.23",
    "ogl": "^1.0.11",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-icons": "^5.6.0",
    "react-parallax-tilt": "^1.7.332",
    "react-router-dom": "^7.18.0",
    "ws": "^8.21.0"
  },
  "devDependencies": {
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.2",
    "autoprefixer": "^10.5.0",
    "oxlint": "^1.69.0",
    "postcss": "^8.5.15",
    "tailwindcss": "^3.4.19",
    "vite": "^8.1.0"
  }
}
```

===============================================================================
FILE: client/postcss.config.js
===============================================================================

```js

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

===============================================================================
FILE: client/public/black board.avif
===============================================================================

```text
   ftypavif    mif1avifmiaf   �meta       !hdlr        pict                pitm        "iloc    D@       �       �   #iinf        infe      av01    Viprp   8ipco   av1C�    ispe      �  �   pixi       ipma        �  �mdat 

&.?42�2�EQ@����(���ڪ�E��� q�g7�`�����TSLe桕���gKY��Ԉ�7��E��2v�k8Ά����N's{�t�ϣŗb�*��N0oK_���/V���M�͉ʎ.���`� �6�b�d6b@KH�&:��y�q�H�*7 &[��EH��ªp�º� ��_3cI�@���տHЖ�%kܞ�6�>4������.+ł������{y ���?(�Oxt=�χ��gU�ӘIB�)�3
R0��J�$�{S��^���!A��0���E�����p�@��,�Ba�#j\^��Ju��qT�	u�]�j.E����xb�6������T��J,���`_��Q��ws�5�9'
�����k~.`-{q�^�Z�5�mp�%}.�>�epB�L����ZL�!?
�+)^��lM7ĭ�'{�#dw����6���]�J�~�A��Ӱ�S�4�Y4J �䚣��&\-��≚�N��Qnq�vp?��"q�/�J��=N�}Lm��^�.q��Q�1��9%I��t�ϟp'�ի����Jy��2#����$ ey���	(�'�|��A��G�V��7�+�t(����>Rɦ�����5��+H�֗�=�%ܱJk��+w�o��(|m��t2�_ː5��^8�?,��u�`��͂X�Gxp��%8y �aӚo�y���p����V����\#��c��HI37~����$����u.I�_����4W����D��G�h���!5Q�G	]��U����=x1��f�5gx�:��Uȇj�}ύ�I�>�>��P�#�72�<���pq��0x��a��&� ���*�����ڣ9�y����o�N��REـD�t>l�C
`U���;UYT�,h��^@?|��N�4Q*=Q�]Ƹ��=��1ꪾ����O߮�y .�+#A�����p��0�9��i��/�@�#lfKc�y%�{�ZP�����?5VRz�G�:�՟K@��ٓ[iT0�_�z���$Rs"�R��]���hn^����lF��� ���o��Pg�p��9B5��C�#�����&{�)=f����Ʃ?詉�E�Y��
�8�O��rm�lk[���e�f��{`W��CCPIi㨆y�4h��ź��|e�3�ʉ��+FZ�7y���'+���v���4�D^[�ޟ5J�~�hӦj�3X�j��^]Dĺ�K����/;��L�{�ن�0��xÏ8����P8����$�|��K���e<����mBވ�p�H�5��Bj� =t�/�	�Y�V �|S��aF����LEI��'���ԏk��4:H��[�n���)�|ʹ<��!�\.ח�*hyz���'Jz�����*yEGd���`���ZT�s���넭~ĸL23P���9���8��Y	��@aL7�\x|U�OGA�	��E#gc��w���^)�����ݓB�n�M�&?�_ɔ	�a��̊���!������sM�2 "����(dp�0��A*��,46S�=�_�����=��_/�p�\�f�?������BO?���d�`("�m5��~y��0��r�Yj{v�W�`Sb���eS=n��6LS��<a�
1~���8�w���5ڦ9]Jķ<;��|{s�9��y�d���c��H9��c��"�:i0��H@	�/���^t7��Y�X
�D"��հ��#2�pϳ���*4���¼��p�0�%=k����]-� ��x%���_m�����Z�wF�SB�-��&�EU�����x:�����/��0�����hp�w$Uc�?��5mAǰ4~���� 07�U9� ��Ԍ��L�Kpqy�` ��3�	l%id��yU���6�l�ɀ��I��kQ�N�k���?��5�0Wz	{ڏ�r �V�C��h���6�M��"p��	S�M�D�7��f���K��c<��̐�,ё�A��t=:��q���=�܀lw���0�5�MH��Q�{G�ǄX,��|�gR�������	�����?L>�1��{j����T(*p,jN�����������2�I�{��Д@A�`R��`�M=��&wVZ���?�
�1�V�gX
���t�uU�AM�!�pf(�@��҇�m��P�'<<25X^dF��ﱩJ��ۤB�V�2m�ӿ�Dp��x���Rx`5��<r��~N���C2�t�#e����\d���nA��6�e���a���z��7�xʩE�x��W�3�ûp�	P��Nu�T���+5w�����[����E��g�#ZYN���:���1�*�LfUt�F>��oGP�	D\�AKR��x�2���*E�Y'�L����b���0|�;O�i�Qe���W�QE<�+����d�{YyZ�{_tǧ��E����R	�U��x��\���ca�4$�zoq���������m>�[�����xu�h�j��Ӷ����2�`��0�*Ό^�d;��.��˪��6m�1C���].�(����ͮ�%4���.����4@��q��D��_���z�N��C����g��gZ\kyv�|f�
]^?
�����v�P�KМԖ�Af����Jk0���4�ju#�zX��~��}���Z�qJ[nM�`B��=Lz�<w�HOa���؁D��c��_u;0��qJG��������:!-����ɷ�W�Q9�.��Y�}Q��G0A3��|1��Ä&�eH�`p
^����~�V>kh�ry��w�>)�C���}��.X?��,�?�dC�,$�����6P�����V��a�h��G��Ȗ^R/<K,��SZJE��{j�O��M}u��t��hZ�,� 5Ggͺ�����u߅�kM�̮���GQ��-2�.�4),�r�Y�VF=Ĳ����(����	��Y��6�/��
�&s(ʚE1P���8)m��F��Hd�	�!�*���)�_ÂC�"�ΚM#8d�LX؋�wB�>�*���u���w��O��|���5p1��s����Qfv���x8(c2S�,��&3v�lx+V��z�zN�Mߺ�"����0%�8{h�o�ϙxᐱ]/�s�D>�?�j�Fw�U�0���"l���{f�H�H ��b��l���,x�W��Q����آy���(�^���'W�8��/���Œ�[4���K�iQd.��k<��X7'J������D7��n2'�3��p5�d ���2!�����6K"D�8;���k�c�2��A�V���k���I���f�p��I�K>���Oy��	md���SfDu�
�;^+<���O��8�H�醙��/����m|��k�%9z~�leno�Z����f_*>�X}@��:'8tp7�5��u�����i���|�
���d���f��ui��`����Nx�0�'�1Ҹ�u4J��^5�� [��������F�����^���Փ�	:���eo	�Ht��b~���2� �(bO�-߰,�z��yEv3h���h�Fֆ`7h 	�Z9�l�3����c�a�Q��/ �od��#\���m��YNk�˞
��@�L��C���o��<JZ	ǟ:DA�a���,��8����p �����8Y8��ȢB49��[���߄j��j���?`�I��S���V�m��P�1j�Tle�J|g�.�~��i�~R�����9c��~�N1 ���<���NW.�܌�]���ޗ^��
f�3{"L�oE�MϢ��8c�3c���ś:>��œ�D�Z����׏��SPp1%�N��fU��g��O�%a�D+���F1p�?Q�*M�f�L�y��%����!�Y��{�k�,�A?��%�$&�Tl��o��v��ڂ�?ý+ؐBcg��9XN;����/qғ��/'q�L��0��פ��}��F�V ���c*vzb�udg�)j|�ǅT5�H���3[���5|W�B0�^8hW"o���T�1��D�G ��������n5�5�ݷrf�7ޯ�/����z��LC]���6��-�L�<c9������`�Q��UE�	S�-E�1���G�������\݌�����A�nDS!C��Ai|���h�%�K�*h�����UaJ��b��Ԣh (�I�<�'���T,t�([�I�2�_��ĺ~57fO��Ӏ�co�&&��%����5r�����y�|yX��7w%�Ѭ�4?u1P�<�̻0�~-�����BlZ�#y���8-i�Q~�f�:�O��댝���.$qs��	zs��Ö6o��jrs�.4��:a賯u4�	���p8J^�ҐH��.�<VRXA�Ӌ�n#�l�u,'͙DWuq1��xp*��ɾ#y�W�z�2ON轨����. Ǳ�x�3���"4����a�؛��ll�D�BP@��({��!���%C`
>a��Q�8�׾���~o)�����H���_�?�)\��c�����r ���D�yޖ�N#�]��m�a��[/�O��' tu�s��[��h9��X�x����d.w��lr�
4nR����[�0=�A"��� ���.�,�g�v�.�������Yap5��9���ڷ${m��L��������Aৗ�\����/�����2��\h�u5m6j�.@�K���.�;.}�L��D�kX�����;Zm������m��}��!&�bϮùq/=����O����.���z�����^�H��Q�-t�w�P�.V$��7����!��Ϡ�D�a�|�'2�1څ܄l�fw���|^! ����	�~��	�&Q�$��¸�c���H�_m��n�0w[IS�ؼ��iX� ��w�^��� �%�x� ��9ҕ:�WH�>ZQУ�L}�c_��b�Ń��S[��%��-�4�A�������y��� Zs���Dg�(�t}n���E���wU�G�x&��V��52�x�ZAkF��Bg�g��[��M��0z��3=���ZENcg�+�����&��l�1��x塟�^�o\k^EQ͓��e~��8�Q)�q�	�M�N�G�T/�+�{U���aj�U�Y)�����\����trBT���ʙ?�.���㶯	��K;!U}S���ƾ�-��.~4� po�5�$J��{d�O�}��8��!mg�4CNZ�_��#��iD����J\�{��
�%n���̮��zҒ��2���x)s�E��Y�.�!�"-"������e������R�{�N�m��� 2����r(�LCF�&1���f.���V��;l}�=�����2��2EQy�����`����ל`a^I>U����W:�<F��M��Ny����mn����:���r�'�������>T;g�%��X+ᛘ��(\�j�H߇Zj���©Q�櫏d6�r��]�ߊ�����8�nW�v���w���.8��a��� ����:��>/�;KNZ�L����=��Ӫ�e�N�]^=��k����u�p*���3�L��0��V�l� Ϙ<K�Uc�!>�o���9��F6S��/(�jl���Tm����ޕv��5�z�2��ٜ�٨��+����������������� �@N�.OӨ��=�gFYϠ���P��Z5F�7j��:ҽ�Z���vu���4�pK��f{�Z<*�p�K�W
�FJ�<]�볡��X.G`�,�'�Y��E/�=�ʐ�� XJ3�C�<%nr7��T�����5�1Gі���w]&oz)Eł�Q�f���^h�y ���A�q�n����<B۫�Rh͞�g��Mj0���Ϡ�Q3ȇ���B̹O�Q+oYR>�(�~��W}O"]�β� ��pjcG�qܓ�^ϒˇ=dح�����z�q�[�!b>M������!	p{_L����!p!��"�#�� �|�t�h���\P�a���1�@f��Y��� ���Q�90A��O�@UQ+I��awoԘ
���:DM�T�R��Y)+N�G��]}W����⾩�>�&h��^Q`>1��fS�Y���
f~	/���Q�I(�6��~�u������o{�i��(V"8"o���^sR�Ð�Ň�j}m�ȁ�
��5BL�@�sIx"��x�/M���H\����`UP`^�5aP �l�i7��uR��1э�l�Fp ���r�6N�e�]$K��ȑ�O�s
.R���ԣ �J��yM K45�E��N���ȧ��瓠�)8Aӡg�]T�U�R1{h�IFT{L�=�+���j��8�	��$�r�Z�$�������We� �C�\��W#4T���n���<�u�����#z��M��6}$�ے�)�N��	4���j>�" �_�7Ɏ�8`��>e�(h�f�g�Ӈr��E�K������Qn1l��\���'!*�����3���0����5�s~I
```

===============================================================================
FILE: client/README.md
===============================================================================

```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
```

===============================================================================
FILE: client/src/App.css
===============================================================================

```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
```

===============================================================================
FILE: client/src/App.jsx
===============================================================================

```jsx

import {  Routes, Route } from "react-router-dom";
import GuestLayout from "./components/guestlayout/GuestLayout";
import UserLayout from "./components/userlayout/UserLayout";
import AdminLayout from "./components/adminlayout/AdminLayout";
import Home from "./components/guestlayout/Home";
import About from "./components/guestlayout/About";
import Services from "./components/guestlayout/Services";
import Contact from "./components/guestlayout/Contact";
import Login from "./components/guestlayout/Login";
import Register from "./components/guestlayout/Register";
import NotFound from "./components/guestlayout/NotFound";
import UserDashboard from "./components/userlayout/UserDashboard";
import FeedbackForm from "./components/userlayout/FeedbackForm";
import Profile from "./components/userlayout/Profile";
import AdminDashboard from "./components/adminlayout/AdminDashboard";
import UserFeedbacks from "./components/adminlayout/UserFeedbacks";
import AdminUsers from "./components/adminlayout/AdminUsers";
import ForgotPassword from "./components/guestlayout/ForgotPassword";
import AdminContacts from "./components/adminlayout/AdminContacts";
import AcademicManagement from "./components/adminlayout/AcademicManagement";
import FacultyNotes from "./components/facultylayout/FacultyNote";
import StudentNotes from "./components/userlayout/StudentNotes";
import BookAnimation from "./components/guestlayout/BookAnimation";
import FacultyLayout from "./components/facultylayout/FacultyLayout";
import FacultyLogin from "./components/guestlayout/FacultyLogin";
import FacultyRequests from "./components/adminlayout/FacultyRequests";
import FacultyRegister from "./components/guestlayout/FacultyRegister";
import FacultyProfile from "./components/facultylayout/FacultyProfile";
function App() {
  return (

      <Routes>

        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<BookAnimation />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faculty-register" element={<FacultyRegister />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/studentnotes" element={<StudentNotes />} />
        </Route>

        <Route path="/faculty" element={<FacultyLayout />}>
          <Route path="facultynote" element={<FacultyNotes />} />
          <Route path="feedback" element={<UserFeedbacks />} />
          <Route path="profile" element={<FacultyProfile />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/faculty" element={<FacultyRequests/>}/>
          <Route path="/admin/feedbacks" element={<UserFeedbacks />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/academicmanagement" element={<AcademicManagement />} />
          <Route path="/admin/facultynote" element={<FacultyNotes />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
  );
}

export default App;
```

===============================================================================
FILE: client/src/axiosConfig.jsx
===============================================================================

```jsx

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log(err)
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default API;
```

===============================================================================
FILE: client/src/components/adminlayout/AcademicManagement.jsx
===============================================================================

```jsx
import { useEffect, useState } from "react";
import API from "../../axiosConfig"; // use your existing axios instance

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const inputStyle = {
  border: "1px solid var(--border)", borderRadius: "8px",
  padding: "10px 12px", backgroundColor: "var(--bg-card)",
  color: "var(--text-main)", fontSize: "14px", outline: "none",
  width: "100%", boxSizing: "border-box",
};
const btnStyle = (variant = "primary") => ({
  padding: "8px 16px", borderRadius: "8px", fontSize: "13px",
  fontWeight: "600", border: "none", cursor: "pointer",
  background: variant === "primary" ? "var(--primary)"
            : variant === "danger"  ? "#e05252"
            : variant === "ghost"   ? "transparent"
            : "var(--bg-main)",
  color: variant === "primary" || variant === "danger" ? "#fff" : "var(--text-muted)",
  border: variant === "ghost" || variant === "secondary"
    ? "1px solid var(--border)" : "none",
});

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  const colors = {
    success: { bg: "#dcfce7", color: "#166534" },
    error:   { bg: "#fee2e2", color: "#b91c1c" },
    warn:    { bg: "#fef9c3", color: "#854d0e" },
  };
  const c = colors[type] || colors.success;
  return (
    <div style={{
      position: "fixed", bottom: "28px", right: "28px", zIndex: 9999,
      padding: "12px 20px", borderRadius: "10px", ...c,
      fontWeight: "600", fontSize: "13px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    }}>{message}</div>
  );
}

// ─── CONFIRM DIALOG ───────────────────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", maxWidth: "360px", width: "90vw", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
        <p style={{ margin: "0 0 20px", fontSize: "15px", color: "var(--text-main)", lineHeight: 1.5 }}>{message}</p>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={btnStyle("secondary")}>Cancel</button>
          <button onClick={onConfirm} style={btnStyle("danger")}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <section style={{ border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", backgroundColor: "var(--bg-card)", marginBottom: "32px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "24px", color: "var(--text-main)", margin: "0 0 24px" }}>{title}</h2>
      {children}
    </section>
  );
}

// ─── INLINE EDIT ROW ─────────────────────────────────────────────────────────
// Used for university rows — single field edit
function EditableRow({ label, onSave, onDelete, children, editContent }) {
  const [editing, setEditing] = useState(false);
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "10px", padding: "14px 18px", backgroundColor: "var(--bg-main)", display: "flex", alignItems: "center", gap: "12px" }}>
      {editing ? (
        <>
          {editContent}
          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
            <button onClick={() => { onSave(); setEditing(false); }} style={btnStyle("primary")}>Save</button>
            <button onClick={() => setEditing(false)} style={btnStyle("secondary")}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span style={{ flex: 1, fontSize: "14px", color: "var(--text-main)" }}>{label}</span>
          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
            <button onClick={() => setEditing(true)} style={btnStyle("secondary")}>Edit</button>
            <button onClick={onDelete} style={btnStyle("danger")}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export default function AcademicManagement() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [universities, setUniversities] = useState([]);
  const [toast, setToast]               = useState(null);
  const [confirm, setConfirm]           = useState(null); // { message, onConfirm }

  // University form
  const [uniName, setUniName]           = useState("");
  const [editUniNames, setEditUniNames] = useState({}); // { [id]: name }

  // Course form
  const [courseData, setCourseData]     = useState({ name: "", universityId: "", totalSemesters: "" });
  const [coursesList, setCoursesList]   = useState([]); // for list view
  const [listUniId, setListUniId]       = useState(""); // selected uni for list
  const [editCourse, setEditCourse]     = useState({}); // { [id]: { name, totalSemesters } }

  // Subject form
  const [subjectData, setSubjectData]   = useState({ universityId: "", courseId: "", semester: "", name: "" });
  const [subjectCourses, setSubjectCourses] = useState([]);
  const [subjectSemCount, setSubjectSemCount] = useState(0);
  const [subjectsList, setSubjectsList] = useState([]);
  const [listCourseId, setListCourseId] = useState("");
  const [listSemester, setListSemester] = useState("");
  const [listCourseSems, setListCourseSems] = useState(0);
  const [editSubject, setEditSubject]   = useState({}); // { [id]: { name, semester } }
  const [listUniIdForSubject, setListUniIdForSubject] = useState("");
  const [listCoursesForSubject, setListCoursesForSubject] = useState([]);

  const showToast = (message, type = "success") => setToast({ message, type });
  const askConfirm = (message, onConfirm) => setConfirm({ message, onConfirm });

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchUniversities = async () => {
    try {
      const r = await API.get("/academic/universities");
      setUniversities(r.data);
    } catch { showToast("Failed to load universities", "error"); }
  };

  useEffect(() => { fetchUniversities(); }, []);

  const loadCoursesForList = async (uniId) => {
    if (!uniId) { setCoursesList([]); return; }
    try {
      const r = await API.get(`/academic/courses/${uniId}`);
      setCoursesList(r.data);
      // init edit state
      const map = {};
      r.data.forEach((c) => { map[c._id] = { name: c.name, totalSemesters: c.totalSemesters }; });
      setEditCourse(map);
    } catch { showToast("Failed to load courses", "error"); }
  };

  const loadSubjectsForList = async (courseId, semester) => {
    if (!courseId || !semester) { setSubjectsList([]); return; }
    try {
      const r = await API.get(`/academic/subjects/${courseId}/${semester}`);
      setSubjectsList(r.data);
      const map = {};
      r.data.forEach((s) => { map[s._id] = { name: s.name, semester: s.semester }; });
      setEditSubject(map);
    } catch { showToast("Failed to load subjects", "error"); }
  };

  // ── UNIVERSITY CRUD ────────────────────────────────────────────────────────
  const handleAddUniversity = async (e) => {
    e.preventDefault();
    try {
      await API.post("/academic/universities", { name: uniName });
      setUniName("");
      showToast("University added ✓");
      fetchUniversities();
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
  };

  const handleUpdateUniversity = async (id) => {
    try {
      await API.put(`/academic/universities/${id}`, { name: editUniNames[id] });
      showToast("University updated ✓");
      fetchUniversities();
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
  };

  const handleDeleteUniversity = (uni) => {
    askConfirm(
      `Delete "${uni.name}"? This will also delete all its courses and subjects.`,
      async () => {
        try {
          await API.delete(`/academic/universities/${uni._id}`);
          showToast("University deleted");
          fetchUniversities();
          if (listUniId === uni._id) { setCoursesList([]); setListUniId(""); }
        } catch { showToast("Failed to delete", "error"); }
        setConfirm(null);
      }
    );
  };

  // ── COURSE CRUD ────────────────────────────────────────────────────────────
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await API.post("/academic/courses", courseData);
      setCourseData({ name: "", universityId: "", totalSemesters: "" });
      showToast("Course added ✓");
      if (listUniId === courseData.universityId) loadCoursesForList(listUniId);
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
  };

  const handleUpdateCourse = async (id) => {
    try {
      await API.put(`/academic/courses/${id}`, editCourse[id]);
      showToast("Course updated ✓");
      loadCoursesForList(listUniId);
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
  };

  const handleDeleteCourse = (course) => {
    askConfirm(
      `Delete "${course.name}"? This will also delete all its subjects.`,
      async () => {
        try {
          await API.delete(`/academic/courses/${course._id}`);
          showToast("Course deleted");
          loadCoursesForList(listUniId);
          if (listCourseId === course._id) { setSubjectsList([]); setListCourseId(""); }
        } catch { showToast("Failed to delete", "error"); }
        setConfirm(null);
      }
    );
  };

  // ── SUBJECT CRUD ───────────────────────────────────────────────────────────
  const handleSubjectUniChange = async (id) => {
    setSubjectData((p) => ({ ...p, universityId: id, courseId: "", semester: "" }));
    setSubjectSemCount(0);
    if (id) {
      const r = await API.get(`/academic/courses/${id}`);
      setSubjectCourses(r.data);
    } else {
      setSubjectCourses([]);
    }
  };

  const handleSubjectCourseChange = (courseId) => {
    const c = subjectCourses.find((x) => x._id === courseId);
    setSubjectData((p) => ({ ...p, courseId, semester: "" }));
    setSubjectSemCount(c?.totalSemesters || 0);
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      await API.post("/academic/subjects", subjectData);
      setSubjectData({ universityId: "", courseId: "", semester: "", name: "" });
      setSubjectCourses([]); setSubjectSemCount(0);
      showToast("Subject added ✓");
      if (listCourseId && listSemester) loadSubjectsForList(listCourseId, listSemester);
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
  };

  const handleUpdateSubject = async (id) => {
    try {
      await API.put(`/academic/subjects/${id}`, editSubject[id]);
      showToast("Subject updated ✓");
      loadSubjectsForList(listCourseId, listSemester);
    } catch (err) { showToast(err.response?.data?.message || "Failed", "error"); }
  };

  const handleDeleteSubject = (subject) => {
    askConfirm(`Delete subject "${subject.name}"?`, async () => {
      try {
        await API.delete(`/academic/subjects/${subject._id}`);
        showToast("Subject deleted");
        loadSubjectsForList(listCourseId, listSemester);
      } catch { showToast("Failed to delete", "error"); }
      setConfirm(null);
    });
  };

  // ── helper: selected course for subject list filter ────────────────────────
  const selectedListCourse = listCoursesForSubject.find((c) => c._id === listCourseId);

  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px 96px", color: "var(--text-main)" }}>
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
      {confirm && <ConfirmDialog message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}

      <h1 style={{ fontSize: "2.2rem", fontWeight: "900", marginBottom: "48px", color: "var(--text-main)" }}>
        Academic Management
      </h1>

      {/* ══ UNIVERSITIES ══════════════════════════════════════════════════════ */}
      <Section title="Universities">
        {/* Add form */}
        <form onSubmit={handleAddUniversity} style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          <input
            type="text" placeholder="University Name" value={uniName}
            onChange={(e) => setUniName(e.target.value)}
            style={{ ...inputStyle, flex: "1 1 250px" }} required
          />
          <button type="submit" style={btnStyle("primary")}>Add University</button>
        </form>

        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {universities.length === 0 && <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No universities yet.</p>}
          {universities.map((uni) => (
            <div key={uni._id} style={{ border: "1px solid var(--border)", borderRadius: "10px", padding: "14px 18px", background: "var(--bg-main)", display: "flex", alignItems: "center", gap: "12px" }}>
              {editUniNames[uni._id] !== undefined ? (
                <>
                  <input
                    style={{ ...inputStyle, flex: 1 }}
                    value={editUniNames[uni._id]}
                    onChange={(e) => setEditUniNames((p) => ({ ...p, [uni._id]: e.target.value }))}
                    autoFocus
                  />
                  <button onClick={() => handleUpdateUniversity(uni._id)} style={btnStyle("primary")}>Save</button>
                  <button onClick={() => setEditUniNames((p) => { const n = { ...p }; delete n[uni._id]; return n; })} style={btnStyle("secondary")}>Cancel</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 1, fontSize: "14px", color: "var(--text-main)", fontWeight: "500" }}>{uni.name}</span>
                  <button onClick={() => setEditUniNames((p) => ({ ...p, [uni._id]: uni.name }))} style={btnStyle("secondary")}>Edit</button>
                  <button onClick={() => handleDeleteUniversity(uni)} style={btnStyle("danger")}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ══ COURSES ═══════════════════════════════════════════════════════════ */}
      <Section title="Courses">
        {/* Add form */}
        <form onSubmit={handleAddCourse} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "28px" }}>
          <input type="text" placeholder="Course Name" value={courseData.name}
            onChange={(e) => setCourseData((p) => ({ ...p, name: e.target.value }))}
            style={inputStyle} required />
          <select value={courseData.universityId}
            onChange={(e) => setCourseData((p) => ({ ...p, universityId: e.target.value }))}
            style={inputStyle} required>
            <option value="">Select University</option>
            {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          <input type="number" placeholder="Total Semesters" value={courseData.totalSemesters}
            onChange={(e) => setCourseData((p) => ({ ...p, totalSemesters: e.target.value }))}
            style={inputStyle} required min="1" />
          <button type="submit" style={{ ...btnStyle("primary"), gridColumn: "1 / -1" }}>Add Course</button>
        </form>

        {/* Filter by university to view/edit/delete */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
          <p style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "12px" }}>
            Manage Existing Courses
          </p>
          <select value={listUniId} onChange={(e) => { setListUniId(e.target.value); loadCoursesForList(e.target.value); }}
            style={{ ...inputStyle, maxWidth: "280px", marginBottom: "16px" }}>
            <option value="">Select University to view courses</option>
            {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {listUniId && coursesList.length === 0 && <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No courses for this university.</p>}
            {coursesList.map((course) => (
              <div key={course._id} style={{ border: "1px solid var(--border)", borderRadius: "10px", padding: "14px 18px", background: "var(--bg-main)" }}>
                {editCourse[course._id]?.editing ? (
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                    <input
                      style={{ ...inputStyle, flex: 2, minWidth: "140px" }}
                      value={editCourse[course._id].name}
                      onChange={(e) => setEditCourse((p) => ({ ...p, [course._id]: { ...p[course._id], name: e.target.value } }))}
                      placeholder="Course name"
                    />
                    <input
                      type="number" min="1"
                      style={{ ...inputStyle, flex: 1, minWidth: "100px" }}
                      value={editCourse[course._id].totalSemesters}
                      onChange={(e) => setEditCourse((p) => ({ ...p, [course._id]: { ...p[course._id], totalSemesters: e.target.value } }))}
                      placeholder="Semesters"
                    />
                    <button onClick={() => handleUpdateCourse(course._id)} style={btnStyle("primary")}>Save</button>
                    <button onClick={() => setEditCourse((p) => ({ ...p, [course._id]: { ...p[course._id], editing: false } }))} style={btnStyle("secondary")}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-main)" }}>{course.name}</span>
                      <span style={{ marginLeft: "10px", fontSize: "12px", color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: "20px" }}>
                        {course.totalSemesters} semesters
                      </span>
                    </div>
                    <button onClick={() => setEditCourse((p) => ({ ...p, [course._id]: { ...p[course._id], editing: true } }))} style={btnStyle("secondary")}>Edit</button>
                    <button onClick={() => handleDeleteCourse(course)} style={btnStyle("danger")}>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ SUBJECTS ══════════════════════════════════════════════════════════ */}
      <Section title="Subjects">
        {/* Add form */}
        <form onSubmit={handleAddSubject} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "28px" }}>
          <select value={subjectData.universityId} onChange={(e) => handleSubjectUniChange(e.target.value)} style={inputStyle} required>
            <option value="">Select University</option>
            {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          <select value={subjectData.courseId} onChange={(e) => handleSubjectCourseChange(e.target.value)} style={inputStyle} required disabled={!subjectCourses.length}>
            <option value="">Select Course</option>
            {subjectCourses.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select value={subjectData.semester} onChange={(e) => setSubjectData((p) => ({ ...p, semester: e.target.value }))} style={inputStyle} required disabled={!subjectSemCount}>
            <option value="">Select Semester</option>
            {[...Array(subjectSemCount)].map((_, i) => <option key={i + 1} value={i + 1}>Semester {i + 1}</option>)}
          </select>
          <input type="text" placeholder="Subject Name" value={subjectData.name}
            onChange={(e) => setSubjectData((p) => ({ ...p, name: e.target.value }))}
            style={inputStyle} required />
          <button type="submit" style={{ ...btnStyle("primary"), gridColumn: "1 / -1" }}>Add Subject</button>
        </form>

        {/* Filter to view/edit/delete */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
          <p style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "12px" }}>
            Manage Existing Subjects
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px", marginBottom: "16px" }}>
            {/* Uni picker */}
            <select value={listUniIdForSubject} onChange={async (e) => {
              setListUniIdForSubject(e.target.value);
              setListCourseId(""); setListSemester(""); setSubjectsList([]);
              if (e.target.value) {
                const r = await API.get(`/academic/courses/${e.target.value}`);
                setListCoursesForSubject(r.data);
              } else {
                setListCoursesForSubject([]);
              }
            }} style={inputStyle}>
              <option value="">Select University</option>
              {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>

            {/* Course picker */}
            <select value={listCourseId} onChange={(e) => {
              const id = e.target.value;
              setListCourseId(id); setListSemester(""); setSubjectsList([]);
              const c = listCoursesForSubject.find((x) => x._id === id);
              setListCourseSems(c?.totalSemesters || 0);
            }} style={inputStyle} disabled={!listCoursesForSubject.length}>
              <option value="">Select Course</option>
              {listCoursesForSubject.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>

            {/* Semester picker */}
            <select value={listSemester} onChange={(e) => {
              setListSemester(e.target.value);
              loadSubjectsForList(listCourseId, e.target.value);
            }} style={inputStyle} disabled={!listCourseId}>
              <option value="">Select Semester</option>
              {[...Array(listCourseSems)].map((_, i) => <option key={i + 1} value={i + 1}>Semester {i + 1}</option>)}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {listCourseId && listSemester && subjectsList.length === 0 && (
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No subjects for this selection.</p>
            )}
            {subjectsList.map((subject) => (
              <div key={subject._id} style={{ border: "1px solid var(--border)", borderRadius: "10px", padding: "14px 18px", background: "var(--bg-main)" }}>
                {editSubject[subject._id]?.editing ? (
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                    <input
                      style={{ ...inputStyle, flex: 2, minWidth: "140px" }}
                      value={editSubject[subject._id].name}
                      onChange={(e) => setEditSubject((p) => ({ ...p, [subject._id]: { ...p[subject._id], name: e.target.value } }))}
                      placeholder="Subject name"
                    />
                    <select
                      style={{ ...inputStyle, flex: 1 }}
                      value={editSubject[subject._id].semester}
                      onChange={(e) => setEditSubject((p) => ({ ...p, [subject._id]: { ...p[subject._id], semester: e.target.value } }))}
                    >
                      {[...Array(listCourseSems)].map((_, i) => <option key={i + 1} value={i + 1}>Semester {i + 1}</option>)}
                    </select>
                    <button onClick={() => handleUpdateSubject(subject._id)} style={btnStyle("primary")}>Save</button>
                    <button onClick={() => setEditSubject((p) => ({ ...p, [subject._id]: { ...p[subject._id], editing: false } }))} style={btnStyle("secondary")}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-main)" }}>{subject.name}</span>
                      <span style={{ marginLeft: "10px", fontSize: "12px", color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: "20px" }}>
                        Sem {subject.semester}
                      </span>
                    </div>
                    <button onClick={() => setEditSubject((p) => ({ ...p, [subject._id]: { ...p[subject._id], editing: true } }))} style={btnStyle("secondary")}>Edit</button>
                    <button onClick={() => handleDeleteSubject(subject)} style={btnStyle("danger")}>Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
```

===============================================================================
FILE: client/src/components/adminlayout/AdminContacts.jsx
===============================================================================

```jsx

import { useEffect, useState } from "react";
import API from "../../axiosConfig";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    API.get("/contact").then((r) => setContacts(r.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await API.put(`/contact/${id}/read`);
      setContacts((prev) => prev.map((c) => c._id === id ? { ...c, isRead: true } : c));
      if (selected?._id === id) setSelected((prev) => ({ ...prev, isRead: true }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    setDeletingId(id);
    try {
      await API.delete(`/contact/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed.");
    } finally { setDeletingId(null); }
  };

  const filtered = contacts.filter(
    (c) => c.name?.toLowerCase().includes(search.toLowerCase()) ||
           c.email?.toLowerCase().includes(search.toLowerCase()) ||
           c.subject?.toLowerCase().includes(search.toLowerCase())
  );

  const unread = contacts.filter((c) => !c.isRead).length;

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", border: "4px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "4px" }}>Contact Messages</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: 0 }}>
            {contacts.length} total
            {unread > 0 && <span style={{ marginLeft: "8px", padding: "2px 10px", backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "999px", fontSize: "12px", fontWeight: "700" }}>{unread} unread</span>}
          </p>
        </div>
        <input type="text" placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px 16px", borderRadius: "10px", border: "1px solid var(--border)", backgroundColor: "var(--bg-input)", color: "var(--text-main)", fontSize: "14px", outline: "none", width: "280px" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--primary)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: "24px" }}>

        {/* List */}
        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "64px 24px", textAlign: "center" }}>
              <p style={{ color: "var(--text-faint)", fontSize: "14px" }}>No messages found.</p>
            </div>
          ) : (
            filtered.map((c, i) => (
              <div key={c._id}
                onClick={() => { setSelected(c); if (!c.isRead) handleMarkRead(c._id); }}
                style={{ padding: "18px 24px", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer", transition: "background 0.15s", backgroundColor: selected?._id === c._id ? "var(--primary-light)" : "transparent" }}
                onMouseEnter={(e) => { if (selected?._id !== c._id) e.currentTarget.style.backgroundColor = "var(--bg-secondary)"; }}
                onMouseLeave={(e) => { if (selected?._id !== c._id) e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      {!c.isRead && <span style={{ width: "8px", height: "8px", backgroundColor: "var(--primary)", borderRadius: "50%", flexShrink: 0 }} />}
                      <p style={{ fontSize: "14px", fontWeight: c.isRead ? "500" : "700", color: "var(--text-main)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</p>
                      <p style={{ fontSize: "12px", color: "var(--text-faint)", margin: 0, flexShrink: 0 }}>{new Date(c.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p style={{ fontSize: "13px", color: "var(--primary)", margin: "0 0 4px", fontWeight: "600" }}>{c.subject || "No subject"}</p>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.message}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(c._id); }} disabled={deletingId === c._id}
                    style={{ padding: "5px 10px", borderRadius: "7px", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", backgroundColor: "transparent", cursor: "pointer", fontSize: "11px", fontWeight: "600", flexShrink: 0, opacity: deletingId === c._id ? 0.5 : 1 }}>
                    {deletingId === c._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail view */}
        {selected && (
          <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "28px", alignSelf: "flex-start", position: "sticky", top: "80px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "800", color: "var(--text-main)", margin: 0 }}>Message Detail</h2>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-faint)", fontSize: "18px", lineHeight: 1 }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "From", value: selected.name },
                { label: "Email", value: selected.email },
                { label: "Subject", value: selected.subject || "—" },
                { label: "Received", value: new Date(selected.createdAt).toLocaleString() },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "12px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-faint)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", width: "64px", flexShrink: 0, paddingTop: "2px" }}>{item.label}</span>
                  <span style={{ fontSize: "14px", color: "var(--text-main)", fontWeight: "500" }}>{item.value}</span>
                </div>
              ))}

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", marginTop: "4px" }}>
                <p style={{ fontSize: "12px", color: "var(--text-faint)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Message</p>
                <p style={{ fontSize: "14px", color: "var(--text-main)", lineHeight: 1.85, margin: 0, whiteSpace: "pre-wrap" }}>{selected.message}</p>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || ""}`}
                  style={{ flex: 1, padding: "10px", borderRadius: "9px", textDecoration: "none", backgroundColor: "var(--primary)", color: "#fff", fontWeight: "600", fontSize: "13px", textAlign: "center", transition: "background 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                >
                  Reply via Email
                </a>
                <button onClick={() => handleDelete(selected._id)}
                  style={{ padding: "10px 16px", borderRadius: "9px", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", backgroundColor: "transparent", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminContacts;
```

===============================================================================
FILE: client/src/components/adminlayout/AdminDashboard.jsx
===============================================================================

```jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../axiosConfig";

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, feedbacks: 0 });
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([API.get("/admin/stats"), API.get("/feedback/all")])
      .then(([s, f]) => { setStats(s.data); setRecentFeedbacks(f.data.slice(0, 5)); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", border: "4px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "6px" }}>Admin Dashboard</h1>
        <p style={{ color: "var(--text-muted)" }}>Overview of your application.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        {[
          { label: "Total Users", value: stats.users, icon: "👥" },
          { label: "Total Feedbacks", value: stats.feedbacks, icon: "💬" },
          { label: "Contact Messages", value: stats.contacts, icon: "📬", badge: stats.unreadContacts > 0, badgeText: `${stats.unreadContacts} unread` },
          { label: "System Status", icon: "🟢", badge: true, badgeText: "Operational", green: true },
        ].map((s) => (
          <div key={s.label} style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <span>{s.icon}</span>
              <p style={{ fontSize: "13px", color: "var(--text-faint)", margin: 0 }}>{s.label}</p>
            </div>
            {s.badge ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <p style={{ fontSize: "2rem", fontWeight: "900", color: "var(--text-main)", margin: 0 }}>{s.value}</p>
                {s.badgeText && !s.green && <span style={{ padding: "2px 10px", backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "999px", fontSize: "11px", fontWeight: "700" }}>{s.badgeText}</span>}
                {s.green && <span style={{ padding: "4px 12px", backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981", fontSize: "12px", fontWeight: "700", borderRadius: "999px" }}>{s.badgeText}</span>}
              </div>
            ) : (
              <p style={{ fontSize: "2.2rem", fontWeight: "900", color: "var(--text-main)", margin: 0 }}>{s.value}</p>
            )}
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-main)", margin: 0 }}>Recent Feedbacks</h2>
          <Link to="/admin/feedbacks" style={{ fontSize: "13px", color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>View all →</Link>
        </div>
        {recentFeedbacks.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center" }}>
            <p style={{ color: "var(--text-faint)", fontSize: "14px" }}>No feedbacks yet.</p>
          </div>
        ) : (
          recentFeedbacks.map((fb, i) => (
            <div key={fb._id} style={{ padding: "16px 24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", borderBottom: i < recentFeedbacks.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div>
                <p style={{ fontSize: "14px", color: "var(--text-main)", margin: "0 0 5px" }}>{fb.message}</p>
                <p style={{ fontSize: "12px", color: "var(--text-faint)", margin: 0 }}>{fb.userId?.name || "Unknown"} · {new Date(fb.createdAt).toLocaleDateString()}</p>
              </div>
              <span style={{ color: "#facc15", fontSize: "13px", flexShrink: 0 }}>{"★".repeat(fb.rating)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
```

===============================================================================
FILE: client/src/components/adminlayout/AdminLayout.jsx
===============================================================================

```jsx

import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import GuestFooter from "../guestlayout/GuestFooter";
import API from "../../axiosConfig";

function AdminLayout() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await API.get("/auth/me");
        if (res.data.role !== "admin") { navigate("/"); return; }
        console.log(res)
        setAuthorized(true);
      } catch {
        
        // setAuthorized(false);
        // navigate("/login");
      }
    };
    check();
  }, [navigate]);

  if (authorized === null) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-main)" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}>
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 50 }}>
        <AdminNavbar />
      </div>
      <div style={{ flex: 1, paddingTop: "64px" ,minHeight:"100vh"}}>
        <Outlet />
      </div>
      <GuestFooter />
    </div>
  );
}

export default AdminLayout;
```

===============================================================================
FILE: client/src/components/adminlayout/AdminNavbar.jsx
===============================================================================

```jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../../axiosConfig";
import ThemeToggle from "../ThemeToggle";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch {}
    navigate("/login");
  };

  const links = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/faculty", label: "Faculty" },
    { to: "/admin/feedbacks", label: "Feedbacks" },
    { to: "/admin/contacts", label: "Messages" },
    { to: "/admin/academicmanagement", label: "Academics" },
    { to: "/admin/profile", label: "Profile" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        backgroundColor: "var(--bg-nav)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        <Link
          to="/admin"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <img
            src="./ekalavya.png"
            alt=""
            style={{ height: "40px", borderRadius: 50 }}
          />
          <span
            style={{
              fontSize: "17px",
              fontWeight: "800",
              color: "var(--text-main)",
            }}
          >
            Ekalavya Admin
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                textDecoration: "none",
                transition: "all 0.2s",
                color: isActive(link.to)
                  ? "var(--primary)"
                  : "var(--text-muted)",
                fontWeight: isActive(link.to) ? "600" : "400",
              }}
            >
              {link.label}
            </Link>
          ))}

          <ThemeToggle />
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "8px",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              color: "#ef4444",
              backgroundColor: "transparent",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
```

===============================================================================
FILE: client/src/components/adminlayout/AdminUsers.jsx
===============================================================================

```jsx

import { useEffect, useState } from "react";
import API from "../../axiosConfig";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [actionId, setActionId] = useState(null);
  const limit = 10;

  useEffect(() => {
    API.get("/admin/users").then((r) => setUsers(r.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user and all their feedbacks?")) return;
    setActionId(id);
    try {
      await API.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) { alert(err.response?.data?.message || "Failed."); }
    finally { setActionId(null); }
  };

  const handleToggleBan = async (id) => {
    setActionId(id);
    try {
      const res = await API.put(`/admin/users/${id}/ban`);
      setUsers((prev) => prev.map((u) => u._id === id ? { ...u, isBanned: res.data.isBanned } : u));
    } catch (err) { alert(err.response?.data?.message || "Failed."); }
    finally { setActionId(null); }
  };

  const handleRoleChange = async (id, role) => {
    setActionId(id);
    try {
      const res = await API.put(`/admin/users/${id}/role`, { role });
      setUsers((prev) => prev.map((u) => u._id === id ? { ...u, role: res.data.user.role } : u));
    } catch (err) { alert(err.response?.data?.message || "Failed."); }
    finally { setActionId(null); }
  };

  const filtered = users.filter(
    (u) => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / limit);
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", border: "4px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "4px" }}>Users</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: 0 }}>{users.length} total</p>
        </div>
        <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          style={{ padding: "10px 16px", borderRadius: "10px", border: "1px solid var(--border)", backgroundColor: "var(--bg-input)", color: "var(--text-main)", fontSize: "14px", outline: "none", width: "280px" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--primary)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
      </div>

      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden" }}>
        {paginated.length === 0 ? (
          <div style={{ padding: "64px 24px", textAlign: "center" }}>
            <p style={{ color: "var(--text-faint)", fontSize: "14px" }}>No users found.</p>
          </div>
        ) : (
          paginated.map((u, i) => {
            const initials = u.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
            const isWorking = actionId === u._id;
            return (
              <div key={u._id} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", padding: "16px 24px", borderBottom: i < paginated.length - 1 ? "1px solid var(--border)" : "none" }}>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: "1 1 200px", minWidth: 0 }}>
                  <div style={{ width: "38px", height: "38px", backgroundColor: "var(--primary)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: "900", flexShrink: 0 }}>{initials}</div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-main)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</p>
                    <p style={{ fontSize: "12px", color: "var(--text-faint)", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <span style={{ padding: "3px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: "700", textTransform: "capitalize", backgroundColor: u.role === "admin" ? "rgba(139,92,246,0.1)" : "var(--primary-light)", color: u.role === "admin" ? "#8b5cf6" : "var(--primary)", border: `1px solid ${u.role === "admin" ? "rgba(139,92,246,0.3)" : "var(--primary)"}` }}>
                    {u.role}
                  </span>

                  <span style={{ padding: "3px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: "700", backgroundColor: u.isBanned ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)", color: u.isBanned ? "#ef4444" : "#10b981", border: `1px solid ${u.isBanned ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)"}` }}>
                    {u.isBanned ? "Banned" : "Active"}
                  </span>

                  <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)} disabled={isWorking}
                    style={{ padding: "5px 10px", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--bg-input)", color: "var(--text-main)", fontSize: "12px", cursor: "pointer", outline: "none" }}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>

                  <button onClick={() => handleToggleBan(u._id)} disabled={isWorking}
                    style={{ padding: "6px 14px", borderRadius: "8px", border: `1px solid ${u.isBanned ? "rgba(16,185,129,0.4)" : "rgba(234,179,8,0.4)"}`, color: u.isBanned ? "#10b981" : "#eab308", backgroundColor: "transparent", cursor: "pointer", fontSize: "12px", fontWeight: "600", opacity: isWorking ? 0.5 : 1 }}>
                    {u.isBanned ? "Unban" : "Ban"}
                  </button>

                  <button onClick={() => handleDelete(u._id)} disabled={isWorking}
                    style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444", backgroundColor: "transparent", cursor: "pointer", fontSize: "12px", fontWeight: "600", opacity: isWorking ? 0.5 : 1 }}>
                    Delete
                  </button>
                </div>

              </div>
            );
          })
        )}

        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderTop: "1px solid var(--border)" }}>
            <p style={{ fontSize: "13px", color: "var(--text-faint)", margin: 0 }}>
              {(page - 1) * limit + 1}–{Math.min(page * limit, filtered.length)} of {filtered.length}
            </p>
            <div style={{ display: "flex", gap: "6px" }}>
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--bg-input)", color: "var(--text-muted)", cursor: "pointer", fontSize: "13px", opacity: page === 1 ? 0.4 : 1 }}>
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: p === page ? "var(--primary)" : "var(--bg-input)", color: p === page ? "#fff" : "var(--text-muted)", cursor: "pointer", fontSize: "13px", fontWeight: p === page ? "700" : "400" }}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--bg-input)", color: "var(--text-muted)", cursor: "pointer", fontSize: "13px", opacity: page === totalPages ? 0.4 : 1 }}>
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;
```

===============================================================================
FILE: client/src/components/adminlayout/FacultyRequests.jsx
===============================================================================

```jsx
import { useEffect, useState } from "react";
import API from "../../axiosConfig";

function FacultyRequests() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFaculty = async () => {
    try {
      const res = await API.get("/facultyadmin/faculty");
      setFaculty(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const approve = async (id) => {
    try {
      await API.put(`/facultyadmin/faculty/approve/${id}`);
      fetchFaculty();
    } catch (err) {
      console.error(err);
    }
  };

  const reject = async (id) => {
    if (!window.confirm("Reject this faculty?")) return;

    try {
      await API.delete(`/facultyadmin/faculty/reject/${id}`);
      fetchFaculty();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "var(--bg-main)", color: "var(--text-main)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Faculty Requests</h1>

          <p
            className="mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Approve or reject faculty registrations.
          </p>
        </div>

        <div
          className="px-5 py-3 rounded-xl font-semibold"
          style={{
            background: "var(--primary)",
            color: "#fff",
          }}
        >
          Total Faculty : {faculty.length}
        </div>
      </div>

      <div
        className="overflow-x-auto rounded-2xl"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow)",
        }}
      >
        <table className="w-full">
          <thead
            style={{
              background: "var(--bg-secondary)",
            }}
          >
            <tr>
              {[
                "Name",
                "Email",
                "Designation",
                "University",
                "Course",
                "Status",
                "Action",
              ].map((item) => (
                <th
                  key={item}
                  className="px-6 py-4 text-left text-sm font-semibold"
                  style={{
                    color: "var(--text-main)",
                  }}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center"
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  Loading...
                </td>
              </tr>
            ) : faculty.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center"
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  No faculty registrations found.
                </td>
              </tr>
            ) : (
              faculty.map((f) => (
                <tr
                  key={f._id}
                  className="transition-colors duration-200"
                  style={{
                    borderTop: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "var(--bg-secondary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "transparent")
                  }
                >
                  <td className="px-6 py-5 font-medium">
                    {f.name}
                  </td>

                  <td
                    className="px-6 py-5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {f.email}
                  </td>

                  <td className="px-6 py-5">
                    {f.designation || "-"}
                  </td>

                  <td className="px-6 py-5">
                    {f.university?.name}
                  </td>

                  <td className="px-6 py-5">
                    {f.course?.name}
                  </td>

                  <td className="px-6 py-5">
                    {f.isApproved ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        Approved
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5">
                    {!f.isApproved ? (
                      <div className="flex gap-3">
                        <button
                          onClick={() => approve(f._id)}
                          className="rounded-lg px-4 py-2 text-white font-semibold transition-all duration-200 hover:scale-105"
                          style={{
                            background: "#16a34a",
                          }}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => reject(f._id)}
                          className="rounded-lg px-4 py-2 text-white font-semibold transition-all duration-200 hover:scale-105"
                          style={{
                            background: "#dc2626",
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="font-semibold text-green-600">
                        Approved
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FacultyRequests;
```

===============================================================================
FILE: client/src/components/adminlayout/UserFeedbacks.jsx
===============================================================================

```jsx

import { useEffect, useState } from "react";
import API from "../../axiosConfig";

function UserFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    API.get("/feedback/all").then((r) => setFeedbacks(r.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    setDeletingId(id);
    try {
      await API.delete(`/admin/feedback/${id}`);
      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed.");
    } finally { setDeletingId(null); }
  };

  const filtered = feedbacks.filter(
    (fb) => fb.message?.toLowerCase().includes(search.toLowerCase()) || fb.userId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", border: "4px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "4px" }}>Feedbacks</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: 0 }}>{feedbacks.length} total</p>
        </div>
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px 16px", borderRadius: "10px", border: "1px solid var(--border)", backgroundColor: "var(--bg-input)", color: "var(--text-main)", fontSize: "14px", outline: "none", width: "280px" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--primary)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
      </div>

      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "64px 24px", textAlign: "center" }}>
            <p style={{ color: "var(--text-faint)", fontSize: "14px" }}>No feedbacks found.</p>
          </div>
        ) : (
          filtered.map((fb, i) => (
            <div key={fb._id} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", padding: "18px 24px", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-main)" }}>{fb.userId?.name || "Unknown"}</span>
                  <span style={{ fontSize: "12px", color: "var(--text-faint)" }}>{fb.userId?.email}</span>
                </div>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 6px", lineHeight: 1.7 }}>{fb.message}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "#facc15", fontSize: "13px" }}>{"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}</span>
                  <span style={{ fontSize: "12px", color: "var(--text-faint)" }}>{new Date(fb.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button onClick={() => handleDelete(fb._id)} disabled={deletingId === fb._id}
                style={{ padding: "7px 14px", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", backgroundColor: "transparent", cursor: "pointer", fontSize: "12px", fontWeight: "600", flexShrink: 0, opacity: deletingId === fb._id ? 0.5 : 1, transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {deletingId === fb._id ? "..." : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserFeedbacks;
```

===============================================================================
FILE: client/src/components/ErrorBoundary.jsx
===============================================================================

```jsx

import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("ErrorBoundary:", error, info); }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "48px 24px", backgroundColor: "var(--bg-main)" }}>
          <div style={{ maxWidth: "480px" }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>⚠️</div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "12px" }}>Something went wrong</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.8, marginBottom: "12px" }}>An unexpected error occurred and has been logged.</p>
            {this.state.error && (
              <p style={{ fontFamily: "monospace", fontSize: "12px", color: "#ef4444", backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", padding: "12px 16px", borderRadius: "10px", marginBottom: "24px", textAlign: "left", wordBreak: "break-all" }}>
                {this.state.error.message}
              </p>
            )}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button onClick={() => this.setState({ hasError: false, error: null })}
                style={{ padding: "10px 24px", borderRadius: "9px", border: "none", cursor: "pointer", backgroundColor: "var(--primary)", color: "#fff", fontWeight: "600", fontSize: "14px" }}>
                Try Again
              </button>
              <Link to="/" style={{ padding: "10px 24px", borderRadius: "9px", textDecoration: "none", border: "1px solid var(--border)", color: "var(--text-muted)", fontWeight: "600", fontSize: "14px" }}>
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

===============================================================================
FILE: client/src/components/facultylayout/FacultyLayout.jsx
===============================================================================

```jsx
import { Outlet } from "react-router-dom";
import FacultyNavbar from "./FacultyNavbar";

function FacultyLayout() {
  return (
    <>
      <FacultyNavbar />

      <main
        style={{
          padding: 30,
          background: "var(--bg-card)",
          minHeight:"100vh"
        }}
      >
        <Outlet />
      </main>
    </>
  );
}

export default FacultyLayout;
```

===============================================================================
FILE: client/src/components/facultylayout/FacultyNavbar.jsx
===============================================================================

```jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../../axiosConfig";
import ThemeToggle from "../ThemeToggle";
import { useState, useRef, useEffect } from "react";

function FacultyNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch Faculty User
  useEffect(() => {
    API.get("/faculty/me")
      .then((r) => setUser(r.data))
      .catch(() => {});
  }, []);

  // Handle outside click for desktop dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const logout = async () => {
    try {
      await API.post("/faculty/logout");
      navigate("/faculty-login");
    } catch (err) {
      console.error(err);
    }
  };

  const links = [
    { to: "/faculty/facultynote", label: "Notes" },
    { to: "/faculty/feedback", label: "Feedback" },
  ];

  const isActive = (path) => location.pathname === path;
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "F";

  return (
    <nav
      style={{
        backgroundColor: "var(--bg-nav)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo Section */}
        <Link
          to="/faculty/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <img
            src="./ekalavya.png"
            alt=""
            style={{ height: "40px", borderRadius: 50 }}
          />
          <span
            style={{
              fontSize: "17px",
              fontWeight: "800",
              color: "var(--text-main)",
            }}
          >
            Ekalavya Faculty
          </span>
        </Link>

        {/* --- DESKTOP VIEW --- */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  color: isActive(link.to)
                    ? "var(--primary)"
                    : "var(--text-muted)",
                  fontWeight: isActive(link.to) ? "600" : "400",
                }}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />

            {/* Desktop Profile Dropdown */}
            <div
              style={{ position: "relative", marginLeft: "8px" }}
              ref={dropdownRef}
            >
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 12px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--bg-card)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "var(--primary)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: "900",
                  }}
                >
                  {initials}
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "var(--text-main)",
                    maxWidth: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user?.name || "Faculty"}
                </span>
                <svg
                  style={{
                    width: "14px",
                    height: "14px",
                    color: "var(--text-faint)",
                    transition: "transform 0.2s",
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 8px)",
                    width: "220px",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    boxShadow: "var(--shadow)",
                    zIndex: 50,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "14px 16px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "var(--text-main)",
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user?.name || "Faculty"}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-faint)",
                        margin: "3px 0 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user?.email || "faculty@ekalavya.edu"}
                    </p>
                  </div>
                  <Link
                    to="/faculty/profile"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "11px 16px",
                      textDecoration: "none",
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--bg-secondary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    👤 Profile
                  </Link>
                  <button
                    onClick={logout}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "11px 16px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#ef4444",
                      textAlign: "left",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "rgba(239,68,68,0.08)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- MOBILE VIEW (Hamburger + Theme) --- */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-main)",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {mobileMenuOpen ? (
                // Close Icon
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "var(--bg-nav)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid var(--border)",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            padding: "16px 24px",
            boxShadow: "var(--shadow)",
          }}
        >
          {/* Mobile Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "16px" }}>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  textDecoration: "none",
                  color: isActive(link.to) ? "var(--primary)" : "var(--text-muted)",
                  fontWeight: isActive(link.to) ? "600" : "500",
                  backgroundColor: isActive(link.to) ? "var(--bg-card)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile User Profile Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", padding: "0 8px" }}>
            <div style={{ width: "40px", height: "40px", backgroundColor: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px", fontWeight: "900" }}>
              {initials}
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-main)", margin: 0 }}>{user?.name || "Faculty"}</p>
              <p style={{ fontSize: "13px", color: "var(--text-faint)", margin: "2px 0 0" }}>{user?.email || "faculty@ekalavya.edu"}</p>
            </div>
          </div>

          {/* Mobile Actions */}
          <Link
            to="/faculty/profile"
            style={{ padding: "12px 16px", textDecoration: "none", fontSize: "15px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "10px" }}
          >
            👤 Profile
          </Link>
          <button
            onClick={logout}
            style={{ width: "100%", padding: "12px 16px", background: "none", border: "none", fontSize: "15px", color: "#ef4444", textAlign: "left", display: "flex", alignItems: "center", gap: "10px" }}
          >
            🚪 Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default FacultyNavbar;
```

===============================================================================
FILE: client/src/components/facultylayout/FacultyNote.jsx
===============================================================================

```jsx
import { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import Youtube from "@tiptap/extension-youtube";
import { TextStyle } from "@tiptap/extension-text-style";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import CodeBlockLowlight from "@tiptap/extension-code-block";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import CharacterCount from "@tiptap/extension-character-count";
import API from "../../axiosConfig";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useBase64ImageReplacer } from "../../hooks/useBase64ImageReplacer";

// ─── TOAST ─────────────────────────────────────────────────────────────────────
function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, []);
  const bg = type === "error" ? "#fee2e2" : type === "warn" ? "#fef9c3" : "#dcfce7";
  const color = type === "error" ? "#b91c1c" : type === "warn" ? "#854d0e" : "#166534";
  return (
    <div style={{
      position: "fixed", bottom: "28px", right: "28px", zIndex: 9999,
      padding: "12px 20px", borderRadius: "10px", background: bg, color,
      fontWeight: "600", fontSize: "13px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      animation: "slideUp 0.2s ease",
    }}>
      {message}
    </div>
  );
}

// ─── CONFIRM DIALOG ────────────────────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "16px", padding: "28px", maxWidth: "360px", width: "90vw",
        boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
      }}>
        <p style={{ margin: "0 0 20px", fontSize: "15px", color: "var(--text-main)", lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{
            padding: "8px 18px", borderRadius: "8px", border: "1px solid var(--border)",
            background: "var(--bg-main)", color: "var(--text-muted)",
            fontWeight: "600", fontSize: "13px", cursor: "pointer",
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            padding: "8px 18px", borderRadius: "8px", border: "none",
            background: "#e05252", color: "#fff",
            fontWeight: "700", fontSize: "13px", cursor: "pointer",
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── TOOLBAR PRIMITIVES ────────────────────────────────────────────────────────
function ToolBtn({ onClick, active, disabled, title, children }) {
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onClick?.(); }}
      disabled={disabled}
      title={title}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "32px", height: "32px", borderRadius: "6px", border: "none",
        background: active ? "color-mix(in srgb, var(--primary) 15%, var(--bg-main))" : "transparent",
        color: active ? "var(--primary)" : "var(--text-main)",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.35 : 1,
        fontSize: "13px", fontWeight: "600", flexShrink: 0,
        transition: "background 0.1s, color 0.1s",
      }}
    >
      {children}
    </button>
  );
}
function Sep() {
  return <div style={{ width: "1px", height: "20px", background: "var(--border)", flexShrink: 0, margin: "0 2px" }} />;
}

// ─── SHARED MODAL SHELL ────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "16px", padding: "28px",
        minWidth: "360px", maxWidth: "480px", width: "90vw",
        boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "var(--text-main)" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "18px" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const fieldInput = {
  border: "1px solid var(--border)", borderRadius: "8px",
  padding: "9px 12px", backgroundColor: "var(--bg-main)",
  color: "var(--text-main)", fontSize: "14px",
  outline: "none", width: "100%", boxSizing: "border-box", fontFamily: "inherit",
};

// ─── IMAGE MODAL ──────────────────────────────────────────────────────────────
function ImageModal({ editor, onClose }) {
  const { uploadImage } = useImageUpload();
  const [tab, setTab] = useState("url");
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const insertUrl = () => {
    if (!url.trim()) return;
    editor.chain().focus().setImage({ src: url, alt }).run();
    onClose();
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true); setError("");
    try {
      const cloudinaryUrl = await uploadImage(file);
      editor.chain().focus().setImage({ src: cloudinaryUrl, alt: file.name }).run();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal title="Insert Image" onClose={onClose}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {["url", "upload"].map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "8px", borderRadius: "8px", border: "1px solid",
            borderColor: tab === t ? "var(--primary)" : "var(--border)",
            background: tab === t ? "color-mix(in srgb, var(--primary) 10%, var(--bg-main))" : "var(--bg-main)",
            color: tab === t ? "var(--primary)" : "var(--text-muted)",
            fontWeight: "600", fontSize: "13px", cursor: "pointer",
          }}>{t === "url" ? "From URL" : "Upload File"}</button>
        ))}
      </div>
      {tab === "url" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input type="url" placeholder="https://example.com/image.png" value={url} onChange={(e) => setUrl(e.target.value)} style={fieldInput} />
          <input type="text" placeholder="Alt text (optional)" value={alt} onChange={(e) => setAlt(e.target.value)} style={fieldInput} />
          {url && <img src={url} alt={alt} style={{ maxWidth: "100%", maxHeight: "160px", objectFit: "contain", borderRadius: "8px" }} onError={(e) => (e.target.style.display = "none")} />}
          <button onClick={insertUrl} style={{ padding: "10px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>Insert Image</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {error && <div style={{ padding: "10px 14px", borderRadius: "8px", background: "#fee2e2", color: "#b91c1c", fontSize: "13px" }}>{error}</div>}
          <div onClick={() => !uploading && fileRef.current?.click()} style={{
            border: "2px dashed var(--border)", borderRadius: "10px", padding: "32px",
            textAlign: "center", cursor: uploading ? "default" : "pointer",
            color: "var(--text-muted)", fontSize: "13px", opacity: uploading ? 0.6 : 1,
          }}>
            {uploading ? "⏳ Uploading…" : "🖼 Click to choose an image file"}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </div>
      )}
    </Modal>
  );
}

// ─── VIDEO MODAL ──────────────────────────────────────────────────────────────
function VideoModal({ editor, onClose }) {
  const [url, setUrl] = useState("");
  return (
    <Modal title="Embed Video" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="url" placeholder="https://youtube.com/watch?v=..." value={url} onChange={(e) => setUrl(e.target.value)} style={fieldInput} />
        <button onClick={() => { if (url.trim()) { editor.commands.setYoutubeVideo({ src: url }); onClose(); } }}
          style={{ padding: "10px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
          Embed Video
        </button>
      </div>
    </Modal>
  );
}

// ─── LINK MODAL ───────────────────────────────────────────────────────────────
function LinkModal({ editor, onClose }) {
  const [href, setHref] = useState(editor.getAttributes("link").href || "");
  const [label, setLabel] = useState("");
  const insert = () => {
    if (!href.trim()) { editor.chain().focus().unsetLink().run(); onClose(); return; }
    if (label.trim()) editor.chain().focus().insertContent(`<a href="${href}" target="_blank">${label}</a>`).run();
    else editor.chain().focus().setLink({ href, target: "_blank" }).run();
    onClose();
  };
  return (
    <Modal title="Insert Link" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="url" placeholder="https://..." value={href} onChange={(e) => setHref(e.target.value)} style={fieldInput} />
        <input type="text" placeholder="Link text (leave blank to use selection)" value={label} onChange={(e) => setLabel(e.target.value)} style={fieldInput} />
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={insert} style={{ flex: 1, padding: "10px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>Insert</button>
          {editor.isActive("link") && (
            <button onClick={() => { editor.chain().focus().unsetLink().run(); onClose(); }}
              style={{ padding: "10px 16px", background: "none", color: "#e05252", border: "1px solid #e05252", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
              Remove
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

// ─── TABLE MODAL ──────────────────────────────────────────────────────────────
function TableModal({ editor, onClose }) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  return (
    <Modal title="Insert Table" onClose={onClose}>
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Rows</label>
          <input type="number" min="1" max="20" value={rows} onChange={(e) => setRows(+e.target.value)} style={fieldInput} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Columns</label>
          <input type="number" min="1" max="10" value={cols} onChange={(e) => setCols(+e.target.value)} style={fieldInput} />
        </div>
      </div>
      <button onClick={() => { editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run(); onClose(); }}
        style={{ width: "100%", padding: "10px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
        Insert Table
      </button>
    </Modal>
  );
}

// ─── TOOLBAR ──────────────────────────────────────────────────────────────────
function Toolbar({ editor }) {
  const [modal, setModal] = useState(null);
  const colorRef = useRef();
  if (!editor) return null;

  const cur = [1, 2, 3, 4].find((l) => editor.isActive("heading", { level: l }));

  return (
    <>
      {modal === "image" && <ImageModal editor={editor} onClose={() => setModal(null)} />}
      {modal === "video" && <VideoModal editor={editor} onClose={() => setModal(null)} />}
      {modal === "link"  && <LinkModal  editor={editor} onClose={() => setModal(null)} />}
      {modal === "table" && <TableModal editor={editor} onClose={() => setModal(null)} />}

      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2px",
        padding: "8px 12px", borderBottom: "1px solid var(--border)",
        background: "var(--bg-card)", position: "sticky", top: 0, zIndex: 10,
      }}>
        <select value={cur || "p"} onChange={(e) => {
          const v = e.target.value;
          if (v === "p") editor.chain().focus().setParagraph().run();
          else editor.chain().focus().toggleHeading({ level: parseInt(v) }).run();
        }} style={{
          border: "1px solid var(--border)", borderRadius: "6px", padding: "0 8px",
          height: "32px", fontSize: "13px", background: "var(--bg-main)",
          color: "var(--text-main)", outline: "none", cursor: "pointer", fontWeight: "600",
        }}>
          <option value="p">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
        </select>
        <Sep />
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><b>B</b></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><i>I</i></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><u>U</u></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><s>S</s></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} title="Highlight">🖊</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code"><span style={{ fontFamily: "monospace" }}>`</span></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive("subscript")} title="Subscript"><span style={{ fontSize: "11px" }}>X₂</span></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive("superscript")} title="Superscript"><span style={{ fontSize: "11px" }}>X²</span></ToolBtn>
        <div style={{ position: "relative" }} title="Text Color">
          <ToolBtn onClick={() => colorRef.current?.click()}><span style={{ fontSize: "14px", borderBottom: "3px solid var(--primary)" }}>A</span></ToolBtn>
          <input ref={colorRef} type="color" style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} />
        </div>
        <Sep />
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left">⬛︎</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Center">☰</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right">⬛</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify">≡</ToolBtn>
        <Sep />
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">• —</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">1.</ToolBtn>
        <Sep />
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Callout">"</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block"><span style={{ fontFamily: "monospace", fontSize: "11px" }}>{"{}"}</span></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">—</ToolBtn>
        <Sep />
        <ToolBtn onClick={() => setModal("image")} title="Insert Image">🖼</ToolBtn>
        <ToolBtn onClick={() => setModal("video")} title="Embed Video">▶</ToolBtn>
        <ToolBtn onClick={() => setModal("link")} active={editor.isActive("link")} title="Insert Link">🔗</ToolBtn>
        <ToolBtn onClick={() => setModal("table")} title="Insert Table">⊞</ToolBtn>
        <Sep />
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">↩</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">↪</ToolBtn>
        <div style={{ marginLeft: "auto", fontSize: "11px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
          {editor.storage.characterCount?.words?.()} words
        </div>
      </div>
    </>
  );
}

// ─── BUBBLE MENU ──────────────────────────────────────────────────────────────
function InlineBubble({ editor }) {
  if (!editor) return null;
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div style={{
        display: "flex", gap: "2px", padding: "6px 8px",
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      }}>
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><b>B</b></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><i>I</i></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}><u>U</u></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")}>🖊</ToolBtn>
        <Sep />
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}>H1</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>H2</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>H3</ToolBtn>
      </div>
    </BubbleMenu>
  );
}

// ─── NOTE CARD (in list view) ─────────────────────────────────────────────────
function NoteCard({ note, onEdit, onDelete }) {
  const wordCount = note.description
    ? note.description.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length
    : 0;

  const subjectName  = note.subject?.name  || "—";
  const courseName   = note.course?.name   || "—";
  const uniName      = note.university?.name || "—";

  const date = new Date(note.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div style={{
      border: "1px solid var(--border)", borderRadius: "14px",
      background: "var(--bg-card)", padding: "20px 22px",
      display: "flex", flexDirection: "column", gap: "10px",
      transition: "box-shadow 0.15s",
    }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{
              fontSize: "11px", fontWeight: "700", color: "var(--primary)",
              background: "color-mix(in srgb, var(--primary) 10%, var(--bg-main))",
              padding: "2px 8px", borderRadius: "20px",
            }}>
              #{note.order}
            </span>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{date}</span>
          </div>
          <h3 style={{
            margin: 0, fontSize: "15px", fontWeight: "700",
            color: "var(--text-main)", overflow: "hidden",
            textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {note.title}
          </h3>
        </div>
        {/* Actions */}
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <button onClick={() => onEdit(note)} style={{
            padding: "6px 14px", borderRadius: "7px", border: "1px solid var(--border)",
            background: "var(--bg-main)", color: "var(--text-main)",
            fontSize: "12px", fontWeight: "600", cursor: "pointer",
          }}>Edit</button>
          <button onClick={() => onDelete(note)} style={{
            padding: "6px 14px", borderRadius: "7px", border: "1px solid #fca5a5",
            background: "#fee2e2", color: "#b91c1c",
            fontSize: "12px", fontWeight: "600", cursor: "pointer",
          }}>Delete</button>
        </div>
      </div>

      {/* Meta badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {[uniName, courseName, `Sem ${note.semester}`, subjectName].map((label) => (
          <span key={label} style={{
            fontSize: "11px", color: "var(--text-muted)",
            background: "var(--bg-main)", border: "1px solid var(--border)",
            padding: "2px 8px", borderRadius: "20px",
          }}>{label}</span>
        ))}
      </div>

      {/* Word count */}
      <p style={{ margin: 0, fontSize: "11px", color: "var(--text-muted)" }}>
        {wordCount} words
      </p>
    </div>
  );
}

// ─── EDITOR STYLES ────────────────────────────────────────────────────────────
const editorStyles = `
  @keyframes slideUp { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .tiptap-editor { outline: none; min-height: 480px; padding: 32px 40px 64px; color: var(--text-main); font-size: 15px; line-height: 1.75; font-family: inherit; }
  .tiptap-editor h1 { font-size: 2rem; font-weight: 900; margin: 0 0 24px; letter-spacing: -0.5px; line-height: 1.2; }
  .tiptap-editor h2 { font-size: 1.4rem; font-weight: 700; margin: 36px 0 14px; padding-bottom: 8px; border-bottom: 2px solid var(--border); }
  .tiptap-editor h3 { font-size: 1.15rem; font-weight: 600; margin: 28px 0 10px; }
  .tiptap-editor h4 { font-size: 1rem; font-weight: 600; margin: 20px 0 8px; color: var(--text-muted); }
  .tiptap-editor p { margin: 0 0 14px; }
  .tiptap-editor p:last-child { margin-bottom: 0; }
  .tiptap-editor ul, .tiptap-editor ol { margin: 0 0 16px; padding-left: 24px; }
  .tiptap-editor li { margin-bottom: 6px; line-height: 1.65; }
  .tiptap-editor pre { background: #0d1117; color: #c9d1d9; border-radius: 10px; padding: 20px 24px; overflow-x: auto; font-family: monospace; font-size: 13px; line-height: 1.6; margin: 0 0 20px; border: 1px solid #30363d; }
  .tiptap-editor pre code { background: none; padding: 0; color: inherit; }
  .tiptap-editor code { font-family: monospace; background: color-mix(in srgb, var(--primary) 10%, var(--bg-main)); padding: 2px 6px; border-radius: 4px; font-size: 13px; }
  .tiptap-editor blockquote { border-left: 4px solid var(--primary); background: color-mix(in srgb, var(--primary) 8%, var(--bg-main)); padding: 14px 20px; border-radius: 4px; margin: 0 0 20px; }
  .tiptap-editor blockquote p { margin: 0; }
  .tiptap-editor hr { border: none; border-top: 2px solid var(--border); margin: 28px 0; }
  .tiptap-editor img { max-width: 100%; border-radius: 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); margin: 8px 0; }
  .tiptap-editor img.ProseMirror-selectednode { outline: 3px solid var(--primary); }
  .tiptap-editor .youtube-video, .tiptap-editor iframe { width: 100%; aspect-ratio: 16/9; border: none; border-radius: 10px; margin: 8px 0; display: block; }
  .tiptap-editor a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; font-weight: 500; }
  .tiptap-editor mark { background: #fef08a; border-radius: 3px; padding: 1px 3px; }
  .tiptap-editor table { border-collapse: collapse; width: 100%; margin: 0 0 20px; }
  .tiptap-editor th { background: color-mix(in srgb, var(--primary) 12%, var(--bg-main)); font-weight: 700; font-size: 13px; padding: 10px 14px; border: 1px solid var(--border); }
  .tiptap-editor td { padding: 10px 14px; border: 1px solid var(--border); font-size: 14px; }
  .tiptap-editor .selectedCell:after { background: color-mix(in srgb, var(--primary) 15%, transparent); content: ''; left: 0; right: 0; top: 0; bottom: 0; pointer-events: none; position: absolute; z-index: 2; }
  .tiptap-editor .is-editor-empty:first-child::before { content: attr(data-placeholder); float: left; color: var(--text-muted); pointer-events: none; height: 0; }
`;

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
function EmptyState({ onNew }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "80px 24px", textAlign: "center",
    }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>📝</div>
      <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: "700", color: "var(--text-main)" }}>
        No notes yet
      </h3>
      <p style={{ margin: "0 0 24px", color: "var(--text-muted)", fontSize: "14px" }}>
        Create your first note to get started
      </p>
      <button onClick={onNew} style={{
        padding: "10px 24px", borderRadius: "8px", border: "none",
        background: "var(--primary)", color: "#fff",
        fontWeight: "700", fontSize: "14px", cursor: "pointer",
      }}>
        + New Note
      </button>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function FacultyNotes() {
  // ── view state: "list" | "editor" ──
  const [view, setView]           = useState("list");
  const [editingNote, setEditing] = useState(null); // null = create mode, object = edit mode

  // ── list state ──
  const [notes, setNotes]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── filter state (list view) ──
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses]           = useState([]);
  const [subjects, setSubjects]         = useState([]);
  const [filter, setFilter]             = useState({ universityId: "", courseId: "", semester: "", subjectId: "" });

  // ── editor state ──
  const [formData, setFormData]   = useState({ universityId: "", courseId: "", semester: "", subjectId: "", title: "", order: 1 });
  const [eCourses, setECourses]   = useState([]);
  const [eSubjects, setESubjects] = useState([]);
  const [saving, setSaving]       = useState(false);
  const [preview, setPreview]     = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // ── toast ──
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });

  const { uploadImage } = useImageUpload();

  // ─── EDITOR INSTANCE ──────────────────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Highlight, TextStyle, Color, Subscript, Superscript,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ autolink: true }),
      Youtube.configure({ width: "100%", height: "auto" }),
      TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
      CodeBlockLowlight,
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
      CharacterCount,
      Placeholder.configure({ placeholder: "Start typing your note here…" }),
    ],
    editorProps: {
      handleDrop(view, event, _slice, moved) {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0];
          if (!file.type.startsWith("image/")) return false;
          event.preventDefault();
          const coords = view.posAtCoords({ left: event.clientX, top: event.clientY });
          uploadImage(file).then((url) => {
            const node = view.state.schema.nodes.image.create({ src: url });
            view.dispatch(view.state.tr.insert(coords.pos, node));
          }).catch(() => showToast("Image upload failed", "error"));
          return true;
        }
        return false;
      },
      handlePaste(view, event) {
        const items = Array.from(event.clipboardData?.items || []);
        const img   = items.find((i) => i.type.startsWith("image/"));
        if (!img) return false;
        event.preventDefault();
        const file = img.getAsFile();
        uploadImage(file).then((url) => {
          const node = view.state.schema.nodes.image.create({ src: url });
          view.dispatch(view.state.tr.replaceSelectionWith(node));
        }).catch(() => showToast("Image upload failed", "error"));
        return true;
      },
    },
    onUpdate: ({ editor }) => setWordCount(editor.storage.characterCount?.words?.() || 0),
  });

  useBase64ImageReplacer(editor);

  // ─── BOOTSTRAP ────────────────────────────────────────────────────────────
  useEffect(() => {
    API.get("/academic/universities").then((r) => setUniversities(r.data)).catch(console.error);
    loadNotes();
  }, []);

  const loadNotes = async (params = {}) => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (params.universityId) q.set("universityId", params.universityId);
      if (params.courseId)     q.set("courseId",     params.courseId);
      if (params.semester)     q.set("semester",     params.semester);
      if (params.subjectId)    q.set("subjectId",    params.subjectId);
      const r = await API.get(`/notes/faculty?${q.toString()}`);
      setNotes(r.data);
    } catch(err) {
      console.log(err)
      showToast("Failed to load notes", "error");
    } finally {
      setLoading(false);
    }
  };

  // ─── FILTER HELPERS ───────────────────────────────────────────────────────
  const filterCourseList  = courses;
  const filterSubjectList = subjects;
  const selectedFilterCourse = filterCourseList.find((c) => c._id === filter.courseId);

  const handleFilterUni = async (id) => {
    const next = { universityId: id, courseId: "", semester: "", subjectId: "" };
    setFilter(next); setCourses([]); setSubjects([]);
    if (id) {
      const r = await API.get(`/academic/courses/${id}`);
      setCourses(r.data);
    }
    loadNotes({ universityId: id });
  };
  const handleFilterCourse = (id) => {
    const next = { ...filter, courseId: id, semester: "", subjectId: "" };
    setFilter(next); setSubjects([]);
    loadNotes({ ...next });
  };
  const handleFilterSem = async (sem) => {
    const next = { ...filter, semester: sem, subjectId: "" };
    setFilter(next); setSubjects([]);
    if (filter.courseId && sem) {
      const r = await API.get(`/academic/subjects/${filter.courseId}/${sem}`);
      setSubjects(r.data);
    }
    loadNotes({ ...next });
  };
  const handleFilterSubject = (id) => {
    const next = { ...filter, subjectId: id };
    setFilter(next);
    loadNotes({ ...next });
  };

  // ─── EDITOR HELPERS ───────────────────────────────────────────────────────
  const openCreate = () => {
    setEditing(null);
    setFormData({ universityId: "", courseId: "", semester: "", subjectId: "", title: "", order: 1 });
    setECourses([]); setESubjects([]);
    editor?.commands.clearContent();
    setPreview(false);
    setView("editor");
  };

  const openEdit = async (note) => {
    setEditing(note);
    // Pre-fill form
    const fd = {
      universityId: note.university?._id || note.university,
      courseId:     note.course?._id     || note.course,
      semester:     String(note.semester),
      subjectId:    note.subject?._id    || note.subject,
      title:        note.title,
      order:        note.order,
    };
    setFormData(fd);

    // Pre-load dropdowns for this note's university/course/semester
    try {
      const [cRes, sRes] = await Promise.all([
        API.get(`/academic/courses/${fd.universityId}`),
        API.get(`/academic/subjects/${fd.courseId}/${fd.semester}`),
      ]);
      setECourses(cRes.data);
      setESubjects(sRes.data);
    } catch { /* non-fatal */ }

    editor?.commands.setContent(note.description || "");
    setPreview(false);
    setView("editor");
  };

  // Editor form dropdown helpers
  const handleEditorUni = async (id) => {
    setFormData((p) => ({ ...p, universityId: id, courseId: "", semester: "", subjectId: "" }));
    setECourses([]); setESubjects([]);
    if (id) { const r = await API.get(`/academic/courses/${id}`); setECourses(r.data); }
  };
  const handleEditorSem = async (sem) => {
    setFormData((p) => ({ ...p, semester: sem, subjectId: "" }));
    setESubjects([]);
    if (formData.courseId && sem) {
      const r = await API.get(`/academic/subjects/${formData.courseId}/${sem}`);
      setESubjects(r.data);
    }
  };
  const selectedEditorCourse = eCourses.find((c) => c._id === formData.courseId);

  // ─── SAVE (create or update) ──────────────────────────────────────────────
  const handleSave = async () => {
    if (!editor) return;
    if (!formData.title.trim()) { showToast("Please enter a title", "warn"); return; }
    if (!formData.subjectId)    { showToast("Please select a subject", "warn"); return; }

    setSaving(true);
    try {
      const payload = {
        title:       formData.title,
        description: editor.getHTML(),
        university:  formData.universityId,
        course:      formData.courseId,
        semester:    Number(formData.semester),
        subject:     formData.subjectId,
        order:       Number(formData.order),
      };

      if (editingNote) {
        await API.put(`/notes/${editingNote._id}`, payload);
        showToast("Note updated ✓");
      } else {
        await API.post("/notes", payload);
        showToast("Note saved ✓");
      }

      await loadNotes(filter);
      setView("list");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to save note", "error");
    } finally {
      setSaving(false);
    }
  };

  // ─── DELETE ───────────────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await API.delete(`/notes/${deleteTarget._id}`);
      showToast("Note deleted");
      setNotes((prev) => prev.filter((n) => n._id !== deleteTarget._id));
    } catch {
      showToast("Failed to delete note", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  // ─── SHARED STYLES ────────────────────────────────────────────────────────
  const selectStyle = {
    border: "1px solid var(--border)", borderRadius: "8px",
    padding: "10px 12px", backgroundColor: "var(--bg-card)",
    color: "var(--text-main)", fontSize: "14px",
    outline: "none", width: "100%", boxSizing: "border-box",
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <>
      <style>{editorStyles}</style>
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
      {deleteTarget && (
        <ConfirmDialog
          message={`Delete "${deleteTarget.title}"? This cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px 96px", color: "var(--text-main)", }}>

        {/* ══ LIST VIEW ═══════════════════════════════════════════════════════ */}
        {view === "list" && (
          <>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                  Faculty Portal
                </p>
                <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--text-main)", margin: 0 }}>
                  My Notes
                </h1>
              </div>
              <button onClick={openCreate} style={{
                padding: "10px 22px", borderRadius: "8px", border: "none",
                background: "var(--primary)", color: "#fff",
                fontWeight: "700", fontSize: "14px", cursor: "pointer",
              }}>
                + New Note
              </button>
            </div>

            {/* Filters */}
            <div style={{
              border: "1px solid var(--border)", borderRadius: "14px",
              padding: "18px 20px", background: "var(--bg-card)", marginBottom: "20px",
            }}>
              <p style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "12px" }}>
                Filter Notes
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
                <select style={selectStyle} value={filter.universityId} onChange={(e) => handleFilterUni(e.target.value)}>
                  <option value="">All Universities</option>
                  {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
                </select>
                <select style={selectStyle} value={filter.courseId} onChange={(e) => handleFilterCourse(e.target.value)} disabled={!filterCourseList.length}>
                  <option value="">All Courses</option>
                  {filterCourseList.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <select style={selectStyle} value={filter.semester} onChange={(e) => handleFilterSem(e.target.value)} disabled={!filter.courseId}>
                  <option value="">All Semesters</option>
                  {selectedFilterCourse && [...Array(selectedFilterCourse.totalSemesters)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                  ))}
                </select>
                <select style={selectStyle} value={filter.subjectId} onChange={(e) => handleFilterSubject(e.target.value)} disabled={!filterSubjectList.length}>
                  <option value="">All Subjects</option>
                  {filterSubjectList.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            {/* Notes grid */}
            {loading ? (
              <div style={{ padding: "60px", textAlign: "center", color: "var(--text-muted)" }}>Loading notes…</div>
            ) : notes.length === 0 ? (
              <EmptyState onNew={openCreate} />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "0 0 4px" }}>
                  {notes.length} note{notes.length !== 1 ? "s" : ""}
                </p>
                {notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={openEdit}
                    onDelete={setDeleteTarget}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ══ EDITOR VIEW ═════════════════════════════════════════════════════ */}
        {view === "editor" && (
          <>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <button onClick={() => setView("list")} style={{
                  padding: "8px 14px", borderRadius: "8px", border: "1px solid var(--border)",
                  background: "var(--bg-card)", color: "var(--text-muted)",
                  fontWeight: "600", fontSize: "13px", cursor: "pointer",
                }}>
                  ← Back
                </button>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>
                    Faculty Portal
                  </p>
                  <h1 style={{ fontSize: "1.6rem", fontWeight: "900", color: "var(--text-main)", margin: 0 }}>
                    {editingNote ? "Edit Note" : "New Note"}
                  </h1>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setPreview((p) => !p)} style={{
                  padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: "600",
                  border: "1px solid var(--border)",
                  background: preview ? "var(--primary)" : "var(--bg-card)",
                  color: preview ? "#fff" : "var(--text-main)", cursor: "pointer",
                }}>
                  {preview ? "← Edit" : "Preview ▶"}
                </button>
                <button onClick={handleSave} disabled={saving} style={{
                  padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: "700",
                  border: "none",
                  background: saving ? "var(--border)" : "var(--primary)",
                  color: "#fff", cursor: saving ? "default" : "pointer",
                }}>
                  {saving ? "Saving…" : editingNote ? "Update Note" : "Save Note"}
                </button>
              </div>
            </div>

            {/* Meta fields */}
            <div style={{
              border: "1px solid var(--border)", borderRadius: "16px",
              padding: "24px 28px", background: "var(--bg-card)", marginBottom: "20px",
            }}>
              <p style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "14px" }}>
                Note Details
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px" }}>
                <select style={selectStyle} value={formData.universityId || ""} onChange={(e) => handleEditorUni(e.target.value)}>
                  <option value="">University</option>
                  {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
                </select>
                <select style={selectStyle} value={formData.courseId || ""} onChange={(e) => setFormData((p) => ({ ...p, courseId: e.target.value, semester: "", subjectId: "" }))} disabled={!eCourses.length}>
                  <option value="">Course</option>
                  {eCourses.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <select style={selectStyle} value={formData.semester || ""} onChange={(e) => handleEditorSem(e.target.value)} disabled={!formData.courseId}>
                  <option value="">Semester</option>
                  {selectedEditorCourse && [...Array(selectedEditorCourse.totalSemesters)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                  ))}
                </select>
                <select style={selectStyle} value={formData.subjectId || ""} onChange={(e) => setFormData((p) => ({ ...p, subjectId: e.target.value }))} disabled={!eSubjects.length}>
                  <option value="">Subject</option>
                  {eSubjects.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
                <input type="text" placeholder="Chapter Title" value={formData.title || ""} onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))} style={selectStyle} />
                <input type="number" placeholder="Order" value={formData.order || ""} min="1" onChange={(e) => setFormData((p) => ({ ...p, order: e.target.value }))} style={selectStyle} />
              </div>
            </div>

            {/* Editor / Preview */}
            {preview ? (
              <div style={{ border: "1px solid var(--border)", borderRadius: "16px", padding: "40px", background: "var(--bg-card)" }}>
                <p style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "24px" }}>Preview</p>
                <div className="tiptap-editor" style={{ padding: 0 }} dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }} />
              </div>
            ) : (
              <div style={{ border: "1px solid var(--border)", borderRadius: "16px", background: "var(--bg-card)", overflow: "hidden" }}>
                <Toolbar editor={editor} />
                <InlineBubble editor={editor} />
                <EditorContent editor={editor} className="tiptap-editor" />
                <div style={{ padding: "8px 40px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    {wordCount} words · {editor?.storage.characterCount?.characters()} characters
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
```

===============================================================================
FILE: client/src/components/facultylayout/FacultyProfile.jsx
===============================================================================

```jsx
import { useEffect, useState } from "react";
import API from "../../axiosConfig";

function FacultyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);
  const [nameForm, setNameForm] = useState({ name: "", designation: "" });
  const [passwordForm, setPasswordForm] = useState({ 
    currentPassword: "", 
    newPassword: "", 
    confirmPassword: "" 
  });
  const [showPasswords, setShowPasswords] = useState({ 
    current: false, 
    new: false, 
    confirm: false 
  });
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });
  const [picMsg, setPicMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    API.get("/faculty/me")
      .then((r) => { 
        setUser(r.data); 
        setNameForm({ 
          name: r.data.name, 
          designation: r.data.designation || "" 
        }); 
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!nameForm.name.trim()) { 
      setProfileMsg({ type: "error", text: "Name is required." }); 
      return; 
    }
    setSaving(true); 
    setProfileMsg({ type: "", text: "" });
    try {
      const res = await API.put("/faculty/profile", { 
        name: nameForm.name, 
        email: user.email,
        designation: nameForm.designation 
      });
      setUser(res.data.user);
      setProfileMsg({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setProfileMsg({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to update." 
      });
    } finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword || !newPassword || !confirmPassword) { 
      setPasswordMsg({ type: "error", text: "All fields are required." }); 
      return; 
    }
    if (newPassword.length < 8) { 
      setPasswordMsg({ type: "error", text: "Min 8 characters." }); 
      return; 
    }
    if (newPassword !== confirmPassword) { 
      setPasswordMsg({ type: "error", text: "Passwords do not match." }); 
      return; 
    }
    setChangingPassword(true); 
    setPasswordMsg({ type: "", text: "" });
    try {
      await API.put("/faculty/change-password", { currentPassword, newPassword });
      setPasswordMsg({ type: "success", text: "Password changed successfully." });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordMsg({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to change password." 
      });
    } finally { setChangingPassword(false); }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { 
      setPicMsg({ type: "error", text: "JPG, PNG or WEBP only." }); 
      return; 
    }
    if (file.size > 5 * 1024 * 1024) { 
      setPicMsg({ type: "error", text: "Max 5MB." }); 
      return; 
    }
    const formData = new FormData();
    formData.append("profilePic", file);
    setUploadingPic(true); 
    setPicMsg({ type: "", text: "" });
    try {
      const res = await API.put("/faculty/profile-pic", formData, { 
        headers: { "Content-Type": "multipart/form-data" } 
      });
      setUser(res.data.user);
      setPicMsg({ type: "success", text: "Profile picture updated." });
    } catch (err) {
      setPicMsg({ 
        type: "error", 
        text: err.response?.data?.message || "Upload failed." 
      });
    } finally { setUploadingPic(false); }
  };

  const msgStyle = (type) => ({
    padding: "12px 16px", 
    borderRadius: "10px", 
    marginBottom: "20px", 
    fontSize: "14px",
    backgroundColor: type === "success" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
    border: `1px solid ${type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
    color: type === "success" ? "#10b981" : "#ef4444",
  });

  const inputStyle = { 
    width: "100%", 
    padding: "12px 16px", 
    borderRadius: "10px", 
    border: "1px solid var(--border)", 
    backgroundColor: "var(--bg-input)", 
    color: "var(--text-main)", 
    fontSize: "14px", 
    outline: "none", 
    boxSizing: "border-box", 
    transition: "border-color 0.2s" 
  };
  
  const cardStyle = { 
    backgroundColor: "var(--bg-card)", 
    border: "1px solid var(--border)", 
    borderRadius: "20px", 
    padding: "36px", 
    marginBottom: "24px" 
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: "80vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <div style={{ 
          width: "32px", 
          height: "32px", 
          border: "4px solid var(--border)", 
          borderTopColor: "var(--primary)", 
          borderRadius: "50%", 
          animation: "spin 0.8s linear infinite" 
        }} />
      </div>
    );
  }

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "F";

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "20px", 
        marginBottom: "40px" 
      }}>
        <div style={{ position: "relative" }}>
          {user?.profilePic ? (
            <img 
              src={user.profilePic} 
              alt="Profile" 
              style={{ 
                width: "72px", 
                height: "72px", 
                borderRadius: "18px", 
                objectFit: "cover", 
                border: "2px solid var(--border)" 
              }} 
            />
          ) : (
            <div style={{ 
              width: "72px", 
              height: "72px", 
              backgroundColor: "var(--primary)", 
              borderRadius: "18px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              color: "#fff", 
              fontSize: "22px", 
              fontWeight: "900" 
            }}>
              {initials}
            </div>
          )}
          <label 
            htmlFor="picInput" 
            style={{ 
              position: "absolute", 
              bottom: "-4px", 
              right: "-4px", 
              width: "26px", 
              height: "26px", 
              backgroundColor: "var(--primary)", 
              borderRadius: "50%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              cursor: "pointer", 
              transition: "background 0.2s" 
            }}
            onMouseEnter={(e) => 
              (e.currentTarget.style.backgroundColor = "var(--primary-hover)")
            }
            onMouseLeave={(e) => 
              (e.currentTarget.style.backgroundColor = "var(--primary)")
            }
          >
            <svg 
              style={{ width: "12px", height: "12px", color: "#fff" }} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2.414a2 2 0 01.586-1.414z" 
              />
            </svg>
          </label>
          <input 
            id="picInput" 
            type="file" 
            accept="image/jpeg,image/png,image/webp" 
            onChange={handleProfilePicChange} 
            style={{ display: "none" }} 
          />
        </div>
        
        <div>
          <h1 style={{ 
            fontSize: "1.6rem", 
            fontWeight: "900", 
            color: "var(--text-main)", 
            marginBottom: "4px" 
          }}>
            {user?.name}
          </h1>
          <p style={{ 
            fontSize: "14px", 
            color: "var(--text-muted)", 
            margin: 0 
          }}>
            {user?.email} ·{" "}
            <span style={{ 
              color: "var(--primary)", 
              fontWeight: "600", 
              textTransform: "capitalize" 
            }}>
              {user?.role || "Faculty"}
            </span>
          </p>
          {user?.designation && (
            <p style={{ 
              fontSize: "13px", 
              color: "var(--text-faint)", 
              margin: "4px 0 0" 
            }}>
              {user.designation}
            </p>
          )}
          {uploadingPic && (
            <p style={{ 
              fontSize: "12px", 
              color: "var(--primary)", 
              marginTop: "6px" 
            }}>
              Uploading...
            </p>
          )}
          {picMsg.text && (
            <p style={{ 
              fontSize: "12px", 
              marginTop: "6px", 
              color: picMsg.type === "success" ? "#10b981" : "#ef4444" 
            }}>
              {picMsg.text}
            </p>
          )}
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ 
          fontSize: "17px", 
          fontWeight: "800", 
          color: "var(--text-main)", 
          marginBottom: "6px" 
        }}>
          Personal Information
        </h2>
        <p style={{ 
          fontSize: "13px", 
          color: "var(--text-faint)", 
          marginBottom: "24px" 
        }}>
          Update your name and designation. Email cannot be changed.
        </p>
        {profileMsg.text && (
          <div style={msgStyle(profileMsg.type)}>
            {profileMsg.type === "success" ? "✅" : "⚠️"} {profileMsg.text}
          </div>
        )}
        <form onSubmit={handleProfileSave} style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "20px" 
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ 
              fontSize: "13px", 
              fontWeight: "600", 
              color: "var(--text-muted)" 
            }}>
              Full name
            </label>
            <input 
              value={nameForm.name} 
              onChange={(e) => setNameForm({ ...nameForm, name: e.target.value })} 
              placeholder="John Doe" 
              required 
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "var(--primary)")} 
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")} 
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ 
              fontSize: "13px", 
              fontWeight: "600", 
              color: "var(--text-muted)" 
            }}>
              Designation
            </label>
            <input 
              value={nameForm.designation} 
              onChange={(e) => setNameForm({ ...nameForm, designation: e.target.value })} 
              placeholder="Professor, Assistant Professor, etc." 
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "var(--primary)")} 
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")} 
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ 
              fontSize: "13px", 
              fontWeight: "600", 
              color: "var(--text-muted)" 
            }}>
              Email <span style={{ color: "var(--text-faint)", fontWeight: "400" }}>
                (cannot be changed)
              </span>
            </label>
            <input 
              value={user?.email} 
              disabled 
              style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }} 
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ 
              fontSize: "13px", 
              fontWeight: "600", 
              color: "var(--text-muted)" 
            }}>
              Status
            </label>
            <span style={{ 
              display: "inline-block", 
              padding: "4px 14px", 
              backgroundColor: user?.isApproved ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
              color: user?.isApproved ? "#10b981" : "#ef4444",
              fontSize: "12px", 
              fontWeight: "700", 
              borderRadius: "999px", 
              alignSelf: "flex-start" 
            }}>
              {user?.isApproved ? "✅ Approved" : "⏳ Pending Approval"}
            </span>
          </div>
          <button 
            type="submit" 
            disabled={saving}
            style={{ 
              alignSelf: "flex-start", 
              padding: "11px 28px", 
              borderRadius: "10px", 
              border: "none", 
              cursor: "pointer", 
              backgroundColor: "var(--primary)", 
              color: "#fff", 
              fontWeight: "700", 
              fontSize: "14px", 
              opacity: saving ? 0.6 : 1,
              transition: "opacity 0.2s"
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      <div style={cardStyle}>
        <h2 style={{ 
          fontSize: "17px", 
          fontWeight: "800", 
          color: "var(--text-main)", 
          marginBottom: "6px" 
        }}>
          Change Password
        </h2>
        <p style={{ 
          fontSize: "13px", 
          color: "var(--text-faint)", 
          marginBottom: "24px" 
        }}>
          Must be at least 8 characters.
        </p>
        {passwordMsg.text && (
          <div style={msgStyle(passwordMsg.type)}>
            {passwordMsg.type === "success" ? "✅" : "⚠️"} {passwordMsg.text}
          </div>
        )}
        <form onSubmit={handlePasswordChange} style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "20px" 
        }}>
          {[
            { field: "current", label: "Current password", key: "currentPassword" },
            { field: "new", label: "New password", key: "newPassword" },
            { field: "confirm", label: "Confirm new password", key: "confirmPassword" },
          ].map(({ field, label, key }) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ 
                fontSize: "13px", 
                fontWeight: "600", 
                color: "var(--text-muted)" 
              }}>
                {label}
              </label>
              <div style={{ position: "relative" }}>
                <input 
                  type={showPasswords[field] ? "text" : "password"} 
                  value={passwordForm[key]}
                  onChange={(e) => setPasswordForm({ ...passwordForm, [key]: e.target.value })} 
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: "60px" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")} 
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPasswords((p) => ({ ...p, [field]: !p[field] }))}
                  style={{ 
                    position: "absolute", 
                    right: "12px", 
                    top: "50%", 
                    transform: "translateY(-50%)", 
                    background: "none", 
                    border: "none", 
                    cursor: "pointer", 
                    fontSize: "12px", 
                    fontWeight: "600", 
                    color: "var(--text-faint)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-secondary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {showPasswords[field] ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          ))}
          <button 
            type="submit" 
            disabled={changingPassword}
            style={{ 
              alignSelf: "flex-start", 
              padding: "11px 28px", 
              borderRadius: "10px", 
              cursor: "pointer", 
              backgroundColor: "var(--bg-secondary)", 
              color: "var(--text-main)", 
              border: "1px solid var(--border)", 
              fontWeight: "700", 
              fontSize: "14px", 
              opacity: changingPassword ? 0.6 : 1,
              transition: "opacity 0.2s"
            }}
          >
            {changingPassword ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>

      {/* Add CSS animation for spinner */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default FacultyProfile;
```

===============================================================================
FILE: client/src/components/facultylayout/FacultySidebar.jsx
===============================================================================

```jsx
```

===============================================================================
FILE: client/src/components/guestlayout/About.jsx
===============================================================================

```jsx
import React from "react";
import Tilt from "react-parallax-tilt";
import Cards from "./Cards";
import {
  FaRocket,
  FaShieldAlt,
  FaPuzzlePiece,
  FaBookOpen,
  FaBolt,
  FaCloud,
} from "react-icons/fa";
function About() {
  return (
    <div style={{ color: "var(--text-main)" }}>
      {/* 
        Embedded CSS for the premium 3D glow effect.
      */}
      <style>
        {`
          .tilt-wrapper {
            height: 100%;
            display: flex;
            border-radius: 16px;
            /* CRITICAL: Allows children to exist in 3D space */
            transform-style: preserve-3d;
          }
          
          .premium-glow-card {
            position: relative;
            background-color: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 32px;
            display: flex;
            flex-direction: column;
            height: 100%;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 1;
            /* CRITICAL: Removed overflow:hidden and added preserve-3d so elements can pop out */
            transform-style: preserve-3d; 
          }

          /* Gradient Border Effect */
          .premium-glow-card::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 16px;
            padding: 2px;
            background: linear-gradient(135deg, var(--primary), transparent 70%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: -1;
            pointer-events: none;
          }

          /* Hover state overrides for the card */
          .tilt-wrapper:hover .premium-glow-card {
            border-color: transparent;
            box-shadow: 0 12px 40px -12px var(--primary);
            /* Added translateZ to maintain the whole card's 3D perspective */
            transform: translateY(-4px) translateZ(10px);
          }
          
          .tilt-wrapper:hover .premium-glow-card::before {
            opacity: 1;
          }

          /* --- 3D POP-OUT ELEMENTS --- */
          
          .icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 56px;
            border-radius: 14px;
           
            font-size: 28px;
            margin-bottom: 24px;
            /* Pushes icon off the card */
            transform: translateZ(50px);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 8px 16px rgba(0,0,0,0.05);
          }

          .tilt-wrapper:hover .icon-wrapper {
            /* Pushes it further out on hover and scales it */
            transform: translateZ(80px) scale(1.1) rotate(-5deg);
            
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          }

          .card-title-3d {
            /* Pushes text off the card */
            transform: translateZ(35px);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .tilt-wrapper:hover .card-title-3d {
            transform: translateZ(55px);
          }

          .card-desc-3d {
            /* Pushes description slightly off the card */
            transform: translateZ(20px);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .tilt-wrapper:hover .card-desc-3d {
            transform: translateZ(35px);
          }
        `}
      </style>

      {/* Hero Section */}
      <section
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "120px 24px 80px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "var(--primary)",
            border: "1px solid var(--primary)",
            borderRadius: "999px",
            padding: "8px 20px",
            marginBottom: "32px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          About Us
        </span>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: "900",
            lineHeight: 1.1,
            marginBottom: "28px",
            color: "var(--text-main)",
          }}
        >
          The team behind
          <br />
          <span
            style={{
              color: "var(--primary)",
              background: "linear-gradient(90deg, var(--primary), #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ekalavya
          </span>
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--text-muted)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          We are a passionate collective of creators, engineers, and problem
          solvers dedicated to forging exceptional, future-proof digital
          experiences.
        </p>
      </section>

      {/* Story Section */}
      <section
        style={{
          padding: "100px 24px",
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              color: "var(--text-main)",
              marginBottom: "32px",
            }}
          >
            Our Journey
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1.1rem",
              lineHeight: 1.9,
              marginBottom: "24px",
            }}
          >
            Ekalavya started as a focused team with a massive vision — to
            democratize high-end digital infrastructure and make exceptional
            products accessible to ambitious businesses of all scales.
          </p>
          <p
            style={{
              color: "var(--text-faint)",
              fontSize: "1.05rem",
              lineHeight: 1.9,
            }}
          >
            Today, we collaborate with disruptive startups, rapid scale-ups, and
            global enterprise companies. We view every line of code and every
            single pixel as an opportunity to do the best work of our lives.
          </p>
        </div>
      </section>

      {/* Stats Section */}

      {/* Core Values Section (Premium Animated Cards) */}
      <section
        style={{
          padding: "120px 24px",
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "var(--text-main)",
                marginBottom: "16px",
              }}
            >
              What we stand for
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
              The core principles that drive our engineering and design.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "28px",
            }}
          >
            {[
              {
                icon: <FaRocket color="#FF6B35" size={30} />,
                title: "Speed First",
                desc: "Every architecture decision is heavily optimized for zero-latency, getting your users to results instantly.",
              },
              {
                icon: <FaShieldAlt color="#3B82F6" size={30} />,
                title: "Security Built In",
                desc: "Enterprise-grade best practices and secure-by-default logic are foundational, never treated as an afterthought.",
              },
              {
                icon: <FaPuzzlePiece color="#A855F7" size={30} />,
                title: "Modular by Design",
                desc: "Highly decoupled features. Easily scale up, add what you need, and gracefully skip what you don't.",
              },
              {
                icon: <FaBookOpen color="#10B981" size={30} />,
                title: "Open & Transparent",
                desc: "No black boxes or locked ecosystems. Clean, documented code that remains fully yours to modify.",
              },
              {
                icon: <FaBolt color="#FACC15" size={30} />,
                title: "Lightning Fast",
                desc: "Optimized rendering, efficient data flow, and seamless interactions deliver a smooth experience on every device.",
              },
              {
                icon: <FaCloud color="#06B6D4" size={30} />,
                title: "Cloud Ready",
                desc: "Deploy effortlessly across modern cloud platforms with scalable infrastructure and continuous integration support.",
              },
            ].map((v) => (
              <Tilt
                key={v.title}
                className="tilt-wrapper"
                tiltMaxAngleX={14} // Increased for better 3D angles
                tiltMaxAngleY={14} // Increased for better 3D angles
                perspective={1000}
                scale={1.02}
                transitionSpeed={2000}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="var(--text-main)"
                glarePosition="all"
                glareBorderRadius="16px"
              >
                <div className="premium-glow-card">
                  <div className="icon-wrapper">{v.icon}</div>
                  <h3
                    className="card-title-3d"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "800",
                      color: "var(--text-main)",
                      marginBottom: "12px",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="card-desc-3d"
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Interactive Components */}
      <div style={{ paddingBottom: "80px" }}>
        <Cards />
      </div>
    </div>
  );
}

export default About;
```

===============================================================================
FILE: client/src/components/guestlayout/AnimatedHScroll.jsx
===============================================================================

```jsx
import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   ANIMATED SVG COMPONENTS
───────────────────────────────────────────── */

// Base animated shapes that morph based on scroll progress
const AnimatedHexagon = ({ progress = 0, color = "#f5ad42" }) => {
  // Calculate morphing between hexagon and circle based on progress
  const morphValue = Math.sin(progress * Math.PI);
  
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`hexGrad-${Math.random()}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8">
            <animate attributeName="stop-opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor={color} stopOpacity="0.2">
            <animate attributeName="stop-opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      
      {/* Outer rotating hexagon */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 100 100`}
          to={`360 100 100`}
          dur="20s"
          repeatCount="indefinite"
        />
        <polygon
          points="100,20 160,55 160,125 100,160 40,125 40,55"
          fill="none"
          stroke={`url(#hexGrad-${Math.random()})`}
          strokeWidth="2"
        >
          <animate
            attributeName="points"
            values="100,20 160,55 160,125 100,160 40,125 40,55;100,50 140,50 140,150 100,150 60,150 60,50;100,20 160,55 160,125 100,160 40,125 40,55"
            dur="3s"
            repeatCount="indefinite"
          />
        </polygon>
      </g>
      
      {/* Pulsing circles inside */}
      <circle cx="100" cy="100" r="30" fill="none" stroke={color} strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="20;40;20" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
      </circle>
      
      {/* Floating particles */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <circle
          key={i}
          cx={100 + 50 * Math.cos((angle + progress * 360) * Math.PI / 180)}
          cy={100 + 50 * Math.sin((angle + progress * 360) * Math.PI / 180)}
          r="3"
          fill={color}
          opacity="0.6"
        >
          <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
        </circle>
      ))}
    </svg>
  );
};

const AnimatedNetwork = ({ progress = 0, color = "#f5ad42" }) => {
  const nodes = [
    { x: 100, y: 40 },
    { x: 160, y: 80 },
    { x: 160, y: 150 },
    { x: 100, y: 180 },
    { x: 40, y: 150 },
    { x: 40, y: 80 },
  ];

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Connection lines with animation */}
      {nodes.map((node, i) => (
        <line
          key={`line-${i}`}
          x1={node.x}
          y1={node.y}
          x2={nodes[(i + 1) % 6].x}
          y2={nodes[(i + 1) % 6].y}
          stroke={color}
          strokeWidth="1"
          opacity="0.2"
        >
          <animate
            attributeName="opacity"
            values="0.1;0.3;0.1"
            dur="2s"
            repeatCount="indefinite"
            begin={`${i * 0.3}s`}
          />
        </line>
      ))}
      
      {/* Center hub */}
      <circle cx="100" cy="100" r="15" fill={color} opacity="0.3">
        <animate attributeName="r" values="10;20;10" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="100" r="8" fill={color} opacity="0.6" />
      
      {/* Outer nodes */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`}>
          <circle cx={node.x} cy={node.y} r="6" fill="none" stroke={color} strokeWidth="1.5">
            <animate
              attributeName="r"
              values={`${6 - Math.sin(i * 0.5 + progress * Math.PI * 2) * 2};${6 + Math.sin(i * 0.5 + progress * Math.PI * 2) * 2};${6 - Math.sin(i * 0.5 + progress * Math.PI * 2) * 2}`}
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={node.x} cy={node.y} r="3" fill={color}>
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
          </circle>
          
          {/* Data flow particles */}
          <circle r="2" fill={color}>
            <animateMotion
              path={`M${100},${100} L${node.x},${node.y}`}
              dur="2s"
              repeatCount="indefinite"
              begin={`${i * 0.3}s`}
            />
          </circle>
        </g>
      ))}
    </svg>
  );
};

const AnimatedDiamond = ({ progress = 0, color = "#f5ad42" }) => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Rotating diamond shapes */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 100 100"
          to="360 100 100"
          dur="15s"
          repeatCount="indefinite"
        />
        
        {/* Outer diamond */}
        <polygon
          points="100,20 180,100 100,180 20,100"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.3"
        >
          <animate
            attributeName="points"
            values="100,20 180,100 100,180 20,100;100,40 160,100 100,160 40,100;100,20 180,100 100,180 20,100"
            dur="4s"
            repeatCount="indefinite"
          />
        </polygon>
        
        {/* Inner diamond */}
        <polygon
          points="100,50 150,100 100,150 50,100"
          fill={color}
          fillOpacity="0.1"
          stroke={color}
          strokeWidth="1"
        />
      </g>
      
      {/* Corner dots */}
      {[[100,20], [180,100], [100,180], [20,100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={color}>
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur="2s"
            repeatCount="indefinite"
            begin={`${i * 0.5}s`}
          />
        </circle>
      ))}
    </svg>
  );
};

const AnimatedWaves = ({ progress = 0, color = "#f5ad42" }) => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Animated wave lines */}
      {[0, 15, 30, 45].map((offset, i) => (
        <path
          key={i}
          d={`M 20,${100 + offset} Q 60,${80 + offset} 100,${100 + offset} T 180,${100 + offset}`}
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity={0.2 + i * 0.05}
        >
          <animate
            attributeName="d"
            values={`
              M 20,${100 + offset} Q 60,${80 + offset} 100,${100 + offset} T 180,${100 + offset};
              M 20,${100 + offset} Q 60,${120 + offset} 100,${100 + offset} T 180,${100 + offset};
              M 20,${100 + offset} Q 60,${80 + offset} 100,${100 + offset} T 180,${100 + offset}
            `}
            dur={`${3 + i * 0.5}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}
      
      {/* Floating geometric shape */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-10; 0,0"
          dur="4s"
          repeatCount="indefinite"
        />
        <rect
          x="85"
          y="70"
          width="30"
          height="30"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          transform="rotate(45 100 85)"
        >
          <animate attributeName="width" values="20;30;20" dur="3s" repeatCount="indefinite" />
          <animate attributeName="height" values="20;30;20" dur="3s" repeatCount="indefinite" />
        </rect>
      </g>
    </svg>
  );
};

const AnimatedCircles = ({ progress = 0, color = "#f5ad42" }) => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Concentric circles with animations */}
      {[20, 30, 40, 50, 60].map((radius, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity={0.1 + i * 0.05}
        >
          <animate
            attributeName="r"
            values={`${radius - 5};${radius + 5};${radius - 5}`}
            dur={`${2 + i * 0.5}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values={`${0.1 + i * 0.05};${0.2 + i * 0.05};${0.1 + i * 0.05}`}
            dur={`${3 + i * 0.3}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      
      {/* Central pulsing circle */}
      <circle cx="100" cy="100" r="15" fill={color} opacity="0.3">
        <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Orbiting particles */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 100 100"
          to="360 100 100"
          dur="10s"
          repeatCount="indefinite"
        />
        <circle cx="100" cy="40" r="4" fill={color} opacity="0.6" />
        <circle cx="100" cy="160" r="3" fill={color} opacity="0.4" />
      </g>
    </svg>
  );
};

const AnimatedGrid = ({ progress = 0, color = "#f5ad42" }) => {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Animated grid lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          {/* Horizontal lines */}
          <line
            x1="10"
            y1={30 + i * 35}
            x2="190"
            y2={30 + i * 35}
            stroke={color}
            strokeWidth="0.5"
            opacity="0.15"
          >
            <animate
              attributeName="y1"
              values={`${30 + i * 35};${35 + i * 35};${30 + i * 35}`}
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </line>
          
          {/* Vertical lines */}
          <line
            x1={30 + i * 35}
            y1="10"
            x2={30 + i * 35}
            y2="190"
            stroke={color}
            strokeWidth="0.5"
            opacity="0.15"
          >
            <animate
              attributeName="x1"
              values={`${30 + i * 35};${35 + i * 35};${30 + i * 35}`}
              dur={`${2.5 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </line>
        </g>
      ))}
      
      {/* Highlighted intersections */}
      {[0, 1, 2, 3, 4].map((i) =>
        [0, 1, 2, 3, 4].map((j) => (
          <circle
            key={`${i}-${j}`}
            cx={30 + i * 35}
            cy={30 + j * 35}
            r="2"
            fill={color}
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.5;0.1"
              dur={`${1.5 + Math.random() * 2}s`}
              repeatCount="indefinite"
              begin={`${i * 0.2 + j * 0.3}s`}
            />
          </circle>
        ))
      )}
    </svg>
  );
};

/* ─────────────────────────────────────────────
   MAIN HORIZONTAL SCROLL COMPONENT
───────────────────────────────────────────── */

const PANELS = [
  {
    title: "University Ecosystem",
    subtitle: "One Hub. Every Campus.",
    description: "Connect multiple universities with a single platform. Seamless integration across institutions.",
    tags: ["Multi-University", "Scalable", "Unified"],
    Visual: AnimatedHexagon,
  },
  {
    title: "Faculty Workspace",
    subtitle: "Create. Teach. Inspire.",
    description: "Rich content editor with real-time preview. Upload notes, create assignments effortlessly.",
    tags: ["Editor", "Upload", "Organize"],
    Visual: AnimatedNetwork,
  },
  {
    title: "Student Learning",
    subtitle: "Anywhere. Anytime.",
    description: "Access notes on any device. Download PDFs, bookmark chapters, and learn on the go.",
    tags: ["Mobile", "Offline", "Bookmarks"],
    Visual: AnimatedDiamond,
  },
  {
    title: "Progress Tracking",
    subtitle: "Track. Improve. Excel.",
    description: "Monitor chapter completion, test scores, and learning progress with smart analytics.",
    tags: ["Analytics", "Progress", "Goals"],
    Visual: AnimatedWaves,
  },
  {
    title: "Administration",
    subtitle: "Manage. Control. Grow.",
    description: "Complete admin dashboard with role-based access and comprehensive management tools.",
    tags: ["Dashboard", "Roles", "Reports"],
    Visual: AnimatedCircles,
  },
  {
    title: "Technology Stack",
    subtitle: "Fast. Secure. Modern.",
    description: "Built with React, Node.js, and MongoDB. Cloud-native architecture for performance.",
    tags: ["React", "Node.js", "MongoDB"],
    Visual: AnimatedGrid,
  },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --amber: #f5ad42;
  --bg: #0a0a0a;
  --text: #ffffff;
  --text-muted: #888888;
  --border: rgba(255,255,255,0.08);
}

body { 
  background: var(--bg); 
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
}

.ahs-wrapper {
  position: relative;
  background: var(--bg);
}

.ahs-sticky {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--bg);
}

.ahs-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--amber);
  z-index: 100;
  transition: width 0.1s linear;
}

.ahs-track {
  display: flex;
  height: 100%;
  will-change: transform;
}

.ahs-panel {
  flex: 0 0 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 80px;
  position: relative;
}

.ahs-panel-inner {
  display: flex;
  align-items: center;
  gap: 80px;
  max-width: 1200px;
  width: 100%;
}

.ahs-text {
  flex: 1;
}

.ahs-visual {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ahs-visual svg {
  width: 100%;
  max-width: 400px;
  height: auto;
}

.ahs-eyebrow {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.ahs-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 16px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
}

.ahs-subtitle {
  font-size: 20px;
  color: var(--amber);
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
}

.ahs-description {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 30px;
  max-width: 400px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
}

.ahs-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
}

.ahs-tag {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 8px 16px;
  border: 1px solid rgba(245,173,66,0.2);
  border-radius: 4px;
  color: var(--amber);
  background: rgba(245,173,66,0.05);
}

.ahs-panel.is-active .ahs-eyebrow,
.ahs-panel.is-active .ahs-title,
.ahs-panel.is-active .ahs-subtitle,
.ahs-panel.is-active .ahs-description,
.ahs-panel.is-active .ahs-tags {
  opacity: 1;
  transform: translateY(0);
}

.ahs-counter {
  position: absolute;
  bottom: 40px;
  right: 40px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  color: rgba(255,255,255,0.3);
  z-index: 10;
}

.ahs-counter span {
  color: var(--amber);
  font-weight: 600;
}

.ahs-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: rgba(255,255,255,0.2);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  z-index: 10;
  transition: opacity 0.3s;
}

.ahs-hint-arrow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

@media (max-width: 768px) {
  .ahs-panel { padding: 0 24px; }
  .ahs-panel-inner { flex-direction: column; gap: 40px; }
  .ahs-visual { flex: 0; }
  .ahs-visual svg { max-width: 250px; }
  .ahs-title { font-size: 36px; }
}
`;

export default function AnimatedHScroll() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const panelRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const scrollProgress = useRef(0);

  // Inject CSS
  useEffect(() => {
    const styleId = 'ahs-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);

  // Smooth scroll handler
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let ticking = false;

    const updateScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const wrapperTop = window.scrollY + rect.top;
      const viewH = window.innerHeight;
      const wrapperH = wrapper.offsetHeight;
      const scrolledIn = window.scrollY - wrapperTop;
      const totalScroll = wrapperH - viewH;
      const progress = Math.max(0, Math.min(1, scrolledIn / totalScroll));
      
      scrollProgress.current = progress;

      // Update track position
      if (trackRef.current) {
        const maxShift = (PANELS.length - 1) * window.innerWidth;
        trackRef.current.style.transform = `translateX(-${progress * maxShift}px)`;
      }

      // Update progress bar
      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`;
      }

      // Update active panel
      const newIndex = Math.min(PANELS.length - 1, Math.round(progress * (PANELS.length - 1)));
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        setShowHint(progress < 0.05);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial update
    setTimeout(updateScroll, 100);

    return () => window.removeEventListener('scroll', onScroll);
  }, [activeIndex]);

  // Update panel active states
  useEffect(() => {
    panelRefs.current.forEach((panel, i) => {
      if (panel) {
        if (i === activeIndex) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      }
    });
  }, [activeIndex]);

  const wrapperHeight = `${PANELS.length * 100}vh`;

  return (
    <div style={{ background: '#0a0a0a', color: '#ffffff' }}>
      {/* Intro section */}
      <div style={{ 
        height: '60vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 40px'
      }}>
        <h1 style={{ 
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 600,
          lineHeight: 1.1,
          marginBottom: '20px'
        }}>
          Learning Platform
          <br />
          <span style={{ color: '#f5ad42' }}>Reimagined</span>
        </h1>
        <p style={{ 
          color: '#888', 
          fontSize: '18px', 
          maxWidth: '600px',
          lineHeight: 1.6
        }}>
          Scroll to explore how we're transforming education with modern technology and intuitive design.
        </p>
      </div>

      {/* Horizontal scroller */}
      <div ref={wrapperRef} className="ahs-wrapper" style={{ height: wrapperHeight }}>
        <div className="ahs-sticky">
          <div ref={progressRef} className="ahs-progress" />
          
          <div className="ahs-track" ref={trackRef}>
            {PANELS.map((panel, i) => {
              const { title, subtitle, description, tags, Visual } = panel;
              return (
                <div
                  key={i}
                  className="ahs-panel"
                  ref={el => panelRefs.current[i] = el}
                >
                  <div className="ahs-panel-inner">
                    <div className="ahs-text">
                      <div className="ahs-eyebrow">Feature {String(i + 1).padStart(2, '0')}</div>
                      <h2 className="ahs-title">{title}</h2>
                      <div className="ahs-subtitle">{subtitle}</div>
                      <p className="ahs-description">{description}</p>
                      <div className="ahs-tags">
                        {tags.map(tag => (
                          <span key={tag} className="ahs-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="ahs-visual">
                      <Visual progress={scrollProgress.current} color="#f5ad42" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Counter */}
          <div className="ahs-counter">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span> / {String(PANELS.length).padStart(2, '0')}
          </div>

          {/* Scroll hint */}
          <div className="ahs-hint" style={{ opacity: showHint ? 1 : 0 }}>
            <span>Scroll</span>
            <svg className="ahs-hint-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Outro section */}
      <div style={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 40px'
      }}>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 600,
          lineHeight: 1.1,
          marginBottom: '20px',
          maxWidth: '700px'
        }}>
          Ready to transform
          <br />
          <span style={{ color: '#f5ad42' }}>your learning experience?</span>
        </h2>
        <p style={{
          color: '#888',
          fontSize: '16px',
          maxWidth: '500px',
          lineHeight: 1.6
        }}>
          Join thousands of students and educators who are already using our platform.
        </p>
      </div>
    </div>
  );
}
```

===============================================================================
FILE: client/src/components/guestlayout/BookAnimation.jsx
===============================================================================

```jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 300;

export default function BookAnimation() {
  const canvasRef = useRef(null);
  const images = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load images
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();

      img.src = `/BookFrames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

      images.current.push(img);
    }

    const drawImage = (index) => {
      const img = images.current[index];

      if (!img || !img.complete) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );

      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      context.drawImage(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale
      );
    };

    images.current[0].onload = () => drawImage(0);

    const playhead = {
      frame: 0,
    };

    gsap.to(playhead, {
      frame: FRAME_COUNT - 1,
      ease: "none",

      snap: "frame",

      scrollTrigger: {
        trigger: ".book-section",
        start: "top top",
        end: "+=5000",
        scrub: true,
        pin: true,
      },

      onUpdate: () => {
        drawImage(playhead.frame);
      },
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      drawImage(playhead.frame);
    };

    window.addEventListener("resize", resize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="book-page">
    

      <section className="book-section">
        <canvas ref={canvasRef} />
      </section>

     
      <style>
        {`
        body {
  margin: 0;
  overflow-x: hidden;
  background: #000;
}

.before,
.after {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 4rem;
  background: #111;
}

.book-section {
  height: 100vh;
  position: relative;
  background: black;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}
        `}
      </style>
    </div>
  );
}
```

===============================================================================
FILE: client/src/components/guestlayout/Cards.jsx
===============================================================================

```jsx
import { useEffect, useRef } from "react";

const cards = [
  {
    title: "QUALITY EDUCATION",
    kicker: "Learn with clarity",
    icon: "book",
    accent: "#d8a63f",
    accentRgb: "216 166 63",
    description:
      "Access structured chapter-wise notes, videos, quizzes and study materials prepared by experienced faculty.",
    tags: ["Chapter-wise", "Faculty prepared", "Exam ready"],
  },
  {
    title: "RURAL STUDENT FIRST",
    kicker: "Opportunity for everyone",
    icon: "sprout",
    accent: "#43ad68",
    accentRgb: "67 173 104",
    description:
      "Designed especially for Kannada medium and rural students who deserve equal access to quality education.",
    tags: ["Kannada friendly", "Rural focused", "Easy access"],
  },
  {
    title: "LEARN ANYTIME",
    kicker: "Your classroom, everywhere",
    icon: "device",
    accent: "#478fd7",
    accentRgb: "71 143 215",
    description:
      "Study from your phone, tablet or laptop whenever you have time without depending on physical classrooms.",
    tags: ["Mobile ready", "Self-paced", "Always available"],
  },
  {
    title: "TRACK YOUR PROGRESS",
    kicker: "Grow with every lesson",
    icon: "chart",
    accent: "#9666db",
    accentRgb: "150 102 219",
    description:
      "Monitor completed chapters, quizzes, attendance and learning progress throughout your academic journey.",
    tags: ["Live insights", "Quiz reports", "Clear milestones"],
  },
  {
    title: "NO STUDENT LEFT BEHIND",
    kicker: "One connected community",
    icon: "graduate",
    accent: "#e36f50",
    accentRgb: "227 111 80",
    description:
      "Ekalavya connects students, teachers and colleges on one platform to make education accessible for everyone.",
    tags: ["Connected campus", "Inclusive learning", "Equal opportunity"],
  },
];

const rotations = ["-0.2deg", "0.35deg", "-0.3deg", "0.28deg", "-0.18deg"];

function AnimatedIcon({ name }) {
  const iconProps = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "ekp-icon-svg",
    "aria-hidden": true,
  };

  if (name === "book") {
    return (
      <svg {...iconProps}>
        <path d="M8 12.5c9-3.4 17.2-1.6 24 4.6v37c-6.8-6.2-15-8-24-4.6v-37Z" />
        <path d="M56 12.5c-9-3.4-17.2-1.6-24 4.6v37c6.8-6.2 15-8 24-4.6v-37Z" />
        <path d="M14 21c4.6-.8 8.6.2 12 2.6" />
        <path d="M14 29c4.6-.8 8.6.2 12 2.6" />
        <path d="M50 21c-4.6-.8-8.6.2-12 2.6" />
        <path d="M50 29c-4.6-.8-8.6.2-12 2.6" />
      </svg>
    );
  }

  if (name === "sprout") {
    return (
      <svg {...iconProps}>
        <path d="M32 55V27" />
        <path d="M32 35C20 35 13 28 13 16c11.8-.2 19 6.8 19 19Z" />
        <path d="M32 42c0-11.5 7.2-18.5 19-18.5C51 35 44 42 32 42Z" />
        <path d="M19 53c7-4 19-4 26 0" />
        <path d="M20 23c4 1 8 4 12 9" />
        <path d="M44 30c-4 1.8-8 5-12 10" />
      </svg>
    );
  }

  if (name === "device") {
    return (
      <svg {...iconProps}>
        <rect x="7" y="11" width="50" height="36" rx="5" />
        <path d="M27 53h10" />
        <path d="M22 57h20" />
        <path d="M32 47v10" />
        <path d="m24 28 5 5 11-12" />
        <path d="M12 17h40" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg {...iconProps}>
        <path d="M9 10v44h47" />
        <path d="m15 45 10-11 9 5 14-18" />
        <circle cx="15" cy="45" r="2.5" />
        <circle cx="25" cy="34" r="2.5" />
        <circle cx="34" cy="39" r="2.5" />
        <circle cx="48" cy="21" r="2.5" />
        <path d="M42 21h6v6" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <path d="m5 24 27-13 27 13-27 14L5 24Z" />
      <path d="M16 31v12c8.5 7 23.5 7 32 0V31" />
      <path d="M58 25v18" />
      <circle cx="58" cy="47" r="2.5" />
      <path d="M24 52c5.5 1.8 10.5 1.8 16 0" />
    </svg>
  );
}

function Cards() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const cardElements = [...section.querySelectorAll(".ekp-card")];
    const wrappers = [...section.querySelectorAll(".ekp-sticky-wrapper")];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -7% 0px",
      },
    );

    cardElements.forEach((card) => observer.observe(card));

    let animationFrame = 0;

    const updateCardDepth = () => {
      animationFrame = 0;

      wrappers.forEach((wrapper, index) => {
        const surface = wrapper.querySelector(".ekp-card-surface");
        const nextWrapper = wrappers[index + 1];

        if (!surface) return;

        if (!nextWrapper) {
          surface.style.setProperty("--stack-scale", "1");
          surface.style.setProperty("--stack-brightness", "1");
          surface.style.setProperty("--stack-shift", "0px");
          return;
        }

        const nextTop = nextWrapper.getBoundingClientRect().top;
        const startPosition = window.innerHeight * 0.88;
        const endPosition = 170 + index * 18;
        const denominator = Math.max(startPosition - endPosition, 1);
        const progress = Math.min(
          1,
          Math.max(0, (startPosition - nextTop) / denominator),
        );

        surface.style.setProperty(
          "--stack-scale",
          String(1 - progress * 0.035),
        );
        surface.style.setProperty(
          "--stack-brightness",
          String(1 - progress * 0.13),
        );
        surface.style.setProperty("--stack-shift", `${progress * 8}px`);
      });
    };

    const requestDepthUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateCardDepth);
      }
    };

    updateCardDepth();

    window.addEventListener("scroll", requestDepthUpdate, { passive: true });
    window.addEventListener("resize", requestDepthUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestDepthUpdate);
      window.removeEventListener("resize", requestDepthUpdate);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateX = (0.5 - y) * 5;
    const rotateY = (x - 0.5) * 7;

    card.style.setProperty("--tilt-x", `${rotateX}deg`);
    card.style.setProperty("--tilt-y", `${rotateY}deg`);
    card.style.setProperty("--mouse-x", `${x * 100}%`);
    card.style.setProperty("--mouse-y", `${y * 100}%`);
    card.classList.add("is-tilting");
  };

  const resetPointerEffect = (event) => {
    const card = event.currentTarget;

    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "50%");
    card.classList.remove("is-tilting");
  };

  return (
    <section className="ekp-section" ref={sectionRef}>
      <div className="ekp-ambient" aria-hidden="true">
        <span className="ekp-orb ekp-orb-one" />
        <span className="ekp-orb ekp-orb-two" />
        <span className="ekp-grid" />
        <span className="ekp-noise" />
      </div>

      <div className="ekp-container">
        <header className="ekp-introduction">
          <div className="ekp-eyebrow">
            <span className="ekp-live-dot" />
            Why Ekalavya
            <span className="ekp-eyebrow-line" />
          </div>

          <h1>
            Education designed to
            <span> move with you.</span>
          </h1>

          <p>
            A connected digital learning experience built to make quality
            education accessible to every student.
          </p>
        </header>

        <div className="ekp-card-stack" role="list">
          {cards.map((card, index) => (
            <div
              className="ekp-sticky-wrapper"
              role="listitem"
              key={card.title}
              style={{
                "--index": index,
                "--accent": card.accent,
                "--accent-rgb": card.accentRgb,
                "--base-rotation": rotations[index],
              }}
            >
              <article
                className="ekp-card"
                aria-labelledby={`ekp-card-title-${index}`}
                onPointerMove={handlePointerMove}
                onPointerLeave={resetPointerEffect}
              >
                <div className="ekp-card-surface">
                  <div className="ekp-card-topbar">
                    <span className="ekp-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="ekp-heading-group">
                      <span className="ekp-kicker">{card.kicker}</span>
                      <h2 id={`ekp-card-title-${index}`}>{card.title}</h2>
                    </div>

                    <div className="ekp-feature-status">
                      <span />
                      Feature
                    </div>
                  </div>

                  <div className="ekp-card-body">
                    <span className="ekp-background-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="ekp-icon-column">
                      <div className="ekp-icon-stage">
                        <span className="ekp-icon-ring" />

                        {[0, 1, 2, 3].map((sparkIndex) => (
                          <span
                            className="ekp-icon-spark"
                            key={sparkIndex}
                            style={{ "--spark-index": sparkIndex }}
                          />
                        ))}

                        <div className="ekp-icon-core">
                          <AnimatedIcon name={card.icon} />
                        </div>
                      </div>

                      <span className="ekp-icon-caption">
                        Ekalavya Learning
                      </span>
                    </div>

                    <div className="ekp-content-column">
                      <span className="ekp-content-line" />

                      <p>{card.description}</p>

                      <div className="ekp-tags">
                        {card.tags.map((tag) => (
                          <span key={tag}>
                            <i />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="ekp-card-footer">
                        <div className="ekp-progress-track">
                          <span
                            style={{
                              width: `${((index + 1) / cards.length) * 100}%`,
                            }}
                          />
                        </div>

                        <span className="ekp-progress-label">
                          {index + 1} / {cards.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="ekp-ending">
          <span />
          <p>Learning without limits.</p>
          <span />
        </div>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap");

        .ekp-section,
        .ekp-section * {
          box-sizing: border-box;
        }

        .ekp-section {
          --ekp-bg: var(--bg-main, #f4f6f2);
          --ekp-surface: var(--bg-card, #ffffff);
          --ekp-surface-soft: var(--bg-input, #f7f8f5);
          --ekp-text: var(--text-main, #151915);
          --ekp-muted: var(--text-muted, #667069);
          --ekp-faint: var(--text-faint, #89938b);
          --ekp-border: var(--border, #dde2dc);
          --ekp-primary: var(--primary, #338a4a);
          --ekp-primary-soft: var(
            --primary-light,
            color-mix(in srgb, var(--ekp-primary) 12%, transparent)
          );

          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 100vh;
          padding: 130px 24px 300px;
          color: var(--ekp-text);
          background:
            radial-gradient(
              circle at 50% 0%,
              color-mix(in srgb, var(--ekp-primary) 11%, transparent) 0%,
              transparent 36%
            ),
            var(--ekp-bg);
          font-family: "Manrope", sans-serif;
          transition: color 0.35s ease, background-color 0.35s ease;
        }

        .ekp-ambient {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .ekp-grid {
          position: absolute;
          inset: 0;
          opacity: 0.28;
          background-image:
            linear-gradient(
              color-mix(in srgb, var(--ekp-border) 48%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              color-mix(in srgb, var(--ekp-border) 48%, transparent) 1px,
              transparent 1px
            );
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, #000, transparent 78%);
          animation: ekp-grid-move 20s linear infinite;
        }

        .ekp-noise {
          position: absolute;
          inset: 0;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E");
        }

        .ekp-orb {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          filter: blur(110px);
          background: var(--ekp-primary);
          opacity: 0.1;
        }

        .ekp-orb-one {
          top: 5%;
          left: 3%;
          animation: ekp-orb-one 16s ease-in-out infinite alternate;
        }

        .ekp-orb-two {
          top: 42%;
          right: 2%;
          opacity: 0.065;
          animation: ekp-orb-two 19s ease-in-out infinite alternate;
        }

        .ekp-container {
          width: min(1120px, 100%);
          margin: 0 auto;
        }

        .ekp-introduction {
          width: min(800px, 100%);
          margin: 0 auto 130px;
          text-align: center;
          animation: ekp-intro-reveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .ekp-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;
          color: var(--ekp-muted);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .ekp-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--ekp-primary);
          box-shadow: 0 0 0 0 color-mix(
            in srgb,
            var(--ekp-primary) 48%,
            transparent
          );
          animation: ekp-dot-pulse 2s infinite;
        }

        .ekp-eyebrow-line {
          width: 45px;
          height: 1px;
          background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--ekp-text) 28%, transparent),
            transparent
          );
        }

        .ekp-introduction h1 {
          margin: 0;
          color: var(--ekp-text);
          font-family: "DM Serif Display", Georgia, serif;
          font-size: clamp(48px, 7vw, 88px);
          font-weight: 400;
          line-height: 0.96;
          letter-spacing: -0.045em;
        }

        .ekp-introduction h1 span {
          display: block;
          color: var(--ekp-primary);
          font-style: italic;
        }

        .ekp-introduction p {
          max-width: 620px;
          margin: 30px auto 0;
          color: var(--ekp-muted);
          font-size: clamp(15px, 2vw, 18px);
          line-height: 1.8;
        }

        .ekp-card-stack {
          position: relative;
          width: 100%;
        }

        .ekp-sticky-wrapper {
          position: sticky;
          top: calc(88px + var(--index) * 18px);
          z-index: calc(10 + var(--index));
          display: flex;
          align-items: flex-start;
          justify-content: center;
          height: clamp(570px, 76vh, 720px);
        }

        .ekp-card {
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          --mouse-x: 50%;
          --mouse-y: 50%;

          width: min(920px, 100%);
          opacity: 0;
          transform:
            perspective(1300px)
            translate3d(0, 70px, 0)
            rotateX(var(--tilt-x))
            rotateY(var(--tilt-y))
            rotateZ(var(--base-rotation))
            scale(0.94);
          transform-style: preserve-3d;
          transition:
            opacity 0.8s ease,
            transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .ekp-card.is-visible {
          opacity: 1;
          transform:
            perspective(1300px)
            translate3d(0, 0, 0)
            rotateX(var(--tilt-x))
            rotateY(var(--tilt-y))
            rotateZ(var(--base-rotation))
            scale(1);
        }

        .ekp-card.is-tilting {
          transition: opacity 0.8s ease, transform 0.14s ease-out;
        }

        .ekp-card-surface {
          --stack-scale: 1;
          --stack-brightness: 1;
          --stack-shift: 0px;

          position: relative;
          overflow: hidden;
          border: 1px solid color-mix(
            in srgb,
            var(--accent) 13%,
            var(--ekp-border)
          );
          border-radius: 30px;
          background: var(--ekp-surface);
          box-shadow:
            0 45px 100px rgba(0, 0, 0, 0.16),
            0 12px 30px rgba(0, 0, 0, 0.08),
            0 1px 0 color-mix(in srgb, var(--ekp-text) 7%, transparent)
              inset;
          filter: brightness(var(--stack-brightness));
          transform:
            translateY(var(--stack-shift))
            scale(var(--stack-scale));
          transform-origin: top center;
          transition:
            transform 0.12s linear,
            filter 0.12s linear,
            background-color 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .ekp-card.is-tilting .ekp-card-surface {
          box-shadow:
            0 54px 120px rgba(0, 0, 0, 0.2),
            0 18px 40px rgba(var(--accent-rgb) / 0.13),
            0 0 0 1px rgba(var(--accent-rgb) / 0.1) inset;
        }

        .ekp-card-surface::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0;
          pointer-events: none;
          background: radial-gradient(
            440px circle at var(--mouse-x) var(--mouse-y),
            rgba(var(--accent-rgb) / 0.16),
            transparent 48%
          );
          transition: opacity 0.35s ease;
        }

        .ekp-card.is-tilting .ekp-card-surface::before {
          opacity: 1;
        }

        .ekp-card-surface::after {
          content: "";
          position: absolute;
          top: -150%;
          left: -45%;
          z-index: 3;
          width: 35%;
          height: 350%;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent,
            color-mix(in srgb, var(--ekp-text) 8%, transparent),
            transparent
          );
          transform: rotate(24deg);
          transition: left 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ekp-card:hover .ekp-card-surface::after {
          left: 125%;
        }

        .ekp-card-topbar,
        .ekp-card-body {
          position: relative;
          z-index: 2;
        }

        .ekp-card-topbar {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 24px;
          min-height: 118px;
          padding: 24px 32px;
          color: var(--ekp-text);
          background: linear-gradient(
            115deg,
            color-mix(in srgb, var(--ekp-surface) 94%, var(--accent) 6%),
            color-mix(in srgb, var(--ekp-surface) 76%, var(--accent) 24%)
          );
          border-bottom: 1px solid color-mix(
            in srgb,
            var(--accent) 16%,
            var(--ekp-border)
          );
          transition: color 0.35s ease, background 0.35s ease;
        }

        .ekp-card-topbar::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--accent),
            transparent
          );
        }

        .ekp-card-number {
          display: grid;
          width: 52px;
          height: 52px;
          place-items: center;
          border-radius: 16px;
          color: var(--ekp-surface);
          background: var(--ekp-text);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.12em;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          transition: color 0.35s ease, background-color 0.35s ease;
        }

        .ekp-heading-group {
          min-width: 0;
        }

        .ekp-kicker {
          display: block;
          margin-bottom: 6px;
          color: var(--ekp-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.19em;
          text-transform: uppercase;
        }

        .ekp-heading-group h2 {
          margin: 0;
          color: var(--ekp-text);
          font-family: "DM Serif Display", Georgia, serif;
          font-size: clamp(25px, 4vw, 38px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.025em;
        }

        .ekp-feature-status {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--ekp-muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .ekp-feature-status span {
          width: 9px;
          height: 9px;
          border: 2px solid var(--ekp-text);
          border-radius: 50%;
          background: var(--accent);
          animation: ekp-status-pulse 2.5s infinite;
        }

        .ekp-card-body {
          display: grid;
          grid-template-columns: 280px minmax(0, 1fr);
          gap: 58px;
          min-height: 390px;
          padding: 52px 58px 42px;
          background:
            linear-gradient(
              135deg,
              rgba(var(--accent-rgb) / 0.08),
              transparent 42%
            ),
            linear-gradient(
              145deg,
              color-mix(in srgb, var(--ekp-surface) 97%, var(--accent) 3%),
              var(--ekp-surface)
            );
          transition: background 0.35s ease;
        }

        .ekp-card-body::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.16;
          pointer-events: none;
          background-image: radial-gradient(
            circle at center,
            color-mix(in srgb, var(--ekp-text) 25%, transparent) 1px,
            transparent 1px
          );
          background-size: 24px 24px;
          mask-image: linear-gradient(90deg, #000, transparent 70%);
        }

        .ekp-background-number {
          position: absolute;
          right: 25px;
          bottom: -40px;
          color: color-mix(in srgb, var(--ekp-text) 4%, transparent);
          font-family: "DM Serif Display", Georgia, serif;
          font-size: 220px;
          line-height: 1;
          pointer-events: none;
        }

        .ekp-icon-column,
        .ekp-content-column {
          position: relative;
          z-index: 2;
        }

        .ekp-icon-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .ekp-icon-stage {
          position: relative;
          display: grid;
          width: 205px;
          height: 205px;
          place-items: center;
          border-radius: 50%;
        }

        .ekp-icon-stage::before {
          content: "";
          position: absolute;
          inset: 24px;
          border-radius: inherit;
          background: rgba(var(--accent-rgb) / 0.075);
          box-shadow:
            0 0 55px rgba(var(--accent-rgb) / 0.13),
            0 0 0 1px rgba(var(--accent-rgb) / 0.18) inset;
          animation: ekp-core-breathe 3.5s ease-in-out infinite;
        }

        .ekp-icon-ring {
          position: absolute;
          inset: 4px;
          border: 1px solid rgba(var(--accent-rgb) / 0.3);
          border-right-color: transparent;
          border-bottom-color: rgba(var(--accent-rgb) / 0.06);
          border-radius: 50%;
          animation: ekp-ring-spin 12s linear infinite;
        }

        .ekp-icon-ring::before {
          content: "";
          position: absolute;
          inset: 13px;
          border: 1px dashed color-mix(
            in srgb,
            var(--ekp-text) 13%,
            transparent
          );
          border-radius: inherit;
          animation: ekp-ring-spin-reverse 17s linear infinite;
        }

        .ekp-icon-spark {
          --start-angle: calc(var(--spark-index) * 90deg);

          position: absolute;
          top: calc(50% - 3px);
          left: calc(50% - 3px);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 12px var(--accent);
          animation: ekp-spark-orbit 8s linear infinite;
          animation-delay: calc(var(--spark-index) * -1.4s);
        }

        .ekp-icon-core {
          position: relative;
          z-index: 3;
          display: grid;
          width: 126px;
          height: 126px;
          place-items: center;
          border: 1px solid rgba(var(--accent-rgb) / 0.27);
          border-radius: 36px;
          color: var(--accent);
          background: linear-gradient(
            145deg,
            rgba(var(--accent-rgb) / 0.13),
            color-mix(in srgb, var(--ekp-surface) 94%, transparent)
          );
          box-shadow:
            0 25px 50px rgba(0, 0, 0, 0.13),
            0 0 35px rgba(var(--accent-rgb) / 0.09) inset;
          transform: rotate(-4deg);
          animation: ekp-icon-float 4.5s ease-in-out infinite;
          transition: background 0.35s ease;
        }

        .ekp-icon-svg {
          width: 72px;
          height: 72px;
          filter: drop-shadow(0 0 14px rgba(var(--accent-rgb) / 0.25));
        }

        .ekp-icon-svg path,
        .ekp-icon-svg rect,
        .ekp-icon-svg circle {
          stroke-dasharray: 170;
          stroke-dashoffset: 170;
        }

        .ekp-card.is-visible .ekp-icon-svg path,
        .ekp-card.is-visible .ekp-icon-svg rect,
        .ekp-card.is-visible .ekp-icon-svg circle {
          animation: ekp-line-draw 1.8s ease forwards;
          animation-delay: calc(0.25s + var(--index) * 0.08s);
        }

        .ekp-icon-caption {
          margin-top: 24px;
          color: var(--ekp-faint);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .ekp-content-column {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ekp-content-line {
          width: 54px;
          height: 3px;
          margin-bottom: 26px;
          border-radius: 20px;
          background: var(--accent);
          box-shadow: 0 0 20px rgba(var(--accent-rgb) / 0.35);
          transform: scaleX(0);
          transform-origin: left;
        }

        .ekp-card.is-visible .ekp-content-line {
          animation: ekp-line-grow 0.8s 0.35s ease forwards;
        }

        .ekp-content-column > p {
          max-width: 520px;
          margin: 0;
          color: var(--ekp-text);
          font-family: "DM Serif Display", Georgia, serif;
          font-size: clamp(21px, 2.5vw, 28px);
          line-height: 1.5;
          letter-spacing: -0.012em;
        }

        .ekp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 30px;
        }

        .ekp-tags span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 13px;
          border: 1px solid var(--ekp-border);
          border-radius: 100px;
          color: var(--ekp-muted);
          background: color-mix(
            in srgb,
            var(--ekp-surface-soft) 90%,
            transparent
          );
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          transition:
            color 0.25s ease,
            border-color 0.25s ease,
            background-color 0.25s ease,
            transform 0.25s ease;
        }

        .ekp-tags span:hover {
          color: var(--ekp-text);
          border-color: rgba(var(--accent-rgb) / 0.4);
          background: rgba(var(--accent-rgb) / 0.1);
          transform: translateY(-3px);
        }

        .ekp-tags i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
        }

        .ekp-card-footer {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 36px;
        }

        .ekp-progress-track {
          position: relative;
          flex: 1;
          height: 2px;
          overflow: hidden;
          border-radius: 20px;
          background: color-mix(
            in srgb,
            var(--ekp-text) 10%,
            transparent
          );
        }

        .ekp-progress-track span {
          position: absolute;
          inset: 0 auto 0 0;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            var(--accent),
            rgba(var(--accent-rgb) / 0.28)
          );
          box-shadow: 0 0 13px rgba(var(--accent-rgb) / 0.4);
          transform: scaleX(0);
          transform-origin: left;
        }

        .ekp-card.is-visible .ekp-progress-track span {
          animation: ekp-line-grow 1s 0.55s ease forwards;
        }

        .ekp-progress-label {
          color: var(--ekp-faint);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .ekp-ending {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 22px;
          margin-top: 60px;
          color: var(--ekp-faint);
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .ekp-ending p {
          margin: 0;
          font-size: 10px;
          font-weight: 800;
        }

        .ekp-ending span {
          width: 50px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--ekp-border)
          );
        }

        .ekp-ending span:last-child {
          transform: rotate(180deg);
        }

        @keyframes ekp-intro-reveal {
          from {
            opacity: 0;
            transform: translateY(35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ekp-line-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes ekp-line-grow {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes ekp-icon-float {
          0%,
          100% {
            transform: translateY(0) rotate(-4deg);
          }
          50% {
            transform: translateY(-9px) rotate(2deg);
          }
        }

        @keyframes ekp-core-breathe {
          0%,
          100% {
            opacity: 0.65;
            transform: scale(0.96);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes ekp-ring-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ekp-ring-spin-reverse {
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes ekp-spark-orbit {
          from {
            transform: rotate(var(--start-angle)) translateX(99px);
          }
          to {
            transform: rotate(calc(var(--start-angle) + 360deg))
              translateX(99px);
          }
        }

        @keyframes ekp-dot-pulse {
          70% {
            box-shadow: 0 0 0 9px transparent;
          }
          100% {
            box-shadow: 0 0 0 0 transparent;
          }
        }

        @keyframes ekp-status-pulse {
          50% {
            box-shadow: 0 0 0 5px rgba(var(--accent-rgb) / 0.12);
          }
        }

        @keyframes ekp-grid-move {
          to {
            background-position: 72px 72px;
          }
        }

        @keyframes ekp-orb-one {
          to {
            transform: translate(140px, 180px) scale(1.2);
          }
        }

        @keyframes ekp-orb-two {
          to {
            transform: translate(-150px, 100px) scale(0.8);
          }
        }

        @media (max-width: 760px) {
          .ekp-section {
            padding: 100px 15px 220px;
          }

          .ekp-introduction {
            margin-bottom: 90px;
          }

          .ekp-introduction h1 {
            font-size: clamp(43px, 14vw, 66px);
          }

          .ekp-sticky-wrapper {
            top: calc(62px + var(--index) * 11px);
            height: 690px;
          }

          .ekp-card {
            --base-rotation: 0deg !important;
          }

          .ekp-card-topbar {
            grid-template-columns: auto minmax(0, 1fr) auto;
            gap: 14px;
            min-height: 96px;
            padding: 19px;
          }

          .ekp-card-number {
            width: 43px;
            height: 43px;
            border-radius: 13px;
            font-size: 11px;
          }

          .ekp-heading-group h2 {
            font-size: clamp(20px, 5.8vw, 27px);
          }

          .ekp-kicker {
            font-size: 8px;
          }

          .ekp-feature-status {
            font-size: 0;
          }

          .ekp-card-body {
            grid-template-columns: 1fr;
            gap: 23px;
            min-height: 505px;
            padding: 29px 24px 27px;
          }

          .ekp-icon-stage {
            width: 145px;
            height: 145px;
          }

          .ekp-icon-core {
            width: 92px;
            height: 92px;
            border-radius: 28px;
          }

          .ekp-icon-svg {
            width: 54px;
            height: 54px;
          }

          .ekp-icon-spark {
            animation-name: ekp-spark-orbit-mobile;
          }

          .ekp-icon-caption {
            margin-top: 14px;
          }

          .ekp-content-column {
            justify-content: flex-start;
          }

          .ekp-content-line {
            margin-bottom: 18px;
          }

          .ekp-content-column > p {
            font-size: 20px;
            line-height: 1.45;
            text-align: center;
          }

          .ekp-tags {
            justify-content: center;
            margin-top: 21px;
          }

          .ekp-card-footer {
            margin-top: 25px;
          }

          .ekp-background-number {
            right: 5px;
            bottom: -15px;
            font-size: 140px;
          }

          @keyframes ekp-spark-orbit-mobile {
            from {
              transform: rotate(var(--start-angle)) translateX(69px);
            }
            to {
              transform: rotate(calc(var(--start-angle) + 360deg))
                translateX(69px);
            }
          }
        }

        @media (max-width: 420px) {
          .ekp-section {
            padding-right: 10px;
            padding-left: 10px;
          }

          .ekp-sticky-wrapper {
            height: 720px;
          }

          .ekp-card-surface {
            border-radius: 22px;
          }

          .ekp-card-topbar {
            padding: 16px 14px;
          }

          .ekp-heading-group h2 {
            font-size: 19px;
          }

          .ekp-content-column > p {
            font-size: 18px;
          }

          .ekp-tags span {
            padding: 8px 10px;
            font-size: 9px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ekp-section *,
          .ekp-section *::before,
          .ekp-section *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .ekp-card {
            opacity: 1;
            transform: none;
          }

          .ekp-card-surface {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Cards;
```

===============================================================================
FILE: client/src/components/guestlayout/Contact.jsx
===============================================================================

```jsx
import { useState } from "react";
import API from "../../axiosConfig";

const contactMethods = [
  {
    type: "email",
    label: "Email",
    value: "contact@ekalavya.com",
    hint: "Write to our team anytime",
    href: "mailto:contact@ekalavya.com",
  },
  {
    type: "phone",
    label: "Phone",
    value: "+91 8549076433",
    hint: "Talk directly with our team",
    href: "tel:+918549076433",
  },
  {
    type: "location",
    label: "Location",
    value: "Bengaluru, Karnataka",
    hint: "Building for students across India",
    href: "https://www.google.com/maps/search/?api=1&query=Bengaluru%2C+Karnataka",
    external: true,
  },
  {
    type: "clock",
    label: "Working hours",
    value: "Mon–Fri, 9:00 AM–6:00 PM",
    hint: "Indian Standard Time",
  },
];

function ContactIcon({ type }) {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (type === "email") {
    return (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg {...iconProps}>
        <path d="M21 16.4v2.7a1.8 1.8 0 0 1-2 1.8 17.8 17.8 0 0 1-7.8-2.8 17.5 17.5 0 0 1-5.4-5.4A17.8 17.8 0 0 1 3 4.9a1.8 1.8 0 0 1 1.8-2h2.7a1.8 1.8 0 0 1 1.8 1.5c.1 1 .4 2 .7 2.9a1.8 1.8 0 0 1-.4 1.9L8.5 10.3a14.5 14.5 0 0 0 5.2 5.2l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.9.3 1.9.6 2.9.7a1.8 1.8 0 0 1 1.4 1.7Z" />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg {...iconProps}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email and message are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await API.post("/contact", form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "We could not send your message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-background" aria-hidden="true">
        <span className="contact-orb contact-orb-one" />
        <span className="contact-orb contact-orb-two" />
        <span className="contact-grid" />
        <span className="contact-noise" />
      </div>

      <main className="contact-main">
        <section className="contact-hero" aria-labelledby="contact-title">
          <div className="contact-badge">
            <span className="contact-badge-dot" />
            Get in touch
          </div>

          <h1 id="contact-title">
            Let&apos;s build something
            <span>great together.</span>
          </h1>

          <p>
            Have an idea, a question or a project in mind? Tell us what you are
            thinking, and our team will help you take the next step.
          </p>

          <div className="contact-availability">
            <span className="contact-availability-icon">
              <span />
            </span>
            <div>
              <strong>We are available</strong>
              <small>Currently accepting new conversations</small>
            </div>
          </div>
        </section>

        <section className="contact-content" aria-label="Contact Ekalavya">
          <div className="contact-layout">
            <aside className="contact-information">
              <div className="contact-section-heading">
                <span>01 / Contact details</span>
                <h2>Start wherever feels easiest.</h2>
                <p>
                  Send a message through the form or reach us directly using any
                  of the options below.
                </p>
              </div>

              <div className="contact-methods">
                {contactMethods.map((item, index) => {
                  const MethodElement = item.href ? "a" : "div";

                  return (
                    <MethodElement
                      className="contact-method"
                      key={item.label}
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      style={{ "--method-delay": `${index * 85}ms` }}
                    >
                      <span className="contact-method-icon">
                        <ContactIcon type={item.type} />
                      </span>

                      <span className="contact-method-copy">
                        <small>{item.label}</small>
                        <strong>{item.value}</strong>
                        <em>{item.hint}</em>
                      </span>

                      {item.href && (
                        <span className="contact-method-arrow">
                          <ArrowIcon />
                        </span>
                      )}
                    </MethodElement>
                  );
                })}
              </div>

              <div className="contact-response-card">
                <div className="contact-response-mark">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 9.6 9.6 0 0 1-3.8-.8L3 21l1.7-5A8.5 8.5 0 1 1 21 11.5Z" />
                    <path d="M8 12h.01M12 12h.01M16 12h.01" />
                  </svg>
                </div>

                <div>
                  <span>Average response time</span>
                  <strong>Within 24 hours</strong>
                </div>

                <span className="contact-response-signal">
                  <i />
                  Online
                </span>
              </div>
            </aside>

            <div className="contact-form-card">
              <span className="contact-form-accent" aria-hidden="true" />

              {success ? (
                <div
                  className="contact-success"
                  role="status"
                  aria-live="polite"
                >
                  <div className="contact-success-rings" aria-hidden="true">
                    <span />
                    <span />

                    <div className="contact-success-check">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m5 12 4.2 4.2L19 6.5" />
                      </svg>
                    </div>
                  </div>

                  <span className="contact-success-label">
                    Message delivered
                  </span>
                  <h2>Thank you for reaching out.</h2>
                  <p>
                    Your message has reached the Ekalavya team. We will get back
                    to you within 24 hours.
                  </p>

                  <button
                    type="button"
                    className="contact-secondary-button"
                    onClick={() => setSuccess(false)}
                  >
                    Send another message
                    <ArrowIcon />
                  </button>
                </div>
              ) : (
                <>
                  <div className="contact-form-heading">
                    <div>
                      <span>02 / Send a message</span>
                      <h2>Tell us about your idea.</h2>
                    </div>

                    <div className="contact-secure-label">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="5" y="10" width="14" height="11" rx="3" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                      </svg>
                      Secure form
                    </div>
                  </div>

                  {error && (
                    <div className="contact-error" role="alert">
                      <span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v6M12 17h.01" />
                        </svg>
                      </span>
                      <p>{error}</p>
                    </div>
                  )}

                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-field-row">
                      <div className="contact-field">
                        <label htmlFor="contact-name">
                          Full name <span>*</span>
                        </label>
                        <div className="contact-input-shell">
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={handleChange}
                            maxLength={80}
                            required
                          />
                          <span className="contact-field-status" />
                        </div>
                      </div>

                      <div className="contact-field">
                        <label htmlFor="contact-email">
                          Email address <span>*</span>
                        </label>
                        <div className="contact-input-shell">
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            maxLength={120}
                            required
                          />
                          <span className="contact-field-status" />
                        </div>
                      </div>
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-subject">
                        Subject <small>Optional</small>
                      </label>
                      <div className="contact-input-shell">
                        <input
                          id="contact-subject"
                          name="subject"
                          type="text"
                          placeholder="How can we help?"
                          value={form.subject}
                          onChange={handleChange}
                          maxLength={140}
                        />
                        <span className="contact-field-status" />
                      </div>
                    </div>

                    <div className="contact-field">
                      <div className="contact-label-row">
                        <label htmlFor="contact-message">
                          Message <span>*</span>
                        </label>
                        <small>{form.message.length} / 1200</small>
                      </div>

                      <div className="contact-input-shell contact-textarea-shell">
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={6}
                          placeholder="Tell us a little about your project, question or idea..."
                          value={form.message}
                          onChange={handleChange}
                          maxLength={1200}
                          required
                        />
                        <span className="contact-field-status" />
                      </div>
                    </div>

                    <div className="contact-submit-row">
                      <p>
                        By sending this form, you agree that we may contact you
                        about your enquiry.
                      </p>

                      <button
                        type="submit"
                        className="contact-submit-button"
                        disabled={loading}
                      >
                        <span className="contact-button-content">
                          {loading ? (
                            <>
                              <i
                                className="contact-spinner"
                                aria-hidden="true"
                              />
                              Sending message
                            </>
                          ) : (
                            <>
                              Send message
                              <ArrowIcon />
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap");

        .contact-page,
        .contact-page * {
          box-sizing: border-box;
        }

        .contact-page {
          --contact-bg: var(--bg-main, #f4f6f2);
          --contact-card: var(--bg-card, #ffffff);
          --contact-input: var(--bg-input, #f7f8f5);
          --contact-text: var(--text-main, #151915);
          --contact-muted: var(--text-muted, #657067);
          --contact-faint: var(--text-faint, #8b958d);
          --contact-border: var(--border, #dde2dc);
          --contact-primary: var(--primary, #338a4a);
          --contact-primary-hover: var(--primary-hover, #26723b);
          --contact-primary-soft: var(
            --primary-light,
            color-mix(in srgb, var(--contact-primary) 12%, transparent)
          );
          --contact-surface-soft: color-mix(
            in srgb,
            var(--contact-card) 92%,
            var(--contact-primary) 8%
          );

          position: relative;
          isolation: isolate;
          min-height: 100vh;
          overflow: hidden;
          color: var(--contact-text);
          background: var(--contact-bg);
          font-family: "Manrope", sans-serif;
          transition: color 0.35s ease, background-color 0.35s ease;
        }

        .contact-background {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .contact-grid {
          position: absolute;
          inset: 0;
          opacity: 0.33;
          background-image:
            linear-gradient(
              color-mix(in srgb, var(--contact-border) 48%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              color-mix(in srgb, var(--contact-border) 48%, transparent) 1px,
              transparent 1px
            );
          background-size: 64px 64px;
          mask-image: linear-gradient(to bottom, #000 0%, transparent 62%);
        }

        .contact-noise {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E");
        }

        .contact-orb {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          opacity: 0.11;
          filter: blur(110px);
          background: var(--contact-primary);
        }

        .contact-orb-one {
          top: -230px;
          left: -150px;
          animation: contact-orb-one 14s ease-in-out infinite alternate;
        }

        .contact-orb-two {
          top: 220px;
          right: -270px;
          opacity: 0.08;
          animation: contact-orb-two 18s ease-in-out infinite alternate;
        }

        .contact-main {
          position: relative;
          width: 100%;
        }

        .contact-hero {
          width: min(920px, calc(100% - 48px));
          margin: 0 auto;
          padding: 150px 0 92px;
          text-align: center;
        }

        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 15px;
          border: 1px solid color-mix(
            in srgb,
            var(--contact-primary) 35%,
            var(--contact-border)
          );
          border-radius: 999px;
          color: var(--contact-primary);
          background: color-mix(
            in srgb,
            var(--contact-primary) 8%,
            var(--contact-card)
          );
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.04);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          animation: contact-reveal 0.65s ease both;
        }

        .contact-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--contact-primary);
          box-shadow: 0 0 0 0 color-mix(
            in srgb,
            var(--contact-primary) 48%,
            transparent
          );
          animation: contact-pulse 2s infinite;
        }

        .contact-hero h1 {
          max-width: 880px;
          margin: 28px auto 0;
          color: var(--contact-text);
          font-family: "DM Serif Display", Georgia, serif;
          font-size: clamp(3.25rem, 7.3vw, 6.5rem);
          font-weight: 400;
          line-height: 0.92;
          letter-spacing: -0.055em;
          animation: contact-reveal 0.8s 0.08s ease both;
        }

        .contact-hero h1 span {
          display: block;
          color: var(--contact-primary);
          font-style: italic;
        }

        .contact-hero > p {
          max-width: 650px;
          margin: 30px auto 0;
          color: var(--contact-muted);
          font-size: clamp(15px, 1.8vw, 18px);
          line-height: 1.85;
          animation: contact-reveal 0.8s 0.16s ease both;
        }

        .contact-availability {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 30px;
          padding: 10px 15px 10px 10px;
          border: 1px solid var(--contact-border);
          border-radius: 15px;
          color: var(--contact-text);
          background: color-mix(
            in srgb,
            var(--contact-card) 84%,
            transparent
          );
          box-shadow: 0 14px 38px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(16px);
          text-align: left;
          animation: contact-reveal 0.8s 0.24s ease both;
        }

        .contact-availability-icon {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border-radius: 11px;
          background: var(--contact-primary-soft);
        }

        .contact-availability-icon > span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--contact-primary);
          box-shadow: 0 0 15px var(--contact-primary);
        }

        .contact-availability strong,
        .contact-availability small {
          display: block;
        }

        .contact-availability strong {
          margin-bottom: 2px;
          font-size: 12px;
          font-weight: 800;
        }

        .contact-availability small {
          color: var(--contact-faint);
          font-size: 10px;
        }

        .contact-content {
          position: relative;
          padding: 20px 24px 120px;
        }

        .contact-layout {
          display: grid;
          grid-template-columns: minmax(300px, 0.78fr) minmax(470px, 1.22fr);
          gap: clamp(38px, 6vw, 84px);
          width: min(1160px, 100%);
          margin: 0 auto;
          align-items: start;
        }

        .contact-information {
          padding-top: 26px;
        }

        .contact-section-heading > span,
        .contact-form-heading > div > span {
          display: block;
          margin-bottom: 14px;
          color: var(--contact-primary);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .contact-section-heading h2,
        .contact-form-heading h2,
        .contact-success h2 {
          margin: 0;
          color: var(--contact-text);
          font-family: "DM Serif Display", Georgia, serif;
          font-size: clamp(2rem, 3.8vw, 2.85rem);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.03em;
        }

        .contact-section-heading > p {
          margin: 19px 0 0;
          color: var(--contact-muted);
          font-size: 14px;
          line-height: 1.75;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 35px;
        }

        .contact-method {
          position: relative;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 15px;
          width: 100%;
          padding: 14px;
          overflow: hidden;
          border: 1px solid transparent;
          border-radius: 17px;
          color: inherit;
          background: transparent;
          text-decoration: none;
          animation: contact-method-reveal 0.65s both;
          animation-delay: var(--method-delay);
          transition:
            transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.3s ease,
            background-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        a.contact-method {
          cursor: pointer;
        }

        .contact-method::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            color-mix(in srgb, var(--contact-primary) 10%, transparent),
            transparent 62%
          );
          transition: opacity 0.3s ease;
        }

        a.contact-method:hover {
          border-color: color-mix(
            in srgb,
            var(--contact-primary) 26%,
            var(--contact-border)
          );
          background: color-mix(
            in srgb,
            var(--contact-card) 84%,
            transparent
          );
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.06);
          transform: translateX(7px);
        }

        a.contact-method:hover::before {
          opacity: 1;
        }

        .contact-method-icon,
        .contact-method-copy,
        .contact-method-arrow {
          position: relative;
          z-index: 1;
        }

        .contact-method-icon {
          display: grid;
          width: 52px;
          height: 52px;
          place-items: center;
          border: 1px solid color-mix(
            in srgb,
            var(--contact-primary) 20%,
            var(--contact-border)
          );
          border-radius: 16px;
          color: var(--contact-primary);
          background: color-mix(
            in srgb,
            var(--contact-primary) 8%,
            var(--contact-card)
          );
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        a.contact-method:hover .contact-method-icon {
          color: var(--contact-card);
          background: var(--contact-primary);
          transform: rotate(-5deg) scale(1.04);
        }

        .contact-method-icon svg {
          width: 21px;
          height: 21px;
        }

        .contact-method-copy {
          min-width: 0;
        }

        .contact-method-copy small,
        .contact-method-copy strong,
        .contact-method-copy em {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .contact-method-copy small {
          margin-bottom: 3px;
          color: var(--contact-faint);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .contact-method-copy strong {
          color: var(--contact-text);
          font-size: 13px;
          font-weight: 700;
        }

        .contact-method-copy em {
          margin-top: 3px;
          color: var(--contact-faint);
          font-size: 10px;
          font-style: normal;
        }

        .contact-method-arrow {
          display: grid;
          width: 31px;
          height: 31px;
          place-items: center;
          border-radius: 50%;
          color: var(--contact-faint);
          transition: color 0.25s ease, transform 0.25s ease;
        }

        .contact-method-arrow svg {
          width: 16px;
          height: 16px;
        }

        a.contact-method:hover .contact-method-arrow {
          color: var(--contact-primary);
          transform: translateX(3px);
        }

        .contact-response-card {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 13px;
          margin-top: 28px;
          padding: 18px;
          overflow: hidden;
          border: 1px solid var(--contact-border);
          border-radius: 20px;
          background:
            linear-gradient(
              115deg,
              color-mix(in srgb, var(--contact-primary) 9%, transparent),
              transparent 60%
            ),
            color-mix(in srgb, var(--contact-card) 88%, transparent);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.055);
          backdrop-filter: blur(16px);
        }

        .contact-response-card::after {
          content: "";
          position: absolute;
          top: -30px;
          right: -30px;
          width: 100px;
          height: 100px;
          border: 1px solid color-mix(
            in srgb,
            var(--contact-primary) 25%,
            transparent
          );
          border-radius: 50%;
        }

        .contact-response-mark {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 13px;
          color: var(--contact-primary);
          background: var(--contact-primary-soft);
        }

        .contact-response-mark svg {
          width: 20px;
          height: 20px;
        }

        .contact-response-card > div:nth-child(2) span,
        .contact-response-card > div:nth-child(2) strong {
          display: block;
        }

        .contact-response-card > div:nth-child(2) span {
          margin-bottom: 3px;
          color: var(--contact-faint);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .contact-response-card > div:nth-child(2) strong {
          color: var(--contact-text);
          font-size: 13px;
        }

        .contact-response-signal {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--contact-primary);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .contact-response-signal i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--contact-primary);
          box-shadow: 0 0 10px var(--contact-primary);
        }

        .contact-form-card {
          position: relative;
          min-height: 650px;
          padding: clamp(28px, 4.5vw, 50px);
          overflow: hidden;
          border: 1px solid color-mix(
            in srgb,
            var(--contact-primary) 12%,
            var(--contact-border)
          );
          border-radius: 30px;
          background:
            radial-gradient(
              circle at 100% 0%,
              color-mix(in srgb, var(--contact-primary) 11%, transparent),
              transparent 30%
            ),
            color-mix(in srgb, var(--contact-card) 94%, transparent);
          box-shadow:
            0 40px 100px rgba(0, 0, 0, 0.11),
            0 1px 0 color-mix(in srgb, var(--contact-text) 8%, transparent)
              inset;
          backdrop-filter: blur(24px);
          animation: contact-form-reveal 0.9s 0.12s
            cubic-bezier(0.16, 1, 0.3, 1) both;
          transition:
            border-color 0.35s ease,
            background-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .contact-form-card:hover {
          border-color: color-mix(
            in srgb,
            var(--contact-primary) 28%,
            var(--contact-border)
          );
          box-shadow:
            0 48px 120px rgba(0, 0, 0, 0.14),
            0 1px 0 color-mix(in srgb, var(--contact-text) 8%, transparent)
              inset;
        }

        .contact-form-accent {
          position: absolute;
          top: 0;
          left: 50%;
          width: 42%;
          height: 3px;
          border-radius: 0 0 10px 10px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--contact-primary),
            transparent
          );
          box-shadow: 0 0 22px var(--contact-primary);
          transform: translateX(-50%);
        }

        .contact-form-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 35px;
        }

        .contact-form-heading h2 {
          font-size: clamp(2rem, 4vw, 2.6rem);
        }

        .contact-secure-label {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 7px;
          padding: 8px 10px;
          border: 1px solid var(--contact-border);
          border-radius: 999px;
          color: var(--contact-faint);
          background: color-mix(
            in srgb,
            var(--contact-card) 75%,
            transparent
          );
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .contact-secure-label svg {
          width: 13px;
          height: 13px;
          color: var(--contact-primary);
        }

        .contact-error {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          margin-bottom: 22px;
          padding: 13px 15px;
          border: 1px solid rgba(239, 68, 68, 0.28);
          border-radius: 13px;
          color: #dc3f3f;
          background: rgba(239, 68, 68, 0.08);
          animation: contact-shake 0.4s ease;
        }

        .contact-error > span {
          display: grid;
          flex: 0 0 auto;
          width: 20px;
          height: 20px;
          place-items: center;
        }

        .contact-error svg {
          width: 17px;
          height: 17px;
        }

        .contact-error p {
          margin: 1px 0 0;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.55;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .contact-field-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .contact-field {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 9px;
        }

        .contact-field label,
        .contact-label-row > small {
          color: var(--contact-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.055em;
          text-transform: uppercase;
          transition: color 0.25s ease;
        }

        .contact-field label span {
          color: var(--contact-primary);
        }

        .contact-field label small {
          margin-left: 7px;
          color: var(--contact-faint);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.08em;
        }

        .contact-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .contact-label-row > small {
          color: var(--contact-faint);
          font-size: 8px;
        }

        .contact-input-shell {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--contact-border);
          border-radius: 13px;
          background: color-mix(
            in srgb,
            var(--contact-input) 92%,
            transparent
          );
          transition:
            border-color 0.25s ease,
            background-color 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.25s ease;
        }

        .contact-input-shell:focus-within {
          border-color: var(--contact-primary);
          background: var(--contact-card);
          box-shadow:
            0 0 0 4px color-mix(
              in srgb,
              var(--contact-primary) 11%,
              transparent
            ),
            0 14px 30px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }

        .contact-field:focus-within label {
          color: var(--contact-primary);
        }

        .contact-input-shell input,
        .contact-input-shell textarea {
          display: block;
          width: 100%;
          border: 0;
          outline: 0;
          color: var(--contact-text);
          background: transparent;
          font: inherit;
          font-size: 13px;
          line-height: 1.55;
          caret-color: var(--contact-primary);
        }

        .contact-input-shell input {
          height: 50px;
          padding: 0 17px;
        }

        .contact-input-shell textarea {
          min-height: 142px;
          padding: 15px 17px;
          resize: vertical;
        }

        .contact-input-shell input::placeholder,
        .contact-input-shell textarea::placeholder {
          color: var(--contact-faint);
          opacity: 0.7;
        }

        .contact-input-shell input:-webkit-autofill,
        .contact-input-shell input:-webkit-autofill:hover,
        .contact-input-shell input:-webkit-autofill:focus {
          -webkit-text-fill-color: var(--contact-text);
          box-shadow: 0 0 0 1000px var(--contact-input) inset;
          transition: background-color 9999s ease-in-out 0s;
        }

        .contact-field-status {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--contact-primary),
            transparent
          );
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.35s ease;
        }

        .contact-input-shell:focus-within .contact-field-status {
          transform: scaleX(1);
        }

        .contact-submit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: 4px;
        }

        .contact-submit-row > p {
          max-width: 250px;
          margin: 0;
          color: var(--contact-faint);
          font-size: 9px;
          line-height: 1.55;
        }

        .contact-submit-button,
        .contact-secondary-button {
          position: relative;
          flex: 0 0 auto;
          overflow: hidden;
          border: 0;
          border-radius: 13px;
          cursor: pointer;
          font-family: inherit;
          font-weight: 800;
        }

        .contact-submit-button {
          min-width: 175px;
          min-height: 51px;
          padding: 0 21px;
          color: var(--on-primary, #ffffff);
          background: var(--contact-primary);
          box-shadow:
            0 14px 28px color-mix(
              in srgb,
              var(--contact-primary) 28%,
              transparent
            ),
            0 1px 0 rgba(255, 255, 255, 0.24) inset;
          transition:
            background-color 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease,
            opacity 0.25s ease;
        }

        .contact-submit-button::before {
          content: "";
          position: absolute;
          top: -100%;
          left: -40%;
          width: 28%;
          height: 300%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.24),
            transparent
          );
          transform: rotate(22deg);
          transition: left 0.65s ease;
        }

        .contact-submit-button:hover:not(:disabled) {
          background: var(--contact-primary-hover);
          box-shadow:
            0 19px 36px color-mix(
              in srgb,
              var(--contact-primary) 35%,
              transparent
            ),
            0 1px 0 rgba(255, 255, 255, 0.24) inset;
          transform: translateY(-3px);
        }

        .contact-submit-button:hover:not(:disabled)::before {
          left: 125%;
        }

        .contact-submit-button:active:not(:disabled) {
          transform: translateY(-1px) scale(0.99);
        }

        .contact-submit-button:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        .contact-button-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          font-size: 11px;
          letter-spacing: 0.015em;
        }

        .contact-button-content svg,
        .contact-secondary-button svg {
          width: 17px;
          height: 17px;
          transition: transform 0.25s ease;
        }

        .contact-submit-button:hover .contact-button-content svg,
        .contact-secondary-button:hover svg {
          transform: translateX(4px);
        }

        .contact-spinner {
          width: 15px;
          height: 15px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: contact-spin 0.7s linear infinite;
        }

        .contact-success {
          display: flex;
          min-height: 550px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          text-align: center;
          animation: contact-success-reveal 0.65s ease both;
        }

        .contact-success-rings {
          position: relative;
          display: grid;
          width: 142px;
          height: 142px;
          margin-bottom: 32px;
          place-items: center;
        }

        .contact-success-rings > span {
          position: absolute;
          border: 1px solid color-mix(
            in srgb,
            var(--contact-primary) 28%,
            transparent
          );
          border-radius: 50%;
          animation: contact-success-ring 2.6s ease-out infinite;
        }

        .contact-success-rings > span:first-child {
          inset: 0;
        }

        .contact-success-rings > span:nth-child(2) {
          inset: 16px;
          animation-delay: 0.45s;
        }

        .contact-success-check {
          position: relative;
          z-index: 2;
          display: grid;
          width: 82px;
          height: 82px;
          place-items: center;
          border-radius: 26px;
          color: var(--on-primary, #ffffff);
          background: var(--contact-primary);
          box-shadow: 0 22px 45px color-mix(
            in srgb,
            var(--contact-primary) 30%,
            transparent
          );
          transform: rotate(-6deg);
        }

        .contact-success-check svg {
          width: 38px;
          height: 38px;
        }

        .contact-success-label {
          margin-bottom: 13px;
          color: var(--contact-primary);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .contact-success h2 {
          max-width: 470px;
          font-size: clamp(2.2rem, 5vw, 3.15rem);
        }

        .contact-success p {
          max-width: 450px;
          margin: 20px 0 28px;
          color: var(--contact-muted);
          font-size: 13px;
          line-height: 1.75;
        }

        .contact-secondary-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 46px;
          padding: 0 18px;
          border: 1px solid var(--contact-border);
          color: var(--contact-text);
          background: var(--contact-input);
          font-size: 10px;
          transition:
            color 0.25s ease,
            border-color 0.25s ease,
            background-color 0.25s ease,
            transform 0.25s ease;
        }

        .contact-secondary-button:hover {
          border-color: var(--contact-primary);
          color: var(--contact-primary);
          background: var(--contact-primary-soft);
          transform: translateY(-2px);
        }

        @keyframes contact-reveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes contact-form-reveal {
          from {
            opacity: 0;
            transform: translateY(45px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes contact-method-reveal {
          from {
            opacity: 0;
            transform: translateX(-18px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes contact-pulse {
          70% {
            box-shadow: 0 0 0 9px transparent;
          }
          100% {
            box-shadow: 0 0 0 0 transparent;
          }
        }

        @keyframes contact-orb-one {
          to {
            transform: translate(160px, 130px) scale(1.15);
          }
        }

        @keyframes contact-orb-two {
          to {
            transform: translate(-150px, 160px) scale(0.85);
          }
        }

        @keyframes contact-shake {
          0%,
          100% {
            transform: translateX(0);
          }
          35% {
            transform: translateX(-5px);
          }
          70% {
            transform: translateX(5px);
          }
        }

        @keyframes contact-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes contact-success-reveal {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes contact-success-ring {
          0% {
            opacity: 0.8;
            transform: scale(0.72);
          }
          100% {
            opacity: 0;
            transform: scale(1.28);
          }
        }

        @media (max-width: 930px) {
          .contact-layout {
            grid-template-columns: 1fr;
            width: min(690px, 100%);
          }

          .contact-information {
            padding-top: 0;
          }

          .contact-methods {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .contact-response-card {
            margin-bottom: 8px;
          }
        }

        @media (max-width: 640px) {
          .contact-hero {
            width: min(100% - 30px, 580px);
            padding: 124px 0 70px;
          }

          .contact-hero h1 {
            margin-top: 23px;
            font-size: clamp(3rem, 15vw, 4.7rem);
          }

          .contact-hero > p {
            margin-top: 24px;
            font-size: 14px;
            line-height: 1.72;
          }

          .contact-content {
            padding: 10px 14px 90px;
          }

          .contact-layout {
            gap: 45px;
          }

          .contact-methods {
            grid-template-columns: 1fr;
          }

          .contact-form-card {
            min-height: 0;
            padding: 29px 20px;
            border-radius: 23px;
          }

          .contact-form-heading {
            flex-direction: column;
            margin-bottom: 29px;
          }

          .contact-secure-label {
            align-self: flex-start;
          }

          .contact-field-row {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .contact-submit-row {
            flex-direction: column-reverse;
            align-items: stretch;
          }

          .contact-submit-row > p {
            max-width: none;
            text-align: center;
          }

          .contact-submit-button {
            width: 100%;
          }

          .contact-success {
            min-height: 500px;
            padding: 5px;
          }
        }

        @media (max-width: 400px) {
          .contact-availability {
            max-width: 100%;
          }

          .contact-response-card {
            grid-template-columns: auto 1fr;
          }

          .contact-response-signal {
            display: none;
          }

          .contact-method {
            padding-right: 10px;
          }

          .contact-method-copy strong {
            font-size: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-page *,
          .contact-page *::before,
          .contact-page *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;
```

===============================================================================
FILE: client/src/components/guestlayout/EkalavyaHScroll.jsx
===============================================================================

```jsx
import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   CSS injected once as a <style> tag
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --amber: #f5ad42;
  --amber-hover: #db9c3e;
  --serif: 'DM Serif Display', Georgia, serif;
  --mono: Georgia, 'Courier New', monospace;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-md: 0 8px 32px rgba(0,0,0,0.08);
}

/* ── LIGHT THEME (default) ── */
:root,
[data-theme="light"] {
  --ek-bg:           #FFF8E1;
  --ek-bg-card:      #ffffff;
  --ek-text:         #111827;
  --ek-text-muted:   #6b7280;
  --ek-text-faint:   #9ca3af;
  --ek-border:       #e5e7eb;
  --ek-border-light: rgba(0,0,0,0.06);
  --ek-amber-dim:    rgba(245,173,66,0.12);
  --ek-amber-faint:  rgba(245,173,66,0.06);
}

/* ── DARK THEME ── */
[data-theme="dark"] {
  --ek-bg:           #0f0f0f;
  --ek-bg-card:      #1a1a1a;
  --ek-text:         #ffffff;
  --ek-text-muted:   #9ca3af;
  --ek-text-faint:   #6b7280;
  --ek-border:       rgba(255,255,255,0.1);
  --ek-border-light: rgba(255,255,255,0.06);
  --ek-amber-dim:    rgba(245,173,66,0.15);
  --ek-amber-faint:  rgba(245,173,66,0.06);
}

html { scroll-behavior: auto; }
body { background: var(--ek-bg); overflow-x: hidden; font-family: var(--mono); color: var(--ek-text); }

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--ek-bg); }
::-webkit-scrollbar-thumb { background: var(--amber); border-radius: 2px; }

/* ── HORIZONTAL SCROLLER ── */
.ek-hscroll-wrapper { position: relative; background: var(--ek-bg); }
.ek-hscroll-sticky {
  position: sticky; top: 0; left: 0;
  width: 100%; height: 100vh;
  overflow: hidden;
  display: flex; flex-direction: column; justify-content: center;
  background: var(--ek-bg);
}
.ek-progress {
  position: absolute; top: 0; left: 0; height: 2px;
  background: var(--amber); z-index: 10;
  transition: width 0.04s linear;
}
.ek-panel-counter {
  position: absolute; bottom: 20px; right: 30px; z-index: 10;
  font-family: var(--mono); font-size: 0.55rem; letter-spacing: 0.15em;
  color: var(--ek-text-faint); display: flex; align-items: center; gap: 8px;
}
.ek-panel-counter-bar {
  width: 40px; height: 1px; background: var(--ek-border); position: relative;
}
.ek-panel-counter-fill {
  position: absolute; top: 0; left: 0; height: 100%;
  background: var(--amber); transition: width 0.3s ease;
}
.ek-track {
  display: flex; will-change: transform;
  transition: transform 0.0s;
}

/* ── PANELS ── */
.ek-panel {
  flex: 0 0 100vw; height: 100vh;
  display: flex; align-items: center;
  padding: 0 60px;
  position: relative; overflow: hidden;
  background: var(--ek-bg);
}
.ek-panel::before {
  content: '';
  position: absolute; right: 0; top: 8%; height: 84%;
  width: 1px;
  background: linear-gradient(to bottom,
    transparent 0%, var(--ek-border-light) 40%, var(--ek-border-light) 60%, transparent 100%);
}
.ek-panel-inner {
  display: flex; align-items: center;
  gap: 60px; width: 100%; max-width: 1100px; margin: 0 auto;
}
.ek-panel-text { flex: 1; min-width: 0; }
.ek-panel-visual {
  flex: 0 0 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── text styles ── */
.ek-eyebrow {
  font-family: var(--mono); font-size: 0.55rem; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--amber); margin-bottom: 12px;
  display: flex; align-items: center; gap: 10px;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.5s ease;
}
.ek-eyebrow::before {
  content: ''; display: block; width: 18px; height: 1px; background: var(--amber);
  flex-shrink: 0;
}
.ek-panel-h2 {
  font-family: var(--serif); font-size: clamp(1.5rem, 4vw, 3.2rem);
  font-weight: 400; line-height: 1.05; letter-spacing: -0.02em;
  color: var(--ek-text); overflow: hidden;
}
.ek-panel-h2 em { color: var(--amber); font-style: italic; }
.ek-h2-line {
  display: block; transform: translateY(108%);
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.ek-h2-line:nth-child(2) { transition-delay: 0.06s; }
.ek-h2-line:nth-child(3) { transition-delay: 0.12s; }
.ek-panel-desc {
  margin-top: 18px; max-width: 360px;
  font-family: var(--mono); font-size: 0.7rem; line-height: 1.6;
  color: var(--ek-text-muted);
  opacity: 0; transform: translateY(12px);
  transition: opacity 0.5s 0.3s ease, transform 0.5s 0.3s ease;
}
.ek-panel-tags {
  margin-top: 20px; display: flex; flex-wrap: wrap; gap: 8px;
  opacity: 0; transition: opacity 0.5s 0.4s ease;
}
.ek-tag {
  font-family: var(--mono); font-size: 0.55rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--amber);
  border: 1px solid var(--ek-amber-dim); padding: 4px 10px; border-radius: 2px;
  background: var(--ek-amber-faint);
}

/* active state */
.ek-panel.is-active .ek-eyebrow { clip-path: inset(0 0% 0 0); }
.ek-panel.is-active .ek-h2-line { transform: translateY(0); }
.ek-panel.is-active .ek-panel-desc { opacity: 1; transform: translateY(0); }
.ek-panel.is-active .ek-panel-tags { opacity: 1; }

/* ── SVG ── */
.ek-svg { width: 100%; height: auto; }

/* ── MARQUEE ── */
.ek-marquee {
  background: var(--amber); padding: 12px 0; overflow: hidden;
  border-top: 1px solid rgba(0,0,0,0.15);
  border-bottom: 1px solid rgba(0,0,0,0.15);
}
.ek-marquee-inner {
  display: flex; width: max-content;
  animation: marqueeRoll 22s linear infinite;
}
.ek-marquee-item {
  font-family: var(--mono); font-size: 0.62rem; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: #0f0f0f; white-space: nowrap;
  padding: 0 24px; display: flex; align-items: center; gap: 24px;
}
.ek-marquee-item::after { content: '✦'; opacity: 0.4; }
@keyframes marqueeRoll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ── INTRO / OUTRO ── */
.ek-intro {
  display: flex; flex-direction: column;
  justify-content: center; align-items: center; text-align: center;
  padding: 40px 40px; background: var(--ek-bg);
}
.ek-intro-arrow {
  display: flex; flex-direction: column; align-items: center;
  gap: 8px; color: var(--ek-text-faint);
  font-family: var(--mono); font-size: 0.55rem; letter-spacing: 0.15em;
  text-transform: uppercase;
  animation: arrowBob 2.4s ease-in-out infinite;
}
@keyframes arrowBob {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

.ek-outro {
  min-height: 80vh; display: flex; flex-direction: column;
  justify-content: center; align-items: center; text-align: center;
  padding: 60px 40px; background: var(--ek-bg); position: relative;
}
.ek-outro-h2 {
  font-family: var(--serif); font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 400; line-height: 1.05; letter-spacing: -0.02em;
  color: var(--ek-text); max-width: 600px; position: relative; z-index: 1;
}
.ek-outro-h2 span { color: var(--amber); font-style: italic; }
.ek-outro-sub {
  margin-top: 20px;
  font-family: var(--mono); font-size: 0.7rem; line-height: 1.6;
  color: var(--ek-text-muted); max-width: 400px; position: relative; z-index: 1;
}

/* ── reveal ── */
.ek-reveal {
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.ek-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* ── responsive ── */
@media (max-width: 768px) {
  .ek-panel { padding: 0 24px; }
  .ek-panel-inner { gap: 30px; }
  .ek-panel-visual { flex: 0 0 0; display: none; }
  .ek-panel-text { flex: 1; }
  .ek-panel-counter { bottom: 14px; right: 20px; }
}
`;



/* ─────────────────────────────────────────────
   SVG ILLUSTRATIONS
───────────────────────────────────────────── */

const SvgNotes = () => (
  <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a" />
        <stop offset="100%" stop-color="#0d0d0d" />
      </linearGradient>
      <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#f5ad42" />
        <stop offset="100%" stop-color="#e89c2e" />
      </linearGradient>
      <linearGradient id="progressGrad2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#f5ad42" />
        <stop offset="100%" stop-color="#d4881f" />
      </linearGradient>
      <linearGradient id="cardGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.04)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f5ad42" />
        <stop offset="100%" stop-color="rgba(245,173,66,0.1)" />
      </linearGradient>
      <linearGradient id="calendarHead" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1a1a" />
        <stop offset="100%" stop-color="#111111" />
      </linearGradient>
      <filter id="glow3">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="cardShadow2">
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="12"
          flood-color="#000"
          flood-opacity="0.5"
        />
      </filter>
      <filter id="softShadow2">
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="6"
          flood-color="#000"
          flood-opacity="0.3"
        />
      </filter>
      <clipPath id="progressClip1">
        <rect x="40" y="218" width="320" height="8" rx="4" />
      </clipPath>
      <clipPath id="progressClip2">
        <rect x="40" y="270" width="320" height="8" rx="4" />
      </clipPath>
      <clipPath id="progressClip3">
        <rect x="40" y="322" width="320" height="8" rx="4" />
      </clipPath>
    </defs>

    <rect width="800" height="500" rx="16" fill="url(#bgGrad3)" />

    <rect
      x="30"
      y="18"
      width="240"
      height="24"
      rx="6"
      fill="rgba(245,173,66,0.06)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.3s"
      />
    </rect>
    <text
      x="50"
      y="34"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="11"
      fill="rgba(245,173,66,0.7)"
      opacity="0"
    >
      LEARNING PROGRESS TRACKER
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.3s"
      />
    </text>

    <rect
      x="30"
      y="54"
      width="370"
      height="430"
      rx="14"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      filter="url(#cardShadow2)"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.5s"
      />
    </rect>

    <rect
      x="50"
      y="72"
      width="330"
      height="28"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
    />
    <text
      x="65"
      y="90"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="10"
      fill="rgba(255,255,255,0.6)"
    >
      Web Technologies · 24MCA11
    </text>
    <rect
      x="290"
      y="78"
      width="76"
      height="16"
      rx="8"
      fill="rgba(245,173,66,0.12)"
    />
    <text
      x="328"
      y="90"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="7"
      fill="#f5ad42"
    >
      4th Sem
    </text>

    <circle
      cx="60"
      cy="130"
      r="52"
      fill="none"
      stroke="rgba(255,255,255,0.05)"
      stroke-width="6"
    />
    <circle
      cx="60"
      cy="130"
      r="52"
      fill="none"
      stroke="url(#progressGrad)"
      stroke-width="6"
      stroke-dasharray="326.7"
      stroke-dashoffset="78"
      stroke-linecap="round"
      filter="url(#glow3)"
    >
      <animate
        attributeName="stroke-dashoffset"
        values="326.7;78"
        dur="2s"
        fill="freeze"
        begin="0.8s"
      />
    </circle>
    <text
      x="60"
      y="125"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="20"
      fill="#f5ad42"
      opacity="0"
    >
      76%
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.8s"
        fill="freeze"
        begin="1.2s"
      />
    </text>
    <text
      x="60"
      y="140"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="7"
      fill="rgba(255,255,255,0.35)"
      opacity="0"
    >
      Complete
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.8s"
        fill="freeze"
        begin="1.4s"
      />
    </text>

    <text
      x="130"
      y="115"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
    >
      Chapter Completion
    </text>
    <rect
      x="130"
      y="125"
      width="100"
      height="6"
      rx="3"
      fill="rgba(255,255,255,0.03)"
    />
    <rect
      x="130"
      y="125"
      width="76"
      height="6"
      rx="3"
      fill="url(#progressGrad)"
      filter="url(#glow3)"
    >
      <animate
        attributeName="width"
        values="0;76"
        dur="1.5s"
        fill="freeze"
        begin="1.0s"
      />
    </rect>
    <text
      x="240"
      y="131"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      6/8
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.6s"
      />
    </text>

    <text
      x="130"
      y="148"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
    >
      Assignment Score
    </text>
    <rect
      x="130"
      y="158"
      width="100"
      height="6"
      rx="3"
      fill="rgba(255,255,255,0.03)"
    />
    <rect
      x="130"
      y="158"
      width="88"
      height="6"
      rx="3"
      fill="url(#progressGrad2)"
      filter="url(#glow3)"
    >
      <animate
        attributeName="width"
        values="0;88"
        dur="1.2s"
        fill="freeze"
        begin="1.3s"
      />
    </rect>
    <text
      x="240"
      y="164"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      88%
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.7s"
      />
    </text>

    <rect x="50" y="188" width="330" height="1" fill="rgba(255,255,255,0.04)" />

    <rect
      x="50"
      y="200"
      width="120"
      height="22"
      rx="6"
      fill="rgba(245,173,66,0.06)"
      stroke="rgba(245,173,66,0.12)"
      stroke-width="0.3"
    />
    <text
      x="110"
      y="215"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
    >
      📚 Chapters
    </text>

    <rect
      x="40"
      y="234"
      width="320"
      height="26"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.8s"
      />
    </rect>
    <circle cx="54" cy="247" r="5" fill="rgba(245,173,66,0.3)" opacity="0">
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.9s"
      />
    </circle>
    <text
      x="54"
      y="250"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="#f5ad42"
      opacity="0"
    >
      ✓
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.9s"
      />
    </text>
    <text
      x="66"
      y="249"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.55)"
    >
      Ch 1: Introduction to Web
    </text>
    <text
      x="340"
      y="249"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.5)"
    >
      ✓
    </text>

    <rect
      x="40"
      y="264"
      width="320"
      height="26"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.0s"
      />
    </rect>
    <circle cx="54" cy="277" r="5" fill="rgba(245,173,66,0.3)" opacity="0">
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.1s"
      />
    </circle>
    <text
      x="54"
      y="280"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="#f5ad42"
      opacity="0"
    >
      ✓
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.1s"
      />
    </text>
    <text
      x="66"
      y="279"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.55)"
    >
      Ch 2: HTML5 Fundamentals
    </text>
    <text
      x="340"
      y="279"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.5)"
    >
      ✓
    </text>

    <rect
      x="40"
      y="294"
      width="320"
      height="26"
      rx="6"
      fill="rgba(245,173,66,0.04)"
      stroke="rgba(245,173,66,0.15)"
      stroke-width="0.5"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.2s"
      />
    </rect>
    <circle cx="54" cy="307" r="5" fill="rgba(245,173,66,0.3)" opacity="0">
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.3s"
      />
    </circle>
    <text
      x="54"
      y="310"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="#f5ad42"
      opacity="0"
    >
      ●
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.3s"
      />
    </text>
    <text
      x="66"
      y="309"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(245,173,66,0.85)"
    >
      Ch 3: CSS & Flexbox
    </text>
    <rect
      x="280"
      y="299"
      width="60"
      height="16"
      rx="4"
      fill="rgba(245,173,66,0.2)"
    />
    <text
      x="310"
      y="311"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="6"
      fill="#f5ad42"
    >
      In Progress
    </text>

    <rect
      x="40"
      y="324"
      width="320"
      height="26"
      rx="6"
      fill="rgba(255,255,255,0.01)"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.4s"
      />
    </rect>
    <circle cx="54" cy="337" r="5" fill="rgba(255,255,255,0.06)" opacity="0">
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.5s"
      />
    </circle>
    <text
      x="54"
      y="340"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(255,255,255,0.2)"
      opacity="0"
    >
      ○
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.5s"
      />
    </text>
    <text
      x="66"
      y="339"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      Ch 4: CSS Grid Layout
    </text>
    <text
      x="340"
      y="339"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.15)"
    >
      Pending
    </text>

    <rect x="50" y="368" width="330" height="1" fill="rgba(255,255,255,0.04)" />

    <rect
      x="50"
      y="380"
      width="330"
      height="50"
      rx="8"
      fill="rgba(245,173,66,0.03)"
      stroke="rgba(245,173,66,0.08)"
      stroke-width="0.5"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.8s"
      />
    </rect>
    <text
      x="65"
      y="399"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(245,173,66,0.7)"
    >
      📝 Faculty Update
    </text>
    <text
      x="65"
      y="416"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.35)"
    >
      New practical manual uploaded for Module 3
    </text>
    <circle cx="350" cy="405" r="4" fill="#f5ad42" opacity="0.6">
      <animate
        attributeName="opacity"
        values="0.6;0.2;0.6"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>

    <rect
      x="50"
      y="440"
      width="330"
      height="34"
      rx="8"
      fill="url(#progressGrad)"
      filter="url(#glow3)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="3.0s"
      />
    </rect>
    <text
      x="215"
      y="462"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="10"
      fill="#0a0a0a"
      opacity="0"
    >
      Continue Learning → Chapter 3
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="3.0s"
      />
    </text>

    <rect
      x="430"
      y="54"
      width="340"
      height="430"
      rx="14"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      filter="url(#cardShadow2)"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.7s"
      />
    </rect>

    <rect
      x="450"
      y="72"
      width="300"
      height="40"
      rx="10"
      fill="url(#calendarHead)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
    />
    <rect x="450" y="72" width="300" height="16" rx="10" fill="#1a1a1a" />
    <text
      x="600"
      y="84"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
    >
      Academic Calendar · 4th Semester
    </text>
    <text
      x="520"
      y="102"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="7"
      fill="rgba(245,173,66,0.4)"
    >
      VTU · B.Tech · 2024-25
    </text>

    <rect
      x="460"
      y="122"
      width="30"
      height="30"
      rx="6"
      fill="rgba(245,173,66,0.08)"
      stroke="rgba(245,173,66,0.15)"
      stroke-width="0.3"
    />
    <text
      x="475"
      y="141"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="#f5ad42"
    >
      Jan
    </text>
    <rect
      x="495"
      y="122"
      width="30"
      height="30"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="510"
      y="141"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      Feb
    </text>
    <rect
      x="530"
      y="122"
      width="30"
      height="30"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="545"
      y="141"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      Mar
    </text>
    <rect
      x="565"
      y="122"
      width="30"
      height="30"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="580"
      y="141"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      Apr
    </text>
    <rect
      x="600"
      y="122"
      width="30"
      height="30"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="615"
      y="141"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      May
    </text>
    <rect
      x="635"
      y="122"
      width="30"
      height="30"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="650"
      y="141"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      Jun
    </text>

    <line
      x1="460"
      y1="165"
      x2="740"
      y2="165"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="1"
    />

    <line
      x1="520"
      y1="130"
      x2="520"
      y2="430"
      stroke="rgba(245,173,66,0.08)"
      stroke-width="1.5"
      stroke-dasharray="6,4"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.8s"
        fill="freeze"
        begin="1.5s"
      />
    </line>
    <circle cx="520" cy="130" r="4" fill="#f5ad42" filter="url(#glow3)">
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.0s"
      />
    </circle>

    <rect
      x="460"
      y="175"
      width="280"
      height="44"
      rx="8"
      fill="rgba(245,173,66,0.04)"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.6s"
      />
    </rect>
    <rect x="460" y="175" width="3" height="44" rx="1.5" fill="#f5ad42" />
    <text
      x="472"
      y="192"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.7)"
    >
      Internal Assessment 1
    </text>
    <text
      x="472"
      y="206"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      Feb 15 · Web Tech, Data Structures
    </text>
    <rect
      x="680"
      y="185"
      width="50"
      height="18"
      rx="5"
      fill="rgba(245,173,66,0.12)"
    />
    <text
      x="705"
      y="198"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="7"
      fill="#f5ad42"
    >
      Prep
    </text>

    <rect
      x="460"
      y="228"
      width="280"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.8s"
      />
    </rect>
    <rect
      x="460"
      y="228"
      width="3"
      height="44"
      rx="1.5"
      fill="rgba(245,173,66,0.5)"
    />
    <text
      x="472"
      y="245"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.6)"
    >
      Mid Semester Exam
    </text>
    <text
      x="472"
      y="259"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.25)"
    >
      Mar 10 · All Subjects
    </text>
    <rect
      x="680"
      y="238"
      width="50"
      height="18"
      rx="5"
      fill="rgba(255,255,255,0.04)"
    />
    <text
      x="705"
      y="251"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      Soon
    </text>

    <rect
      x="460"
      y="281"
      width="280"
      height="44"
      rx="8"
      fill="rgba(245,173,66,0.06)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.0s"
      />
    </rect>
    <rect x="460" y="281" width="3" height="44" rx="1.5" fill="#f5ad42" />
    <text
      x="472"
      y="298"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="#f5ad42"
    >
      Internal Assessment 2
    </text>
    <text
      x="472"
      y="312"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.5)"
    >
      Apr 20 · Focus: Modules 3 & 4
    </text>
    <rect
      x="680"
      y="291"
      width="50"
      height="18"
      rx="5"
      fill="rgba(245,173,66,0.2)"
      filter="url(#glow3)"
    >
      <animate
        attributeName="opacity"
        values="0.7;1;0.7"
        dur="2s"
        repeatCount="indefinite"
      />
    </rect>
    <text
      x="705"
      y="304"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="7"
      fill="#f5ad42"
    >
      Active
    </text>

    <rect
      x="460"
      y="334"
      width="280"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.2s"
      />
    </rect>
    <rect
      x="460"
      y="334"
      width="3"
      height="44"
      rx="1.5"
      fill="rgba(245,173,66,0.3)"
    />
    <text
      x="472"
      y="351"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
    >
      Practical Exams
    </text>
    <text
      x="472"
      y="365"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.2)"
    >
      May 5 · Lab + Viva
    </text>
    <rect
      x="680"
      y="344"
      width="50"
      height="18"
      rx="5"
      fill="rgba(255,255,255,0.04)"
    />
    <text
      x="705"
      y="357"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      Upcoming
    </text>

    <rect
      x="460"
      y="387"
      width="280"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.4s"
      />
    </rect>
    <rect
      x="460"
      y="387"
      width="3"
      height="44"
      rx="1.5"
      fill="rgba(245,173,66,0.2)"
    />
    <text
      x="472"
      y="404"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.4)"
    >
      End Semester Exam
    </text>
    <text
      x="472"
      y="418"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.15)"
    >
      Jun 15 · Full Syllabus
    </text>
    <rect
      x="680"
      y="397"
      width="50"
      height="18"
      rx="5"
      fill="rgba(255,255,255,0.04)"
    />
    <text
      x="705"
      y="410"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="7"
      fill="rgba(255,255,255,0.25)"
    >
      Later
    </text>

    <rect
      x="460"
      y="445"
      width="280"
      height="30"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.8s"
      />
    </rect>
    <text
      x="475"
      y="464"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.3)"
    >
      📄 6 Question Papers Available
    </text>
    <text
      x="675"
      y="464"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
    >
      View All →
    </text>

    <rect
      x="710"
      y="15"
      width="70"
      height="22"
      rx="11"
      fill="rgba(245,173,66,0.08)"
      stroke="rgba(245,173,66,0.15)"
      stroke-width="0.3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.6s"
      />
    </rect>
    <text
      x="745"
      y="30"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="7"
      fill="#f5ad42"
      opacity="0"
    >
      🎯 On Track
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.6s"
      />
    </text>
  </svg>
);
const SvgHierarchy = () => (
  <svg
    className="ek-svg"
    viewBox="0 0 850 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
    
    borderRadius: "10px",
  }}
  >
    <defs>
      {/* Background Grid Pattern */}
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1"
        />
      </pattern>

      {/* Glow Filter */}
      <filter id="amber-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Data Paths for Animation */}
      <path id="path-u1" d="M 120 250 C 180 250, 180 180, 240 180" />
      <path id="path-c2" d="M 280 180 C 340 180, 340 250, 400 250" />
      <path id="path-s1" d="M 480 250 C 530 250, 530 200, 580 200" />

      <path id="path-sub1" d="M 640 200 C 690 200, 690 140, 740 140" />
      <path id="path-sub2" d="M 640 200 C 690 200, 690 190, 740 190" />
      <path id="path-sub3" d="M 640 200 C 690 200, 690 240, 740 240" />
      <path id="path-sub4" d="M 640 200 C 690 200, 690 290, 740 290" />
    </defs>
    <rect width="850" height="500" fill="#000" />
    {/* Background Grid */}
    <rect width="850" height="500" fill="url(#grid)" />

    {/* ── COLUMNS HEADERS ── */}
    <g
      fontFamily="monospace"
      fontSize="10"
      fill="rgba(255,255,255,0.2)"
      letterSpacing="0.2em"
    >
      <text x="80" y="40" textAnchor="middle">
        PLATFORM
      </text>
      <text x="260" y="40" textAnchor="middle">
        UNIVERSITY
      </text>
      <text x="440" y="40" textAnchor="middle">
        COURSE
      </text>
      <text x="610" y="40" textAnchor="middle">
        SEMESTER
      </text>
      <text x="780" y="40" textAnchor="middle">
        SUBJECTS
      </text>
    </g>

    {/* ── CONNECTING LINES (INACTIVE) ── */}
    <g
      stroke="rgba(255,255,255,0.06)"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      fill="none"
    >
      <path d="M 120 250 C 180 250, 180 320, 240 320" /> {/* Hub to BU */}
      <path d="M 280 180 C 340 180, 340 110, 400 110" /> {/* VTU to B.Tech */}
      <path d="M 480 250 C 530 250, 530 300, 580 300" /> {/* MCA to Sem 2 */}
    </g>

    {/* ── CONNECTING LINES (ACTIVE / AMBER) ── */}
    <g
      stroke="rgba(245,173,66,0.4)"
      strokeWidth="1.5"
      strokeDasharray="6 6"
      fill="none"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="12"
        to="0"
        dur="0.8s"
        repeatCount="indefinite"
      />
      <use href="#path-u1" />
      <use href="#path-c2" />
      <use href="#path-s1" />
      <use href="#path-sub1" />
      <use href="#path-sub2" />
      <use href="#path-sub3" />
      <use href="#path-sub4" />
    </g>

    {/* ── ANIMATED DATA PACKETS ── */}
    <g fill="#f5ad42" filter="url(#amber-glow)">
      {/* Platform -> University */}
      <circle r="2.5">
        <animateMotion dur="1.5s" repeatCount="indefinite">
          <mpath href="#path-u1" />
        </animateMotion>
      </circle>
      {/* University -> Course */}
      <circle r="2.5">
        <animateMotion dur="1.5s" begin="0.5s" repeatCount="indefinite">
          <mpath href="#path-c2" />
        </animateMotion>
      </circle>
      {/* Course -> Semester */}
      <circle r="2.5">
        <animateMotion dur="1.2s" begin="1s" repeatCount="indefinite">
          <mpath href="#path-s1" />
        </animateMotion>
      </circle>
      {/* Semester -> Subjects */}
      <circle r="2">
        <animateMotion dur="1s" begin="1.5s" repeatCount="indefinite">
          <mpath href="#path-sub1" />
        </animateMotion>
      </circle>
      <circle r="2">
        <animateMotion dur="1s" begin="1.7s" repeatCount="indefinite">
          <mpath href="#path-sub2" />
        </animateMotion>
      </circle>
      <circle r="2">
        <animateMotion dur="1s" begin="1.6s" repeatCount="indefinite">
          <mpath href="#path-sub3" />
        </animateMotion>
      </circle>
      <circle r="2">
        <animateMotion dur="1s" begin="1.8s" repeatCount="indefinite">
          <mpath href="#path-sub4" />
        </animateMotion>
      </circle>
    </g>

    {/* =========================================
        LEVEL 1: EKALAVYA PLATFORM (HUB)
    ========================================= */}
    <g transform="translate(80, 250)">
      <circle
        r="45"
        fill="none"
        stroke="rgba(245,173,66,0.15)"
        strokeWidth="1"
        strokeDasharray="4 6"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur="20s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        r="36"
        fill="rgba(245,173,66,0.1)"
        stroke="#f5ad42"
        strokeWidth="1.5"
      />
      <circle
        r="36"
        fill="none"
        stroke="rgba(245,173,66,0.4)"
        strokeWidth="1.5"
      >
        <animate
          attributeName="r"
          values="36;52;36"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        y="-4"
        textAnchor="middle"
        fontFamily="'DM Serif Display',serif"
        fontSize="13"
        fill="#f5ad42"
      >
        Ekalavya
      </text>
      <text
        y="10"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="8"
        fill="rgba(245,173,66,0.6)"
      >
        HUB
      </text>
    </g>

    {/* =========================================
        LEVEL 2: UNIVERSITIES
    ========================================= */}
    {/* Active Node: VTU */}
    <g transform="translate(260, 180)">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="260,180; 260,176; 260,180"
        dur="3s"
        repeatCount="indefinite"
      />
      <circle
        r="22"
        fill="#161616"
        stroke="#f5ad42"
        strokeWidth="1.5"
        filter="url(#amber-glow)"
      />
      <text
        y="4"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill="#fff"
        fontWeight="bold"
      >
        VTU
      </text>
    </g>

    {/* Inactive Node: BU */}
    <g transform="translate(260, 320)">
      <circle
        r="22"
        fill="#101010"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
      />
      <text
        y="4"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill="rgba(255,255,255,0.3)"
      >
        BU
      </text>
    </g>

    {/* =========================================
        LEVEL 3: COURSES
    ========================================= */}
    {/* Inactive Node: B.Tech */}
    <g transform="translate(440, 110)">
      <rect
        x="-40"
        y="-18"
        width="80"
        height="36"
        rx="6"
        fill="#101010"
        stroke="rgba(255,255,255,0.1)"
      />
      <text
        y="4"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fill="rgba(255,255,255,0.3)"
      >
        B.Tech
      </text>
    </g>

    {/* Active Node: MCA */}
    <g transform="translate(440, 250)">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="440,250; 440,246; 440,250"
        dur="3.2s"
        repeatCount="indefinite"
      />
      <rect
        x="-40"
        y="-18"
        width="80"
        height="36"
        rx="6"
        fill="#1a140a"
        stroke="#f5ad42"
        strokeWidth="1.5"
      />
      <rect
        x="-40"
        y="-18"
        width="80"
        height="36"
        rx="6"
        fill="none"
        stroke="#f5ad42"
        strokeWidth="2"
        filter="url(#amber-glow)"
        opacity="0.4"
      />
      <text
        y="4"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="12"
        fill="#f5ad42"
        fontWeight="bold"
      >
        MCA
      </text>
    </g>

    {/* =========================================
        LEVEL 4: SEMESTERS
    ========================================= */}
    {/* Active Node: Sem 1 */}
    <g transform="translate(610, 200)">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="610,200; 610,197; 610,200"
        dur="2.8s"
        repeatCount="indefinite"
      />
      <rect
        x="-35"
        y="-14"
        width="70"
        height="28"
        rx="14"
        fill="#1a140a"
        stroke="#f5ad42"
        strokeWidth="1"
      />
      <text
        y="3"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="9"
        fill="#fff"
      >
        Sem 1
      </text>
    </g>

    {/* Inactive Node: Sem 2 */}
    <g transform="translate(610, 300)">
      <rect
        x="-35"
        y="-14"
        width="70"
        height="28"
        rx="14"
        fill="#101010"
        stroke="rgba(255,255,255,0.1)"
      />
      <text
        y="3"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="9"
        fill="rgba(255,255,255,0.3)"
      >
        Sem 2
      </text>
    </g>

    {/* =========================================
        LEVEL 5: SUBJECTS
    ========================================= */}
    {[
      { y: 140, title: "Web Technologies", code: "24MCA11", delay: "0s" },
      { y: 190, title: "Data Structures", code: "24MCA12", delay: "0.2s" },
      { y: 240, title: "Operating Systems", code: "24MCA13", delay: "0.4s" },
      { y: 290, title: "Discrete Math", code: "24MCA14", delay: "0.6s" },
    ].map((sub, i) => (
      <g key={i} transform={`translate(740, ${sub.y})`}>
        <animateTransform
          attributeName="transform"
          type="translate"
          values={`740,${sub.y}; 740,${sub.y - 2}; 740,${sub.y}`}
          dur="3s"
          begin={sub.delay}
          repeatCount="indefinite"
        />

        {/* Subject Card Base */}
        <rect
          x="0"
          y="-16"
          width="100"
          height="32"
          rx="4"
          fill="#161616"
          stroke="rgba(245,173,66,0.3)"
          strokeWidth="0.5"
        />
        <rect x="0" y="-16" width="3" height="32" rx="1" fill="#f5ad42" />

        {/* Text */}
        <text x="12" y="-1" fontFamily="monospace" fontSize="8" fill="#fff">
          {sub.title}
        </text>
        <text
          x="12"
          y="10"
          fontFamily="monospace"
          fontSize="7"
          fill="rgba(245,173,66,0.7)"
        >
          {sub.code}
        </text>

        {/* Pulsing indicator dot */}
        <circle cx="88" cy="0" r="2.5" fill="#f5ad42">
          <animate
            attributeName="opacity"
            values="1;0.2;1"
            dur="1.5s"
            begin={sub.delay}
            repeatCount="indefinite"
          />
        </circle>
      </g>
    ))}
  </svg>
);
const SvgUniversities = () => (
  <svg
    className="ek-svg"
    viewBox="0 0 340 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Central Hub */}
    <g>
      {/* Outer rotating dashed ring */}
      <circle
        cx="170"
        cy="150"
        r="48"
        fill="none"
        stroke="rgba(245,173,66,0.15)"
        strokeWidth="1"
        strokeDasharray="4 6"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 170 150"
          to="360 170 150"
          dur="20s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Inner rotating dotted ring (rotates opposite direction) */}
      <circle
        cx="170"
        cy="150"
        r="42"
        fill="none"
        stroke="rgba(245,173,66,0.2)"
        strokeWidth="0.5"
        strokeDasharray="2 4"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 170 150"
          to="0 170 150"
          dur="15s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Solid base */}
      <circle
        cx="170"
        cy="150"
        r="34"
        fill="rgba(245,173,66,0.1)"
        stroke="#f5ad42"
        strokeWidth="1.5"
      />

      {/* Pulsing radar effect */}
      <circle
        cx="170"
        cy="150"
        r="34"
        fill="none"
        stroke="rgba(245,173,66,0.4)"
        strokeWidth="1.5"
      >
        <animate
          attributeName="r"
          values="34;56;34"
          dur="3.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0;0.8"
          dur="3.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Hub Text */}
      <text
        x="170"
        y="146"
        textAnchor="middle"
        fontFamily="'DM Serif Display',serif"
        fontSize="11"
        fill="#f5ad42"
      >
        Ekalavya
      </text>
      <text
        x="170"
        y="160"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="7.5"
        fill="rgba(245,173,66,0.5)"
      >
        Platform
      </text>
    </g>

    {/* Satellite Nodes & Connections */}
    {[
      {
        cx: 60,
        cy: 58,
        label: "VTU",
        sub: "1200+",
        delay: "0s",
        floatDur: "3s",
      },
      {
        cx: 280,
        cy: 58,
        label: "BU",
        sub: "800+",
        delay: "0.4s",
        floatDur: "3.5s",
      },
      {
        cx: 42,
        cy: 242,
        label: "KSOU",
        sub: "600+",
        delay: "0.8s",
        floatDur: "4s",
      },
      {
        cx: 298,
        cy: 242,
        label: "MSRIT",
        sub: "500+",
        delay: "1.2s",
        floatDur: "3.2s",
      },
      {
        cx: 170,
        cy: 22,
        label: "REVA",
        sub: "400+",
        delay: "1.6s",
        floatDur: "3.8s",
      },
    ].map(({ cx, cy, label, sub, delay, floatDur }) => {
      // Calculate connection points to hub dynamically
      const x2 = cx < 170 ? (cy < 150 ? 142 : 144) : cy < 150 ? 198 : 196;
      const y2 = cy < 100 ? 120 : cy > 200 ? 180 : 150;

      return (
        <g key={label}>
          {/* Flowing Data Line */}
          <line
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke="rgba(245,173,66,0.3)"
            strokeWidth="1"
            strokeDasharray="4 4"
          >
            {/* Opacity fade based on delay */}
            <animate
              attributeName="stroke-opacity"
              values="0.1;0.6;0.1"
              dur="2.5s"
              begin={delay}
              repeatCount="indefinite"
            />
            {/* Marching ants effect for continuous data flow */}
            <animate
              attributeName="stroke-dashoffset"
              from="8"
              to="0"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>

          {/* Floating Satellite Node Group */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-4; 0,0"
              dur={floatDur}
              begin={delay}
              repeatCount="indefinite"
            />
            <circle
              cx={cx}
              cy={cy}
              r="22"
              fill="#161616"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />

            {/* Inner glowing core for satellites */}
            <circle
              cx={cx}
              cy={cy}
              r="22"
              fill="none"
              stroke="rgba(245,173,66,0.1)"
              strokeWidth="3"
            >
              <animate
                attributeName="stroke-opacity"
                values="0;0.5;0"
                dur={floatDur}
                begin={delay}
                repeatCount="indefinite"
              />
            </circle>

            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="8"
              fill="rgba(255,255,255,0.85)"
            >
              {label}
            </text>
            <text
              x={cx}
              y={cy + 8}
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="7"
              fill="rgba(255,255,255,0.35)"
            >
              {sub}
            </text>
          </g>
        </g>
      );
    })}
  </svg>
);

const SvgEditor = () => (
  <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a" />
        <stop offset="100%" stop-color="#0d0d0d" />
      </linearGradient>
      <linearGradient id="sidebarGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0d0d0d" />
        <stop offset="100%" stop-color="#111111" />
      </linearGradient>
      <linearGradient id="editorBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#121212" />
        <stop offset="100%" stop-color="#0f0f0f" />
      </linearGradient>
      <linearGradient id="orangeGlow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(245,173,66,0.15)" />
        <stop offset="100%" stop-color="rgba(245,173,66,0.02)" />
      </linearGradient>
      <linearGradient id="activeTab" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1a1a" />
        <stop offset="100%" stop-color="#141414" />
      </linearGradient>
      <linearGradient id="tooltipGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1c1c1c" />
        <stop offset="100%" stop-color="#161616" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="softShadow">
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="4"
          flood-color="#000"
          flood-opacity="0.5"
        />
      </filter>
      <filter id="cardShadow">
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="8"
          flood-color="#000"
          flood-opacity="0.6"
        />
      </filter>
      <clipPath id="editorClip">
        <rect x="225" y="95" width="558" height="390" rx="8" />
      </clipPath>
    </defs>

    <rect width="800" height="500" rx="16" fill="url(#bgGrad)" />

    <rect
      x="0"
      y="0"
      width="210"
      height="500"
      rx="16"
      fill="url(#sidebarGrad)"
      stroke="rgba(255,255,255,0.05)"
      stroke-width="1"
    />
    <rect
      x="0"
      y="0"
      width="210"
      height="500"
      rx="16"
      fill="url(#orangeGlow)"
      opacity="0.3"
    />

    <rect x="0" y="0" width="210" height="48" fill="none" />

    <text
      x="20"
      y="30"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="14"
      fill="rgba(255,255,255,0.9)"
    >
      Ekalavya
    </text>
    <text
      x="20"
      y="44"
      font-family="system-ui, sans-serif"
      font-weight="400"
      font-size="9"
      fill="rgba(245,173,66,0.6)"
    >
      FACULTY WORKSPACE
    </text>
    <line
      x1="20"
      y1="56"
      x2="190"
      y2="56"
      stroke="rgba(255,255,255,0.06)"
      stroke-width="1"
    />

    <rect
      x="8"
      y="64"
      width="194"
      height="32"
      rx="6"
      fill="rgba(245,173,66,0.08)"
      stroke="rgba(245,173,66,0.15)"
      stroke-width="0.5"
    />
    <circle cx="28" cy="80" r="4" fill="rgba(245,173,66,0.5)" />
    <text
      x="40"
      y="84"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="11"
      fill="rgba(245,173,66,0.9)"
    >
      My Notes
    </text>
    <rect
      x="165"
      y="72"
      width="28"
      height="14"
      rx="7"
      fill="rgba(245,173,66,0.15)"
    />
    <text
      x="179"
      y="82"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="#f5ad42"
    >
      12
    </text>

    <text
      x="40"
      y="120"
      font-family="system-ui, sans-serif"
      font-weight="400"
      font-size="11"
      fill="rgba(255,255,255,0.45)"
    >
      Assignments
    </text>
    <text
      x="40"
      y="152"
      font-family="system-ui, sans-serif"
      font-weight="400"
      font-size="11"
      fill="rgba(255,255,255,0.45)"
    >
      Question Papers
    </text>
    <text
      x="40"
      y="184"
      font-family="system-ui, sans-serif"
      font-weight="400"
      font-size="11"
      fill="rgba(255,255,255,0.45)"
    >
      Students
    </text>

    <line
      x1="20"
      y1="208"
      x2="190"
      y2="208"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="1"
    />

    <text
      x="20"
      y="230"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
      letter-spacing="1"
    >
      RECENT
    </text>

    <rect
      x="8"
      y="240"
      width="194"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.02)"
    />
    <rect
      x="16"
      y="249"
      width="3"
      height="10"
      rx="1.5"
      fill="rgba(245,173,66,0.4)"
    />
    <text
      x="26"
      y="258"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.55)"
    >
      Web Tech - Chapter 4
    </text>

    <rect
      x="8"
      y="272"
      width="194"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.02)"
    />
    <rect
      x="16"
      y="281"
      width="3"
      height="10"
      rx="1.5"
      fill="rgba(245,173,66,0.4)"
    />
    <text
      x="26"
      y="290"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.55)"
    >
      Data Structures - Stacks
    </text>

    <rect
      x="8"
      y="304"
      width="194"
      height="28"
      rx="5"
      fill="rgba(245,173,66,0.03)"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="0.5"
    />
    <rect x="16" y="313" width="3" height="10" rx="1.5" fill="#f5ad42" />
    <text
      x="26"
      y="322"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="10"
      fill="rgba(245,173,66,0.8)"
    >
      OS - Process Sync
    </text>

    <rect
      x="8"
      y="460"
      width="194"
      height="28"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <circle cx="28" cy="474" r="10" fill="rgba(245,173,66,0.2)" />
    <text
      x="28"
      y="478"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="#f5ad42"
    >
      FK
    </text>
    <text
      x="44"
      y="474"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.6)"
    >
      Dr. Kiran
    </text>
    <text
      x="44"
      y="485"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.25)"
    >
      Professor, CSE
    </text>

    <rect
      x="225"
      y="15"
      width="558"
      height="470"
      rx="12"
      fill="url(#editorBg)"
      stroke="rgba(255,255,255,0.05)"
      stroke-width="1"
      filter="url(#cardShadow)"
    />

    <rect x="225" y="15" width="558" height="36" rx="12" fill="#141414" />
    <rect x="225" y="25" width="558" height="26" fill="#141414" />

    <rect
      x="240"
      y="22"
      width="140"
      height="24"
      rx="6"
      fill="url(#activeTab)"
      stroke="rgba(255,255,255,0.06)"
      stroke-width="0.5"
    />
    <circle cx="254" cy="34" r="3" fill="rgba(245,173,66,0.5)" />
    <text
      x="263"
      y="38"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="9.5"
      fill="rgba(255,255,255,0.8)"
    >
      Chapter 4: CSS Grid
    </text>
    <text
      x="372"
      y="38"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.3)"
    >
      ×
    </text>

    <rect
      x="385"
      y="22"
      width="130"
      height="24"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <circle cx="400" cy="34" r="3" fill="rgba(255,255,255,0.2)" />
    <text
      x="408"
      y="38"
      font-family="system-ui, sans-serif"
      font-size="9.5"
      fill="rgba(255,255,255,0.4)"
    >
      Chapter 3: Flexbox
    </text>
    <text
      x="507"
      y="38"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.2)"
    >
      ×
    </text>

    <rect
      x="519"
      y="22"
      width="24"
      height="24"
      rx="6"
      fill="rgba(245,173,66,0.08)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
    >
      <animate
        attributeName="opacity"
        values="0.6;1;0.6"
        dur="2s"
        repeatCount="indefinite"
      />
    </rect>
    <text
      x="531"
      y="38"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="13"
      fill="#f5ad42"
    >
      +
    </text>

    <rect
      x="235"
      y="55"
      width="538"
      height="34"
      rx="6"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
    />

    <rect
      x="248"
      y="62"
      width="28"
      height="20"
      rx="4"
      fill="rgba(255,255,255,0.03)"
    />
    <text
      x="262"
      y="76"
      text-anchor="middle"
      font-family="serif"
      font-weight="700"
      font-size="12"
      fill="rgba(255,255,255,0.5)"
    >
      B
    </text>
    <text
      x="284"
      y="76"
      font-family="serif"
      font-style="italic"
      font-weight="500"
      font-size="12"
      fill="rgba(255,255,255,0.35)"
    >
      I
    </text>
    <text
      x="306"
      y="76"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="11"
      fill="rgba(255,255,255,0.3)"
      text-decoration="underline"
    >
      U
    </text>

    <line
      x1="322"
      y1="64"
      x2="322"
      y2="80"
      stroke="rgba(255,255,255,0.06)"
      stroke-width="1"
    />

    <text
      x="336"
      y="76"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.35)"
    >
      H1
    </text>
    <text
      x="360"
      y="76"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.35)"
    >
      H2
    </text>
    <text
      x="384"
      y="76"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.35)"
    >
      ¶
    </text>

    <line
      x1="405"
      y1="64"
      x2="405"
      y2="80"
      stroke="rgba(255,255,255,0.06)"
      stroke-width="1"
    />

    <rect
      x="415"
      y="62"
      width="24"
      height="20"
      rx="4"
      fill="rgba(245,173,66,0.12)"
      stroke="rgba(245,173,66,0.25)"
      stroke-width="0.5"
    />
    <text
      x="427"
      y="76"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="#f5ad42"
    >
      📷
    </text>

    <text
      x="450"
      y="76"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.3)"
    >
      📎
    </text>
    <text
      x="474"
      y="76"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.3)"
    >
      📊
    </text>
    <text
      x="498"
      y="76"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(245,173,66,0.5)"
    >
      ∑
    </text>
    <text
      x="522"
      y="76"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.3)"
    >
      &lt;/&gt;
    </text>

    <line
      x1="550"
      y1="64"
      x2="550"
      y2="80"
      stroke="rgba(255,255,255,0.06)"
      stroke-width="1"
    />

    <rect
      x="660"
      y="63"
      width="8"
      height="8"
      rx="4"
      fill="#f5ad42"
      opacity="0.8"
    >
      <animate
        attributeName="opacity"
        values="0.8;0.3;0.8"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </rect>
    <text
      x="674"
      y="71"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.35)"
    >
      Saving...
    </text>

    <rect x="235" y="98" width="538" height="375" fill="none" />

    <rect
      x="255"
      y="110"
      width="180"
      height="18"
      rx="3"
      fill="rgba(255,255,255,0.06)"
    >
      <animate
        attributeName="width"
        values="0;180"
        dur="0.8s"
        fill="freeze"
        begin="0.5s"
      />
    </rect>
    <text
      x="255"
      y="124"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="16"
      fill="rgba(255,255,255,0.85)"
      opacity="0"
    >
      Introduction to CSS Grid
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.8s"
      />
    </text>

    <rect
      x="255"
      y="140"
      width="480"
      height="10"
      rx="2"
      fill="rgba(255,255,255,0.12)"
    >
      <animate
        attributeName="width"
        values="0;480"
        dur="0.6s"
        fill="freeze"
        begin="1.0s"
      />
    </rect>
    <rect
      x="255"
      y="156"
      width="440"
      height="10"
      rx="2"
      fill="rgba(255,255,255,0.08)"
    >
      <animate
        attributeName="width"
        values="0;440"
        dur="0.5s"
        fill="freeze"
        begin="1.2s"
      />
    </rect>
    <rect
      x="255"
      y="172"
      width="400"
      height="10"
      rx="2"
      fill="rgba(255,255,255,0.06)"
    >
      <animate
        attributeName="width"
        values="0;400"
        dur="0.5s"
        fill="freeze"
        begin="1.4s"
      />
    </rect>

    <rect
      x="255"
      y="198"
      width="480"
      height="90"
      rx="6"
      fill="#0a0a0a"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.8s"
      />
    </rect>
    <rect
      x="255"
      y="198"
      width="4"
      height="90"
      rx="2"
      fill="#f5ad42"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.8s"
      />
    </rect>

    <text
      x="272"
      y="216"
      font-family="monospace"
      font-size="9"
      fill="#f5ad42"
      opacity="0"
    >
      .container
    </text>
    <text
      x="340"
      y="216"
      font-family="monospace"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
      opacity="0"
    ></text>
    <animate
      attributeName="opacity"
      values="0;1"
      dur="0.3s"
      fill="freeze"
      begin="2.0s"
    />

    <text
      x="285"
      y="232"
      font-family="monospace"
      font-size="9"
      fill="#88ccff"
      opacity="0"
    >
      display:
    </text>
    <text
      x="330"
      y="232"
      font-family="monospace"
      font-size="9"
      fill="#e8b86d"
      opacity="0"
    >
      grid
    </text>
    <text
      x="355"
      y="232"
      font-family="monospace"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
      opacity="0"
    >
      ;
    </text>
    <animate
      attributeName="opacity"
      values="0;1"
      dur="0.3s"
      fill="freeze"
      begin="2.2s"
    />

    <text
      x="285"
      y="248"
      font-family="monospace"
      font-size="9"
      fill="#88ccff"
      opacity="0"
    >
      grid-template-columns:
    </text>
    <text
      x="410"
      y="248"
      font-family="monospace"
      font-size="9"
      fill="#e8b86d"
      opacity="0"
    >
      1fr 1fr
    </text>
    <text
      x="445"
      y="248"
      font-family="monospace"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
      opacity="0"
    >
      ;
    </text>
    <animate
      attributeName="opacity"
      values="0;1"
      dur="0.3s"
      fill="freeze"
      begin="2.4s"
    />

    <text
      x="285"
      y="264"
      font-family="monospace"
      font-size="9"
      fill="#88ccff"
      opacity="0"
    >
      gap:
    </text>
    <text
      x="315"
      y="264"
      font-family="monospace"
      font-size="9"
      fill="#e8b86d"
      opacity="0"
    >
      1.5rem
    </text>
    <text
      x="355"
      y="264"
      font-family="monospace"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
      opacity="0"
    >
      ;
    </text>
    <animate
      attributeName="opacity"
      values="0;1"
      dur="0.3s"
      fill="freeze"
      begin="2.6s"
    />

    <text
      x="272"
      y="280"
      font-family="monospace"
      font-size="9"
      fill="rgba(255,255,255,0.4)"
      opacity="0"
    ></text>
    <animate
      attributeName="opacity"
      values="0;1"
      dur="0.3s"
      fill="freeze"
      begin="2.8s"
    />

    <rect
      x="255"
      y="310"
      width="200"
      height="110"
      rx="8"
      fill="#0d0d0d"
      stroke="rgba(245,173,66,0.12)"
      stroke-width="1"
      stroke-dasharray="4,3"
      opacity="0"
      filter="url(#softShadow)"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="3.2s"
      />
    </rect>
    <rect
      x="320"
      y="345"
      width="24"
      height="24"
      rx="6"
      fill="rgba(245,173,66,0.15)"
      stroke="rgba(245,173,66,0.3)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="3.4s"
      />
    </rect>
    <text
      x="332"
      y="362"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="11"
      fill="#f5ad42"
      opacity="0"
    >
      +
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="3.4s"
      />
    </text>
    <text
      x="355"
      y="420"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
      opacity="0"
    >
      Add image or video
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="3.5s"
      />
    </text>

    <rect
      x="470"
      y="310"
      width="260"
      height="12"
      rx="2"
      fill="rgba(255,255,255,0.1)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="3.6s"
      />
      <animate
        attributeName="width"
        values="0;260"
        dur="0.5s"
        fill="freeze"
        begin="3.6s"
      />
    </rect>
    <rect
      x="470"
      y="330"
      width="230"
      height="12"
      rx="2"
      fill="rgba(255,255,255,0.07)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="3.8s"
      />
      <animate
        attributeName="width"
        values="0;230"
        dur="0.5s"
        fill="freeze"
        begin="3.8s"
      />
    </rect>

    <rect
      x="690"
      y="310"
      width="75"
      height="110"
      rx="8"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="4.0s"
      />
    </rect>
    <text
      x="727"
      y="328"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      CSS
    </text>
    <text
      x="727"
      y="340"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      Image
    </text>
    <text
      x="727"
      y="352"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.5)"
    >
      Alt
    </text>
    <text
      x="727"
      y="364"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      SEO
    </text>
    <text
      x="727"
      y="376"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      Link
    </text>

    <rect
      x="470"
      y="355"
      width="240"
      height="30"
      rx="4"
      fill="rgba(245,173,66,0.03)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="4.2s"
      />
    </rect>
    <rect
      x="470"
      y="355"
      width="3"
      height="30"
      rx="1.5"
      fill="rgba(245,173,66,0.5)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="4.2s"
      />
    </rect>
    <text
      x="482"
      y="372"
      font-family="system-ui, sans-serif"
      font-style="italic"
      font-size="9"
      fill="rgba(255,255,255,0.35)"
      opacity="0"
    >
      "Best way to learn CSS Grid..."
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="4.3s"
      />
    </text>

    <circle
      cx="740"
      cy="440"
      r="22"
      fill="rgba(245,173,66,0.15)"
      stroke="rgba(245,173,66,0.4)"
      stroke-width="1"
      filter="url(#glow)"
    >
      <animate
        attributeName="r"
        values="22;24;22"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <text
      x="740"
      y="446"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="16"
      fill="#f5ad42"
    >
      +
    </text>

    <rect
      x="262"
      y="123"
      width="2"
      height="14"
      rx="1"
      fill="#f5ad42"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="1;0;1"
        dur="1.1s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="x"
        values="262;430;262"
        dur="6s"
        repeatCount="indefinite"
      />
    </rect>

    <rect
      x="235"
      y="440"
      width="538"
      height="38"
      rx="8"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.5"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="4.5s"
      />
    </rect>
    <text
      x="250"
      y="463"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(245,173,66,0.6)"
    >
      CHAPTER STRUCTURE
    </text>
    <rect
      x="370"
      y="448"
      width="60"
      height="20"
      rx="4"
      fill="rgba(245,173,66,0.12)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
    />
    <text
      x="400"
      y="462"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="#f5ad42"
    >
      4.1 Grid
    </text>
    <rect
      x="436"
      y="448"
      width="60"
      height="20"
      rx="4"
      fill="rgba(255,255,255,0.03)"
    />
    <text
      x="466"
      y="462"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.4)"
    >
      4.2 Flex
    </text>
    <rect
      x="502"
      y="448"
      width="60"
      height="20"
      rx="4"
      fill="rgba(255,255,255,0.03)"
    />
    <text
      x="532"
      y="462"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.4)"
    >
      4.3 Anim
    </text>
    <circle
      cx="586"
      cy="458"
      r="8"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.25)"
      stroke-width="0.5"
    />
    <text
      x="586"
      y="462"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="#f5ad42"
    >
      +
    </text>

    <rect
      x="300"
      y="4"
      width="200"
      height="12"
      rx="6"
      fill="rgba(245,173,66,0.06)"
    />
    <text
      x="400"
      y="12"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.5)"
    >
      VTU · B.Tech · 4th Sem · Web Technologies
    </text>

    <circle cx="760" cy="28" r="5" fill="#f5ad42">
      <animate
        attributeName="r"
        values="5;7;5"
        dur="1.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.7;1;0.7"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle
      cx="760"
      cy="28"
      r="9"
      fill="none"
      stroke="#f5ad42"
      stroke-width="0.5"
      opacity="0.3"
    >
      <animate
        attributeName="r"
        values="9;14;9"
        dur="1.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.3;0;0.3"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </circle>

    <circle cx="660" cy="110" r="1" fill="rgba(255,255,255,0.05)" />
    <circle cx="670" cy="110" r="1" fill="rgba(255,255,255,0.05)" />
    <circle cx="680" cy="110" r="1" fill="rgba(255,255,255,0.03)" />
    <circle cx="660" cy="120" r="1" fill="rgba(255,255,255,0.03)" />
    <circle cx="670" cy="120" r="1" fill="rgba(255,255,255,0.03)" />
  </svg>
);

const SvgStudent = () => (
  <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a" />
        <stop offset="100%" stop-color="#0d0d0d" />
      </linearGradient>
      <linearGradient id="phoneBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1a1a" />
        <stop offset="100%" stop-color="#0e0e0e" />
      </linearGradient>
      <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0f0f0f" />
        <stop offset="100%" stop-color="#080808" />
      </linearGradient>
      <linearGradient id="tabletBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#181818" />
        <stop offset="100%" stop-color="#0e0e0e" />
      </linearGradient>
      <linearGradient id="laptopBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#161616" />
        <stop offset="100%" stop-color="#0c0c0c" />
      </linearGradient>
      <linearGradient id="orangeGlow2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(245,173,66,0.12)" />
        <stop offset="100%" stop-color="rgba(245,173,66,0.02)" />
      </linearGradient>
      <linearGradient id="downloadBtn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f5ad42" />
        <stop offset="100%" stop-color="#e09c2e" />
      </linearGradient>
      <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.04)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <filter id="glow2">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="phoneShadow">
        <feDropShadow
          dx="0"
          dy="8"
          stdDeviation="16"
          flood-color="#000"
          flood-opacity="0.5"
        />
      </filter>
      <filter id="tabletShadow">
        <feDropShadow
          dx="0"
          dy="6"
          stdDeviation="12"
          flood-color="#000"
          flood-opacity="0.4"
        />
      </filter>
      <filter id="laptopShadow">
        <feDropShadow
          dx="0"
          dy="10"
          stdDeviation="20"
          flood-color="#000"
          flood-opacity="0.5"
        />
      </filter>
      <filter id="softGlow">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <clipPath id="phoneScreen">
        <rect x="498" y="118" width="180" height="300" rx="20" />
      </clipPath>
      <clipPath id="tabletScreen">
        <rect x="104" y="152" width="260" height="200" rx="12" />
      </clipPath>
      <clipPath id="laptopScreen">
        <rect x="24" y="55" width="312" height="210" rx="8" />
      </clipPath>
    </defs>

    <rect width="800" height="500" rx="16" fill="url(#bgGrad2)" />

    <rect
      x="20"
      y="20"
      width="220"
      height="24"
      rx="6"
      fill="rgba(245,173,66,0.06)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.3s"
      />
    </rect>
    <text
      x="40"
      y="36"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="11"
      fill="rgba(245,173,66,0.7)"
      opacity="0"
    >
      MULTI-DEVICE ACCESS
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.3s"
      />
    </text>

    <circle cx="230" cy="32" r="3" fill="#f5ad42" opacity="0">
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </circle>
    <rect
      x="240"
      y="26"
      width="80"
      height="12"
      rx="6"
      fill="rgba(255,255,255,0.03)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </rect>
    <text
      x="280"
      y="35"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.35)"
      opacity="0"
    >
      Connected
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </text>

    <g filter="url(#laptopShadow)">
      <rect
        x="4"
        y="42"
        width="352"
        height="230"
        rx="16"
        fill="url(#laptopBody)"
        stroke="rgba(255,255,255,0.06)"
        stroke-width="1"
      />
      <rect
        x="16"
        y="48"
        width="328"
        height="218"
        rx="10"
        fill="#0a0a0a"
        stroke="rgba(255,255,255,0.04)"
        stroke-width="0.5"
      />
      <rect
        x="24"
        y="55"
        width="312"
        height="210"
        rx="8"
        fill="url(#screenGrad)"
      />

      <g clip-path="url(#laptopScreen)">
        <rect x="24" y="55" width="312" height="32" fill="#111111" />
        <circle cx="38" cy="71" r="4" fill="#333" />
        <circle cx="50" cy="71" r="4" fill="#333" />
        <circle cx="62" cy="71" r="4" fill="rgba(245,173,66,0.5)" />

        <rect
          x="36"
          y="98"
          width="160"
          height="14"
          rx="3"
          fill="rgba(255,255,255,0.08)"
        />
        <rect
          x="36"
          y="118"
          width="220"
          height="10"
          rx="2"
          fill="rgba(255,255,255,0.05)"
        />
        <rect
          x="36"
          y="134"
          width="190"
          height="10"
          rx="2"
          fill="rgba(255,255,255,0.04)"
        />

        <rect
          x="36"
          y="158"
          width="288"
          height="60"
          rx="6"
          fill="rgba(245,173,66,0.04)"
          stroke="rgba(245,173,66,0.12)"
          stroke-width="0.5"
        />
        <rect
          x="48"
          y="170"
          width="18"
          height="18"
          rx="4"
          fill="rgba(245,173,66,0.15)"
        />
        <text
          x="57"
          y="183"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-size="10"
          fill="#f5ad42"
        >
          PDF
        </text>
        <text
          x="76"
          y="178"
          font-family="system-ui, sans-serif"
          font-size="9"
          fill="rgba(255,255,255,0.6)"
        >
          Web_Technologies_Module4.pdf
        </text>
        <text
          x="76"
          y="192"
          font-family="system-ui, sans-serif"
          font-size="7"
          fill="rgba(255,255,255,0.25)"
        >
          2.4 MB · Downloaded 1.2k times
        </text>
        <rect
          x="260"
          y="170"
          width="52"
          height="22"
          rx="6"
          fill="url(#downloadBtn)"
          filter="url(#softGlow)"
        >
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        <text
          x="286"
          y="185"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-weight="600"
          font-size="8"
          fill="#0a0a0a"
        >
          Download
        </text>

        <rect
          x="36"
          y="230"
          width="288"
          height="24"
          rx="5"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.03)"
          stroke-width="0.5"
        />
        <text
          x="48"
          y="246"
          font-family="system-ui, sans-serif"
          font-size="7"
          fill="rgba(255,255,255,0.3)"
        >
          📄 Module 3 Notes.pdf
        </text>

        <rect
          x="36"
          y="256"
          width="288"
          height="1"
          fill="rgba(255,255,255,0.03)"
        />
      </g>

      <rect
        x="4"
        y="272"
        width="352"
        height="12"
        rx="6"
        fill="#161616"
        stroke="rgba(255,255,255,0.04)"
        stroke-width="0.5"
      />
      <rect x="130" y="274" width="92" height="6" rx="3" fill="#1a1a1a" />
    </g>

    <g filter="url(#tabletShadow)">
      <rect
        x="87"
        y="332"
        width="294"
        height="155"
        rx="16"
        fill="url(#tabletBody)"
        stroke="rgba(255,255,255,0.06)"
        stroke-width="1"
      />
      <rect
        x="99"
        y="144"
        width="270"
        height="212"
        rx="14"
        fill="#0c0c0c"
        stroke="rgba(255,255,255,0.04)"
        stroke-width="0.5"
      />
      <rect
        x="104"
        y="152"
        width="260"
        height="200"
        rx="12"
        fill="url(#screenGrad)"
      />

      <g clip-path="url(#tabletScreen)">
        <rect x="104" y="152" width="260" height="28" fill="#0e0e0e" />
        <circle cx="116" cy="166" r="3.5" fill="#333" />
        <circle cx="126" cy="166" r="3.5" fill="#333" />
        <circle cx="136" cy="166" r="3.5" fill="rgba(245,173,66,0.5)" />

        <rect
          x="116"
          y="192"
          width="120"
          height="12"
          rx="3"
          fill="rgba(255,255,255,0.08)"
        />
        <rect
          x="116"
          y="210"
          width="180"
          height="8"
          rx="2"
          fill="rgba(255,255,255,0.05)"
        />
        <rect
          x="116"
          y="224"
          width="150"
          height="8"
          rx="2"
          fill="rgba(255,255,255,0.04)"
        />

        <rect
          x="116"
          y="246"
          width="236"
          height="42"
          rx="6"
          fill="rgba(245,173,66,0.05)"
          stroke="rgba(245,173,66,0.1)"
          stroke-width="0.5"
        />
        <rect
          x="128"
          y="256"
          width="18"
          height="14"
          rx="3"
          fill="rgba(245,173,66,0.2)"
        />
        <text
          x="137"
          y="267"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-size="7"
          fill="#f5ad42"
        >
          ?
        </text>
        <text
          x="154"
          y="262"
          font-family="system-ui, sans-serif"
          font-size="8"
          fill="rgba(255,255,255,0.5)"
        >
          2024-VTU-QP-WebTech.pdf
        </text>
        <text
          x="154"
          y="274"
          font-family="system-ui, sans-serif"
          font-size="6.5"
          fill="rgba(255,255,255,0.2)"
        >
          Question Paper · 15 Pages
        </text>

        <rect
          x="116"
          y="296"
          width="236"
          height="42"
          rx="6"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.03)"
          stroke-width="0.5"
        />
        <rect
          x="128"
          y="306"
          width="18"
          height="14"
          rx="3"
          fill="rgba(255,255,255,0.08)"
        />
        <text
          x="137"
          y="317"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-size="7"
          fill="rgba(255,255,255,0.4)"
        >
          📋
        </text>
        <text
          x="154"
          y="312"
          font-family="system-ui, sans-serif"
          font-size="8"
          fill="rgba(255,255,255,0.4)"
        >
          Internal_Assessment_2.pdf
        </text>
        <text
          x="154"
          y="324"
          font-family="system-ui, sans-serif"
          font-size="6.5"
          fill="rgba(255,255,255,0.15)"
        >
          Assignment · 8 Pages
        </text>
      </g>

      <rect
        x="87"
        y="487"
        width="294"
        height="8"
        rx="4"
        fill="#161616"
        stroke="rgba(255,255,255,0.04)"
        stroke-width="0.3"
      />
    </g>

    <g filter="url(#phoneShadow)">
      <rect
        x="488"
        y="95"
        width="200"
        height="340"
        rx="24"
        fill="url(#phoneBody)"
        stroke="rgba(255,255,255,0.07)"
        stroke-width="1.5"
      />
      <rect
        x="495"
        y="108"
        width="186"
        height="310"
        rx="20"
        fill="#0c0c0c"
        stroke="rgba(255,255,255,0.04)"
        stroke-width="0.5"
      />
      <rect
        x="498"
        y="118"
        width="180"
        height="300"
        rx="20"
        fill="url(#screenGrad)"
      />

      <rect
        x="550"
        y="102"
        width="76"
        height="14"
        rx="7"
        fill="#0e0e0e"
        stroke="rgba(255,255,255,0.03)"
        stroke-width="0.3"
      />

      <g clip-path="url(#phoneScreen)">
        <rect x="498" y="118" width="180" height="40" fill="#0e0e0e" />
        <text
          x="588"
          y="142"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-weight="600"
          font-size="9"
          fill="rgba(255,255,255,0.7)"
        >
          Ekalavya
        </text>

        <rect
          x="510"
          y="170"
          width="156"
          height="28"
          rx="8"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.04)"
          stroke-width="0.3"
        />
        <text
          x="520"
          y="188"
          font-family="system-ui, sans-serif"
          font-size="8"
          fill="rgba(255,255,255,0.3)"
        >
          🔍 Search notes...
        </text>

        <rect
          x="510"
          y="210"
          width="156"
          height="56"
          rx="8"
          fill="rgba(245,173,66,0.06)"
          stroke="rgba(245,173,66,0.2)"
          stroke-width="0.5"
          filter="url(#softGlow)"
        >
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="520" y="220" width="3" height="14" rx="1.5" fill="#f5ad42" />
        <text
          x="530"
          y="230"
          font-family="system-ui, sans-serif"
          font-weight="600"
          font-size="8"
          fill="#f5ad42"
        >
          Chapter 4: CSS Grid
        </text>
        <text
          x="530"
          y="244"
          font-family="system-ui, sans-serif"
          font-size="7"
          fill="rgba(255,255,255,0.3)"
        >
          Bookmarked ★
        </text>
        <rect
          x="600"
          y="225"
          width="52"
          height="20"
          rx="5"
          fill="rgba(245,173,66,0.15)"
        />
        <text
          x="626"
          y="239"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-weight="600"
          font-size="7"
          fill="#f5ad42"
        >
          Read
        </text>

        <rect
          x="510"
          y="274"
          width="156"
          height="40"
          rx="6"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.03)"
          stroke-width="0.3"
        />
        <text
          x="520"
          y="291"
          font-family="system-ui, sans-serif"
          font-size="7.5"
          fill="rgba(255,255,255,0.5)"
        >
          Chapter 3: Flexbox
        </text>
        <text
          x="520"
          y="303"
          font-family="system-ui, sans-serif"
          font-size="6.5"
          fill="rgba(255,255,255,0.2)"
        >
          10 min read · 2.1 MB
        </text>

        <rect
          x="510"
          y="320"
          width="156"
          height="40"
          rx="6"
          fill="rgba(255,255,255,0.02)"
          stroke="rgba(255,255,255,0.03)"
          stroke-width="0.3"
        />
        <text
          x="520"
          y="337"
          font-family="system-ui, sans-serif"
          font-size="7.5"
          fill="rgba(255,255,255,0.5)"
        >
          Chapter 2: HTML Basics
        </text>
        <text
          x="520"
          y="349"
          font-family="system-ui, sans-serif"
          font-size="6.5"
          fill="rgba(255,255,255,0.2)"
        >
          15 min read · 3.4 MB
        </text>

        <rect
          x="510"
          y="368"
          width="156"
          height="32"
          rx="6"
          fill="url(#downloadBtn)"
        >
          <animate
            attributeName="opacity"
            values="0.8;1;0.8"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </rect>
        <text
          x="588"
          y="389"
          text-anchor="middle"
          font-family="system-ui, sans-serif"
          font-weight="700"
          font-size="9"
          fill="#0a0a0a"
        >
          📥 Download All PDFs
        </text>
      </g>

      <rect
        x="568"
        y="420"
        width="40"
        height="3"
        rx="1.5"
        fill="rgba(255,255,255,0.1)"
      />
    </g>

    <rect
      x="600"
      y="70"
      width="100"
      height="24"
      rx="12"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.0s"
      />
    </rect>
    <text
      x="650"
      y="86"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      📱 Mobile
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.0s"
      />
    </text>

    <rect
      x="370"
      y="390"
      width="100"
      height="24"
      rx="12"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.2s"
      />
    </rect>
    <text
      x="420"
      y="406"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      📋 Tablet
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.2s"
      />
    </text>

    <rect
      x="120"
      y="280"
      width="100"
      height="24"
      rx="12"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.4s"
      />
    </rect>
    <text
      x="170"
      y="296"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      💻 Desktop
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.4s"
      />
    </text>

    <line
      x1="170"
      y1="304"
      x2="300"
      y2="340"
      stroke="rgba(245,173,66,0.08)"
      stroke-width="1"
      stroke-dasharray="4,4"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;0.5"
        dur="0.8s"
        fill="freeze"
        begin="1.6s"
      />
    </line>
    <line
      x1="420"
      y1="414"
      x2="500"
      y2="340"
      stroke="rgba(245,173,66,0.08)"
      stroke-width="1"
      stroke-dasharray="4,4"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;0.5"
        dur="0.8s"
        fill="freeze"
        begin="1.8s"
      />
    </line>
    <line
      x1="650"
      y1="94"
      x2="610"
      y2="210"
      stroke="rgba(245,173,66,0.08)"
      stroke-width="1"
      stroke-dasharray="4,4"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;0.5"
        dur="0.8s"
        fill="freeze"
        begin="2.0s"
      />
    </line>

    <circle cx="200" cy="320" r="2" fill="#f5ad42" opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.8;0"
        dur="2s"
        repeatCount="indefinite"
        begin="2.5s"
      />
    </circle>
    <circle cx="420" cy="430" r="2" fill="#f5ad42" opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.8;0"
        dur="2s"
        repeatCount="indefinite"
        begin="3.0s"
      />
    </circle>
    <circle cx="600" cy="200" r="2" fill="#f5ad42" opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.8;0"
        dur="2s"
        repeatCount="indefinite"
        begin="3.5s"
      />
    </circle>

    <rect
      x="540"
      y="440"
      width="120"
      height="28"
      rx="14"
      fill="rgba(245,173,66,0.08)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="4.0s"
      />
    </rect>
    <text
      x="600"
      y="458"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      🔖 Bookmark All
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="4.0s"
      />
    </text>

    <rect
      x="20"
      y="450"
      width="80"
      height="20"
      rx="10"
      fill="rgba(255,255,255,0.02)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.5s"
      />
    </rect>
    <text
      x="60"
      y="464"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
      opacity="0"
    >
      14 Files Synced
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.5s"
      />
    </text>

    <rect
      x="698"
      y="450"
      width="80"
      height="20"
      rx="10"
      fill="rgba(245,173,66,0.05)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.8s"
      />
    </rect>
    <text
      x="738"
      y="464"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.4)"
      opacity="0"
    >
      Auto-Sync On
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.8s"
      />
    </text>
  </svg>
);

const SvgStack = () => (
  <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a" />
        <stop offset="100%" stop-color="#0d0d0d" />
      </linearGradient>
      <linearGradient id="sidebarGrad4" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0d0d0d" />
        <stop offset="100%" stop-color="#111111" />
      </linearGradient>
      <linearGradient id="cardGrad4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.04)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
      <linearGradient id="statGrad1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(245,173,66,0.1)" />
        <stop offset="100%" stop-color="rgba(245,173,66,0.02)" />
      </linearGradient>
      <linearGradient id="statGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(100,180,255,0.08)" />
        <stop offset="100%" stop-color="rgba(100,180,255,0.01)" />
      </linearGradient>
      <linearGradient id="statGrad3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(140,220,140,0.08)" />
        <stop offset="100%" stop-color="rgba(140,220,140,0.01)" />
      </linearGradient>
      <linearGradient id="statGrad4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(220,160,220,0.08)" />
        <stop offset="100%" stop-color="rgba(220,160,220,0.01)" />
      </linearGradient>
      <filter id="glow4">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="cardShadow4">
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="12"
          flood-color="#000"
          flood-opacity="0.5"
        />
      </filter>
      <filter id="softShadow4">
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="6"
          flood-color="#000"
          flood-opacity="0.3"
        />
      </filter>
    </defs>

    <rect width="800" height="500" rx="16" fill="url(#bgGrad4)" />

    <rect
      x="0"
      y="0"
      width="200"
      height="500"
      rx="16"
      fill="url(#sidebarGrad4)"
      stroke="rgba(255,255,255,0.05)"
      stroke-width="1"
    />
    <rect
      x="0"
      y="0"
      width="200"
      height="500"
      rx="16"
      fill="url(#statGrad1)"
      opacity="0.15"
    />

    <text
      x="20"
      y="30"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="14"
      fill="rgba(255,255,255,0.9)"
    >
      Ekalavya
    </text>
    <text
      x="20"
      y="44"
      font-family="system-ui, sans-serif"
      font-weight="400"
      font-size="8"
      fill="rgba(245,173,66,0.5)"
    >
      ADMIN DASHBOARD
    </text>
    <line
      x1="20"
      y1="56"
      x2="180"
      y2="56"
      stroke="rgba(255,255,255,0.06)"
      stroke-width="1"
    />

    <rect
      x="10"
      y="68"
      width="180"
      height="32"
      rx="6"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
    />
    <circle cx="30" cy="84" r="4" fill="rgba(245,173,66,0.5)" />
    <text
      x="42"
      y="88"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(245,173,66,0.9)"
    >
      Dashboard
    </text>

    <rect
      x="10"
      y="106"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <circle cx="30" cy="120" r="3" fill="rgba(255,255,255,0.15)" />
    <text
      x="42"
      y="124"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.45)"
    >
      Universities
    </text>

    <rect
      x="10"
      y="140"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <circle cx="30" cy="154" r="3" fill="rgba(255,255,255,0.15)" />
    <text
      x="42"
      y="158"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.45)"
    >
      Courses
    </text>

    <rect
      x="10"
      y="174"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <circle cx="30" cy="188" r="3" fill="rgba(255,255,255,0.15)" />
    <text
      x="42"
      y="192"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.45)"
    >
      Faculty
    </text>

    <rect
      x="10"
      y="208"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <circle cx="30" cy="222" r="3" fill="rgba(255,255,255,0.15)" />
    <text
      x="42"
      y="226"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.45)"
    >
      Students
    </text>

    <line
      x1="20"
      y1="250"
      x2="180"
      y2="250"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="1"
    />

    <text
      x="20"
      y="270"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="rgba(255,255,255,0.25)"
      letter-spacing="1"
    >
      SYSTEM
    </text>

    <rect
      x="10"
      y="280"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <text
      x="30"
      y="298"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.4)"
    >
      Permissions
    </text>

    <rect
      x="10"
      y="314"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <text
      x="30"
      y="332"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.4)"
    >
      Audit Logs
    </text>

    <rect
      x="10"
      y="348"
      width="180"
      height="28"
      rx="5"
      fill="rgba(255,255,255,0.01)"
    />
    <text
      x="30"
      y="366"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.4)"
    >
      Settings
    </text>

    <rect
      x="10"
      y="460"
      width="180"
      height="28"
      rx="6"
      fill="rgba(255,255,255,0.02)"
    />
    <circle cx="30" cy="474" r="10" fill="rgba(245,173,66,0.2)" />
    <text
      x="30"
      y="478"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="#f5ad42"
    >
      AD
    </text>
    <text
      x="48"
      y="474"
      font-family="system-ui, sans-serif"
      font-size="10"
      fill="rgba(255,255,255,0.55)"
    >
      Admin User
    </text>
    <text
      x="48"
      y="485"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.2)"
    >
      Super Admin
    </text>

    <rect
      x="220"
      y="14"
      width="240"
      height="24"
      rx="6"
      fill="rgba(245,173,66,0.06)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.3s"
      />
    </rect>
    <text
      x="240"
      y="30"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="11"
      fill="rgba(245,173,66,0.7)"
      opacity="0"
    >
      ADMINISTRATOR DASHBOARD
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.3s"
      />
    </text>

    <rect
      x="680"
      y="14"
      width="100"
      height="24"
      rx="12"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </rect>
    <text
      x="730"
      y="30"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="#f5ad42"
      opacity="0"
    >
      🔒 Secure Access
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </text>

    <rect
      x="220"
      y="50"
      width="170"
      height="90"
      rx="12"
      fill="url(#statGrad1)"
      stroke="rgba(245,173,66,0.15)"
      stroke-width="0.5"
      filter="url(#softShadow4)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.6s"
      />
    </rect>
    <text
      x="240"
      y="72"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.45)"
    >
      🏛 Universities
    </text>
    <text
      x="240"
      y="108"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="26"
      fill="#f5ad42"
      opacity="0"
    >
      8
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.8s"
      />
    </text>
    <text
      x="240"
      y="126"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(245,173,66,0.4)"
    >
      3 Active · 5 Total
    </text>

    <rect
      x="400"
      y="50"
      width="170"
      height="90"
      rx="12"
      fill="url(#statGrad2)"
      stroke="rgba(100,180,255,0.12)"
      stroke-width="0.5"
      filter="url(#softShadow4)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.8s"
      />
    </rect>
    <text
      x="420"
      y="72"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.45)"
    >
      📚 Courses
    </text>
    <text
      x="420"
      y="108"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="26"
      fill="#88bbff"
      opacity="0"
    >
      24
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.0s"
      />
    </text>
    <text
      x="420"
      y="126"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(100,180,255,0.35)"
    >
      Across all universities
    </text>

    <rect
      x="580"
      y="50"
      width="200"
      height="90"
      rx="12"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      filter="url(#softShadow4)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.0s"
      />
    </rect>
    <text
      x="600"
      y="72"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.4)"
    >
      Last Backup
    </text>
    <text
      x="600"
      y="108"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="14"
      fill="rgba(255,255,255,0.5)"
    >
      2 hours ago
    </text>
    <rect
      x="600"
      y="118"
      width="160"
      height="6"
      rx="3"
      fill="rgba(255,255,255,0.03)"
    />
    <rect
      x="600"
      y="118"
      width="155"
      height="6"
      rx="3"
      fill="rgba(140,220,140,0.3)"
    />
    <text
      x="600"
      y="134"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.4)"
    >
      System Healthy ✓
    </text>

    <rect
      x="220"
      y="154"
      width="560"
      height="330"
      rx="14"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      filter="url(#cardShadow4)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="1.2s"
      />
    </rect>

    <text
      x="240"
      y="178"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="11"
      fill="rgba(255,255,255,0.6)"
    >
      University Management
    </text>

    <rect
      x="240"
      y="190"
      width="520"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
    />
    <rect
      x="255"
      y="202"
      width="30"
      height="20"
      rx="4"
      fill="rgba(245,173,66,0.15)"
    />
    <text
      x="270"
      y="216"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#f5ad42"
    >
      VTU
    </text>
    <text
      x="300"
      y="215"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.55)"
    >
      Visvesvaraya Technological University
    </text>
    <rect
      x="560"
      y="200"
      width="50"
      height="16"
      rx="5"
      fill="rgba(140,220,140,0.1)"
    />
    <text
      x="585"
      y="212"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.6)"
    >
      Active
    </text>
    <text
      x="640"
      y="215"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      12 Courses
    </text>
    <text
      x="710"
      y="215"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.2)"
    >
      3400 Students
    </text>

    <rect
      x="240"
      y="240"
      width="520"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.01)"
      stroke="rgba(255,255,255,0.02)"
      stroke-width="0.3"
    />
    <rect
      x="255"
      y="252"
      width="30"
      height="20"
      rx="4"
      fill="rgba(245,173,66,0.12)"
    />
    <text
      x="270"
      y="266"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#f5ad42"
    >
      BU
    </text>
    <text
      x="300"
      y="265"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.55)"
    >
      Bengaluru University
    </text>
    <rect
      x="560"
      y="250"
      width="50"
      height="16"
      rx="5"
      fill="rgba(140,220,140,0.1)"
    />
    <text
      x="585"
      y="262"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.6)"
    >
      Active
    </text>
    <text
      x="640"
      y="265"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      6 Courses
    </text>
    <text
      x="710"
      y="265"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.2)"
    >
      2100 Students
    </text>

    <rect
      x="240"
      y="290"
      width="520"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.01)"
      stroke="rgba(255,255,255,0.02)"
      stroke-width="0.3"
    />
    <rect
      x="255"
      y="302"
      width="30"
      height="20"
      rx="4"
      fill="rgba(245,173,66,0.1)"
    />
    <text
      x="270"
      y="316"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#f5ad42"
    >
      RCU
    </text>
    <text
      x="300"
      y="315"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.5)"
    >
      Rani Channamma University
    </text>
    <rect
      x="560"
      y="300"
      width="50"
      height="16"
      rx="5"
      fill="rgba(140,220,140,0.1)"
    />
    <text
      x="585"
      y="312"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.6)"
    >
      Active
    </text>
    <text
      x="640"
      y="315"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.3)"
    >
      4 Courses
    </text>
    <text
      x="710"
      y="315"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.2)"
    >
      1200 Students
    </text>

    <rect
      x="240"
      y="340"
      width="520"
      height="44"
      rx="8"
      fill="rgba(255,255,255,0.01)"
      stroke="rgba(255,255,255,0.02)"
      stroke-width="0.3"
    />
    <rect
      x="255"
      y="352"
      width="30"
      height="20"
      rx="4"
      fill="rgba(255,255,255,0.04)"
    />
    <text
      x="270"
      y="366"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="rgba(255,255,255,0.3)"
    >
      KSOU
    </text>
    <text
      x="300"
      y="365"
      font-family="system-ui, sans-serif"
      font-weight="500"
      font-size="10"
      fill="rgba(255,255,255,0.45)"
    >
      Karnataka State Open University
    </text>
    <rect
      x="560"
      y="350"
      width="50"
      height="16"
      rx="5"
      fill="rgba(255,255,255,0.03)"
    />
    <text
      x="585"
      y="362"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.25)"
    >
      Pending
    </text>
    <text
      x="640"
      y="365"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.25)"
    >
      2 Courses
    </text>
    <text
      x="710"
      y="365"
      font-family="system-ui, sans-serif"
      font-size="9"
      fill="rgba(255,255,255,0.15)"
    >
      800 Students
    </text>

    <rect
      x="240"
      y="396"
      width="520"
      height="1"
      fill="rgba(255,255,255,0.03)"
    />

    <rect
      x="240"
      y="408"
      width="250"
      height="60"
      rx="10"
      fill="url(#statGrad3)"
      stroke="rgba(140,220,140,0.1)"
      stroke-width="0.5"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.5s"
      />
    </rect>
    <text
      x="260"
      y="428"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
    >
      👨‍🏫 Faculty Members
    </text>
    <text
      x="260"
      y="452"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="20"
      fill="rgba(140,220,140,0.8)"
    >
      86
    </text>
    <text
      x="390"
      y="448"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(140,220,140,0.4)"
    >
      Active: 78
    </text>
    <text
      x="390"
      y="459"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(140,220,140,0.3)"
    >
      Pending: 8
    </text>

    <rect
      x="500"
      y="408"
      width="260"
      height="60"
      rx="10"
      fill="url(#statGrad4)"
      stroke="rgba(220,160,220,0.1)"
      stroke-width="0.5"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="1.7s"
      />
    </rect>
    <text
      x="520"
      y="428"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(255,255,255,0.5)"
    >
      🎓 Student Registrations
    </text>
    <text
      x="520"
      y="452"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="20"
      fill="rgba(220,160,220,0.8)"
    >
      7,500
    </text>
    <text
      x="650"
      y="448"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(220,160,220,0.4)"
    >
      This Semester: 2,100
    </text>
    <text
      x="650"
      y="459"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(220,160,220,0.3)"
    >
      Growth: +18%
    </text>

    <rect
      x="700"
      y="380"
      width="70"
      height="26"
      rx="8"
      fill="rgba(245,173,66,0.12)"
      stroke="rgba(245,173,66,0.25)"
      stroke-width="0.5"
      filter="url(#glow4)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.0s"
      />
      <animate
        attributeName="opacity"
        values="0.6;1;0.6"
        dur="2s"
        repeatCount="indefinite"
        begin="2.0s"
      />
    </rect>
    <text
      x="735"
      y="397"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#f5ad42"
    >
      + Add New
    </text>

    <circle cx="560" cy="320" r="3" fill="#f5ad42" opacity="0.6">
      <animate
        attributeName="opacity"
        values="0.6;0.2;0.6"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="630" cy="320" r="3" fill="rgba(255,255,255,0.1)" opacity="0.4">
      <animate
        attributeName="opacity"
        values="0.4;0.1;0.4"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="700" cy="320" r="3" fill="rgba(255,255,255,0.1)" opacity="0.4">
      <animate
        attributeName="opacity"
        values="0.4;0.1;0.4"
        dur="2.2s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const efficient = () => (
  <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad5" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a0a0a" />
        <stop offset="100%" stop-color="#0d0d0d" />
      </linearGradient>
      <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(245,173,66,0.08)" />
        <stop offset="50%" stop-color="rgba(245,173,66,0.02)" />
        <stop offset="100%" stop-color="rgba(245,173,66,0.04)" />
      </linearGradient>
      <linearGradient id="serverGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1a1a" />
        <stop offset="100%" stop-color="#111111" />
      </linearGradient>
      <linearGradient id="dbGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#151515" />
        <stop offset="100%" stop-color="#0d0d0d" />
      </linearGradient>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(140,220,140,0.1)" />
        <stop offset="100%" stop-color="rgba(140,220,140,0.02)" />
      </linearGradient>
      <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(245,173,66,0.1)" />
        <stop offset="100%" stop-color="rgba(245,173,66,0.02)" />
      </linearGradient>
      <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(100,180,255,0.08)" />
        <stop offset="100%" stop-color="rgba(100,180,255,0.01)" />
      </linearGradient>
      <filter id="glow5">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="glowStrong">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="cardShadow5">
        <feDropShadow
          dx="0"
          dy="4"
          stdDeviation="12"
          flood-color="#000"
          flood-opacity="0.5"
        />
      </filter>
      <filter id="softShadow5">
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="6"
          flood-color="#000"
          flood-opacity="0.3"
        />
      </filter>
      <filter id="serverGlow">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <rect width="800" height="500" rx="16" fill="url(#bgGrad5)" />

    <rect
      x="20"
      y="18"
      width="300"
      height="24"
      rx="6"
      fill="rgba(245,173,66,0.06)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="0.3s"
      />
    </rect>
    <text
      x="40"
      y="34"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="11"
      fill="rgba(245,173,66,0.7)"
      opacity="0"
    >
      TECHNOLOGY STACK & ARCHITECTURE
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.3s"
      />
    </text>

    <rect
      x="620"
      y="14"
      width="160"
      height="28"
      rx="14"
      fill="rgba(140,220,140,0.08)"
      stroke="rgba(140,220,140,0.15)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </rect>
    <rect x="628" y="20" width="8" height="8" rx="4" fill="#8cdc8c">
      <animate
        attributeName="opacity"
        values="1;0.3;1"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </rect>
    <text
      x="644"
      y="28"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="rgba(140,220,140,0.7)"
      opacity="0"
    >
      All Systems Operational
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.5s"
      />
    </text>

    <rect
      x="230"
      y="55"
      width="340"
      height="430"
      rx="16"
      fill="url(#heroGrad)"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="1"
      filter="url(#cardShadow5)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.6s"
      />
    </rect>

    <rect
      x="260"
      y="74"
      width="280"
      height="28"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
    />
    <text
      x="400"
      y="92"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="10"
      fill="rgba(255,255,255,0.55)"
    >
      Application Architecture
    </text>

    <rect
      x="260"
      y="115"
      width="60"
      height="32"
      rx="8"
      fill="rgba(97,218,251,0.12)"
      stroke="rgba(97,218,251,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.9s"
      />
    </rect>
    <text
      x="290"
      y="135"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#61dafb"
      opacity="0"
    >
      React
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.9s"
      />
    </text>
    <text
      x="290"
      y="145"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(97,218,251,0.5)"
      opacity="0"
    >
      Frontend
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="0.9s"
      />
    </text>

    <line
      x1="325"
      y1="131"
      x2="370"
      y2="131"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="1"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.1s"
      />
    </line>
    <circle cx="347" cy="131" r="2" fill="#f5ad42" opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.8;0"
        dur="2s"
        repeatCount="indefinite"
        begin="1.2s"
      />
    </circle>

    <rect
      x="370"
      y="115"
      width="70"
      height="32"
      rx="8"
      fill="rgba(140,200,75,0.12)"
      stroke="rgba(140,200,75,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.1s"
      />
    </rect>
    <text
      x="405"
      y="135"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="#8cc84b"
      opacity="0"
    >
      Node.js
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.1s"
      />
    </text>
    <text
      x="405"
      y="145"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(140,200,75,0.5)"
      opacity="0"
    >
      Runtime
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.1s"
      />
    </text>

    <line
      x1="445"
      y1="131"
      x2="490"
      y2="131"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="1"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.3s"
      />
    </line>
    <circle cx="467" cy="131" r="2" fill="#f5ad42" opacity="0">
      <animate
        attributeName="opacity"
        values="0;0.8;0"
        dur="2s"
        repeatCount="indefinite"
        begin="1.4s"
      />
    </circle>

    <rect
      x="490"
      y="115"
      width="70"
      height="32"
      rx="8"
      fill="rgba(255,255,255,0.06)"
      stroke="rgba(255,255,255,0.1)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.3s"
      />
    </rect>
    <text
      x="525"
      y="135"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="8"
      fill="rgba(255,255,255,0.7)"
      opacity="0"
    >
      Express
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.3s"
      />
    </text>
    <text
      x="525"
      y="145"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(255,255,255,0.35)"
      opacity="0"
    >
      API
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.3s"
      />
    </text>

    <rect
      x="260"
      y="162"
      width="300"
      height="28"
      rx="6"
      fill="rgba(245,173,66,0.04)"
      stroke="rgba(245,173,66,0.12)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.5s"
      />
    </rect>
    <text
      x="280"
      y="180"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="8"
      fill="rgba(255,255,255,0.5)"
    >
      REST API Layer
    </text>
    <text
      x="440"
      y="180"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.4)"
    >
      JWT Auth Middleware
    </text>

    <line
      x1="410"
      y1="195"
      x2="410"
      y2="220"
      stroke="rgba(245,173,66,0.15)"
      stroke-width="1"
      stroke-dasharray="3,3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.7s"
      />
    </line>
    <line
      x1="330"
      y1="195"
      x2="330"
      y2="220"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="1"
      stroke-dasharray="3,3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.7s"
      />
    </line>
    <line
      x1="490"
      y1="195"
      x2="490"
      y2="220"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="1"
      stroke-dasharray="3,3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="1.7s"
      />
    </line>

    <rect
      x="280"
      y="222"
      width="80"
      height="36"
      rx="8"
      fill="rgba(77,171,77,0.12)"
      stroke="rgba(77,171,77,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.8s"
      />
    </rect>
    <text
      x="320"
      y="244"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="9"
      fill="#4dab4d"
      opacity="0"
    >
      MongoDB
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.8s"
      />
    </text>
    <text
      x="320"
      y="254"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(77,171,77,0.5)"
      opacity="0"
    >
      Atlas
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="1.8s"
      />
    </text>

    <rect
      x="375"
      y="222"
      width="70"
      height="36"
      rx="8"
      fill="rgba(100,180,255,0.1)"
      stroke="rgba(100,180,255,0.18)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.0s"
      />
    </rect>
    <text
      x="410"
      y="244"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="9"
      fill="#88bbff"
      opacity="0"
    >
      Cloudinary
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.0s"
      />
    </text>
    <text
      x="410"
      y="254"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(100,180,255,0.4)"
      opacity="0"
    >
      Media
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.0s"
      />
    </text>

    <rect
      x="460"
      y="222"
      width="80"
      height="36"
      rx="8"
      fill="rgba(245,173,66,0.1)"
      stroke="rgba(245,173,66,0.2)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.2s"
      />
    </rect>
    <text
      x="500"
      y="244"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="9"
      fill="#f5ad42"
      opacity="0"
    >
      JWT
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.2s"
      />
    </text>
    <text
      x="500"
      y="254"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(245,173,66,0.5)"
      opacity="0"
    >
      Auth
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.2s"
      />
    </text>

    <rect
      x="260"
      y="275"
      width="280"
      height="50"
      rx="10"
      fill="url(#shieldGrad)"
      stroke="rgba(140,220,140,0.12)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="2.4s"
      />
    </rect>
    <circle
      cx="285"
      cy="300"
      r="14"
      fill="none"
      stroke="rgba(140,220,140,0.3)"
      stroke-width="2"
    >
      <animate
        attributeName="r"
        values="14;16;14"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <text
      x="285"
      y="304"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="12"
      fill="rgba(140,220,140,0.6)"
    >
      🔒
    </text>
    <text
      x="308"
      y="295"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(140,220,140,0.7)"
    >
      Secure HTTPS + JWT Tokens
    </text>
    <text
      x="308"
      y="310"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.4)"
    >
      Role-based access · Encrypted data · Secure sessions
    </text>

    <rect
      x="260"
      y="338"
      width="132"
      height="80"
      rx="10"
      fill="url(#speedGrad)"
      stroke="rgba(245,173,66,0.12)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.6s"
      />
    </rect>
    <text
      x="280"
      y="360"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(245,173,66,0.7)"
    >
      ⚡ Response Time
    </text>
    <text
      x="280"
      y="390"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="22"
      fill="#f5ad42"
    >
      180ms
    </text>
    <text
      x="360"
      y="388"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(245,173,66,0.4)"
    >
      avg
    </text>
    <text
      x="280"
      y="405"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(245,173,66,0.3)"
    >
      P99: 320ms
    </text>

    <rect
      x="406"
      y="338"
      width="134"
      height="80"
      rx="10"
      fill="url(#cloudGrad)"
      stroke="rgba(100,180,255,0.12)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="2.8s"
      />
    </rect>
    <text
      x="426"
      y="360"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="9"
      fill="rgba(100,180,255,0.7)"
    >
      ☁️ Uptime
    </text>
    <text
      x="426"
      y="390"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="22"
      fill="#88bbff"
    >
      99.9%
    </text>
    <text
      x="426"
      y="405"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(100,180,255,0.3)"
    >
      Last 30 days
    </text>

    <rect
      x="260"
      y="432"
      width="280"
      height="34"
      rx="8"
      fill="rgba(255,255,255,0.02)"
      stroke="rgba(255,255,255,0.03)"
      stroke-width="0.3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="3.0s"
      />
    </rect>
    <text
      x="280"
      y="453"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.35)"
    >
      🔧 Optimized CDN Delivery
    </text>
    <text
      x="450"
      y="453"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.5)"
    >
      Cache Hit: 94%
    </text>

    <rect
      x="590"
      y="55"
      width="190"
      height="200"
      rx="14"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      filter="url(#cardShadow5)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="0.8s"
      />
    </rect>

    <text
      x="610"
      y="78"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="10"
      fill="rgba(255,255,255,0.5)"
    >
      Server Health
    </text>

    <rect
      x="610"
      y="90"
      width="150"
      height="18"
      rx="4"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="620"
      y="103"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.4)"
    >
      CPU Usage
    </text>
    <rect
      x="620"
      y="108"
      width="120"
      height="4"
      rx="2"
      fill="rgba(255,255,255,0.03)"
    />
    <rect x="620" y="108" width="42" height="4" rx="2" fill="#8cdc8c">
      <animate
        attributeName="width"
        values="0;42"
        dur="1.2s"
        fill="freeze"
        begin="1.5s"
      />
    </rect>
    <text
      x="748"
      y="112"
      text-anchor="end"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(140,220,140,0.5)"
    >
      23%
    </text>

    <rect
      x="610"
      y="120"
      width="150"
      height="18"
      rx="4"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="620"
      y="133"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.4)"
    >
      Memory
    </text>
    <rect
      x="620"
      y="138"
      width="120"
      height="4"
      rx="2"
      fill="rgba(255,255,255,0.03)"
    />
    <rect x="620" y="138" width="68" height="4" rx="2" fill="#f5ad42">
      <animate
        attributeName="width"
        values="0;68"
        dur="1.0s"
        fill="freeze"
        begin="1.7s"
      />
    </rect>
    <text
      x="748"
      y="142"
      text-anchor="end"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(245,173,66,0.5)"
    >
      45%
    </text>

    <rect
      x="610"
      y="150"
      width="150"
      height="18"
      rx="4"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="620"
      y="163"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.4)"
    >
      Disk I/O
    </text>
    <rect
      x="620"
      y="168"
      width="120"
      height="4"
      rx="2"
      fill="rgba(255,255,255,0.03)"
    />
    <rect x="620" y="168" width="30" height="4" rx="2" fill="#88bbff">
      <animate
        attributeName="width"
        values="0;30"
        dur="0.9s"
        fill="freeze"
        begin="1.9s"
      />
    </rect>
    <text
      x="748"
      y="172"
      text-anchor="end"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(100,180,255,0.5)"
    >
      12%
    </text>

    <rect
      x="610"
      y="180"
      width="150"
      height="18"
      rx="4"
      fill="rgba(255,255,255,0.02)"
    />
    <text
      x="620"
      y="193"
      font-family="system-ui, sans-serif"
      font-size="8"
      fill="rgba(255,255,255,0.4)"
    >
      Network
    </text>
    <rect
      x="620"
      y="198"
      width="120"
      height="4"
      rx="2"
      fill="rgba(255,255,255,0.03)"
    />
    <rect x="620" y="198" width="52" height="4" rx="2" fill="#8cdc8c">
      <animate
        attributeName="width"
        values="0;52"
        dur="1.1s"
        fill="freeze"
        begin="2.1s"
      />
    </rect>
    <text
      x="748"
      y="202"
      text-anchor="end"
      font-family="system-ui, sans-serif"
      font-size="6"
      fill="rgba(140,220,140,0.5)"
    >
      31%
    </text>

    <rect
      x="610"
      y="212"
      width="150"
      height="1"
      fill="rgba(255,255,255,0.04)"
    />

    <rect
      x="610"
      y="220"
      width="70"
      height="22"
      rx="6"
      fill="rgba(140,220,140,0.08)"
      stroke="rgba(140,220,140,0.12)"
      stroke-width="0.3"
    />
    <text
      x="645"
      y="235"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(140,220,140,0.6)"
    >
      Active Nodes: 3
    </text>

    <rect
      x="590"
      y="265"
      width="190"
      height="220"
      rx="14"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.04)"
      stroke-width="0.5"
      filter="url(#cardShadow5)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.6s"
        fill="freeze"
        begin="1.0s"
      />
    </rect>

    <text
      x="610"
      y="288"
      font-family="system-ui, sans-serif"
      font-weight="600"
      font-size="10"
      fill="rgba(255,255,255,0.5)"
    >
      Request Log
    </text>

    <rect
      x="610"
      y="300"
      width="150"
      height="22"
      rx="4"
      fill="rgba(140,220,140,0.04)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.0s"
      />
    </rect>
    <text
      x="620"
      y="314"
      font-family="monospace"
      font-size="7"
      fill="rgba(140,220,140,0.5)"
    >
      GET /api/notes
    </text>
    <text
      x="740"
      y="314"
      font-family="monospace"
      font-size="6"
      fill="rgba(140,220,140,0.4)"
    >
      200
    </text>

    <rect
      x="610"
      y="326"
      width="150"
      height="22"
      rx="4"
      fill="rgba(255,255,255,0.01)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.3s"
      />
    </rect>
    <text
      x="620"
      y="340"
      font-family="monospace"
      font-size="7"
      fill="rgba(100,180,255,0.5)"
    >
      POST /api/auth
    </text>
    <text
      x="740"
      y="340"
      font-family="monospace"
      font-size="6"
      fill="rgba(100,180,255,0.4)"
    >
      201
    </text>

    <rect
      x="610"
      y="350"
      width="150"
      height="22"
      rx="4"
      fill="rgba(255,255,255,0.01)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.6s"
      />
    </rect>
    <text
      x="620"
      y="364"
      font-family="monospace"
      font-size="7"
      fill="rgba(255,255,255,0.4)"
    >
      GET /api/pdf
    </text>
    <text
      x="740"
      y="364"
      font-family="monospace"
      font-size="6"
      fill="rgba(140,220,140,0.4)"
    >
      200
    </text>

    <rect
      x="610"
      y="374"
      width="150"
      height="22"
      rx="4"
      fill="rgba(255,255,255,0.01)"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.3s"
        fill="freeze"
        begin="2.9s"
      />
    </rect>
    <text
      x="620"
      y="388"
      font-family="monospace"
      font-size="7"
      fill="rgba(245,173,66,0.5)"
    >
      PUT /api/notes
    </text>
    <text
      x="740"
      y="388"
      font-family="monospace"
      font-size="6"
      fill="rgba(245,173,66,0.4)"
    >
      200
    </text>

    <rect
      x="610"
      y="400"
      width="150"
      height="1"
      fill="rgba(255,255,255,0.03)"
    />

    <rect
      x="610"
      y="410"
      width="150"
      height="28"
      rx="6"
      fill="rgba(255,255,255,0.015)"
      stroke="rgba(255,255,255,0.02)"
      stroke-width="0.3"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.4s"
        fill="freeze"
        begin="3.2s"
      />
    </rect>
    <text
      x="625"
      y="428"
      font-family="system-ui, sans-serif"
      font-size="7"
      fill="rgba(255,255,255,0.3)"
    >
      Total Requests Today
    </text>
    <text
      x="735"
      y="428"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="9"
      fill="#f5ad42"
    >
      12,847
    </text>

    <rect
      x="20"
      y="440"
      width="190"
      height="42"
      rx="10"
      fill="rgba(245,173,66,0.04)"
      stroke="rgba(245,173,66,0.1)"
      stroke-width="0.5"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;1"
        dur="0.5s"
        fill="freeze"
        begin="3.0s"
      />
    </rect>
    <text
      x="115"
      y="462"
      text-anchor="middle"
      font-family="system-ui, sans-serif"
      font-weight="700"
      font-size="9"
      fill="#f5ad42"
    >
      View Full Documentation →
    </text>

    <circle cx="320" cy="110" r="1.5" fill="#61dafb" opacity="0.6">
      <animate
        attributeName="opacity"
        values="0.6;0;0.6"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="400" cy="110" r="1.5" fill="#8cc84b" opacity="0.6">
      <animate
        attributeName="opacity"
        values="0;0.6;0"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle
      cx="520"
      cy="110"
      r="1.5"
      fill="rgba(255,255,255,0.4)"
      opacity="0.5"
    >
      <animate
        attributeName="opacity"
        values="0.5;0;0.5"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
/* ─────────────────────────────────────────────
   PANEL DATA
───────────────────────────────────────────── */
const PANELS = [
  {
    eyebrow: "University Ecosystem",
    lines: ["One hub.", "Every campus.", "Connected."],
    italic: [false, true, false],
    tags: [
      "Multi University",
      "Course Management",
      "Semester Wise",
      "Academic Structure",
    ],
    Visual: SvgHierarchy,
  },

  {
    eyebrow: "Faculty Workspace",
    lines: ["Create.", "Teach better.", "Publish."],
    italic: [false, true, false],
    tags: [
      "Rich Text",
      "Chapter Wise",
      "Media Upload",
      "Cloudinary",
      "Code Blocks",
    ],
    Visual: SvgEditor,
  },

  {
    eyebrow: "Student Learning",
    lines: ["Learn anywhere.", "Any device.", "Anytime."],
    italic: [false, true, false],
    tags: [
      "Mobile Friendly",
      "Offline PDF",
      "Bookmarks",
      "Question Papers",
      "Assignments",
    ],
    Visual: SvgStudent,
  },

  {
    eyebrow: "Academic Intelligence",
    lines: ["Track progress.", "Stay prepared.", "Excel."],
    italic: [false, true, false],
    tags: [
      "Progress Tracking",
      "Exam Preparation",
      "Notifications",
      "Academic Calendar",
    ],
    Visual: SvgNotes,
  },

  {
    eyebrow: "Administration",
    lines: ["Manage.", "Empower.", "Support."],
    italic: [false, true, false],
    tags: [
      "Admin Dashboard",
      "Role Based Access",
      "Faculty Management",
      "Student Management",
    ],
    Visual: SvgStack,
  },

  {
    eyebrow: "Modern Technology",
    lines: ["Fast.", "Secure.", "Scalable."],
    italic: [false, true, false],
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "JWT",
      "Cloudinary",
      "REST API",
    ],
    Visual: efficient,
  },
];

const MARQUEE_ITEMS = [
  "Chapter Wise Notes",
  "University Based Learning",
  "Faculty Dashboard",
  "Student Portal",
  "Assignments",
  "Question Papers",
  "Rich Text Notes",
  "Cloud Storage",
  "Mobile Learning",
  "Attendance",
  "Exam Preparation",
  "Progress Tracking",
  "Role Based Access",
  "Secure Authentication",
  "Learning Without Limits",
];

/* ─────────────────────────────────────────────
   LERP UTILITY
───────────────────────────────────────────── */
function lerp(a, b, t) {
  return a + (b - a) * t;
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function EkalavyaHScroll() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const fillRef = useRef(null);
  const panelRefs = useRef([]);
  const lenisRef = useRef({ current: 0, target: 0, raf: null });
  const activeRef = useRef(-1);
  const [counterText, setCounterText] = useState("01 / 05");

  /* inject CSS once */
  useEffect(() => {
    const id = "ek-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = CSS;
      document.head.appendChild(el);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  /* Lenis-style smooth scroll → horizontal map */
  const onScroll = useCallback((scrollY) => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const prog = progressRef.current;
    const fill = fillRef.current;
    if (!wrapper || !track) return;

    const rect = wrapper.getBoundingClientRect();
    const wrapperTop = scrollY + rect.top;
    const wrapperH = wrapper.offsetHeight;
    const viewH = window.innerHeight;
    const scrolledIn = scrollY - wrapperTop;
    const totalScroll = wrapperH - viewH;
    const t = Math.max(0, Math.min(1, scrolledIn / totalScroll));

    /* horizontal shift */
    const numPanels = PANELS.length;
    const maxShift = (numPanels - 1) * window.innerWidth;
    track.style.transform = `translateX(-${t * maxShift}px)`;

    /* progress bar */
    if (prog) prog.style.width = `${t * 100}%`;

    /* counter fill */
    if (fill) fill.style.width = `${t * 100}%`;

    /* active panel */
    const idx = Math.min(numPanels - 1, Math.round(t * (numPanels - 1)));
    if (idx !== activeRef.current) {
      if (activeRef.current >= 0 && panelRefs.current[activeRef.current]) {
        panelRefs.current[activeRef.current].classList.remove("is-active");
      }
      if (panelRefs.current[idx]) {
        panelRefs.current[idx].classList.add("is-active");
      }
      activeRef.current = idx;
      setCounterText(`0${idx + 1} / 0${numPanels}`);
    }
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;

    function tick() {
      lenis.target = window.scrollY;
      lenis.current = lerp(lenis.current, lenis.target, 0.09);
      if (Math.abs(lenis.current - lenis.target) < 0.05)
        lenis.current = lenis.target;
      onScroll(lenis.current);
      lenis.raf = requestAnimationFrame(tick);
    }

    lenis.current = window.scrollY;
    lenis.target = window.scrollY;
    lenis.raf = requestAnimationFrame(tick);

    /* activate first panel */
    setTimeout(() => {
      if (panelRefs.current[0]) panelRefs.current[0].classList.add("is-active");
      activeRef.current = 0;
    }, 200);

    /* keyboard nav */
    const handleKey = (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = Math.max(
        0,
        Math.min(PANELS.length - 1, activeRef.current + dir),
      );
      const wTop = window.scrollY + wrapper.getBoundingClientRect().top;
      const totalScroll = wrapper.offsetHeight - window.innerHeight;
      const target = wTop + (next / (PANELS.length - 1)) * totalScroll;
      window.scrollTo({ top: target, behavior: "smooth" });
    };
    window.addEventListener("keydown", handleKey);

    /* reveal-on-scroll for non-panel sections */
    const reveals = document.querySelectorAll(".ek-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 },
    );
    reveals.forEach((el) => io.observe(el));

    return () => {
      cancelAnimationFrame(lenis.raf);
      window.removeEventListener("keydown", handleKey);
      io.disconnect();
    };
  }, [onScroll]);

  /* scroll space: 5 panels = 500vh total, sticky is 100vh, so wrapper = 500vh */
  const WRAPPER_HEIGHT = `${PANELS.length * 100}vh`;

  return (
    <div style={{ background: "#0a0a0a", color: "#fff" }}>
      {/* ── INTRO ── */}
      <section className="ek-intro">
        <div
          className="ek-intro-arrow ek-reveal"
          style={{ transitionDelay: "0.4s", marginTop: "300px" }}
        >
          <svg width="18" height="30" viewBox="0 0 18 30" fill="none">
            <line
              x1="9"
              y1="0"
              x2="9"
              y2="26"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
            />
            <polyline
              points="3,20 9,28 15,20"
              stroke="#f5ad42"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          <span>Scroll to explore features</span>
        </div>
      </section>

      {/* ── HORIZONTAL SCROLLER ── */}
      <div
        className="ek-hscroll-wrapper"
        ref={wrapperRef}
        style={{ height: WRAPPER_HEIGHT }}
      >
        <div className="ek-hscroll-sticky">
          {/* progress */}
          <div className="ek-progress" ref={progressRef} />

          {/* panel counter */}
          <div className="ek-panel-counter">
            <span>{counterText}</span>
            <div className="ek-panel-counter-bar">
              <div className="ek-panel-counter-fill" ref={fillRef} />
            </div>
          </div>

          {/* track */}
          <div className="ek-track" ref={trackRef}>
            {PANELS.map((panel, i) => {
              const { eyebrow, lines, italic, desc, tags, Visual } = panel;
              return (
                <div
                  key={i}
                  className="ek-panel"
                  ref={(el) => (panelRefs.current[i] = el)}
                >
                  <div className="ek-panel-inner">
                    {/* text */}
                    <div className="ek-panel-text">
                      <div className="ek-eyebrow">{eyebrow}</div>
                      <h3 className="ek-panel-h2">
                        {lines.map((line, j) => (
                          <span className="ek-h2-line" key={j}>
                            {italic[j] ? <em>{line}</em> : line}
                          </span>
                        ))}
                      </h3>
                      <p className="ek-panel-desc">{desc}</p>
                      <div className="ek-panel-tags">
                        {tags.map((t) => (
                          <span className="ek-tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* visual */}
                    <div className="ek-panel-visual">
                      <Visual />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div className="ek-marquee" aria-hidden="true">
        <div className="ek-marquee-inner">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div className="ek-marquee-item" key={i}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── OUTRO ── */}
      <section className="ek-outro">
        <div className="ek-outro-glow" />
        <h2 className="ek-outro-h2 ek-reveal">
          The notes you need.
          <br />
          <span>Already here.</span>
        </h2>
        <p
          className="ek-outro-sub ek-reveal"
          style={{ transitionDelay: "0.15s" }}
        >
          Join thousands of students and faculty across Karnataka who are
          building a better learning experience together.
        </p>
      </section>
    </div>
  );
}
```

===============================================================================
FILE: client/src/components/guestlayout/FacultyLogin.jsx
===============================================================================

```jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../axiosConfig";

function FacultyLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await API.post("/faculty/login", form);

      navigate("/faculty/facultynote");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    backgroundColor: "var(--bg-input)",
    color: "var(--text-main)",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        backgroundColor: "var(--bg-main)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "900",
              color: "var(--text-main)",
              marginBottom: "8px",
            }}
          >
            Faculty Login
          </h2>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "14px",
            }}
          >
            Sign in to your faculty account
          </p>
        </div>

        <div
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "40px",
          }}
        >
          {error && (
            <div
              style={{
                backgroundColor: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#ef4444",
                padding: "12px 16px",
                borderRadius: "10px",
                marginBottom: "24px",
                fontSize: "14px",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "var(--text-muted)",
                }}
              >
                Email address
              </label>

              <input
                name="email"
                type="email"
                placeholder="faculty@example.com"
                value={form.email}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--primary)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--border)")
                }
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "var(--text-muted)",
                }}
              >
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--primary)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--border)")
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "var(--primary)",
                color: "#fff",
                fontWeight: "700",
                fontSize: "15px",
                opacity: loading ? 0.6 : 1,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                !loading &&
                (e.currentTarget.style.backgroundColor =
                  "var(--primary-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--primary)")
              }
            >
              {loading ? "Logging in..." : "Faculty Login →"}
            </button>
          </form>

          <p
            style={{
              fontSize: "13px",
              color: "var(--text-faint)",
              textAlign: "center",
              marginTop: "24px",
            }}
          >
            Don't have a faculty account?{" "}
            <Link
              to="/faculty-register"
              style={{
                color: "var(--primary)",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Register
            </Link>
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Link
              to="/faculty-forgot-password"
              style={{
                fontSize: "12px",
                color: "var(--primary)",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyLogin;
```

===============================================================================
FILE: client/src/components/guestlayout/FacultyRegister.jsx
===============================================================================

```jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../axiosConfig";

function FacultyRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    university: "",
    course: "",
  });

  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (form.university) {
      fetchCourses(form.university);
    } else {
      setCourses([]);
      setForm((prev) => ({ ...prev, course: "" }));
    }
  }, [form.university]);

  const fetchUniversities = async () => {
    try {
      const res = await API.get("/academic/universities");
      setUniversities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCourses = async (id) => {
    try {
      const res = await API.get(`/academic/courses/${id}`);
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const res = await API.post("/faculty/register", form);

      setSuccess(res.data.message);

      setTimeout(() => {
        navigate("/faculty-login");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    background: "var(--bg-input)",
    color: "var(--text-main)",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 500,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          <h2>Faculty Registration</h2>

          <p style={{ color: "var(--text-muted)" }}>
            Register as a faculty member
          </p>
        </div>

        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: 35,
          }}
        >
          {error && (
            <div
              style={{
                color: "#ef4444",
                marginBottom: 20,
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                color: "#22c55e",
                marginBottom: 20,
              }}
            >
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <input
              style={inputStyle}
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              style={inputStyle}
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              style={inputStyle}
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <input
              style={inputStyle}
              placeholder="Designation"
              name="designation"
              value={form.designation}
              onChange={handleChange}
            />

            <select
              style={inputStyle}
              name="university"
              value={form.university}
              onChange={handleChange}
              required
            >
              <option value="">Select University</option>

              {universities.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            <select
              style={inputStyle}
              name="course"
              value={form.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>

              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              disabled={loading}
              style={{
                padding: 14,
                border: "none",
                borderRadius: 10,
                background: "var(--primary)",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {loading
                ? "Registering..."
                : "Register as Faculty"}
            </button>
          </form>

          <p
            style={{
              marginTop: 25,
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Already registered?{" "}
            <Link
              to="/faculty-login"
              style={{
                color: "var(--primary)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Faculty Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FacultyRegister;
```

===============================================================================
FILE: client/src/components/guestlayout/ForgotPassword.jsx
===============================================================================

```jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../axiosConfig";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError("Email is required."); return; }
    setError(""); setLoading(true);
    try {
      await API.post("/auth/forgot-password", { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", backgroundColor: "var(--bg-main)" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>

        {submitted ? (
          <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px", padding: "48px 40px", textAlign: "center" }}>
            <div style={{ fontSize: "52px", marginBottom: "20px" }}>📬</div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "12px" }}>Check your inbox</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.8, marginBottom: "32px" }}>
              If <strong style={{ color: "var(--text-main)" }}>{email}</strong> is registered,
              we have sent a new temporary password to that address.
              Please check your inbox and login with the new password.
            </p>
            <Link to="/login"
              style={{ display: "inline-block", padding: "12px 28px", borderRadius: "10px", textDecoration: "none", backgroundColor: "var(--primary)", color: "#fff", fontWeight: "700", fontSize: "14px", transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
            >
              Go to Login →
            </Link>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "8px" }}>Forgot password?</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.7 }}>
                Enter your email address and we will send you a new temporary password.
              </p>
            </div>

            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px", padding: "40px" }}>
              {error && (
                <div style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", padding: "12px 16px", borderRadius: "10px", marginBottom: "24px", fontSize: "14px" }}>
                  ⚠️ {error}
                </div>
              )}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)" }}>Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid var(--border)", backgroundColor: "var(--bg-input)", color: "var(--text-main)", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
                <button type="submit" disabled={loading}
                  style={{ padding: "14px", borderRadius: "10px", border: "none", cursor: "pointer", backgroundColor: "var(--primary)", color: "#fff", fontWeight: "700", fontSize: "15px", opacity: loading ? 0.6 : 1, transition: "background 0.2s" }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                >
                  {loading ? "Sending..." : "Send New Password →"}
                </button>
              </form>
              <p style={{ fontSize: "13px", color: "var(--text-faint)", textAlign: "center", marginTop: "24px" }}>
                Remembered it?{" "}
                <Link to="/login" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>Back to Login</Link>
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;
```

===============================================================================
FILE: client/src/components/guestlayout/GuestFooter.jsx
===============================================================================

```jsx
import { Link } from "react-router-dom";

import HeroText from "./HeroText";
import FiberBurst from "../../StyledComponents/Fiberburst";
import MeshText from "../../StyledComponents/MeshText";

function GuestFooter() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
    { to: "/login", label: "Login" },
  ];

  return (
    <footer
      style={{
        position: "relative",
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div>{/* <FiberBurst/> */}</div>

      {/* Jelly animated footer text */}
      <div
        style={{
          width: "100%",
          height: "clamp(110px, 18vw, 230px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <MeshText
          text="EKALAVYA"
          color="rgb(48, 48, 48)"
          font={{
            fontFamily: "Inter",
            variant: "Bold",
            fontSize: 160,
            fontWeight: 700,
            fontStyle: "normal",
            lineHeight: "1em",
            letterSpacing: "0em",
          }}
          colorSplit={true}
          customColors={["#c9c5c7", "#cacaca"]}
          force={18}
        />
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "var(--primary)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "900",
                fontSize: "13px",
              }}
            >
              E
            </div>

            <span
              style={{
                fontWeight: "700",
                color: "var(--text-main)",
                fontSize: "15px",
              }}
            >
              Ekalavya
            </span>
          </div>

          <p
            style={{
              color: "var(--text-faint)",
              fontSize: "12px",
              margin: 0,
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} Ekalavya. All rights reserved.
          </p>

          <div
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: "var(--text-faint)",
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-faint)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default GuestFooter;
```

===============================================================================
FILE: client/src/components/guestlayout/GuestLayout.jsx
===============================================================================

```jsx

import { Outlet } from "react-router-dom";
import GuestNavbar from "./GuestNavbar";
import GuestFooter from "./GuestFooter";

function GuestLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}>
      <GuestNavbar />
      <div style={{ flex: 1,minHeight:"100vh" }}>
        <Outlet />
      </div>
      <div><GuestFooter /></div>
    </div>
  );
}

export default GuestLayout;
```

===============================================================================
FILE: client/src/components/guestlayout/GuestNavbar.jsx
===============================================================================

```jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

function GuestNavbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setOpen(false); // Close mobile menu if resized to desktop
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when a link is clicked (route changes)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
    { to: "/login", label: "Login" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        // When mobile menu is open, we need a solid background so the links are readable.
        // When closed, it reverts to your transparent difference blend mode.
        backgroundColor: open ? "#000000" : "transparent",
        mixBlendMode: open ? "normal" : "difference",
        transition: "background-color 0.3s ease",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <img
              src="./ekalavya.png"
              alt="Ekalavya Logo"
              style={{ height: "40px", borderRadius: 50 }}
            />
            <span
              style={{
                fontSize: "18px",
                fontWeight: "800",
                color: "#ffffff",
              }}
            >
              Ekalavya
            </span>
          </Link>

          {/* --- DESKTOP NAV --- */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    color: isActive(link.to) ? "white" : "#bebebe",
                    fontWeight: isActive(link.to) ? "600" : "400",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) => {
                    if (!isActive(link.to)) e.currentTarget.style.color = "#bebebe";
                  }}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/register"
                style={{
                  marginLeft: "8px",
                  padding: "9px 20px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "700",
                  textDecoration: "none",
                  color: "#000",
                  background: "#fff",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Get Started →
              </Link>

              <div style={{ marginLeft: "12px", display: "flex" }}>
                <ThemeToggle />
              </div>
            </div>
          )}

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <ThemeToggle />
              <button
                onClick={() => setOpen(!open)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#ffffff",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* --- MOBILE DROPDOWN MENU --- */}
        {isMobile && open && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              paddingTop: "12px",
              paddingBottom: "24px",
              borderTop: "1px solid #333333",
            }}
          >
            {[...links].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  color: isActive(link.to) ? "#ffffff" : "#a3a3a3",
                  fontWeight: isActive(link.to) ? "600" : "500",
                  backgroundColor: isActive(link.to) ? "#1a1a1a" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              to="/register"
              style={{
                marginTop: "8px",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "700",
                textDecoration: "none",
                color: "#000",
                background: "#fff",
                textAlign: "center",
              }}
            >
              Get Started →
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default GuestNavbar;
```

===============================================================================
FILE: client/src/components/guestlayout/HeroText.jsx
===============================================================================

```jsx
/**
 * HeroText.jsx
 * WebGL text distortion — JELLY SPRING EDITION v4 (FIXED DIRECTION)
 * 
 * Fixes:
 *  - DIRECTION FIXED: Warp now pulls text IN the direction of movement
 *  - Lowered font weight to 100 (Extra Light)
 *  - Kept the amazing asymmetric jelly bounce logic
 */

import { useEffect, useRef, useCallback } from "react";
import {
  Renderer,
  Camera,
  Transform,
  Program,
  Mesh,
  Texture,
  Triangle,
} from "ogl";

/* ─────────────────────────────────────────────
   GLSL SHADERS
───────────────────────────────────────────── */

const VERTEX = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2      uMouse;       
  uniform vec2      uWarpVec;     
  uniform float     uWarpAmt;     
  uniform float     uTime;
  uniform vec2      uResolution;
  uniform float     uRadius;
  uniform float     uSpringAge;   

  varying vec2 vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
          dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
      mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
          dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
      u.y);
  }

  void main() {
    vec2 uv = vUv;

    float aspect = uResolution.x / uResolution.y;
    vec2  diff   = uv - uMouse;
    diff.x      *= aspect;
    float dist   = length(diff);

    // ── Large soft radial falloff ──
    float falloff = 1.0 - smoothstep(0.0, uRadius, dist);
    falloff = pow(falloff, 1.1); 

    // ── Jelly ripple rings during spring-back ──
    float ringFreq  = 18.0;
    float ringSpeed = 2.2;
    float ring = sin(dist * ringFreq - uSpringAge * ringSpeed) * 0.5 + 0.5;
    float ringStrength = uWarpAmt * falloff * ring * 0.018;
    vec2  ringWarp  = normalize(diff + 1e-5) * ringStrength;

    // ── ✅ FIX: Negate uWarpVec so it pulls WITH the mouse, not pushes against it ──
    vec2 warp = (-uWarpVec) * falloff * 0.09 + ringWarp;

    // ── Chromatic aberration along warp direction ──
    vec2  warpDir = normalize(-uWarpVec + 1e-5);
    vec2  perpDir = vec2(-warpDir.y, warpDir.x);
    float abStr   = uWarpAmt * falloff * 0.028;

    vec2 abR =  warpDir * abStr * 0.9 + perpDir * abStr * 0.2;
    vec2 abB = -warpDir * abStr * 0.9 - perpDir * abStr * 0.2;

    vec4 colR = texture2D(uTexture, uv + warp + abR);
    vec4 colG = texture2D(uTexture, uv + warp);
    vec4 colB = texture2D(uTexture, uv + warp + abB);

    // Glow while warping
    float glow = uWarpAmt * falloff * 0.13;

    gl_FragColor = vec4(
      colR.r + glow * 0.28,
      colG.g + glow * 0.05,
      colB.b + glow * 0.38,
      1.0
    );
  }
`;

/* ─────────────────────────────────────────────
   FONT LOADER
───────────────────────────────────────────── */

let _fontReady   = false;
let _fontPromise = null;

function ensureFont() {
  if (_fontReady)   return Promise.resolve();
  if (_fontPromise) return _fontPromise;
  if (!document.querySelector('link[data-hero-font]')) {
    const link = document.createElement("link");
    link.rel   = "stylesheet";
    link.href  = "https://fonts.googleapis.com/css2?family=Anton&display=swap";
    link.setAttribute("data-hero-font", "1");
    document.head.appendChild(link);
  }
  // ✅ REDUCED FONT WEIGHT TO 100
  _fontPromise = document.fonts
    .load('100 64px Anton')
    .then(() => { _fontReady = true; })
    .catch(() => { _fontReady = true; });
  return _fontPromise;
}

/* ─────────────────────────────────────────────
   TEXT → CANVAS TEXTURE
───────────────────────────────────────────── */

function buildTextCanvas(text, w, h, dpr) {
  const cw = Math.round(w * dpr);
  const ch = Math.round(h * dpr);
  const canvas = document.createElement("canvas");
  canvas.width  = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, cw, ch);
  const fontSize = Math.round(ch * 0.78);
  // ✅ APPLIED 100 WEIGHT TO CANVAS RENDER
  ctx.font         = `100 ${fontSize}px  Impact`;
  ctx.fillStyle    = "#ffffff";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.save();
  const measured = ctx.measureText(text).width;
  const scale    = measured > 0 ? (cw * 0.96) / measured : 1;
  ctx.translate(cw / 2, ch / 2);
  ctx.scale(scale, 1);
  ctx.fillText(text, 0, 0);
  ctx.restore();
  return canvas;
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function HeroText({ text = "EKALAVYA" }) {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);

  const oglRef = useRef({
    renderer: null, scene: null, camera: null,
    mesh: null, program: null, texture: null, raf: null,
  });

  const mouseRef = useRef({
    // Smoothed cursor position
    posX: 0.5, posY: 0.5,
    posTargetX: 0.5, posTargetY: 0.5,

    // Spring warp state — target is always (0,0)
    warpX: 0, warpY: 0,
    warpVx: 0, warpVy: 0,

    // Previous raw position for delta
    prevX: 0.5, prevY: 0.5,
    hasPrev: false,

    // Tracks time since last movement for ripple animation
    springAge: 0,
    isMoving: false,
    lastMoveTime: 0,
  });

  const rebuildTexture = useCallback((w, h, dpr) => {
    const { texture } = oglRef.current;
    if (!texture) return;
    texture.image = buildTextCanvas(text, w, h, dpr);
    texture.needsUpdate = true;
  }, [text]);

  const handleResize = useCallback(() => {
    const { renderer, program } = oglRef.current;
    if (!renderer || !program) return;
    const container = containerRef.current;
    if (!container) return;
    const w   = container.clientWidth;
    const h   = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(w, h);
    program.uniforms.uResolution.value = [w * dpr, h * dpr];
    rebuildTexture(w, h, dpr);
  }, [rebuildTexture]);

  const handleMouseMove = useCallback((e) => {
    const m         = mouseRef.current;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const nx   = (e.clientX - rect.left)  / rect.width;
    const ny   = (e.clientY - rect.top) / rect.height;

    m.posTargetX = nx;
    m.posTargetY = 1.0 - ny;

    if (m.hasPrev) {
      const dx =  (nx - m.prevX) * 10;
      const dy = -(ny - m.prevY) * 10;

      m.warpVx += dx;
      m.warpVy += dy;

      m.springAge   = 0;
      m.isMoving    = true;
      m.lastMoveTime = performance.now();
    }

    m.prevX   = nx;
    m.prevY   = ny;
    m.hasPrev = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.hasPrev  = false;
    mouseRef.current.isMoving = false;
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const t = e.touches[0];
    handleMouseMove({ clientX: t.clientX, clientY: t.clientY });
  }, [handleMouseMove]);

  const startLoop = useCallback(() => {
    const ogl = oglRef.current;

    const tick = (t) => {
      ogl.raf = requestAnimationFrame(tick);
      const m = mouseRef.current;

      m.posX += (m.posTargetX - m.posX) * 0.12;
      m.posY += (m.posTargetY - m.posY) * 0.12;

      const timeSinceMove = performance.now() - m.lastMoveTime;
      if (timeSinceMove > 50) m.isMoving = false;

      let stiffness, damping;
      if (m.isMoving) {
        stiffness = 0.28;
        damping   = 0.72;
      } else {
        stiffness = 0.055;
        damping   = 0.68;
      }

      m.warpVx += (0 - m.warpX) * stiffness;
      m.warpVy += (0 - m.warpY) * stiffness;
      m.warpVx *= damping;
      m.warpVy *= damping;
      m.warpX  += m.warpVx;
      m.warpY  += m.warpVy;

      if (!m.isMoving) m.springAge += 0.06;
      else m.springAge = 0;

      const warpAmt = Math.min(
        Math.sqrt(m.warpX * m.warpX + m.warpY * m.warpY),
        1.0
      );

      const { program, renderer, scene, camera } = ogl;
      if (!program) return;

      program.uniforms.uMouse.value     = [m.posX, m.posY];
      program.uniforms.uWarpVec.value   = [m.warpX, m.warpY];
      program.uniforms.uWarpAmt.value   = warpAmt;
      program.uniforms.uTime.value      = t * 0.001;
      program.uniforms.uSpringAge.value = m.springAge;

      renderer.render({ scene, camera });
    };

    ogl.raf = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let destroyed = false;

    ensureFont().then(() => {
      if (destroyed) return;
      const w   = container.clientWidth;
      const h   = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);

      const renderer = new Renderer({
        canvas: canvasRef.current, width: w, height: h,
        dpr, alpha: false, antialias: false,
      });
      const gl = renderer.gl;
      gl.clearColor(0.047, 0.337, 0.82, 1);

      const scene    = new Transform();
      const camera   = new Camera(gl);
      camera.position.z = 1;
      const geometry = new Triangle(gl);

      const tc      = buildTextCanvas(text, w, h, dpr);
      const texture = new Texture(gl, {
        image: tc, generateMipmaps: false,
        minFilter: gl.LINEAR, magFilter: gl.LINEAR,
        wrapS: gl.CLAMP_TO_EDGE, wrapT: gl.CLAMP_TO_EDGE,
      });

      const program = new Program(gl, {
        vertex: VERTEX, fragment: FRAGMENT,
        uniforms: {
          uTexture    : { value: texture },
          uMouse      : { value: [0.5, 0.5] },
          uWarpVec    : { value: [0, 0] },
          uWarpAmt    : { value: 0 },
          uTime       : { value: 0 },
          uResolution : { value: [w * dpr, h * dpr] },
          uRadius     : { value: 0.55 },   
          uSpringAge  : { value: 0 },
        },
        transparent: false,
      });

      const mesh = new Mesh(gl, { geometry, program });
      mesh.setParent(scene);

      oglRef.current = { renderer, scene, camera, mesh, program, texture, raf: null };
      startLoop();

      window.addEventListener("resize",       handleResize,     { passive: true });
      container.addEventListener("mousemove",  handleMouseMove,  { passive: true });
      container.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      container.addEventListener("touchmove",  handleTouchMove,  { passive: false });
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(oglRef.current.raf);
      window.removeEventListener("resize", handleResize);
      const c = containerRef.current;
      if (c) {
        c.removeEventListener("mousemove",  handleMouseMove);
        c.removeEventListener("mouseleave", handleMouseLeave);
        c.removeEventListener("touchmove",  handleTouchMove);
      }
      try {
        oglRef.current.renderer?.gl
          ?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch (_) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !oglRef.current.texture) return;
    ensureFont().then(() => {
      const w   = container.clientWidth;
      const h   = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      rebuildTexture(w, h, dpr);
    });
  }, [text, rebuildTexture]);

  return (
    <div
      ref={containerRef}
      style={{
        position  : "relative",
        width     : "100vw",
        height    : "100vh",
        overflow  : "hidden",
        background: "#111111",
        cursor    : "none",
      }}
      onMouseMove={(e) => {
        const el   = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const dot  = el.querySelector("[data-cursor]");
        if (dot) {
          dot.style.left = (e.clientX - rect.left) + "px";
          dot.style.top  = (e.clientY - rect.top)  + "px";
        }
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", touchAction: "none" }}
      />
      <div
        data-cursor
        style={{
          position     : "absolute",
          top          : 0,
          left         : 0,
          width        : "8px",
          height       : "8px",
          borderRadius : "50%",
          background   : "rgba(255,255,255,0.6)",
          pointerEvents: "none",
          transform    : "translate(-50%,-50%)",
          mixBlendMode : "difference",
          zIndex       : 10,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
```

===============================================================================
FILE: client/src/components/guestlayout/Home.jsx
===============================================================================

```jsx
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Contact from "./Contact";
import EkalavyaHScroll from "./EkalavyaHScroll";
import About from "./About";


const LEFT_THUMBS = [
  {
    id: 1,
    src: "https://media.istockphoto.com/id/2004420404/video/watching-online-video-conference-meeting.mp4?s=mp4-640x640-is&k=20&c=F9ZJ3CLdXER1I0NIUcexikm0VCe6ABvcC6ieFMibmjY=",
    style: {
      top: "5%",
      left: "22%",
      width: "13%",
      aspectRatio: "3/4",
    },
  },
  {
    id: 2,
    src: "https://media.istockphoto.com/id/2205643620/video/young-woman-learns-mathematics-online-at-home.mp4?s=mp4-640x640-is&k=20&c=O1fnh4PCk_dT7PGPVTEFdPTWlOuY-mnwMoN38xrA58U=",
    style: {
      top: "38%",
      left: "10%",
      width: "14%",
      aspectRatio: "4/3",
    },
  },
  {
    id: 3,
    src: "https://media.istockphoto.com/id/2170364413/video/futuristic-laboratory-patient-wearing-headset-research-shows-brain-activity-during-scanning.mp4?s=mp4-640x640-is&k=20&c=P2WKiYo3mATRNndlGQetvOdQRRrGT4RiFzKkc01O8zc=",
    style: {
      bottom: "8%",
      left: "15%",
      width: "11%",
      aspectRatio: "4/3",
    },
  },
];

const RIGHT_THUMBS = [
  {
    id: 4,
    src: "https://media.istockphoto.com/id/1293858390/video/girl-control-robot-arm-on-digital-tablet-getting-a-lesson-in-robotics-in-high-school.mp4?s=mp4-640x640-is&k=20&c=rQgt81jQQ872WeDoCKmGVmQSWnBIaF2bdFXIfG15UQ0=",
    style: {
      top: "10%",
      right: "12%",
      width: "20%",
      aspectRatio: "16/9",
    },
  },
  {
    id: 5,
    src: "https://media.istockphoto.com/id/2161467517/video/satisfaction-document-checklist-database-contract-checkbox-insurance-manager-technology.mp4?s=mp4-640x640-is&k=20&c=gnNqY6yOp39PT9CxuoqDlMkQtzxfHHHMi4703LZ7ZQc=",
    style: {
      top: "38%",
      right: "8%",
      width: "18%",
      aspectRatio: "4/3",
    },
  },
];

const BOTTOM_CENTER_THUMBS = [
  {
    id: 6,
    src: "https://res.cloudinary.com/dhcb4ivxo/video/upload/v1782371427/15360535_1920_1080_100fps_qasggr.mp4",
    style: {
      bottom: "0%",
      left: "50%",
      width: "25%",
      height: "38%",
      transform: "translateX(-50%)",
      transformOrigin: "bottom center",
      borderRadius: "5px",
      zIndex: 1,
    },
  },
];

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function Home() {
  const sectionRef = useRef(null);
  const heroTextRef = useRef(null);
  const overlayRef = useRef(null);

  const leftThumbRefs = useRef([]);
  const rightThumbRefs = useRef([]);
  const centerThumbRefs = useRef([]);

  // Keep a ref to lenis scroll value so the animation callback can read it
  const lenisScrollY = useRef(0);

  useEffect(() => {
    // ── 1. Init Lenis ──────────────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    // ── 2. Keep lenisScrollY in sync ───────────────────────────────────────────
    lenis.on("scroll", ({ scroll }) => {
      lenisScrollY.current = scroll;
    });

    // ── 3. Animation updater (reads Lenis scroll, not window.scrollY) ──────────
    const updateAnimation = () => {
      const progress = Math.min(
        Math.max(lenisScrollY.current / (window.innerHeight * 0.8), 0),
        1
      );
      const e = easeInOut(progress);

      // TEXT FADE
      if (heroTextRef.current) {
        heroTextRef.current.style.opacity = Math.max(0, 1 - progress * 4);
        heroTextRef.current.style.transform = `translateY(${e * 40}px)`;
      }

      // OVERLAY
      if (overlayRef.current) {
        overlayRef.current.style.background = `rgba(0,0,0,${e * 0.35})`;
      }

      // LEFT THUMBS
      leftThumbRefs.current.forEach((el, i) => {
        if (!el) return;
        const delay = i * 0.05;
        const p = Math.min(1, Math.max(0, (progress - delay) / 0.45));
        const ep = easeInOut(p);
        el.style.transform = `translateX(${-150 * ep}%) scale(${1 - ep * 0.08})`;
        el.style.opacity = 1 - ep;
        el.style.filter = `blur(${25 * ep}px)`;
      });

      // RIGHT THUMBS
      rightThumbRefs.current.forEach((el, i) => {
        if (!el) return;
        const delay = i * 0.05;
        const p = Math.min(1, Math.max(0, (progress - delay) / 0.45));
        const ep = easeInOut(p);
        el.style.transform = `translateX(${150 * ep}%) scale(${1 - ep * 0.08})`;
        el.style.opacity = 1 - ep;
        el.style.filter = `blur(${25 * ep}px)`;
      });

      // BOTTOM CENTER THUMB
      centerThumbRefs.current.forEach((el) => {
        if (!el) return;
        const startW = 25;
        const startH = 38;
        const width = startW + (100 - startW) * e;
        const height = startH + (100 - startH) * e;
        el.style.width = `${width}%`;
        el.style.height = `${height}%`;
        el.style.borderRadius = "5px";
      });
    };

    // ── 4. RAF loop — drives both Lenis and our animation ─────────────────────
    let rafId;
    const raf = (time) => {
      lenis.raf(time);       // advance Lenis
      updateAnimation();     // sync scroll-driven animation
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // ── 5. Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "170vh",
        background: "var(--bg-main)",
        transition: "background 0.4s ease",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* DARK OVERLAY */}
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--bg-main)",
            transition: "background 0.4s ease",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        {/* TEXT */}
        <div
          ref={heroTextRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 4,
            pointerEvents: "none",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(32px,5vw,85px)",
              fontWeight: 300,
              color: "var(--text-main)",
              transition: "background 0.4s ease",
              margin: 0,
              fontFamily: "Georgia, serif",
              mixBlendMode: "difference",
            }}
          >
            No Student Left Behind.
          </h1>

          <p
            style={{
              color: "var(--text-main)",
              marginTop: "18px",
              fontSize: "15px",
              letterSpacing: "1px",
            }}
          >
            Access every university note, every course, and every semester—all in one place.
          </p>
        </div>

        {/* LEFT THUMBNAILS */}
        {LEFT_THUMBS.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (leftThumbRefs.current[i] = el)}
            style={{
              position: "absolute",
              overflow: "hidden",
              borderRadius: "5px",
              zIndex: 1,
              ...item.style,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          </div>
        ))}

        {/* RIGHT THUMBNAILS */}
        {RIGHT_THUMBS.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (rightThumbRefs.current[i] = el)}
            style={{
              position: "absolute",
              overflow: "hidden",
              borderRadius: "5px",
              zIndex: 1,
              ...item.style,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          </div>
        ))}

        {/* BOTTOM CENTER THUMBNAIL */}
        {BOTTOM_CENTER_THUMBS.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (centerThumbRefs.current[i] = el)}
            style={{
              position: "absolute",
              overflow: "hidden",
              zIndex: 1,
              ...item.style,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
      {/* <Services/> */}
      <div style={{marginTop:"10vh"}}>
        <EkalavyaHScroll/>
      </div>
      <About/>
      <Contact/>
    </section>
    
  );
}
```

===============================================================================
FILE: client/src/components/guestlayout/Login.jsx
===============================================================================

```jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../axiosConfig";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) { setError("Email and password are required."); return; }
    setError(""); setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      console.log(res);
      navigate(res.data.user.role === "admin" ? "/admin" : "/dashboard");
      console.log(res);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally { setLoading(false); }
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid var(--border)", backgroundColor: "var(--bg-input)", color: "var(--text-main)", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", backgroundColor: "var(--bg-main)" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "8px" }}>Welcome back</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Login to your account to continue</p>
        </div>
        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px", padding: "40px" }}>
          {error && <div style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", padding: "12px 16px", borderRadius: "10px", marginBottom: "24px", fontSize: "14px" }}>⚠️ {error}</div>}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)" }}>Email address</label>
              <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)" }}>Password</label>
              <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
            </div>
            <button type="submit" disabled={loading}
              style={{ padding: "14px", borderRadius: "10px", border: "none", cursor: "pointer", backgroundColor: "var(--primary)", color: "#fff", fontWeight: "700", fontSize: "15px", opacity: loading ? 0.6 : 1, transition: "background 0.2s" }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>
          <p style={{ fontSize: "13px", color: "var(--text-faint)", textAlign: "center", marginTop: "24px" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>Create one</Link>
          </p>
          <div style={{ display: "flex", justifyContent: "center",marginTop:"10px" }}>
            <Link to="/forgot-password" style={{ fontSize: "12px", color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>
              Forgot password?
            </Link>
          </div>
          <div style={{ display: "flex", justifyContent: "center",marginTop:"10px" }}>
            <Link to="/faculty-login" style={{ fontSize: "12px", color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>
              Are you a Faculty?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
```

===============================================================================
FILE: client/src/components/guestlayout/NotFound.jsx
===============================================================================

```jsx

import { Link, useLocation } from "react-router-dom";

function NotFound() {
  const location = useLocation();
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "48px 24px", backgroundColor: "var(--bg-main)" }}>
      <p style={{ fontSize: "120px", fontWeight: "900", color: "var(--border)", lineHeight: 1, margin: 0, userSelect: "none" }}>404</p>
      <div style={{ marginTop: "-24px", position: "relative", zIndex: 1 }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "12px" }}>Page not found</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "8px" }}>
          The page{" "}
          <code style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: "6px", fontSize: "13px" }}>
            {location.pathname}
          </code>{" "}
          does not exist.
        </p>
        <p style={{ color: "var(--text-faint)", fontSize: "13px", marginBottom: "32px" }}>It may have been moved, deleted, or the URL is incorrect.</p>
        <Link to="/"
          style={{ display: "inline-block", padding: "12px 28px", borderRadius: "10px", textDecoration: "none", backgroundColor: "var(--primary)", color: "#fff", fontWeight: "700", fontSize: "14px", transition: "background 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
```

===============================================================================
FILE: client/src/components/guestlayout/Register.jsx
===============================================================================

```jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../axiosConfig";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    university: "",
    course: "",
    semester: "",
  });


  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };


  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    backgroundColor: "var(--bg-input)",
    color: "var(--text-main)",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        backgroundColor: "var(--bg-main)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "900",
              color: "var(--text-main)",
              marginBottom: "8px",
            }}
          >
            Create account
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Get started for free today
          </p>
        </div>
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "40px",
          }}
        >
          {error && (
            <div
              style={{
                backgroundColor: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#ef4444",
                padding: "12px 16px",
                borderRadius: "10px",
                marginBottom: "24px",
                fontSize: "14px",
              }}
            >
              ⚠️ {error}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {[
              {
                name: "name",
                type: "text",
                placeholder: "John Doe",
                label: "Full name",
              },
              {
                name: "email",
                type: "email",
                placeholder: "you@example.com",
                label: "Email address",
              },
              {
                name: "password",
                type: "password",
                placeholder: "••••••••",
                label: "Password",
              },
            ].map((field) => (
              <div
                key={field.name}
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "var(--text-muted)",
                  }}
                >
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--primary)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            ))}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label>University</label>
              <input
                type="text"
                name="university"
                placeholder="Enter your university"
                value={form.university}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label>Course</label>
              <input
                type="text"
                name="course"
                placeholder="Enter your course"
                value={form.course}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label>Semester</label>
              <input
                type="number"
                name="semester"
                placeholder="Enter your semester"
                min="1"
                max="20"
                value={form.semester}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "var(--primary)",
                color: "#fff",
                fontWeight: "700",
                fontSize: "15px",
                opacity: loading ? 0.6 : 1,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                !loading &&
                (e.currentTarget.style.backgroundColor = "var(--primary-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primary)")
              }
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-faint)",
              textAlign: "center",
              marginTop: "24px",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "var(--primary)",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Login
            </Link>
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-faint)",
              textAlign: "center",
              marginTop: "24px",
            }}
          >
            Are you a Faculty?{" "}
            <Link
              to="/faculty-register"
              style={{
                color: "var(--primary)",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Register For Faculty
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
```

===============================================================================
FILE: client/src/components/guestlayout/Services.jsx
===============================================================================

```jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

const services = [
  {
    id: 1,
    title: "University-Wise Learning",
    subtitle: "Notes tailored for your university",
    image:
      "./college1.png",
    color: "#4F46E5",
    marqueeA: "UNIVERSITY SPECIFIC · SMART LEARNING ·",
    marqueeB: "All Universities · One Platform ·",
  },
  {
    id: 2,
    title: "Chapter Wise Notes",
    subtitle: "Understand one concept at a time",
    image:
      "./college2.png",
    color: "#06B6D4",
    marqueeA: "CHAPTER NOTES · EASY LEARNING ·",
    marqueeB: "Learn Better · Study Faster ·",
  },
  {
    id: 3,
    title: "Semester & Subject Materials",
    subtitle: "Complete syllabus in one place",
    image:
      "./college3.png",
    color: "#22C55E",
    marqueeA: "EVERY SUBJECT · EVERY SEMESTER ·",
    marqueeB: "Complete Coverage · Better Results ·",
  },
  {
    id: 4,
    title: "Faculty Verified Content",
    subtitle: "Prepared and reviewed by educators",
    image:
      "./college5.png",
    color: "#F97316",
    marqueeA: "TRUSTED NOTES · FACULTY VERIFIED ·",
    marqueeB: "Quality Learning · Expert Guidance ·",
  },
  {
    id: 5,
    title: "Previous Year Question Papers",
    subtitle: "Practice with real exam papers",
    image:
      "./college5.png",
    color: "#EC4899",
    marqueeA: "EXAM READY · PRACTICE MORE ·",
    marqueeB: "Previous Papers · Higher Scores ·",
  },
  {
    id: 6,
    title: "Education for Every Student",
    subtitle: "Bridging the gap between rural talent and quality education",
    image:
      "./school2.jpg",
    color: "#EAB308",
    marqueeA: "NO STUDENT LEFT BEHIND · DIGITAL EDUCATION ·",
    marqueeB: "Rural Students · Equal Opportunities ·",
  },
];

const REPS = 3;
const SET = services.length;
const allItems = Array.from({ length: REPS }, () => services).flat();

export default function Services() {
  const containerRef = useRef(null);
  const imgRefs = useRef([]);
  const mqScaleRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const vh = window.innerHeight;
    const singleSetHeight = SET * 2 * vh;

    container.scrollTop = singleSetHeight;

    const onScroll = () => {
      const scrollTop = container.scrollTop;

      if (scrollTop >= singleSetHeight * 2) {
        container.scrollTop = singleSetHeight;
        return;
      }
      if (scrollTop <= 0) {
        container.scrollTop = singleSetHeight;
        return;
      }

      imgRefs.current.forEach((img, i) => {
        if (!img) return;

        const panelTop = i * 2 * vh;
        const rel = scrollTop - panelTop;

        const progress = (rel + vh) / (vh * 2);
        const centered = Math.max(0, 1 - Math.abs(progress - 0.5) * 2);

        const scale = 1 + centered * 0.18;          // 1 -> 1.18
        const saturation = 0.1 + centered * 1;    // 0.7 (70%) -> 1.3 (130%)

        gsap.set(img, {
          y: rel * 0.35,
          scale,
          filter: `saturate(${saturation})`,
        });
      });

      mqScaleRefs.current.forEach((el, i) => {
        if (!el) return;
        const panelTop = (i * 2 + 1) * vh;
        const rel = scrollTop - panelTop;
        const progress = (rel + vh) / (vh * 2);
        const centered = Math.max(0, 1 - Math.abs(progress - 0.5) * 2);
        const scale = 0.5 + centered * 0.55;
        const opacity = 0.15 + centered * 0.85;
        gsap.set(el, { scale, opacity });
      });
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{CSS}</style>


      <div className="svc-container" ref={containerRef}>
        {allItems.map((service, i) => {
          const localIdx = i % SET;
          return [
            <div key={"img" + i} className="svc-panel svc-panel--image">
              <div className="svc-bg-wrap">
                <div
                  className="svc-bg"
                  ref={(el) => (imgRefs.current[i] = el)}
                  style={{ backgroundImage: `url(${service.image})` }}
                />
              </div>
              <div
                className="svc-overlay"
                style={{
                  background: `linear-gradient(
                    155deg,
                    ${service.color}55 0%,
                    rgba(4,4,10,0.40) 45%,
                    rgba(4,4,10,0.92) 100%
                  )`,
                }}
              />
              <div className="svc-img-text">
                <span className="svc-img-index">
                  {String(localIdx + 1).padStart(2, "0")} /{" "}
                  {String(SET).padStart(2, "0")}
                </span>
                <h2 className="svc-img-title">{service.title}</h2>
                <p className="svc-img-sub">{service.subtitle}</p>
              </div>
            </div>,

            <div key={"mq" + i} className="svc-panel svc-panel--marquee">
              <div
                className="svc-mq-line svc-mq-line--top"
                style={{ background: service.color }}
              />
              <div
                className="svc-mq-line svc-mq-line--bot"
                style={{ background: service.color }}
              />

              <div
                className="svc-mq-scale"
                ref={(el) => (mqScaleRefs.current[i] = el)}
              >
                <div className="svc-mq-row">
                  <div className="svc-mq-track svc-mq-track--ltr">
                    {[0, 1].map((r) => (
                      <span key={r} className="svc-mq-text svc-mq-text--sans">
                        {Array(18)
                          .fill(service.marqueeA)
                          .join("  ")}
                        &ensp;
                      </span>
                    ))}
                  </div>
                </div>

                <div className="svc-mq-row">
                  <div className="svc-mq-track svc-mq-track--rtl">
                    {[0, 1].map((r) => (
                      <span
                        key={r}
                        className="svc-mq-text svc-mq-text--script"
                      >
                        {Array(18)
                          .fill(service.marqueeB)
                          .join("  ")}
                        &ensp;
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>,
          ];
        })}
      </div>
    </>
  );
}

/* ─────────────────────────── CSS ─────────────────────────── */
const CSS = `

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Syne:wght@800&family=Dancing+Script:wght@700&display=swap');
:root {
  --primary:       #f5ad42;
  --primary-hover: #db9c3e;
  --primary-light: #ecfdf5;
  --primary-text:  #f5ad42;

  --bg-main:      #FFF8E1;
  --bg-secondary: #f9fafb;
  --bg-card:      #ffffff;
  --bg-input:     #f9fafb;
  --bg-nav:       rgba(255,255,255,0.92);
  --text-main:    #111827;
  --text-muted:   #6b7280;
  --text-faint:   #9ca3af;
  --border:       #e5e7eb;
  --border-hover: #d1d5db;
  --shadow:       0 8px 32px rgba(0,0,0,0.08);
}

[data-theme="dark"] {
  --bg-main:      #0f0f0f;
  --bg-secondary: #111111;
  --bg-card:      #1a1a1a;
  --bg-input:     #111111;
  --bg-nav:       rgba(15,15,15,0.92);
  --text-main:    #ffffff;
  --text-muted:   #9ca3af;
  --text-faint:   #6b7280;
  --border:       rgba(255,255,255,0.1);
  --border-hover: rgba(255,255,255,0.2);
  --shadow:       0 8px 32px rgba(0,0,0,0.4);
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Syne:wght@800&family=Dancing+Script:wght@700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── corner label ── */
.svc-label {
  position: fixed;
  top: 28px;
  left: 36px;
  z-index: 200;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 3px;
  pointer-events: none;
}
.svc-label-brand {
  font-size: 0.65rem;
  letter-spacing: 4px;
  font-weight: 700;
  color: var(--text-main);
  text-transform: uppercase;
}
.svc-label-sub {
  font-size: 0.6rem;
  letter-spacing: 3px;
  color: var(--text-muted);
  text-transform: uppercase;
}

/* ── scroll container ── */
.svc-container {
  position: fixed;
  inset: 0;
  overflow-y: scroll;
  scroll-behavior: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.svc-container::-webkit-scrollbar { display: none; }

/* ── every panel = full viewport ── */
.svc-panel {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* ════════════════ IMAGE PANEL ════════════════ */
.svc-panel--image { background: var(--bg-main); }

.svc-bg-wrap {
  position: absolute;
  inset: 0;
}
/* 140% tall so parallax movement never reveals edges */
.svc-bg {
  position: absolute;
  top: -20%;
  left: 0;
  width: 100%;
  height: 140%;
  background-size: cover;
  background-position: center;

  will-change: transform, filter;
  transform-origin: center center;

  filter: saturate(70%);
  transform: scale(1);
}
.svc-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.svc-img-text {
  position: absolute;
  z-index: 2;
  bottom: 60px;
  left: 7vw;
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
}
.svc-img-index {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 3px;
  color: white;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.svc-img-title {
  font-family: Georgia;
  font-size: clamp(2.6rem, 5.5vw, 5.8rem);
  font-weight: 800;
  line-height: 0.96;
  letter-spacing: -0.035em;
  margin-bottom: 16px;
}
.svc-img-sub {
  font-size: 1.05rem;
  color: rgb(233, 233, 233);
  letter-spacing: 0.03em;
  font-weight: 400;
}

/* ════════════════ MARQUEE PANEL ════════════════ */
.svc-panel--marquee {
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Thin accent lines top & bottom */
.svc-mq-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1.5px;
  opacity: 0.22;
  z-index: 1;
}
.svc-mq-line--top { top: 0; }
.svc-mq-line--bot { bottom: 0; }

/* GSAP targets this: scale + opacity */
.svc-mq-scale {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  will-change: transform, opacity;
  transform-origin: center center;
  /* start small, GSAP will animate to full size */
  transform: scale(0.5);
  opacity: 0.15;
}

/* Row container */
.svc-mq-row {
  width: 100%;

  line-height: 1;
}

/* Scrolling track — now much longer to avoid gaps when scaled */
.svc-mq-track {
  display: flex;
  width: max-content;
  white-space: nowrap;
}
.svc-mq-track--ltr {
  animation: mq-ltr 110s linear infinite;
}
.svc-mq-track--rtl {
  animation: mq-rtl 90s linear infinite;
}
@keyframes mq-ltr {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes mq-rtl {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

/* Text */
.svc-mq-text {
  display: inline-block;
  flex-shrink: 0;
}
.svc-mq-text--sans {
  font-family: Georgia, sans-serif;
  font-size: clamp(4.5rem, 11vw, 11.5rem);
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.04em;
  text-transform: uppercase;
  line-height: 1;
  padding-right: 0.1em;
}
.svc-mq-text--script {
  font-family: 'Dancing Script';
  font-size: clamp(4rem, 9.5vw, 10rem);
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: 0;
  line-height: 1.1;
  padding-right: 0.1em;
}

/* ── mobile ── */
@media (max-width: 600px) {
  .svc-img-text { bottom: 36px; left: 22px; }
  .svc-label { top: 18px; left: 18px; }
  .svc-mq-text--sans { font-size: clamp(3rem, 13vw, 5rem); }
  .svc-mq-text--script { font-size: clamp(2.6rem, 11vw, 4.5rem); }
}
`;
```

===============================================================================
FILE: client/src/components/ThemeToggle.jsx
===============================================================================

```jsx

import { useTheme } from "../context/ThemeContext";
import { CiLight } from "react-icons/ci";
import {  MdOutlineDarkMode } from "react-icons/md";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      title="Toggle theme"
      style={{  border: "2px solid var(--border)", borderRadius: "50%", color: "var(--text-muted)", cursor: "pointer", padding: "10px 10px", fontSize: "16px", lineHeight: 1, transition: "all 0.2s" }}
    >
      {theme === "dark" ? <CiLight /> : <MdOutlineDarkMode />

}
    </button>
  );
}

export default ThemeToggle;
```

===============================================================================
FILE: client/src/components/userlayout/FeedbackForm.jsx
===============================================================================

```jsx

import { useState } from "react";
import API from "../../axiosConfig";

function FeedbackForm() {
  const [form, setForm] = useState({ message: "", rating: 0 });
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.rating === 0) { setError("Please select a rating."); return; }
    setError(""); setLoading(true);
    try {
      await API.post("/feedback", form);
      setSuccess(true);
      setForm({ message: "", rating: 0 });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "8px" }}>Submit Feedback</h1>
        <p style={{ color: "var(--text-muted)" }}>Share your experience and help us improve.</p>
      </div>
      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px", padding: "36px" }}>
        {success && <div style={{ backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981", padding: "12px 16px", borderRadius: "10px", marginBottom: "24px", fontSize: "14px" }}>✅ Feedback submitted! Thank you.</div>}
        {error && <div style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", padding: "12px 16px", borderRadius: "10px", marginBottom: "24px", fontSize: "14px" }}>⚠️ {error}</div>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "12px" }}>Rate your experience</label>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button"
                  onClick={() => setForm({ ...form, rating: star })}
                  onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
                  style={{ fontSize: "32px", background: "none", border: "none", cursor: "pointer", color: star <= (hover || form.rating) ? "#facc15" : "var(--border)", transition: "color 0.15s" }}
                >★</button>
              ))}
              {form.rating > 0 && <span style={{ fontSize: "13px", color: "var(--text-muted)", marginLeft: "8px" }}>{ratingLabels[form.rating]}</span>}
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px" }}>Your feedback</label>
            <textarea rows={5} placeholder="Tell us about your experience..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required
              style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid var(--border)", backgroundColor: "var(--bg-input)", color: "var(--text-main)", fontSize: "14px", outline: "none", resize: "none", boxSizing: "border-box" }}
              onFocus={(e) => (e.target.style.borderColor = "var(--primary)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
          </div>
          <button type="submit" disabled={loading}
            style={{ alignSelf: "flex-start", padding: "12px 32px", borderRadius: "10px", border: "none", cursor: "pointer", backgroundColor: "var(--primary)", color: "#fff", fontWeight: "700", fontSize: "15px", opacity: loading ? 0.6 : 1 }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
          >
            {loading ? "Submitting..." : "Submit Feedback →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
```

===============================================================================
FILE: client/src/components/userlayout/Profile.jsx
===============================================================================

```jsx

import { useEffect, useState } from "react";
import API from "../../axiosConfig";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);
  const [nameForm, setNameForm] = useState({ name: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });
  const [picMsg, setPicMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    API.get("/auth/me").then((r) => { setUser(r.data); setNameForm({ name: r.data.name }); })
      .catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!nameForm.name.trim()) { setProfileMsg({ type: "error", text: "Name is required." }); return; }
    setSaving(true); setProfileMsg({ type: "", text: "" });
    try {
      const res = await API.put("/auth/profile", { name: nameForm.name, email: user.email });
      setUser(res.data.user);
      setProfileMsg({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setProfileMsg({ type: "error", text: err.response?.data?.message || "Failed to update." });
    } finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword || !newPassword || !confirmPassword) { setPasswordMsg({ type: "error", text: "All fields are required." }); return; }
    if (newPassword.length < 8) { setPasswordMsg({ type: "error", text: "Min 8 characters." }); return; }
    if (newPassword !== confirmPassword) { setPasswordMsg({ type: "error", text: "Passwords do not match." }); return; }
    setChangingPassword(true); setPasswordMsg({ type: "", text: "" });
    try {
      await API.put("/auth/change-password", { currentPassword, newPassword });
      setPasswordMsg({ type: "success", text: "Password changed successfully." });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordMsg({ type: "error", text: err.response?.data?.message || "Failed to change password." });
    } finally { setChangingPassword(false); }
  };

  
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setPicMsg({ type: "error", text: "JPG, PNG or WEBP only." }); return; }
    if (file.size > 5 * 1024 * 1024) { setPicMsg({ type: "error", text: "Max 5MB." }); return; }
    const formData = new FormData();
    formData.append("profilePic", file);
    setUploadingPic(true); setPicMsg({ type: "", text: "" });
    try {
      const res = await API.put("/auth/profile-pic", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setUser(res.data.user);
      setPicMsg({ type: "success", text: "Profile picture updated." });
    } catch (err) {
      setPicMsg({ type: "error", text: err.response?.data?.message || "Upload failed." });
    } finally { setUploadingPic(false); }
  };
  

  const msgStyle = (type) => ({
    padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", fontSize: "14px",
    backgroundColor: type === "success" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
    border: `1px solid ${type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
    color: type === "success" ? "#10b981" : "#ef4444",
  });

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid var(--border)", backgroundColor: "var(--bg-input)", color: "var(--text-main)", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };
  const cardStyle = { backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px", padding: "36px", marginBottom: "24px" };

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", border: "4px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px" }}>

      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
        
        <div style={{ position: "relative" }}>
          {user?.profilePic ? (
            <img src={user.profilePic} alt="Profile" style={{ width: "72px", height: "72px", borderRadius: "18px", objectFit: "cover", border: "2px solid var(--border)" }} />
          ) : (
            <div style={{ width: "72px", height: "72px", backgroundColor: "var(--primary)", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "22px", fontWeight: "900" }}>{initials}</div>
          )}
          <label htmlFor="picInput" style={{ position: "absolute", bottom: "-4px", right: "-4px", width: "26px", height: "26px", backgroundColor: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
          >
            <svg style={{ width: "12px", height: "12px", color: "#fff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2.414a2 2 0 01.586-1.414z" />
            </svg>
          </label>
          <input id="picInput" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleProfilePicChange} style={{ display: "none" }} />
        </div>
        
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "4px" }}>{user?.name}</h1>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>
            {user?.email} ·{" "}
            <span style={{ color: "var(--primary)", fontWeight: "600", textTransform: "capitalize" }}>{user?.role}</span>
          </p>
          
          {uploadingPic && <p style={{ fontSize: "12px", color: "var(--primary)", marginTop: "6px" }}>Uploading...</p>}
          {picMsg.text && <p style={{ fontSize: "12px", marginTop: "6px", color: picMsg.type === "success" ? "#10b981" : "#ef4444" }}>{picMsg.text}</p>}
          
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: "17px", fontWeight: "800", color: "var(--text-main)", marginBottom: "6px" }}>Personal Information</h2>
        <p style={{ fontSize: "13px", color: "var(--text-faint)", marginBottom: "24px" }}>Update your name. Email cannot be changed.</p>
        {profileMsg.text && <div style={msgStyle(profileMsg.type)}>{profileMsg.type === "success" ? "✅" : "⚠️"} {profileMsg.text}</div>}
        <form onSubmit={handleProfileSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)" }}>Full name</label>
            <input value={nameForm.name} onChange={(e) => setNameForm({ name: e.target.value })} placeholder="John Doe" required style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "var(--primary)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)" }}>Email <span style={{ color: "var(--text-faint)", fontWeight: "400" }}>(cannot be changed)</span></label>
            <input value={user?.email} disabled style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)" }}>Role</label>
            <span style={{ display: "inline-block", padding: "4px 14px", backgroundColor: "var(--primary-light)", color: "var(--primary)", fontSize: "12px", fontWeight: "700", borderRadius: "999px", textTransform: "capitalize", alignSelf: "flex-start" }}>{user?.role}</span>
          </div>
          <button type="submit" disabled={saving}
            style={{ alignSelf: "flex-start", padding: "11px 28px", borderRadius: "10px", border: "none", cursor: "pointer", backgroundColor: "var(--primary)", color: "#fff", fontWeight: "700", fontSize: "14px", opacity: saving ? 0.6 : 1 }}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: "17px", fontWeight: "800", color: "var(--text-main)", marginBottom: "6px" }}>Change Password</h2>
        <p style={{ fontSize: "13px", color: "var(--text-faint)", marginBottom: "24px" }}>Must be at least 8 characters.</p>
        {passwordMsg.text && <div style={msgStyle(passwordMsg.type)}>{passwordMsg.type === "success" ? "✅" : "⚠️"} {passwordMsg.text}</div>}
        <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {[
            { field: "current", label: "Current password", key: "currentPassword" },
            { field: "new", label: "New password", key: "newPassword" },
            { field: "confirm", label: "Confirm new password", key: "confirmPassword" },
          ].map(({ field, label, key }) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)" }}>{label}</label>
              <div style={{ position: "relative" }}>
                <input type={showPasswords[field] ? "text" : "password"} value={passwordForm[key]}
                  onChange={(e) => setPasswordForm({ ...passwordForm, [key]: e.target.value })} placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: "60px" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--primary)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
                <button type="button" onClick={() => setShowPasswords((p) => ({ ...p, [field]: !p[field] }))}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "600", color: "var(--text-faint)" }}>
                  {showPasswords[field] ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          ))}
          <button type="submit" disabled={changingPassword}
            style={{ alignSelf: "flex-start", padding: "11px 28px", borderRadius: "10px", cursor: "pointer", backgroundColor: "var(--bg-secondary)", color: "var(--text-main)", border: "1px solid var(--border)", fontWeight: "700", fontSize: "14px", opacity: changingPassword ? 0.6 : 1 }}>
            {changingPassword ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>

    </div>
  );
}

export default Profile;
```

===============================================================================
FILE: client/src/components/userlayout/StudentNotes.jsx
===============================================================================

```jsx
import { useEffect, useMemo, useState } from "react";
import API from "../../axiosConfig";

export default function StudentNotes() {
  // ============================================================
  // ACADEMIC DATA
  // ============================================================

  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);

  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const [academicLoading, setAcademicLoading] = useState(true);
  const [courseLoading, setCourseLoading] = useState(false);

  // ============================================================
  // NOTES
  // ============================================================

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeNote, setActiveNote] = useState(null);

  const [search, setSearch] = useState("");
  const [activeSubject, setActiveSubject] = useState("all");

  // ============================================================
  // RESPONSIVE
  // ============================================================

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [mobileView, setMobileView] = useState("list");

  // ============================================================
  // FETCH UNIVERSITIES
  // ============================================================

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setAcademicLoading(true);

        const res = await API.get("/academic/universities");

        setUniversities(res.data || []);
      } catch (error) {
        console.error("Failed to fetch universities:", error);
      } finally {
        setAcademicLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // ============================================================
  // RESPONSIVE
  // ============================================================

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;

      setIsMobile(mobile);

      if (!mobile) {
        setMobileView("list");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ============================================================
  // UNIVERSITY CHANGE
  // ============================================================

  const handleUniversityChange = async (e) => {
    const universityId = e.target.value;

    setSelectedUniversity(universityId);
    setSelectedCourse("");
    setSelectedSemester("");

    setCourses([]);

    setNotes([]);
    setActiveNote(null);
    setActiveSubject("all");
    setSearch("");

    if (!universityId) {
      return;
    }

    try {
      setCourseLoading(true);

      const res = await API.get(`/academic/courses/${universityId}`);

      setCourses(res.data || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setCourseLoading(false);
    }
  };

  // ============================================================
  // COURSE CHANGE
  // ============================================================

  const handleCourseChange = (e) => {
    const courseId = e.target.value;

    setSelectedCourse(courseId);
    setSelectedSemester("");

    setNotes([]);
    setActiveNote(null);
    setActiveSubject("all");
    setSearch("");
  };

  // ============================================================
  // SELECTED COURSE
  // ============================================================

  const selectedCourseData = courses.find(
    (course) => course._id === selectedCourse,
  );

  // ============================================================
  // FETCH NOTES
  // ============================================================

  useEffect(() => {
    if (!selectedUniversity || !selectedCourse || !selectedSemester) {
      setNotes([]);
      setActiveNote(null);
      setLoading(false);
      return;
    }

    const fetchNotes = async () => {
      try {
        setLoading(true);
        setActiveSubject("all");

        const res = await API.get("/notes/student", {
          params: {
            universityId: selectedUniversity,
            courseId: selectedCourse,
            semester: selectedSemester,
          },
        });

        const fetchedNotes = res.data || [];

        setNotes(fetchedNotes);

        if (fetchedNotes.length > 0) {
          setActiveNote(fetchedNotes[0]._id);
        } else {
          setActiveNote(null);
        }

        setMobileView("list");
      } catch (error) {
        console.error("Failed to fetch notes:", error);

        setNotes([]);
        setActiveNote(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [selectedUniversity, selectedCourse, selectedSemester]);

  // ============================================================
  // SUBJECTS
  // ============================================================

  const subjects = useMemo(() => {
    const uniqueSubjects = new Map();

    notes.forEach((note) => {
      if (note.subject?._id) {
        uniqueSubjects.set(note.subject._id, {
          id: note.subject._id,
          name: note.subject.name,
        });
      }
    });

    return [
      {
        id: "all",
        name: "All Notes",
      },
      ...Array.from(uniqueSubjects.values()),
    ];
  }, [notes]);

  // ============================================================
  // FILTER NOTES
  // ============================================================

  const filtered = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return notes.filter((note) => {
      const matchSubject =
        activeSubject === "all" || note.subject?._id === activeSubject;

      const matchSearch =
        !searchTerm || note.title?.toLowerCase().includes(searchTerm);

      return matchSubject && matchSearch;
    });
  }, [notes, search, activeSubject]);

  // ============================================================
  // CURRENT NOTE
  // ============================================================

  const currentNote = notes.find((note) => note._id === activeNote);

  // ============================================================
  // SORTED NOTES
  // ============================================================

  const sortedFiltered = useMemo(() => {
    return [...filtered].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [filtered]);

  // ============================================================
  // NAVIGATION
  // ============================================================

  const currentIndex = sortedFiltered.findIndex(
    (note) => note._id === activeNote,
  );

  const previousNote =
    currentIndex > 0 ? sortedFiltered[currentIndex - 1] : null;

  const nextNote =
    currentIndex !== -1 && currentIndex < sortedFiltered.length - 1
      ? sortedFiltered[currentIndex + 1]
      : null;

  // ============================================================
  // HELPERS
  // ============================================================

  const openNote = (noteId) => {
    setActiveNote(noteId);

    if (isMobile) {
      setMobileView("content");

      setTimeout(() => {
        const content = document.getElementById("student-notes-content");

        if (content) {
          content.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }, 50);
    }
  };

  const goToPrevious = () => {
    if (!previousNote) return;

    setActiveNote(previousNote._id);

    if (isMobile) {
      const content = document.getElementById("student-notes-content");

      if (content) {
        content.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const goToNext = () => {
    if (!nextNote) return;

    setActiveNote(nextNote._id);

    if (isMobile) {
      const content = document.getElementById("student-notes-content");

      if (content) {
        content.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      <style>{`
        /* ======================================================
           GLOBAL SCROLLBARS
        ====================================================== */

        .student-notes-root *,
        .student-notes-root *::before,
        .student-notes-root *::after {
          box-sizing: border-box;
        }

        .student-notes-root ::-webkit-scrollbar {
          width: 7px;
          height: 7px;
        }

        .student-notes-root ::-webkit-scrollbar-track {
          background: transparent;
        }

        .student-notes-root ::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 999px;
        }

        .student-notes-root ::-webkit-scrollbar-thumb:hover {
          background: var(--text-muted);
        }

        .student-notes-root {
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }

        /* ======================================================
           ROOT
        ====================================================== */

        .student-notes-root {
          width: 100%;
          height: calc(100vh - 64px);
          overflow: hidden;
          background: var(--bg-main);
          color: var(--text-main);
        }

        /* ======================================================
           LAYOUT
        ====================================================== */

        .student-notes-layout {
          display: flex;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* ======================================================
           SIDEBAR
        ====================================================== */

        .student-notes-sidebar {
          width: 340px;
          min-width: 340px;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: var(--bg-card);
          border-right: 1px solid var(--border);
          overflow: hidden;
        }

        /* ======================================================
           SIDEBAR HEADER
        ====================================================== */

        .notes-sidebar-header {
          padding: 24px 20px 20px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .notes-eyebrow {
          margin: 0 0 5px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--primary);
        }

        .notes-title {
          margin: 0 0 20px;
          font-size: 23px;
          line-height: 1.2;
          font-weight: 850;
          letter-spacing: -0.5px;
          color: var(--text-main);
        }

        /* ======================================================
           SELECT GROUP
        ====================================================== */

        .academic-group {
          margin-bottom: 13px;
        }

        .academic-label {
          display: block;
          margin-bottom: 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .academic-select-wrapper {
          position: relative;
        }

        .academic-select {
          width: 100%;
          height: 42px;
          padding: 0 38px 0 12px;
          border: 1px solid var(--border);
          border-radius: 10px;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          background: var(--bg-main);
          color: var(--text-main);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition:
            border-color 0.18s ease,
            box-shadow 0.18s ease,
            background 0.18s ease;
        }

        .academic-select:hover:not(:disabled) {
          border-color: var(--text-muted);
        }

        .academic-select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(
            in srgb,
            var(--primary) 12%,
            transparent
          );
        }

        .academic-select:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .select-arrow {
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-muted);
          font-size: 11px;
        }

        /* ======================================================
           SEARCH
        ====================================================== */

        .notes-search {
          position: relative;
          margin-top: 18px;
        }

        .notes-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 14px;
          pointer-events: none;
        }

        .notes-search input {
          width: 100%;
          height: 40px;
          padding: 0 36px 0 34px;
          border: 1px solid var(--border);
          border-radius: 10px;
          outline: none;
          background: var(--bg-main);
          color: var(--text-main);
          font-size: 13px;
          transition:
            border-color 0.18s ease,
            box-shadow 0.18s ease;
        }

        .notes-search input::placeholder {
          color: var(--text-faint);
        }

        .notes-search input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(
            in srgb,
            var(--primary) 10%,
            transparent
          );
        }

        .clear-search {
          position: absolute;
          right: 9px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .clear-search:hover {
          background: var(--border);
          color: var(--text-main);
        }

        /* ======================================================
           SUBJECT FILTER
        ====================================================== */

        .subject-filter {
          display: flex;
          gap: 7px;
          padding: 13px 18px;
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
          flex-shrink: 0;
          scrollbar-width: thin;
        }

        .subject-filter::-webkit-scrollbar {
          height: 4px;
        }

        .subject-pill {
          flex-shrink: 0;
          height: 31px;
          padding: 0 13px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: transparent;
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
          transition:
            background 0.15s ease,
            color 0.15s ease,
            border-color 0.15s ease;
        }

        .subject-pill:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .subject-pill.active {
          border-color: var(--primary);
          background: var(--primary);
          color: #fff;
        }

        /* ======================================================
           NOTES LIST
        ====================================================== */

        .notes-list {
          flex: 1;
          overflow-y: auto;
          padding: 9px 10px;
        }

        .note-list-item {
          width: 100%;
          display: block;
          margin-bottom: 4px;
          padding: 12px;
          border: 1px solid transparent;
          border-radius: 11px;
          background: transparent;
          color: var(--text-main);
          text-align: left;
          cursor: pointer;
          transition:
            background 0.15s ease,
            border-color 0.15s ease,
            transform 0.15s ease;
        }

        .note-list-item:hover {
          background: var(--bg-main);
        }

        .note-list-item.active {
          border-color: color-mix(
            in srgb,
            var(--primary) 35%,
            transparent
          );
          background: color-mix(
            in srgb,
            var(--primary) 8%,
            var(--bg-main)
          );
        }

        .note-list-row {
          display: flex;
          align-items: flex-start;
          gap: 11px;
        }

        .note-number {
          width: 27px;
          min-width: 27px;
          height: 27px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: var(--border);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 800;
          transition:
            background 0.15s ease,
            color 0.15s ease;
        }

        .note-list-item.active .note-number {
          background: var(--primary);
          color: #fff;
        }

        .note-list-info {
          min-width: 0;
          flex: 1;
        }

        .note-list-title {
          margin: 1px 0 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          line-height: 1.35;
          font-weight: 650;
          color: var(--text-main);
        }

        .note-list-item.active .note-list-title {
          color: var(--primary);
        }

        .note-list-subject {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
        }

        /* ======================================================
           EMPTY SIDEBAR
        ====================================================== */

        .notes-empty {
          padding: 50px 22px;
          text-align: center;
          color: var(--text-muted);
        }

        .empty-icon {
          width: 52px;
          height: 52px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          background: var(--bg-main);
          border: 1px solid var(--border);
          font-size: 23px;
        }

        .notes-empty h3 {
          margin: 0 0 7px;
          color: var(--text-main);
          font-size: 14px;
          font-weight: 750;
        }

        .notes-empty p {
          margin: 0;
          font-size: 12px;
          line-height: 1.6;
        }

        /* ======================================================
           SIDEBAR FOOTER
        ====================================================== */

        .notes-sidebar-footer {
          padding: 11px 19px;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }

        .notes-count {
          margin: 0;
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* ======================================================
           MAIN CONTENT
        ====================================================== */

        .student-notes-main {
          flex: 1;
          min-width: 0;
          height: 100%;
          overflow-y: auto;
          background: var(--bg-main);
          scrollbar-width: thin;
        }

        .student-notes-main-inner {
          width: 100%;
          max-width: 850px;
          min-height: 100%;
          margin: 0 auto;
          padding: 48px 55px 70px;
        }

        /* ======================================================
           TOP ACADEMIC BADGE
        ====================================================== */

        .selection-summary {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .selection-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--bg-card);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 650;
        }

        .selection-chip strong {
          color: var(--text-main);
          font-weight: 750;
        }

        /* ======================================================
           WELCOME / EMPTY MAIN
        ====================================================== */

        .main-empty {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .main-empty-card {
          max-width: 440px;
        }

        .main-empty-icon {
          width: 74px;
          height: 74px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          font-size: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }

        .main-empty h2 {
          margin: 0 0 8px;
          font-size: 25px;
          font-weight: 850;
          letter-spacing: -0.5px;
          color: var(--text-main);
        }

        .main-empty p {
          margin: 0;
          font-size: 13px;
          line-height: 1.7;
          color: var(--text-muted);
        }

        /* ======================================================
           NOTE HEADER
        ====================================================== */

        .note-header {
          padding-bottom: 27px;
          margin-bottom: 30px;
          border-bottom: 1px solid var(--border);
        }

        .note-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 13px;
        }

        .subject-badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 10px;
          border-radius: 999px;
          background: color-mix(
            in srgb,
            var(--primary) 10%,
            var(--bg-main)
          );
          border: 1px solid color-mix(
            in srgb,
            var(--primary) 20%,
            transparent
          );
          color: var(--primary);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .chapter-label {
          padding: 5px 9px;
          border-radius: 7px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 650;
        }

        .note-header h1 {
          margin: 0 0 12px;
          color: var(--text-main);
          font-size: 38px;
          line-height: 1.16;
          letter-spacing: -1.2px;
          font-weight: 900;
        }

        .note-updated {
          margin: 0;
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 500;
        }

        /* ======================================================
           NOTE CONTENT
        ====================================================== */

        .note-content {
          color: var(--text-main);
          font-size: 15px;
          line-height: 1.8;
        }

        .note-content h1 {
          margin: 0 0 24px;
          font-size: 30px;
          line-height: 1.25;
          font-weight: 850;
        }

        .note-content h2 {
          margin: 34px 0 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
          font-size: 22px;
          line-height: 1.3;
          font-weight: 800;
        }

        .note-content h3 {
          margin: 27px 0 11px;
          font-size: 18px;
          line-height: 1.35;
          font-weight: 750;
        }

        .note-content h4 {
          margin: 22px 0 9px;
          font-size: 15px;
          font-weight: 750;
        }

        .note-content p {
          margin: 0 0 17px;
          color: var(--text-main);
          line-height: 1.8;
        }

        .note-content ul,
        .note-content ol {
          margin: 0 0 20px;
          padding-left: 25px;
        }

        .note-content li {
          margin-bottom: 7px;
          padding-left: 3px;
          line-height: 1.7;
        }

        .note-content blockquote {
          margin: 22px 0;
          padding: 14px 18px;
          border-left: 4px solid var(--primary);
          border-radius: 0 9px 9px 0;
          background: color-mix(
            in srgb,
            var(--primary) 7%,
            var(--bg-main)
          );
          color: var(--text-main);
        }

        .note-content hr {
          margin: 30px 0;
          border: 0;
          border-top: 1px solid var(--border);
        }

        .note-content a {
          color: var(--primary);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .note-content img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 22px auto;
          border-radius: 12px;
          border: 1px solid var(--border);
        }

        .note-content figure {
          margin: 25px 0;
          text-align: center;
        }

        .note-content figcaption {
          margin-top: 8px;
          color: var(--text-muted);
          font-size: 11px;
          font-style: italic;
        }

        .note-content pre {
          margin: 20px 0;
          padding: 18px 20px;
          overflow-x: auto;
          border: 1px solid #30363d;
          border-radius: 11px;
          background: #0d1117;
          color: #c9d1d9;
          font-family:
            "Fira Code",
            "Cascadia Code",
            Consolas,
            monospace;
          font-size: 12px;
          line-height: 1.65;
        }

        .note-content code {
          font-family:
            "Fira Code",
            "Cascadia Code",
            Consolas,
            monospace;
        }

        .note-content :not(pre) > code {
          padding: 2px 6px;
          border-radius: 5px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          font-size: 0.9em;
        }

        /* ======================================================
           NOTE EMPTY
        ====================================================== */

        .note-no-content {
          padding: 60px 20px;
          text-align: center;
          border: 1px dashed var(--border);
          border-radius: 14px;
          color: var(--text-muted);
        }

        .note-no-content-icon {
          margin-bottom: 12px;
          font-size: 30px;
        }

        .note-no-content p {
          margin: 0;
          font-size: 13px;
        }

        /* ======================================================
           PREVIOUS / NEXT
        ====================================================== */

        .note-navigation {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          margin-top: 65px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }

        .note-nav-button {
          min-width: 0;
          max-width: 300px;
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 15px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-card);
          color: var(--text-main);
          text-align: left;
          cursor: pointer;
          transition:
            border-color 0.15s ease,
            background 0.15s ease,
            transform 0.15s ease;
        }

        .note-nav-button:hover {
          border-color: var(--primary);
          background: color-mix(
            in srgb,
            var(--primary) 4%,
            var(--bg-card)
          );
          transform: translateY(-1px);
        }

        .note-nav-button.next {
          text-align: right;
          flex-direction: row-reverse;
        }

        .note-nav-arrow {
          font-size: 19px;
          line-height: 1;
          color: var(--primary);
        }

        .note-nav-info {
          min-width: 0;
          flex: 1;
        }

        .note-nav-label {
          margin-bottom: 3px;
          color: var(--text-muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .note-nav-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          font-weight: 650;
          color: var(--text-main);
        }

        /* ======================================================
           LOADING
        ====================================================== */

        .loading-container {
          padding: 10px 2px;
        }

        .skeleton {
          height: 62px;
          margin-bottom: 7px;
          border-radius: 10px;
          background: var(--bg-main);
          position: relative;
          overflow: hidden;
        }

        .skeleton::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            color-mix(in srgb, var(--border) 50%, transparent),
            transparent
          );
          animation: skeleton-loading 1.4s infinite;
        }

        @keyframes skeleton-loading {
          100% {
            transform: translateX(100%);
          }
        }

        .main-loading {
          max-width: 700px;
          margin: 50px auto;
        }

        .main-skeleton {
          height: 20px;
          margin-bottom: 13px;
          border-radius: 7px;
          background: var(--border);
          opacity: 0.55;
        }

        .main-skeleton.large {
          width: 70%;
          height: 38px;
          margin-bottom: 18px;
        }

        .main-skeleton.small {
          width: 30%;
          margin-bottom: 45px;
        }

        /* ======================================================
           MOBILE
        ====================================================== */

        @media (max-width: 768px) {
          .student-notes-root {
            height: calc(100vh - 56px);
          }

          .student-notes-layout {
            position: relative;
          }

          .student-notes-sidebar {
            width: 100%;
            min-width: 100%;
            border-right: none;
          }

          .student-notes-main {
            width: 100%;
          }

          .student-notes-main-inner {
            padding: 20px 18px 50px;
          }

          .note-header h1 {
            font-size: 29px;
            letter-spacing: -0.7px;
          }

          .note-content {
            font-size: 14px;
          }

          .note-content h1 {
            font-size: 25px;
          }

          .note-content h2 {
            font-size: 20px;
          }

          .note-navigation {
            flex-direction: column;
            margin-top: 45px;
          }

          .note-nav-button {
            max-width: none;
            width: 100%;
          }

          .notes-sidebar-header {
            padding: 20px 16px 17px;
          }

          .notes-title {
            font-size: 21px;
          }
        }
      `}</style>

      <div className="student-notes-root">
        <div className="student-notes-layout">
          {/* ====================================================
              SIDEBAR
          ==================================================== */}

          <aside
            className="student-notes-sidebar"
            style={{
              display: isMobile && mobileView === "content" ? "none" : "flex",
            }}
          >
            {/* HEADER */}

            <div className="notes-sidebar-header">
              <p className="notes-eyebrow">Study Materials</p>

              <h2 className="notes-title">Browse Notes</h2>

              {/* UNIVERSITY */}

              <div className="academic-group">
                <label className="academic-label">University</label>

                <div className="academic-select-wrapper">
                  <select
                    className="academic-select"
                    value={selectedUniversity}
                    onChange={handleUniversityChange}
                    disabled={academicLoading}
                  >
                    <option value="">
                      {academicLoading
                        ? "Loading universities..."
                        : "Select university"}
                    </option>

                    {universities.map((university) => (
                      <option key={university._id} value={university._id}>
                        {university.name}
                      </option>
                    ))}
                  </select>

                  <span className="select-arrow">▼</span>
                </div>
              </div>

              {/* COURSE */}

              <div className="academic-group">
                <label className="academic-label">Course</label>

                <div className="academic-select-wrapper">
                  <select
                    className="academic-select"
                    value={selectedCourse}
                    onChange={handleCourseChange}
                    disabled={!selectedUniversity || courseLoading}
                  >
                    <option value="">
                      {courseLoading
                        ? "Loading courses..."
                        : !selectedUniversity
                          ? "Select university first"
                          : "Select course"}
                    </option>

                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </select>

                  <span className="select-arrow">▼</span>
                </div>
              </div>

              {/* SEMESTER */}

              <div className="academic-group">
                <label className="academic-label">Semester</label>

                <div className="academic-select-wrapper">
                  <select
                    className="academic-select"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    disabled={!selectedCourse}
                  >
                    <option value="">
                      {!selectedCourse
                        ? "Select course first"
                        : "Select semester"}
                    </option>

                    {selectedCourseData &&
                      Array.from(
                        {
                          length: selectedCourseData.totalSemesters || 0,
                        },
                        (_, index) => index + 1,
                      ).map((semester) => (
                        <option key={semester} value={semester}>
                          Semester {semester}
                        </option>
                      ))}
                  </select>

                  <span className="select-arrow">▼</span>
                </div>
              </div>

              {/* SEARCH */}

              <div className="notes-search">
                <span className="notes-search-icon">⌕</span>

                <input
                  type="text"
                  placeholder={
                    selectedSemester
                      ? "Search notes..."
                      : "Select semester first"
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  disabled={!selectedSemester}
                />

                {search && (
                  <button
                    className="clear-search"
                    onClick={() => setSearch("")}
                    type="button"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* SUBJECT FILTER */}

            {selectedSemester && !loading && notes.length > 0 && (
              <div className="subject-filter">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    className={`subject-pill ${
                      activeSubject === subject.id ? "active" : ""
                    }`}
                    onClick={() => setActiveSubject(subject.id)}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            )}

            {/* NOTES */}

            <div className="notes-list">
              {/* NO SELECTION */}

              {!selectedUniversity || !selectedCourse || !selectedSemester ? (
                <div className="notes-empty">
                  <div className="empty-icon">📚</div>

                  <h3>Choose your academics</h3>

                  <p>
                    Select a university, course and semester to find study
                    notes.
                  </p>
                </div>
              ) : loading ? (
                <div className="loading-container">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div className="skeleton" key={item} />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="notes-empty">
                  <div className="empty-icon">{search ? "⌕" : "📭"}</div>

                  <h3>{search ? "No matching notes" : "No notes available"}</h3>

                  <p>
                    {search
                      ? "Try a different search term."
                      : "There are no notes for this academic selection yet."}
                  </p>
                </div>
              ) : (
                filtered.map((note) => (
                  <button
                    key={note._id}
                    className={`note-list-item ${
                      activeNote === note._id ? "active" : ""
                    }`}
                    onClick={() => openNote(note._id)}
                    type="button"
                  >
                    <div className="note-list-row">
                      <span className="note-number">{note.order || "•"}</span>

                      <div className="note-list-info">
                        <p className="note-list-title">{note.title}</p>

                        {note.subject?.name && (
                          <p className="note-list-subject">
                            {note.subject.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* FOOTER */}

            {!loading && selectedSemester && (
              <div className="notes-sidebar-footer">
                <p className="notes-count">
                  {filtered.length} of {notes.length} notes
                </p>
              </div>
            )}
          </aside>

          {/* ====================================================
              MAIN CONTENT
          ==================================================== */}

          <main
            id="student-notes-content"
            className="student-notes-main"
            style={{
              display: isMobile && mobileView === "list" ? "none" : "block",
            }}
          >
            <div className="student-notes-main-inner">
              {/* NO SELECTION */}

              {!selectedUniversity || !selectedCourse || !selectedSemester ? (
                <div className="main-empty">
                  <div className="main-empty-card">
                    <div className="main-empty-icon">📖</div>

                    <h2>Browse Study Notes</h2>

                    <p>
                      Select a university, course and semester from the sidebar
                      to explore available study materials.
                    </p>
                  </div>
                </div>
              ) : loading ? (
                <div className="main-loading">
                  <div className="main-skeleton large" />
                  <div className="main-skeleton small" />

                  {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <div
                      key={item}
                      className="main-skeleton"
                      style={{
                        width: `${55 + Math.random() * 40}%`,
                      }}
                    />
                  ))}
                </div>
              ) : !currentNote ? (
                <div className="main-empty">
                  <div className="main-empty-card">
                    <div className="main-empty-icon">📭</div>

                    <h2>No Notes Found</h2>

                    <p>
                      No study notes are available for the selected university,
                      course and semester.
                    </p>
                  </div>
                </div>
              ) : (
                <article key={currentNote._id}>
                  {/* MOBILE BACK */}

                  {isMobile && (
                    <button
                      type="button"
                      onClick={() => setMobileView("list")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        marginBottom: "22px",
                        padding: 0,
                        border: 0,
                        background: "transparent",
                        color: "var(--text-muted)",
                        fontSize: "13px",
                        fontWeight: 650,
                        cursor: "pointer",
                      }}
                    >
                      ← Back to notes
                    </button>
                  )}

                  {/* SELECTION SUMMARY */}

                  <div className="selection-summary">
                    <div className="selection-chip">
                      University:
                      <strong>
                        {
                          universities.find((u) => u._id === selectedUniversity)
                            ?.name
                        }
                      </strong>
                    </div>

                    <div className="selection-chip">
                      Course:
                      <strong>{selectedCourseData?.name}</strong>
                    </div>

                    <div className="selection-chip">
                      Semester:
                      <strong>{selectedSemester}</strong>
                    </div>
                  </div>

                  {/* NOTE HEADER */}

                  <header className="note-header">
                    <div className="note-meta">
                      {currentNote.subject?.name && (
                        <span className="subject-badge">
                          {currentNote.subject.name}
                        </span>
                      )}

                      <span className="chapter-label">
                        Chapter {currentNote.order || "—"}
                      </span>
                    </div>

                    <h1>{currentNote.title}</h1>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      <p className="note-updated">
                        Last updated{" "}
                        {currentNote.updatedAt
                          ? new Date(currentNote.updatedAt).toLocaleDateString(
                              "en-IN",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : "Unknown"}
                      </p>

                      {currentNote.uploadedBy && (
                        <>
                          <span
                            style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              backgroundColor: "var(--text-faint)",
                            }}
                          />

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "11px",
                              color: "var(--text-muted)",
                            }}
                          >
                            <span
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor:
                                  "color-mix(in srgb, var(--primary) 10%, var(--bg-main))",
                                color: "var(--primary)",
                                fontSize: "11px",
                                fontWeight: "800",
                              }}
                            >
                              {currentNote.uploadedBy.name
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </span>

                            <span>
                              Uploaded by{" "}
                              <strong
                                style={{
                                  color: "var(--text-main)",
                                  fontWeight: "700",
                                }}
                              >
                                {currentNote.uploadedBy.name}
                              </strong>
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </header>
                  {currentNote.uploadedBy && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "30px",
                        padding: "13px 15px",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        backgroundColor: "var(--bg-card)",
                      }}
                    >
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          minWidth: "38px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor:
                            "color-mix(in srgb, var(--primary) 12%, var(--bg-main))",
                          color: "var(--primary)",
                          fontSize: "14px",
                          fontWeight: "800",
                        }}
                      >
                        {currentNote.uploadedBy.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div
                        style={{
                          minWidth: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "3px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "10px",
                            color: "var(--text-muted)",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          Uploaded by
                        </span>

                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "750",
                            color: "var(--text-main)",
                          }}
                        >
                          {currentNote.uploadedBy.name}
                        </span>

                        <span
                          style={{
                            fontSize: "11px",
                            color: "var(--text-muted)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {currentNote.uploadedBy.email}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* CONTENT */}

                  {currentNote.description ? (
                    <div
                      className="note-content"
                      dangerouslySetInnerHTML={{
                        __html: currentNote.description,
                      }}
                    />
                  ) : (
                    <div className="note-no-content">
                      <div className="note-no-content-icon">📝</div>

                      <p>This note has no content yet.</p>
                    </div>
                  )}

                  {/* NAVIGATION */}

                  <div className="note-navigation">
                    {previousNote ? (
                      <button
                        type="button"
                        className="note-nav-button"
                        onClick={goToPrevious}
                      >
                        <span className="note-nav-arrow">←</span>

                        <div className="note-nav-info">
                          <div className="note-nav-label">Previous</div>

                          <div className="note-nav-title">
                            {previousNote.title}
                          </div>
                        </div>
                      </button>
                    ) : (
                      <div
                        style={{
                          flex: 1,
                        }}
                      />
                    )}

                    {nextNote ? (
                      <button
                        type="button"
                        className="note-nav-button next"
                        onClick={goToNext}
                      >
                        <span className="note-nav-arrow">→</span>

                        <div className="note-nav-info">
                          <div className="note-nav-label">Next</div>

                          <div className="note-nav-title">{nextNote.title}</div>
                        </div>
                      </button>
                    ) : (
                      <div
                        style={{
                          flex: 1,
                        }}
                      />
                    )}
                  </div>
                </article>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
```

===============================================================================
FILE: client/src/components/userlayout/UserDashboard.jsx
===============================================================================

```jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../axiosConfig";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/feedback/my")
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", border: "4px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "6px" }}>Welcome back, {user?.name} 👋</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>Here's what's happening with your account.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        {[
          { label: "Total Feedbacks", value: feedbacks.length, big: true, icon: "💬" },
          { label: "Email", value: user?.email, icon: "📧" },
          { label: "Role", value: user?.role, badge: true, icon: "🎖️" },
        ].map((s) => (
          <div key={s.label} style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <span>{s.icon}</span>
              <p style={{ fontSize: "13px", color: "var(--text-faint)", margin: 0 }}>{s.label}</p>
            </div>
            {s.badge ? (
              <span style={{ padding: "4px 12px", backgroundColor: "var(--primary-light)", color: "var(--primary)", fontSize: "12px", fontWeight: "700", borderRadius: "999px", textTransform: "capitalize" }}>{s.value}</span>
            ) : (
              <p style={{ fontSize: s.big ? "2.2rem" : "14px", fontWeight: s.big ? "900" : "600", color: "var(--text-main)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.value}</p>
            )}
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-main)", margin: 0 }}>Your Feedbacks</h2>
          <Link to="/feedback" style={{ fontSize: "13px", color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>+ Add Feedback</Link>
        </div>
        {feedbacks.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center" }}>
            <p style={{ color: "var(--text-faint)", fontSize: "14px", marginBottom: "16px" }}>No feedbacks yet.</p>
            <Link to="/feedback" style={{ color: "var(--primary)", fontSize: "14px", textDecoration: "none", fontWeight: "600" }}>Submit your first feedback →</Link>
          </div>
        ) : (
          feedbacks.slice(0, 5).map((fb, i) => (
            <div key={fb._id} style={{ padding: "16px 24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", borderBottom: i < Math.min(feedbacks.length, 5) - 1 ? "1px solid var(--border)" : "none" }}>
              <div>
                <p style={{ fontSize: "14px", color: "var(--text-main)", margin: "0 0 5px" }}>{fb.message}</p>
                <p style={{ fontSize: "12px", color: "var(--text-faint)", margin: 0 }}>{new Date(fb.createdAt).toLocaleDateString()}</p>
              </div>
              <span style={{ color: "#facc15", fontSize: "13px", flexShrink: 0 }}>{"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
```

===============================================================================
FILE: client/src/components/userlayout/UserLayout.jsx
===============================================================================

```jsx

import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import GuestFooter from "../guestlayout/GuestFooter";
import API from "../../axiosConfig";

function UserLayout() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await API.get("/auth/me");
        console.log(res)
        // if (res.data.role !== "student") { navigate("/"); return; }
        setAuthorized(true);
      } catch {
        // setAuthorized(false);
        // navigate("/login");
      }
    };
    check();
  }, [navigate]);

  if (authorized === null) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-main)" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "var(--bg-secondary)", color: "var(--text-main)" }}>
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 50 }}>
        <UserNavbar />
      </div>
      <div style={{ flex: 1, paddingTop: "64px" }}>
        <Outlet />
      </div>
      <GuestFooter />
    </div>
  );
}

export default UserLayout;
```

===============================================================================
FILE: client/src/components/userlayout/UserNavbar.jsx
===============================================================================

```jsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../../axiosConfig";
import ThemeToggle from "../ThemeToggle";

function UserNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch User
  useEffect(() => {
    API.get("/auth/me")
      .then((r) => setUser(r.data))
      .catch(() => {});
  }, []);

  // Handle outside click for desktop dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false); // Close mobile menu if resized to desktop
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch {}
    navigate("/login");
  };

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/feedback", label: "Feedback" },
    { to: "/studentnotes", label: "Notes" },
  ];

  const isActive = (path) => location.pathname === path;
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <nav
      style={{
        backgroundColor: "var(--bg-nav)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo Section */}
        <Link
          to="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <img
            src="./ekalavya.png"
            alt=""
            style={{ height: "40px", borderRadius: 50 }}
          />
          <span
            style={{
              fontSize: "17px",
              fontWeight: "800",
              color: "var(--text-main)",
            }}
          >
            Ekalavya
          </span>
        </Link>

        {/* --- DESKTOP VIEW --- */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  color: isActive(link.to)
                    ? "var(--primary)"
                    : "var(--text-muted)",
                  fontWeight: isActive(link.to) ? "600" : "400",
                }}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />

            {/* Desktop Profile Dropdown */}
            <div
              style={{ position: "relative", marginLeft: "8px" }}
              ref={dropdownRef}
            >
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 12px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--bg-card)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "var(--primary)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: "900",
                  }}
                >
                  {initials}
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "var(--text-main)",
                    maxWidth: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user?.name || "Account"}
                </span>
                <svg
                  style={{
                    width: "14px",
                    height: "14px",
                    color: "var(--text-faint)",
                    transition: "transform 0.2s",
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 8px)",
                    width: "220px",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    boxShadow: "var(--shadow)",
                    zIndex: 50,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "14px 16px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "var(--text-main)",
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user?.name}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-faint)",
                        margin: "3px 0 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user?.email}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "11px 16px",
                      textDecoration: "none",
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--bg-secondary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    👤 Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "11px 16px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#ef4444",
                      textAlign: "left",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "rgba(239,68,68,0.08)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- MOBILE VIEW (Hamburger + Theme) --- */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-main)",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {mobileMenuOpen ? (
                // Close Icon
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "var(--bg-nav)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid var(--border)",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            padding: "16px 24px",
            boxShadow: "var(--shadow)",
          }}
        >
          {/* Mobile Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "16px" }}>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  textDecoration: "none",
                  color: isActive(link.to) ? "var(--primary)" : "var(--text-muted)",
                  fontWeight: isActive(link.to) ? "600" : "500",
                  backgroundColor: isActive(link.to) ? "var(--bg-card)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile User Profile Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", padding: "0 8px" }}>
            <div style={{ width: "40px", height: "40px", backgroundColor: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px", fontWeight: "900" }}>
              {initials}
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-main)", margin: 0 }}>{user?.name || "Account"}</p>
              <p style={{ fontSize: "13px", color: "var(--text-faint)", margin: "2px 0 0" }}>{user?.email}</p>
            </div>
          </div>

          {/* Mobile Actions */}
          <Link
            to="/profile"
            style={{ padding: "12px 16px", textDecoration: "none", fontSize: "15px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "10px" }}
          >
            👤 Profile
          </Link>
          <button
            onClick={handleLogout}
            style={{ width: "100%", padding: "12px 16px", background: "none", border: "none", fontSize: "15px", color: "#ef4444", textAlign: "left", display: "flex", alignItems: "center", gap: "10px" }}
          >
            🚪 Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default UserNavbar;
```

===============================================================================
FILE: client/src/context/ThemeContext.jsx
===============================================================================

```jsx

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

===============================================================================
FILE: client/src/hooks/RichEditor.jsx
===============================================================================

```jsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichEditor({
  value,
  onChange,
}) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: value,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-3 min-h-[300px]">
      <EditorContent editor={editor} />
    </div>
  );
}
```

===============================================================================
FILE: client/src/hooks/useBase64ImageReplacer.js
===============================================================================

```js
import { useEffect } from "react";

export function useBase64ImageReplacer(editor) {
  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      // Future logic for replacing pasted base64 images.
      // Currently does nothing.
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor]);
}
```

===============================================================================
FILE: client/src/hooks/useImageUpload.js
===============================================================================

```js
import { useCallback } from "react";
import API from "../axiosConfig";

/**
 * Returns an `uploadImage(file) → Promise<string>` function.
 * The promise resolves to the Cloudinary secure URL.
 */
export function useImageUpload() {
  const uploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await API.post("/notes/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.url; // Cloudinary secure_url
  }, []);

  return { uploadImage };
}
```

===============================================================================
FILE: client/src/index.css
===============================================================================

```css

@tailwind base;
@tailwind components;
@tailwind utilities;

@keyframes spin { to { transform: rotate(360deg); } }
```

===============================================================================
FILE: client/src/main.jsx
===============================================================================

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/theme.css";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
```

===============================================================================
FILE: client/src/StyledComponents/Fiberburst.jsx
===============================================================================

```jsx
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Helper to detect system/HTML theme ──────────────────────────────────────
function getCurrentThemeMode() {
  // Check if the HTML tag has data-theme="dark"
  if (typeof document !== "undefined") {
    const html = document.documentElement;
    const attr = html.getAttribute("data-theme");
    if (attr === "dark") return "dark";
    if (attr === "light") return "light";
    
    // Fallback to system preference if no attribute found
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return "dark";
    }
  }
  return "light";
}

// ─── Theme Definitions (Dynamically chosen based on CSS Theme) ──────────────
const LIGHT_THEME = {
  id: "day-light",
  lineStart: "#b45309", // Deep amber/orange
  lineEnd: "#d97706",   // Golden
  dotColor: "#78350f",  // Darkest brown
  burstCore: "rgba(245, 173, 66, 0.25)", 
  burstMid:  "rgba(180, 83, 9, 0.10)",
  edgeColor: "rgba(120, 53, 15, 0.35)",
};

const DARK_THEME = {
  id: "night-dark",
  lineStart: "#67e8f9", // Cyan electric
  lineEnd: "#c084fc",   // Purple soft
  dotColor: "#f0abfc",  // Pinkish-purple
  burstCore: "rgba(192, 132, 252, 0.35)",
  burstMid:  "rgba(103, 232, 249, 0.10)",
  edgeColor: "rgba(192, 132, 252, 0.40)",
};

// ─── Utility Functions ──────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function lerpColor(hex1, hex2, t) {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  return `rgb(${Math.round(lerp(r1,r2,t))},${Math.round(lerp(g1,g2,t))},${Math.round(lerp(b1,b2,t))})`;
}

// ─── FiberLine ──────────────────────────────────────────────────────────────
class FiberLine {
  constructor(w, h, index, total) {
    this.originX = w / 2;
    this.originY = h + 10;

    const minAngle = -Math.PI + 0.1;
    const maxAngle = -0.1;
    this.angle = minAngle + (index / (total - 1)) * (maxAngle - minAngle);

    const baseDist = Math.min(w, h) * 0.82;
    this.length = baseDist * (0.45 + Math.random() * 0.6);

    this.wobbleOffset = Math.random() * Math.PI * 2;
    this.wobbleSpeed  = 0.0007 + Math.random() * 0.0006;
    this.opacity      = 0.55 + Math.random() * 0.45;
    this.dotRadius    = 1.5 + Math.random() * 2.5; // Slightly smaller dots for density

    this.currentX = this.originX + Math.cos(this.angle) * this.length;
    this.currentY = this.originY + Math.sin(this.angle) * this.length;
    this.ctrlX    = this.originX + Math.cos(this.angle) * this.length * 0.5;
    this.ctrlY    = this.originY + Math.sin(this.angle) * this.length * 0.5;
  }

  update(mouse, time) {
    const wobble = Math.sin(time * this.wobbleSpeed + this.wobbleOffset) * 5;
    let tx = this.originX + Math.cos(this.angle) * this.length + wobble;
    let ty = this.originY + Math.sin(this.angle) * this.length;
    let cx = this.originX + Math.cos(this.angle) * this.length * 0.5;
    let cy = this.originY + Math.sin(this.angle) * this.length * 0.5;

    if (mouse.x !== null) {
      // Reduced maxR from 200 to 120 to prevent chaotic pushing with dense lines
      const maxR = 120; 
      const dx = tx - mouse.x, dy = ty - mouse.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < maxR && d > 0) {
        const f = ((maxR - d) / maxR) ** 2;
        tx += (dx / d) * f * 100;
        ty += (dy / d) * f * 100;
      }
      const cdx = cx - mouse.x, cdy = cy - mouse.y;
      const cd  = Math.sqrt(cdx * cdx + cdy * cdy);
      if (cd < maxR * 0.7 && cd > 0) {
        const cf = ((maxR * 0.7 - cd) / (maxR * 0.7)) ** 2;
        cx += (cdx / cd) * cf * 50;
        cy += (cdy / cd) * cf * 50;
      }
    }

    this.currentX = lerp(this.currentX, tx, 0.09);
    this.currentY = lerp(this.currentY, ty, 0.09);
    this.ctrlX    = lerp(this.ctrlX, cx, 0.07);
    this.ctrlY    = lerp(this.ctrlY, cy, 0.07);
  }

  draw(ctx, theme) {
    const t     = Math.min(1, Math.max(0, (this.length - 60) / 320));
    const color = lerpColor(theme.lineEnd, theme.lineStart, t);

    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth   = 0.6; // Reduced thickness for better density

    ctx.beginPath();
    ctx.moveTo(this.originX, this.originY);
    ctx.quadraticCurveTo(this.ctrlX, this.ctrlY, this.currentX, this.currentY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.currentX, this.currentY, this.dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = theme.dotColor;
    ctx.fill();

    ctx.restore();
  }
}

function drawBurstBackground(ctx, w, h, theme) {
  const cx = w / 2;
  const cy = h + 10;
  
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, 0.55);
  
  const radius1 = Math.max(w, h) * 1.2;
  const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, radius1);
  g1.addColorStop(0, theme.burstCore);
  g1.addColorStop(0.3, theme.burstMid);
  g1.addColorStop(0.6, "rgba(0, 0, 0, 0.02)");
  g1.addColorStop(1, "transparent");
  
  ctx.beginPath();
  ctx.arc(0, 0, radius1, Math.PI, 0);
  ctx.fillStyle = g1;
  ctx.filter = "blur(20px)";
  ctx.fill();
  
  const radius2 = Math.max(w, h) * 0.8;
  const g2 = ctx.createRadialGradient(0, 0, 0, 0, 0, radius2);
  g2.addColorStop(0, theme.burstCore);
  g2.addColorStop(0.4, theme.burstMid);
  g2.addColorStop(0.8, "transparent");
  
  ctx.beginPath();
  ctx.arc(0, 0, radius2, Math.PI, 0);
  ctx.fillStyle = g2;
  ctx.filter = "blur(12px)";
  ctx.fill();
  
  const radius3 = Math.max(w, h) * 0.4;
  const g3 = ctx.createRadialGradient(0, 0, 0, 0, 0, radius3);
  g3.addColorStop(0, "rgba(255, 255, 255, 0.4)");
  g3.addColorStop(0.2, theme.burstCore);
  g3.addColorStop(0.6, "transparent");
  
  ctx.beginPath();
  ctx.arc(0, 0, radius3, Math.PI, 0);
  ctx.fillStyle = g3;
  ctx.filter = "blur(6px)";
  ctx.fill();
  
  const g4 = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
  g4.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  g4.addColorStop(0.3, theme.burstCore);
  g4.addColorStop(1, "transparent");
  
  ctx.beginPath();
  ctx.arc(0, 0, 40, 0, Math.PI * 2);
  ctx.fillStyle = g4;
  ctx.filter = "blur(3px)";
  ctx.fill();
  
  ctx.filter = "none";
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.restore();
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function FiberBurst({ style = {} }) {
  const canvasRef   = useRef(null);
  const linesRef    = useRef([]);
  const mouseRef    = useRef({ x: null, y: null });
  const animRef     = useRef(null);
  
  // React state to track current CSS theme mode
  const [cssMode, setCssMode] = useState(getCurrentThemeMode());

  // Watch for changes to the data-theme attribute on HTML element
  useEffect(() => {
    const checkTheme = () => {
      setCssMode(getCurrentThemeMode());
    };

    // Use MutationObserver to detect when data-theme changes dynamically
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    // Also listen to system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => checkTheme();
    mediaQuery.addEventListener('change', handler);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  // Get the correct canvas colors based on detected CSS theme
  const theme = cssMode === 'dark' ? DARK_THEME : LIGHT_THEME;

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w   = canvas.offsetWidth;
    const h   = canvas.offsetHeight;

    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // ⚡ INCREASED LINE DENSITY FROM 160 TO 280 ⚡
    const total = 280; 
    linesRef.current = Array.from(
      { length: total },
      (_, i) => new FiberLine(w, h, i, total)
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    initCanvas();
    const ro = new ResizeObserver(initCanvas);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [initCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const tick = (time) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const t = cssMode === 'dark' ? DARK_THEME : LIGHT_THEME;

      ctx.clearRect(0, 0, w, h);
      drawBurstBackground(ctx, w, h, t);

      for (const line of linesRef.current) {
        line.update(mouseRef.current, time);
        line.draw(ctx, t);
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [cssMode]);

  const onMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { x: null, y: null };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "70vh",
        overflow: "hidden",
        background: "transparent",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          cursor: "crosshair",
        }}
      />
    </div>
  );
}
```

===============================================================================
FILE: client/src/StyledComponents/HorizontalScroller.jsx
===============================================================================

```jsx
import { useEffect, useRef, useState, useCallback } from "react";

const CARDS = [
  {
    num: "01",
    badge: "Small Batches",
    title: "Slow simmered,\nnot conveyor belted",
    body: "Small runs. No conveyor belts — just slow simmering, constant taste checks, and Doug hovering like it owes him money.",
    shapes: ["circle", "star", "triangle"]
  },
  {
    num: "02",
    badge: "Real Ingredients",
    title: "Fruit chopped.\nPeppers sliced.",
    body: "Real fruit. Fresh peppers. No powders. No syrups. No shortcuts. Every spice gets blended by hand.",
    shapes: ["hexagon", "diamond", "circle"]
  },
  {
    num: "03",
    badge: "Oh, This?",
    title: "2nd place.\nFirst event.",
    body: 'Philly Hot Sauce Fest 2026 — "Best Sauce on a Philly Cheesesteak." Not bad for our first event.',
    shapes: ["star", "circle", "hexagon"]
  },
  {
    num: "04",
    badge: "No Corn Syrup",
    title: "Sweet is fine.\nLab-sweet is not.",
    body: "We left the high fructose corn syrup on the bottom shelf where it belongs. Sugar, the real kind.",
    shapes: ["triangle", "hexagon", "star"]
  },
  {
    num: "05",
    badge: "Gluten Free",
    title: "No gluten.\nNo drama.",
    body: "Just sauce that plays nice with your diet and acts up on the grill. No thickening tricks needed.",
    shapes: ["diamond", "triangle", "circle"]
  },
];

const TICKER_TEXT =
  "Small Batch · Real Ingredients · No HFCS · Gluten Free · No Seed Oils · Award Winning · ";

const CARD_W = 300;
const CARD_H = 380;
const TOTAL_SCROLL = 1400;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// SVG shape paths
const SHAPES = {
  circle: {
    path: "M50,85 C77.6,85 100,62.6 100,35 C100,7.4 77.6,-15 50,-15 C22.4,-15 0,7.4 0,35 C0,62.6 22.4,85 50,85 Z",
    viewBox: "0 0 100 100"
  },
  star: {
    path: "M50,5 L61,38 L97,38 L68,59 L79,92 L50,71 L21,92 L32,59 L3,38 L39,38 Z",
    viewBox: "0 0 100 100"
  },
  triangle: {
    path: "M50,5 L95,90 L5,90 Z",
    viewBox: "0 0 100 100"
  },
  hexagon: {
    path: "M50,5 L87,25 L87,65 L50,85 L13,65 L13,25 Z",
    viewBox: "0 0 100 100"
  },
  diamond: {
    path: "M50,5 L90,50 L50,95 L10,50 Z",
    viewBox: "0 0 100 100"
  },
  blob: {
    path: "M50,10 C72,5 95,20 95,45 C95,70 78,90 50,90 C22,90 5,75 5,50 C5,25 22,10 50,10 Z",
    viewBox: "0 0 100 100"
  }
};

function getPosOnCurve(progress, i, containerW, containerH, n) {
  const cardProgress = progress * (n - 1);
  const angle = (i - cardProgress) * 0.52;
  const radius = 600;
  const cx = containerW / 2;
  const cy = containerH / 2 - 10;
  const x = cx + Math.sin(angle) * radius - CARD_W / 2;
  const y =
    cy -
    Math.cos(angle) * radius * 0.14 +
    Math.abs(angle) * Math.abs(angle) * 22 -
    CARD_H / 2;
  const rotate = angle * 17;
  const scale = Math.max(0.75, 1 - Math.abs(angle) * 0.075);
  const opacity = Math.max(0, 1 - Math.abs(angle) * 0.65);
  const zIndex = Math.round(10 - Math.abs(i - cardProgress));
  return { x, y, rotate, scale, opacity, zIndex, angle };
}

// Animated Shape SVG Component
function AnimatedShape({ shape1, shape2, morphProgress, index, delay = 0 }) {
  const path1 = SHAPES[shape1]?.path || SHAPES.circle.path;
  const path2 = SHAPES[shape2]?.path || SHAPES.circle.path;
  
  const animations = [
    // Different animation patterns for each shape
    { rotate: 360, scale: [1, 1.2, 1], duration: 3 },
    { rotate: -180, scale: [1, 0.8, 1], duration: 4 },
    { rotate: 720, scale: [1, 1.1, 0.9, 1], duration: 3.5 },
  ];

  const anim = animations[index % animations.length];
  
  return (
    <svg
      className="scs-shape"
      viewBox={SHAPES[shape1]?.viewBox || "0 0 100 100"}
      style={{
        animation: `scs-shape-float-${index} ${anim.duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <path
        d={morphProgress < 0.5 ? path1 : path2}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
        style={{
          transition: `d ${0.6 + delay * 0.2}s cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      />
      <style>{`
        @keyframes scs-shape-float-${index} {
          0%, 100% { 
            transform: rotate(0deg) scale(1); 
          }
          33% { 
            transform: rotate(${anim.rotate * 0.33}deg) scale(${anim.scale[1]}); 
          }
          66% { 
            transform: rotate(${anim.rotate * 0.66}deg) scale(${anim.scale[2] || 1}); 
          }
        }
      `}</style>
    </svg>
  );
}

// Main decorative shapes component
function DecorativeShapes({ cardIndex, progress, isHovered }) {
  const shapes = CARDS[cardIndex]?.shapes || ["circle", "star", "triangle"];
  const morphProgress = (progress * CARDS.length) % 1;
  
  return (
    <div className="scs-shapes-container">
      {shapes.map((shape, i) => (
        <AnimatedShape
          key={i}
          shape1={shapes[i]}
          shape2={shapes[(i + 1) % shapes.length]}
          morphProgress={morphProgress}
          index={i}
          delay={i * 0.3}
        />
      ))}
      <style>{`
        .scs-shapes-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        
        .scs-shape {
          position: absolute;
          width: 60px;
          height: 60px;
          color: #f5edcf;
          opacity: 0.15;
          transition: opacity 0.3s, transform 0.3s;
        }
        
        .scs-shape:nth-child(1) {
          top: -10px;
          right: -10px;
          width: 80px;
          height: 80px;
        }
        
        .scs-shape:nth-child(2) {
          bottom: 20px;
          left: -15px;
          width: 50px;
          height: 50px;
          opacity: 0.1;
        }
        
        .scs-shape:nth-child(3) {
          top: 40%;
          right: -20px;
          width: 40px;
          height: 40px;
          opacity: 0.12;
        }
        
        .scs-card:hover .scs-shape {
          opacity: 0.25;
          color: #f5edcf;
        }
        
        .scs-card:hover .scs-shape:nth-child(1) {
          transform: translate(-5px, -5px) scale(1.1);
        }
        
        .scs-card:hover .scs-shape:nth-child(2) {
          transform: translate(5px, -5px) scale(1.1);
        }
        
        .scs-card:hover .scs-shape:nth-child(3) {
          transform: translate(-5px, 5px) scale(1.15);
        }
      `}</style>
    </div>
  );
}

export default function HorizontalScroller() {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const scrollYRef = useRef(0);
  const targetYRef = useRef(0);
  const cardRefs = useRef([]);
  const tickerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [size, setSize] = useState({ w: 800, h: 580 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const lastActiveIdx = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Direct DOM manipulation for smooth animation
  const updateDOM = useCallback(
    (progress) => {
      // Update cards via refs (no React re-render)
      CARDS.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const style = getPosOnCurve(progress, i, size.w, size.h, CARDS.length);
        card.style.transform = `translate(${style.x}px, ${style.y}px) rotate(${style.rotate}deg) scale(${style.scale})`;
        card.style.opacity = style.opacity;
        card.style.zIndex = style.zIndex;
      });

      // Update ticker
      if (tickerRef.current) {
        tickerRef.current.style.transform = `translateX(${-scrollYRef.current * 0.12}px)`;
      }

      // Only update React state when activeIdx actually changes (throttled)
      const newActiveIdx = Math.round(progress * (CARDS.length - 1));
      if (newActiveIdx !== lastActiveIdx.current) {
        lastActiveIdx.current = newActiveIdx;
        setActiveIdx(newActiveIdx);
      }

      // Update hint visibility
      const shouldShowHint = progress < 0.04;
      if (shouldShowHint !== showHint) {
        setShowHint(shouldShowHint);
      }
    },
    [size, showHint]
  );

  const smoothScroll = useCallback(() => {
    scrollYRef.current = lerp(scrollYRef.current, targetYRef.current, 0.1);
    
    const progress = Math.min(1, Math.max(0, scrollYRef.current / TOTAL_SCROLL));
    updateDOM(progress);

    if (Math.abs(scrollYRef.current - targetYRef.current) > 0.3) {
      rafRef.current = requestAnimationFrame(smoothScroll);
    } else {
      scrollYRef.current = targetYRef.current;
      updateDOM(Math.min(1, Math.max(0, scrollYRef.current / TOTAL_SCROLL)));
      rafRef.current = null;
    }
  }, [updateDOM]);

  const startRaf = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(smoothScroll);
    }
  }, [smoothScroll]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      const atStart = targetYRef.current <= 0;
      const atEnd = targetYRef.current >= TOTAL_SCROLL;

      // At boundary in the same direction → let page scroll naturally
      if ((scrollingDown && atEnd) || (scrollingUp && atStart)) {
        return; // don't preventDefault — page scroll takes over
      }

      e.preventDefault();
      
      // Normalize delta for different input devices
      const delta = Math.abs(e.deltaY) > 50 
        ? Math.sign(e.deltaY) * 40 // Mouse wheel - cap the jump
        : e.deltaY; // Trackpad - use as-is
      
      targetYRef.current = Math.min(
        TOTAL_SCROLL,
        Math.max(0, targetYRef.current + delta * 0.85)
      );
      startRaf();
    };

    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const onTouchMove = (e) => {
      const dy = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      const scrollingDown = dy > 0;
      const scrollingUp = dy < 0;
      const atStart = targetYRef.current <= 0;
      const atEnd = targetYRef.current >= TOTAL_SCROLL;

      if ((scrollingDown && atEnd) || (scrollingUp && atStart)) {
        return;
      }

      e.preventDefault();
      
      // Normalize touch delta
      const normalizedDelta = Math.abs(dy) > 50 
        ? Math.sign(dy) * 40 
        : dy;
      
      targetYRef.current = Math.min(
        TOTAL_SCROLL,
        Math.max(0, targetYRef.current + normalizedDelta * 1.6)
      );
      startRaf();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startRaf]);

  // Initial render on mount and size change
  useEffect(() => {
    updateDOM(Math.min(1, Math.max(0, scrollYRef.current / TOTAL_SCROLL)));
  }, [updateDOM, size]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

        .scs-root {
          width: 100%;
          height: 580px;
          background: #0e0e0e;
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          font-family: 'DM Sans', sans-serif;
          cursor: ns-resize;
        }

        .scs-label {
          position: absolute;
          top: 26px; left: 32px;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #ffffff28;
          text-transform: uppercase;
          font-weight: 700;
          z-index: 10;
          pointer-events: none;
        }

        .scs-counter {
          position: absolute;
          top: 26px; right: 32px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 0.18em;
          color: #ffffff22;
          z-index: 10;
          pointer-events: none;
        }

        .scs-hint {
          position: absolute;
          bottom: 52px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: #ffffff35;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          pointer-events: none;
          z-index: 10;
          transition: opacity 0.4s;
        }

        .scs-hint-arrow {
          animation: scs-bounce 1.5s ease-in-out infinite;
        }

        @keyframes scs-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        .scs-card {
          position: absolute;
          width: ${CARD_W}px;
          min-height: ${CARD_H}px;
          background: #191919;
          border: 1px solid #ffffff12;
          border-radius: 20px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          will-change: transform, opacity;
          overflow: hidden;
          pointer-events: auto;
          top: 0; left: 0;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .scs-card:hover {
          border-color: #f5edcf33;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px #f5edcf1a;
        }

        .scs-card-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 140px;
          line-height: 0.8;
          color: transparent;
          -webkit-text-stroke: 1.5px #ffffff1a;
          position: absolute;
          bottom: -16px; right: -10px;
          pointer-events: none;
          letter-spacing: -4px;
          user-select: none;
          transition: -webkit-text-stroke-color 0.3s;
        }
        
        .scs-card:hover .scs-card-num {
          -webkit-text-stroke-color: #f5edcf1a;
        }

        .scs-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f5edcf;
          color: #1a1208;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 999px;
          width: fit-content;
          position: relative;
          z-index: 1;
        }

        .scs-badge-dot {
          color: #8a6e22;
          font-size: 8px;
        }

        .scs-card-title {
          font-size: 22px;
          font-weight: 700;
          color: #f0e8d0;
          line-height: 1.25;
          position: relative;
          z-index: 1;
          white-space: pre-line;
        }

        .scs-card-body {
          font-size: 14px;
          line-height: 1.7;
          color: #8a7f6e;
          position: relative;
          z-index: 1;
          flex: 1;
          transition: color 0.3s;
        }
        
        .scs-card:hover .scs-card-body {
          color: #a8987e;
        }

        .scs-ticker-wrap {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 38px;
          border-top: 1px solid #ffffff0a;
          overflow: hidden;
          display: flex;
          align-items: center;
          z-index: 10;
          pointer-events: none;
        }

        .scs-ticker-inner {
          display: flex;
          white-space: nowrap;
          will-change: transform;
        }

        .scs-ticker-text {
          font-size: 10px;
          letter-spacing: 0.28em;
          color: #ffffff12;
          text-transform: uppercase;
        }

        .scs-dots {
          position: absolute;
          bottom: 46px;
          right: 32px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 10;
          pointer-events: none;
        }

        .scs-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ffffff18;
          transition: background 0.3s, transform 0.3s;
        }

        .scs-dot.active {
          background: #f5edcf;
          transform: scale(1.4);
        }
      `}</style>

      <div className="scs-root" ref={containerRef}>
        <div className="scs-label">Why Bucks Sauce</div>
        <div className="scs-counter">
          {String(activeIdx + 1).padStart(2, "0")} /{" "}
          {String(CARDS.length).padStart(2, "0")}
        </div>

        {CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="scs-card"
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="scs-card-num">{card.num}</div>
            
            {/* Animated SVG shapes */}
            <DecorativeShapes 
              cardIndex={i} 
              progress={scrollYRef.current / TOTAL_SCROLL}
              isHovered={hoveredCard === i}
            />
            
            <div className="scs-badge">
              <span className="scs-badge-dot">•</span>
              {card.badge}
              <span className="scs-badge-dot">•</span>
            </div>
            <div className="scs-card-title">{card.title}</div>
            <div className="scs-card-body">{card.body}</div>
          </div>
        ))}

        <div
          className="scs-hint"
          style={{ opacity: showHint ? 1 : 0 }}
        >
          <span>Scroll</span>
          <svg
            className="scs-hint-arrow"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M7 2v10M3 8l4 4 4-4"
              stroke="#ffffff44"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="scs-dots">
          {CARDS.map((_, i) => (
            <div
              key={i}
              className={`scs-dot${i === activeIdx ? " active" : ""}`}
            />
          ))}
        </div>

        <div className="scs-ticker-wrap">
          <div className="scs-ticker-inner" ref={tickerRef}>
            {[...Array(6)].map((_, i) => (
              <span key={i} className="scs-ticker-text">
                {TICKER_TEXT}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
```

===============================================================================
FILE: client/src/StyledComponents/MeshText.tsx
===============================================================================

```tsx
// Mesh Text Hover — Originkit
// Props set in the preview:
//   font: {"variant":"Bold","fontSize":"160px","textAlign":"left","fontFamily":"Inter","fontWeight":700,"lineHeight":"1em","letterSpacing":"0em"}

"use client"

import { useEffect, useRef } from "react"

const GRID_W = 96
const GRID_H = 40
const DRAG = 1.8
const SPRING_K = 0.08
const DAMPING = 0.9
const DT = 0.1
const CHROMA = 0.005

const VERT_SRC = `#version 300 es
in vec2 aPos;
in vec2 aUv;
in vec2 aDisp;
out vec2 vUv;
out float vMag;
void main() {
    gl_Position = vec4(aPos + aDisp, 0.0, 1.0);
    vUv = aUv;
    vMag = length(aDisp);
}`

const FRAG_SRC = `#version 300 es
precision highp float;
in vec2 vUv;
in float vMag;
out vec4 outColor;
uniform sampler2D uTex;
uniform float uChroma;
uniform vec3 uColorA;
uniform vec3 uColorB;
void main() {
    vec4 base = texture(uTex, vUv);
    if (uChroma > 0.0) {
        float o = uChroma * ${CHROMA.toFixed(5)} * clamp(vMag * 8.0, 0.0, 1.0);
        float aOff = texture(uTex, vUv + vec2(o, 0.0)).a;
        float bOff = texture(uTex, vUv - vec2(o, 0.0)).a;
        // Base text colour where the glyph is solid + colour A on the
        // +offset fringe + colour B on the -offset fringe.
        vec3 col = base.rgb * base.a;
        col += uColorA * max(0.0, aOff - base.a);
        col += uColorB * max(0.0, bOff - base.a);
        float aMax = max(base.a, max(aOff, bOff));
        outColor = vec4(col, aMax);
    } else {
        outColor = base;
    }
}`

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
    const sh = gl.createShader(type)!
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(sh))
        gl.deleteShader(sh)
        return null
    }
    return sh
}

function linkProgram(
    gl: WebGL2RenderingContext,
    vs: WebGLShader,
    fs: WebGLShader
) {
    const p = gl.createProgram()!
    gl.attachShader(p, vs)
    gl.attachShader(p, fs)
    gl.linkProgram(p)
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(p))
        gl.deleteProgram(p)
        return null
    }
    return p
}

const VARIANT_WEIGHTS: Record<string, number> = {
    Thin: 100,
    Hairline: 100,
    ExtraLight: 200,
    UltraLight: 200,
    Light: 300,
    Regular: 400,
    Normal: 400,
    Book: 400,
    Medium: 500,
    SemiBold: 600,
    DemiBold: 600,
    Bold: 700,
    ExtraBold: 800,
    UltraBold: 800,
    Black: 900,
    Heavy: 900,
}

function variantToWeight(variant?: string): number {
    if (!variant) return 400
    const base = variant
        .replace(/\s*Italic\s*/i, "")
        .trim()
        .replace(/\s+/g, "")
    return VARIANT_WEIGHTS[base] ?? 400
}

function variantIsItalic(variant?: string): boolean {
    return !!variant && /italic/i.test(variant)
}

function toNum(v: any, fallback: number): number {
    if (typeof v === "number" && isFinite(v)) return v
    if (typeof v === "string") {
        const m = parseFloat(v)
        if (isFinite(m)) return m
    }
    return fallback
}

// Parse a CSS colour string ("#rgb", "#rrggbb", "rgb(r,g,b)", "rgba(...)")
// into a [0..1, 0..1, 0..1] tuple. Falls back to white.
function parseColor(v: any): [number, number, number] {
    if (typeof v !== "string") return [1, 1, 1]
    const s = v.trim()
    if (s.startsWith("#")) {
        let h = s.slice(1)
        if (h.length === 3)
            h = h
                .split("")
                .map((c) => c + c)
                .join("")
        if (h.length >= 6) {
            const r = parseInt(h.slice(0, 2), 16) / 255
            const g = parseInt(h.slice(2, 4), 16) / 255
            const b = parseInt(h.slice(4, 6), 16) / 255
            if (isFinite(r) && isFinite(g) && isFinite(b)) return [r, g, b]
        }
    }
    const m = s.match(/rgba?\s*\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i)
    if (m) {
        return [
            parseInt(m[1], 10) / 255,
            parseInt(m[2], 10) / 255,
            parseInt(m[3], 10) / 255,
        ]
    }
    return [1, 1, 1]
}

function renderTextToCanvas(
    text: string,
    color: string,
    fontFamily: string,
    fontWeight: string | number,
    fontStyle: string,
    fontSize: number,
    width: number,
    height: number
): HTMLCanvasElement {
    const c = document.createElement("canvas")
    c.width = width
    c.height = height
    const ctx = c.getContext("2d")!
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = color
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}, sans-serif`
    ctx.fillText(text, width / 2, height / 2)
    return c
}

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 800
 * @framerIntrinsicHeight 240
 */
export default function MeshText(props: any) {
    props = { ...COMPONENT_DEFAULTS, ...props }
    const { text, color, font, colorSplit, customColors, force } = props

    // Live refs so the toggle / slider take effect mid-loop without
    // rebuilding the WebGL state.
    const colorSplitRef = useRef<boolean>(!!colorSplit)
    colorSplitRef.current = !!colorSplit
    // Parsed RGB triples (0..1). Cycled through over time in the render loop.
    const customColorsRef = useRef<[number, number, number][]>([])
    customColorsRef.current = Array.isArray(customColors)
        ? customColors.map(parseColor)
        : []
    // UI exposes a friendly 0-50 slider; internal physics use ÷ 10 so the
    // default (18) matches the original DRAG = 1.8 feel.
    const forceRef = useRef<number>(
        typeof force === "number" ? force / 10 : DRAG
    )
    forceRef.current = typeof force === "number" ? force / 10 : DRAG

    // Framer's Font (ControlType.Font, "extended") returns an object with
    // fontFamily / fontSize / variant (e.g. "Bold Italic") — plus sometimes
    // explicit fontWeight / fontStyle. Read each robustly (number OR string)
    // and derive weight + italic from variant when needed.
    const fontFamily: string = font?.fontFamily ?? "Inter"
    const fontVariant: string = font?.variant ?? "Regular"
    const fontSize: number = toNum(font?.fontSize, 180)
    const fontWeight: number = toNum(
        font?.fontWeight,
        variantToWeight(fontVariant)
    )
    const fontStyle: string =
        typeof font?.fontStyle === "string"
            ? font.fontStyle
            : variantIsItalic(fontVariant)
              ? "italic"
              : "normal"

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const wrapper = wrapperRef.current
        if (!canvas || !wrapper) return

        const gl = canvas.getContext("webgl2", {
            alpha: true,
            premultipliedAlpha: true,
            antialias: true,
        })
        if (!gl) {
            console.error("WebGL2 not available")
            return
        }

        // ── Grid geometry ───────────────────────────────────────────────
        const vertCount = (GRID_W + 1) * (GRID_H + 1)
        const positions = new Float32Array(vertCount * 2)
        const uvs = new Float32Array(vertCount * 2)
        for (let y = 0; y <= GRID_H; y++) {
            for (let x = 0; x <= GRID_W; x++) {
                const i = y * (GRID_W + 1) + x
                const u = x / GRID_W
                const v = y / GRID_H
                positions[i * 2] = u * 2 - 1
                positions[i * 2 + 1] = 1 - v * 2
                uvs[i * 2] = u
                uvs[i * 2 + 1] = v
            }
        }
        const indexCount = GRID_W * GRID_H * 6
        const indices = new Uint32Array(indexCount)
        let idx = 0
        for (let y = 0; y < GRID_H; y++) {
            for (let x = 0; x < GRID_W; x++) {
                const a = y * (GRID_W + 1) + x
                const b = a + 1
                const c = a + (GRID_W + 1)
                const d = c + 1
                indices[idx++] = a
                indices[idx++] = c
                indices[idx++] = b
                indices[idx++] = b
                indices[idx++] = c
                indices[idx++] = d
            }
        }

        const disp = new Float32Array(vertCount * 2)
        const vel = new Float32Array(vertCount * 2)

        // ── GL setup ────────────────────────────────────────────────────
        const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC)
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
        if (!vs || !fs) return
        const program = linkProgram(gl, vs, fs)
        if (!program) return

        const aPos = gl.getAttribLocation(program, "aPos")
        const aUv = gl.getAttribLocation(program, "aUv")
        const aDisp = gl.getAttribLocation(program, "aDisp")
        const uTex = gl.getUniformLocation(program, "uTex")
        const uChroma = gl.getUniformLocation(program, "uChroma")
        const uColorA = gl.getUniformLocation(program, "uColorA")
        const uColorB = gl.getUniformLocation(program, "uColorB")

        const vao = gl.createVertexArray()
        gl.bindVertexArray(vao)

        const posBuf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        const uvBuf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf)
        gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW)
        gl.enableVertexAttribArray(aUv)
        gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0)

        const dispBuf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, dispBuf)
        gl.bufferData(gl.ARRAY_BUFFER, disp, gl.DYNAMIC_DRAW)
        gl.enableVertexAttribArray(aDisp)
        gl.vertexAttribPointer(aDisp, 2, gl.FLOAT, false, 0, 0)

        const idxBuf = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

        const tex = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

        let cancelled = false

        const rebuildTex = async () => {
            const w = Math.max(2, canvas.width)
            const h = Math.max(2, canvas.height)
            const dpr = window.devicePixelRatio || 1
            const realSize = fontSize * dpr
            // Wait for the requested font to be ready. Use both .load and
            // .ready so we cover Framer's async font injection — without
            // this canvas 2D silently falls back to system font, which is
            // why "font modal doesn't work" symptoms appear.
            try {
                if (typeof document !== "undefined") {
                    const fontStr = `${fontStyle} ${fontWeight} ${realSize}px ${fontFamily}`
                    if ((document as any).fonts?.load) {
                        await (document as any).fonts.load(fontStr)
                    }
                    if ((document as any).fonts?.ready) {
                        await (document as any).fonts.ready
                    }
                }
            } catch {
                /* ignore */
            }
            if (cancelled) return
            const c2 = renderTextToCanvas(
                String(text ?? ""),
                color ?? "#ffffff",
                fontFamily,
                fontWeight,
                fontStyle,
                realSize,
                w,
                h
            )
            gl.bindTexture(gl.TEXTURE_2D, tex)
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                c2
            )
        }

        // ── Resize ──────────────────────────────────────────────────────
        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            const rect = wrapper.getBoundingClientRect()
            const w = Math.max(2, Math.round(rect.width * dpr))
            const h = Math.max(2, Math.round(rect.height * dpr))
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w
                canvas.height = h
                gl.viewport(0, 0, w, h)
                rebuildTex()
            }
        }
        const ro = new ResizeObserver(resize)
        ro.observe(wrapper)
        resize()
        // Initial rebuild (in case resize was a no-op because size matched)
        rebuildTex()

        // ── Mouse tracking ──────────────────────────────────────────────
        const cursor = {
            x: 99,
            y: 99,
            px: 99,
            py: 99,
            vx: 0,
            vy: 0,
            inside: false,
        }
        const onMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect()
            const nx = (e.clientX - rect.left) / rect.width
            const ny = (e.clientY - rect.top) / rect.height
            const x = nx * 2 - 1
            const y = 1 - ny * 2
            if (!cursor.inside) {
                cursor.px = x
                cursor.py = y
                cursor.inside = true
            }
            cursor.x = x
            cursor.y = y
        }
        const onLeave = () => {
            cursor.inside = false
            cursor.x = 99
            cursor.y = 99
            cursor.vx = 0
            cursor.vy = 0
        }
        wrapper.addEventListener("pointermove", onMove)
        wrapper.addEventListener("pointerleave", onLeave)

        // ── Animation loop ──────────────────────────────────────────────
        let rafId = 0
        const tick = () => {
            cursor.vx = cursor.x - cursor.px
            cursor.vy = cursor.y - cursor.py
            const vmag = Math.hypot(cursor.vx, cursor.vy)
            if (vmag > 0.3) {
                cursor.vx = 0
                cursor.vy = 0
            }
            cursor.px = cursor.x
            cursor.py = cursor.y

            // Drag only — mesh vertices pulled along the cursor's motion.
            for (let i = 0; i < vertCount; i++) {
                const i2 = i * 2
                const px = positions[i2]
                const py = positions[i2 + 1]
                const dx = disp[i2]
                const dy = disp[i2 + 1]

                const cx = cursor.x - (px + dx)
                const cy = cursor.y - (py + dy)
                const cd = Math.hypot(cx, cy)
                const proximity = Math.max(0, 1 / (1 + cd / 0.05) - 0.1)

                let vx = vel[i2]
                let vy = vel[i2 + 1]

                const fpull = forceRef.current
                vx += cursor.vx * fpull * proximity
                vy += cursor.vy * fpull * proximity

                vx -= dx * SPRING_K
                vy -= dy * SPRING_K

                vx *= DAMPING
                vy *= DAMPING

                vel[i2] = vx
                vel[i2 + 1] = vy

                let ndx = dx + vx * DT
                let ndy = dy + vy * DT
                if (ndx > 1) ndx = 1
                else if (ndx < -1) ndx = -1
                if (ndy > 1) ndy = 1
                else if (ndy < -1) ndy = -1
                disp[i2] = ndx
                disp[i2 + 1] = ndy
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, dispBuf)
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, disp)

            gl.clearColor(0, 0, 0, 0)
            gl.clear(gl.COLOR_BUFFER_BIT)

            gl.useProgram(program)
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, tex)
            gl.uniform1i(uTex, 0)
            gl.uniform1f(uChroma, colorSplitRef.current ? 1.0 : 0.0)

            // Pick the two split colours by cycling through the user
            // array (each pair (i, i+1) held for 400 ms then advance).
            // Empty array → fall back to red + blue.
            let cA: [number, number, number] = [1, 0, 0]
            let cB: [number, number, number] = [0, 0, 1]
            const cols = customColorsRef.current
            if (cols.length === 1) {
                cA = cols[0]
                cB = cols[0]
            } else if (cols.length > 1) {
                const cycleMs = 400
                const idx =
                    Math.floor(performance.now() / cycleMs) % cols.length
                cA = cols[idx]
                cB = cols[(idx + 1) % cols.length]
            }
            gl.uniform3f(uColorA, cA[0], cA[1], cA[2])
            gl.uniform3f(uColorB, cB[0], cB[1], cB[2])

            gl.enable(gl.BLEND)
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

            gl.bindVertexArray(vao)
            gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_INT, 0)

            rafId = requestAnimationFrame(tick)
        }
        rafId = requestAnimationFrame(tick)

        return () => {
            cancelled = true
            cancelAnimationFrame(rafId)
            ro.disconnect()
            wrapper.removeEventListener("pointermove", onMove)
            wrapper.removeEventListener("pointerleave", onLeave)
            gl.deleteBuffer(posBuf)
            gl.deleteBuffer(uvBuf)
            gl.deleteBuffer(dispBuf)
            gl.deleteBuffer(idxBuf)
            gl.deleteTexture(tex)
            gl.deleteVertexArray(vao)
            gl.deleteProgram(program)
            gl.deleteShader(vs)
            gl.deleteShader(fs)
        }
    }, [text, color, fontFamily, fontWeight, fontStyle, fontSize])

    return (
        <div
            ref={wrapperRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                userSelect: "none",
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    )
}

const COMPONENT_DEFAULTS = {
    text: "MESH",
    color: "#ffffff",
    font: {
        fontFamily: "Inter",
        variant: "Bold",
        fontSize: 180,
        lineHeight: "1em",
    } as any,
    colorSplit: true,
    customColors: ["#ff40c0", "#40ff80"],
    force: 18,
}
```

===============================================================================
FILE: client/src/styles/theme.css
===============================================================================

```css
:root {

  --primary:       #f5ad42;
  --primary-hover: #db9c3e;
  --primary-light: #ecfdf5;
  --primary-text:  #f5ad42;

  --bg-main:      #FFF8E1;
  --bg-secondary: #f9fafb;
  --bg-card:      #ffffff;
  --bg-input:     #f9fafb;
  --bg-nav:       rgba(255,255,255,0.92);
  --text-main:    #111827;
  --text-muted:   #6b7280;
  --text-faint:   #9ca3af;
  --border:       #e5e7eb;
  --border-hover: #d1d5db;
  --shadow:       0 8px 32px rgba(0,0,0,0.08);
}
[data-theme="dark"] {

  --bg-main:      #0f0f0f;
  --bg-secondary: #111111;
  --bg-card:      #1a1a1a;
  --bg-input:     #111111;
  --bg-nav:       rgba(15,15,15,0.92);
  --text-main:    #ffffff;
  --text-muted:   #9ca3af;
  --text-faint:   #6b7280;
  --border:       rgba(255,255,255,0.1);
  --border-hover: rgba(255,255,255,0.2);
  --shadow:       0 8px 32px rgba(0,0,0,0.4);
}
p,h1,span,li,button,input,textarea { font-family: 'Georgia', sans-serif; }
@keyframes spin { to { transform: rotate(360deg); } }
```

===============================================================================
FILE: client/tailwind.config.js
===============================================================================

```js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

===============================================================================
FILE: client/vercel.json
===============================================================================

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

===============================================================================
FILE: client/vite.config.js
===============================================================================

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

===============================================================================
FILE: README.md
===============================================================================

```md
# Ekalavya

> Generated by [merncraft](https://www.npmjs.com/package/merncraft) — scaffold production-ready apps in one command.

---

## 📁 Project Structure

```
Ekalavya/
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── guestlayout/  # Public pages
│   │   │   ├── userlayout/   # Authenticated user pages
│   │   │   └── adminlayout/  # Admin pages
│   │   ├── context/          # Theme context
│   │   ├── styles/           # theme.css (CSS variables)
│   │   ├── axiosConfig.jsx   # Axios instance
│   │   └── App.jsx           # Routes
│   ├── .env                  # Frontend env vars
│   └── package.json
└── server/               # Express backend
    ├── controllers/          # Route handlers
    ├── models/               # Mongoose models
    ├── routes/               # Express routes
    ├── middleware/           # Auth middleware
    ├── config/               # Email & Cloudinary config
    ├── index.js              # Server entry point
    ├── .env                  # Backend env vars
    └── package.json
```

---

## 🚀 Getting Started

### 1. Setup Backend

```bash
cd server
```

Edit `server/.env` and fill in your values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM_NAME=Ekalavya
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

### 2. Setup Frontend

```bash
cd client
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:5173
```

---

## 🎨 Theme & Styling

This project uses **CSS variables** for all colors and theme values defined in `client/src/styles/theme.css`.

| Variable | Description |
|---|---|
| `--primary` | Primary brand color |
| `--bg-main` | Main background |
| `--bg-card` | Card background |
| `--text-main` | Primary text |
| `--text-muted` | Secondary text |
| `--border` | Border color |

Theme toggle is enabled. The toggle button appears in the navbar and saves preference to `localStorage`.

---

## 🔐 Authentication

Uses **JWT stored in httpOnly cookies** for secure authentication.

| Route | Access | Description |
|---|---|---|
| `POST /api/auth/register` | Public | Create account |
| `POST /api/auth/login` | Public | Login |
| `POST /api/auth/logout` | Auth | Logout |
| `GET /api/auth/me` | Auth | Get current user |
| `PUT /api/auth/profile` | Auth | Update name |
| `PUT /api/auth/change-password` | Auth | Change password |
| `PUT /api/auth/profile-pic` | Auth | Upload profile picture |

---

## 👥 Roles

| Role | Access |
|---|---|
| **Guest** | Public pages only |
| **User** | Dashboard, Feedback, Profile |
| **Admin** | All user access + admin panel |

To make a user admin, update their role in MongoDB:
```js
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```

---

## 📡 API Routes

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
PUT    /api/auth/profile
PUT    /api/auth/change-password
PUT    /api/auth/profile-pic
```

### Feedback
```
POST   /api/feedback
GET    /api/feedback/my
GET    /api/feedback/all
DELETE /api/feedback/:id
```

### Admin
```
GET    /api/admin/users
GET    /api/admin/stats
DELETE /api/admin/users/:id
PUT    /api/admin/users/:id/ban
PUT    /api/admin/users/:id/role
DELETE /api/admin/feedback/:id
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router |
| Styling | Tailwind CSS v3 + CSS Variables |
| HTTP | Axios (withCredentials) |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT, httpOnly Cookies, bcryptjs |
| Email | Nodemailer (Gmail) |
| Uploads | Cloudinary, Multer |

---

## 📝 License

MIT — free to use, modify and distribute.

---

> Built with ❤️ using [merncraft](https://www.npmjs.com/package/merncraft)
```

===============================================================================
FILE: server/config/cloudinaryConfig.js
===============================================================================

```js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

===============================================================================
FILE: server/config/emailConfig.js
===============================================================================

```js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || "MyApp"}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Email error:", err.message);
    throw err;
  }
};

export default transporter;
```

===============================================================================
FILE: server/controllers/adminAcademicController.js
===============================================================================

```js
import University from "../models/University.js";
import Course from "../models/Course.js";
import Subject from "../models/Subject.js";

// ── UNIVERSITY ────────────────────────────────────────────────────────────────
export const addUniversity = async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await University.findOne({ name });
    if (exists) return res.status(400).json({ message: "University already exists" });
    const university = await University.create({ name });
    res.status(201).json(university);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUniversity = async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await University.findOne({ name, _id: { $ne: req.params.id } });
    if (exists) return res.status(400).json({ message: "University name already taken" });
    const university = await University.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!university) return res.status(404).json({ message: "University not found" });
    res.status(200).json(university);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);
    if (!university) return res.status(404).json({ message: "University not found" });
    // Cascade delete courses and subjects under this university
    await Course.deleteMany({ university: req.params.id });
    await Subject.deleteMany({ university: req.params.id });
    res.status(200).json({ message: "University and all related data deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find().sort({ name: 1 });
    res.status(200).json(universities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── COURSE ────────────────────────────────────────────────────────────────────
export const addCourse = async (req, res) => {
  try {
    const { name, universityId, totalSemesters } = req.body;
    const university = await University.findById(universityId);
    if (!university) return res.status(404).json({ message: "University not found" });
    const course = await Course.create({ name, university: universityId, totalSemesters });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { name, totalSemesters } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, totalSemesters },
      { new: true, runValidators: true }
    );
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    // Cascade delete subjects under this course
    await Subject.deleteMany({ course: req.params.id });
    res.status(200).json({ message: "Course and its subjects deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCoursesByUniversity = async (req, res) => {
  try {
    const courses = await Course.find({ university: req.params.universityId });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── SUBJECT ───────────────────────────────────────────────────────────────────
export const addSubject = async (req, res) => {
  try {
    const { name, universityId, courseId, semester } = req.body;
    const subject = await Subject.create({
      name, university: universityId, course: courseId, semester,
    });
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { name, semester } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, semester },
      { new: true, runValidators: true }
    );
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json({ message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const { courseId, semester } = req.params;
    const subjects = await Subject.find({ course: courseId, semester });
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

===============================================================================
FILE: server/controllers/adminController.js
===============================================================================

```js
import User from "../models/User.js";
import Feedback from "../models/Feedback.js";
import Contact from "../models/Contact.js";
// ─── GET ALL USERS ───────────────────────────────────────
export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── GET STATS ───────────────────────────────────────────
export const getStats = async (req, res) => {
  try {
    console.log("getStats", req.user);
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    const [users, feedbacks, contacts, unreadContacts] = await Promise.all([
      User.countDocuments(),
      Feedback.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
    ]);

    res.status(200).json({ users, feedbacks, contacts, unreadContacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// ─── DELETE USER ─────────────────────────────────────────
export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot delete your own account." });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete all feedbacks by this user too
    await Feedback.deleteMany({ userId: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User and their feedbacks deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── BAN / UNBAN USER ────────────────────────────────────
export const toggleBanUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot ban your own account." });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.isBanned = !user.isBanned;
    await user.save();

    res.status(200).json({
      message: user.isBanned ? "User banned successfully." : "User unbanned successfully.",
      isBanned: user.isBanned,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── CHANGE USER ROLE ────────────────────────────────────
export const changeUserRole = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    const { role } = req.body;

    if (!role || !["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Role must be user or admin." });
    }

    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot change your own role." });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Role updated successfully.", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── ADMIN DELETE ANY FEEDBACK ───────────────────────────
export const adminDeleteFeedback = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Feedback deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

===============================================================================
FILE: server/controllers/adminFacultyController.js
===============================================================================

```js
import Faculty from "../models/Faculty.js";
import { sendEmail } from "../config/emailConfig.js";

// Get all faculty
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find()
      .populate("university", "name")
      .populate("course", "name")
      .sort({ createdAt: -1 });

    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve Faculty
export const approveFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty)
      return res.status(404).json({
        message: "Faculty not found",
      });

    faculty.isApproved = true;

    await faculty.save();

    await sendEmail({
      to: faculty.email,
      subject: "Faculty Account Approved",
      html: `
      <h2>Congratulations ${faculty.name}</h2>

      <p>Your faculty account has been approved.</p>

      <p>You can now login.</p>
      `,
    });

    res.json({
      message: "Faculty approved successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Reject Faculty
export const rejectFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty)
      return res.status(404).json({
        message: "Faculty not found",
      });

    await sendEmail({
      to: faculty.email,
      subject: "Faculty Registration Rejected",
      html: `
      <h2>Hello ${faculty.name}</h2>

      <p>Your faculty registration has been rejected.</p>

      <p>Please contact administrator.</p>
      `,
    });

    await faculty.deleteOne();

    res.json({
      message: "Faculty rejected.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
```

===============================================================================
FILE: server/controllers/contactController.js
===============================================================================

```js
import Contact from "../models/Contact.js";
import { sendEmail } from "../config/emailConfig.js";

// ─── SUBMIT CONTACT ──────────────────────────────────────
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required." });
    }

    const contact = await Contact.create({ name, email, subject, message });


    // Notify admin
    try {
      await sendEmail({
        to: process.env.EMAIL_USER,
        subject: `New Contact Message: ${subject || "No subject"}`,
        html: `
          <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f9f9f9;'>
            <div style='background: #fff; border-radius: 12px; padding: 32px;'>
              <h2 style='color: #1a1a1a; margin: 0 0 24px;'>New Contact Message</h2>
              <table style='width: 100%; border-collapse: collapse;'>
                <tr>
                  <td style='padding: 10px 0; color: #888; font-size: 13px; width: 80px;'>Name</td>
                  <td style='padding: 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;'>${name}</td>
                </tr>
                <tr>
                  <td style='padding: 10px 0; color: #888; font-size: 13px;'>Email</td>
                  <td style='padding: 10px 0; color: #1a1a1a; font-size: 14px;'>${email}</td>
                </tr>
                <tr>
                  <td style='padding: 10px 0; color: #888; font-size: 13px;'>Subject</td>
                  <td style='padding: 10px 0; color: #1a1a1a; font-size: 14px;'>${subject || "—"}</td>
                </tr>
                <tr>
                  <td style='padding: 10px 16px 10px 0; color: #888; font-size: 13px; vertical-align: top;'>Message</td>
                  <td style='padding: 10px 0; color: #1a1a1a; font-size: 14px; line-height: 1.7;'>${message}</td>
                </tr>
              </table>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn("Contact notification email failed:", emailErr.message);
    }


    res.status(201).json({ message: "Message sent successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── GET ALL CONTACTS (ADMIN) ────────────────────────────
export const getAllContacts = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── MARK AS READ ────────────────────────────────────────
export const markAsRead = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Message not found." });
    }

    res.status(200).json({ message: "Marked as read.", contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── DELETE CONTACT ──────────────────────────────────────
export const deleteContact = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Message not found." });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

===============================================================================
FILE: server/controllers/facultyController.js
===============================================================================

```js
import jwt from "jsonwebtoken";
import Faculty from "../models/Faculty.js";
import { sendEmail } from "../config/emailConfig.js";
import { v2 as cloudinary } from "cloudinary";

// ─── HELPERS ─────────────────────────────────────────────
const sendFacultyTokenCookie = (res, facultyId) => {
  const token = jwt.sign({ id: facultyId, role: "faculty" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("faculty_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

// ─── REGISTER ────────────────────────────────────────────
export const facultyRegister = async (req, res) => {
  try {
    const { name, email, password, university, course, designation } = req.body;

    if (!name || !email || !password || !university || !course) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    const existing = await Faculty.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const faculty = await Faculty.create({
      name,
      email,
      password,
      university,
      course,
      designation: designation || "",
      isApproved: false,
    });

    // Notify the registering faculty
    try {
      await sendEmail({
        to: faculty.email,
        subject: `Faculty Registration Received — ${process.env.EMAIL_FROM_NAME || "Ekalavya"}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#f9f9f9;">
            <div style="background:#fff;border-radius:12px;padding:40px;box-shadow:0 2px 10px rgba(0,0,0,0.08);">
              <h1 style="color:#1a1a1a;font-size:26px;margin:0 0 8px;">Registration Received 🎓</h1>
              <p style="color:#666;font-size:15px;margin:0 0 28px;">Hi <strong>${faculty.name}</strong>, your faculty account request has been submitted successfully.</p>
              <div style="background:#f0f4ff;border-radius:8px;padding:20px;margin-bottom:28px;">
                <p style="margin:0 0 6px;color:#444;font-size:14px;"><strong>Email:</strong> ${faculty.email}</p>
                <p style="margin:0;color:#444;font-size:14px;"><strong>Status:</strong> <span style="color:#d97706;font-weight:700;">Pending Approval</span></p>
              </div>
              <p style="color:#666;font-size:14px;margin:0 0 24px;">
                An administrator will review your account and you'll receive an approval email within 1–2 business days.
              </p>
              <hr style="border:none;border-top:1px solid #eee;margin:28px 0;" />
              <p style="color:#999;font-size:12px;margin:0;">If you did not make this request, please ignore this email.</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn("Faculty registration email failed:", emailErr.message);
    }

    // Notify admin
    try {
      if (process.env.ADMIN_EMAIL) {
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New Faculty Registration — ${faculty.name}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#f9f9f9;">
              <div style="background:#fff;border-radius:12px;padding:40px;">
                <h1 style="color:#1a1a1a;font-size:22px;margin:0 0 20px;">New Faculty Registration</h1>
                <div style="background:#f0f4ff;border-radius:8px;padding:20px;margin-bottom:24px;">
                  <p style="margin:0 0 8px;color:#444;font-size:14px;"><strong>Name:</strong> ${faculty.name}</p>
                  <p style="margin:0 0 8px;color:#444;font-size:14px;"><strong>Email:</strong> ${faculty.email}</p>
                  <p style="margin:0 0 8px;color:#444;font-size:14px;"><strong>Designation:</strong> ${faculty.designation || "—"}</p>
                  <p style="margin:0;color:#444;font-size:14px;"><strong>Registered:</strong> ${new Date().toLocaleString()}</p>
                </div>
                <a href="${process.env.CLIENT_URL || "http://localhost:5173"}/admin/faculty"
                  style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;">
                  Review in Admin Panel →
                </a>
              </div>
            </div>
          `,
        });
      }
    } catch (adminEmailErr) {
      console.warn("Admin notification email failed:", adminEmailErr.message);
    }

    res.status(201).json({
      message: "Registration submitted. Await admin approval.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── LOGIN ───────────────────────────────────────────────
export const facultyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (faculty.isBanned) {
      return res.status(403).json({ message: "Your account has been banned." });
    }

    if (!faculty.isApproved) {
      return res.status(403).json({ message: "Your account is pending admin approval. Please wait for the approval email." });
    }

    const isMatch = await faculty.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    sendFacultyTokenCookie(res, faculty._id);

    res.status(200).json({
      message: "Login successful.",
      user: {
        _id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        role: faculty.role,
        designation: faculty.designation,
        university: faculty.university,
        course: faculty.course,
        isApproved: faculty.isApproved,
        profilePic: faculty.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── LOGOUT ──────────────────────────────────────────────
export const facultyLogout = async (req, res) => {
  res.clearCookie("faculty_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully." });
};

// ─── GET ME ──────────────────────────────────────────────
export const getFacultyMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── UPDATE PROFILE ──────────────────────────────────────
export const updateFacultyProfile = async (req, res) => {
  try {
    const { name, email, designation } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const emailExists = await Faculty.findOne({ email, _id: { $ne: req.user._id } });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.user._id,
      { name, email, designation },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated successfully.", user: updatedFaculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── CHANGE PASSWORD ─────────────────────────────────────
export const changeFacultyPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters." });
    }

    const faculty = await Faculty.findById(req.user._id);
    const isMatch = await faculty.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }

    faculty.password = newPassword;
    await faculty.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── UPLOAD PROFILE PIC ──────────────────────────────────
export const uploadFacultyProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    if (req.user.profilePicPublicId) {
      await cloudinary.uploader.destroy(req.user.profilePicPublicId);
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.user._id,
      { profilePic: req.file.path, profilePicPublicId: req.file.filename },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile picture updated.", user: updatedFaculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── FORGOT PASSWORD ─────────────────────────────────────
export const facultyForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required." });
    }

    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(200).json({ message: "If this email is registered, a new password has been sent." });
    }

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let newPassword = "";
    for (let i = 0; i < 10; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    faculty.password = newPassword;
    await faculty.save();

    try {
      await sendEmail({
        to: faculty.email,
        subject: `Password Reset — ${process.env.EMAIL_FROM_NAME || "Ekalavya"}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#f9f9f9;">
            <div style="background:#fff;border-radius:12px;padding:40px;">
              <h1 style="color:#1a1a1a;font-size:24px;margin:0 0 12px;">Password Reset</h1>
              <p style="color:#666;font-size:15px;margin:0 0 28px;">Hi ${faculty.name}, your faculty account password has been reset.</p>
              <div style="background:#f0f4ff;border-radius:8px;padding:20px;margin-bottom:28px;text-align:center;">
                <p style="margin:0 0 8px;font-size:13px;color:#888;">Your new temporary password</p>
                <p style="margin:0;font-size:24px;font-weight:900;letter-spacing:3px;color:#1a1a1a;font-family:monospace;">${newPassword}</p>
              </div>
              <p style="color:#666;font-size:14px;margin:0 0 24px;">Please log in and change your password immediately from your profile settings.</p>
              <a href="${process.env.CLIENT_URL || "http://localhost:5173"}/faculty/login"
                style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">
                Go to Faculty Login →
              </a>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn("Faculty reset email failed:", emailErr.message);
    }

    res.status(200).json({ message: "If this email is registered, a new password has been sent." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

===============================================================================
FILE: server/controllers/feedbackController.js
===============================================================================

```js
import Feedback from "../models/Feedback.js";

// ─── SUBMIT FEEDBACK ─────────────────────────────────────
export const submit = async (req, res) => {
  try {
    const { message, rating } = req.body;

    if (!message || !rating) {
      return res.status(400).json({ message: "Message and rating are required." });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    const feedback = await Feedback.create({
      userId: req.user._id,
      message,
      rating,
    });

    res.status(201).json({ message: "Feedback submitted.", feedback });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── GET MY FEEDBACKS ────────────────────────────────────
export const getMyFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── GET ALL FEEDBACKS (ADMIN) ───────────────────────────
export const getAllFeedbacks = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    const feedbacks = await Feedback.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── DELETE OWN FEEDBACK ─────────────────────────────────
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    if (feedback.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to delete this feedback." });
    }

    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Feedback deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

===============================================================================
FILE: server/controllers/noteController.js
===============================================================================

```js
import Note from "../models/Note.js";

// ── CREATE ────────────────────────────────────────────────────────────────────
export const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      uploadedBy: req.user._id,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── GET FACULTY'S OWN NOTES (with filters) ────────────────────────────────────
export const getFacultyNotes = async (req, res) => {
  try {
    const { universityId, courseId, semester, subjectId } = req.query;
    console.log(req);
    const filter = { uploadedBy: req.user._id }; // ONLY their own notes

    if (universityId) filter.university = universityId;
    if (courseId) filter.course = courseId;
    if (semester) filter.semester = Number(semester);
    if (subjectId) filter.subject = subjectId;

    const notes = await Note.find(filter)
      .populate("university", "name")
      .populate("course", "name")
      .populate("subject", "name")
      .sort({ createdAt: -1 }); // newest first in list view

    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// ── GET SINGLE NOTE (faculty must own it) ─────────────────────────────────────
export const getFacultyNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      uploadedBy: req.user._id, // ownership check
    })
      .populate("university", "name")
      .populate("course", "name")
      .populate("subject", "name");

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or access denied" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── UPDATE (faculty must own it) ──────────────────────────────────────────────
export const updateNote = async (req, res) => {
  try {
    // findOneAndUpdate with ownership check in the query itself
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, uploadedBy: req.user._id },
      { ...req.body },
      { new: true, runValidators: true },
    );

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or access denied" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── DELETE (faculty must own it) ──────────────────────────────────────────────
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      uploadedBy: req.user._id, // ownership check
    });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or access denied" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── STUDENT: get notes by their enrolled course/semester ──────────────────────
export const getNotesBySubject = async (req, res) => {
  try {
    const { universityId, courseId, semester, subjectId } = req.query;

    const notes = await Note.find({
      university: universityId,
      course: courseId,
      semester,
      subject: subjectId,
    }).sort({ order: 1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentNotes = async (req, res) => {
  try {
    const { universityId, courseId, semester } = req.query;

    if (!universityId || !courseId || !semester) {
      return res.status(400).json({
        message: "University, course and semester are required.",
      });
    }

    const notes = await Note.find({
      university: universityId,
      course: courseId,
      semester: Number(semester),
    })
      .populate("university", "name")
      .populate("course", "name")
      .populate("subject", "name")
      .populate("uploadedBy", "name email")
      .sort({
        order: 1,
        createdAt: 1,
      });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Get student notes error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
```

===============================================================================
FILE: server/controllers/uploadController.js
===============================================================================

```js
import cloudinary from "../config/cloudinaryConfig.js";
import { Readable } from "stream";

/**
 * Uploads a single image buffer to Cloudinary and returns the secure URL.
 * Route: POST /api/notes/upload-image
 * Middleware: auth, upload.single("image")   ← multer in memory storage
 */
export const uploadNoteImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    // Stream the buffer to Cloudinary (avoids writing to disk)
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ekalavya/notes",
          allowed_formats: ["jpg", "jpeg", "png", "webp", "gif", "svg"],
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // Pipe the in-memory buffer into the Cloudinary stream
      Readable.from(req.file.buffer).pipe(stream);
    });

    res.status(200).json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
};
```

===============================================================================
FILE: server/controllers/userController.js
===============================================================================

```js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendEmail } from "../config/emailConfig.js";
import { v2 as cloudinary } from "cloudinary";

const sendTokenCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

// ─── REGISTER ────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    const { name, email, password, university, course, semester } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (!university?.trim() || !course?.trim() || !semester) {
      return res.status(400).json({
        message: "University, course and semester are required.",
      });
    }

    const semesterNumber = Number(semester);

    if (
      !Number.isInteger(semesterNumber) ||
      semesterNumber < 1 ||
      semesterNumber > 20
    ) {
      return res.status(400).json({
        message: "Invalid semester.",
      });
    }
    if (password.length < 8 && password.length > 32) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters to 32 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      university: university.trim(),
      course: course.trim(),
      semester: semesterNumber,
    });

    sendTokenCookie(res, user._id);

    try {
      await sendEmail({
        to: user.email,
        subject: `Welcome to ${process.env.EMAIL_FROM_NAME || "MyApp"} 🎉`,
        html: `
          <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f9f9f9;'>
            <div style='background: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);'>
              <h1 style='color: #1a1a1a; font-size: 28px; margin: 0 0 8px;'>Welcome, ${user.name}! 👋</h1>
              <p style='color: #666; font-size: 16px; margin: 0 0 32px;'>Your account has been created successfully.</p>
              <div style='background: #f0f4ff; border-radius: 8px; padding: 20px; margin-bottom: 32px;'>
                <p style='margin: 0; color: #444; font-size: 14px;'><strong>Email:</strong> ${user.email}</p>
              </div>
              <a href='${process.env.CLIENT_URL || "http://localhost:5173"}/login'
                style='display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 600;'>
                Go to Login →
              </a>
              <hr style='border: none; border-top: 1px solid #eee; margin: 32px 0;' />
              <p style='color: #999; font-size: 12px; margin: 0;'>If you did not create this account, you can safely ignore this email.</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn("Welcome email failed:", emailErr.message);
    }

    res.status(201).json({
      message: "Registration successful.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── LOGIN ───────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    console.log(user);
    if (user.isBanned) {
      return res.status(403).json({ message: "Your account has been banned." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    sendTokenCookie(res, user._id);

    res.status(200).json({
      message: "Login successful.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── LOGOUT ──────────────────────────────────────────────
export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully." });
};

// ─── GET ME ──────────────────────────────────────────────
export const getMe = async (req, res) => {
  try {
    console.log(req.user);
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── UPDATE PROFILE ──────────────────────────────────────
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const emailExists = await User.findOne({
      email,
      _id: { $ne: req.user._id },
    });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    ).select("-password");

    res
      .status(200)
      .json({ message: "Profile updated successfully.", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── CHANGE PASSWORD ─────────────────────────────────────
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "New password must be at least 8 characters." });
    }

    const user = await User.findById(req.user._id);
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── FORGOT PASSWORD ─────────────────────────────────────
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({
          message: "If this email is registered, a new password has been sent.",
        });
    }

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let newPassword = "";
    for (let i = 0; i < 10; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    user.password = newPassword;
    await user.save();

    try {
      await sendEmail({
        to: user.email,
        subject: `Your new password for ${process.env.EMAIL_FROM_NAME || "MyApp"}`,
        html: `
          <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f9f9f9;'>
            <div style='background: #ffffff; border-radius: 12px; padding: 40px;'>
              <h1 style='color: #1a1a1a; font-size: 24px; margin: 0 0 12px;'>Password Reset</h1>
              <p style='color: #666; font-size: 15px; margin: 0 0 28px;'>Hi ${user.name}, your password has been reset.</p>
              <div style='background: #f0f4ff; border-radius: 8px; padding: 20px; margin-bottom: 28px; text-align: center;'>
                <p style='margin: 0 0 8px; font-size: 13px; color: #888;'>Your new temporary password</p>
                <p style='margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 3px; color: #1a1a1a; font-family: monospace;'>${newPassword}</p>
              </div>
              <p style='color: #666; font-size: 14px; margin: 0 0 24px;'>
                Please login with this password and change it immediately from your profile settings.
              </p>
              <a href='${process.env.CLIENT_URL || "http://localhost:5173"}/login'
                style='display: inline-block; background: #2563eb; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 600;'>
                Go to Login →
              </a>
              <hr style='border: none; border-top: 1px solid #eee; margin: 32px 0;' />
              <p style='color: #999; font-size: 12px; margin: 0;'>
                If you did not request a password reset, please contact support immediately.
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn("Reset email failed:", emailErr.message);
    }

    res
      .status(200)
      .json({
        message: "If this email is registered, a new password has been sent.",
      });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ message: "Failed to process request. Try again." });
  }
};

// ─── UPLOAD PROFILE PIC ──────────────────────────────────
export const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Delete old profile pic from cloudinary if exists
    if (req.user.profilePicPublicId) {
      await cloudinary.uploader.destroy(req.user.profilePicPublicId);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePic: req.file.path,
        profilePicPublicId: req.file.filename,
      },
      { new: true },
    ).select("-password");

    res.status(200).json({
      message: "Profile picture updated.",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```

===============================================================================
FILE: server/index.js
===============================================================================

```js
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminAcademicRoutes from "./routes/adminAcademicRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import adminFacultyRoutes from "./routes/adminFacultyRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";

dotenv.config();

const app = express();

// ─── SECURITY HEADERS ────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false,
}));

// ─── RATE LIMITERS ───────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many attempts. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { message: "Too many requests. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── NOSQL INJECTION SANITIZER ───────────────────────────
// Strips keys starting with $ or containing . from body and params
// Avoids touching req.query which is read-only in Express 5
const sanitizeObject = (obj) => {
  if (obj && typeof obj === "object") {
    Object.keys(obj).forEach((key) => {
      if (key.startsWith("$") || key.includes(".")) {
        delete obj[key];
      } else {
        sanitizeObject(obj[key]);
      }
    });
  }
};

const mongoSanitize = (req, res, next) => {
  if (req.body) sanitizeObject(req.body);
  if (req.params) sanitizeObject(req.params);
  next();
};

// ─── MIDDLEWARE ──────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(
  Boolean,
);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(mongoSanitize);

// ─── ROUTES ─────────────────────────────────────────────
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth/forgot-password", authLimiter);
app.use("/api/auth", generalLimiter, userRoutes);
app.use("/api/admin", generalLimiter, adminRoutes);
app.use("/api/feedback", generalLimiter, feedbackRoutes);
app.use("/api/contact", generalLimiter, contactRoutes);
app.use("/api/academic", generalLimiter, adminAcademicRoutes);
app.use("/api/facultyadmin", generalLimiter, adminFacultyRoutes);
app.use("/api/faculty", generalLimiter, facultyRoutes);
app.use("/api/notes", generalLimiter, noteRoutes);

// ─── HEALTH CHECK ────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// ─── ERROR HANDLER ───────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong." });
});

// ─── CONNECT DB + START SERVER ───────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT }`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
```

===============================================================================
FILE: server/middleware/admin.js
===============================================================================

```js
export default (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};
```

===============================================================================
FILE: server/middleware/auth.js
===============================================================================

```js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    console.log("auth",req.cookies);
    const token = req.cookies.token ;

    if (!token) {
      return res.status(401).json({ message: "Not authorized. No token." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Not authorized. User not found." });
    }

    if (user.isBanned) {
      return res.status(403).json({ message: "Your account has been banned." });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized. Invalid token." });
  }
};

export default auth;


```

===============================================================================
FILE: server/middleware/authMany.js
===============================================================================

```js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Faculty from "../models/Faculty.js";

const authAny = async (req, res, next) => {
  try {
    // Student token
    if (req.cookies.token) {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user)
        return res.status(401).json({ message: "User not found." });

      if (user.isBanned)
        return res.status(403).json({ message: "Your account has been banned." });

      req.user = user;
      req.role = "student";

      return next();
    }

    // Faculty token
    if (req.cookies.faculty_token) {
      const decoded = jwt.verify(
        req.cookies.faculty_token,
        process.env.JWT_SECRET
      );

      const faculty = await Faculty.findById(decoded.id)
        .populate("university", "name")
        .populate("course", "name")
        .select("-password");

      if (!faculty)
        return res.status(401).json({ message: "Faculty not found." });

      if (!faculty.isApproved)
        return res.status(403).json({ message: "Faculty not approved." });

      if (faculty.isBanned)
        return res.status(403).json({ message: "Faculty account banned." });

      req.user = faculty;
      req.role = "faculty";

      return next();
    }

    return res.status(401).json({
      message: "Authentication required.",
    });
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export default authAny;
```

===============================================================================
FILE: server/middleware/facultyAuth.js
===============================================================================

```js
import jwt from "jsonwebtoken";
import Faculty from "../models/Faculty.js";

const facultyAuth = async (req, res, next) => {
  try {
    // Read token from cookie
    const token = req.cookies.faculty_token;
    console.log("token",token);
    if (!token) {
      return res.status(401).json({
        message: "Not authorized. No token.",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find faculty
    const faculty = await Faculty.findById(decoded.id)
      .populate("university", "name")
      .populate("course", "name")
      .select("-password");

    if (!faculty) {
      return res.status(401).json({
        message: "Not authorized. Faculty not found.",
      });
    }

    // Check role
    if (faculty.role !== "faculty") {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    // Check approval
    if (!faculty.isApproved) {
      return res.status(403).json({
        message: "Your account is pending admin approval.",
      });
    }

    // Check ban
    if (faculty.isBanned) {
      return res.status(403).json({
        message: "Your account has been banned.",
      });
    }

    // Attach faculty to request
    req.user = faculty;
    console.log("req.user", req.user);
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized. Invalid or expired token.",
    });
  }
};

export default facultyAuth;
```

===============================================================================
FILE: server/middleware/upload.js
===============================================================================

```js
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
```

===============================================================================
FILE: server/middleware/uploadMemory.js
===============================================================================

```js
import multer from "multer";

// Store file in memory (buffer), NOT on disk or Cloudinary yet.
// The controller decides where to send it.
const uploadMemory = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

export default uploadMemory;
```

===============================================================================
FILE: server/models/Contact.js
===============================================================================

```js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
```

===============================================================================
FILE: server/models/Course.js
===============================================================================

```js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },

  totalSemesters: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Course", courseSchema);
```

===============================================================================
FILE: server/models/Faculty.js
===============================================================================

```js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },

    role: {
      type: String,
      default: "faculty",
      immutable: true,
    },

    designation: {
      type: String,
      trim: true,
      default: "",
    },

    // Academic affiliation
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: [true, "University is required"],
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },

    // Admin must approve before faculty can log in
    isApproved: {
      type: Boolean,
      default: false,
    },

    isBanned: {
      type: Boolean,
      default: false,
    },

    profilePic: {
      type: String,
      default: "",
    },

    profilePicPublicId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

facultySchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

facultySchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("Faculty", facultySchema);
```

===============================================================================
FILE: server/models/Feedback.js
===============================================================================

```js
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: [true, "Feedback message is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
```

===============================================================================
FILE: server/models/Note.js
===============================================================================

```js
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: Number,
      default: 1,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
```

===============================================================================
FILE: server/models/Subject.js
===============================================================================

```js
import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
```

===============================================================================
FILE: server/models/University.js
===============================================================================

```js
import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("University", universitySchema);
```

===============================================================================
FILE: server/models/User.js
===============================================================================

```js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },

    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      default: "student",
    },

    // Academic Information
    university: {
      type: String,
      trim: true,
      default: "",
    },

    course: {
      type: String,
      trim: true,
      default: "",
    },

    semester: {
      type: Number,
      min: 1,
      default: null,
    },

    isBanned: {
      type: Boolean,
      default: false,
    },

    profilePic: {
      type: String,
      default: "",
    },

    profilePicPublicId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
```

===============================================================================
FILE: server/package.json
===============================================================================

```json
{
  "name": "server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  },
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cloudinary": "^2.10.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "express-rate-limit": "^8.5.2",
    "helmet": "^8.2.0",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.7.3",
    "multer": "^2.2.0",
    "multer-storage-cloudinary": "^4.0.0",
    "nodemailer": "^9.0.1",
    "ws": "^8.21.0"
  }
}
```

===============================================================================
FILE: server/routes/adminAcademicRoutes.js
===============================================================================

```js
import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
  addUniversity, updateUniversity, deleteUniversity, getUniversities,
  addCourse,      updateCourse,      deleteCourse,      getCoursesByUniversity,
  addSubject,     updateSubject,     deleteSubject,      getSubjects,
} from "../controllers/adminAcademicController.js";

const router = express.Router();

// ── Universities ──────────────────────────────────────────────────────────────
router.get(   "/universities",          getUniversities);
router.post(  "/universities",          auth, admin, addUniversity);
router.put(   "/universities/:id",      auth, admin, updateUniversity);
router.delete("/universities/:id",      auth, admin, deleteUniversity);

// ── Courses ───────────────────────────────────────────────────────────────────
router.get(   "/courses/:universityId", getCoursesByUniversity);
router.post(  "/courses",              auth, admin, addCourse);
router.put(   "/courses/:id",          auth, admin, updateCourse);
router.delete("/courses/:id",          auth, admin, deleteCourse);

// ── Subjects ──────────────────────────────────────────────────────────────────
router.get(   "/subjects/:courseId/:semester", getSubjects);
router.post(  "/subjects",             auth, admin, addSubject);
router.put(   "/subjects/:id",         auth, admin, updateSubject);
router.delete("/subjects/:id",         auth, admin, deleteSubject);

export default router;
```

===============================================================================
FILE: server/routes/adminFacultyRoutes.js
===============================================================================

```js
import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
  getAllFaculty,
  approveFaculty,
  rejectFaculty,
} from "../controllers/adminFacultyController.js";

const adminFacultyRoutes = express.Router();

adminFacultyRoutes.use(auth, admin);

adminFacultyRoutes.get("/faculty", getAllFaculty);

adminFacultyRoutes.put(
  "/faculty/approve/:id",
  approveFaculty
);

adminFacultyRoutes.delete(
  "/faculty/reject/:id",
  rejectFaculty
);

export default adminFacultyRoutes;
```

===============================================================================
FILE: server/routes/adminRoutes.js
===============================================================================

```js
import express from "express";
import auth from "../middleware/auth.js";
import {
  getUsers,
  getStats,
  deleteUser,
  toggleBanUser,
  changeUserRole,
  adminDeleteFeedback,
} from "../controllers/adminController.js";
import admin from "../middleware/admin.js";
import authAny from "../middleware/authMany.js";

const router = express.Router();

router.get("/users", authAny, getUsers);
router.get("/stats", authAny, getStats);
router.delete("/users/:id", authAny, deleteUser);
router.put("/users/:id/ban", authAny, toggleBanUser);
router.put("/users/:id/role", authAny, changeUserRole);
router.delete("/feedback/:id", authAny, adminDeleteFeedback);

export default router;
```

===============================================================================
FILE: server/routes/contactRoutes.js
===============================================================================

```js
import express from "express";
import auth from "../middleware/auth.js";
import {
  submitContact,
  getAllContacts,
  markAsRead,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitContact);                        // public
router.get("/", auth, getAllContacts);                  // admin
router.put("/:id/read", auth, markAsRead);              // admin
router.delete("/:id", auth, deleteContact);             // admin

export default router;
```

===============================================================================
FILE: server/routes/facultyRoutes.js
===============================================================================

```js
import express from "express";
import upload from "../middleware/upload.js";
import facultyAuth from "../middleware/facultyAuth.js";

import {
  facultyRegister,
  facultyLogin,
  facultyLogout,
  getFacultyMe,
  updateFacultyProfile,
  changeFacultyPassword,
  uploadFacultyProfilePic,
  facultyForgotPassword,
} from "../controllers/facultyController.js";

const facultyRoutes = express.Router();

// Public Routes
facultyRoutes.post("/register", facultyRegister);
facultyRoutes.post("/login", facultyLogin);
facultyRoutes.post("/logout",facultyAuth, facultyLogout);
facultyRoutes.post("/forgot-password", facultyForgotPassword);

// Protected Routes
facultyRoutes.get("/me", facultyAuth, getFacultyMe);

facultyRoutes.put(
  "/profile",
  facultyAuth,
  updateFacultyProfile
);

facultyRoutes.put(
  "/change-password",
  facultyAuth,
  changeFacultyPassword
);

facultyRoutes.put(
  "/profile-pic",
  facultyAuth,
  upload.single("profilePic"),
  uploadFacultyProfilePic
);

export default facultyRoutes;
```

===============================================================================
FILE: server/routes/feedbackRoutes.js
===============================================================================

```js
import express from "express";
import auth from "../middleware/auth.js";
import {
  submit,
  getMyFeedbacks,
  getAllFeedbacks,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import authAny from "../middleware/authMany.js";

const router = express.Router();

router.post("/", auth, submit);
router.get("/my", auth, getMyFeedbacks);
router.get("/all", authAny, getAllFeedbacks);
router.delete("/:id", auth, deleteFeedback);

export default router;
```

===============================================================================
FILE: server/routes/noteRoutes.js
===============================================================================

```js
import express from "express";
import auth from "../middleware/auth.js";
import uploadMemory from "../middleware/uploadMemory.js";

import {
  createNote,
  getFacultyNotes,
  getFacultyNoteById,
  updateNote,
  deleteNote,
  getNotesBySubject,
  getStudentNotes,
} from "../controllers/noteController.js";
import { uploadNoteImage } from "../controllers/uploadController.js";
import facultyAuth from "../middleware/facultyAuth.js";
import { facultyLogin } from "../controllers/facultyController.js";

const noteRoutes = express.Router();

// ── Media upload ──────────────────────────────────────────────────────────────
noteRoutes.post("/upload-image", facultyAuth, uploadMemory.single("image"), uploadNoteImage);

// ── Static routes FIRST (before any /:id routes) ─────────────────────────────
noteRoutes.get("/faculty",   facultyAuth, getFacultyNotes);    // ← MUST be before /:id
noteRoutes.get("/student",   auth, getStudentNotes);    // ← MUST be before /:id

// ── Faculty CRUD ──────────────────────────────────────────────────────────────
noteRoutes.post("/",         facultyAuth, createNote);
noteRoutes.get("/",          auth, getNotesBySubject);
noteRoutes.get("/:id",       auth, getFacultyNoteById); // ← dynamic param LAST
noteRoutes.put("/:id",       facultyAuth, updateNote);
noteRoutes.delete("/:id", facultyAuth, deleteNote);

export default noteRoutes;
```

===============================================================================
FILE: server/routes/userRoutes.js
===============================================================================

```js
import express from "express";
import auth from "../middleware/auth.js";
import {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  updateProfile,
  changePassword,
  uploadProfilePic,
} from "../controllers/userController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", auth, getMe);
router.put("/profile", auth, updateProfile);
router.put("/change-password", auth, changePassword);
router.put("/profile-pic", auth, upload.single("profilePic"), uploadProfilePic);
router.post("/forgot-password", forgotPassword);
export default router;
```

-------------------------------------------------------------------------------

Generated by ctx

Total Files: 98
