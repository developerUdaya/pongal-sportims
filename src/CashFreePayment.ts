declare global {
  interface Window {
    Cashfree: any;
  }
}

const CashFree = {
  open: (amount: number = 1, name: string = "Demo User") => {
    if (!window.Cashfree) {
      alert("Cashfree SDK not loaded");
      return;
    }

    const cashfree = new window.Cashfree({ mode: "sandbox" });

    // For now we simulate the sessionId (frontend-only)
    const dummySessionId = "TEST_SESSION_ID_123456";

    // Open Cashfree checkout popup
    cashfree.checkout({
      paymentSessionId: dummySessionId,
      redirectTarget: "_blank",
    });
  },
};

export default CashFree;
