import { createGlobalState } from 'react-use';
import { IState } from './type';


// this library like react context that allow to pass state globally

export const useGlobalCounter = createGlobalState<number>(0);
export const useGlobalToggle = createGlobalState<boolean>(false);
export const useGlobalModal = createGlobalState<boolean>(false);
export const useGlobalStatus = createGlobalState<IState>('idle');
export const useEditActive = createGlobalState<boolean>(false);


