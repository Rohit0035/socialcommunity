"use client";

import { useState } from "react";

import CPUploadStep from "./steps/CPUploadStep";
import CPFilterStep from "./steps/CPFilterStep";
import CPPublishStep from "./steps/CPPublishStep";
import "../../assets/styles/create-post.css";
import { Container } from "reactstrap";
import CPSuccessStep from "./steps/CPSuccessStep";
const CreatePostWizard = () => {
    const [step, setStep] = useState(1);

    const [media, setMedia] = useState(null);

    const [selectedFilter, setSelectedFilter] = useState("none");

    return (
        <>
            <section className="py-5">
                <Container>
                    {step === 1 && (
                        <CPUploadStep
                            media={media}
                            setMedia={setMedia}
                            nextStep={() => setStep(2)}
                        />
                    )}

                    {step === 2 && (
                        <CPFilterStep
                            media={media}
                            selectedFilter={selectedFilter}
                            setSelectedFilter={setSelectedFilter}
                            prevStep={() => setStep(1)}
                            nextStep={() => setStep(3)}
                        />
                    )}

                    {step === 3 && (
                        <CPPublishStep
                            media={media}
                            setMedia={setMedia}
                            selectedFilter={selectedFilter}
                            setSelectedFilter={setSelectedFilter}
                            prevStep={() => setStep(2)}
                            nextStep={() => setStep(4)}
                        />
                    )}
                    {step === 4 && (
                        <CPSuccessStep />
                    )}
                </Container>
            </section>

        </>
    );
};

export default CreatePostWizard;