import tw from '@/src/lib/tailwind';

import { StyleSheet, View } from "react-native";
import Container from "@/src/components/layout/Container";
import Txt from "@/src/components/ui/Txt";
import PaymentsHeader from "./components/PaymentsHeader";
import PaymentsList from "./components/PaymentsList";
import PaymentsItem from "./components/PaymentsItem";

import React, { useState } from 'react';

export default function Payments() {
  const [selectedPayment, setSelectedPayment] = useState(null);

    // 상세화면에서 뒤로가기
    const handleBack = () => {
      setSelectedPayment(null);
    };

    return (
      <Container>
        <PaymentsHeader selectedPayment={selectedPayment} onBack={handleBack} />
        <PaymentsList setSelectedPayment={setSelectedPayment} selectedPayment={selectedPayment} />
      </Container>
    );
  }
