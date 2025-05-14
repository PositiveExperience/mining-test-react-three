import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import type { RootStoreType } from '../types';

export const useStores = (): RootStoreType => {
    const contextValue = React.useContext(MobXProviderContext);
    return contextValue as RootStoreType;
};