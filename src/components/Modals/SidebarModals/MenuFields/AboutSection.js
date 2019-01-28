import React from 'react';

import { returnTheme } from "../../../../actions/storageActions"


var AboutSection = () => (       
    <div className="section">
        <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Info</h1>
        <h2 className={"section-w "+ returnTheme() + "-t-text-w"}>Donate</h2>
        <div className="field-w">
            <h2 className={"label-w "+ returnTheme() + "-t-text-w"}>If you liked this project, please, consider supporting it.</h2>
            
            <div className="remove-btns flex-w">
                <a href='https://ko-fi.com/B0B5OPG4' target='_blank' rel="noopener noreferrer" data-type='selective' className={"button-w "+ returnTheme() + "-t-button-w"}>Ko-fi</a>
                
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_donations" />
                    <input type="hidden" name="business" value="EXRXMYUV66YZ8" />
                    <input type="hidden" name="item_name" value="Making and maintaining better and better apps" />
                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="submit" className={"button-w "+ returnTheme() + "-t-button-w"} value="Paypal"/>
                </form>
            </div>
        </div>

        <hr className="side-separator"/>
        <h2 className={"section-w "+ returnTheme() + "-t-text-w"}>GitHub</h2>

        <div className="field-w">
            <h2 className={"label-w "+ returnTheme() + "-t-text-w"}>Checkout Github Repo</h2>
            
            <div className="remove-btns flex-w">
                <a href='https://github.com/Tsuna2221/Monotone-Tab' target='_blank' rel="noopener noreferrer" data-type='selective' className={"button-w "+ returnTheme() + "-t-button-w"}>GitHub</a>
            </div>
        </div>
    </div>
);

export default AboutSection;