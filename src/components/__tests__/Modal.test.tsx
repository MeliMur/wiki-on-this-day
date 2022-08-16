import {Modal} from '../Modal';
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

describe('<Modal/>', () => {
    test('should render modal with children', () => {
        render(
            <Modal onClose={jest.fn} show={true}>
                Some child content
            </Modal>,
        );

        expect(screen.getByTestId('modal')).toBeTruthy();
        expect(screen.getByText('Some child content')).toBeTruthy();
    });

    test('should render modal title', () => {
        render(<Modal onClose={jest.fn} show={true} title='Title test'/>);

        expect(screen.getByText('Title test')).toBeTruthy();
    });

    test('should not render', () => {
        render(
            <Modal onClose={jest.fn} show={false}>
                Some child content
            </Modal>,
        );

        expect(screen.queryByText('Some child content')).toBeFalsy();
    });

    test('should call `onClose` function', () => {
        const mockOnClose = jest.fn();
        render(<Modal onClose={mockOnClose} show={true}/>);

        fireEvent.click(screen.getByTestId('modal-close-btn'));

        expect(mockOnClose).toBeCalled();
    });

    test('should call `onClose` if clicked outside modal', () => {
        const mockOnClose = jest.fn();
        render(<Modal onClose={mockOnClose} show={true}/>);

        const outsideOfModal = screen.getByTestId('modal-backdrop');

        fireEvent.mouseDown(outsideOfModal);

        expect(mockOnClose).toBeCalled();
    });

    test('should NOT call `onClose` if clicked inside modal', () => {
        const mockOnClose = jest.fn();
        render(<Modal onClose={mockOnClose} show={true}/>);

        const modal = screen.getByTestId('modal');
        const modalHeader = screen.getByTestId('modal-header');
        const modalBody = screen.getByTestId('modal-body');

        fireEvent.click(modal);
        fireEvent.click(modalHeader);
        fireEvent.click(modalBody);

        expect(mockOnClose).not.toBeCalled();
    });
});
