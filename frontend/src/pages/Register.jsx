import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Modular Onboarding Components
import SignupLayout from "../components/auth/SignupLayout";
import RoleSelection from "../components/auth/RoleSelection";
import BasicInfoForm from "../components/auth/BasicInfoForm";
import VolunteerInterests from "../components/auth/VolunteerInterests";
import OrganizationDetails from "../components/auth/OrganizationDetails";
import WelcomeSuccess from "../components/auth/WelcomeSuccess";

export default function Register() {
    const navigate = useNavigate();
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

    const handleInfoNext = (data) => {
        setFormData(data);
        setStep(3);
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
