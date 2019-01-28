import React from 'react';

import { returnTheme } from "../../../../actions/storageActions"

var ThemeSection = () => (       
    <div className="section">
        <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Theme</h1>
        <div className="field-w">

        </div>
    </div>
);

export default ThemeSection;