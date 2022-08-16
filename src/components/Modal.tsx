import React, {ReactNode} from 'react';
import './styles/Modal.scss';

interface IProps {
    onClose: () => void;
    title?: string;
    show: boolean;
    children?: ReactNode;
}

export const Modal: React.FC<IProps> = (props: IProps) => {
    const {children, title, onClose, show} = props;

    if (!show) return <></>;

    return (
        <div className='modal__backdrop' data-testid='modal-backdrop' onMouseDown={onClose}>
            <div className='modal' data-testid='modal' onMouseDown={(e) => e.stopPropagation()}>
                <div className='modal__header' data-testid='modal-header'>
                    {title && <div className='modal__title'>{title}</div>}
                    <button className='modal__close' data-testid='modal-close-btn' onClick={onClose}>
                        X
                    </button>
                </div>
                <div className='modal__body' data-testid='modal-body'>
                    {children}
                </div>
            </div>
        </div>
    );
};
