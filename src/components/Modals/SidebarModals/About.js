import React, { Component } from 'react';

import { hideModal } from '../../../actions/general'

class About extends Component {
    render() {
        return (
            <div className='About About-Inactive'>
                <div className="about-container">
                    <div className="modal-w">
                        <h1 className="head-w">Info</h1>
                        <div className="about-section">
                            <h2 className="section-w">Donate</h2>
                            <div className="field-w">
                                <h2 className="label-w">If you liked this project, please, consider supporting it.</h2>
                                
                                <div className="remove-btns flex-w">
                                    <a href='https://ko-fi.com/B0B5OPG4' target='_blank' rel="noopener noreferrer" data-type='selective' className="button-w">Ko-fi</a>
                                    
                                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                        <input type="hidden" name="cmd" value="_donations" />
                                        <input type="hidden" name="business" value="EXRXMYUV66YZ8" />
                                        <input type="hidden" name="item_name" value="Making and maintaining better and better apps" />
                                        <input type="hidden" name="currency_code" value="USD" />
                                        <input type="submit" className="button-w" value="Paypal"/>
                                    </form>
                                </div>
                            </div>

                            <hr className="side-separator"/>
                            <h2 className="section-w">GitHub</h2>

                            <div className="field-w">
                                <h2 className="label-w">Checkout Github Repo</h2>
                                
                                <div className="remove-btns flex-w">
                                    <a href='https://github.com/Tsuna2221/Monotone-Tab' target='_blank' rel="noopener noreferrer" data-type='selective' className="button-w">GitHub</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    state = {

    }

    componentDidMount = () => {
        document.addEventListener("click", e => {
            var els = {
                prefix: 'About-Inactive',
                element: '.About',
                button: '.about-icon',
            }

            hideModal(els, e)
        });
    }
}

export default About;