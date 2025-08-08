import React from "react";
import { motion } from "framer-motion";

import ContactInfoSection from "../../components/common/ContactUsSection/ContactInfoSection";
import ContactUsLayout from "../../components/common/ContactUsSection/contact-us/ContactUsLayout";
import InquiryFormSection from "../../components/common/ContactUsSection/InquiryFormSection";
import HeroSection from "../../components/common/ContactUsSection/HeroSection";
import LocationsLayout from "../../components/common/ContactUsSection/LocationsLayout";
import { MainContainer, SectionContainer } from "./ContactUs.styles";
import Footer from "../../components/common/ContactUsSection/Footer";
import Navbar from "../../components/generic/PageLayout/NavBar/NavBar";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const fadeInRight = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const ConactUs: React.FC = () => {
  return (
    <>
      <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
        ><Navbar /></motion.div>
      

      <MainContainer>
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionContainer>
            <ContactUsLayout />
          </SectionContainer>
        </motion.div>
          <LocationsLayout />
      </MainContainer>

      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>
    </>
  );
};

export default ConactUs;
