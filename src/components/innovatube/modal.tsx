"use client";

import React, { useState } from "react";
import { Alert, Button, Modal } from "antd";
import { useRouter } from "next/navigation";

const ModalComponent: ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => JSX.Element = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const handleOk = () => {
    router.push("/login", { scroll: false });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        centered
        title={"Basic Modal"}
        open={showModal}
        mask={true}
        keyboard={false}
        maskClosable={false}
        onOk={handleOk}
        okText={"Login"}
        onCancel={handleCancel}
      >
        <div className={"my-14 flex flex-col gap-4"}>
          <Alert
            message={"Aviso!!!"}
            description={
              <p>
                Inicia sesión, y guarda tus videos favoritos en una sección
                especial mente para ti!!
              </p>
            }
            type={"info"}
          />
          <Alert
            message={"Aviso!!!"}
            description={
              <p>
                Unete a nuestra comunidad y goza de grandes características a la
                hora de ver tus videos!!!
              </p>
            }
            type={"warning"}
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;
