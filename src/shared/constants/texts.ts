export const COMMANDERROR = "Attention la commande n'est pas valide veuillez regarder la documentation d'aide.";
export const EMPTYMESSAGEERROR = "Attention vous ne pouvez pas envoyer de message vide.";
export const VALIDTHREADNAME = "Ce nom est valide.";
export const INVALIDTHREADNAME = "Ce nom est invalide.";
export const HELP = `Les différentes commandes disponibles sur le chat sont : 
/schedule #NomDuChannel @TempsEnSecondeOUDate messageAEnvoyer pour envoyer un message dans le futur. 
/meteo Ville pour afficher la météo de la ville choisie. 
/ia message afin de communiquer avec un bot. 
/trad LangueInitiale LangueAConvertir message qui permet de traduire le message. 
Certaines des ces fonctionnalités sont disponibles sous forme graphique. `;

export const PICFORMATS = ["jpg", "png", "jpeg", "gif"];

export const LANGUAGESMAP = new Map<string, string>();
export const LANGUAGESLIST = ["--", "🇫🇷", "🇬🇧", "🇩🇪", "🇨🇳", "🇯🇵", "🇪🇸", "🇮🇹", "🇷🇺"];
LANGUAGESMAP.set("--", "");
LANGUAGESMAP.set("🇫🇷", "fr");
LANGUAGESMAP.set("🇬🇧", "en");
LANGUAGESMAP.set("🇩🇪", "de");
LANGUAGESMAP.set("🇨🇳", "zh");
LANGUAGESMAP.set("🇯🇵", "ja");
LANGUAGESMAP.set("🇪🇸", "es");
LANGUAGESMAP.set("🇮🇹", "it");
LANGUAGESMAP.set("🇷🇺", "ru");

export const SMILEYMAP = new Map<string, string>();
export const SMILEYLIST = ["😊", "😉", "😄", "😆", "😋", "😖", "😞", "😲", "😂", "😅", "😍", "😓", "😝", "😠", "😰", "😨"];
SMILEYMAP.set("😊", ":)");
SMILEYMAP.set("😉", ";)");
SMILEYMAP.set("😄", ":D");
SMILEYMAP.set("😆", "xD");
SMILEYMAP.set("😋", ":p");
SMILEYMAP.set("😖", ":S");
SMILEYMAP.set("😞", ":(");
SMILEYMAP.set("😲", ":O");
SMILEYMAP.set("😂", ":s");
SMILEYMAP.set("😅", ":sweat_smile:");
SMILEYMAP.set("😍", ":heart_eyes:");
SMILEYMAP.set("😓", ":cry:");
SMILEYMAP.set("😝", ":stuck_out_tongue:");
SMILEYMAP.set("😠", ":angry:");
SMILEYMAP.set("😰", ":open_mouth:");
SMILEYMAP.set("😨", ":fearful:");
