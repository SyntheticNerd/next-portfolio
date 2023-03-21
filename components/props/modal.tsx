import clsx from "clsx";
import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import BorderWrapper from "./borderWrapper";
import styles from "./modal.module.scss";

interface ModalProps {
	isOpen: boolean;
	handleClose: () => void;
	handleOpen: () => void;
	children?: ReactNode;
}

const Modal: FC<ModalProps> = ({
	isOpen,
	handleClose,
	handleOpen,
	children,
}) => {
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	};

	return (
		<>
			{isOpen &&
				createPortal(
					<div
						className={clsx(styles.modal, styles.modalWrapperOpen)}
						onClick={handleClick}
					>
						<BorderWrapper
							borderRadius="4px"
							borderSize="2px"
							style={{ boxShadow: "var(--nav-bar-shadow)" }}
						>
							<div className={styles.modalContent}>{children}</div>
						</BorderWrapper>
					</div>,
					document.getElementById("modal-portal")!
				)}
		</>
	);
};

export default Modal;
