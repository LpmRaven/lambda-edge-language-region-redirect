const domainDefaultLanguage = "EN";
const languageFallback = "EN";
const languageConfig = [
    {
        "code": "aa",
        "name": "Afar",
        "nativeName": "Afaraf",
        "enabled": false
    },
    {
        "code": "ab",
        "name": "Abkhaz",
        "nativeName": "аҧсуа бызшәа",
        "enabled": false
    },
    {
        "code": "ae",
        "name": "Avestan",
        "nativeName": "avesta",
        "enabled": false
    },
    {
        "code": "af",
        "name": "Afrikaans",
        "nativeName": "Afrikaans",
        "enabled": false
    },
    {
        "code": "ak",
        "name": "Akan",
        "nativeName": "Akan",
        "enabled": false
    },
    {
        "code": "am",
        "name": "Amharic",
        "nativeName": "አማርኛ",
        "enabled": false
    },
    {
        "code": "an",
        "name": "Aragonese",
        "nativeName": "aragonés",
        "enabled": false
    },
    {
        "code": "ar",
        "name": "Arabic",
        "nativeName": "اللغة العربية",
        "enabled": false
    },
    {
        "code": "as",
        "name": "Assamese",
        "nativeName": "অসমীয়া",
        "enabled": false
    },
    {
        "code": "av",
        "name": "Avaric",
        "nativeName": "авар мацӀ",
        "enabled": false
    },
    {
        "code": "ay",
        "name": "Aymara",
        "nativeName": "aymar aru",
        "enabled": false
    },
    {
        "code": "az",
        "name": "Azerbaijani",
        "nativeName": "azərbaycan dili",
        "enabled": false
    },
    {
        "code": "ba",
        "name": "Bashkir",
        "nativeName": "башҡорт теле",
        "enabled": false
    },
    {
        "code": "be",
        "name": "Belarusian",
        "nativeName": "беларуская мова",
        "enabled": false
    },
    {
        "code": "bg",
        "name": "Bulgarian",
        "nativeName": "български език",
        "enabled": false
    },
    {
        "code": "bh",
        "name": "Bihari",
        "nativeName": "भोजपुरी",
        "enabled": false
    },
    {
        "code": "bi",
        "name": "Bislama",
        "nativeName": "Bislama",
        "enabled": false
    },
    {
        "code": "bm",
        "name": "Bambara",
        "nativeName": "bamanankan",
        "enabled": false
    },
    {
        "code": "bn",
        "name": "Bengali",
        "nativeName": "বাংলা",
        "enabled": false
    },
    {
        "code": "bo",
        "name": "Tibetan Standard",
        "nativeName": "བོད་ཡིག",
        "enabled": false
    },
    {
        "code": "br",
        "name": "Breton",
        "nativeName": "brezhoneg",
        "enabled": false
    },
    {
        "code": "bs",
        "name": "Bosnian",
        "nativeName": "bosanski jezik",
        "enabled": false
    },
    {
        "code": "ca",
        "name": "Catalan",
        "nativeName": "Català",
        "enabled": false
    },
    {
        "code": "ce",
        "name": "Chechen",
        "nativeName": "нохчийн мотт",
        "enabled": false
    },
    {
        "code": "ch",
        "name": "Chamorro",
        "nativeName": "Chamoru",
        "enabled": false
    },
    {
        "code": "co",
        "name": "Corsican",
        "nativeName": "corsu",
        "enabled": false
    },
    {
        "code": "cr",
        "name": "Cree",
        "nativeName": "ᓀᐦᐃᔭᐍᐏᐣ",
        "enabled": false
    },
    {
        "code": "cs",
        "name": "Czech",
        "nativeName": "čeština",
        "enabled": false
    },
    {
        "code": "cu",
        "name": "Old Church Slavonic",
        "nativeName": "ѩзыкъ словѣньскъ",
        "enabled": false
    },
    {
        "code": "cv",
        "name": "Chuvash",
        "nativeName": "чӑваш чӗлхи",
        "enabled": false
    },
    {
        "code": "cy",
        "name": "Welsh",
        "nativeName": "Cymraeg",
        "enabled": false
    },
    {
        "code": "da",
        "name": "Danish",
        "nativeName": "dansk",
        "enabled": false
    },
    {
        "code": "de",
        "name": "German",
        "nativeName": "Deutsch",
        "enabled": false
    },
    {
        "code": "dv",
        "name": "Divehi",
        "nativeName": "Dhivehi",
        "enabled": false
    },
    {
        "code": "dz",
        "name": "Dzongkha",
        "nativeName": "རྫོང་ཁ",
        "enabled": false
    },
    {
        "code": "ee",
        "name": "Ewe",
        "nativeName": "Eʋegbe",
        "enabled": false
    },
    {
        "code": "el",
        "name": "Greek",
        "nativeName": "Ελληνικά",
        "enabled": false
    },
    {
        "code": "en",
        "name": "English",
        "nativeName": "English",
        "enabled": false
    },
    {
        "code": "eo",
        "name": "Esperanto",
        "nativeName": "Esperanto",
        "enabled": false
    },
    {
        "code": "es",
        "name": "Spanish",
        "nativeName": "Español",
        "enabled": false
    },
    {
        "code": "et",
        "name": "Estonian",
        "nativeName": "eesti",
        "enabled": false
    },
    {
        "code": "eu",
        "name": "Basque",
        "nativeName": "euskara",
        "enabled": false
    },
    {
        "code": "fa",
        "name": "Persian",
        "nativeName": "فارسی",
        "enabled": false
    },
    {
        "code": "ff",
        "name": "Fula",
        "nativeName": "Fulfulde",
        "enabled": false
    },
    {
        "code": "fi",
        "name": "Finnish",
        "nativeName": "suomi",
        "enabled": false
    },
    {
        "code": "fj",
        "name": "Fijian",
        "nativeName": "Vakaviti",
        "enabled": false
    },
    {
        "code": "fo",
        "name": "Faroese",
        "nativeName": "føroyskt",
        "enabled": false
    },
    {
        "code": "fr",
        "name": "French",
        "nativeName": "Français",
        "enabled": false
    },
    {
        "code": "fy",
        "name": "Western Frisian",
        "nativeName": "Frysk",
        "enabled": false
    },
    {
        "code": "ga",
        "name": "Irish",
        "nativeName": "Gaeilge",
        "enabled": false
    },
    {
        "code": "gd",
        "name": "Scottish Gaelic",
        "nativeName": "Gàidhlig",
        "enabled": false
    },
    {
        "code": "gl",
        "name": "Galician",
        "nativeName": "galego",
        "enabled": false
    },
    {
        "code": "gn",
        "name": "Guaraní",
        "nativeName": "Avañe'ẽ",
        "enabled": false
    },
    {
        "code": "gu",
        "name": "Gujarati",
        "nativeName": "ગુજરાતી",
        "enabled": false
    },
    {
        "code": "gv",
        "name": "Manx",
        "nativeName": "Gaelg",
        "enabled": false
    },
    {
        "code": "ha",
        "name": "Hausa",
        "nativeName": "هَوُسَ",
        "enabled": false
    },
    {
        "code": "he",
        "name": "Hebrew",
        "nativeName": "עברית",
        "enabled": false
    },
    {
        "code": "hi",
        "name": "Hindi",
        "nativeName": "हिन्दी",
        "enabled": false
    },
    {
        "code": "ho",
        "name": "Hiri Motu",
        "nativeName": "Hiri Motu",
        "enabled": false
    },
    {
        "code": "hr",
        "name": "Croatian",
        "nativeName": "hrvatski jezik",
        "enabled": false
    },
    {
        "code": "ht",
        "name": "Haitian",
        "nativeName": "Kreyòl ayisyen",
        "enabled": false
    },
    {
        "code": "hu",
        "name": "Hungarian",
        "nativeName": "magyar",
        "enabled": false
    },
    {
        "code": "hy",
        "name": "Armenian",
        "nativeName": "Հայերեն",
        "enabled": false
    },
    {
        "code": "hz",
        "name": "Herero",
        "nativeName": "Otjiherero",
        "enabled": false
    },
    {
        "code": "ia",
        "name": "Interlingua",
        "nativeName": "Interlingua",
        "enabled": false
    },
    {
        "code": "id",
        "name": "Indonesian",
        "nativeName": "Bahasa Indonesia",
        "enabled": false
    },
    {
        "code": "ie",
        "name": "Interlingue",
        "nativeName": "Interlingue",
        "enabled": false
    },
    {
        "code": "ig",
        "name": "Igbo",
        "nativeName": "Asụsụ Igbo",
        "enabled": false
    },
    {
        "code": "ii",
        "name": "Nuosu",
        "nativeName": "ꆈꌠ꒿ Nuosuhxop",
        "enabled": false
    },
    {
        "code": "ik",
        "name": "Inupiaq",
        "nativeName": "Iñupiaq",
        "enabled": false
    },
    {
        "code": "io",
        "name": "Ido",
        "nativeName": "Ido",
        "enabled": false
    },
    {
        "code": "is",
        "name": "Icelandic",
        "nativeName": "Íslenska",
        "enabled": false
    },
    {
        "code": "it",
        "name": "Italian",
        "nativeName": "Italiano",
        "enabled": false
    },
    {
        "code": "iu",
        "name": "Inuktitut",
        "nativeName": "ᐃᓄᒃᑎᑐᑦ",
        "enabled": false
    },
    {
        "code": "ja",
        "name": "Japanese",
        "nativeName": "日本語",
        "enabled": false
    },
    {
        "code": "jv",
        "name": "Javanese",
        "nativeName": "basa Jawa",
        "enabled": false
    },
    {
        "code": "ka",
        "name": "Georgian",
        "nativeName": "ქართული",
        "enabled": false
    },
    {
        "code": "kg",
        "name": "Kongo",
        "nativeName": "Kikongo",
        "enabled": false
    },
    {
        "code": "ki",
        "name": "Kikuyu",
        "nativeName": "Gĩkũyũ",
        "enabled": false
    },
    {
        "code": "kj",
        "name": "Kwanyama",
        "nativeName": "Kuanyama",
        "enabled": false
    },
    {
        "code": "kk",
        "name": "Kazakh",
        "nativeName": "қазақ тілі",
        "enabled": false
    },
    {
        "code": "kl",
        "name": "Kalaallisut",
        "nativeName": "kalaallisut",
        "enabled": false
    },
    {
        "code": "km",
        "name": "Khmer",
        "nativeName": "ខេមរភាសា",
        "enabled": false
    },
    {
        "code": "kn",
        "name": "Kannada",
        "nativeName": "ಕನ್ನಡ",
        "enabled": false
    },
    {
        "code": "ko",
        "name": "Korean",
        "nativeName": "한국어",
        "enabled": false
    },
    {
        "code": "kr",
        "name": "Kanuri",
        "nativeName": "Kanuri",
        "enabled": false
    },
    {
        "code": "ks",
        "name": "Kashmiri",
        "nativeName": "कश्मीरी",
        "enabled": false
    },
    {
        "code": "ku",
        "name": "Kurdish",
        "nativeName": "Kurdî",
        "enabled": false
    },
    {
        "code": "kv",
        "name": "Komi",
        "nativeName": "коми кыв",
        "enabled": false
    },
    {
        "code": "kw",
        "name": "Cornish",
        "nativeName": "Kernewek",
        "enabled": false
    },
    {
        "code": "ky",
        "name": "Kyrgyz",
        "nativeName": "Кыргызча",
        "enabled": false
    },
    {
        "code": "la",
        "name": "Latin",
        "nativeName": "latine",
        "enabled": false
    },
    {
        "code": "lb",
        "name": "Luxembourgish",
        "nativeName": "Lëtzebuergesch",
        "enabled": false
    },
    {
        "code": "lg",
        "name": "Ganda",
        "nativeName": "Luganda",
        "enabled": false
    },
    {
        "code": "li",
        "name": "Limburgish",
        "nativeName": "Limburgs",
        "enabled": false
    },
    {
        "code": "ln",
        "name": "Lingala",
        "nativeName": "Lingála",
        "enabled": false
    },
    {
        "code": "lo",
        "name": "Lao",
        "nativeName": "ພາສາ",
        "enabled": false
    },
    {
        "code": "lt",
        "name": "Lithuanian",
        "nativeName": "lietuvių kalba",
        "enabled": false
    },
    {
        "code": "lu",
        "name": "Luba-Katanga",
        "nativeName": "Tshiluba",
        "enabled": false
    },
    {
        "code": "lv",
        "name": "Latvian",
        "nativeName": "latviešu valoda",
        "enabled": false
    },
    {
        "code": "mg",
        "name": "Malagasy",
        "nativeName": "fiteny malagasy",
        "enabled": false
    },
    {
        "code": "mh",
        "name": "Marshallese",
        "nativeName": "Kajin M̧ajeļ",
        "enabled": false
    },
    {
        "code": "mi",
        "name": "Māori",
        "nativeName": "te reo Māori",
        "enabled": false
    },
    {
        "code": "mk",
        "name": "Macedonian",
        "nativeName": "македонски јазик",
        "enabled": false
    },
    {
        "code": "ml",
        "name": "Malayalam",
        "nativeName": "മലയാളം",
        "enabled": false
    },
    {
        "code": "mn",
        "name": "Mongolian",
        "nativeName": "Монгол хэл",
        "enabled": false
    },
    {
        "code": "mr",
        "name": "Marathi",
        "nativeName": "मराठी",
        "enabled": false
    },
    {
        "code": "ms",
        "name": "Malay",
        "nativeName": "Bahasa Malaysia",
        "enabled": false
    },
    {
        "code": "mt",
        "name": "Maltese",
        "nativeName": "Malti",
        "enabled": false
    },
    {
        "code": "my",
        "name": "Burmese",
        "nativeName": "ဗမာစာ",
        "enabled": false
    },
    {
        "code": "na",
        "name": "Nauru",
        "nativeName": "Ekakairũ Naoero",
        "enabled": false
    },
    {
        "code": "nb",
        "name": "Norwegian Bokmål",
        "nativeName": "Norsk bokmål",
        "enabled": false
    },
    {
        "code": "nd",
        "name": "Northern Ndebele",
        "nativeName": "isiNdebele",
        "enabled": false
    },
    {
        "code": "ne",
        "name": "Nepali",
        "nativeName": "नेपाली",
        "enabled": false
    },
    {
        "code": "ng",
        "name": "Ndonga",
        "nativeName": "Owambo",
        "enabled": false
    },
    {
        "code": "nl",
        "name": "Dutch",
        "nativeName": "Nederlands",
        "enabled": false
    },
    {
        "code": "nn",
        "name": "Norwegian Nynorsk",
        "nativeName": "Norsk nynorsk",
        "enabled": false
    },
    {
        "code": "no",
        "name": "Norwegian",
        "nativeName": "Norsk",
        "enabled": false
    },
    {
        "code": "nr",
        "name": "Southern Ndebele",
        "nativeName": "isiNdebele",
        "enabled": false
    },
    {
        "code": "nv",
        "name": "Navajo",
        "nativeName": "Diné bizaad",
        "enabled": false
    },
    {
        "code": "ny",
        "name": "Chichewa",
        "nativeName": "chiCheŵa",
        "enabled": false
    },
    {
        "code": "oc",
        "name": "Occitan",
        "nativeName": "occitan",
        "enabled": false
    },
    {
        "code": "oj",
        "name": "Ojibwe",
        "nativeName": "ᐊᓂᔑᓈᐯᒧᐎᓐ",
        "enabled": false
    },
    {
        "code": "om",
        "name": "Oromo",
        "nativeName": "Afaan Oromoo",
        "enabled": false
    },
    {
        "code": "or",
        "name": "Oriya",
        "nativeName": "ଓଡ଼ିଆ",
        "enabled": false
    },
    {
        "code": "os",
        "name": "Ossetian",
        "nativeName": "ирон æвзаг",
        "enabled": false
    },
    {
        "code": "pa",
        "name": "Panjabi",
        "nativeName": "ਪੰਜਾਬੀ",
        "enabled": false
    },
    {
        "code": "pi",
        "name": "Pāli",
        "nativeName": "पाऴि",
        "enabled": false
    },
    {
        "code": "pl",
        "name": "Polish",
        "nativeName": "język polski",
        "enabled": false
    },
    {
        "code": "ps",
        "name": "Pashto",
        "nativeName": "پښتو",
        "enabled": false
    },
    {
        "code": "pt",
        "name": "Portuguese",
        "nativeName": "Português",
        "enabled": false
    },
    {
        "code": "qu",
        "name": "Quechua",
        "nativeName": "Runa Simi",
        "enabled": false
    },
    {
        "code": "rm",
        "name": "Romansh",
        "nativeName": "rumantsch grischun",
        "enabled": false
    },
    {
        "code": "rn",
        "name": "Kirundi",
        "nativeName": "Ikirundi",
        "enabled": false
    },
    {
        "code": "ro",
        "name": "Romanian",
        "nativeName": "Română",
        "enabled": false
    },
    {
        "code": "ru",
        "name": "Russian",
        "nativeName": "Русский",
        "enabled": false
    },
    {
        "code": "rw",
        "name": "Kinyarwanda",
        "nativeName": "Ikinyarwanda",
        "enabled": false
    },
    {
        "code": "sa",
        "name": "Sanskrit",
        "nativeName": "संस्कृतम्",
        "enabled": false
    },
    {
        "code": "sc",
        "name": "Sardinian",
        "nativeName": "sardu",
        "enabled": false
    },
    {
        "code": "sd",
        "name": "Sindhi",
        "nativeName": "सिन्धी",
        "enabled": false
    },
    {
        "code": "se",
        "name": "Northern Sami",
        "nativeName": "Davvisámegiella",
        "enabled": false
    },
    {
        "code": "sg",
        "name": "Sango",
        "nativeName": "yângâ tî sängö",
        "enabled": false
    },
    {
        "code": "si",
        "name": "Sinhala",
        "nativeName": "සිංහල",
        "enabled": false
    },
    {
        "code": "sk",
        "name": "Slovak",
        "nativeName": "slovenčina",
        "enabled": false
    },
    {
        "code": "sl",
        "name": "Slovene",
        "nativeName": "slovenski jezik",
        "enabled": false
    },
    {
        "code": "sm",
        "name": "Samoan",
        "nativeName": "gagana fa'a Samoa",
        "enabled": false
    },
    {
        "code": "sn",
        "name": "Shona",
        "nativeName": "chiShona",
        "enabled": false
    },
    {
        "code": "so",
        "name": "Somali",
        "nativeName": "Soomaaliga",
        "enabled": false
    },
    {
        "code": "sq",
        "name": "Albanian",
        "nativeName": "Shqip",
        "enabled": false
    },
    {
        "code": "sr",
        "name": "Serbian",
        "nativeName": "српски језик",
        "enabled": false
    },
    {
        "code": "ss",
        "name": "Swati",
        "nativeName": "SiSwati",
        "enabled": false
    },
    {
        "code": "st",
        "name": "Southern Sotho",
        "nativeName": "Sesotho",
        "enabled": false
    },
    {
        "code": "su",
        "name": "Sundanese",
        "nativeName": "Basa Sunda",
        "enabled": false
    },
    {
        "code": "sv",
        "name": "Swedish",
        "nativeName": "Svenska",
        "enabled": false
    },
    {
        "code": "sw",
        "name": "Swahili",
        "nativeName": "Kiswahili",
        "enabled": false
    },
    {
        "code": "ta",
        "name": "Tamil",
        "nativeName": "தமிழ்",
        "enabled": false
    },
    {
        "code": "te",
        "name": "Telugu",
        "nativeName": "తెలుగు",
        "enabled": false
    },
    {
        "code": "tg",
        "name": "Tajik",
        "nativeName": "тоҷикӣ",
        "enabled": false
    },
    {
        "code": "th",
        "name": "Thai",
        "nativeName": "ไทย",
        "enabled": false
    },
    {
        "code": "ti",
        "name": "Tigrinya",
        "nativeName": "ትግርኛ",
        "enabled": false
    },
    {
        "code": "tk",
        "name": "Turkmen",
        "nativeName": "Türkmen",
        "enabled": false
    },
    {
        "code": "tl",
        "name": "Tagalog",
        "nativeName": "Wikang Tagalog",
        "enabled": false
    },
    {
        "code": "tn",
        "name": "Tswana",
        "nativeName": "Setswana",
        "enabled": false
    },
    {
        "code": "to",
        "name": "Tonga",
        "nativeName": "faka Tonga",
        "enabled": false
    },
    {
        "code": "tr",
        "name": "Turkish",
        "nativeName": "Türkçe",
        "enabled": false
    },
    {
        "code": "ts",
        "name": "Tsonga",
        "nativeName": "Xitsonga",
        "enabled": false
    },
    {
        "code": "tt",
        "name": "Tatar",
        "nativeName": "татар теле",
        "enabled": false
    },
    {
        "code": "tw",
        "name": "Twi",
        "nativeName": "Twi",
        "enabled": false
    },
    {
        "code": "ty",
        "name": "Tahitian",
        "nativeName": "Reo Tahiti",
        "enabled": false
    },
    {
        "code": "ug",
        "name": "Uyghur",
        "nativeName": "ئۇيغۇرچە‎",
        "enabled": false
    },
    {
        "code": "uk",
        "name": "Ukrainian",
        "nativeName": "Українська",
        "enabled": false
    },
    {
        "code": "ur",
        "name": "Urdu",
        "nativeName": "اردو",
        "enabled": false
    },
    {
        "code": "uz",
        "name": "Uzbek",
        "nativeName": "Ўзбек",
        "enabled": false
    },
    {
        "code": "ve",
        "name": "Venda",
        "nativeName": "Tshivenḓa",
        "enabled": false
    },
    {
        "code": "vi",
        "name": "Vietnamese",
        "nativeName": "Tiếng Việt",
        "enabled": false
    },
    {
        "code": "vo",
        "name": "Volapük",
        "nativeName": "Volapük",
        "enabled": false
    },
    {
        "code": "wa",
        "name": "Walloon",
        "nativeName": "walon",
        "enabled": false
    },
    {
        "code": "wo",
        "name": "Wolof",
        "nativeName": "Wollof",
        "enabled": false
    },
    {
        "code": "xh",
        "name": "Xhosa",
        "nativeName": "isiXhosa",
        "enabled": false
    },
    {
        "code": "yi",
        "name": "Yiddish",
        "nativeName": "ייִדיש",
        "enabled": false
    },
    {
        "code": "yo",
        "name": "Yoruba",
        "nativeName": "Yorùbá",
        "enabled": false
    },
    {
        "code": "za",
        "name": "Zhuang",
        "nativeName": "Saɯ cueŋƅ",
        "enabled": false
    },
    {
        "code": "zh",
        "name": "Chinese",
        "nativeName": "中文",
        "enabled": false
    },
    {
        "code": "zu",
        "name": "Zulu",
        "nativeName": "isiZulu",
        "enabled": false
    }
];
module.exports = { languageConfig, languageFallback, domainDefaultLanguage };
