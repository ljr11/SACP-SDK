import { writeFloat, writeUint8 } from '../../helper';
import { Serializable } from '../../Serializable';
import AxisMotorState from './AxisMotorState';

export enum Direction {
    X1, Y1, Z1, A1, B1, C1, X2
}

export default class CoordinateInformation implements Serializable {
    lenght: number;

    array: AxisMotorState;

    constructor(lenght?: number, array?: any) {
        this.lenght = lenght ?? 0;
        this.array = array ?? [];
    }

    toBuffer(): Buffer {
        const buffer = Buffer.alloc(1 + this.lenght * 5, 0);
        writeUint8(buffer, 0, this.lenght);
        for (let i = 0; i < this.lenght; i++) {
            const key = this.array[i].key;
            writeUint8(buffer, i * 5 + 1, key as Direction);
            writeFloat(buffer, i * 5 + 2, this.array[i].value);
        }
        return buffer;
    }

    fromBuffer() {
        throw new Error('Method not implemented.');
    }
}
