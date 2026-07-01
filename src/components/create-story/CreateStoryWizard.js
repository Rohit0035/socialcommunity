"use client";

import { useState } from "react";

import CSUploadStep from "./steps/CSUploadStep";
import CSEditStep from "./steps/CSEditStep";
import CSShareStep from "./steps/CSShareStep";
import "../../assets/styles/create-story.css"
const CreateStoryWizard = ({ showCreateStoryModal, handleCloseCreateStoryModal }) => {
    const [step, setStep] = useState(1);
    const [storyMedia, setStoryMedia] = useState(null);
    const [selectedFilter, setSelectedFilter] =
        useState("none");

    const [storyText, setStoryText] = useState("");

    return (
        <>
            {step === 1 && (
                <CSUploadStep
                    storyMedia={storyMedia}
                    setStoryMedia={setStoryMedia}
                    nextStep={() => setStep(2)}
                />
            )}

            {step === 2 && (
                <CSEditStep
                    storyMedia={storyMedia}
                    storyText={storyText}
                    setStoryText={setStoryText}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    prevStep={() => setStep(1)}
                    nextStep={() => setStep(3)}
                />
            )}

            {step === 3 && (
                <CSShareStep
                    storyMedia={storyMedia}
                    setStoryMedia={setStoryMedia}

                    storyText={storyText}
                    setStoryText={setStoryText}

                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}

                    prevStep={() => setStep(2)}
                    
                    handleCloseCreateStoryModal={handleCloseCreateStoryModal}
                    showCreateStoryModal={showCreateStoryModal}
                />
            )}
        </>
    );
};

export default CreateStoryWizard;