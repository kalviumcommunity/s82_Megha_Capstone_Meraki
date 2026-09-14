import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
    en: {
        welcome: "Welcome back",
        explore: "Explore Opportunities",
        community: "Community Feed",
        training: "Training Hub",
        donations: "Donate & Support",
        dashboard: "Dashboard",
        certificates: "Certificates",
        leaderboard: "Leaderboard",
        messages: "Messages",
        applyNow: "Apply Now",
        verifiedNgo: "Verified NGO",
        hoursLogged: "Hours Logged",
        impactScore: "Impact Score",
    },
    hi: {
        welcome: "वापसी पर स्वागत है",
        explore: "अवसरों की खोज करें",
        community: "समुदाय फीड",
        training: "प्रशिक्षण केंद्र",
        donations: "दान और सहायता",
        dashboard: "डैशबोर्ड",
        certificates: "प्रमाण पत्र",
        leaderboard: "लीडरबोर्ड",
        messages: "संदेश",
        applyNow: "अभी आवेदन करें",
        verifiedNgo: "सत्यापित एनजीओ",
        hoursLogged: "दर्ज किए गए घंटे",
        impactScore: "प्रभाव स्कोर",
    },
    es: {
        welcome: "Bienvenido de nuevo",
        explore: "Explorar Oportunidades",
        community: "Feed de la Comunidad",
        training: "Centro de Capacitación",
        donations: "Donar y Apoyar",
        dashboard: "Panel de Control",
        certificates: "Certificados",
        leaderboard: "Tabla de Clasificación",
        messages: "Mensajes",
        applyNow: "Aplicar Ahora",
        verifiedNgo: "ONG Verificada",
        hoursLogged: "Horas Registradas",
        impactScore: "Puntaje de Impacto",
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("meraki_lang") || "en";
    });

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem("meraki_lang", lang);
    };

    const t = (key) => {
        return translations[language]?.[key] || translations.en[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
