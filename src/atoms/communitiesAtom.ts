import { Timestamp } from "@google-cloud/firestore"
import {atom} from "recoil"

export interface Community {
    id: string;
    createrId:  string;
    numberrOfMembers: number;
    privacyType: 'public' | 'restricted' | 'private';
    createdAt?: Timestamp;
    imageURl?: string;
}
