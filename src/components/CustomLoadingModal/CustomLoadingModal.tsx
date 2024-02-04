import Lottie from 'lottie-react-native';
import { Modal } from "native-base";
import React from "react";
import { useWindowDimensions } from 'react-native';

export default function CustomLoadingModal({ modalVisible }: { modalVisible: boolean }) {
    const { width } = useWindowDimensions();
    return (
        <Modal isOpen={modalVisible}>
            <Lottie style={{ width: width / 3 }} source={require('../../../assets/images/loading.json')} autoPlay loop />
        </Modal>
    );
}
