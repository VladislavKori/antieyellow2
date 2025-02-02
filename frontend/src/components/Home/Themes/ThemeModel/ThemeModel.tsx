// libs
import React, {useEffect, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'

function ThemeModel() {
    const { scene } = useGLTF('./models/golova3.gltf')
    const [rotateAngle, setRotateAngle] = useState<Array<number>>([0, 0]);

    const rotationModel = (e: any) => {
        const rotationSpeed = 9000;
        const moveY = e.clientY;
        const moveX = e.clientX;

        const formulaForX = (Math.PI / 4) * (-moveX / rotationSpeed)
        const formulaForY = -(Math.PI / 4) * (-moveY / rotationSpeed)

        setRotateAngle([formulaForX, formulaForY])
    }

    useEffect( () => {
        window.addEventListener('mousemove', rotationModel);

        return () => {
            window.removeEventListener('mousemove', rotationModel);
        }
    })

    if (!scene) {
        return null;
    }

    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight />
            <primitive rotation={[Math.PI / 2 + rotateAngle[1], 0, rotateAngle[0]]} object={scene} />
        </Canvas>
    )
}

export default ThemeModel