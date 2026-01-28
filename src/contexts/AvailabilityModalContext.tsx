import React, { createContext, useContext, useState, ReactNode } from "react";

interface AvailabilityModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AvailabilityModalContext = createContext<
  AvailabilityModalContextType | undefined
>(undefined);

export const AvailabilityModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <AvailabilityModalContext.Provider
      value={{ isOpen, openModal, closeModal }}
    >
      {children}
    </AvailabilityModalContext.Provider>
  );
};

export const useAvailabilityModal = () => {
  const context = useContext(AvailabilityModalContext);
  if (!context) {
    throw new Error(
      "useAvailabilityModal must be used within an AvailabilityModalProvider",
    );
  }
  return context;
};
