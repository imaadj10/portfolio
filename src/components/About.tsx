// @ts-nocheck
import { useContext } from 'react';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { PositionContext } from '../App';
import Card from './Card';

function About() {
    const { position, setPosition } = useContext(PositionContext);
    return (
        <Card>
            Hello
        </Card>
    );
}

export default About;