import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../lib/api";

// Modular Onboarding Components
import SignupLayout from "../components/auth/SignupLayout";
import RoleSelection from "../components/auth/RoleSelection";
import BasicInfoForm from "../components/auth/BasicInfoForm";
import VolunteerInterests from "../components/auth/VolunteerInterests";
import OrganizationDetails from "../components/auth/OrganizationDetails";
import WelcomeSuccess from "../components/auth/WelcomeSuccess";

export default function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);
    const [role, setRole] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [interests, setInterests] = useState([]);
    const [orgData, setOrgData] = useState({
        type: "NGO",
        location: "",
        web: "",
        mission: ""
    });

    // Navigation Handlers
    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setStep(2);
    };

    const { login } = useAuth();

    const handleInfoNext = async (data) => {
        setIsLoading(true);
        setError("");
        setFormData(data);

        try {
            const response = await authApi.register({
                ...data,
                role: role === "volunteer" ? "volunteer" : "organization"
            });
            
            const { token, ...userData } = response.data;
            login({ ...userData, isNewUser: true }, token);
            setStep(3);
        } catch (err) {
            console.error("Registration failed:", err);
            
            // Demo Mode Fallback if backend/DB is offline
            if (!err.response || err.response?.status >= 500) {
                console.log("Offline detected, using Demo Mode Fallback");
                login({
                    name: data.name,
                    email: data.email,
                    role: role === "volunteer" ? "Volunteer" : "Organization",
                    isNewUser: true
                }, "demo_token_123");
                setStep(3);
                return;
            }

            setError(err.response?.data?.message || "Registration failed. Email might already be in use.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInterestsNext = (selectedInterests) => {
        setInterests(selectedInterests);
        setStep(4);
    };

    const handleOrgNext = (data) => {
        setOrgData(data);
        setStep(4);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <RoleSelection onSelect={handleRoleSelect} />;
            case 2:
                return (
                    <BasicInfoForm
                        role={role}
                        onNext={handleInfoNext}
                        onBack={handleBack}
                        initialData={formData}
                        isLoading={isLoading}
                        error={error}
                    />
                );
            case 3:
                return role === "volunteer" ? (
                    <VolunteerInterests
                        onNext={handleInterestsNext}
                        onBack={handleBack}
                        initialInterests={interests}
                    />
                ) : (
                    <OrganizationDetails
                        onNext={handleOrgNext}
                        onBack={handleBack}
                        initialData={orgData}
                    />
                );
            case 4:
                return <WelcomeSuccess role={role} onNavigate={navigate} />;
            default:
                return null;
        }
    };

    return (
        <SignupLayout currentStep={step} totalSteps={4}>
            {renderStep()}
        </SignupLayout>
    );
}
