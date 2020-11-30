
const countryFallback = "us";
const countryConfig = [
    {
        "code": "AD",
        "name": "Andorra",
        "enabled": false
    },
    {
        "code": "AE",
        "name": "United Arab Emirates",
        "enabled": false
    },
    {
        "code": "AF",
        "name": "Afghanistan",
        "enabled": false
    },
    {
        "code": "AG",
        "name": "Antigua and Barbuda",
        "enabled": false
    },
    {
        "code": "AI",
        "name": "Anguilla",
        "enabled": false
    },
    {
        "code": "AL",
        "name": "Albania",
        "enabled": false
    },
    {
        "code": "AM",
        "name": "Armenia",
        "enabled": false
    },
    {
        "code": "AO",
        "name": "Angola",
        "enabled": false
    },
    {
        "code": "AQ",
        "name": "Antarctica",
        "enabled": false
    },
    {
        "code": "AR",
        "name": "Argentina",
        "enabled": false
    },
    {
        "code": "AS",
        "name": "American Samoa",
        "enabled": false
    },
    {
        "code": "AT",
        "name": "Austria",
        "enabled": false
    },
    {
        "code": "AU",
        "name": "Australia",
        "enabled": true
    },
    {
        "code": "AW",
        "name": "Aruba",
        "enabled": false
    },
    {
        "code": "AX",
        "name": "Åland Islands",
        "enabled": false
    },
    {
        "code": "AZ",
        "name": "Azerbaijan",
        "enabled": false
    },
    {
        "code": "BA",
        "name": "Bosnia and Herzegovina",
        "enabled": false
    },
    {
        "code": "BB",
        "name": "Barbados",
        "enabled": false
    },
    {
        "code": "BD",
        "name": "Bangladesh",
        "enabled": false
    },
    {
        "code": "BE",
        "name": "Belgium",
        "enabled": false
    },
    {
        "code": "BF",
        "name": "Burkina Faso",
        "enabled": false
    },
    {
        "code": "BG",
        "name": "Bulgaria",
        "enabled": false
    },
    {
        "code": "BH",
        "name": "Bahrain",
        "enabled": false
    },
    {
        "code": "BI",
        "name": "Burundi",
        "enabled": false
    },
    {
        "code": "BJ",
        "name": "Benin",
        "enabled": false
    },
    {
        "code": "BL",
        "name": "Saint Barthélemy",
        "enabled": false
    },
    {
        "code": "BM",
        "name": "Bermuda",
        "enabled": false
    },
    {
        "code": "BN",
        "name": "Brunei Darussalam",
        "enabled": false
    },
    {
        "code": "BO",
        "name": "Bolivia, Plurinational State of",
        "enabled": false
    },
    {
        "code": "BQ",
        "name": "Bonaire, Sint Eustatius and Saba",
        "enabled": false
    },
    {
        "code": "BR",
        "name": "Brazil",
        "enabled": false
    },
    {
        "code": "BS",
        "name": "Bahamas",
        "enabled": false
    },
    {
        "code": "BT",
        "name": "Bhutan",
        "enabled": false
    },
    {
        "code": "BV",
        "name": "Bouvet Island",
        "enabled": false
    },
    {
        "code": "BW",
        "name": "Botswana",
        "enabled": false
    },
    {
        "code": "BY",
        "name": "Belarus",
        "enabled": false
    },
    {
        "code": "BZ",
        "name": "Belize",
        "enabled": false
    },
    {
        "code": "CA",
        "name": "Canada",
        "enabled": true
    },
    {
        "code": "CC",
        "name": "Cocos (Keeling) Islands",
        "enabled": false
    },
    {
        "code": "CD",
        "name": "Congo, Democratic Republic of the",
        "enabled": false
    },
    {
        "code": "CF",
        "name": "Central African Republic",
        "enabled": false
    },
    {
        "code": "CG",
        "name": "Congo",
        "enabled": false
    },
    {
        "code": "CH",
        "name": "Switzerland",
        "enabled": false
    },
    {
        "code": "CI",
        "name": "Côte d'Ivoire",
        "enabled": false
    },
    {
        "code": "CK",
        "name": "Cook Islands",
        "enabled": false
    },
    {
        "code": "CL",
        "name": "Chile",
        "enabled": false
    },
    {
        "code": "CM",
        "name": "Cameroon",
        "enabled": false
    },
    {
        "code": "CN",
        "name": "China",
        "enabled": false
    },
    {
        "code": "CO",
        "name": "Colombia",
        "enabled": false
    },
    {
        "code": "CR",
        "name": "Costa Rica",
        "enabled": false
    },
    {
        "code": "CU",
        "name": "Cuba",
        "enabled": false
    },
    {
        "code": "CV",
        "name": "Cabo Verde",
        "enabled": false
    },
    {
        "code": "CW",
        "name": "Curaçao",
        "enabled": false
    },
    {
        "code": "CX",
        "name": "Christmas Island",
        "enabled": false
    },
    {
        "code": "CY",
        "name": "Cyprus",
        "enabled": false
    },
    {
        "code": "CZ",
        "name": "Czechia",
        "enabled": false
    },
    {
        "code": "DE",
        "name": "Germany",
        "enabled": false
    },
    {
        "code": "DJ",
        "name": "Djibouti",
        "enabled": false
    },
    {
        "code": "DK",
        "name": "Denmark",
        "enabled": false
    },
    {
        "code": "DM",
        "name": "Dominica",
        "enabled": false
    },
    {
        "code": "DO",
        "name": "Dominican Republic",
        "enabled": false
    },
    {
        "code": "DZ",
        "name": "Algeria",
        "enabled": false
    },
    {
        "code": "EC",
        "name": "Ecuador",
        "enabled": false
    },
    {
        "code": "EE",
        "name": "Estonia",
        "enabled": false
    },
    {
        "code": "EG",
        "name": "Egypt",
        "enabled": false
    },
    {
        "code": "EH",
        "name": "Western Sahara",
        "enabled": false
    },
    {
        "code": "ER",
        "name": "Eritrea",
        "enabled": false
    },
    {
        "code": "ES",
        "name": "Spain",
        "enabled": false
    },
    {
        "code": "ET",
        "name": "Ethiopia",
        "enabled": false
    },
    {
        "code": "FI",
        "name": "Finland",
        "enabled": false
    },
    {
        "code": "FJ",
        "name": "Fiji",
        "enabled": false
    },
    {
        "code": "FK",
        "name": "Falkland Islands (Malvinas)",
        "enabled": false
    },
    {
        "code": "FM",
        "name": "Micronesia, Federated States of",
        "enabled": false
    },
    {
        "code": "FO",
        "name": "Faroe Islands",
        "enabled": false
    },
    {
        "code": "FR",
        "name": "France",
        "enabled": false
    },
    {
        "code": "GA",
        "name": "Gabon",
        "enabled": false
    },
    {
        "code": "GB",
        "name": "United Kingdom of Great Britain and Northern Ireland",
        "enabled": true
    },
    {
        "code": "GD",
        "name": "Grenada",
        "enabled": false
    },
    {
        "code": "GE",
        "name": "Georgia",
        "enabled": false
    },
    {
        "code": "GF",
        "name": "French Guiana",
        "enabled": false
    },
    {
        "code": "GG",
        "name": "Guernsey",
        "enabled": false
    },
    {
        "code": "GH",
        "name": "Ghana",
        "enabled": false
    },
    {
        "code": "GI",
        "name": "Gibraltar",
        "enabled": false
    },
    {
        "code": "GL",
        "name": "Greenland",
        "enabled": false
    },
    {
        "code": "GM",
        "name": "Gambia",
        "enabled": false
    },
    {
        "code": "GN",
        "name": "Guinea",
        "enabled": false
    },
    {
        "code": "GP",
        "name": "Guadeloupe",
        "enabled": false
    },
    {
        "code": "GQ",
        "name": "Equatorial Guinea",
        "enabled": false
    },
    {
        "code": "GR",
        "name": "Greece",
        "enabled": false
    },
    {
        "code": "GS",
        "name": "South Georgia and the South Sandwich Islands",
        "enabled": false
    },
    {
        "code": "GT",
        "name": "Guatemala",
        "enabled": false
    },
    {
        "code": "GU",
        "name": "Guam",
        "enabled": false
    },
    {
        "code": "GW",
        "name": "Guinea-Bissau",
        "enabled": false
    },
    {
        "code": "GY",
        "name": "Guyana",
        "enabled": false
    },
    {
        "code": "HK",
        "name": "Hong Kong",
        "enabled": false
    },
    {
        "code": "HM",
        "name": "Heard Island and McDonald Islands",
        "enabled": false
    },
    {
        "code": "HN",
        "name": "Honduras",
        "enabled": false
    },
    {
        "code": "HR",
        "name": "Croatia",
        "enabled": false
    },
    {
        "code": "HT",
        "name": "Haiti",
        "enabled": false
    },
    {
        "code": "HU",
        "name": "Hungary",
        "enabled": false
    },
    {
        "code": "ID",
        "name": "Indonesia",
        "enabled": false
    },
    {
        "code": "IE",
        "name": "Ireland",
        "enabled": false
    },
    {
        "code": "IL",
        "name": "Israel",
        "enabled": false
    },
    {
        "code": "IM",
        "name": "Isle of Man",
        "enabled": false
    },
    {
        "code": "IN",
        "name": "India",
        "enabled": false
    },
    {
        "code": "IO",
        "name": "British Indian Ocean Territory",
        "enabled": false
    },
    {
        "code": "IQ",
        "name": "Iraq",
        "enabled": false
    },
    {
        "code": "IR",
        "name": "Iran, Islamic Republic of",
        "enabled": false
    },
    {
        "code": "IS",
        "name": "Iceland",
        "enabled": false
    },
    {
        "code": "IT",
        "name": "Italy",
        "enabled": false
    },
    {
        "code": "JE",
        "name": "Jersey",
        "enabled": false
    },
    {
        "code": "JM",
        "name": "Jamaica",
        "enabled": false
    },
    {
        "code": "JO",
        "name": "Jordan",
        "enabled": false
    },
    {
        "code": "JP",
        "name": "Japan",
        "enabled": false
    },
    {
        "code": "KE",
        "name": "Kenya",
        "enabled": false
    },
    {
        "code": "KG",
        "name": "Kyrgyzstan",
        "enabled": false
    },
    {
        "code": "KH",
        "name": "Cambodia",
        "enabled": false
    },
    {
        "code": "KI",
        "name": "Kiribati",
        "enabled": false
    },
    {
        "code": "KM",
        "name": "Comoros",
        "enabled": false
    },
    {
        "code": "KN",
        "name": "Saint Kitts and Nevis",
        "enabled": false
    },
    {
        "code": "KP",
        "name": "Korea, Democratic People's Republic of",
        "enabled": false
    },
    {
        "code": "KR",
        "name": "Korea, Republic of",
        "enabled": false
    },
    {
        "code": "KW",
        "name": "Kuwait",
        "enabled": false
    },
    {
        "code": "KY",
        "name": "Cayman Islands",
        "enabled": false
    },
    {
        "code": "KZ",
        "name": "Kazakhstan",
        "enabled": false
    },
    {
        "code": "LA",
        "name": "Lao People's Democratic Republic",
        "enabled": false
    },
    {
        "code": "LB",
        "name": "Lebanon",
        "enabled": false
    },
    {
        "code": "LC",
        "name": "Saint Lucia",
        "enabled": false
    },
    {
        "code": "LI",
        "name": "Liechtenstein",
        "enabled": false
    },
    {
        "code": "LK",
        "name": "Sri Lanka",
        "enabled": false
    },
    {
        "code": "LR",
        "name": "Liberia",
        "enabled": false
    },
    {
        "code": "LS",
        "name": "Lesotho",
        "enabled": false
    },
    {
        "code": "LT",
        "name": "Lithuania",
        "enabled": false
    },
    {
        "code": "LU",
        "name": "Luxembourg",
        "enabled": false
    },
    {
        "code": "LV",
        "name": "Latvia",
        "enabled": false
    },
    {
        "code": "LY",
        "name": "Libya",
        "enabled": false
    },
    {
        "code": "MA",
        "name": "Morocco",
        "enabled": false
    },
    {
        "code": "MC",
        "name": "Monaco",
        "enabled": false
    },
    {
        "code": "MD",
        "name": "Moldova, Republic of",
        "enabled": false
    },
    {
        "code": "ME",
        "name": "Montenegro",
        "enabled": false
    },
    {
        "code": "MF",
        "name": "Saint Martin, (French part)",
        "enabled": false
    },
    {
        "code": "MG",
        "name": "Madagascar",
        "enabled": false
    },
    {
        "code": "MH",
        "name": "Marshall Islands",
        "enabled": false
    },
    {
        "code": "MK",
        "name": "North Macedonia",
        "enabled": false
    },
    {
        "code": "ML",
        "name": "Mali",
        "enabled": false
    },
    {
        "code": "MM",
        "name": "Myanmar",
        "enabled": false
    },
    {
        "code": "MN",
        "name": "Mongolia",
        "enabled": false
    },
    {
        "code": "MO",
        "name": "Macao",
        "enabled": false
    },
    {
        "code": "MP",
        "name": "Northern Mariana Islands",
        "enabled": false
    },
    {
        "code": "MQ",
        "name": "Martinique",
        "enabled": false
    },
    {
        "code": "MR",
        "name": "Mauritania",
        "enabled": false
    },
    {
        "code": "MS",
        "name": "Montserrat",
        "enabled": false
    },
    {
        "code": "MT",
        "name": "Malta",
        "enabled": false
    },
    {
        "code": "MU",
        "name": "Mauritius",
        "enabled": false
    },
    {
        "code": "MV",
        "name": "Maldives",
        "enabled": false
    },
    {
        "code": "MW",
        "name": "Malawi",
        "enabled": false
    },
    {
        "code": "MX",
        "name": "Mexico",
        "enabled": false
    },
    {
        "code": "MY",
        "name": "Malaysia",
        "enabled": false
    },
    {
        "code": "MZ",
        "name": "Mozambique",
        "enabled": false
    },
    {
        "code": "NA",
        "name": "Namibia",
        "enabled": false
    },
    {
        "code": "NC",
        "name": "New Caledonia",
        "enabled": false
    },
    {
        "code": "NE",
        "name": "Niger",
        "enabled": false
    },
    {
        "code": "NF",
        "name": "Norfolk Island",
        "enabled": false
    },
    {
        "code": "NG",
        "name": "Nigeria",
        "enabled": false
    },
    {
        "code": "NI",
        "name": "Nicaragua",
        "enabled": false
    },
    {
        "code": "NL",
        "name": "Netherlands",
        "enabled": false
    },
    {
        "code": "NO",
        "name": "Norway",
        "enabled": false
    },
    {
        "code": "NP",
        "name": "Nepal",
        "enabled": false
    },
    {
        "code": "NR",
        "name": "Nauru",
        "enabled": false
    },
    {
        "code": "NU",
        "name": "Niue",
        "enabled": false
    },
    {
        "code": "NZ",
        "name": "New Zealand",
        "enabled": true
    },
    {
        "code": "OM",
        "name": "Oman",
        "enabled": false
    },
    {
        "code": "PA",
        "name": "Panama",
        "enabled": false
    },
    {
        "code": "PE",
        "name": "Peru",
        "enabled": false
    },
    {
        "code": "PF",
        "name": "French Polynesia",
        "enabled": false
    },
    {
        "code": "PG",
        "name": "Papua New Guinea",
        "enabled": false
    },
    {
        "code": "PH",
        "name": "Philippines",
        "enabled": false
    },
    {
        "code": "PK",
        "name": "Pakistan",
        "enabled": false
    },
    {
        "code": "PL",
        "name": "Poland",
        "enabled": false
    },
    {
        "code": "PM",
        "name": "Saint Pierre and Miquelon",
        "enabled": false
    },
    {
        "code": "PN",
        "name": "Pitcairn",
        "enabled": false
    },
    {
        "code": "PR",
        "name": "Puerto Rico",
        "enabled": false
    },
    {
        "code": "PS",
        "name": "Palestine, State of",
        "enabled": false
    },
    {
        "code": "PT",
        "name": "Portugal",
        "enabled": false
    },
    {
        "code": "PW",
        "name": "Palau",
        "enabled": false
    },
    {
        "code": "PY",
        "name": "Paraguay",
        "enabled": false
    },
    {
        "code": "QA",
        "name": "Qatar",
        "enabled": false
    },
    {
        "code": "RE",
        "name": "Réunion",
        "enabled": false
    },
    {
        "code": "RO",
        "name": "Romania",
        "enabled": false
    },
    {
        "code": "RS",
        "name": "Serbia",
        "enabled": false
    },
    {
        "code": "RU",
        "name": "Russian Federation",
        "enabled": false
    },
    {
        "code": "RW",
        "name": "Rwanda",
        "enabled": false
    },
    {
        "code": "SA",
        "name": "Saudi Arabia",
        "enabled": false
    },
    {
        "code": "SB",
        "name": "Solomon Islands",
        "enabled": false
    },
    {
        "code": "SC",
        "name": "Seychelles",
        "enabled": false
    },
    {
        "code": "SD",
        "name": "Sudan",
        "enabled": false
    },
    {
        "code": "SE",
        "name": "Sweden",
        "enabled": false
    },
    {
        "code": "SG",
        "name": "Singapore",
        "enabled": false
    },
    {
        "code": "SH",
        "name": "Saint Helena, Ascension and Tristan da Cunha",
        "enabled": false
    },
    {
        "code": "SI",
        "name": "Slovenia",
        "enabled": false
    },
    {
        "code": "SJ",
        "name": "Svalbard and Jan Mayen",
        "enabled": false
    },
    {
        "code": "SK",
        "name": "Slovakia",
        "enabled": false
    },
    {
        "code": "SL",
        "name": "Sierra Leone",
        "enabled": false
    },
    {
        "code": "SM",
        "name": "San Marino",
        "enabled": false
    },
    {
        "code": "SN",
        "name": "Senegal",
        "enabled": false
    },
    {
        "code": "SO",
        "name": "Somalia",
        "enabled": false
    },
    {
        "code": "SR",
        "name": "Suriname",
        "enabled": false
    },
    {
        "code": "SS",
        "name": "South Sudan",
        "enabled": false
    },
    {
        "code": "ST",
        "name": "Sao Tome and Principe",
        "enabled": false
    },
    {
        "code": "SV",
        "name": "El Salvador",
        "enabled": false
    },
    {
        "code": "SX",
        "name": "Sint Maarten, (Dutch part)",
        "enabled": false
    },
    {
        "code": "SY",
        "name": "Syrian Arab Republic",
        "enabled": false
    },
    {
        "code": "SZ",
        "name": "Eswatini",
        "enabled": false
    },
    {
        "code": "TC",
        "name": "Turks and Caicos Islands",
        "enabled": false
    },
    {
        "code": "TD",
        "name": "Chad",
        "enabled": false
    },
    {
        "code": "TF",
        "name": "French Southern Territories",
        "enabled": false
    },
    {
        "code": "TG",
        "name": "Togo",
        "enabled": false
    },
    {
        "code": "TH",
        "name": "Thailand",
        "enabled": false
    },
    {
        "code": "TJ",
        "name": "Tajikistan",
        "enabled": false
    },
    {
        "code": "TK",
        "name": "Tokelau",
        "enabled": false
    },
    {
        "code": "TL",
        "name": "Timor-Leste",
        "enabled": false
    },
    {
        "code": "TM",
        "name": "Turkmenistan",
        "enabled": false
    },
    {
        "code": "TN",
        "name": "Tunisia",
        "enabled": false
    },
    {
        "code": "TO",
        "name": "Tonga",
        "enabled": false
    },
    {
        "code": "TR",
        "name": "Turkey",
        "enabled": false
    },
    {
        "code": "TT",
        "name": "Trinidad and Tobago",
        "enabled": false
    },
    {
        "code": "TV",
        "name": "Tuvalu",
        "enabled": false
    },
    {
        "code": "TW",
        "name": "Taiwan, Province of China",
        "enabled": false
    },
    {
        "code": "TZ",
        "name": "Tanzania, United Republic of",
        "enabled": false
    },
    {
        "code": "UA",
        "name": "Ukraine",
        "enabled": false
    },
    {
        "code": "UG",
        "name": "Uganda",
        "enabled": false
    },
    {
        "code": "UM",
        "name": "United States Minor Outlying Islands",
        "enabled": false
    },
    {
        "code": "US",
        "name": "United States of America",
        "enabled": true
    },
    {
        "code": "UY",
        "name": "Uruguay",
        "enabled": false
    },
    {
        "code": "UZ",
        "name": "Uzbekistan",
        "enabled": false
    },
    {
        "code": "VA",
        "name": "Holy See",
        "enabled": false
    },
    {
        "code": "VC",
        "name": "Saint Vincent and the Grenadines",
        "enabled": false
    },
    {
        "code": "VE",
        "name": "Venezuela, Bolivarian Republic of",
        "enabled": false
    },
    {
        "code": "VG",
        "name": "Virgin Islands, British",
        "enabled": false
    },
    {
        "code": "VI",
        "name": "Virgin Islands, U.S.",
        "enabled": false
    },
    {
        "code": "VN",
        "name": "Viet Nam",
        "enabled": false
    },
    {
        "code": "VU",
        "name": "Vanuatu",
        "enabled": false
    },
    {
        "code": "WF",
        "name": "Wallis and Futuna",
        "enabled": false
    },
    {
        "code": "WS",
        "name": "Samoa",
        "enabled": false
    },
    {
        "code": "YE",
        "name": "Yemen",
        "enabled": false
    },
    {
        "code": "YT",
        "name": "Mayotte",
        "enabled": false
    },
    {
        "code": "ZA",
        "name": "South Africa",
        "enabled": false
    },
    {
        "code": "ZM",
        "name": "Zambia",
        "enabled": false
    },
    {
        "code": "ZW",
        "name": "Zimbabwe",
        "enabled": false
    }
];
module.exports = { countryConfig, countryFallback };
