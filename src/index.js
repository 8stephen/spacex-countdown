import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';

import Countdown from './countdown.js';
import Background from './background.js';

import './index.css';

function Index() {

    useEffect( () => {

    })

    return (
        <div id="app">
            <Helmet>
                <title>SpaceX Countdown</title>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-JLNNQKB16Z"></script>
                <script src="/analytics.js"></script>
            </Helmet>
            <Countdown/>
            <Background/>
        </div>
    );
}

ReactDOM.render(<Index/>, document.getElementById('root'));