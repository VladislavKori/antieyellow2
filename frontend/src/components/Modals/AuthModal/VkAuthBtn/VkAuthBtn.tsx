import React from 'react';

import './VkAuthBtn.scss';

import { ReactComponent as VkIcon } from '../../../../assets/icons/vk.svg';
import { useAppDispatch } from '../../../../hooks/redux';
import { vkAuth } from '../../../../redux/actions/authActions';

function VkAuthBtn() {

    const dispatch = useAppDispatch()

    const authWithVkHandler = () => {
        dispatch(vkAuth())
    }

    return (
        <button className="vkauthbtn" onClick={authWithVkHandler}>
            <VkIcon className="vkauthbtn__icon" />
            <h2 className="vkauthbtn__text">Войти с помощью VK</h2>
        </button>
    )
}

export default VkAuthBtn